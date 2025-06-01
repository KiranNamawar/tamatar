# Technical Specifications

## Implementation Status (June 1, 2025)

### ✅ Completed Infrastructure

- **Core Framework**: TanStack Start with TypeScript and React 18
- **UI System**: shadcn/ui components with Tailwind CSS
- **Visual Effects**: Complete glassomorphism and aurora gradient system
- **Color System**: OKLCH color space implementation with dark mode first
- **Animation System**: Hardware-accelerated animations with reduced motion
  support
- **Component Library**: Extended shadcn/ui with custom components (StatusBadge,
  ThemeToggle)
- **Font System**: Nunito Sans integration via Google Fonts
- **Development Tools**: Bun, TypeScript strict mode, ESLint, Prettier
- **Documentation**: Comprehensive architecture and style guides

### 🚧 In Progress

- **Authentication**: GitHub OAuth integration
- **Dashboard**: Core layout and navigation structure
- **State Management**: Zustand stores for client state

### 📋 Planned

- **Forms & Validation**: React Hook Form with Zod schemas
- **GraphQL Integration**: gql.tada for type-safe queries
- **Data Persistence**: TanStack Query for server state
- **Project Management**: GitHub repository integration
- **Progress Logging**: Rich text editor and tracking system

## Tech Stack Details

### Core Framework

- **TanStack Start**: Full-stack React framework with SSR/SSG capabilities
- **TanStack Router**: Type-safe file-based routing
- **TanStack Query**: Server state management with caching
- **React 18**: Latest React with concurrent features

### UI & Styling

- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Motion**: Animation library (formerly Framer Motion)
- **Lucide React**: Icon library

### Forms & Validation

- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between RHF and Zod

### State Management

- **Zustand**: Lightweight state management for client state
- **TanStack Query**: Server state management and caching
- **React Context**: Component-level state sharing

### GraphQL & API

- **graphql-request**: Minimal GraphQL client
- **gql.tada**: Type-safe GraphQL queries and mutations
- **GraphQL Yoga**: Server-side GraphQL implementation (backend)

### Development Tools

- **TypeScript**: Static type checking
- **ESLint**: Code linting and quality checks
- **Prettier**: Code formatting
- **Bun**: Package manager and runtime

## Architecture Patterns

### Component Architecture

```text
Component Hierarchy:
├── Pages (Route Components)
│   ├── Layout Components
│   │   ├── Feature Components
│   │   │   ├── UI Components
│   │   │   └── Form Components
│   │   └── Shared Components
│   └── Error Boundaries
```

### State Management Strategy

```text
State Layers:
├── Server State (TanStack Query)
│   ├── Cached API responses
│   ├── Background refetching
│   └── Optimistic updates
├── Client State (Zustand)
│   ├── User preferences
│   ├── UI state across routes
│   └── Application settings
└── Local State (React useState)
    ├── Form inputs
    ├── Modal states
    └── Component-specific UI
```

### Data Flow Architecture

```text
Data Flow:
User Action → Component → Hook → API Call → Server → Response → Cache → UI Update
```

## Performance Specifications

### Bundle Size Targets

- **Initial Bundle**: <500KB gzipped
- **Route Chunks**: <200KB per route
- **Component Chunks**: <50KB per lazy-loaded component
- **Asset Optimization**: Images <100KB, fonts subset

### Performance Metrics

- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Time to Interactive**: <3s
- **Cumulative Layout Shift**: <0.1

### Caching Strategy

```text
Cache Layers:
├── Browser Cache (static assets)
├── Service Worker Cache (offline support)
├── TanStack Query Cache (API responses)
└── CDN Cache (global distribution)
```

## Security Specifications

### Authentication Flow

```text
Auth Flow:
1. User Login → OAuth Provider (GitHub)
2. Authorization Code → Backend
3. JWT Token Generation → Secure Cookie
4. Client-side Token Validation
5. Protected Route Access
```

### Security Headers

- **Content Security Policy**: Strict CSP for XSS protection
- **HTTPS Only**: Force HTTPS in production
- **HSTS**: HTTP Strict Transport Security
- **X-Frame-Options**: Prevent clickjacking

### Input Validation

```text
Validation Layers:
├── Client-side (Zod schemas)
├── Server-side (GraphQL schema)
└── Database (constraints)
```

### Error Handling

```text
Error Handling Strategy:
├── Centralized error codes (src/types/error-codes.ts)
├── Consistent error responses (ErrorResponse interface)
├── Client-side handling based on error codes
└── Graceful degradation on errors
```

## Database Models (Backend Reference)

### Core Entities

```typescript
// User Model
interface User {
  id: string;
  email: string;
  githubId?: string;
  profile: UserProfile;
  projects: Project[];
  progressLogs: ProgressLog[];
  createdAt: Date;
  updatedAt: Date;
}

// Project Model
interface Project {
  id: string;
  name: string;
  description: string;
  githubRepoUrl?: string;
  ownerId: string;
  tags: Tag[];
  milestones: Milestone[];
  progressLogs: ProgressLog[];
  createdAt: Date;
  updatedAt: Date;
}

// Progress Log Model
interface ProgressLog {
  id: string;
  title: string;
  content: string; // Markdown content
  userId: string;
  projectId?: string;
  tags: Tag[];
  commits: CommitReference[];
  mood?: MoodLevel;
  energyLevel?: number;
  goalsForTomorrow?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Resource Model
interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  type: ResourceType;
  category: ResourceCategory;
  difficulty: DifficultyLevel;
  tags: Tag[];
  rating: number;
  reviewCount: number;
  addedBy: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Enums and Types

```typescript
enum ResourceType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
  COURSE = 'COURSE',
  DOCUMENTATION = 'DOCUMENTATION',
  TOOL = 'TOOL',
  BOOK = 'BOOK'
}

enum ResourceCategory {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  DEVOPS = 'DEVOPS',
  MOBILE = 'MOBILE',
  DESIGN = 'DESIGN',
  DATA_SCIENCE = 'DATA_SCIENCE'
}

enum DifficultyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

enum MoodLevel {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  NEUTRAL = 'NEUTRAL',
  LOW = 'LOW',
  FRUSTRATED = 'FRUSTRATED'
}
```

## API Specifications

### GraphQL Schema Structure

```graphql
type Query {
  # User queries
  me: User
  user(id: ID!): User
  
  # Project queries
  projects: [Project!]!
  project(id: ID!): Project
  
  # Progress Log queries
  progressLogs(
    userId: ID
    projectId: ID
    dateRange: DateRange
    tags: [String!]
    limit: Int
    offset: Int
  ): ProgressLogConnection!
  
  # Resource queries
  resources(
    category: ResourceCategory
    type: ResourceType
    difficulty: DifficultyLevel
    tags: [String!]
    search: String
    limit: Int
    offset: Int
  ): ResourceConnection!
}

type Mutation {
  # Auth mutations
  login(input: LoginInput!): AuthPayload!
  logout: Boolean!
  
  # Project mutations
  createProject(input: CreateProjectInput!): Project!
  updateProject(id: ID!, input: UpdateProjectInput!): Project!
  deleteProject(id: ID!): Boolean!
  
  # Progress Log mutations
  createProgressLog(input: CreateProgressLogInput!): ProgressLog!
  updateProgressLog(id: ID!, input: UpdateProgressLogInput!): ProgressLog!
  deleteProgressLog(id: ID!): Boolean!
  
  # Resource mutations
  createResource(input: CreateResourceInput!): Resource!
  updateResource(id: ID!, input: UpdateResourceInput!): Resource!
  deleteResource(id: ID!): Boolean!
}

type Subscription {
  # Real-time updates
  progressLogCreated(userId: ID!): ProgressLog!
  projectUpdated(projectId: ID!): Project!
}
```

### REST API Endpoints (Fallback)

```http
Authentication:
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

Projects:
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id

Progress Logs:
GET    /api/progress-logs
POST   /api/progress-logs
GET    /api/progress-logs/:id
PUT    /api/progress-logs/:id
DELETE /api/progress-logs/:id

Resources:
GET    /api/resources
POST   /api/resources
GET    /api/resources/:id
PUT    /api/resources/:id
DELETE /api/resources/:id

GitHub Integration:
GET    /api/github/repos
GET    /api/github/repos/:owner/:repo/commits
GET    /api/github/repos/:owner/:repo/commits/:sha
```

## Deployment Specifications

### Environment Configuration

```typescript
// Environment Variables
interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  API_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  JWT_SECRET: string;
  DATABASE_URL: string;
  REDIS_URL?: string;
  SENTRY_DSN?: string;
  ANALYTICS_ID?: string;
}
```

### Build Configuration

```typescript
// TanStack Start Configuration
export default defineConfig({
  build: {
    target: 'es2020',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          query: ['@tanstack/react-query'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
  ssr: {
    noExternal: ['@tanstack/react-query', '@tanstack/react-router'],
  },
});
```

### Infrastructure Requirements

```yaml
# Docker Configuration
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - API_URL=https://api.tamatar.dev
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
```

## Testing Specifications

### Test Structure

```text
tests/
├── unit/              # Unit tests
│   ├── components/    # Component tests
│   ├── hooks/         # Hook tests
│   ├── utils/         # Utility function tests
│   └── stores/        # Store tests
├── integration/       # Integration tests
│   ├── api/          # API integration tests
│   ├── auth/         # Authentication flow tests
│   └── workflows/    # User workflow tests
└── e2e/              # End-to-end tests
    ├── user-flows/   # Complete user journeys
    ├── accessibility/ # A11y tests
    └── performance/  # Performance tests
```

### Test Configuration

```typescript
// Vitest Configuration
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
```

## Monitoring & Analytics

### Error Tracking

- **Sentry**: Real-time error tracking and performance monitoring
- **Custom Logging**: Structured logging with context
- **User Feedback**: In-app error reporting

### Performance Monitoring

- **Web Vitals**: Core Web Vitals tracking
- **Bundle Analysis**: Regular bundle size monitoring
- **API Performance**: GraphQL query performance tracking

### User Analytics

- **Privacy-First**: No personal data tracking
- **Feature Usage**: Anonymous feature adoption metrics
- **Performance Metrics**: User-centric performance data
