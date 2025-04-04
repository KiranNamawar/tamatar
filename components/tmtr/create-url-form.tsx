'use client';

import { shortenAction } from '@/actions/tmtr';
import { ActionReturn } from '@/types/actionReturn';
import { Button, TextInput } from '@mantine/core';
import { useActionState } from 'react';

const initialState: ActionReturn<{ newUrl: string }> = {
    status: 'idle',
};

export default function TmtrCreateUrlForm() {
    const [state, formAction, pending] = useActionState(
        shortenAction,
        initialState,
    );
    return (
        <form action={formAction} className='flex flex-col gap-4 m-5 border rounded-2xl p-4 border-blue-400'>
            <TextInput
                label="Original URL"
                name="originalUrl"
                placeholder="Enter a URL starting with https://"
                type='url'
                required
            />
            <Button type="submit" disabled={pending}>
                Shorten
            </Button>
            {state.status === 'error' && <div className='text-error'>{state.error}</div>}
            {state.status === 'success' && <div className='text-success'>{state.data.newUrl}</div>}
        </form>
    );
}
