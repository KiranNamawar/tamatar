# Accessibility Enhancements & WCAG Compliance

## 📊 Current State Analysis

### Strengths
- **Radix UI Primitives**: Strong accessibility foundation
- **Accessibility utilities**: `src/lib/accessibility.ts` already in place
- **Semantic HTML**: Good use of proper HTML elements
- **Keyboard navigation**: Basic support through Radix components

### Areas for Improvement
- No systematic accessibility testing
- Missing ARIA labels and descriptions
- Inconsistent focus management
- No accessibility documentation
- Limited screen reader optimization

## 🎯 Accessibility Goals

### WCAG 2.1 Compliance Targets
- **Level AA compliance** across all components
- **Keyboard navigation** for all interactive elements
- **Screen reader compatibility** with proper ARIA labels
- **Color contrast** meeting WCAG standards
- **Focus management** with clear visual indicators

## ♿ Enhancement Strategies

### 1. Comprehensive Accessibility Testing

#### A. Automated Testing Integration
```typescript
// src/lib/accessibility-testing.ts
import { axe, toHaveNoViolations } from 'jest-axe'
import { render } from '@testing-library/react'

expect.extend(toHaveNoViolations)

export async function testAccessibility(component: React.ReactElement) {
  const { container } = render(component)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
  return results
}

// Enhanced testing with custom rules
export async function testAccessibilityWithRules(
  component: React.ReactElement,
  rules?: string[]
) {
  const { container } = render(component)
  
  const config = rules ? {
    rules: rules.reduce((acc, rule) => ({ ...acc, [rule]: { enabled: true } }), {})
  } : undefined

  const results = await axe(container, config)
  expect(results).toHaveNoViolations()
  
  return {
    violations: results.violations,
    passes: results.passes,
    incomplete: results.incomplete,
  }
}
```

#### B. Visual Regression Testing for Focus States
```typescript
// src/tests/accessibility/focus-testing.ts
import { render, fireEvent } from '@testing-library/react'

export function testFocusStates(component: React.ReactElement) {
  const { container, getAllByRole } = render(component)
  
  const focusableElements = getAllByRole(/(button|link|input|select|textarea)/)
  
  focusableElements.forEach((element, index) => {
    // Test tab navigation
    fireEvent.focus(element)
    expect(element).toHaveFocus()
    expect(element).toHaveStyle('outline: 2px solid var(--focus-color)')
    
    // Test keyboard activation
    if (element.role === 'button') {
      fireEvent.keyDown(element, { key: 'Enter' })
      fireEvent.keyDown(element, { key: ' ' })
    }
  })
}
```

### 2. Enhanced Component Accessibility

#### A. Improved Button Component
```typescript
// src/components/ui/button.tsx - Enhanced accessibility
import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
  // Enhanced accessibility props
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    asChild = false,
    loading = false,
    disabled,
    children,
    'aria-describedby': ariaDescribedBy,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button'
    
    // Enhanced accessibility attributes
    const accessibilityProps = {
      'aria-disabled': disabled || loading,
      'aria-busy': loading,
      'aria-describedby': ariaDescribedBy || (loading ? 'loading-description' : undefined),
      // Ensure keyboard navigation works when disabled
      tabIndex: disabled ? -1 : 0,
    }

    return (
      <>
        <Comp
          className={cn(buttonVariants({ variant, size }), className)}
          ref={ref}
          disabled={disabled || loading}
          {...accessibilityProps}
          {...props}
        >
          {loading && (
            <span className="sr-only" id="loading-description">
              Loading, please wait
            </span>
          )}
          {loading && <LoadingSpinner className="mr-2 h-4 w-4" />}
          {children}
        </Comp>
      </>
    )
  }
)
```

#### B. Enhanced Form Components
```typescript
// src/components/ui/form-field.tsx
interface FormFieldProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactElement
}

export function FormField({ 
  label, 
  error, 
  hint, 
  required, 
  children 
}: FormFieldProps) {
  const fieldId = useId()
  const errorId = error ? `${fieldId}-error` : undefined
  const hintId = hint ? `${fieldId}-hint` : undefined
  
  const describedBy = [errorId, hintId].filter(Boolean).join(' ')

  return (
    <div className="form-field">
      <label 
        htmlFor={fieldId}
        className={cn(
          "block text-sm font-medium mb-1",
          error && "text-destructive"
        )}
      >
        {label}
        {required && (
          <span className="text-destructive ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      {hint && (
        <p id={hintId} className="text-sm text-muted-foreground mb-1">
          {hint}
        </p>
      )}
      
      {cloneElement(children, {
        id: fieldId,
        'aria-invalid': !!error,
        'aria-describedby': describedBy || undefined,
        'aria-required': required,
      })}
      
      {error && (
        <p 
          id={errorId} 
          className="text-sm text-destructive mt-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  )
}
```

### 3. Keyboard Navigation Enhancements

#### A. Focus Management Hook
```typescript
// src/hooks/use-focus-management.ts
export function useFocusManagement() {
  const trapRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const trapFocus = useCallback(() => {
    if (!trapRef.current) return

    previousFocusRef.current = document.activeElement as HTMLElement
    
    const focusableElements = trapRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
      
      if (e.key === 'Escape') {
        releaseFocus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    firstElement?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const releaseFocus = useCallback(() => {
    previousFocusRef.current?.focus()
    previousFocusRef.current = null
  }, [])

  return { trapRef, trapFocus, releaseFocus }
}
```

#### B. Roving Tabindex Implementation
```typescript
// src/hooks/use-roving-tabindex.ts
export function useRovingTabindex<T extends HTMLElement>() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsRef = useRef<T[]>([])

  const registerItem = useCallback((item: T | null) => {
    if (item && !itemsRef.current.includes(item)) {
      itemsRef.current.push(item)
    }
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const items = itemsRef.current
    if (items.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault()
        setCurrentIndex((prev) => (prev + 1) % items.length)
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault()
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
        break
      case 'Home':
        e.preventDefault()
        setCurrentIndex(0)
        break
      case 'End':
        e.preventDefault()
        setCurrentIndex(items.length - 1)
        break
    }
  }, [])

  useEffect(() => {
    const currentItem = itemsRef.current[currentIndex]
    if (currentItem) {
      currentItem.focus()
    }
  }, [currentIndex])

  return {
    registerItem,
    handleKeyDown,
    getTabIndex: (index: number) => index === currentIndex ? 0 : -1,
  }
}
```

### 4. Screen Reader Optimization

#### A. Live Region Management
```typescript
// src/components/ui/live-region.tsx
interface LiveRegionProps {
  message: string
  level?: 'polite' | 'assertive'
  clearAfter?: number
}

export function LiveRegion({ message, level = 'polite', clearAfter }: LiveRegionProps) {
  const [currentMessage, setCurrentMessage] = useState(message)

  useEffect(() => {
    setCurrentMessage(message)
    
    if (clearAfter) {
      const timer = setTimeout(() => {
        setCurrentMessage('')
      }, clearAfter)
      
      return () => clearTimeout(timer)
    }
  }, [message, clearAfter])

  return (
    <div
      aria-live={level}
      aria-atomic="true"
      className="sr-only"
    >
      {currentMessage}
    </div>
  )
}

// Hook for managing live regions
export function useLiveRegion() {
  const [message, setMessage] = useState('')
  const [level, setLevel] = useState<'polite' | 'assertive'>('polite')

  const announce = useCallback((
    newMessage: string, 
    newLevel: 'polite' | 'assertive' = 'polite'
  ) => {
    setLevel(newLevel)
    setMessage(newMessage)
  }, [])

  return {
    announce,
    LiveRegionComponent: () => (
      <LiveRegion message={message} level={level} clearAfter={5000} />
    ),
  }
}
```

#### B. Skip Links Implementation
```typescript
// src/components/ui/skip-links.tsx
export function SkipLinks() {
  return (
    <div className="skip-links">
      <a 
        href="#main-content"
        className="skip-link"
        onFocus={(e) => e.target.classList.add('visible')}
        onBlur={(e) => e.target.classList.remove('visible')}
      >
        Skip to main content
      </a>
      <a 
        href="#navigation"
        className="skip-link"
        onFocus={(e) => e.target.classList.add('visible')}
        onBlur={(e) => e.target.classList.remove('visible')}
      >
        Skip to navigation
      </a>
    </div>
  )
}

// CSS for skip links
/* src/styles/accessibility.css */
.skip-links {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: var(--background);
  color: var(--foreground);
  padding: 8px 16px;
  text-decoration: none;
  border: 2px solid var(--primary);
  border-radius: 4px;
  transition: top 0.3s ease;
}

.skip-link:focus,
.skip-link.visible {
  top: 8px;
}
```

### 5. Color and Contrast Improvements

#### A. Color Contrast Validation
```typescript
// src/lib/color-contrast.ts
export function validateColorContrast(
  foreground: string, 
  background: string, 
  fontSize: number = 16
): { ratio: number; wcagLevel: 'AAA' | 'AA' | 'fail' } {
  const ratio = getContrastRatio(foreground, background)
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold)
  
  const wcagLevel = (() => {
    if (ratio >= 7) return 'AAA'
    if (ratio >= 4.5) return 'AA'
    if (isLargeText && ratio >= 3) return 'AA'
    return 'fail'
  })()
  
  return { ratio, wcagLevel }
}

// Color palette with WCAG compliance
export const accessibleColors = {
  // High contrast pairs
  primary: {
    DEFAULT: 'hsl(221, 83%, 53%)', // Blue
    foreground: 'hsl(0, 0%, 100%)', // White
    contrast: 4.5, // WCAG AA
  },
  destructive: {
    DEFAULT: 'hsl(0, 62%, 30%)', // Dark red
    foreground: 'hsl(0, 0%, 100%)', // White
    contrast: 5.2, // WCAG AA
  },
  // ... other color definitions
}
```

#### B. High Contrast Mode Support
```css
/* src/styles/high-contrast.css */
@media (prefers-contrast: high) {
  :root {
    --background: hsl(0, 0%, 100%);
    --foreground: hsl(0, 0%, 0%);
    --primary: hsl(221, 83%, 30%);
    --primary-foreground: hsl(0, 0%, 100%);
    --border: hsl(0, 0%, 20%);
  }
  
  .dark {
    --background: hsl(0, 0%, 0%);
    --foreground: hsl(0, 0%, 100%);
    --primary: hsl(221, 83%, 70%);
    --primary-foreground: hsl(0, 0%, 0%);
  }
  
  /* Increase border visibility */
  .border {
    border-width: 2px;
  }
  
  /* Enhanced focus indicators */
  :focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
  }
}
```

### 6. Accessibility Documentation

#### A. Component Accessibility Guide
```typescript
// src/components/ui/button.stories.tsx
export default {
  title: 'UI/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

- **Keyboard Navigation**: Supports Enter and Space key activation
- **Screen Reader**: Proper ARIA attributes and state communication
- **Focus Management**: Clear focus indicators and tab order
- **Loading States**: Announces loading status to screen readers

## Usage Guidelines

- Always provide meaningful button text or aria-label
- Use aria-describedby for additional context
- Consider loading states for async actions
        `
      }
    }
  }
}

export const AccessibilityDemo = {
  render: () => (
    <div className="space-y-4">
      <Button aria-describedby="save-description">
        Save Document
      </Button>
      <p id="save-description" className="text-sm text-muted-foreground">
        Saves the current document to your account
      </p>
      
      <Button loading aria-label="Submitting form">
        Submit
      </Button>
    </div>
  )
}
```

## 🛠️ Implementation Steps

### Phase 1: Foundation (Week 1-2)
1. **Accessibility testing setup**
   - Install axe-core and testing utilities
   - Create accessibility test suites
   - Set up automated testing

2. **Basic component enhancements**
   - Add ARIA labels and descriptions
   - Improve keyboard navigation
   - Enhance focus management

### Phase 2: Advanced Features (Week 3-4)
3. **Screen reader optimization**
   - Implement live regions
   - Add skip links
   - Create announcement system

4. **Color and contrast improvements**
   - Validate color combinations
   - Add high contrast mode
   - Implement theme switching

### Phase 3: Documentation & Testing (Week 5-6)
5. **Comprehensive testing**
   - Manual testing with screen readers
   - Automated accessibility testing
   - User testing with disabilities

6. **Documentation and guidelines**
   - Create accessibility guide
   - Document component patterns
   - Train development team

## 📏 Success Metrics

### WCAG Compliance
- **Level AA compliance**: 100% of components
- **Automated testing**: Zero accessibility violations
- **Manual testing**: Pass screen reader testing

### User Experience
- **Keyboard navigation**: All features accessible via keyboard
- **Screen reader compatibility**: Full functionality with NVDA, JAWS, VoiceOver
- **Color contrast**: All text meets WCAG AA standards

### Development Process
- **Accessibility testing**: Integrated into CI/CD
- **Component documentation**: Include accessibility guidelines
- **Team knowledge**: Regular accessibility training

## 🎯 Specific Actions

### Immediate (This Week)
- [ ] Set up axe-core testing integration
- [ ] Audit current components for basic accessibility
- [ ] Implement skip links and focus management

### Short-term (Next 2 Weeks)
- [ ] Enhance form components with proper ARIA
- [ ] Add keyboard navigation to complex components
- [ ] Implement live region system

### Medium-term (Next Month)
- [ ] Complete screen reader optimization
- [ ] Add high contrast mode support
- [ ] Create comprehensive accessibility documentation

## 🔗 Related Improvements
- [Design System Refinements](./07-design-system-refinements.md) - Accessible design tokens
- [Testing Strategy](./06-testing-strategy.md) - Accessibility testing integration
- [Documentation](./10-documentation.md) - Accessibility guidelines

## 📋 Implementation Checklist

### Testing Setup
- [ ] Install axe-core and jest-axe
- [ ] Create accessibility test utilities
- [ ] Set up automated testing in CI
- [ ] Configure accessibility linting rules

### Component Enhancement
- [ ] Add ARIA labels to all interactive elements
- [ ] Implement proper keyboard navigation
- [ ] Enhance focus management
- [ ] Add loading and error state announcements

### Screen Reader Support
- [ ] Implement live regions for dynamic content
- [ ] Add skip links for navigation
- [ ] Create announcement system
- [ ] Test with multiple screen readers

### Color and Contrast
- [ ] Validate all color combinations
- [ ] Implement high contrast mode
- [ ] Add contrast checking utilities
- [ ] Support prefers-contrast media query
