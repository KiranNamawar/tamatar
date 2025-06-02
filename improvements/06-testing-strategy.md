# Testing Strategy & Quality Assurance

## 📊 Current State Analysis

### Existing Testing Infrastructure
- **Vitest**: Modern testing framework configured
- **Testing utilities**: Basic setup in place
- **TypeScript**: Strong type safety foundation

### Testing Gaps
- No comprehensive test coverage
- Missing integration tests
- No visual regression testing
- Limited accessibility testing
- No performance testing strategy

## 🎯 Testing Strategy Goals

### Coverage Targets
- **Unit Tests**: 90% code coverage
- **Integration Tests**: All user journeys covered
- **E2E Tests**: Critical paths automated
- **Accessibility Tests**: WCAG compliance verified
- **Performance Tests**: Bundle size and runtime monitoring

## 🧪 Comprehensive Testing Framework

### 1. Unit Testing Strategy

#### A. Component Testing Setup
```typescript
// src/tests/setup.ts
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'

// Global test setup
beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
```

#### B. Component Test Utilities
```typescript
// src/tests/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '../providers/theme-provider'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark'
  variant?: 'default' | 'glass' | 'aurora'
  queryClient?: QueryClient
}

export function renderWithProviders(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  const {
    theme = 'light',
    variant = 'default',
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    }),
    ...renderOptions
  } = options

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme={theme} variant={variant}>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Custom matchers for component testing
export const customMatchers = {
  toHaveVariant: (received: HTMLElement, variant: string) => {
    const hasVariant = received.classList.contains(`variant-${variant}`)
    return {
      message: () => `expected element to have variant ${variant}`,
      pass: hasVariant,
    }
  },
  
  toBeAccessible: async (received: HTMLElement) => {
    const { axe } = await import('jest-axe')
    const results = await axe(received)
    return {
      message: () => `expected element to be accessible: ${results.violations.map(v => v.description).join(', ')}`,
      pass: results.violations.length === 0,
    }
  },
}
```

#### C. Component Test Examples
```typescript
// src/components/ui/button.test.tsx
import { fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'
import { renderWithProviders } from '../../tests/test-utils'

describe('Button Component', () => {
  it('renders with correct default variant', () => {
    renderWithProviders(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('variant-default')
  })

  it('handles different variants correctly', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
    
    variants.forEach(variant => {
      const { unmount } = renderWithProviders(
        <Button variant={variant}>Test</Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveVariant(variant)
      unmount()
    })
  })

  it('supports keyboard interaction', () => {
    const handleClick = vi.fn()
    renderWithProviders(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button')
    
    // Test Enter key
    fireEvent.keyDown(button, { key: 'Enter' })
    expect(handleClick).toHaveBeenCalledTimes(1)
    
    // Test Space key
    fireEvent.keyDown(button, { key: ' ' })
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('shows loading state correctly', () => {
    renderWithProviders(<Button loading>Loading</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toHaveAttribute('disabled')
    expect(screen.getByText('Loading, please wait')).toBeInTheDocument()
  })

  it('meets accessibility requirements', async () => {
    renderWithProviders(
      <Button aria-describedby="help-text">
        Save Document
      </Button>
    )
    
    const button = screen.getByRole('button')
    await expect(button).toBeAccessible()
  })
})
```

### 2. Integration Testing

#### A. Feature Integration Tests
```typescript
// src/tests/integration/showcase.test.tsx
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ShowcasePage } from '../../routes/showcase'
import { renderWithProviders } from '../test-utils'

describe('Showcase Page Integration', () => {
  it('allows users to browse and interact with components', async () => {
    renderWithProviders(<ShowcasePage />)

    // Verify component grid loads
    await waitFor(() => {
      expect(screen.getByText('UI Components')).toBeInTheDocument()
    })

    // Test component selection
    const buttonComponent = screen.getByText('Button')
    fireEvent.click(buttonComponent)

    // Verify component preview loads
    await waitFor(() => {
      expect(screen.getByText('Button Preview')).toBeInTheDocument()
    })

    // Test variant switching
    const glassVariant = screen.getByText('Glass')
    fireEvent.click(glassVariant)

    await waitFor(() => {
      expect(screen.getByTestId('button-preview')).toHaveClass('glass-variant')
    })
  })

  it('handles theme switching correctly', async () => {
    renderWithProviders(<ShowcasePage />)

    // Find theme toggle
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
    
    // Test theme switching
    fireEvent.click(themeToggle)
    
    await waitFor(() => {
      expect(document.documentElement).toHaveClass('dark')
    })
  })
})
```

#### B. API Integration Tests
```typescript
// src/tests/integration/api.test.tsx
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useComponentData } from '../../hooks/use-component-data'

// Mock API responses
const mockComponentData = {
  components: [
    { id: 'button', name: 'Button', category: 'form' },
    { id: 'card', name: 'Card', category: 'layout' },
  ]
}

vi.mock('../../api', () => ({
  fetchComponentData: vi.fn().mockResolvedValue(mockComponentData),
}))

describe('API Integration', () => {
  it('fetches and caches component data correctly', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )

    const { result } = renderHook(() => useComponentData(), { wrapper })

    // Initial state
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual(mockComponentData)
    expect(result.current.error).toBeNull()
  })
})
```

### 3. End-to-End Testing

#### A. Playwright E2E Setup
```typescript
// tests/e2e/setup.ts
import { test as base, expect } from '@playwright/test'

// Extend base test with custom fixtures
export const test = base.extend({
  // Custom page fixture with theme support
  themePage: async ({ page }, use) => {
    await page.goto('/')
    
    // Helper to switch themes
    page.switchTheme = async (theme: 'light' | 'dark') => {
      await page.getByRole('button', { name: /toggle theme/i }).click()
      await expect(page.locator('html')).toHaveClass(
        theme === 'dark' ? /dark/ : /light/
      )
    }

    // Helper to switch variants
    page.switchVariant = async (variant: 'default' | 'glass' | 'aurora') => {
      await page.getByRole('button', { name: /variant/i }).click()
      await page.getByText(variant, { exact: true }).click()
      await expect(page.locator('body')).toHaveAttribute('data-variant', variant)
    }

    await use(page)
  },
})

export { expect }
```

#### B. E2E Test Examples
```typescript
// tests/e2e/showcase.spec.ts
import { test, expect } from './setup'

test.describe('Component Showcase', () => {
  test('user can browse and interact with components', async ({ themePage: page }) => {
    await page.goto('/showcase')

    // Test component grid navigation
    await expect(page.getByText('UI Components')).toBeVisible()
    
    // Select a component
    await page.getByText('Button').click()
    await expect(page.getByTestId('component-preview')).toBeVisible()

    // Test variant switching
    await page.switchVariant('glass')
    await expect(page.getByTestId('button-preview')).toHaveClass(/glass/)

    // Test theme switching
    await page.switchTheme('dark')
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('keyboard navigation works correctly', async ({ page }) => {
    await page.goto('/showcase')
    
    // Test tab navigation
    await page.keyboard.press('Tab')
    await expect(page.getByRole('button').first()).toBeFocused()
    
    // Test arrow key navigation in component grid
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    
    // Verify component preview opens
    await expect(page.getByTestId('component-preview')).toBeVisible()
  })

  test('responsive design works across devices', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/showcase')
    await expect(page.getByTestId('sidebar')).toBeVisible()

    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByTestId('mobile-menu')).toBeVisible()

    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByTestId('mobile-nav')).toBeVisible()
  })
})
```

### 4. Visual Regression Testing

#### A. Visual Testing Setup
```typescript
// tests/visual/setup.ts
import { test as base } from '@playwright/test'

export const test = base.extend({
  visualPage: async ({ page }, use) => {
    // Disable animations for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-delay: -1ms !important;
          animation-duration: 1ms !important;
          animation-iteration-count: 1 !important;
          background-attachment: initial !important;
          scroll-behavior: auto !important;
          transition-duration: 1ms !important;
          transition-delay: -1ms !important;
        }
      `
    })

    await use(page)
  },
})
```

#### B. Visual Test Examples
```typescript
// tests/visual/components.spec.ts
import { test, expect } from './setup'

test.describe('Visual Regression Tests', () => {
  test('button variants render correctly', async ({ visualPage: page }) => {
    await page.goto('/showcase?component=button')

    // Test all button variants
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    
    for (const variant of variants) {
      await page.selectOption('[data-testid="variant-selector"]', variant)
      await expect(page.getByTestId('button-preview')).toHaveScreenshot(`button-${variant}.png`)
    }
  })

  test('theme variants render correctly', async ({ visualPage: page }) => {
    await page.goto('/showcase')

    // Test light theme
    await expect(page).toHaveScreenshot('showcase-light.png')

    // Test dark theme
    await page.getByRole('button', { name: /toggle theme/i }).click()
    await expect(page).toHaveScreenshot('showcase-dark.png')
  })

  test('design variants render correctly', async ({ visualPage: page }) => {
    const variants = ['default', 'glass', 'aurora']
    
    for (const variant of variants) {
      await page.goto(`/showcase?variant=${variant}`)
      await expect(page).toHaveScreenshot(`showcase-${variant}.png`)
    }
  })
})
```

### 5. Performance Testing

#### A. Performance Test Setup
```typescript
// tests/performance/setup.ts
import { test as base } from '@playwright/test'

export const test = base.extend({
  performancePage: async ({ page }, use) => {
    // Start performance monitoring
    await page.goto('about:blank')
    
    const performanceMetrics = {
      navigationStart: 0,
      loadComplete: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
    }

    // Capture performance metrics
    page.captureMetrics = async () => {
      return page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType('paint')
        
        return {
          navigationStart: navigation.navigationStart,
          loadComplete: navigation.loadEventEnd,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          // Add Web Vitals metrics
          cls: 0, // Implement CLS measurement
          fid: 0, // Implement FID measurement
        }
      })
    }

    await use(page)
  },
})
```

#### B. Performance Test Examples
```typescript
// tests/performance/loading.spec.ts
import { test, expect } from './setup'

test.describe('Performance Tests', () => {
  test('page loads within performance budget', async ({ performancePage: page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    const metrics = await page.captureMetrics()

    // Performance assertions
    expect(loadTime).toBeLessThan(3000) // 3 second budget
    expect(metrics.firstContentfulPaint).toBeLessThan(1500) // 1.5s FCP
  })

  test('component lazy loading works efficiently', async ({ page }) => {
    await page.goto('/showcase')
    
    // Measure initial bundle size
    const initialRequests = await page.evaluate(() => 
      performance.getEntriesByType('resource').length
    )

    // Navigate to component that should lazy load
    await page.getByText('Complex Chart').click()
    
    // Wait for lazy loaded component
    await page.waitForSelector('[data-testid="chart-component"]')
    
    const finalRequests = await page.evaluate(() => 
      performance.getEntriesByType('resource').length
    )

    // Verify additional chunks were loaded
    expect(finalRequests).toBeGreaterThan(initialRequests)
  })
})
```

### 6. Test Automation & CI Integration

#### A. GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:coverage
      
      - uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install
      - run: npm run build
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:visual
      
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: visual-diff-report
          path: test-results/
```

## 🛠️ Implementation Steps

### Phase 1: Foundation (Week 1-2)
1. **Unit testing setup**
   - Configure Vitest with React Testing Library
   - Create test utilities and custom matchers
   - Set up component testing patterns

2. **Basic test coverage**
   - Write unit tests for core components
   - Implement accessibility testing
   - Set up code coverage reporting

### Phase 2: Integration & E2E (Week 3-4)
3. **Integration testing**
   - Set up feature integration tests
   - Add API integration testing
   - Test user journeys

4. **E2E testing setup**
   - Configure Playwright
   - Create page object models
   - Implement critical path tests

### Phase 3: Advanced Testing (Week 5-6)
5. **Visual regression testing**
   - Set up visual testing framework
   - Create component visual tests
   - Implement design variant testing

6. **Performance testing**
   - Add performance monitoring
   - Create performance budgets
   - Implement automated performance tests

## 📏 Success Metrics

### Coverage Targets
- **Unit Test Coverage**: 90%+ code coverage
- **Integration Coverage**: All user journeys tested
- **E2E Coverage**: Critical paths automated

### Quality Metrics
- **Bug Detection**: 95% of bugs caught before production
- **Regression Prevention**: Zero visual regressions
- **Performance**: Meet all performance budgets

### Developer Experience
- **Test Speed**: Unit tests < 30s, E2E tests < 5min
- **Feedback Loop**: Test results in < 2min
- **Debugging**: Clear test failure messages

## 🎯 Specific Actions

### Immediate (This Week)
- [ ] Set up Vitest configuration and test utilities
- [ ] Write unit tests for 5 core components
- [ ] Configure code coverage reporting

### Short-term (Next 2 Weeks)
- [ ] Complete unit test coverage for all components
- [ ] Set up integration testing framework
- [ ] Configure Playwright for E2E testing

### Medium-term (Next Month)
- [ ] Implement visual regression testing
- [ ] Add performance testing suite
- [ ] Set up CI/CD test automation

## 🔗 Related Improvements
- [Accessibility Enhancements](./05-accessibility-enhancements.md) - Accessibility testing integration
- [Performance Optimization](./03-performance-optimization.md) - Performance testing
- [Developer Experience](./09-developer-experience.md) - Testing workflow improvements

## 📋 Implementation Checklist

### Unit Testing
- [ ] Configure Vitest with React Testing Library
- [ ] Create test utilities and custom matchers
- [ ] Write tests for all UI components
- [ ] Set up accessibility testing
- [ ] Configure code coverage reporting

### Integration Testing
- [ ] Set up feature integration tests
- [ ] Add API integration testing
- [ ] Test theme and variant switching
- [ ] Test user interaction flows

### E2E Testing
- [ ] Configure Playwright test framework
- [ ] Create page object models
- [ ] Implement critical user journey tests
- [ ] Add cross-browser testing

### Visual & Performance Testing
- [ ] Set up visual regression testing
- [ ] Create performance testing suite
- [ ] Implement automated screenshot comparison
- [ ] Add performance budget monitoring

### CI/CD Integration
- [ ] Set up GitHub Actions workflows
- [ ] Configure automated test execution
- [ ] Add test result reporting
- [ ] Set up failure notifications
