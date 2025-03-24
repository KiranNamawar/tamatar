'use client';

import { useRedirectPath } from '@/hooks/query-param';
import { googleLoginRequest } from '@/utils/auth/google-auth';
import { Button } from '@mantine/core';
import { useGoogleLogin } from '@react-oauth/google';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { redirect } from 'next/navigation';

export default function GoogleLoginButton() {
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
        <Button onClick={() => login()} fullWidth variant="light" leftSection={<IconBrandGoogleFilled />}>
            Login with Google
        </Button>
    );
}