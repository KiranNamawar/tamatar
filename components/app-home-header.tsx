'use client';

import { useAuth } from '@/context/auth';
import LogoutButton from './auth/logout-button';
import Link from 'next/link';
import { IconLemon } from '@tabler/icons-react';

export default function AppHeader() {
    const { isAuthenticated } = useAuth();

    return (
        <header className="navbar bg-yellow-200">
            <Link href="/" className="navbar-start gap-1">
                <IconLemon size={24} color='black'/>
                <h1 className="text-neutral text-2xl font-medium">tamatar</h1>
            </Link>
            <nav className="navbar-center"></nav>
            <div className="navbar-end">
                {isAuthenticated ? (
                    <LogoutButton />
                ) : (
                    <div className=' flex gap-5'>
                        <Link href="/login" className="btn btn-neutral">
                            Login
                        </Link>
                        <Link href="/signup" className="btn btn-accent">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
