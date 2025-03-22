'use client';

import { useRedirectPath } from '@/hooks/query-param';
import { useHeaders } from '@/hooks/headers';
import { useGoogleLogin } from '@react-oauth/google';
import { redirect } from 'next/navigation';
import { googleSignupRequest } from '@/utils/google-auth';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { Button } from '@mantine/core';

export default function SignupPage() {
    const redirectPath = useRedirectPath();
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            const res = await googleSignupRequest(response);
            if (res.status === 201) {
                redirect(redirectPath);
            } else if (res.status === 409) {
                redirect(`/login?redirectPath=${redirectPath}`);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });
    return (
        <div className="w-11/12 md:w-1/2 lg:w-1/3">
            <Button
                onClick={() => login()}
                leftSection={<IconBrandGoogleFilled />}
                fullWidth
                variant="light"
            >
                SignUp wih Google
            </Button>
        </div>
    );
}
