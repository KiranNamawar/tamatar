# Animation & Interaction Enhancements

## 📊 Current State Analysis

### Existing Animation System
- **Framer Motion**: Configured for component animations
- **CSS animations**: Basic transitions in `src/styles.css`
- **Animation utilities**: `src/lib/animations.ts` and `src/hooks/use-animations.ts`
- **Design variants**: Aurora and Glass with special effects

### Areas for Improvement
- Inconsistent animation patterns across components
- Performance concerns with complex animations
- Missing micro-interactions and feedback
- No animation orchestration system
- Limited accessibility considerations

## 🎯 Animation Enhancement Goals

### Performance Objectives
- **60fps animations** for all interactions
- **Reduced motion support** for accessibility
- **Optimized animation bundle** size
- **GPU acceleration** for smooth rendering

### User Experience Goals
- **Meaningful motion** that guides user attention
- **Consistent timing** and easing across components
- **Appropriate feedback** for all interactions
- **Delightful micro-interactions** that enhance usability

## 🎬 Animation Strategy Enhancements

### 1. Motion Design System

#### A. Animation Design Tokens
```typescript
// src/design-system/motion/tokens.ts
export const motionTokens = {
  // Duration tokens
  duration: {
    instant: 0,
    'ultra-fast': 100,
    'extra-fast': 150,
    fast: 200,
    normal: 300,
    slow: 500,
    'extra-slow': 800,
    'ultra-slow': 1200,
  },

  // Easing curves
  easing: {
    // Standard easing
    linear: 'linear',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Expressive easing
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    elastic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    
    // Variant-specific easing
    glass: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    aurora: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Scale tokens
  scale: {
    'scale-in': 0.95,
    'scale-out': 1.05,
    'scale-press': 0.98,
  },

  // Distance tokens
  distance: {
    'slide-in': '10px',
    'slide-out': '20px',
    'fade-in': '0px',
  },

  // Stagger timing
  stagger: {
    items: 0.1,
    children: 0.05,
    sections: 0.2,
  },
} as const

// Motion presets for common animations
export const motionPresets = {
  // Entrance animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: motionTokens.duration.normal / 1000,
      ease: motionTokens.easing['ease-out'],
    },
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: {
      duration: motionTokens.duration.normal / 1000,
      ease: motionTokens.easing['ease-out'],
    },
  },

  scaleIn: {
    initial: { opacity: 0, scale: motionTokens.scale['scale-in'] },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: motionTokens.scale['scale-out'] },
    transition: {
      duration: motionTokens.duration.fast / 1000,
      ease: motionTokens.easing.spring,
    },
  },

  // Interaction animations
  buttonPress: {
    whileTap: { scale: motionTokens.scale['scale-press'] },
    transition: {
      duration: motionTokens.duration['ultra-fast'] / 1000,
      ease: motionTokens.easing['ease-in-out'],
    },
  },

  cardHover: {
    whileHover: { 
      y: -4,
      transition: {
        duration: motionTokens.duration.fast / 1000,
        ease: motionTokens.easing['ease-out'],
      }
    },
  },

  // Glass variant specific
  glassReveal: {
    initial: { opacity: 0, backdropFilter: 'blur(0px)' },
    animate: { 
      opacity: 1, 
      backdropFilter: 'blur(10px)',
    },
    transition: {
      duration: motionTokens.duration.slow / 1000,
      ease: motionTokens.easing.glass,
    },
  },

  // Aurora variant specific
  auroraShimmer: {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: motionTokens.easing.aurora,
    },
  },
} as const
```

#### B. Responsive Motion Hook
```typescript
// src/hooks/use-responsive-motion.ts
import { useEffect, useState } from 'react'
import { motionTokens } from '../design-system/motion/tokens'

interface MotionPreferences {
  reduceMotion: boolean
  highPerformance: boolean
  prefersSimpleAnimations: boolean
}

export function useResponsiveMotion() {
  const [preferences, setPreferences] = useState<MotionPreferences>({
    reduceMotion: false,
    highPerformance: false,
    prefersSimpleAnimations: false,
  })

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Check for high performance mode (low-end devices)
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                          (navigator as any).deviceMemory <= 2

    // Update preferences
    setPreferences({
      reduceMotion: prefersReducedMotion.matches,
      highPerformance: isLowEndDevice,
      prefersSimpleAnimations: prefersReducedMotion.matches || isLowEndDevice,
    })

    // Listen for changes
    const handleChange = () => {
      setPreferences(prev => ({
        ...prev,
        reduceMotion: prefersReducedMotion.matches,
      }))
    }

    prefersReducedMotion.addEventListener('change', handleChange)
    return () => prefersReducedMotion.removeEventListener('change', handleChange)
  }, [])

  // Adapt motion based on preferences
  const adaptMotion = (motion: any) => {
    if (preferences.reduceMotion) {
      return {
        ...motion,
        transition: {
          ...motion.transition,
          duration: 0,
        },
      }
    }

    if (preferences.prefersSimpleAnimations) {
      return {
        ...motion,
        transition: {
          ...motion.transition,
          duration: (motion.transition?.duration || 0.3) * 0.5,
          ease: motionTokens.easing.linear,
        },
      }
    }

    return motion
  }

  return {
    preferences,
    adaptMotion,
    shouldAnimate: !preferences.reduceMotion,
  }
}
```

### 2. Advanced Animation Components

#### A. Enhanced Motion Components
```typescript
// src/components/motion/MotionWrapper.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useResponsiveMotion } from '../../hooks/use-responsive-motion'
import { motionPresets } from '../../design-system/motion/tokens'

interface MotionWrapperProps {
  children: React.ReactNode
  preset?: keyof typeof motionPresets
  custom?: any
  className?: string
  as?: keyof JSX.IntrinsicElements
  delay?: number
  stagger?: boolean
}

export function MotionWrapper({
  children,
  preset = 'fadeIn',
  custom,
  className,
  as = 'div',
  delay = 0,
  stagger = false,
}: MotionWrapperProps) {
  const { adaptMotion, shouldAnimate } = useResponsiveMotion()
  
  if (!shouldAnimate) {
    const Component = as
    return <Component className={className}>{children}</Component>
  }

  const motionProps = custom || motionPresets[preset]
  const adaptedMotion = adaptMotion(motionProps)

  // Add delay if specified
  if (delay > 0) {
    adaptedMotion.transition = {
      ...adaptedMotion.transition,
      delay,
    }
  }

  // Handle stagger animations
  if (stagger) {
    return (
      <motion.div className={className}>
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            {...adaptedMotion}
            transition={{
              ...adaptedMotion.transition,
              delay: index * 0.1,
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  const MotionComponent = motion[as]
  
  return (
    <MotionComponent className={className} {...adaptedMotion}>
      {children}
    </MotionComponent>
  )
}
```

#### B. Page Transition System
```typescript
// src/components/motion/PageTransition.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from '@tanstack/react-router'
import { useDesignSystem } from '../../design-system/providers/DesignSystemProvider'

const pageVariants = {
  default: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  glass: {
    initial: { opacity: 0, backdropFilter: 'blur(0px)', scale: 0.95 },
    animate: { opacity: 1, backdropFilter: 'blur(10px)', scale: 1 },
    exit: { opacity: 0, backdropFilter: 'blur(0px)', scale: 1.05 },
  },
  aurora: {
    initial: { opacity: 0, rotateX: -15, transformPerspective: 1000 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: 15 },
  },
}

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter()
  const { variant } = useDesignSystem()
  const { shouldAnimate } = useResponsiveMotion()

  if (!shouldAnimate) {
    return <>{children}</>
  }

  const variants = pageVariants[variant]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.state.location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### 3. Micro-Interaction Enhancements

#### A. Interactive Button Component
```typescript
// src/components/ui/InteractiveButton.tsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useResponsiveMotion } from '../../hooks/use-responsive-motion'

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'glass' | 'aurora'
  size?: 'sm' | 'default' | 'lg'
  children: React.ReactNode
  hapticFeedback?: boolean
}

export function InteractiveButton({
  variant = 'default',
  size = 'default',
  children,
  hapticFeedback = false,
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}: InteractiveButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const { shouldAnimate } = useResponsiveMotion()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Haptic feedback for supported devices
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(50)
    }
    
    onClick?.(e)
  }

  const motionProps = shouldAnimate ? {
    whileHover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    whileTap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    },
    animate: {
      boxShadow: isHovered 
        ? '0 8px 25px rgba(0, 0, 0, 0.15)' 
        : '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
  } : {}

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
    aurora: 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600',
  }

  return (
    <motion.button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        className
      )}
      onMouseEnter={(e) => {
        setIsHovered(true)
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setIsHovered(false)
        onMouseLeave?.(e)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
      {...motionProps}
      {...props}
    >
      <motion.span
        initial={false}
        animate={{
          scale: isPressed ? 0.95 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}
```

#### B. Loading Animation System
```typescript
// src/components/motion/LoadingAnimations.tsx
import { motion } from 'framer-motion'
import { useDesignSystem } from '../../design-system/providers/DesignSystemProvider'

interface LoadingSpinnerProps {
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'glass' | 'aurora'
}

export function LoadingSpinner({ size = 'default', variant = 'default' }: LoadingSpinnerProps) {
  const { colorMode } = useDesignSystem()
  
  const sizes = {
    sm: 16,
    default: 24,
    lg: 32,
  }

  const spinnerSize = sizes[size]

  const variantStyles = {
    default: {
      color: colorMode === 'dark' ? '#ffffff' : '#000000',
    },
    glass: {
      color: '#ffffff',
      filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
    },
    aurora: {
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
      borderRadius: '50%',
    },
  }

  if (variant === 'aurora') {
    return (
      <motion.div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          ...variantStyles[variant],
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    )
  }

  return (
    <motion.svg
      width={spinnerSize}
      height={spinnerSize}
      viewBox="0 0 24 24"
      fill="none"
      style={variantStyles[variant]}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <path
        d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}

export function PulseLoader({ variant = 'default' }: { variant?: 'default' | 'glass' | 'aurora' }) {
  const pulseVariants = {
    default: {
      backgroundColor: ['#e5e7eb', '#9ca3af', '#e5e7eb'],
    },
    glass: {
      backgroundColor: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)'],
    },
    aurora: {
      background: [
        'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        'linear-gradient(45deg, #4ecdc4, #45b7d1)',
        'linear-gradient(45deg, #45b7d1, #ff6b6b)',
      ],
    },
  }

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 rounded-full"
          animate={pulseVariants[variant]}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
```

### 4. Orchestrated Animation Sequences

#### A. Staggered Animation Hook
```typescript
// src/hooks/use-staggered-animation.ts
import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'

interface StaggeredAnimationOptions {
  staggerDelay?: number
  initialDelay?: number
  animateOnMount?: boolean
}

export function useStaggeredAnimation(
  itemCount: number,
  options: StaggeredAnimationOptions = {}
) {
  const {
    staggerDelay = 0.1,
    initialDelay = 0,
    animateOnMount = true,
  } = options

  const controls = useAnimation()

  const animateIn = async () => {
    await controls.start((index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: initialDelay + (index * staggerDelay),
        duration: 0.6,
        ease: 'easeOut',
      },
    }))
  }

  const animateOut = async () => {
    await controls.start((index) => ({
      opacity: 0,
      y: -20,
      transition: {
        delay: index * staggerDelay * 0.5,
        duration: 0.3,
        ease: 'easeIn',
      },
    }))
  }

  useEffect(() => {
    if (animateOnMount) {
      animateIn()
    }
  }, [itemCount, animateOnMount])

  return {
    controls,
    animateIn,
    animateOut,
    getItemProps: (index: number) => ({
      custom: index,
      initial: { opacity: 0, y: 20 },
      animate: controls,
    }),
  }
}
```

#### B. Component Grid Animation
```typescript
// src/components/showcase/AnimatedComponentGrid.tsx
import { motion } from 'framer-motion'
import { useStaggeredAnimation } from '../../hooks/use-staggered-animation'

interface AnimatedComponentGridProps {
  components: Array<{ id: string; name: string; category: string }>
  onComponentSelect: (id: string) => void
}

export function AnimatedComponentGrid({ 
  components, 
  onComponentSelect 
}: AnimatedComponentGridProps) {
  const { getItemProps } = useStaggeredAnimation(components.length, {
    staggerDelay: 0.08,
    initialDelay: 0.2,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {components.map((component, index) => (
        <motion.div
          key={component.id}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            y: -4,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onComponentSelect(component.id)}
          className="p-4 rounded-lg border bg-card hover:bg-accent cursor-pointer"
        >
          <h3 className="font-semibold">{component.name}</h3>
          <p className="text-sm text-muted-foreground">{component.category}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
```

## 🛠️ Implementation Steps

### Phase 1: Motion Design System (Week 1-2)
1. **Design token creation**
   - Define motion design tokens
   - Create animation presets
   - Set up responsive motion system

2. **Core animation components**
   - Implement MotionWrapper component
   - Create page transition system
   - Add responsive motion hook

### Phase 2: Micro-Interactions (Week 3-4)
3. **Interactive components**
   - Enhance button interactions
   - Add loading animations
   - Create feedback systems

4. **Advanced animations**
   - Implement staggered animations
   - Add orchestrated sequences
   - Create variant-specific effects

### Phase 3: Optimization & Polish (Week 5-6)
5. **Performance optimization**
   - Optimize animation performance
   - Add GPU acceleration
   - Implement animation budgets

6. **Accessibility & testing**
   - Add reduced motion support
   - Test animation performance
   - Create animation guidelines

## 📏 Success Metrics

### Performance
- **Frame Rate**: Maintain 60fps for all animations
- **Bundle Size**: Keep animation bundle < 50KB
- **GPU Usage**: Efficient hardware acceleration

### User Experience
- **Reduced Motion**: Full support for accessibility
- **Feedback Quality**: Clear visual feedback for all interactions
- **Loading States**: Smooth loading animations

### Developer Experience
- **Consistency**: Unified animation patterns
- **Ease of Use**: Simple animation APIs
- **Documentation**: Complete animation guidelines

## 🎯 Specific Actions

### Immediate (This Week)
- [ ] Define motion design tokens
- [ ] Create responsive motion hook
- [ ] Implement basic animation presets

### Short-term (Next 2 Weeks)
- [ ] Enhance component interactions
- [ ] Add page transition system
- [ ] Create loading animation library

### Medium-term (Next Month)
- [ ] Implement advanced animation sequences
- [ ] Optimize animation performance
- [ ] Complete accessibility features

## 🔗 Related Improvements
- [Performance Optimization](./03-performance-optimization.md) - Animation performance
- [Design System Refinements](./07-design-system-refinements.md) - Motion design tokens
- [Accessibility Enhancements](./05-accessibility-enhancements.md) - Reduced motion support

## 📋 Implementation Checklist

### Motion Design System
- [ ] Define comprehensive motion tokens
- [ ] Create animation presets library
- [ ] Implement responsive motion system
- [ ] Add variant-specific animations

### Interactive Components
- [ ] Enhance button micro-interactions
- [ ] Create loading animation system
- [ ] Add haptic feedback support
- [ ] Implement hover and press states

### Animation Orchestration
- [ ] Create staggered animation system
- [ ] Implement page transitions
- [ ] Add component grid animations
- [ ] Create animation sequences

### Performance & Accessibility
- [ ] Optimize for 60fps performance
- [ ] Add reduced motion support
- [ ] Test on low-end devices
- [ ] Create animation performance budgets
