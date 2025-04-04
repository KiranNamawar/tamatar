'use client';

import { signUpAction } from '@/actions/auth';
import { useRedirectPath } from '@/hooks/query-param';
import { ActionReturn } from '@/types/actionReturn';
import { useActionState } from 'react';

const initialState: ActionReturn<void> = {
    status: 'idle',
};

export default function SignUpForm() {
    const [state, formAction, pending] = useActionState(
        signUpAction,
        initialState,
    );
    const redirectPath = useRedirectPath();
    if (state.status === 'success') {
        // Redirect to the home page after successful signup
        window.location.href = redirectPath || '/dashboard';
    }

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <label className="input w-full">
                Name
                <input
                    type="text"
                    name="name"
                    required
                    className="grow"
                    placeholder="Enter your name"
                />
            </label>
            <label className="input w-full">
                Email
                <input
                    type="email"
                    name="email"
                    required
                    className="grow"
                    placeholder="Enter your email"
                />
            </label>
            <label className="input w-full">
                Password
                <input
                    type="password"
                    name="password"
                    required
                    pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
                    title="Password must be at least 8 characters long and contain at least one letter and one number"
                    className="grow"
                    placeholder="Enter your password"
                />
            </label>
            <label className="input w-full">
                Confirm Password
                <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="grow"
                    placeholder="Confirm your password"
                />
            </label>
            <input type='hidden' name='user-agent' value={navigator.userAgent} />
            <button
                type="submit"
                className="btn btn-primary"
                disabled={pending}
            >
                {pending ? 'Signing up...' : 'Sign Up'}
            </button>
            {state.status === 'error' && (
                <div className="alert alert-error">{state.error}</div>
            )}
        </form>
    );
}
