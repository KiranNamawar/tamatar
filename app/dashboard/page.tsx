'use client'
import logoutAction, { clearAuthCookiesAction } from '@/actions/auth';
import { deleteUserAction } from '@/actions/user';

export default function DashboardPage() {
    
    async function handleLogout() {
        const res = await logoutAction();
        if (!res.ok) {
            console.error(res.message);
        }
    }

    async function handleDelete() {
        const res = await deleteUserAction();
        if (!res.ok) {
            console.error(res.message);
        }
    }

    async function clearCookies() {
        const res = await clearAuthCookiesAction();
        if (!res.ok) {
            console.error(res.message);
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
                <button className="btn" onClick={handleLogout}>
                    Logout
                </button>
                <br />
                <button className="btn btn-error" onClick={handleDelete}>
                    Delete
            </button>
            
            <button className='btn' onClick={clearCookies}>
                Clear Cookies
            </button>
        </div>
    );
}
