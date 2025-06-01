# Tamatar Style Guide

This document defines the standardized styling approach for the Tamatar application. Following these guidelines
ensures visual consistency, better maintainability, and a more cohesive user experience.

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Component Usage](#component-usage)
5. [Dark Mode](#dark-mode)
6. [Responsive Design](#responsive-design)
7. [Animation Guidelines](#animation-guidelines)
8. [Accessibility Standards](#accessibility-standards)
9. [CSS Best Practices](#css-best-practices)
10. [Icon Usage](#icon-usage)

## Color System

All colors in Tamatar are defined as CSS variables in `src/styles.css`. We use the OKLCH color space for better
perceptual uniformity and color accuracy across displays.

### Primary Color Palette

| Usage | Light Mode | Dark Mode |
|-------|------------|-----------|
| Background | `var(--background)` | `var(--background)` |
| Foreground | `var(--foreground)` | `var(--foreground)` |
| Primary | `var(--primary)` | `var(--primary)` |
| Secondary | `var(--secondary)` | `var(--secondary)` |
| Muted | `var(--muted)` | `var(--muted)` |
| Accent | `var(--accent)` | `var(--accent)` |

### Semantic Colors

| Usage | Variable |
|-------|----------|
| Success | `var(--success)` |
| Warning | `var(--warning)` |
| Destructive | `var(--destructive)` |
| Info | `var(--info)` |

### Chart Colors

For data visualizations, use our predefined chart color palette:

```css
--chart-1: oklch(0.646 0.222 41.116);
--chart-2: oklch(0.6 0.118 184.704);
--chart-3: oklch(0.398 0.07 227.392);
--chart-4: oklch(0.828 0.189 84.429);
--chart-5: oklch(0.769 0.188 70.08);
```

### Color Usage Guidelines

- Never use hardcoded color values in components
- Always reference color variables using the `var()` function or Tailwind utility classes
- For custom components, extend the theme using Tailwind's theme system
- Use appropriate contrast ratios for accessibility (WCAG AA minimum)

## Typography

Tamatar uses a system font stack for optimal performance and native feel:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
  'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Font Sizes

Use Tailwind's type scale for consistency:

| Usage | Tailwind Class | Size |
|-------|---------------|------|
| Extra Small | `text-xs` | 0.75rem |
| Small | `text-sm` | 0.875rem |
| Base | `text-base` | 1rem |
| Large | `text-lg` | 1.125rem |
| Extra Large | `text-xl` | 1.25rem |
| 2XL | `text-2xl` | 1.5rem |
| 3XL | `text-3xl` | 1.875rem |
| 4XL | `text-4xl` | 2.25rem |

### Font Weights

| Usage | Tailwind Class | Weight |
|-------|---------------|--------|
| Regular | `font-normal` | 400 |
| Medium | `font-medium` | 500 |
| Semibold | `font-semibold` | 600 |
| Bold | `font-bold` | 700 |

### Line Heights

Use appropriate line heights for readability:

- Headlines: `leading-tight` (1.25)
- Body text: `leading-normal` (1.5)
- Small text: `leading-relaxed` (1.625)

## Spacing

Use Tailwind's spacing scale for all margins, padding, and gaps:

| Tailwind Class | Size | Usage |
|---------------|------|-------|
| `space-0` | 0px | No spacing |
| `space-1` | 0.25rem (4px) | Tight spacing (icons, badges) |
| `space-2` | 0.5rem (8px) | Default spacing between related items |
| `space-3` | 0.75rem (12px) | Spacing between form elements |
| `space-4` | 1rem (16px) | Standard component padding |
| `space-6` | 1.5rem (24px) | Section spacing |
| `space-8` | 2rem (32px) | Large component spacing |
| `space-10` | 2.5rem (40px) | Page section spacing |
| `space-12` | 3rem (48px) | Major page section divisions |

**Important**: Be consistent with spacing. Use the same spacing values for similar components and sections to create
visual rhythm.

## Component Usage

### Base Components

All UI components should be built from our shadcn/ui component library in `src/components/ui/`.

### Composition Pattern

Compose complex components from smaller, reusable ones:

```tsx
// Bad: Direct HTML elements with inline styles
<div className="p-4 rounded-md border border-gray-200">
  <h3 className="text-lg font-semibold mb-2">Project Name</h3>
  <p className="text-gray-500">Description</p>
</div>

// Good: Composed from UI components
<Card>
  <CardHeader>
    <CardTitle>Project Name</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Description</p>
  </CardContent>
</Card>
```

### Common Component Patterns

- Use `<Card>` for content containers
- Use `<Button>` for all clickable actions
- Use `<Input>`, `<Textarea>`, and other form components for user input
- Use `<Badge>` for status indicators and tags
- Use `<Dialog>` for modal interactions

## Dark Mode

Tamatar is designed with a "dark mode first" approach:

- Create components in dark mode first, then adapt for light mode
- Use CSS variables for theme colors, which automatically adjust for dark/light mode
- Test both themes for sufficient contrast and readability

### Theme Toggle Example

```tsx
function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
    setTheme(newTheme);
  };
  
  return (
    <Button variant="ghost" onClick={toggleTheme}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
```

## Responsive Design

Follow a mobile-first approach for all components:

- Start with mobile layout
- Add breakpoints for larger screens
- Use Tailwind's responsive modifiers

### Breakpoints

| Breakpoint | Width | Use Case |
|------------|-------|----------|
| `sm` | 640px | Small devices |
| `md` | 768px | Medium devices (tablets) |
| `lg` | 1024px | Large devices (laptops) |
| `xl` | 1280px | Extra large devices (desktops) |
| `2xl` | 1536px | Ultra-wide monitors |

### Responsive Example

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {projects.map(project => (
    <ProjectCard key={project.id} project={project} />
  ))}
</div>
```

## Animation Guidelines

Use Motion (formerly Framer Motion) for animations with consistent behavior:

- Keep animations subtle and purposeful
- Use animation to indicate state changes and provide feedback
- Respect user preferences for reduced motion

### Animation Durations

| Type | Duration | Usage |
|------|----------|-------|
| `fast` | 100-150ms | Micro-interactions (button presses, toggles) |
| `normal` | 200-300ms | Standard transitions (modals, drawers) |
| `slow` | 400-500ms | Major transitions (page changes) |

### Animation Example

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

## Accessibility Standards

All components must meet WCAG 2.1 AA standards:

- Ensure proper color contrast (minimum 4.5:1 for normal text)
- Use semantic HTML elements
- Include proper ARIA attributes when needed
- Support keyboard navigation
- Test with screen readers

## CSS Best Practices

- Use Tailwind utility classes for most styling
- Avoid inline styles
- Use the `cn()` utility for conditional classes
- Keep component-specific styles close to components
- Follow the "Single Responsibility Principle" for styles

### Using the cn() Utility

```tsx
import { cn } from '@/lib/utils';

function Button({ className, variant = 'default', ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded font-medium",
        variant === 'primary' && "bg-primary text-primary-foreground",
        variant === 'secondary' && "bg-secondary text-secondary-foreground",
        className
      )}
      {...props}
    />
  )
}
```

## Icon Usage

Tamatar uses Lucide React for icons. Follow these guidelines:

- Use consistent icon sizes (16px, 20px, 24px)
- Match icon color to text color when possible
- Add proper accessibility attributes (`aria-label`, `aria-hidden`)
- Use semantic icons that clearly communicate their purpose

### Icon Usage Example

```tsx
import { Settings, User, LogOut } from 'lucide-react';

function IconDemo() {
  return (
    <div className="flex gap-2">
      <Settings className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      <User className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      <LogOut className="h-5 w-5 text-destructive" aria-hidden="true" />
    </div>
  );
}
```

---

## Implementation Process

When implementing new features:

1. Reference this style guide
2. Use existing components whenever possible
3. Extend the component library only when necessary
4. Ensure consistency with existing UI patterns
5. Test in both light and dark modes
6. Validate responsive behavior across breakpoints
7. Have design reviews as part of the PR process

## Style Guide Updates

This style guide is a living document. When proposing changes:

1. Discuss with the team
2. Create a PR with the proposed changes
3. Update affected components as needed
4. Document the reasoning behind the changes

---

*Last Updated: June 1, 2025*
*Version: 1.0*
