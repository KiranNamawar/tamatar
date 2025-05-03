import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from './providers';

export const metadata: Metadata = {
    title: 'Tamatar Store',
    description: 'Build web page for your store',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Providers>{children}</Providers>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
