'use client'
import { loginAction } from "@/actions/auth";
import { ActionReturn } from "@/types/actionReturn";
import { useActionState } from "react";


const initialState: ActionReturn<void> = {
    status: 'idle',
}

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(
        loginAction,
        initialState,
    );
    if (state.status === 'success') {
        // Redirect to the home page after successful login
        window.location.href = '/dashboard';
    }
    return (
        <form action={formAction} className="flex flex-col gap-4">
            <label className="input">
                Email
                <input
                    type="email"
                    name="email"
                    required
                    className="grow"
                    placeholder="Enter your email"
                />
            </label>
            <label className="input">
                Password
                <input
                    type="password"
                    name="password"
                    required
                    className="grow"
                    placeholder="Enter your password"
                />
            </label>
            <input type="hidden" name="user-agent" value={navigator.userAgent} />
            <button type="submit" disabled={pending} className="btn btn-primary">
                {pending ? 'Logging in...' : 'Login'}
            </button>
            {state.status === 'error' && (
                <p className="text-red-500">{state.error}</p>
            )}
        </form>
    )
}