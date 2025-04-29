'use client';

import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import { googleAction } from '@/app/(auth)/google/action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

/**
 * GoogleButton Component
 *
 * Renders a button for Google OAuth authentication. Handles login/signup via Google,
 * invokes the googleAction server action, and manages UI state and error handling.
 *
 * Props:
 * - redirectPath: Where to redirect after successful Google login/signup.
 * - route: 'login' or 'signup', determines the context of the button.
 *
 * Features:
 * - Integrates with @react-oauth/google for OAuth flow.
 * - Handles server-side and client-side errors.
 * - Uses useActionState for pending state and error feedback.
 * - Displays loading spinner during authentication.
 *
 * @param redirectPath - Where to redirect after successful Google login/signup
 * @param route - 'login' or 'signup' (button context)
 */
export default function GoogleButton({
    redirectPath,
    route,
}: {
    redirectPath: string;
    route: 'login' | 'signup';
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            if (tokenResponse.expires_in < 0) {
                console.error('Token expired');
                toast.error('Token expired');
                setLoading(false);
                return;
            }
            const { access_token } = tokenResponse;
            const res = await googleAction(access_token, navigator.userAgent);
            if (res.success) {
                toast.success(`Welcome to Tamatar Store!`);
                setLoading(false);
                router.push(redirectPath);
            } else {
                console.error('Login Failed:', res.error);
                toast.error(
                    `Login failed: ${res.error!.message || 'Unknown error'}`,
                );
                setLoading(false);
            }
        },
        onError: (error) => {
            console.error('Login Failed:', error);
            toast.error(
                `Login failed: ${error.error_description || 'Unknown error'}`,
            );
            setLoading(false);
        },
    });
    return (
        <Button
            variant="outline"
            disabled={loading}
            onClick={() => {
                setLoading(true);
                login();
            }}
            className="w-full"
        >
            {loading ? (
                <Loader className="animate-spin" />
            ) : (
                <>
                    <Image src="/google.svg" alt="Google" width={20} height={20} />
                    <span>
                        {route === 'signup'
                            ? 'Sign up with Google'
                            : 'Login with Google'}
                    </span>
                </>
            )}
        </Button>
    );
}
