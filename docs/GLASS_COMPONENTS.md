# Glass Components Documentation

The Glass components implement beautiful glass morphism effects with backdrop blur, transparency, and elegant borders. These components create depth and sophistication while maintaining excellent readability and accessibility.

## Installation

Glass components are included in the Tamatar design system. Import them from:

```tsx
import {
  GlassCard,
  GlassNav,
  GlassModal,
  GlassButton,
  GlassInput,
  GlassPanel,
} from "@/components/glass";
```

## Core Components

### GlassCard

The foundation glass component for creating cards with glass morphism effects.

#### Basic Usage

```tsx
import { GlassCard } from "@/components/glass";

function ProductCard() {
  return (
    <GlassCard variant="default" className="p-6 max-w-sm">
      <h3 className="text-xl font-semibold mb-3">Glass Card</h3>
      <p className="text-muted-foreground mb-4">
        Beautiful glass morphism effect with backdrop blur and transparency.
      </p>
      <button className="glass-button">Learn More</button>
    </GlassCard>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "enhanced" \| "subtle"` | `"default"` | Glass effect intensity |
| `children` | `React.ReactNode` | - | Card content |

#### Variants

- **default**: Standard glass effect with balanced blur and opacity
- **enhanced**: Stronger glass effect with more pronounced blur and borders
- **subtle**: Minimal glass effect for content that needs higher readability

#### Examples

```tsx
// Feature showcase cards
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <GlassCard variant="enhanced" className="p-8 text-center">
    <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
      <RocketIcon className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
    <p className="text-muted-foreground">
      Optimized for performance with minimal bundle size and lazy loading.
    </p>
  </GlassCard>
  
  <GlassCard variant="default" className="p-8 text-center">
    <div className="w-16 h-16 bg-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
      <ShieldIcon className="w-8 h-8 text-secondary" />
    </div>
    <h3 className="text-xl font-semibold mb-3">Secure</h3>
    <p className="text-muted-foreground">
      Built with security best practices and regular vulnerability audits.
    </p>
  </GlassCard>
  
  <GlassCard variant="subtle" className="p-8 text-center">
    <div className="w-16 h-16 bg-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
      <HeartIcon className="w-8 h-8 text-accent" />
    </div>
    <h3 className="text-xl font-semibold mb-3">Developer Love</h3>
    <p className="text-muted-foreground">
      Designed by developers for developers with extensive documentation.
    </p>
  </GlassCard>
</div>

// Testimonial card with enhanced glass
<GlassCard variant="enhanced" className="p-6 max-w-md">
  <div className="flex items-start space-x-4">
    <img 
      src="/avatar.jpg" 
      alt="Customer" 
      className="w-12 h-12 rounded-full"
    />
    <div>
      <p className="mb-3 italic">
        "This design system transformed our development process. 
        The glass components are absolutely beautiful!"
      </p>
      <div>
        <div className="font-semibold">Sarah Johnson</div>
        <div className="text-sm text-muted-foreground">Lead Designer</div>
      </div>
    </div>
  </div>
</GlassCard>

// Stats card with subtle glass for readability
<GlassCard variant="subtle" className="p-6">
  <div className="text-center">
    <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
    <div className="text-sm text-muted-foreground uppercase tracking-wide">
      Active Users
    </div>
  </div>
</GlassCard>
```

### GlassNav

Navigation component with glass morphism for modern, floating navigation bars.

#### Basic Usage

```tsx
import { GlassNav } from "@/components/glass";

function Header() {
  return (
    <GlassNav position="top">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">Tamatar</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="/features" className="hover:text-primary">Features</a>
          <a href="/pricing" className="hover:text-primary">Pricing</a>
          <a href="/docs" className="hover:text-primary">Docs</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="glass-button-ghost">Sign In</button>
          <button className="glass-button">Get Started</button>
        </div>
      </div>
    </GlassNav>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"top" \| "bottom" \| "floating"` | `"top"` | Navigation bar positioning |
| `children` | `React.ReactNode` | - | Navigation content |

#### Position Types

- **top**: Fixed to top of viewport with slide-down animation
- **bottom**: Fixed to bottom of viewport with slide-up animation  
- **floating**: Relative positioning for in-content navigation

#### Examples

```tsx
// Top navigation with glass effect
<GlassNav position="top">
  <div className="container mx-auto px-6 py-4">
    <div className="flex justify-between items-center">
      <Logo />
      <MainNavigation />
      <UserActions />
    </div>
  </div>
</GlassNav>

// Bottom navigation for mobile
<GlassNav position="bottom" className="md:hidden">
  <div className="flex justify-around items-center py-2">
    <NavButton icon={<HomeIcon />} label="Home" />
    <NavButton icon={<SearchIcon />} label="Search" />
    <NavButton icon={<HeartIcon />} label="Favorites" />
    <NavButton icon={<UserIcon />} label="Profile" />
  </div>
</GlassNav>

// Floating navigation within content
<div className="space-y-8">
  <section>Previous content</section>
  
  <GlassNav position="floating" className="max-w-2xl mx-auto">
    <div className="flex justify-center space-x-8 py-3">
      <a href="#overview" className="glass-nav-link">Overview</a>
      <a href="#features" className="glass-nav-link">Features</a>
      <a href="#pricing" className="glass-nav-link">Pricing</a>
      <a href="#contact" className="glass-nav-link">Contact</a>
    </div>
  </GlassNav>
  
  <section>Following content</section>
</div>
```

### GlassModal

Modal dialog component with glass morphism backdrop and content area.

#### Basic Usage

```tsx
import { GlassModal } from "@/components/glass";
import { useState } from "react";

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="glass-button"
      >
        Contact Us
      </button>
      
      <GlassModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
          <p className="text-muted-foreground">
            We'd love to hear from you. Send us a message!
          </p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input 
              type="text" 
              className="glass-input w-full"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              className="glass-input w-full"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea 
              className="glass-input w-full h-24"
              placeholder="Your message..."
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="glass-button-ghost flex-1"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="glass-button flex-1"
            >
              Send Message
            </button>
          </div>
        </form>
      </GlassModal>
    </>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls modal visibility |
| `onClose` | `() => void` | - | Callback when modal should close |
| `children` | `React.ReactNode` | - | Modal content |

#### Features

- Spring-based enter/exit animations
- Backdrop blur effect
- Click outside to close
- ESC key support (when using with state management)
- Auto-focus management

#### Examples

```tsx
// Confirmation modal
<GlassModal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
  <div className="text-center">
    <div className="w-16 h-16 bg-destructive/20 rounded-full mx-auto mb-4 flex items-center justify-center">
      <AlertTriangleIcon className="w-8 h-8 text-destructive" />
    </div>
    <h2 className="text-xl font-semibold mb-2">Confirm Action</h2>
    <p className="text-muted-foreground mb-6">
      Are you sure you want to delete this item? This action cannot be undone.
    </p>
    <div className="flex space-x-3">
      <button 
        onClick={() => setShowConfirm(false)}
        className="glass-button-ghost flex-1"
      >
        Cancel
      </button>
      <button 
        onClick={handleDelete}
        className="glass-button-destructive flex-1"
      >
        Delete
      </button>
    </div>
  </div>
</GlassModal>

// Feature preview modal
<GlassModal isOpen={showPreview} onClose={() => setShowPreview(false)}>
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Feature Preview</h2>
      <button 
        onClick={() => setShowPreview(false)}
        className="glass-button-ghost p-2"
      >
        <XIcon className="w-5 h-5" />
      </button>
    </div>
    
    <div className="mb-6">
      <img 
        src="/feature-preview.jpg" 
        alt="Feature"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
      <p className="text-muted-foreground">
        Get deep insights into your application performance with our 
        comprehensive analytics dashboard.
      </p>
    </div>
    
    <div className="flex space-x-3">
      <button className="glass-button-secondary flex-1">
        Learn More
      </button>
      <button className="glass-button flex-1">
        Try Now
      </button>
    </div>
  </div>
</GlassModal>
```

### GlassButton

Button component with glass morphism styling and interaction effects.

#### Basic Usage

```tsx
import { GlassButton } from "@/components/glass";

function ActionButtons() {
  return (
    <div className="flex space-x-4">
      <GlassButton variant="primary" size="md">
        Get Started
      </GlassButton>
      
      <GlassButton variant="secondary" size="md">
        Learn More
      </GlassButton>
      
      <GlassButton variant="ghost" size="md">
        Cancel
      </GlassButton>
    </div>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"primary"` | Button style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `children` | `React.ReactNode` | - | Button content |

#### Variants

- **primary**: Highlighted button with primary color tinting
- **secondary**: Standard button with secondary color tinting
- **ghost**: Minimal button with subtle hover effects

#### Size Reference

- **sm**: Small button (padding: 12px 16px, text: 14px)
- **md**: Medium button (padding: 16px 20px, text: 16px)
- **lg**: Large button (padding: 24px 32px, text: 18px)

#### Examples

```tsx
// Hero section call-to-action
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <GlassButton variant="primary" size="lg">
    Start Free Trial
  </GlassButton>
  <GlassButton variant="ghost" size="lg">
    Watch Demo
  </GlassButton>
</div>

// Form actions
<div className="flex justify-end space-x-3 pt-6">
  <GlassButton variant="ghost" size="sm" onClick={onCancel}>
    Cancel
  </GlassButton>
  <GlassButton variant="secondary" size="sm" onClick={onSave}>
    Save Draft
  </GlassButton>
  <GlassButton variant="primary" size="sm" onClick={onPublish}>
    Publish
  </GlassButton>
</div>

// Icon buttons
<div className="flex space-x-2">
  <GlassButton variant="ghost" size="sm" className="p-2">
    <HeartIcon className="w-4 h-4" />
  </GlassButton>
  <GlassButton variant="ghost" size="sm" className="p-2">
    <ShareIcon className="w-4 h-4" />
  </GlassButton>
  <GlassButton variant="ghost" size="sm" className="p-2">
    <BookmarkIcon className="w-4 h-4" />
  </GlassButton>
</div>

// Loading states
<GlassButton variant="primary" disabled className="flex items-center space-x-2">
  <LoaderIcon className="w-4 h-4 animate-spin" />
  <span>Processing...</span>
</GlassButton>
```

### GlassInput

Form input component with glass morphism styling and enhanced interactions.

#### Basic Usage

```tsx
import { GlassInput } from "@/components/glass";

function ContactForm() {
  return (
    <form className="space-y-6">
      <GlassInput 
        label="Full Name"
        placeholder="Enter your full name"
        required
      />
      
      <GlassInput 
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        required
      />
      
      <GlassInput 
        label="Company (Optional)"
        placeholder="Your company name"
      />
      
      <GlassButton variant="primary" size="lg" className="w-full">
        Submit
      </GlassButton>
    </form>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label text |
| `error` | `string` | - | Error message to display |

All standard HTML input props are also supported.

#### Features

- Automatic label association
- Error state styling
- Focus animations with scale effect
- Glass morphism background
- Accessible form structure

#### Examples

```tsx
// Form with validation
function SignupForm() {
  const [errors, setErrors] = useState({});

  return (
    <form className="space-y-6 max-w-md mx-auto">
      <GlassInput 
        label="Username"
        placeholder="Choose a username"
        error={errors.username}
        required
      />
      
      <GlassInput 
        label="Email"
        type="email"
        placeholder="your@email.com"
        error={errors.email}
        required
      />
      
      <GlassInput 
        label="Password"
        type="password"
        placeholder="Create a secure password"
        error={errors.password}
        required
      />
      
      <GlassInput 
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        error={errors.confirmPassword}
        required
      />
      
      <GlassButton variant="primary" size="lg" className="w-full">
        Create Account
      </GlassButton>
    </form>
  );
}

// Search input with icon
<div className="relative max-w-md mx-auto">
  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
  <GlassInput 
    placeholder="Search products..."
    className="pl-10"
  />
</div>

// Newsletter signup
<div className="flex space-x-3 max-w-md mx-auto">
  <GlassInput 
    placeholder="Enter your email"
    type="email"
    className="flex-1"
  />
  <GlassButton variant="primary">
    Subscribe
  </GlassButton>
</div>
```

### GlassPanel

Structured panel component with optional header and footer sections.

#### Basic Usage

```tsx
import { GlassPanel } from "@/components/glass";

function SettingsPanel() {
  return (
    <GlassPanel
      header={
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Account Settings</h3>
          <button className="glass-button-ghost p-2">
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      }
      footer={
        <div className="flex justify-end space-x-3">
          <GlassButton variant="ghost" size="sm">Cancel</GlassButton>
          <GlassButton variant="primary" size="sm">Save Changes</GlassButton>
        </div>
      }
    >
      <div className="space-y-4">
        <GlassInput label="Display Name" defaultValue="John Doe" />
        <GlassInput label="Email" type="email" defaultValue="john@example.com" />
        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea 
            className="glass-input w-full h-24"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>
    </GlassPanel>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `React.ReactNode` | - | Panel header content |
| `footer` | `React.ReactNode` | - | Panel footer content |
| `children` | `React.ReactNode` | - | Main panel content |

#### Examples

```tsx
// Stats dashboard panel
<GlassPanel
  header={
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Analytics Overview</h3>
      <select className="glass-input text-sm">
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Last 90 days</option>
      </select>
    </div>
  }
>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="text-center">
      <div className="text-2xl font-bold text-primary">1,234</div>
      <div className="text-sm text-muted-foreground">Visitors</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-green-500">89%</div>
      <div className="text-sm text-muted-foreground">Conversion</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-blue-500">4.2s</div>
      <div className="text-sm text-muted-foreground">Avg. Time</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-purple-500">$5,678</div>
      <div className="text-sm text-muted-foreground">Revenue</div>
    </div>
  </div>
</GlassPanel>

// Comment/review panel
<GlassPanel
  header={
    <div className="flex items-center space-x-3">
      <img src="/avatar.jpg" alt="User" className="w-10 h-10 rounded-full" />
      <div>
        <div className="font-semibold">Sarah Wilson</div>
        <div className="text-sm text-muted-foreground">2 hours ago</div>
      </div>
    </div>
  }
  footer={
    <div className="flex justify-between items-center">
      <div className="flex space-x-4">
        <button className="glass-button-ghost text-sm flex items-center space-x-1">
          <HeartIcon className="w-4 h-4" />
          <span>24</span>
        </button>
        <button className="glass-button-ghost text-sm flex items-center space-x-1">
          <MessageIcon className="w-4 h-4" />
          <span>Reply</span>
        </button>
      </div>
      <button className="glass-button-ghost p-1">
        <MoreIcon className="w-4 h-4" />
      </button>
    </div>
  }
>
  <p className="text-muted-foreground leading-relaxed">
    This design system is absolutely incredible! The glass components 
    add such a modern and sophisticated feel to our application. 
    The attention to detail is outstanding.
  </p>
</GlassPanel>

// Simple content panel without header/footer
<GlassPanel>
  <div className="text-center">
    <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
      <CheckIcon className="w-8 h-8 text-green-500" />
    </div>
    <h3 className="text-lg font-semibold mb-2">Success!</h3>
    <p className="text-muted-foreground">
      Your changes have been saved successfully.
    </p>
  </div>
</GlassPanel>
```

## CSS Classes

Glass components rely on CSS classes for their morphism effects. Ensure these are included in your styles:

```css
/* Base glass effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Enhanced glass effect */
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Dark mode adaptations */
.dark .glass {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .glass-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Glass button variants */
.glass-button {
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(10px);
}

.glass-button-secondary {
  background: rgba(107, 114, 128, 0.2);
  border: 1px solid rgba(107, 114, 128, 0.3);
  backdrop-filter: blur(10px);
}

.glass-button-ghost {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

/* Glass input styling */
.glass-input {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-input:focus {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
```

## Best Practices

### Design Guidelines

1. **Background Contrast**: Glass components work best over colorful or image backgrounds
2. **Content Hierarchy**: Use different glass variants to create visual hierarchy
3. **Spacing**: Maintain adequate padding and margins for glass elements
4. **Color Balance**: Ensure sufficient contrast for text readability

### Performance Considerations

1. **Backdrop Filter**: Limit nested backdrop-filter elements for better performance
2. **Animation Optimization**: Use `transform` properties for smooth animations
3. **Browser Support**: Consider fallbacks for older browsers

### Accessibility

1. **Color Contrast**: Test glass components with WCAG contrast requirements
2. **Focus Indicators**: Ensure focus states are clearly visible
3. **High Contrast Mode**: Provide fallback styles for high contrast mode
4. **Reduced Motion**: Respect user motion preferences

### Usage Patterns

```tsx
// ✅ Good: Glass components over rich backgrounds
<div className="aurora-bg min-h-screen">
  <GlassNav position="top">
    <Navigation />
  </GlassNav>
  
  <main className="container mx-auto px-6 py-20">
    <GlassCard variant="enhanced">
      <Content />
    </GlassCard>
  </main>
</div>

// ✅ Good: Layered glass components
<GlassCard variant="subtle">
  <GlassPanel>
    <GlassButton variant="primary">Action</GlassButton>
  </GlassPanel>
</GlassCard>

// ❌ Avoid: Glass on plain backgrounds
<div className="bg-white">
  <GlassCard> {/* Won't show glass effect well */}
    <Content />
  </GlassCard>
</div>
```

## Integration with Other Components

Glass components work beautifully with Aurora and Motion components:

```tsx
// Glass + Aurora combination
<AuroraBackground variant="default">
  <GlassNav position="top">
    <Navigation />
  </GlassNav>
  
  <MotionDiv animation="fadeInUp" delay={0.2}>
    <GlassCard variant="enhanced" className="max-w-2xl mx-auto mt-20">
      <GlassPanel
        header={<h1 className="text-2xl font-bold">Welcome</h1>}
        footer={
          <GlassButton variant="primary" size="lg" className="w-full">
            Get Started
          </GlassButton>
        }
      >
        <p>Beautiful glass morphism over aurora background.</p>
      </GlassPanel>
    </GlassCard>
  </MotionDiv>
</AuroraBackground>
```

## Examples Repository

View live examples of all Glass components in your development environment:

```
http://localhost:3000/showcase
```

The showcase includes interactive demos with different backgrounds, customization options, and copy-paste code examples for each component.
