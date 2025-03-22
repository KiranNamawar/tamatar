'use client';

import logoutAction from '@/actions/auth';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
    async function handleLogout() {
        const res = await logoutAction();
        if (res.ok) {
            redirect('/login');
        } else {
            console.error(res.message);
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button className="btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
