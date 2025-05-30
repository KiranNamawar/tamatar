import { defineConfig } from '@tanstack/react-start/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
    ],
    build: {
      // Enable manual chunk splitting for better optimization
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Only split chunks for client build, not SSR
            if (typeof window === 'undefined') return;
            
            if (id.includes('motion/react')) return 'motion';
            if (id.includes('lucide-react')) return 'lucide';
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'react-vendor';
            if (id.includes('@tanstack/react-query') || id.includes('@tanstack/react-router')) return 'tanstack';
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) return 'ui-vendor';
            if (id.includes('@radix-ui/')) return 'radix';
          },
        },
      },
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 600,
      // Enable sourcemap for production debugging
      sourcemap: false,
      // Optimize CSS
      cssCodeSplit: true,
      // Enable compression
      minify: 'esbuild',
      target: 'esnext',
    },
    optimizeDeps: {
      // Pre-bundle heavy dependencies
      include: [
        'motion/react',
        'lucide-react',
        '@tanstack/react-query',
        '@tanstack/react-router',
        'clsx',
        'tailwind-merge',
      ],
    },
  },
  server: {
    preset: 'bun',
  }
})

export default config
