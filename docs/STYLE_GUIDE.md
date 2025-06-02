# 🎨 Tamatar Style Guide

A comprehensive design system for the Tamatar developer productivity platform, featuring glassomorphic effects, aurora gradients, and subtle animations with a focus on dark mode and accessibility.

## 📋 Table of Contents

- [🎯 Design Philosophy](#-design-philosophy)
- [🎨 Color System](#-color-system)
- [✨ Typography](#-typography)
- [🌟 Glass Effects](#-glass-effects)
- [🌈 Aurora Gradients](#-aurora-gradients)
- [🎭 Animation System](#-animation-system)
- [📱 Responsive Design](#-responsive-design)
- [♿ Accessibility](#-accessibility)
- [🧩 Component Guidelines](#-component-guidelines)
- [🎛️ Component Variants](#️-component-variants)

## 🎯 Design Philosophy

Tamatar's design system embodies:

- **Dark-First Design**: Optimized for developers who prefer dark interfaces
- **Vibrant Modernism**: Bold, saturated colors that energize and inspire
- **Glassomorphic Aesthetics**: Translucent surfaces with backdrop blur effects
- **Subtle Animation**: Micro-interactions that feel natural and enhance UX
- **Developer-Centric**: Interfaces designed for productivity and focus

## 🎨 Color System

### Primary Brand Colors

```css
/* Purple/Blue Primary - The soul of Tamatar */
--primary: oklch(0.55 0.25 270);           /* Light Mode */
--primary: oklch(0.7 0.25 270);            /* Dark Mode */

/* Electric Accent Colors */
--accent: oklch(0.88 0.08 240);            /* Light Mode */
--accent: oklch(0.22 0.08 240);            /* Dark Mode */
```

### Color Palette

#### Light Mode
- **Background**: `oklch(0.99 0.01 280)` - Ultra-light purple-tinted white
- **Foreground**: `oklch(0.15 0.02 260)` - Deep purple-black
- **Primary**: `oklch(0.55 0.25 270)` - Vibrant purple-blue
- **Secondary**: `oklch(0.92 0.03 300)` - Soft coral tint
- **Accent**: `oklch(0.88 0.08 240)` - Electric blue

#### Dark Mode
- **Background**: `oklch(0.08 0.02 260)` - Deep space purple
- **Foreground**: `oklch(0.95 0.01 280)` - Pure white with purple tint
- **Primary**: `oklch(0.7 0.25 270)` - Bright electric purple
- **Secondary**: `oklch(0.25 0.08 300)` - Deep coral
- **Accent**: `oklch(0.22 0.08 240)` - Dark electric cyan

### Semantic Colors

- **Success**: `oklch(0.65 0.18 140)` / `oklch(0.7 0.18 140)`
- **Warning**: `oklch(0.75 0.15 80)` / `oklch(0.8 0.15 80)`
- **Destructive**: `oklch(0.6 0.22 15)` / `oklch(0.65 0.22 15)`

## ✨ Typography

### Font Family
- **Primary**: `Nunito Sans` - Modern, readable, developer-friendly
- **Code**: `JetBrains Mono, Fira Code, Cascadia Code` - Enhanced code readability

### Font Weights
- **Light**: 200-300 - Large headings, decorative text
- **Regular**: 400 - Body text, descriptions
- **Medium**: 500 - Subheadings, emphasis
- **Semibold**: 600 - Headings, important labels
- **Bold**: 700-800 - Strong emphasis, brand elements
- **Black**: 900 - Hero text, major headings

### Typography Scale
```css
/* Heading Scale */
.text-4xl  /* 2.25rem - Hero */
.text-3xl  /* 1.875rem - Page Title */
.text-2xl  /* 1.5rem - Section Header */
.text-xl   /* 1.25rem - Subsection */
.text-lg   /* 1.125rem - Large Body */
.text-base /* 1rem - Body */
.text-sm   /* 0.875rem - Small Text */
.text-xs   /* 0.75rem - Captions */
```

## 🌟 Glass Effects

### Glass Morphism Classes

```css
/* Basic Glass Effect */
.glass {
  backdrop-filter: blur(12px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Enhanced Glass Card */
.glass-card {
  backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark Mode Variants */
.glass-dark { /* Dark mode glass */ }
.glass-card-dark { /* Dark mode glass card */ }
```

### Usage Guidelines
- Use glass effects for overlays, modals, and floating elements
- Combine with subtle shadows for depth
- Ensure sufficient contrast for text readability
- Apply to navigation bars, cards, and popup menus

## 🌈 Aurora Gradients

### Aurora Background Classes

```css
/* Dark Aurora Background */
.aurora-bg {
  background: linear-gradient(135deg, 
    oklch(0.15 0.12 260) 0%, 
    oklch(0.12 0.08 300) 25%, 
    oklch(0.08 0.15 240) 50%, 
    oklch(0.12 0.1 280) 75%, 
    oklch(0.1 0.12 320) 100%);
  animation: aurora-shift 20s ease-in-out infinite;
}

/* Light Aurora Background */
.aurora-bg-light {
  background: linear-gradient(135deg, 
    oklch(0.95 0.05 260) 0%, 
    oklch(0.97 0.03 300) 25%, 
    oklch(0.98 0.02 240) 50%, 
    oklch(0.96 0.04 280) 75%, 
    oklch(0.94 0.06 320) 100%);
  animation: aurora-shift 20s ease-in-out infinite;
}
```

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, 
    oklch(0.7 0.2 260),
    oklch(0.65 0.25 300),
    oklch(0.6 0.22 240));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 8s ease-in-out infinite;
}
```

### Usage Guidelines
- Use aurora backgrounds for hero sections and app backgrounds
- Apply gradient text for headings and brand elements
- Ensure text remains readable over aurora backgrounds
- Combine with glass overlays for content areas

## 🎭 Animation System

### Animation Principles
- **Subtle**: Animations should enhance, not distract
- **Purposeful**: Every animation serves a functional purpose
- **Responsive**: Smooth performance across all devices
- **Accessible**: Respects user's motion preferences

### Core Animations

#### Hover Effects
```css
.hover-lift {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.hover-lift:hover {
  transform: translateY(-2px);
}
```

#### Smooth Transitions
```css
.smooth-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Motion Components (Using motion library)
```jsx
import { motion } from 'motion/react';

// Fade In Animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>

// Scale Animation
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>

// Layout Animation
<motion.div layout transition={{ duration: 0.3 }}>
```

### Animation Guidelines
- Use `cubic-bezier(0.4, 0, 0.2, 1)` for smooth easing
- Keep durations between 150ms-400ms for micro-interactions
- Use spring animations for interactive elements
- Implement layout animations for dynamic content

## 📱 Responsive Design

### Breakpoint System
```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Mobile Considerations
- Touch-friendly tap targets (minimum 44px)
- Readable text sizes (minimum 16px)
- Adequate spacing for fat fingers
- Simplified navigation patterns
- Performance-optimized animations

### Desktop Enhancements
- Hover states and micro-interactions
- Keyboard navigation support
- Multi-column layouts
- Advanced filtering and sorting
- Context menus and shortcuts

## ♿ Accessibility

### Contrast Requirements
- **AA Standard**: 4.5:1 for normal text, 3:1 for large text
- **AAA Standard**: 7:1 for normal text, 4.5:1 for large text
- All color combinations in this system meet AA standards
- Primary combinations meet AAA standards

### Focus Management
- Clear focus indicators with 2px outline
- Logical tab order throughout the interface
- Skip links for keyboard navigation
- Focus trapping in modals and overlays

### Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels and descriptions
- Alternative text for images and icons
- Status messages and live regions

### Motion Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🧩 Component Guidelines

### Card Components
- Use glass effects for floating cards
- Apply hover-lift animation
- Ensure sufficient padding (16px-24px)
- Round corners using radius-lg (12px)

### Button Components
- Primary: Solid background with primary color
- Secondary: Outlined with primary color
- Ghost: Transparent with hover effects
- Minimum touch target: 44px height

### Input Components
- Glass-style backgrounds with subtle borders
- Focus states with ring color
- Error states with destructive color
- Success states with success color

### Navigation Components
- Glass navigation bars with backdrop blur
- Active states with primary color
- Smooth transitions between states
- Breadcrumb navigation for deep hierarchies

### Modal and Overlay Components
- Glass overlays with backdrop blur
- Fade-in animations for opening
- Focus trapping and keyboard navigation
- Click-outside-to-close functionality

## 🎛️ Component Variants

All UI components in Tamatar support consistent variant systems for cohesive theming. The primary variants are:

### Core Variants

#### Default Variant
- Standard appearance following the design system
- Uses theme-aware colors (`bg-background`, `text-foreground`)
- Appropriate for most use cases

#### Glass Variant
- Translucent backdrop with blur effect
- `backdrop-blur-md bg-white/25 dark:bg-black/25`
- White/transparent borders: `border-white/30 dark:border-white/15`
- Consistent text colors: `text-slate-700 dark:text-slate-200`
- Perfect for overlays, modals, and floating elements

#### Aurora Variant
- Gradient backgrounds with aurora colors
- Purple/pink/cyan gradient: `from-purple-500/10 via-pink-500/10 to-cyan-500/10`
- Aurora borders: `border-purple-500/30 dark:border-purple-400/30`
- High contrast text: `text-foreground dark:text-white`
- Ideal for highlighting important content and call-to-actions

### Component Variant Coverage

#### Form Components
- **Button**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `glass`, `aurora`
- **Input**: `default`, `glass`, `aurora`
- **Textarea**: `default`, `glass`, `aurora`
- **Checkbox**: `default`, `glass`, `aurora`
- **Radio Group**: `default`, `glass`, `aurora`
- **Switch**: `default`, `glass`, `aurora`
- **Slider**: `default`, `glass`, `aurora`

#### Navigation Components
- **Tabs**: `default`, `glass`, `aurora`
- **Breadcrumb**: `default`, `glass`, `aurora`
- **Pagination**: Inherits from Button variants

#### Data Display
- **Badge**: `default`, `secondary`, `destructive`, `outline`, `glass`, `aurora`
- **Alert**: `default`, `destructive`, `glass`, `aurora`, `success`, `warning`
- **Table**: `default`, `glass`, `aurora`
- **Progress**: `default`, `secondary`, `destructive`, `glass`, `aurora`, `success`, `warning`
- **Tooltip**: `default`, `glass`, `aurora`
- **Avatar**: `default`, `glass`, `aurora`

#### Layout Components
- **Card**: `default`, `glass`, `aurora`, `outline`
- **Separator**: `default`, `glass`, `aurora`
- **Skeleton**: `default`, `glass`, `aurora`
- **Accordion**: `default`, `glass`, `aurora`

#### Interactive Components
- **Toggle**: `default`, `outline`, `glass`, `aurora`
- **Label**: `default`, `glass`, `aurora`

### Usage Examples

#### Basic Component with Variants
```jsx
import { Button } from "@/components/ui/button"

// Different button variants
<Button variant="default">Default Button</Button>
<Button variant="glass">Glass Button</Button>
<Button variant="aurora">Aurora Button</Button>
```

#### Form with Glass Theme
```jsx
import { Input, Label, Button, Card } from "@/components/ui"

<Card variant="glass" className="p-6">
  <div className="space-y-4">
    <div>
      <Label variant="glass">Email</Label>
      <Input variant="glass" type="email" placeholder="Enter email" />
    </div>
    <Button variant="glass" className="w-full">
      Sign In
    </Button>
  </div>
</Card>
```

#### Data Display with Aurora Theme
```jsx
import { Badge, Alert, Progress } from "@/components/ui"

<div className="space-y-4">
  <Badge variant="aurora">Featured</Badge>
  <Alert variant="aurora">
    <AlertTitle>Aurora Alert</AlertTitle>
    <AlertDescription>This uses the aurora variant</AlertDescription>
  </Alert>
  <Progress variant="aurora" value={60} />
</div>
```

#### Mixed Variant Layout
```jsx
import { Card, Tabs, Button, Avatar } from "@/components/ui"

<Card variant="glass" className="p-6">
  <div className="flex items-center gap-4 mb-4">
    <Avatar variant="aurora" />
    <div>
      <h3>User Profile</h3>
      <Badge variant="glass">Premium</Badge>
    </div>
  </div>
  
  <Tabs variant="aurora" defaultValue="overview">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      <Button variant="aurora">Edit Profile</Button>
    </TabsContent>
  </Tabs>
</Card>
```

### Variant Design Principles

1. **Consistency**: All variants follow the same color and styling patterns
2. **Accessibility**: Proper contrast ratios maintained across all variants
3. **Themability**: Variants work seamlessly in both light and dark modes
4. **Composability**: Variants can be mixed and matched for rich designs
5. **Performance**: Variants use efficient CSS classes without runtime overhead

### Semantic Variants

Some components include semantic variants for common use cases:

- **Success**: Green colors for positive states (`success`)
- **Warning**: Orange/yellow colors for caution (`warning`)  
- **Destructive**: Red colors for dangerous actions (`destructive`)
- **Secondary**: Muted colors for less important content (`secondary`)
- **Outline**: Transparent background with borders (`outline`)

### Custom Variant Creation

To create custom variants, extend the component's `cva` configuration:

```tsx
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-styles",
        glass: "glass-styles",
        aurora: "aurora-styles",
        custom: "your-custom-styles", // Add your variant
      },
    },
  }
);
```

## 🔧 Implementation Examples

### Glass Card Example
```jsx
import { motion } from 'motion/react';

const GlassCard = ({ children, className, ...props }) => (
  <motion.div
    className={`glass-card rounded-xl p-6 hover-lift ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    {...props}
  >
    {children}
  </motion.div>
);
```

### Aurora Background Example
```jsx
const AuroraHero = ({ children }) => (
  <div className="aurora-bg min-h-screen relative">
    <div className="glass absolute inset-0" />
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      {children}
    </div>
  </div>
);
```

### Animated Button Example
```jsx
import { motion } from 'motion/react';

const AnimatedButton = ({ children, variant = "primary", ...props }) => (
  <motion.button
    className={`btn btn-${variant} smooth-transition`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    {...props}
  >
    {children}
  </motion.button>
);
```

## 📝 Best Practices

### Performance
- Use `transform` and `opacity` for animations
- Implement `will-change` for complex animations
- Optimize images and use appropriate formats
- Lazy load non-critical components

### Code Organization
- Use consistent naming conventions
- Group related styles together
- Comment complex animations and effects
- Maintain a consistent file structure

### Testing
- Test in both light and dark modes
- Verify contrast ratios with tools
- Test with keyboard navigation
- Validate with screen readers

---

**Created for Tamatar - Empowering Developers Through Beautiful Design**

*Last updated: June 2025*
