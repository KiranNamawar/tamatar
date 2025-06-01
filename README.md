# Tamatar - Developer Progress Tracker

A comprehensive web application designed specifically for developers to log their daily progress, track learning 
milestones, and manage development projects.

## 🚀 Current Status

**Project Progress**: 35% Complete  
**Current Phase**: Visual Effects & Foundation Complete, Dashboard Implementation In Progress

### ✅ Recently Completed

- **Glassomorphism Effects System** - Complete visual effects framework
- **Aurora Gradient Backgrounds** - Animated background system
- **OKLCH Color System** - Modern color space implementation
- **Dark Mode First Design** - Comprehensive theme support
- **Interactive Homepage** - Feature demonstration and showcase

### 🚧 In Development

- **Dashboard Layout** - Core application structure
- **Authentication System** - GitHub OAuth integration
- **Progress Logging** - Daily activity tracking

## 🛠️ Getting Started

To run this application:

```bash
bun install
bunx --bun run start  
```

For development with hot reload:

```bash
bun run dev
```

## Building For Production

To build this application for production:

```bash
bunx --bun run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
bunx --bun run test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling with a comprehensive design system. We follow 
a "dark mode first" approach and use the OKLCH color space for better perceptual color uniformity.

### Style Guidelines

- **Style Documentation**: 
  - [Style Guide](./docs/STYLE_GUIDE.md) - Complete design system reference
  - [Styling Best Practices](./docs/STYLING_BEST_PRACTICES.md) - Implementation guidance

- **Key Features**:
  - Semantic color variables in `src/styles.css`
  - Component-specific styles in `src/styles/components.css`
  - Animation definitions in `src/styles/animations.css`
  - Utility functions in `src/lib/style-utils.ts`
  - Consistent dark/light mode theming

- **Components**:
  - Standardized components following shadcn/ui patterns
  - Custom components like `StatusBadge` and `ThemeToggle`
  - Accessible, responsive, and theme-aware

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:

```bash
bunx --bun run lint
bunx --bun run format
bunx --bun run check
```

## Shadcn

Add components using the latest version of [Shadcn](https://ui.shadcn.com/).

```bash
pnpx shadcn@latest add button
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which 
means that the routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add another a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from 
`@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

### Dynamic Routes

TanStack router also supports dynamic routes (or route parameters). To add parameters in the route you need to add 
them in the route file name. For example if you want a route with an id parameter you can create a file in the 
following structure.

```bash
/src/routes/posts/$postId.tsx
```

This will create a route `/posts/$postId` where `$postId` is the parameter.

To access the parameter in your component you can use the `useParams` hook.

```tsx
import { useParams } from "@tanstack/react-router";

function PostComponent() {
  const { postId } = useParams({ from: "/posts/$postId" });
  return <div>Post ID: {postId}</div>;
}
```

### Nested Layouts

TanStack router supports nested layouts. To add a layout to a route you need to create a file with the name 
`route.tsx` in the folder where you want the layout to be applied.

For example if you want a layout for all routes under `/dashboard` you can create a file in the following structure.

```bash
/src/routes/dashboard/route.tsx
```

This will create a layout that will be applied to all routes under `/dashboard`.

```tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <nav>Navigation here</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

### Route Guards

TanStack router supports route guards. To add a guard to a route you can use the `beforeLoad` option in the route 
configuration.

```tsx
export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Dashboard,
});
```

## State Management

This project uses a combination of state management solutions:

- **Server State**: [TanStack Query](https://tanstack.com/query) for server state management
- **Client State**: [Zustand](https://github.com/pmndrs/zustand) for client-side state
- **Form State**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

### TanStack Query

For server state management, we use TanStack Query. This provides caching, background updates, and error handling.

```tsx
import { useQuery } from "@tanstack/react-query";

function UserProfile() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>User: {data.name}</div>;
}
```

### Zustand

For client-side state that needs to persist across routes, we use Zustand.

```tsx
import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
```

### Forms

All forms use React Hook Form with Zod validation.

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## TypeScript

This project uses TypeScript with strict mode enabled. All components, hooks, and utilities should be properly typed.

### Type Definitions

Types are organized in the `src/types/` directory:

- `src/types/auth.ts` - Authentication related types
- `src/types/project.ts` - Project data types
- `src/types/common.ts` - Shared/common types

### API Types

For GraphQL APIs, we use [gql.tada](https://gql-tada.0no.co/) for type-safe queries and mutations.

```tsx
import { graphql } from "@/graphql";

const GetUserQuery = graphql(`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`);
```

## Deployment

This project is configured for deployment on various platforms. The build output is a static site that can be 
hosted anywhere.

### Environment Variables

Make sure to set the following environment variables:

- `NODE_ENV` - Set to `production` for production builds
- `API_URL` - The URL of your backend API
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID

### Build Process

The build process includes:

- TypeScript compilation
- Bundle optimization
- Asset optimization
- Source map generation

## Architecture

For detailed information about the project architecture, see:

- [Architecture Guide](./ARCHITECTURE.md) - Frontend architecture and patterns
- [Technical Specifications](./docs/TECHNICAL_SPECS.md) - Complete technical details
- [Project Overview](./docs/PROJECT_OVERVIEW.md) - Project vision and business context

## Contributing

Please read our development guidelines and coding standards:

- [Development Rules](./docs/RULES.md) - Core development guidelines
- [Style Guide](./docs/STYLE_GUIDE.md) - Design system and styling standards
- [Best Practices](./docs/BEST_PRACTICES.md) - Implementation best practices
