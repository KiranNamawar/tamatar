# Tamatar Development Instructions

> **📚 Documentation**: For comprehensive project information, see the [docs/](../docs/) directory:
> - [Project Overview](../docs/PROJECT_OVERVIEW.md) - Project vision and business context
> - [Technical Specifications](../docs/TECHNICAL_SPECS.md) - Architecture and tech stack details
> - [Feature Roadmap](../docs/ROADMAP.md) - Complete feature development plan
> - [Architecture](../ARCHITECTURE.md) - Frontend architecture documentation
> - [Error Codes](../docs/ERROR_CODES.md) - Error handling and error code reference
> - [Style Guide](../docs/STYLE_GUIDE.md) - Comprehensive design system reference
> - [Styling Best Practices](../docs/STYLING_BEST_PRACTICES.md) - Practical implementation guide

## Project Context
Tamatar is a developer progress tracking application built with TanStack Start, allowing developers to log daily progress, manage projects, track GitHub activity, and discover learning resources.

## Tech Stack

### Core Technologies
- **Framework**: TanStack Start with TanStack Router and TanStack Query
- **UI**: shadcn/ui components with Tailwind CSS
- **Animation**: Motion (formerly Framer Motion)
- **Forms**: React Hook Form with Zod validation
- **GraphQL**: graphql-request with gql.tada for type-safe queries
- **State Management**: Zustand
- **Package Manager**: Bun
- **Runtime**: Node.js

### Key Architecture Decisions
- TypeScript strict mode for all files
- Dark mode first design approach
- Mobile-first responsive design
- Component composition over inheritance
- Server state (TanStack Query) + Client state (Zustand) + Local state (React useState)

## Code Conventions
- Use TypeScript for all files
- Follow shadcn/ui component patterns
- Use Zod schemas for all form validation and API data validation
- Implement proper error boundaries and loading states
- Use TanStack Query for all server state management
- Keep components small and focused (single responsibility)
- Use Zustand for client-side state that needs to persist across route changes

## File Organization
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   │   ├── button.tsx  # Core UI components
│   │   ├── status-badge.tsx # Custom UI components
│   │   └── theme-toggle.tsx # Theme switching component
│   ├── forms/          # Form components with validation
│   ├── charts/         # Data visualization components
│   └── layout/         # Layout-related components
├── routes/             # TanStack Router route components
├── lib/                # Utility functions and configurations
│   ├── utils.ts        # General utility functions (cn, etc.)
│   └── style-utils.ts  # Style-specific utility functions
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores
├── styles/             # Style-specific files
│   ├── animations.css  # Animation definitions
│   └── components.css  # Component-specific styles
├── types/              # TypeScript type definitions
│   ├── auth.ts         # Authentication-related types
│   ├── error-codes.ts  # Centralized error codes enum
│   ├── project.ts      # Project data types
│   └── common.ts       # Shared/common types
├── schemas/            # Zod validation schemas
└── api/                # API functions and GraphQL queries
```

## Styling Guidelines
- Follow the "dark mode first" design approach — design for dark mode, then adapt for light
- Use semantic color variables defined in `src/styles.css` (OKLCH color space)
- Use the `cn()` utility from `src/lib/utils.ts` for combining class names
- Use `src/lib/style-utils.ts` for advanced styling patterns
- Keep component-specific styles in `src/styles/components.css`
- Define animations in `src/styles/animations.css`
- Follow spacing and typography guidelines from the style guide
- Ensure all components meet WCAG AA accessibility standards
- Reference the comprehensive [Style Guide](../docs/STYLE_GUIDE.md) for detailed guidance

## Component Guidelines
- All form components should use React Hook Form with Zod validation
- Use shadcn/ui components as the foundation for all UI elements
- Implement proper loading and error states for all async operations
- Use Motion for smooth transitions and animations with duration variables
- Follow accessibility best practices (ARIA labels, keyboard navigation)
- Use the StatusBadge component for consistent status indicators
- Implement ThemeToggle for theme switching functionality

## Development Methodology
Follow a focused, single-item development approach:

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

This approach prevents context switching, ensures quality, promotes code reusability, and keeps documentation current.

## State Management
- Use TanStack Query for server state (API data, caching, synchronization)
- Use Zustand for client state that persists across routes (user preferences, UI state)
- Keep local component state minimal and focused on UI interactions only

## API Design
- Use GraphQL with gql.tada for type-safe queries and mutations
- Implement proper error handling and user feedback
- Use optimistic updates where appropriate
- Cache data effectively with TanStack Query

## Error Handling
- Use centralized error codes from `src/types/error-codes.ts`
- Implement error boundaries for route-level error handling
- Use consistent error response pattern with `ErrorResponse` interface
- Provide user-friendly error messages based on error codes
- Log errors with sufficient context for debugging
- Implement graceful degradation for failed API calls

## GitHub Integration Requirements
- OAuth authentication with GitHub
- Repository browsing and selection
- Commit history and diff viewing
- Issue and PR tracking
- Webhook support for real-time updates

## Authentication & Security
- Implement secure authentication flow
- Store tokens securely
- Validate all user inputs
- Implement proper authorization checks
- Use HTTPS for all API communications

## Performance Considerations
- Implement code splitting and lazy loading
- Optimize bundle size with proper imports
- Use React.memo and useMemo where appropriate
- Implement virtual scrolling for large lists
- Cache frequently accessed data

## Testing Strategy
- Unit tests for utility functions and hooks
- Component tests for UI components
- Integration tests for user flows
- End-to-end tests for critical paths
- Mock GraphQL responses for consistent testing

## Deployment
- Build optimized production bundles
- Environment-specific configurations
- Proper error logging and monitoring
- Performance tracking and analytics

## Advanced Database Models (for Backend Integration)
- **LearningPath**: Structured learning sequences with prerequisites and outcomes
- **Quiz**: Spaced repetition quizzes for knowledge retention
- **FocusSession**: Pomodoro and coding session tracking
- **Goal**: OKR-style personal development objectives
- **Mood**: Daily mood and energy level tracking
- **CodeMetric**: Repository health scores and complexity metrics
- **Collaboration**: Team projects and peer programming sessions
- **Achievement**: Gamification badges and milestones
- **LiveSession**: Real-time collaboration sessions
- **MarketplaceItem**: Paid courses and services
- **Organization**: Enterprise team management
- **Integration**: Third-party app connections
- **ContentItem**: User-generated content (blogs, videos)
- **Analytics**: Advanced performance metrics

## Backend Integration Requirements
- GraphQL Yoga server with Pothos schema builder
- Prisma ORM with PostgreSQL database
- JWT authentication using José
- Email notifications with React.Email + Pluck
- Structured logging with Pino
- File uploads and image processing
- Real-time subscriptions for collaborative features
- WebRTC for video/audio streaming
- Redis for caching and session management
- Elasticsearch for advanced search capabilities

## Advanced Technical Considerations
- **Microservices Architecture**: Separate services for AI, analytics, and content processing
- **Event-Driven Architecture**: Real-time updates using event sourcing
- **Machine Learning Pipeline**: Recommendation engine and predictive analytics
- **CDN Integration**: Global content delivery for resources and media
- **Security & Compliance**: SOC 2, GDPR compliance, and enterprise security
- **Scalability**: Auto-scaling infrastructure and database sharding

When implementing features, always consider the user experience, performance implications, and maintainability of the code. Focus on creating a polished, professional application that developers will enjoy using to track their progress.