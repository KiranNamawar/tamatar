import { GoogleOAuthProvider } from '@react-oauth/google';

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
            <div>
                <h1>Auth Layout</h1>
                {children}
            </div>
        </GoogleOAuthProvider>
    );
}
