# Glassomorphism & Aurora Effects Guide

This guide covers the advanced visual effects implemented in Tamatar, including
glassomorphism and aurora gradient backgrounds.

## Overview

The Tamatar application now features sophisticated visual effects that enhance
the developer experience:

- **Glassomorphism Effects**: Modern glass-like UI components with blur and
  transparency
- **Aurora Gradient Backgrounds**: Animated gradient backgrounds inspired by
  aurora borealis
- **Developer-Focused Theming**: Color schemes optimized for developers with
  green (growth) and blue (tech) accents
- **Performance Optimized**: Hardware-accelerated animations with reduced
  motion support
- **Accessibility First**: WCAG AA compliant with proper contrast ratios

## Glassomorphism Effects

### Available Glass Variants

All glass effects are available as CSS classes that can be applied to any
element:

```css
/* Light glass effects */
.glass-light {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-medium {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.glass-heavy {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Dark glass effects */
.glass-dark-light {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-dark-medium {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.glass-dark-heavy {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Usage Examples

#### React Component with Glass Effect

```tsx
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  variant?: 'light' | 'medium' | 'heavy'
  className?: string
}

export function GlassCard({ 
  children, 
  variant = 'medium', 
  className 
}: GlassCardProps) {
  return (
    <div className={cn(
      'glass-medium rounded-lg p-6',
      variant === 'light' && 'glass-light',
      variant === 'heavy' && 'glass-heavy',
      className
    )}>
      {children}
    </div>
  )
}
```

#### Tailwind CSS Integration

The glass effects are also available as Tailwind utility classes:

```tsx
<div className="glass-card backdrop-blur-md bg-white/10 border border-white/20">
  <h3 className="text-lg font-semibold text-white">Glass Card</h3>
  <p className="text-white/80">Content with glass background</p>
</div>
```

### Browser Support

Glass effects use modern CSS features with fallbacks:

- **backdrop-filter**: Supported in all modern browsers (Chrome 76+, Firefox 
  103+, Safari 14+)
- **Fallback**: Regular background colors for unsupported browsers
- **Progressive Enhancement**: Effects are enhanced features, not required

## Aurora Gradient Backgrounds

### Available Aurora Variants

Five different aurora gradient animations are available:

#### Aurora 1: Blue-Green Spectrum

```css
.aurora-1 {
  background: linear-gradient(
    45deg,
    #1e3a8a 0%,
    #3b82f6 25%,
    #06b6d4 50%,
    #10b981 75%,
    #22c55e 100%
  );
  background-size: 400% 400%;
  animation: aurora-1 15s ease-in-out infinite;
}
```

#### Aurora 2: Purple-Blue Spectrum

```css
.aurora-2 {
  background: linear-gradient(
    -45deg,
    #581c87 0%,
    #7c3aed 25%,
    #3b82f6 50%,
    #06b6d4 75%,
    #0891b2 100%
  );
  background-size: 400% 400%;
  animation: aurora-2 20s ease-in-out infinite;
}
```

#### Aurora 3: Green-Cyan Spectrum

```css
.aurora-3 {
  background: linear-gradient(
    135deg,
    #064e3b 0%,
    #059669 25%,
    #10b981 50%,
    #06b6d4 75%,
    #0284c7 100%
  );
  background-size: 400% 400%;
  animation: aurora-3 25s ease-in-out infinite;
}
```

#### Aurora 4: Warm Spectrum

```css
.aurora-4 {
  background: linear-gradient(
    225deg,
    #7c2d12 0%,
    #ea580c 25%,
    #f59e0b 50%,
    #10b981 75%,
    #3b82f6 100%
  );
  background-size: 400% 400%;
  animation: aurora-4 18s ease-in-out infinite;
}
```

#### Aurora 5: Cool Spectrum

```css
.aurora-5 {
  background: linear-gradient(
    315deg,
    #1e1b4b 0%,
    #4338ca 25%,
    #7c3aed 50%,
    #c026d3 75%,
    #06b6d4 100%
  );
  background-size: 400% 400%;
  animation: aurora-5 22s ease-in-out infinite;
}
```

### Animation Keyframes

Each aurora gradient uses unique keyframes for smooth, organic movement:

```css
@keyframes aurora-1 {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}

@keyframes aurora-2 {
  0%, 100% { background-position: 0% 0%; }
  33% { background-position: 100% 50%; }
  66% { background-position: 50% 100%; }
}

@keyframes aurora-3 {
  0%, 100% { background-position: 25% 25%; }
  20% { background-position: 75% 25%; }
  40% { background-position: 75% 75%; }
  60% { background-position: 25% 75%; }
  80% { background-position: 50% 50%; }
}

@keyframes aurora-4 {
  0%, 100% { background-position: 0% 100%; }
  50% { background-position: 100% 0%; }
}

@keyframes aurora-5 {
  0%, 100% { background-position: 50% 0%; }
  25% { background-position: 100% 100%; }
  75% { background-position: 0% 50%; }
}
```

### Usage in React Components

#### Hero Section with Aurora Background

```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-1" />
      
      {/* Glass overlay for content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="glass-medium max-w-4xl mx-auto p-8 rounded-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Track Your Developer Journey
          </h1>
          <p className="text-xl text-white/90 mb-8">
            The ultimate progress tracking tool for developers
          </p>
        </div>
      </div>
    </section>
  )
}
```

#### Card with Aurora Border

```tsx
export function AuroraCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-1 rounded-lg">
      {/* Aurora border */}
      <div className="absolute inset-0 aurora-3 rounded-lg" />
      
      {/* Content with glass effect */}
      <div className="relative glass-dark-medium rounded-lg p-6">
        {children}
      </div>
    </div>
  )
}
```

## Performance Optimization

### Hardware Acceleration

All animations use hardware-accelerated properties:

```css
.aurora-1, .aurora-2, .aurora-3, .aurora-4, .aurora-5 {
  will-change: background-position;
  transform: translateZ(0); /* Force hardware acceleration */
}

.glass-light, .glass-medium, .glass-heavy,
.glass-dark-light, .glass-dark-medium, .glass-dark-heavy {
  will-change: backdrop-filter;
  transform: translateZ(0);
}
```

### Reduced Motion Support

Respects user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .aurora-1, .aurora-2, .aurora-3, .aurora-4, .aurora-5 {
    animation: none;
    background-position: 50% 50%;
  }
  
  .glass-light, .glass-medium, .glass-heavy,
  .glass-dark-light, .glass-dark-medium, .glass-dark-heavy {
    transition: none;
  }
}
```

### Performance Best Practices

1. **Limit Concurrent Animations**: Use only one aurora background per screen
2. **Optimize Layers**: Use `transform: translateZ(0)` to create compositing 
   layers
3. **Reduce Paint Operations**: Avoid animating properties that trigger repaints
4. **Monitor Performance**: Use browser dev tools to check animation 
   performance

## Accessibility Considerations

### Color Contrast

All text over glass and aurora backgrounds maintains WCAG AA contrast ratios:

- **White text**: Minimum 4.5:1 contrast ratio
- **Light text**: Uses rgba(255, 255, 255, 0.9) for better contrast
- **Dark backgrounds**: Ensure sufficient opacity for readability

### Reduced Motion

Users with vestibular disorders can disable animations:

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <div className={cn(
      'background-card',
      !prefersReducedMotion && 'aurora-1'
    )}>
      Content
    </div>
  )
}
```

### Focus Management

Glass elements maintain proper focus indicators:

```css
.glass-element:focus {
  outline: 2px solid rgba(59, 130, 246, 0.8);
  outline-offset: 2px;
}
```

## Dark Mode Integration

Effects automatically adapt to the current theme:

```css
:root {
  --glass-bg-light: rgba(255, 255, 255, 0.1);
  --glass-border-light: rgba(255, 255, 255, 0.2);
}

.dark {
  --glass-bg-light: rgba(0, 0, 0, 0.2);
  --glass-border-light: rgba(255, 255, 255, 0.1);
}

.glass-adaptive {
  background: var(--glass-bg-light);
  border: 1px solid var(--glass-border-light);
  backdrop-filter: blur(12px);
}
```

## Implementation Guide

### Step 1: Include CSS

Add the effects CSS file to your project:

```tsx
// In your main CSS file or component
import '@/styles/effects.css'
```

### Step 2: Apply Classes

Use the predefined classes in your components:

```tsx
<div className="aurora-1">
  <div className="glass-medium p-6 rounded-lg">
    <h2>Glass Content</h2>
  </div>
</div>
```

### Step 3: Customize (Optional)

Create custom variants using CSS variables:

```css
.custom-aurora {
  background: linear-gradient(
    45deg,
    var(--primary) 0%,
    var(--secondary) 50%,
    var(--accent) 100%
  );
  background-size: 400% 400%;
  animation: aurora-1 15s ease-in-out infinite;
}
```

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|---------|------|
| backdrop-filter | 76+ | 103+ | 14+ | 79+ |
| CSS animations | ✅ | ✅ | ✅ | ✅ |
| CSS gradients | ✅ | ✅ | ✅ | ✅ |
| will-change | ✅ | ✅ | ✅ | ✅ |

## Troubleshooting

### Common Issues

1. **Blur not working**: Check if `backdrop-filter` is supported
2. **Animation stuttering**: Add `will-change` and `transform: translateZ(0)`
3. **Poor performance**: Limit the number of animated elements
4. **Accessibility concerns**: Ensure reduced motion preferences are respected

### Debug Tools

Use browser dev tools to inspect performance:

```typescript
// Performance monitoring
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'paint') {
      console.log(`${entry.name}: ${entry.startTime}ms`)
    }
  }
})

observer.observe({ entryTypes: ['paint'] })
```

---

*Last Updated: June 1, 2025*  
*Version: 1.0*
