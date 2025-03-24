'use client';

import { IconLayoutDashboard } from '@tabler/icons-react';
import LogoutButton from '@/components/auth/logout-button';
import Link from 'next/link';

const AppDashboardHeader = () => {
    return (
        <header className="navbar bg-green-300">
            <Link href='/dashboard' className="navbar-start gap-1">
                <IconLayoutDashboard color='black' />
                <h1 className='text-black font-medium text-xl'>Dashboard</h1>
            </Link>
            <nav className="navbar-center"></nav>
            <div className="navbar-end">
                <LogoutButton />
            </div>
        </header>
    );
};

export default AppDashboardHeader;