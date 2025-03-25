import type { Metadata } from 'next';
import './globals.css';
import '@mantine/core/styles.css';

import {
    ColorSchemeScript,
    MantineProvider,
    mantineHtmlProps,
} from '@mantine/core';
import { AuthProvider } from '@/context/auth';
import { getAccessToken } from '@/utils/auth/cookies';
import { verifyAccessToken } from '@/utils/auth/jwt';

export const metadata: Metadata = {
    title: 'Tamatar Store',
    description: 'Tamatar Store website',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let isAuthenticated = false;
    let ids = {
        userId: '',
        profileId: '',
    };
    const accessToken = await getAccessToken();
    if (accessToken.ok) {
        const userId = await verifyAccessToken(accessToken.data.value);
        if (userId.ok) {
            isAuthenticated = true;
            ids = {
                userId: userId.data.userId,
                profileId: userId.data.profileId,
            };
        }
    }

    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body className={`antialiased`}>
                <AuthProvider isAuthenticated={isAuthenticated} userId={ids.userId} profileId={ids.profileId}>
                    <MantineProvider defaultColorScheme="dark">
                        {children}
                    </MantineProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
