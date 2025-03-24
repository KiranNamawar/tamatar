'use client';

import logoutAction from '@/actions/auth';

export default function LogoutButton() {
    async function handleLogout() {
        const res = await logoutAction();
        if (!res.ok) {
            console.error(res.message);
        }
    }

    return (
        <button onClick={handleLogout} className="btn">Logout</button>
    );
}