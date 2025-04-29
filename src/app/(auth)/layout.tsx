import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getEnvironmentVariable } from '@/utils/env';

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <GoogleOAuthProvider
                clientId={getEnvironmentVariable('GOOGLE_CLIENT_ID')}
            >
                {children}
            </GoogleOAuthProvider>
        </div>
    );
}
