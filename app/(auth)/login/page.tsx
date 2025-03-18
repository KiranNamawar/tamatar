'use client'

import { getQueryParam, getRedirectPath } from "@/app/utils/query-param";
import { useGoogleLogin } from "@react-oauth/google";


export default function LoginPage() {
    const redirectPath = getRedirectPath();
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
        }
    })
    return (
        <div>
            <p>{ redirectPath }</p>
            <h1>Login Page</h1>
            <button className="btn btn-accent" onClick={() =>login()}>Login</button>
        </div>
    );
}