import type { Metadata } from 'next';
import './globals.css';
import '@mantine/core/styles.css';


import {ColorSchemeScript, MantineProvider, mantineHtmlProps} from '@mantine/core';

export const metadata: Metadata = {
    title: 'Tamatar Store',
    description: 'Tamatar Store website',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body className={`antialiased`}>
                <MantineProvider defaultColorScheme='dark'>
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
