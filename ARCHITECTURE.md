# Tamatar Frontend - Architecture & Design Rules

## Current Implementation Status (June 1, 2025)

### ✅ Completed Infrastructure

- **TanStack Start** project setup with TypeScript strict mode
- **shadcn/ui** component library with custom theme
- **Glassomorphism & Aurora Effects** system in `src/styles/effects.css`
- **OKLCH Color System** with dark mode first approach
- **Component Variant System** using class-variance-authority
- **Nunito Sans Font** integration via Google Fonts
- **Animation System** with hardware acceleration
- **Theme Toggle** functionality
- **Homepage Showcase** with interactive demonstrations

### 🚧 In Development

- **Dashboard Layout** component and routing structure
- **Authentication System** placeholder components
- **Project Management** route planning

### 📋 Planned Next

- **Rich Text Editor** for progress logs
- **GitHub Integration** for repository linking
- **Data Persistence** with TanStack Query
- **Form Components** with React Hook Form + Zod

## Core Design Principles

### 1. Clear Separation of Concerns

- **Routes**: Handle page-level components and data loading using TanStack Router
- **Server Functions**: Handle server-side operations (auth tokens, file uploads) using TanStack Start
  server functions
- **Components**: Reusable UI components built with shadcn/ui and Tailwind CSS
- **Stores**: Client-side state management using Zustand for persistent state
- **API Layer**: GraphQL operations using gql.tada for type-safe queries
- **Business Logic**: Separated from UI components into custom hooks and services

### 2. Component-First Organization

Each feature should be organized around reusable components with clear responsibilities:

- Page components handle routing and data orchestration
- UI components are pure and reusable
- Form components include validation and state management
- Layout components provide consistent structure
- Feature components encapsulate business logic

### 3. Type Safety First

- Everything must be typed with TypeScript
- Use Zod schemas for form validation and API data validation
- Leverage gql.tada for type-safe GraphQL operations
- Export and reuse types across components
- Use TanStack Router's type-safe navigation

## Folder Structure

```text
src/
├── routes/                     # TanStack Router file-based routes
│   ├── __root.tsx              # Root layout component
│   ├── index.tsx               # Home page
│   ├── auth/                   # Authentication routes
│   │   ├── route.tsx           # Auth layout
│   │   ├── index.tsx           # Auth redirect logic
│   │   ├── login.tsx           # Login page
│   │   ├── signup.tsx          # Registration page
│   │   └── forgot-password.tsx # Password reset page
│   ├── dashboard/              # Main application routes
│   │   ├── route.tsx           # Dashboard layout
│   │   ├── index.tsx           # Dashboard home
│   │   ├── projects/           # Project management
│   │   ├── daily-logs/         # Daily logging
│   │   ├── resources/          # Resource management
│   │   └── analytics/          # Analytics and insights
│   └── settings/               # User settings routes
├── components/                 # Reusable UI components
│   ├── ui/                     # shadcn/ui base components
│   │   ├── button.tsx          # Button variants
│   │   ├── form.tsx            # Form components
│   │   ├── input.tsx           # Input controls
│   │   ├── card.tsx            # Card layouts
│   │   └── ...                 # Other UI primitives
│   ├── forms/                  # Form-specific components
│   │   ├── auth-form.tsx       # Authentication forms
│   │   ├── project-form.tsx    # Project creation/editing
│   │   ├── log-form.tsx        # Daily log entry forms
│   │   └── ...                 # Other specialized forms
│   ├── layout/                 # Layout components
│   │   ├── header.tsx          # Main navigation header
│   │   ├── sidebar.tsx         # Sidebar navigation
│   │   ├── footer.tsx          # Footer component
│   │   └── dashboard-layout.tsx # Dashboard wrapper
│   ├── features/               # Feature-specific components
│   │   ├── auth/               # Authentication components
│   │   ├── projects/           # Project-related components
│   │   ├── daily-logs/         # Daily logging components
│   │   ├── resources/          # Resource management components
│   │   └── analytics/          # Charts and data visualization
│   └── common/                 # Shared utility components
│       ├── loading-spinner.tsx # Loading states
│       ├── error-boundary.tsx  # Error handling
│       ├── confirmation-dialog.tsx # Confirmation modals
│       └── ...                 # Other common components
├── hooks/                      # Custom React hooks
│   ├── use-auth.ts             # Authentication state and actions
│   ├── use-projects.ts         # Project management hooks
│   ├── use-daily-logs.ts       # Daily logging hooks
│   ├── use-resources.ts        # Resource management hooks
│   ├── use-local-storage.ts    # Local storage utilities
│   └── use-debounce.ts         # Performance optimization hooks
├── stores/                     # Zustand state stores
│   ├── auth-store.ts           # Authentication state
│   ├── ui-store.ts             # UI preferences (theme, sidebar state)
│   ├── project-store.ts        # Project-specific client state
│   └── settings-store.ts       # User preferences and settings
├── lib/                        # Utility functions and configurations
│   ├── utils.ts                # General utility functions (cn, etc.)
│   ├── constants.ts            # Application constants
│   ├── validations.ts          # Shared validation functions
│   ├── formatters.ts           # Data formatting utilities
│   ├── auth.ts                 # Authentication utilities
│   └── api.ts                  # API configuration and helpers
├── types/                      # TypeScript type definitions
│   ├── auth.ts                 # Authentication-related types
│   ├── project.ts              # Project data types
│   ├── daily-log.ts            # Daily log types
│   ├── resource.ts             # Resource types
│   ├── api.ts                  # API response types
│   └── common.ts               # Shared/common types
├── schemas/                    # Zod validation schemas
│   ├── auth.ts                 # Auth form schemas
│   ├── project.ts              # Project form schemas
│   ├── daily-log.ts            # Daily log schemas
│   ├── resource.ts             # Resource schemas
│   └── index.ts                # Export all schemas
├── graphql/                    # GraphQL configuration and operations
│   ├── graphql.ts              # gql.tada configuration
│   ├── graphql-env.d.ts        # Generated GraphQL types
│   ├── schema.graphql          # GraphQL schema file
│   ├── queries/                # GraphQL queries
│   │   ├── auth.ts             # Authentication queries
│   │   ├── projects.ts         # Project queries
│   │   ├── daily-logs.ts       # Daily log queries
│   │   └── resources.ts        # Resource queries
│   └── mutations/              # GraphQL mutations
│       ├── auth.ts             # Auth mutations
│       ├── projects.ts         # Project mutations
│       ├── daily-logs.ts       # Daily log mutations
│       └── resources.ts        # Resource mutations
├── integrations/               # Third-party integrations
│   ├── tanstack-query/         # TanStack Query setup
│   │   ├── root-provider.tsx   # Query client provider
│   │   └── layout.tsx          # Query devtools
│   ├── github/                 # GitHub API integration
│   └── analytics/              # Analytics integration
├── assets/                     # Static assets
│   ├── icons/                  # Custom SVG icons
│   ├── images/                 # Static images
│   └── animations/             # Animation files
├── styles/                     # Styling files
│   ├── globals.css             # Global styles and CSS variables
│   ├── components.css          # Component-specific styles
│   └── animations.css          # Animation definitions
└── utils/                      # Utility modules
    ├── date.ts                 # Date manipulation utilities
    ├── string.ts               # String processing utilities
    ├── array.ts                # Array manipulation utilities
    └── file.ts                 # File handling utilities
```

## Design Rules

### Rule 1: Route Organization

- Use TanStack Router's file-based routing system
- Each route must have a single responsibility
- Group related routes in folders with a `route.tsx` layout
- Use `index.tsx` for default routes and redirects
- Implement proper loading states and error boundaries

**Route Structure Pattern:**

```tsx
// src/routes/feature/route.tsx - Layout for feature section
export const Route = createFileRoute('/feature')({
  component: FeatureLayout,
})

// src/routes/feature/index.tsx - Default feature page
export const Route = createFileRoute('/feature/')({
  component: FeatureIndex,
})

// src/routes/feature/sub-page.tsx - Specific feature page
export const Route = createFileRoute('/feature/sub-page')({
  loader: () => fetchData(),
  component: SubPage,
})
```

### Rule 2: Component Organization

**UI Components (`src/components/ui/`):**

- Must be pure, reusable components from shadcn/ui
- Should not contain business logic
- Use consistent prop interfaces
- Include proper TypeScript types
- Follow shadcn/ui naming conventions

**Feature Components (`src/components/features/`):**

- Group by feature area (auth, projects, daily-logs, etc.)
- Include business logic specific to that feature
- Can use hooks and stores
- Should be composable and testable

**Form Components (`src/components/forms/`):**

- Use React Hook Form with Zod validation
- Include proper error handling and loading states
- Follow consistent patterns for form submission
- Use TypeScript for form data types

### Rule 3: State Management Strategy

**Use TanStack Query for:**

- Server state (API data, caching, synchronization)
- Data fetching and mutations
- Optimistic updates
- Background refetching

**Use Zustand for:**

- Client-side state that persists across routes
- User preferences and settings
- UI state (theme, sidebar open/closed)
- Authentication state

**Use Local Component State for:**

- UI interactions (form inputs, modals, dropdowns)
- Temporary state that doesn't need persistence
- Component-specific state

### Rule 4: GraphQL Operations

- Use gql.tada for type-safe GraphQL operations
- Organize queries and mutations by feature
- Include proper error handling
- Use fragments for reusable field selections
- Implement optimistic updates where appropriate

**GraphQL Pattern:**

```tsx
// src/graphql/queries/projects.ts
export const GET_PROJECTS = graphql(`
  query GetProjects($userId: ID!) {
    projects(userId: $userId) {
      id
      name
      description
      githubUrl
      createdAt
    }
  }
`)

// Usage in component
const { data, error, loading } = useQuery({
  queryKey: ['projects', userId],
  queryFn: () => request(endpoint, GET_PROJECTS, { userId }),
})
```

### Rule 5: Form Validation

- All forms must use Zod schemas for validation
- Create reusable schemas in `src/schemas/`
- Use React Hook Form for form state management
- Implement proper error messages and field validation
- Include loading states for form submissions

**Form Pattern:**

```tsx
// Schema definition
const projectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  githubUrl: z.string().url().optional(),
})

// Form component
function ProjectForm() {
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: '', description: '', githubUrl: '' }
  })

  return (
    <Form {...form}>
      {/* Form fields */}
    </Form>
  )
}
```

### Rule 6: Error Handling

- Implement error boundaries for route-level error handling
- Use consistent error message formatting based on error-codes.ts
- Provide user-friendly error messages based on standardized error codes
- Log errors for debugging purposes with error code context
- Include retry mechanisms where appropriate
- Follow the centralized error handling pattern defined in docs/ERROR_CODES.md

### Rule 7: Loading States

- Show loading spinners for async operations
- Use skeleton screens for content loading
- Implement proper loading states in forms
- Use TanStack Query's loading states
- Provide feedback for user actions

### Rule 8: Type Safety

- Export and reuse types across components
- Use strict TypeScript configuration
- Leverage gql.tada for GraphQL type safety
- Create shared type definitions in `src/types/`
- Use proper generic types for reusable components

### Rule 9: Focused Development Methodology

Follow a structured, single-focus development approach to ensure quality and maintainability:

**Development Cycle:**
1. **Focus on One Item**: Work on only one module, route, component, or server function at a time
2. **Complete Implementation**: Fully implement the feature with proper typing, validation, and error handling
3. **Test Thoroughly**: Verify functionality works as expected with proper testing
4. **Code Review & Refactoring**: 
   - Compare with existing code patterns
   - Identify and eliminate repetitive code
   - Extract reusable utilities or components
   - Ensure consistency with architecture patterns
5. **Update Documentation**: Update relevant files (README, docs, architecture guides)
6. **Commit & Move Forward**: Only then proceed to the next feature

**Benefits:**
- Prevents context switching and maintains focus
- Ensures each feature is properly tested before moving on
- Promotes code consistency and reusability
- Keeps documentation current and accurate
- Reduces technical debt accumulation

**Implementation Guidelines:**
- Break large features into smaller, focused tasks
- Use feature branches for each focused development cycle
- Write comprehensive commit messages explaining what was implemented
- Include testing steps and validation in commit descriptions
- Update architecture documentation when introducing new patterns

## Authentication & Authorization

### Client-Side Auth Flow

1. **Token Storage**: Store JWT tokens in memory and refresh tokens in httpOnly cookies
2. **Route Protection**: Use TanStack Router's `beforeLoad` for route guards
3. **Automatic Refresh**: Implement token refresh logic in API interceptors
4. **Logout Handling**: Clear all stored tokens and redirect to login

### Protected Routes Pattern

```tsx
export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/auth/login' })
    }
  },
  component: Dashboard,
})
```

## Performance Optimizations

### Code Splitting

- Use React.lazy for route-level code splitting
- Implement component-level lazy loading for heavy components
- Split vendor chunks appropriately
- Use dynamic imports for feature modules

### Bundle Optimization

- Tree-shake unused dependencies
- Use proper import paths to avoid large bundle sizes
- Implement proper caching strategies
- Optimize images and assets

### Data Fetching

- Use TanStack Query for efficient caching
- Implement proper cache invalidation
- Use optimistic updates for better UX
- Batch API requests where possible

## Styling Guidelines

> **📚 For complete styling documentation, see:**
> - [Style Guide](./docs/STYLE_GUIDE.md) - Comprehensive design system reference
> - [Styling Best Practices](./docs/STYLING_BEST_PRACTICES.md) - Practical implementation guide

### Tailwind CSS Usage

- Use utility classes for styling following our style guide
- Create custom components for repeated patterns
- Use CSS variables for theming (defined in `src/styles.css`)
- Follow mobile-first responsive design
- **Prioritize dark mode**: Design for dark mode first, then adapt for light mode
- **Responsive-first approach**: Ensure all components work seamlessly across devices
- Implement comprehensive dark/light mode support with smooth transitions

### Component Styling

- Use `cn()` utility from `src/lib/utils.ts` for conditional classes
- Use style utilities from `src/lib/style-utils.ts` for advanced styling patterns
- Keep styling close to components
- Use consistent spacing and sizing from our spacing scale
- Follow shadcn/ui design tokens and our custom semantic tokens
- Implement proper hover and focus states
- **Dark mode considerations**: Test all components in dark mode first
- **Mobile-responsive**: Ensure touch-friendly interactions and proper spacing on mobile devices
- **Accessibility**: Follow WCAG AA standards for all components

## Testing Strategy

### Component Testing

- Test UI components in isolation
- Mock external dependencies
- Test user interactions and state changes
- Use React Testing Library best practices
- Include accessibility testing

### Integration Testing

- Test user flows end-to-end
- Mock API responses consistently
- Test form validation and submission
- Verify routing behavior
- Test error boundaries and loading states

## Code Quality Rules

### Rule 9: Import Organization

- Group imports by type (React, libraries, internal)
- Use absolute imports with path aliases
- Avoid circular dependencies
- Import only what you need

### Rule 10: Naming Conventions

**Files and Folders:**

- Use kebab-case for files: `user-profile.tsx`
- Use PascalCase for components: `UserProfile`
- Use camelCase for utilities: `formatDate`

**Components:**

- Use PascalCase: `ProjectCard`, `LoginForm`
- Prefix hooks with `use`: `useAuth`, `useProjects`
- Suffix pages with `Page`: `DashboardPage`

**Variables and Functions:**

- Use camelCase: `userData`, `handleSubmit`
- Use descriptive names: `isLoading` not `loading`
- Use verbs for functions: `fetchProjects`, `validateForm`

### Rule 11: Accessibility

- Include proper ARIA labels and descriptions
- Ensure keyboard navigation works
- Use semantic HTML elements
- Implement proper focus management
- Test with screen readers

### Rule 12: Environment Configuration

- Use environment variables for API endpoints
- Configure different settings for dev/staging/production
- Validate environment variables at build time
- Document all required environment variables

## Feature Development Guidelines

### Adding New Features

1. **Plan the Route Structure**: Define URL patterns and navigation
2. **Create Component Hierarchy**: Break down into reusable components
3. **Design State Management**: Decide between server state, client state, and local state
4. **Implement Forms and Validation**: Create Zod schemas and form components
5. **Add GraphQL Operations**: Write queries, mutations, and types
6. **Implement Error Handling**: Add error boundaries and user feedback
7. **Add Tests**: Write component and integration tests
8. **Update Documentation**: Document new features and patterns

### Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] Components follow single responsibility principle
- [ ] Forms include proper validation
- [ ] Error handling is implemented
- [ ] Loading states are included
- [ ] Accessibility requirements are met
- [ ] Tests are written and passing
- [ ] No console errors or warnings
- [ ] Performance considerations are addressed

## Deployment and Build

### Build Configuration

- Optimize bundle size and performance
- Configure proper caching headers
- Set up environment-specific builds
- Include proper error monitoring
- Configure analytics and tracking

### Development Workflow

- Use hot module replacement for fast development
- Configure proper linting and formatting
- Set up pre-commit hooks
- Use TypeScript strict mode
- Include proper debugging tools

---

## How to Update This Document

When adding new rules or changing the architecture:

1. **First Rule**: Always update this `ARCHITECTURE.md` file
2. Update the relevant section (Design Rules, Folder Structure, etc.)
3. Add new rules with incremental numbers
4. Document the reasoning behind the change
5. Update any affected components to follow new rules
6. Create migration tasks if existing code needs updates
7. Update tests to reflect architectural changes

---

*Last Updated: June 1, 2025*
*Version: 1.0*
