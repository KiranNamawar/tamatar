# Architecture Patterns & Design Improvements

## 📊 Current State Analysis

### Strengths
- TanStack Start for modern routing and data fetching
- Clean separation of concerns with providers
- Consistent use of custom hooks
- Radix UI primitives for accessibility

### Areas for Improvement
- Limited use of design patterns for complex state management
- No clear data flow architecture
- Lack of error boundary implementation
- Missing dependency injection patterns

## 🎯 Improvement Recommendations

### 1. State Management Architecture

#### A. Implement Zustand for Global State
```typescript
// src/shared/stores/
// Replace scattered useState with centralized state management

// src/shared/stores/ui-store.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
  theme: 'light' | 'dark' | 'system'
  variant: 'default' | 'glass' | 'aurora'
  sidebarOpen: boolean
  // Actions
  setTheme: (theme: UIState['theme']) => void
  setVariant: (variant: UIState['variant']) => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>()(
  devtools((set) => ({
    theme: 'system',
    variant: 'default',
    sidebarOpen: false,
    setTheme: (theme) => set({ theme }),
    setVariant: (variant) => set({ variant }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  }))
)
```

#### B. Feature-Specific Stores
```typescript
// src/features/showcase/stores/showcase-store.ts
interface ShowcaseState {
  selectedComponent: string | null
  viewMode: 'preview' | 'code'
  activeVariant: ComponentVariant
  // Actions
  selectComponent: (component: string) => void
  setViewMode: (mode: 'preview' | 'code') => void
  setActiveVariant: (variant: ComponentVariant) => void
}
```

### 2. Component Composition Patterns

#### A. Compound Components Pattern
```typescript
// Example: Enhanced Card component
const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Actions: CardActions,
}

// Usage
<Card.Root variant="glass">
  <Card.Header>
    <Card.Title>Component Showcase</Card.Title>
  </Card.Header>
  <Card.Content>
    <ComponentPreview />
  </Card.Content>
  <Card.Actions>
    <Button>View Code</Button>
  </Card.Actions>
</Card.Root>
```

#### B. Render Props Pattern
```typescript
// src/shared/components/DataProvider.tsx
interface DataProviderProps<T> {
  children: (data: {
    data: T | null
    loading: boolean
    error: Error | null
    refetch: () => void
  }) => React.ReactNode
  query: QueryKey
  queryFn: () => Promise<T>
}

export function DataProvider<T>({ children, query, queryFn }: DataProviderProps<T>) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: query,
    queryFn,
  })

  return children({
    data: data ?? null,
    loading: isLoading,
    error: error as Error | null,
    refetch,
  })
}
```

### 3. Error Handling Architecture

#### A. Error Boundary Implementation
```typescript
// src/shared/components/ErrorBoundary.tsx
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="error-boundary">
      <h2>Something went wrong</h2>
      <details>
        <summary>Error details</summary>
        <pre>{error.message}</pre>
      </details>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  )
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo)
        // Send to error reporting service
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}
```

#### B. Error State Management
```typescript
// src/shared/hooks/use-error-handler.ts
interface ErrorState {
  errors: Record<string, Error>
  addError: (key: string, error: Error) => void
  removeError: (key: string) => void
  clearErrors: () => void
}

export const useErrorStore = create<ErrorState>((set) => ({
  errors: {},
  addError: (key, error) => 
    set((state) => ({ errors: { ...state.errors, [key]: error } })),
  removeError: (key) => 
    set((state) => {
      const { [key]: _, ...rest } = state.errors
      return { errors: rest }
    }),
  clearErrors: () => set({ errors: {} }),
}))
```

### 4. Dependency Injection Pattern

#### A. Service Container
```typescript
// src/shared/services/container.ts
class ServiceContainer {
  private services = new Map<string, any>()

  register<T>(key: string, service: T): void {
    this.services.set(key, service)
  }

  get<T>(key: string): T {
    const service = this.services.get(key)
    if (!service) {
      throw new Error(`Service ${key} not found`)
    }
    return service
  }
}

export const container = new ServiceContainer()

// Register services
container.register('analytics', new AnalyticsService())
container.register('storage', new StorageService())
container.register('api', new ApiService())
```

#### B. Service Provider Pattern
```typescript
// src/shared/providers/ServiceProvider.tsx
const ServiceContext = createContext<ServiceContainer | null>(null)

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  return (
    <ServiceContext.Provider value={container}>
      {children}
    </ServiceContext.Provider>
  )
}

export function useService<T>(key: string): T {
  const container = useContext(ServiceContext)
  if (!container) {
    throw new Error('useService must be used within ServiceProvider')
  }
  return container.get<T>(key)
}
```

### 5. Event-Driven Architecture

#### A. Event Bus Implementation
```typescript
// src/shared/events/event-bus.ts
type EventCallback<T = any> = (data: T) => void

class EventBus {
  private events = new Map<string, EventCallback[]>()

  on<T>(event: string, callback: EventCallback<T>): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(callback)

    // Return unsubscribe function
    return () => {
      const callbacks = this.events.get(event)
      if (callbacks) {
        const index = callbacks.indexOf(callback)
        if (index > -1) {
          callbacks.splice(index, 1)
        }
      }
    }
  }

  emit<T>(event: string, data?: T): void {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }
}

export const eventBus = new EventBus()
```

#### B. Component Communication
```typescript
// src/shared/hooks/use-event-bus.ts
export function useEventBus<T>(event: string, callback: EventCallback<T>) {
  useEffect(() => {
    const unsubscribe = eventBus.on(event, callback)
    return unsubscribe
  }, [event, callback])
}

// Usage in components
function ComponentA() {
  const handleThemeChange = useCallback((theme: string) => {
    console.log('Theme changed to:', theme)
  }, [])

  useEventBus('theme:change', handleThemeChange)
  
  return <div>Component A</div>
}
```

## 🛠️ Implementation Steps

### Phase 1: State Management (Week 1-2)
1. **Install and configure Zustand**
   - Add Zustand to dependencies
   - Create basic store structure
   - Migrate simple state from useState

2. **Implement UI state store**
   - Create global UI state management
   - Handle theme and variant switching
   - Manage modal and sidebar states

### Phase 2: Component Architecture (Week 3-4)
3. **Implement compound components**
   - Refactor complex components
   - Create composition APIs
   - Add type safety

4. **Add error boundaries**
   - Implement error boundary wrapper
   - Create error fallback components
   - Add error reporting

### Phase 3: Services & Events (Week 5-6)
5. **Service layer implementation**
   - Create service container
   - Implement dependency injection
   - Add service providers

6. **Event-driven communication**
   - Implement event bus
   - Add component communication
   - Create event type definitions

## 📏 Success Metrics

### Code Quality
- **Coupling**: Reduce component coupling by 40%
- **Testability**: Improve unit test coverage to 90%
- **Type Safety**: Achieve 100% TypeScript coverage

### Performance
- **Bundle Size**: Reduce unnecessary re-renders by 50%
- **Memory Usage**: Optimize memory consumption
- **Loading Time**: Improve initial load performance

### Developer Experience
- **Debugging**: Improve error tracking and debugging
- **Maintainability**: Reduce time to implement new features
- **Consistency**: Standardize architectural patterns

## 🎯 Specific Actions

### Immediate (This Week)
- [ ] Install Zustand and error boundary dependencies
- [ ] Create basic store structure
- [ ] Implement simple error boundary

### Short-term (Next 2 Weeks)
- [ ] Migrate theme and UI state to Zustand
- [ ] Implement compound component patterns
- [ ] Add error handling throughout app

### Medium-term (Next Month)
- [ ] Complete service layer implementation
- [ ] Add event-driven communication
- [ ] Optimize performance and bundle size

## 🔗 Related Improvements
- [Code Organization](./01-code-organization.md) - Structural improvements
- [Performance Optimization](./03-performance-optimization.md) - Performance patterns
- [Testing Strategy](./06-testing-strategy.md) - Testing architectural patterns

## 📋 Implementation Checklist

### State Management
- [ ] Install Zustand and configure devtools
- [ ] Create UI state store
- [ ] Migrate existing state management
- [ ] Add persistence for user preferences

### Component Patterns
- [ ] Implement compound components
- [ ] Add render props where appropriate
- [ ] Create higher-order components for common logic
- [ ] Standardize component APIs

### Error Handling
- [ ] Add error boundaries at route level
- [ ] Implement global error state
- [ ] Create error reporting service
- [ ] Add error recovery mechanisms

### Services & Events
- [ ] Create service container
- [ ] Implement dependency injection
- [ ] Add event bus for component communication
- [ ] Create typed event definitions
