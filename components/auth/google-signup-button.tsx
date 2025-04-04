'use client';

import { useRedirectPath } from '@/hooks/query-param';
import { useGoogleLogin } from '@react-oauth/google';
import { redirect } from 'next/navigation';
import { googleSignupRequest } from '@/utils/auth/google-auth';
import { IconBrandGoogleFilled } from '@tabler/icons-react';

export default function GoogleSignupButton() {
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
        <button
            onClick={() => login()}
            className='btn btn-soft w-full'
        >
            <IconBrandGoogleFilled className="mr-2" />
            Signup wih Google
        </button>
    );
}