'use client';

import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import { googleAction } from '@/app/(auth)/google/action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

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
