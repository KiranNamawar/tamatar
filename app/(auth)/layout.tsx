import { GoogleOAuthProvider } from '@react-oauth/google';

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
            <div className="flex flex-col items-center justify-center h-screen">
                {children}
            </div>
        </GoogleOAuthProvider>
    );
}
