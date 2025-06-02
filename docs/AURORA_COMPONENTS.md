# Aurora Components Documentation

The Aurora components provide stunning background effects and gradient animations inspired by the northern lights. These components create immersive, dynamic backgrounds perfect for hero sections, landing pages, and premium UI experiences.

## Installation

Aurora components are included in the Tamatar design system. Import them from:

```tsx
import {
  AuroraBackground,
  AuroraHero,
  AuroraSection,
  GradientText,
  FloatingElement,
  AuroraOrb,
} from "@/components/aurora";
```

## Core Components

### AuroraBackground

A full-screen animated gradient background that creates the signature aurora effect.

#### Basic Usage

```tsx
import { AuroraBackground } from "@/components/aurora";

function LandingPage() {
  return (
    <AuroraBackground>
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-6xl font-bold text-white">
          Welcome to the Future
        </h1>
      </div>
    </AuroraBackground>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "intense" \| "subtle"` | `"default"` | Aurora effect intensity |
| `animated` | `boolean` | `true` | Enable/disable background animation |
| `children` | `React.ReactNode` | - | Content to render over the background |

#### Variants

- **default**: Balanced aurora effect with medium intensity
- **intense**: High-contrast, vibrant aurora colors  
- **subtle**: Gentle, muted aurora effect

#### Examples

```tsx
// Hero section with intense aurora
<AuroraBackground variant="intense">
  <div className="container mx-auto px-6 py-20">
    <div className="text-center text-white">
      <h1 className="text-7xl font-black mb-6">Revolutionary Platform</h1>
      <p className="text-xl mb-8 opacity-90">
        Experience the next generation of digital innovation
      </p>
      <button className="glass-button px-8 py-4 text-lg">
        Get Started
      </button>
    </div>
  </div>
</AuroraBackground>

// Subtle background for content sections
<AuroraBackground variant="subtle" className="py-16">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold mb-8">Our Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <div key={feature.id} className="glass-card p-6">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</AuroraBackground>

// Static background without animation
<AuroraBackground animated={false}>
  <div className="min-h-screen flex items-center justify-center">
    <h1>Static Aurora Background</h1>
  </div>
</AuroraBackground>
```

### AuroraHero

A pre-built hero section component with aurora background and animated content.

#### Basic Usage

```tsx
import { AuroraHero } from "@/components/aurora";

function HomePage() {
  return (
    <AuroraHero
      title="Transform Your Business"
      subtitle="Leverage cutting-edge technology to scale your operations and reach new heights of success."
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="glass-button px-8 py-4 text-lg">
          Start Free Trial
        </button>
        <button className="glass-button-secondary px-8 py-4 text-lg">
          Watch Demo
        </button>
      </div>
    </AuroraHero>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Main hero title (optional) |
| `subtitle` | `string` | - | Hero subtitle text (optional) |
| `children` | `React.ReactNode` | - | Call-to-action buttons or additional content |
| `className` | `string` | - | Additional CSS classes |

#### Features

- Automatic aurora background
- Staggered text animations
- Responsive typography scaling
- Gradient text effect on title
- Centered content layout

#### Examples

```tsx
// Product launch hero
<AuroraHero
  title="Introducing Aurora UI"
  subtitle="The most beautiful component library ever created for modern web applications."
>
  <div className="flex flex-wrap gap-4 justify-center">
    <button className="glass-button px-8 py-4">
      Download Now
    </button>
    <button className="glass-button-secondary px-8 py-4">
      View Documentation
    </button>
    <button className="glass-button-ghost px-8 py-4">
      GitHub
    </button>
  </div>
</AuroraHero>

// Service business hero
<AuroraHero
  title="Professional Consulting"
  subtitle="Expert guidance to accelerate your digital transformation journey."
>
  <div className="max-w-md mx-auto">
    <form className="space-y-4">
      <input 
        type="email" 
        placeholder="Your email"
        className="glass-input w-full"
      />
      <button className="glass-button w-full py-4">
        Get Free Consultation
      </button>
    </form>
  </div>
</AuroraHero>

// Minimal hero with custom content
<AuroraHero>
  <div className="text-center">
    <div className="mb-8">
      <img 
        src="/logo.svg" 
        alt="Logo" 
        className="h-16 mx-auto mb-6"
      />
      <h1 className="text-6xl font-black gradient-text mb-4">
        Welcome Back
      </h1>
      <p className="text-xl text-white/80">
        Sign in to continue your journey
      </p>
    </div>
    <div className="glass-card max-w-sm mx-auto p-6">
      <LoginForm />
    </div>
  </div>
</AuroraHero>
```

### AuroraSection

A section wrapper that applies aurora background effects to content areas.

#### Basic Usage

```tsx
import { AuroraSection } from "@/components/aurora";

function FeaturesSection() {
  return (
    <AuroraSection glassOverlay>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Amazing Features</h2>
        <p className="text-xl text-muted-foreground">
          Discover what makes our platform special
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.id} className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </AuroraSection>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `glassOverlay` | `boolean` | `false` | Add glass morphism overlay |
| `children` | `React.ReactNode` | - | Section content |

#### Features

- Viewport-based animation triggering
- Light and dark mode aurora variants
- Automatic container and padding
- Optional glass overlay for enhanced depth

#### Examples

```tsx
// Testimonials section with glass overlay
<AuroraSection glassOverlay className="text-center">
  <h2 className="text-4xl font-bold mb-12">What Our Customers Say</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {testimonials.map((testimonial) => (
      <div key={testimonial.id} className="glass-card p-6">
        <p className="mb-4 italic">"{testimonial.quote}"</p>
        <div className="flex items-center">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="font-semibold">{testimonial.name}</div>
            <div className="text-sm text-muted-foreground">
              {testimonial.role}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</AuroraSection>

// Pricing section without overlay
<AuroraSection>
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
    <p className="text-xl">Flexible pricing for teams of all sizes</p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    {pricingPlans.map((plan) => (
      <div 
        key={plan.id} 
        className={`glass-card p-8 ${plan.featured ? 'ring-2 ring-primary' : ''}`}
      >
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <div className="text-3xl font-black mb-6">
          ${plan.price}<span className="text-lg font-normal">/month</span>
        </div>
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <button className="glass-button w-full py-3">
          {plan.featured ? 'Start Free Trial' : 'Get Started'}
        </button>
      </div>
    ))}
  </div>
</AuroraSection>
```

### GradientText

Animated gradient text component for highlighting important content.

#### Basic Usage

```tsx
import { GradientText } from "@/components/aurora";

function CalloutText() {
  return (
    <h1 className="text-4xl font-bold">
      Experience the <GradientText>Future</GradientText> today
    </h1>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animated` | `boolean` | `true` | Enable gradient animation |
| `children` | `React.ReactNode` | - | Text content |

#### Examples

```tsx
// Animated heading
<h1 className="text-6xl font-black text-center">
  <GradientText>Revolutionary</GradientText> Design System
</h1>

// Static gradient text
<h2 className="text-3xl font-bold">
  Built with <GradientText animated={false}>Performance</GradientText> in mind
</h2>

// Inline gradient text
<p className="text-lg">
  Join over <GradientText>10,000+ developers</GradientText> building 
  beautiful applications with our components.
</p>
```

### FloatingElement

Creates floating animation effects for decorative elements.

#### Basic Usage

```tsx
import { FloatingElement } from "@/components/aurora";

function DecorativeSection() {
  return (
    <div className="relative min-h-screen">
      <FloatingElement 
        direction="up" 
        duration={4}
        className="top-20 left-10"
      >
        <div className="w-16 h-16 bg-primary/20 rounded-full blur-sm" />
      </FloatingElement>
      
      <FloatingElement 
        direction="down" 
        duration={3}
        className="top-40 right-20"
      >
        <div className="w-12 h-12 bg-secondary/20 rounded-full blur-sm" />
      </FloatingElement>
      
      <div className="relative z-10 p-20">
        <h1>Main Content</h1>
      </div>
    </div>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"up" \| "down" \| "left" \| "right"` | `"up"` | Floating direction |
| `duration` | `number` | `3` | Animation duration in seconds |
| `children` | `React.ReactNode` | - | Element to animate |

#### Examples

```tsx
// Hero section with floating icons
<div className="relative aurora-bg min-h-screen">
  <FloatingElement direction="up" duration={4} className="top-20 left-10">
    <StarIcon className="w-8 h-8 text-yellow-400/40" />
  </FloatingElement>
  
  <FloatingElement direction="down" duration={5} className="top-32 right-16">
    <SparklesIcon className="w-6 h-6 text-blue-400/40" />
  </FloatingElement>
  
  <FloatingElement direction="left" duration={3.5} className="bottom-40 right-20">
    <HeartIcon className="w-10 h-10 text-pink-400/40" />
  </FloatingElement>
  
  <div className="relative z-10 flex items-center justify-center min-h-screen">
    <h1 className="text-7xl font-black gradient-text">
      Magical Experience
    </h1>
  </div>
</div>

// Floating geometric shapes
<div className="relative">
  <FloatingElement direction="up" className="top-10 left-1/4">
    <div className="w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-lg" />
  </FloatingElement>
  
  <FloatingElement direction="right" className="top-1/3 right-1/4">
    <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rotate-45 blur-lg" />
  </FloatingElement>
  
  <main className="relative z-10">
    {/* Main content */}
  </main>
</div>
```

### AuroraOrb

Animated orb elements that enhance the aurora effect with customizable colors and sizes.

#### Basic Usage

```tsx
import { AuroraOrb } from "@/components/aurora";

function EnhancedAuroraPage() {
  return (
    <div className="relative aurora-bg min-h-screen">
      <AuroraOrb 
        size="lg" 
        color="primary" 
        position={{ top: "20%", left: "10%" }}
      />
      <AuroraOrb 
        size="md" 
        color="secondary" 
        position={{ top: "60%", right: "15%" }}
      />
      <AuroraOrb 
        size="xl" 
        color="accent" 
        position={{ bottom: "10%", left: "30%" }}
      />
      
      <div className="relative z-10 p-20">
        <h1>Content with Enhanced Aurora</h1>
      </div>
    </div>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Orb size |
| `color` | `"primary" \| "secondary" \| "accent"` | `"primary"` | Orb color theme |
| `position` | `{top?: string, bottom?: string, left?: string, right?: string}` | `{top: "20%", left: "10%"}` | CSS positioning |
| `animated` | `boolean` | `true` | Enable pulsing animation |

#### Size Reference

- **sm**: 128px (8rem)
- **md**: 192px (12rem) 
- **lg**: 256px (16rem)
- **xl**: 320px (20rem)

#### Examples

```tsx
// Multiple orbs for rich atmosphere
<div className="relative aurora-bg min-h-screen overflow-hidden">
  {/* Large background orbs */}
  <AuroraOrb 
    size="xl" 
    color="primary" 
    position={{ top: "10%", left: "5%" }}
  />
  <AuroraOrb 
    size="xl" 
    color="secondary" 
    position={{ bottom: "10%", right: "5%" }}
  />
  
  {/* Medium accent orbs */}
  <AuroraOrb 
    size="lg" 
    color="accent" 
    position={{ top: "30%", right: "20%" }}
  />
  <AuroraOrb 
    size="lg" 
    color="primary" 
    position={{ bottom: "40%", left: "25%" }}
  />
  
  {/* Small detail orbs */}
  <AuroraOrb 
    size="sm" 
    color="secondary" 
    position={{ top: "50%", left: "60%" }}
  />
  <AuroraOrb 
    size="sm" 
    color="accent" 
    position={{ top: "70%", right: "40%" }}
  />
  
  <div className="relative z-10">
    {/* Your content */}
  </div>
</div>

// Static orbs for subtle enhancement
<div className="relative aurora-bg min-h-screen">
  <AuroraOrb 
    size="lg" 
    color="primary" 
    position={{ top: "25%", left: "15%" }}
    animated={false}
  />
  <AuroraOrb 
    size="md" 
    color="secondary" 
    position={{ bottom: "30%", right: "20%" }}
    animated={false}
  />
  
  <div className="relative z-10 p-20">
    <h1>Subtle Aurora Enhancement</h1>
  </div>
</div>
```

## CSS Classes

Aurora components rely on CSS classes defined in your styles. Ensure these are included:

```css
/* Aurora background gradients */
.aurora-bg {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: aurora-gradient 15s ease infinite;
}

.aurora-bg-intense {
  background: linear-gradient(-45deg, #ff6b6b, #ff8e53, #ff6348, #c44569, #546de5, #5f27cd);
  background-size: 600% 600%;
  animation: aurora-gradient 12s ease infinite;
}

.aurora-bg-light {
  background: linear-gradient(-45deg, #ffecd2, #fcb69f, #a8edea, #fed6e3);
  background-size: 400% 400%;
  animation: aurora-gradient 18s ease infinite;
}

@keyframes aurora-gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## Best Practices

### Performance

1. **Limit Aurora Sections**: Use aurora backgrounds sparingly to maintain performance
2. **Optimize Orb Count**: Avoid placing too many AuroraOrbs on a single page
3. **Consider Viewport**: Aurora effects work best on larger screens

### Design

1. **Content Contrast**: Ensure text remains readable over aurora backgrounds
2. **Glass Components**: Pair aurora backgrounds with glass morphism components
3. **Color Harmony**: Choose orb colors that complement your brand palette

### Accessibility

1. **Reduced Motion**: Aurora animations respect `prefers-reduced-motion`
2. **High Contrast**: Test aurora sections with high contrast mode
3. **Focus Indicators**: Ensure interactive elements remain visible

### Usage Patterns

```tsx
// ✅ Good: Hero section with aurora
<AuroraHero title="Welcome" subtitle="Description">
  <CallToAction />
</AuroraHero>

// ✅ Good: Accent section with subtle aurora
<AuroraSection variant="subtle">
  <FeatureGrid />
</AuroraSection>

// ❌ Avoid: Multiple intense aurora sections
<AuroraBackground variant="intense">
  <AuroraSection glassOverlay>
    <AuroraBackground variant="intense"> {/* Too much */}
    </AuroraBackground>
  </AuroraSection>
</AuroraBackground>
```

## Examples Repository

View live examples of all Aurora components in your development environment:

```
http://localhost:3000/showcase
```

The showcase includes interactive demos, customization options, and copy-paste code examples for each component.
