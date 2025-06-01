# Development Rules & Guidelines

## Core Development Rules

### Rule 1: TypeScript First
- All files must use TypeScript with strict mode enabled
- No `any` types allowed without explicit justification
- Prefer explicit type definitions over type inference for public APIs
- Use proper generic constraints and utility types

### Rule 2: Component Architecture
- Components must follow single responsibility principle
- Maximum 300 lines per component file
- Prefer composition over inheritance
- Use proper prop interfaces with documentation

### Rule 3: State Management
- **Server State**: TanStack Query only for server data
- **Client State**: Zustand for cross-route persistent state
- **Local State**: React useState for component-specific UI state
- No mixed state management patterns in single features

### Rule 4: Styling & Design
- **Dark Mode First**: Design for dark mode, then adapt to light mode
- **Responsive First**: Mobile-first responsive design approach
- shadcn/ui components as the foundation for all UI
- Tailwind CSS for all styling (no CSS modules or styled-components)

### Rule 5: Performance Standards
- Lazy load all routes and heavy components
- Implement proper memoization (React.memo, useMemo, useCallback)
- Virtual scrolling for lists with >100 items
- Bundle size budget: <500KB initial load

### Rule 6: Testing Requirements
- Unit tests for all utility functions and hooks
- Component tests for all UI components
- Integration tests for user workflows
- Minimum 80% test coverage on business logic

### Rule 7: Accessibility Compliance
- WCAG 2.1 AA compliance minimum
- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility

### Rule 8: Error Handling
- Error boundaries for all route components
- Graceful degradation for failed API calls
- User-friendly error messages
- Comprehensive error logging

### Rule 9: Security First
- Input validation with Zod schemas
- XSS protection for all user inputs
- Secure authentication flow
- No sensitive data in client-side code

### Rule 10: Code Quality
- ESLint and Prettier configuration compliance
- No console.log statements in production code
- Proper JSDoc documentation for public APIs
- Consistent naming conventions

## File Organization Rules

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components only
│   ├── forms/          # Form components with validation
│   ├── charts/         # Data visualization components
│   ├── layout/         # Layout-related components
│   └── feature/        # Feature-specific components
├── routes/             # TanStack Router route components
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores
├── types/              # TypeScript type definitions
├── schemas/            # Zod validation schemas
├── api/                # API functions and GraphQL queries
└── assets/             # Static assets (images, icons, etc.)
```

### Naming Conventions
- **Components**: PascalCase (e.g., `ProgressLog.tsx`)
- **Files**: kebab-case (e.g., `progress-log.utils.ts`)
- **Directories**: kebab-case (e.g., `user-settings/`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `API_ENDPOINTS`)
- **Variables/Functions**: camelCase (e.g., `getUserProgress`)

### Import Rules
- External libraries first, then internal modules
- Absolute imports for src/ directory (`@/components/ui/button`)
- Relative imports only within same feature directory
- Named imports preferred over default imports
- Group imports by: externals, internals, relatives

## Component Development Rules

### Component Structure
```typescript
// Props interface
interface ComponentProps {
  // All props must be documented
  title: string;
  optional?: boolean;
}

// Component implementation
export const Component = ({ title, optional = false }: ComponentProps) => {
  // State and effects
  const [state, setState] = useState<StateType>(initialState);
  
  // Event handlers
  const handleClick = useCallback(() => {
    // Implementation
  }, [dependencies]);
  
  // Render
  return (
    <div>
      {/* JSX implementation */}
    </div>
  );
};
```

### Hook Development Rules
- Custom hooks must start with `use` prefix
- Return object for multiple values, tuple for two values
- Include proper TypeScript generics where applicable
- Provide proper dependency arrays for useEffect

### Form Development Rules
- React Hook Form with Zod validation mandatory
- Form schemas must be defined separately in `schemas/` directory
- Proper error handling and display
- Loading states during submission
- Optimistic updates where appropriate

## API Integration Rules

### GraphQL Requirements
- Use gql.tada for type-safe queries
- All queries must include error handling
- Implement proper loading states
- Use TanStack Query for caching and state management

### Error Handling Standards
```typescript
// API error handling pattern
const { data, error, isLoading } = useQuery({
  queryKey: ['resource', id],
  queryFn: () => fetchResource(id),
  onError: (error) => {
    toast.error('Failed to load resource');
    logError(error);
  },
});

if (error) {
  return <ErrorComponent error={error} />;
}

if (isLoading) {
  return <LoadingSpinner />;
}
```

## Styling Rules

### Tailwind CSS Guidelines
- Use design system tokens for spacing, colors, typography
- Custom CSS only for complex animations or vendor-specific styles
- Responsive classes for all layout components
- Dark mode variants for all styled components

### Component Styling Pattern
```typescript
// Good: Conditional classes with clsx
const buttonClasses = clsx(
  'base-button-classes',
  variant === 'primary' && 'primary-variant-classes',
  size === 'large' && 'large-size-classes',
  disabled && 'disabled-classes'
);

// Bad: Inline styles or complex conditional logic
```

## Git & Deployment Rules

### Commit Standards
- Conventional commits format mandatory
- Commit messages in present tense
- Include scope for feature-specific changes
- Maximum 72 characters for commit titles

### Branch Protection
- No direct commits to main branch
- Pull request reviews required
- All checks must pass before merge
- Squash merge for feature branches

### Deployment Requirements
- All environment variables properly configured
- Build process includes optimization and minification
- Source maps available for production debugging
- Health check endpoints implemented

## Documentation Requirements

### Code Documentation
- JSDoc comments for all exported functions and components
- README files for complex features or modules
- Inline comments for complex business logic
- Architecture decision records for major decisions

### API Documentation
- GraphQL schema documentation
- Error codes and messages documented
- Authentication requirements clearly stated
- Rate limiting information included

## Quality Gates

### Pre-commit Checks
- ESLint with zero warnings
- Prettier formatting applied
- TypeScript compilation successful
- Unit tests passing

### Pre-deployment Checks
- All tests passing (unit, integration, e2e)
- Bundle size within budget
- Performance metrics meet thresholds
- Security scan completed

### Code Review Requirements
- At least one reviewer approval required
- Security review for authentication/authorization changes
- Performance review for data-heavy features
- Accessibility review for UI changes

## Exceptions & Overrides

### When Rules Can Be Broken
- Emergency hotfixes (with immediate follow-up cleanup)
- Proof of concept or prototype code (clearly marked)
- Third-party library integration requirements
- Performance optimizations with documented justification

### Exception Process
1. Document the exception and reasoning
2. Get approval from team lead
3. Create technical debt ticket for future cleanup
4. Include cleanup timeline in the exception documentation
