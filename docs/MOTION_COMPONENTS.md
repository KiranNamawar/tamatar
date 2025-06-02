# Motion Components Documentation

The Tamatar motion components provide smooth, spring-based animations powered by Framer Motion. They offer pre-configured animations and interaction patterns while remaining fully customizable.

## Installation

The motion components are already included in the Tamatar design system. Import them from:

```tsx
import {
  MotionDiv,
  MotionList,
  MotionItem,
  MotionButton,
  MotionPage,
  MotionModal,
  MotionCard,
  MotionText,
} from "@/components/motion";
```

## Core Components

### MotionDiv

The foundation component for animated containers with pre-built animation presets.

#### Basic Usage

```tsx
import { MotionDiv } from "@/components/motion";

function MyComponent() {
  return (
    <MotionDiv animation="fadeInUp" delay={0.2}>
      <h1>Animated Content</h1>
    </MotionDiv>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `"fadeIn" \| "fadeInUp" \| "scaleIn" \| "slideInLeft" \| "slideInRight" \| "none"` | `"fadeIn"` | Animation preset to use |
| `delay` | `number` | `0` | Animation delay in seconds |
| `duration` | `number` | `0.5` | Animation duration in seconds |

#### Animation Presets

- **fadeIn**: Simple opacity transition
- **fadeInUp**: Fade in with upward movement  
- **scaleIn**: Scale from 80% to 100% with fade
- **slideInLeft**: Slide in from the left
- **slideInRight**: Slide in from the right
- **none**: No animation

#### Examples

```tsx
// Staggered content sections
<div className="space-y-8">
  <MotionDiv animation="fadeInUp" delay={0}>
    <h1>Main Title</h1>
  </MotionDiv>
  
  <MotionDiv animation="fadeInUp" delay={0.2}>
    <p>Description content</p>
  </MotionDiv>
  
  <MotionDiv animation="scaleIn" delay={0.4}>
    <button>Call to Action</button>
  </MotionDiv>
</div>

// Slide-in sidebar
<MotionDiv 
  animation="slideInLeft" 
  className="fixed left-0 top-0 h-full w-64 bg-background"
>
  <nav>Navigation content</nav>
</MotionDiv>
```

### MotionList & MotionItem

Components for creating staggered list animations where child items animate in sequence.

#### Basic Usage

```tsx
import { MotionList, MotionItem } from "@/components/motion";

function AnimatedList() {
  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <MotionList staggerDelay={0.1} className="space-y-4">
      {items.map((item, index) => (
        <MotionItem key={index} className="p-4 bg-card rounded-lg">
          {item}
        </MotionItem>
      ))}
    </MotionList>
  );
}
```

#### MotionList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `staggerDelay` | `number` | `0.1` | Delay between each child animation |

#### Examples

```tsx
// Product grid with staggered animation
<MotionList 
  staggerDelay={0.05} 
  className="grid grid-cols-1 md:grid-cols-3 gap-6"
>
  {products.map((product) => (
    <MotionItem key={product.id} className="glass-card p-6">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </MotionItem>
  ))}
</MotionList>

// Navigation menu items
<MotionList staggerDelay={0.08} className="flex space-x-6">
  {navItems.map((item) => (
    <MotionItem key={item.id}>
      <a href={item.href} className="nav-link">
        {item.label}
      </a>
    </MotionItem>
  ))}
</MotionList>
```

### MotionButton

Enhanced button component with hover and tap animations.

#### Basic Usage

```tsx
import { MotionButton } from "@/components/motion";

function InteractiveButton() {
  return (
    <MotionButton 
      variant="scale" 
      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
      onClick={() => console.log("Clicked!")}
    >
      Click Me
    </MotionButton>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"scale" \| "lift" \| "none"` | `"scale"` | Hover animation style |

#### Animation Variants

- **scale**: Scales to 105% on hover, 95% on tap
- **lift**: Moves up 2px on hover with spring animation
- **none**: No hover animations

#### Examples

```tsx
// Primary action button with scale effect
<MotionButton 
  variant="scale"
  className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold"
>
  Get Started
</MotionButton>

// Subtle lift effect for cards
<MotionButton 
  variant="lift"
  className="w-full p-6 bg-card hover:bg-card/80 rounded-lg text-left"
>
  <h3 className="font-semibold">Card Title</h3>
  <p className="text-muted-foreground">Card description</p>
</MotionButton>

// Icon button without animations
<MotionButton 
  variant="none"
  className="p-2 rounded-full hover:bg-accent"
>
  <IconClose className="w-4 h-4" />
</MotionButton>
```

### MotionPage

Wrapper component for page-level transitions, ideal for route animations.

#### Basic Usage

```tsx
import { MotionPage } from "@/components/motion";

function AboutPage() {
  return (
    <MotionPage className="container mx-auto px-6">
      <h1>About Us</h1>
      <p>Page content...</p>
    </MotionPage>
  );
}
```

#### Features

- Automatic page enter/exit animations
- Maintains minimum screen height
- Works with routing libraries
- Includes opacity and Y-axis movement

#### Router Integration

```tsx
// With React Router
import { AnimatePresence } from "motion/react";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <MotionPage>
            <HomePage />
          </MotionPage>
        } />
        <Route path="/about" element={
          <MotionPage>
            <AboutPage />
          </MotionPage>
        } />
      </Routes>
    </AnimatePresence>
  );
}
```

### MotionModal

Pre-animated modal component with backdrop and content animations.

#### Basic Usage

```tsx
import { MotionModal } from "@/components/motion";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <MotionModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
        <p className="text-muted-foreground mb-6">Modal content goes here.</p>
        <button 
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Close
        </button>
      </MotionModal>
    </>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Controls modal visibility |
| `onClose` | `() => void` | - | Callback when backdrop is clicked |

#### Features

- Animated backdrop with blur effect
- Spring-based content animation
- Click outside to close
- Glass morphism styling
- Automatic focus management

### MotionCard

Animated card component with optional hover effects.

#### Basic Usage

```tsx
import { MotionCard } from "@/components/motion";

function ProductCard() {
  return (
    <MotionCard hoverEffect className="max-w-sm">
      <img src="/product.jpg" alt="Product" className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-6">
        <h3 className="text-lg font-semibold">Product Name</h3>
        <p className="text-muted-foreground">Product description</p>
      </div>
    </MotionCard>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hoverEffect` | `boolean` | `true` | Enable hover lift animation |

#### Examples

```tsx
// Interactive product cards
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {products.map((product) => (
    <MotionCard key={product.id} hoverEffect>
      <img src={product.image} alt={product.name} />
      <div className="p-6">
        <h3>{product.name}</h3>
        <p className="text-muted-foreground">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold">${product.price}</span>
          <button className="btn-primary">Add to Cart</button>
        </div>
      </div>
    </MotionCard>
  ))}
</div>

// Static information cards
<MotionCard hoverEffect={false} className="bg-muted">
  <div className="p-6">
    <h3>Important Notice</h3>
    <p>This card doesn't have hover effects.</p>
  </div>
</MotionCard>
```

### MotionText

Animated text component with optional gradient effects.

#### Basic Usage

```tsx
import { MotionText } from "@/components/motion";

function GradientHeading() {
  return (
    <MotionText gradient className="text-4xl font-bold">
      Beautiful Gradient Text
    </MotionText>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gradient` | `boolean` | `false` | Apply gradient text styling |

#### Examples

```tsx
// Hero section with gradient text
<div className="text-center">
  <MotionText gradient className="text-6xl font-black mb-4">
    Welcome to Tamatar
  </MotionText>
  <MotionText className="text-xl text-muted-foreground">
    The modern design system for React applications
  </MotionText>
</div>

// Section headings
<MotionText gradient className="text-3xl font-bold mb-8">
  Features
</MotionText>
```

## Advanced Usage

### Custom Animations

You can override default animations by passing motion props directly:

```tsx
<MotionDiv
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
>
  Custom animated content
</MotionDiv>
```

### Combining with Other Components

Motion components work seamlessly with other Tamatar components:

```tsx
import { MotionCard } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

<MotionCard>
  <div className="p-6">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-semibold">Article Title</h3>
      <Badge variant="secondary">New</Badge>
    </div>
    <p className="text-muted-foreground mb-4">Article excerpt...</p>
    <Button>Read More</Button>
  </div>
</MotionCard>
```

### Performance Considerations

- Motion components use hardware acceleration where possible
- Animations respect the user's `prefers-reduced-motion` setting
- Use `transform` properties for better performance
- Avoid animating `layout` properties when possible

### Accessibility

- All animations respect `prefers-reduced-motion`
- Focus management is handled automatically in modals
- Screen readers work correctly with animated content
- Keyboard navigation is preserved

## Animation Library

The motion components use the `@/lib/animations` library which provides additional animation variants:

```tsx
import { 
  fadeIn, 
  fadeInUp, 
  scaleIn, 
  hoverLift, 
  cardHover,
  easing,
  duration 
} from "@/lib/animations";

// Use with custom motion components
<motion.div
  variants={cardHover}
  whileHover="hover"
  whileTap="tap"
>
  Custom card
</motion.div>
```

## Best Practices

1. **Consistent Timing**: Use consistent delay and duration values across your app
2. **Stagger Appropriately**: Don't overuse stagger animations - reserve for lists and related content
3. **Respect Performance**: Limit the number of simultaneously animating elements
4. **Consider Context**: Use subtle animations for UI elements, more dramatic ones for marketing content
5. **Test Accessibility**: Always test with reduced motion preferences enabled

## Examples Repository

For more complex examples and patterns, see the showcase page in your development environment:

```
http://localhost:3000/showcase
```

This page demonstrates all motion components with live examples and code snippets.
