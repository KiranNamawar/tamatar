# Design System Refinements & Consistency

## 📊 Current State Analysis

### Existing Design System
- **Three design variants**: Default, Glass, Aurora
- **40+ UI components** with consistent API patterns
- **Tailwind CSS v4** for utility-first styling
- **Radix UI primitives** for accessibility foundation

### Areas for Improvement
- Inconsistent design tokens across variants
- No centralized theme configuration
- Missing design documentation
- Limited customization options
- No design system governance

## 🎯 Design System Goals

### Consistency Objectives
- **Unified design tokens** across all variants
- **Consistent component APIs** and prop patterns
- **Scalable theming system** with easy customization
- **Comprehensive documentation** for designers and developers
- **Design system governance** with clear guidelines

## 🎨 Design System Enhancements

### 1. Design Token System

#### A. Centralized Design Tokens
```typescript
// src/design-system/tokens/index.ts
export const designTokens = {
  // Color tokens
  colors: {
    // Semantic color scales
    primary: {
      50: 'hsl(221, 83%, 97%)',
      100: 'hsl(221, 83%, 94%)',
      500: 'hsl(221, 83%, 53%)',
      900: 'hsl(221, 83%, 11%)',
    },
    neutral: {
      50: 'hsl(0, 0%, 98%)',
      100: 'hsl(0, 0%, 96%)',
      500: 'hsl(0, 0%, 53%)',
      900: 'hsl(0, 0%, 9%)',
    },
    // Variant-specific color overlays
    glass: {
      backdrop: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    aurora: {
      gradient1: 'hsl(300, 100%, 50%)',
      gradient2: 'hsl(200, 100%, 50%)',
      gradient3: 'hsl(100, 100%, 50%)',
    },
  },

  // Typography tokens
  typography: {
    fontFamily: {
      sans: ['Inter Variable', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Spacing tokens
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },

  // Border radius tokens
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },

  // Shadow tokens
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    
    // Variant-specific shadows
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    aurora: '0 0 20px rgba(255, 255, 255, 0.5)',
  },

  // Animation tokens
  animation: {
    duration: {
      fastest: '150ms',
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
      slowest: '800ms',
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
} as const
```

#### B. Theme Configuration System
```typescript
// src/design-system/themes/index.ts
import { designTokens } from '../tokens'

export type ThemeVariant = 'default' | 'glass' | 'aurora'
export type ColorMode = 'light' | 'dark'

interface ThemeConfig {
  variant: ThemeVariant
  colorMode: ColorMode
  customizations?: Partial<typeof designTokens>
}

export function createTheme(config: ThemeConfig) {
  const { variant, colorMode, customizations = {} } = config

  const baseTheme = {
    ...designTokens,
    ...customizations,
  }

  // Apply variant-specific modifications
  const variantModifications = getVariantModifications(variant)
  const colorModeModifications = getColorModeModifications(colorMode)

  return mergeDeep(baseTheme, variantModifications, colorModeModifications)
}

function getVariantModifications(variant: ThemeVariant) {
  switch (variant) {
    case 'glass':
      return {
        colors: {
          background: designTokens.colors.glass.backdrop,
          border: designTokens.colors.glass.border,
        },
        boxShadow: {
          DEFAULT: designTokens.boxShadow.glass,
        },
        backdropFilter: {
          DEFAULT: 'blur(10px) saturate(180%)',
        },
      }
    
    case 'aurora':
      return {
        colors: {
          primary: {
            ...designTokens.colors.primary,
            500: designTokens.colors.aurora.gradient1,
          },
        },
        backgroundImage: {
          aurora: `linear-gradient(
            45deg,
            ${designTokens.colors.aurora.gradient1},
            ${designTokens.colors.aurora.gradient2},
            ${designTokens.colors.aurora.gradient3}
          )`,
        },
        boxShadow: {
          DEFAULT: designTokens.boxShadow.aurora,
        },
      }
    
    default:
      return {}
  }
}

function getColorModeModifications(colorMode: ColorMode) {
  if (colorMode === 'dark') {
    return {
      colors: {
        background: designTokens.colors.neutral[900],
        foreground: designTokens.colors.neutral[50],
        card: designTokens.colors.neutral[800],
        border: designTokens.colors.neutral[700],
      },
    }
  }
  
  return {
    colors: {
      background: designTokens.colors.neutral[50],
      foreground: designTokens.colors.neutral[900],
      card: designTokens.colors.neutral[100],
      border: designTokens.colors.neutral[200],
    },
  }
}
```

### 2. Component API Standardization

#### A. Base Component Props Interface
```typescript
// src/design-system/types/component-props.ts
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  'data-testid'?: string
}

export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean
  loading?: boolean
  'aria-label'?: string
  'aria-describedby'?: string
}

export interface VariantComponentProps extends BaseComponentProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'default' | 'lg'
}

export interface ThemeAwareComponentProps extends BaseComponentProps {
  themeVariant?: ThemeVariant
  colorMode?: ColorMode
}
```

#### B. Standardized Component Factory
```typescript
// src/design-system/utils/create-component.ts
import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

interface CreateComponentOptions<T> {
  displayName: string
  defaultProps?: Partial<T>
  variants: Parameters<typeof cva>[1]
  defaultVariants?: Record<string, any>
}

export function createComponent<
  T extends BaseComponentProps,
  Element extends HTMLElement = HTMLDivElement
>(
  options: CreateComponentOptions<T>
) {
  const { displayName, defaultProps = {}, variants, defaultVariants } = options
  
  const variantClasses = cva('', variants)
  
  type ComponentProps = T & 
    VariantProps<typeof variantClasses> & 
    React.HTMLAttributes<Element> & {
      asChild?: boolean
    }

  const Component = forwardRef<Element, ComponentProps>(
    ({ className, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : 'div'
      
      const mergedProps = { ...defaultProps, ...props }
      const variantClassName = variantClasses(mergedProps)
      
      return (
        <Comp
          ref={ref}
          className={cn(variantClassName, className)}
          {...mergedProps}
        />
      )
    }
  )
  
  Component.displayName = displayName
  
  return Component
}
```

### 3. Enhanced Theme Provider

#### A. Advanced Theme Provider
```typescript
// src/design-system/providers/DesignSystemProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { createTheme, type ThemeVariant, type ColorMode } from '../themes'

interface DesignSystemContextValue {
  variant: ThemeVariant
  colorMode: ColorMode
  theme: ReturnType<typeof createTheme>
  setVariant: (variant: ThemeVariant) => void
  setColorMode: (mode: ColorMode) => void
  customizeTheme: (customizations: any) => void
}

const DesignSystemContext = createContext<DesignSystemContextValue | null>(null)

export function useDesignSystem() {
  const context = useContext(DesignSystemContext)
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider')
  }
  return context
}

interface DesignSystemProviderProps {
  children: React.ReactNode
  defaultVariant?: ThemeVariant
  defaultColorMode?: ColorMode
  storageKey?: string
}

export function DesignSystemProvider({
  children,
  defaultVariant = 'default',
  defaultColorMode = 'light',
  storageKey = 'tamatar-design-system',
}: DesignSystemProviderProps) {
  const [variant, setVariantState] = useState<ThemeVariant>(defaultVariant)
  const [colorMode, setColorModeState] = useState<ColorMode>(defaultColorMode)
  const [customizations, setCustomizations] = useState({})

  // Load saved preferences
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const { variant: savedVariant, colorMode: savedMode } = JSON.parse(saved)
        if (savedVariant) setVariantState(savedVariant)
        if (savedMode) setColorModeState(savedMode)
      }
    } catch (error) {
      console.warn('Failed to load design system preferences:', error)
    }
  }, [storageKey])

  // Save preferences
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ variant, colorMode }))
    } catch (error) {
      console.warn('Failed to save design system preferences:', error)
    }
  }, [variant, colorMode, storageKey])

  // Create theme
  const theme = createTheme({ variant, colorMode, customizations })

  // Apply CSS custom properties
  useEffect(() => {
    const root = document.documentElement
    
    // Remove previous variant classes
    root.classList.remove('variant-default', 'variant-glass', 'variant-aurora')
    root.classList.remove('light', 'dark')
    
    // Add current variant and color mode classes
    root.classList.add(`variant-${variant}`)
    root.classList.add(colorMode)
    
    // Apply CSS custom properties
    Object.entries(flattenTheme(theme)).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }, [theme, variant, colorMode])

  const setVariant = (newVariant: ThemeVariant) => {
    setVariantState(newVariant)
  }

  const setColorMode = (newMode: ColorMode) => {
    setColorModeState(newMode)
  }

  const customizeTheme = (newCustomizations: any) => {
    setCustomizations(newCustomizations)
  }

  return (
    <DesignSystemContext.Provider
      value={{
        variant,
        colorMode,
        theme,
        setVariant,
        setColorMode,
        customizeTheme,
      }}
    >
      {children}
    </DesignSystemContext.Provider>
  )
}

function flattenTheme(theme: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  
  for (const [key, value] of Object.entries(theme)) {
    const newKey = prefix ? `${prefix}-${key}` : key
    
    if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenTheme(value, newKey))
    } else {
      result[newKey] = String(value)
    }
  }
  
  return result
}
```

### 4. Design Documentation System

#### A. Component Documentation Template
```typescript
// src/design-system/docs/component-template.ts
export interface ComponentDocumentation {
  name: string
  description: string
  category: 'layout' | 'form' | 'feedback' | 'navigation' | 'display'
  
  // Design specifications
  designSpecs: {
    variants: Array<{
      name: string
      description: string
      usage: string
    }>
    anatomy: Array<{
      element: string
      description: string
      optional?: boolean
    }>
    spacing: {
      internal: string
      external: string
    }
    accessibility: {
      keyboardSupport: string[]
      ariaSupport: string[]
      focusManagement: string
    }
  }
  
  // Usage guidelines
  usage: {
    when: string
    whenNot: string
    bestPractices: string[]
    commonMistakes: string[]
  }
  
  // Examples
  examples: Array<{
    name: string
    description: string
    code: string
    props: Record<string, any>
  }>
}

// Example documentation for Button component
export const buttonDocumentation: ComponentDocumentation = {
  name: 'Button',
  description: 'Buttons trigger actions or navigate users to different pages.',
  category: 'form',
  
  designSpecs: {
    variants: [
      {
        name: 'default',
        description: 'Primary action button with filled background',
        usage: 'For the main action on a page or form'
      },
      {
        name: 'outline',
        description: 'Secondary action button with outlined border',
        usage: 'For secondary actions or when multiple buttons are present'
      },
      // ... other variants
    ],
    anatomy: [
      { element: 'Container', description: 'Button container with padding and border radius' },
      { element: 'Label', description: 'Button text content' },
      { element: 'Icon', description: 'Optional leading or trailing icon', optional: true },
      { element: 'Loading Indicator', description: 'Spinner shown during loading state', optional: true },
    ],
    spacing: {
      internal: 'Padding varies by size: sm (8px), default (12px), lg (16px)',
      external: 'Minimum 8px spacing between buttons'
    },
    accessibility: {
      keyboardSupport: ['Enter', 'Space'],
      ariaSupport: ['aria-label', 'aria-describedby', 'aria-disabled'],
      focusManagement: 'Focus ring with 2px outline offset'
    }
  },
  
  usage: {
    when: 'When users need to trigger an action or navigate',
    whenNot: 'For navigation that looks like text (use Link instead)',
    bestPractices: [
      'Use clear, action-oriented labels',
      'Place primary buttons on the right',
      'Limit to one primary button per section'
    ],
    commonMistakes: [
      'Using too many button variants in one area',
      'Making buttons too small for touch targets',
      'Not providing loading states for async actions'
    ]
  },
  
  examples: [
    {
      name: 'Basic Button',
      description: 'Default button with primary styling',
      code: '<Button>Save Changes</Button>',
      props: { children: 'Save Changes' }
    },
    {
      name: 'Loading Button',
      description: 'Button with loading state',
      code: '<Button loading>Saving...</Button>',
      props: { loading: true, children: 'Saving...' }
    },
    // ... more examples
  ]
}
```

### 5. Design System Governance

#### A. Component Review Checklist
```typescript
// src/design-system/governance/component-checklist.ts
export interface ComponentReviewChecklist {
  design: {
    followsDesignTokens: boolean
    consistentWithVariants: boolean
    accessibilityCompliant: boolean
    responsiveDesign: boolean
  }
  
  implementation: {
    followsAPIPatterns: boolean
    hasProperTyping: boolean
    includesTests: boolean
    hasDocumentation: boolean
  }
  
  performance: {
    optimizedBundle: boolean
    noUnnecessaryReRenders: boolean
    properMemoization: boolean
  }
  
  accessibility: {
    keyboardNavigation: boolean
    screenReaderSupport: boolean
    focusManagement: boolean
    colorContrast: boolean
  }
}

export function validateComponent(
  component: any,
  checklist: ComponentReviewChecklist
): { passed: boolean; issues: string[] } {
  const issues: string[] = []
  
  // Check design compliance
  if (!checklist.design.followsDesignTokens) {
    issues.push('Component does not use design tokens')
  }
  
  if (!checklist.design.consistentWithVariants) {
    issues.push('Component variants are inconsistent with design system')
  }
  
  // Check implementation quality
  if (!checklist.implementation.hasProperTyping) {
    issues.push('Component lacks proper TypeScript definitions')
  }
  
  if (!checklist.implementation.includesTests) {
    issues.push('Component is missing test coverage')
  }
  
  // Check accessibility
  if (!checklist.accessibility.keyboardNavigation) {
    issues.push('Component lacks proper keyboard navigation')
  }
  
  return {
    passed: issues.length === 0,
    issues
  }
}
```

## 🛠️ Implementation Steps

### Phase 1: Token System (Week 1-2)
1. **Design token creation**
   - Define comprehensive token system
   - Create variant-specific modifications
   - Set up theme configuration

2. **Theme provider enhancement**
   - Implement advanced theme provider
   - Add customization capabilities
   - Create CSS custom property system

### Phase 2: Component Standardization (Week 3-4)
3. **Component API standardization**
   - Create base component interfaces
   - Implement component factory pattern
   - Standardize existing components

4. **Documentation system**
   - Create component documentation templates
   - Document existing components
   - Set up documentation generation

### Phase 3: Governance & Tools (Week 5-6)
5. **Design system governance**
   - Create component review process
   - Implement validation tools
   - Set up design system guidelines

6. **Developer tools**
   - Create design system devtools
   - Add theme debugging tools
   - Implement design token validation

## 📏 Success Metrics

### Consistency
- **Token Usage**: 100% of components use design tokens
- **API Consistency**: All components follow standard patterns
- **Variant Consistency**: Unified behavior across all variants

### Developer Experience
- **Documentation Coverage**: 100% of components documented
- **Customization**: Easy theme customization capabilities
- **Type Safety**: Full TypeScript coverage for design system

### Design Quality
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: No performance regressions
- **Maintainability**: Reduced design debt

## 🎯 Specific Actions

### Immediate (This Week)
- [ ] Define comprehensive design token system
- [ ] Create enhanced theme provider
- [ ] Start component API standardization

### Short-term (Next 2 Weeks)
- [ ] Implement design token system
- [ ] Standardize component APIs
- [ ] Create documentation templates

### Medium-term (Next Month)
- [ ] Complete component documentation
- [ ] Implement governance tools
- [ ] Create design system guidelines

## 🔗 Related Improvements
- [Accessibility Enhancements](./05-accessibility-enhancements.md) - Accessible design tokens
- [Code Organization](./01-code-organization.md) - Design system structure
- [Documentation](./10-documentation.md) - Design system documentation

## 📋 Implementation Checklist

### Design Token System
- [ ] Define comprehensive token categories
- [ ] Create variant-specific token modifications
- [ ] Implement theme configuration system
- [ ] Set up CSS custom property generation

### Component Standardization
- [ ] Create base component interfaces
- [ ] Implement component factory pattern
- [ ] Standardize existing component APIs
- [ ] Add consistent prop patterns

### Theme System
- [ ] Enhance theme provider with customization
- [ ] Add persistence for user preferences
- [ ] Implement runtime theme switching
- [ ] Create theme validation utilities

### Documentation & Governance
- [ ] Create component documentation templates
- [ ] Document all existing components
- [ ] Implement component review checklist
- [ ] Set up design system guidelines
