'use client'

import { getRedirectPath } from "@/app/utils/query-param";
import { useGoogleLogin } from "@react-oauth/google";
import { redirect } from "next/navigation";


export default function SignupPage() {
    const redirectPath = getRedirectPath();
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            const res = await fetch('/api/auth/google-signup', {
                method: 'GET',
                headers: {
                    'Authorization': `${response.token_type} ${response.access_token}`
                }
            })
            console.log(res.headers.get('X-Message'));
            if (res.status === 201) {
                redirect(redirectPath);
            }
        },
    });
    return (
        <div>
            <h1>Login Page</h1>
            <button className="btn btn-accent" onClick={() => login()}>
                SignUp
            </button>
        </div>
    );

    
}