# Bundle Optimization & Build Performance

## 📊 Current State Analysis

### Current Bundle Composition
Based on the codebase analysis:
- **40+ UI components** in `src/components/ui/`
- **Three design variants** (default, glass, aurora)
- **Animation libraries** (Framer Motion)
- **UI primitives** (Radix UI)
- **Styling** (Tailwind CSS v4)

### Bundle Size Concerns
- Large component library footprint
- Potential for unused code inclusion
- Multiple animation systems
- Heavy dependency on external libraries

## 🎯 Bundle Optimization Goals

### Target Metrics
- **Initial Bundle**: < 300KB gzipped
- **Component Library**: < 200KB gzipped
- **Vendor Bundle**: < 150KB gzipped
- **Lazy Chunks**: < 50KB each
- **Tree Shaking Efficiency**: > 90%

## 📦 Optimization Strategies

### 1. Advanced Code Splitting

#### A. Component-Level Splitting
```typescript
// src/components/ui/index.ts
// Current: Barrel exports (prevents tree shaking)
export * from './accordion'
export * from './alert'
// ... all components

// Optimized: Specific exports with lazy loading
export const Button = lazy(() => import('./button').then(m => ({ default: m.Button })))
export const Card = lazy(() => import('./card').then(m => ({ default: m.Card })))

// Even better: Dynamic component registry
const componentRegistry = {
  Button: () => import('./button'),
  Card: () => import('./card'),
  Modal: () => import('./dialog'),
  // ... other components
} as const

export function loadComponent<K extends keyof typeof componentRegistry>(
  name: K
): Promise<ComponentType<any>> {
  return componentRegistry[name]().then(m => m[name])
}
```

#### B. Variant-Based Splitting
```typescript
// src/components/variants/index.ts
export const loadVariant = (variant: 'default' | 'glass' | 'aurora') => {
  switch (variant) {
    case 'glass':
      return import('../glass').then(m => m.GlassComponents)
    case 'aurora':
      return import('../aurora').then(m => m.AuroraComponents)
    default:
      return import('../ui').then(m => m.DefaultComponents)
  }
}

// Usage in components
function ThemeProvider({ variant, children }: ThemeProviderProps) {
  const [VariantComponents, setVariantComponents] = useState(null)

  useEffect(() => {
    loadVariant(variant).then(setVariantComponents)
  }, [variant])

  if (!VariantComponents) {
    return <LoadingSkeleton />
  }

  return (
    <VariantContext.Provider value={VariantComponents}>
      {children}
    </VariantContext.Provider>
  )
}
```

### 2. Tree Shaking Optimization

#### A. Library-Specific Optimizations
```typescript
// vite.config.ts or app.config.ts optimization
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog'],
          'animation-vendor': ['framer-motion'],
          
          // Feature chunks
          'showcase': ['./src/routes/showcase.tsx'],
          'components-grid': ['./src/components/ComponentGrid.tsx'],
        }
      }
    },
    
    // Tree shaking configuration
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      }
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@tanstack/react-router',
      '@tanstack/react-query'
    ],
    exclude: [
      // Exclude large libraries from pre-bundling
      'framer-motion'
    ]
  }
})
```

#### B. Import Optimization
```typescript
// src/lib/optimized-imports.ts
// Avoid deep imports that prevent tree shaking

// Bad: Imports entire library
import * as RadixIcons from '@radix-ui/react-icons'

// Good: Specific imports
import { ChevronDownIcon } from '@radix-ui/react-icons/dist/ChevronDownIcon'
import { CrossIcon } from '@radix-ui/react-icons/dist/CrossIcon'

// Better: Create optimized icon exports
export { ChevronDownIcon, CrossIcon, PlusIcon } from '@radix-ui/react-icons'

// Framer Motion optimization
// Bad: Imports entire library
import { motion } from 'framer-motion'

// Good: Import only needed features
import { m } from 'framer-motion'
// Or create optimized motion components
export const MotionDiv = m.div
export const MotionSpan = m.span
```

### 3. Dynamic Import Strategies

#### A. Feature-Based Loading
```typescript
// src/features/index.ts
export const loadFeature = async (featureName: string) => {
  const features = {
    showcase: () => import('./showcase'),
    componentGrid: () => import('./component-grid'),
    codeViewer: () => import('./code-viewer'),
    themeSelector: () => import('./theme-selector'),
  }

  const feature = features[featureName as keyof typeof features]
  if (!feature) {
    throw new Error(`Feature ${featureName} not found`)
  }

  return feature()
}

// Usage with Suspense
function FeatureLoader({ featureName, ...props }: FeatureLoaderProps) {
  const [Feature, setFeature] = useState<ComponentType | null>(null)

  useEffect(() => {
    loadFeature(featureName)
      .then(module => setFeature(() => module.default))
      .catch(console.error)
  }, [featureName])

  if (!Feature) {
    return <FeatureSkeleton />
  }

  return <Feature {...props} />
}
```

#### B. Conditional Loading
```typescript
// src/hooks/use-conditional-imports.ts
export function useConditionalImport<T>(
  condition: boolean,
  importFn: () => Promise<{ default: T }>
) {
  const [module, setModule] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (condition && !module) {
      setLoading(true)
      importFn()
        .then(m => {
          setModule(m.default)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [condition, module, importFn])

  return { module, loading }
}

// Usage for heavy features
function ShowcasePage() {
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  
  const { module: CodeEditor, loading } = useConditionalImport(
    showCodeEditor,
    () => import('@monaco-editor/react')
  )

  return (
    <div>
      <Button onClick={() => setShowCodeEditor(true)}>
        Show Code Editor
      </Button>
      
      {showCodeEditor && (
        loading ? <CodeEditorSkeleton /> : <CodeEditor />
      )}
    </div>
  )
}
```

### 4. Asset Optimization

#### A. CSS Optimization
```css
/* src/styles/critical.css - Critical path CSS */
/* Only essential styles for initial render */
@layer base {
  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
  }
}

/* src/styles/components.css - Component styles (lazy loaded) */
@layer components {
  /* Non-critical component styles */
  .glass-morphism {
    /* Glass variant styles */
  }
  
  .aurora-gradient {
    /* Aurora variant styles */
  }
}
```

#### B. Font Optimization
```typescript
// app.config.ts
export default defineConfig({
  app: {
    head: [
      // Preload critical fonts
      {
        tag: 'link',
        attrs: {
          rel: 'preload',
          href: '/fonts/inter-var.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      },
      // Font display optimization
      {
        tag: 'style',
        children: `
          @font-face {
            font-family: 'Inter';
            src: url('/fonts/inter-var.woff2') format('woff2');
            font-display: swap;
            font-weight: 100 900;
          }
        `,
      },
    ],
  },
})
```

### 5. Bundle Analysis & Monitoring

#### A. Bundle Analyzer Integration
```typescript
// scripts/analyze-bundle.ts
import { build } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

async function analyzeBundleSize() {
  await build({
    plugins: [
      visualizer({
        filename: 'dist/bundle-analysis.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    build: {
      reportCompressedSize: true,
    },
  })
}

analyzeBundleSize()
```

#### B. Bundle Size Budget
```json
// .bundlesize.config.json
{
  "files": [
    {
      "path": "./dist/assets/index-*.js",
      "maxSize": "300KB",
      "compression": "gzip"
    },
    {
      "path": "./dist/assets/vendor-*.js",
      "maxSize": "150KB",
      "compression": "gzip"
    },
    {
      "path": "./dist/assets/*.css",
      "maxSize": "50KB",
      "compression": "gzip"
    }
  ]
}
```

#### C. Bundle Performance Monitoring
```typescript
// src/lib/bundle-monitor.ts
interface BundleMetrics {
  totalSize: number
  chunkSizes: Record<string, number>
  loadTimes: Record<string, number>
}

export class BundleMonitor {
  private metrics: BundleMetrics = {
    totalSize: 0,
    chunkSizes: {},
    loadTimes: {},
  }

  trackChunkLoad(chunkName: string, size: number, loadTime: number) {
    this.metrics.chunkSizes[chunkName] = size
    this.metrics.loadTimes[chunkName] = loadTime
    this.metrics.totalSize += size

    // Send to analytics if size exceeds budget
    if (size > this.getBudget(chunkName)) {
      this.reportBudgetExceeded(chunkName, size)
    }
  }

  private getBudget(chunkName: string): number {
    const budgets = {
      main: 300000, // 300KB
      vendor: 150000, // 150KB
      feature: 50000, // 50KB
    }
    
    return budgets[chunkName as keyof typeof budgets] || 50000
  }

  private reportBudgetExceeded(chunkName: string, size: number) {
    console.warn(`Bundle budget exceeded for ${chunkName}: ${size} bytes`)
    // Send to monitoring service
  }
}

export const bundleMonitor = new BundleMonitor()
```

### 6. Runtime Optimization

#### A. Module Federation (Future Enhancement)
```typescript
// vite.config.ts - Module Federation setup
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    federation({
      name: 'tamatar-ui',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/ui/button',
        './Card': './src/components/ui/card',
        './Modal': './src/components/ui/dialog',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
})
```

#### B. Service Worker Caching
```typescript
// public/sw.js - Service Worker for bundle caching
const CACHE_NAME = 'tamatar-ui-v1'
const STATIC_ASSETS = [
  '/assets/index.js',
  '/assets/vendor.js',
  '/assets/index.css',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/assets/')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    )
  }
})
```

## 🛠️ Implementation Steps

### Phase 1: Analysis & Setup (Week 1)
1. **Bundle analysis setup**
   - Install bundle analyzer tools
   - Create bundle size monitoring
   - Establish performance budgets

2. **Basic code splitting**
   - Implement route-based splitting
   - Add component lazy loading
   - Create loading fallbacks

### Phase 2: Advanced Optimization (Week 2-3)
3. **Tree shaking optimization**
   - Optimize library imports
   - Remove unused dependencies
   - Configure build tools

4. **Dynamic imports**
   - Implement feature-based loading
   - Add conditional imports
   - Optimize asset loading

### Phase 3: Monitoring & Maintenance (Week 4)
5. **Performance monitoring**
   - Set up bundle size tracking
   - Create performance dashboards
   - Implement automated alerts

6. **Documentation & guidelines**
   - Create bundle optimization guide
   - Document best practices
   - Train development team

## 📏 Success Metrics

### Bundle Size Targets
- **Initial Load**: < 300KB gzipped (target: 250KB)
- **Component Library**: < 200KB gzipped (target: 150KB)
- **Individual Chunks**: < 50KB gzipped (target: 30KB)

### Performance Improvements
- **Load Time**: Reduce by 40%
- **Tree Shaking**: Achieve 90%+ unused code elimination
- **Cache Hit Rate**: Achieve 80%+ for returning users

### Developer Experience
- **Build Time**: Reduce by 30%
- **Bundle Analysis**: Automated reporting
- **Performance Budgets**: Zero budget violations

## 🎯 Specific Actions

### Immediate (This Week)
- [ ] Set up bundle analyzer and size monitoring
- [ ] Implement basic route-based code splitting
- [ ] Create performance budget configuration

### Short-term (Next 2 Weeks)
- [ ] Optimize component imports and exports
- [ ] Implement dynamic feature loading
- [ ] Add tree shaking optimizations

### Medium-term (Next Month)
- [ ] Complete asset optimization
- [ ] Set up service worker caching
- [ ] Implement bundle performance monitoring

## 🔗 Related Improvements
- [Performance Optimization](./03-performance-optimization.md) - Runtime performance improvements
- [Code Organization](./01-code-organization.md) - Structure for better tree shaking
- [Developer Experience](./09-developer-experience.md) - Build tooling improvements

## 📋 Implementation Checklist

### Bundle Analysis
- [ ] Install and configure bundle analyzer
- [ ] Set up bundle size monitoring
- [ ] Create performance budgets
- [ ] Establish baseline metrics

### Code Splitting
- [ ] Implement route-based splitting
- [ ] Add component lazy loading
- [ ] Create variant-based splitting
- [ ] Test loading behavior

### Tree Shaking
- [ ] Optimize library imports
- [ ] Remove unused dependencies
- [ ] Configure build tools for tree shaking
- [ ] Verify tree shaking effectiveness

### Monitoring
- [ ] Set up automated bundle analysis
- [ ] Create performance dashboards
- [ ] Implement budget violation alerts
- [ ] Document optimization guidelines
