# Tamatar Design System Documentation

Welcome to the comprehensive documentation for the Tamatar Design System - a modern, beautiful, and highly performant component library for React applications.

## Overview

Tamatar is a cutting-edge design system that combines the best of modern web technologies:

- **Motion Components**: Smooth, spring-based animations powered by Framer Motion
- **Aurora Components**: Stunning gradient backgrounds and atmospheric effects  
- **Glass Components**: Beautiful glass morphism with backdrop blur and transparency
- **UI Components**: Complete set of accessible, customizable interface components

## Getting Started

### Installation

The Tamatar design system is already set up in this workspace. Components can be imported from their respective modules:

```tsx
// Motion components
import { MotionDiv, MotionButton, MotionCard } from "@/components/motion";

// Aurora components  
import { AuroraBackground, AuroraHero, GradientText } from "@/components/aurora";

// Glass components
import { GlassCard, GlassButton, GlassInput } from "@/components/glass";

// UI components
import { Button, Card, Input } from "@/components/ui";
```

### Quick Example

Here's a simple example combining multiple Tamatar components:

```tsx
import { AuroraBackground } from "@/components/aurora";
import { GlassCard, GlassButton } from "@/components/glass";
import { MotionDiv } from "@/components/motion";

function WelcomePage() {
  return (
    <AuroraBackground variant="default">
      <div className="min-h-screen flex items-center justify-center p-6">
        <MotionDiv animation="fadeInUp" delay={0.2}>
          <GlassCard variant="enhanced" className="max-w-md p-8 text-center">
            <h1 className="text-3xl font-bold mb-4 gradient-text">
              Welcome to Tamatar
            </h1>
            <p className="text-muted-foreground mb-6">
              Experience the future of component design with beautiful 
              animations, stunning backgrounds, and glass morphism effects.
            </p>
            <GlassButton variant="primary" size="lg" className="w-full">
              Get Started
            </GlassButton>
          </GlassCard>
        </MotionDiv>
      </div>
    </AuroraBackground>
  );
}
```

## Component Categories

### 🎭 Motion Components
Smooth, accessible animations that respect user preferences and provide delightful interactions.

- **MotionDiv** - Animated containers with preset animations
- **MotionList/MotionItem** - Staggered list animations
- **MotionButton** - Interactive buttons with hover effects
- **MotionPage** - Page-level transition wrapper
- **MotionModal** - Animated modal dialogs
- **MotionCard** - Cards with hover animations
- **MotionText** - Animated text with gradient options

[📖 View Motion Components Documentation](./MOTION_COMPONENTS.md)

### 🌌 Aurora Components
Create immersive experiences with animated gradient backgrounds and atmospheric effects.

- **AuroraBackground** - Full-screen animated gradient backgrounds
- **AuroraHero** - Pre-built hero sections with aurora effects
- **AuroraSection** - Content sections with aurora backgrounds
- **GradientText** - Animated gradient text effects
- **FloatingElement** - Floating animation effects
- **AuroraOrb** - Animated orb elements for enhanced atmosphere

[📖 View Aurora Components Documentation](./AURORA_COMPONENTS.md)

### 🔮 Glass Components
Modern glass morphism effects with backdrop blur, transparency, and elegant borders.

- **GlassCard** - Foundation glass containers
- **GlassNav** - Navigation with glass morphism
- **GlassModal** - Modal dialogs with glass effects
- **GlassButton** - Buttons with glass styling
- **GlassInput** - Form inputs with glass morphism
- **GlassPanel** - Structured panels with header/footer

[📖 View Glass Components Documentation](./GLASS_COMPONENTS.md)

### 🎨 UI Components
Complete set of 46 accessible, customizable interface components built on Radix UI primitives.

Categories include: Form Components, Navigation, Data Display, Feedback, Layout, Overlay, Interactive, and Utility components.

[📖 View UI Components Documentation](./UI_COMPONENTS.md) | [📖 View Style Guide](./STYLE_GUIDE.md)

## Design Principles

### 1. **Accessibility First**
- All components follow WCAG 2.1 guidelines
- Keyboard navigation support
- Screen reader compatibility
- Respects user motion preferences
- High contrast mode support

### 2. **Performance Optimized**
- Hardware-accelerated animations
- Lazy loading where appropriate
- Minimal bundle impact
- Efficient re-renders
- Tree-shakeable components

### 3. **Developer Experience**
- TypeScript-first development
- Comprehensive documentation
- Live examples and playground
- Consistent API patterns
- Extensible and customizable

### 4. **Beautiful by Default**
- Modern glass morphism effects
- Smooth spring-based animations
- Stunning gradient backgrounds
- Consistent design language
- Dark mode support

## Best Practices

### Component Composition

Tamatar components are designed to work together seamlessly:

```tsx
// ✅ Excellent: Combining motion, aurora, and glass
<AuroraBackground variant="subtle">
  <MotionDiv animation="fadeInUp" className="container mx-auto p-6">
    <GlassCard variant="enhanced">
      <MotionText gradient className="text-2xl font-bold mb-4">
        Perfect Combination
      </MotionText>
      <p className="mb-6">Components working in harmony.</p>
      <MotionButton variant="scale">
        <GlassButton variant="primary">Action Button</GlassButton>
      </MotionButton>
    </GlassCard>
  </MotionDiv>
</AuroraBackground>
```

### Performance Guidelines

1. **Limit Simultaneous Animations**: Avoid too many elements animating at once
2. **Use Transform Properties**: Prefer `transform` over `layout` changes
3. **Optimize Aurora Usage**: Use aurora backgrounds sparingly
4. **Glass Effect Moderation**: Limit nested backdrop-filter elements

### Accessibility Considerations

1. **Motion Sensitivity**: All animations respect `prefers-reduced-motion`
2. **Color Contrast**: Test glass components against WCAG standards
3. **Focus Management**: Ensure focus indicators are clearly visible
4. **Keyboard Navigation**: All interactive elements are keyboard accessible

## Integration Examples

### Landing Page

```tsx
function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <AuroraHero
        title="Build Beautiful Apps"
        subtitle="The most advanced component library for modern React applications"
      >
        <div className="flex space-x-4">
          <GlassButton variant="primary" size="lg">Get Started</GlassButton>
          <GlassButton variant="ghost" size="lg">View Docs</GlassButton>
        </div>
      </AuroraHero>

      {/* Features Section */}
      <AuroraSection glassOverlay>
        <MotionDiv animation="fadeInUp" className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <GradientText>Amazing Features</GradientText>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to build stunning applications
          </p>
        </MotionDiv>

        <MotionList staggerDelay={0.1} className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <MotionItem key={feature.id}>
              <GlassCard variant="enhanced" className="p-6 h-full">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            </MotionItem>
          ))}
        </MotionList>
      </AuroraSection>
    </>
  );
}
```

### Dashboard Layout

```tsx
function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <GlassNav position="top">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          <Navigation />
          <UserMenu />
        </div>
      </GlassNav>

      <main className="container mx-auto px-6 pt-20 pb-8">
        <MotionDiv animation="fadeInUp" delay={0.1}>
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        </MotionDiv>

        <MotionList staggerDelay={0.05} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <MotionItem key={stat.id}>
              <GlassCard variant="subtle" className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
              </GlassCard>
            </MotionItem>
          ))}
        </MotionList>

        <div className="grid lg:grid-cols-2 gap-8">
          <GlassPanel
            header={<h2 className="text-xl font-semibold">Recent Activity</h2>}
          >
            <ActivityList />
          </GlassPanel>

          <GlassPanel
            header={<h2 className="text-xl font-semibold">Quick Actions</h2>}
          >
            <QuickActions />
          </GlassPanel>
        </div>
      </main>
    </div>
  );
}
```

## Development Workflow

### Local Development

Start the development server to see all components in action:

```bash
# Start development server
bun run dev

# Visit the showcase page
http://localhost:3000/showcase
```

### Testing Components

```bash
# Run component tests
bun run test

# Run tests in watch mode
bun run test:watch
```

### Building for Production

```bash
# Build the application
bun run build

# Preview the production build
bun run preview
```

## Browser Support

Tamatar components support all modern browsers:

- **Chrome**: 90+
- **Firefox**: 88+  
- **Safari**: 14+
- **Edge**: 90+

### Progressive Enhancement

- Glass morphism effects gracefully degrade in unsupported browsers
- Animations respect `prefers-reduced-motion` settings
- Fallback styles ensure functionality without advanced CSS features

## Contributing

### Component Development

When creating new components:

1. Follow existing patterns and conventions
2. Include comprehensive TypeScript types
3. Add documentation and examples
4. Ensure accessibility compliance
5. Test across different devices and browsers

### Documentation Updates

Keep documentation current by:

1. Adding examples for new features
2. Updating API references
3. Including migration guides for breaking changes
4. Maintaining the showcase page

## Showcase & Examples

Visit the interactive showcase to explore all components:

```
http://localhost:3000/showcase
```

The showcase includes:
- Live component demonstrations
- Interactive customization options
- Copy-paste code examples
- Performance benchmarks
- Accessibility testing tools

## Troubleshooting

### Common Issues

**Glass effects not visible**
- Ensure components are placed over colorful/image backgrounds
- Check that CSS backdrop-filter is supported
- Verify proper class names are applied

**Animations not working**
- Check that Framer Motion is properly installed
- Verify motion preferences aren't disabled
- Ensure proper animation variants are used

**Performance issues**
- Limit simultaneous animations
- Reduce backdrop-filter usage
- Optimize large lists with virtualization

### Getting Help

1. Check this documentation first
2. Review the showcase examples
3. Search existing issues
4. Create a detailed bug report with reproduction steps

## Changelog

### Latest Updates

**Component Enhancements**
- ✅ Enhanced Toggle glass variant with better opacity
- ✅ Added React Context to Tabs component for variant inheritance
- ✅ Fixed Switch component default variant contrast
- ✅ Complete Toast system redesign with glass/aurora variants
- ✅ Comprehensive workspace cleanup and organization

**Documentation**
- ✅ Complete Motion Components documentation
- ✅ Complete Aurora Components documentation  
- ✅ Complete Glass Components documentation
- ✅ Integration examples and best practices

---

**Built with ❤️ by the Tamatar team**

*Creating beautiful, accessible, and performant React applications has never been easier.*
