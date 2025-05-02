'use client';
import { Button } from '@/components/ui/button';
import { logoutAction } from '../(auth)/utils/logout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="">Welcome to the dashboard!</p>
            <Button
                onClick={async () => {
                    setLoading(true);
                    const res = await logoutAction();
                    if (res.success) {
                        router.push('/login');
                    }
                    setLoading(false);
                }}
            >
                {loading ? <Loader className="animate-spin" /> : 'Logout'}
            </Button>
        </div>
    );
}
