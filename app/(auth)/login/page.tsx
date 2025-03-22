'use client';

import { useRedirectPath } from '@/hooks/query-param';
import { googleLoginRequest } from '@/utils/google-auth';
import { Button } from '@mantine/core';
import { useGoogleLogin } from '@react-oauth/google';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { redirect } from 'next/navigation';

export default function LoginPage() {
    const redirectPath = useRedirectPath();
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            const res = await googleLoginRequest(response);
            if (res.status === 200) {
                redirect(redirectPath);
            } else if (res.status === 404) {
                redirect(`/signup?redirectPath=${redirectPath}`);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });
    return (
        <div className="w-11/12 md:w-1/2 lg:w-1/3">
            <Button onClick={() => login()} fullWidth variant="light" leftSection={<IconBrandGoogleFilled />}>
                Login with Google
            </Button>
        </div>
    );
}
