// components/Providers.tsx or lib/Providers.tsx
'use client';

import { Provider as JotaiProvider } from 'jotai';
import { useHydrateAtoms } from 'jotai/react/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClientAtom } from 'jotai-tanstack-query';

// Create the QueryClient instance *outside* the component or use useState
// to ensure it persists across renders and isn't recreated.
// Using useState is often recommended in React functional components.
const queryClient = new QueryClient();

// Component to hydrate the Jotai atom with the QueryClient instance
const HydrateAtoms = ({ children }: { children: React.ReactNode }) => {
    useHydrateAtoms([[queryClientAtom, queryClient]]);
    return children;
};

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <JotaiProvider>
                <HydrateAtoms>{children}</HydrateAtoms>
            </JotaiProvider>
        </QueryClientProvider>
    );
}
