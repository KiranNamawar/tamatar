import { GoogleOAuthProvider } from '@react-oauth/google';
import { Suspense } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
            <main className="flex flex-col items-center justify-center h-screen">
                <Suspense fallback={<div className='loading loading-ring loading-xl text-yellow-400'></div>}> 
                    {children}
                </Suspense>
            </main>
        </GoogleOAuthProvider>
    );
}
