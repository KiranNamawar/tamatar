'use client';
import { Button } from '@/components/ui/button';
import { logoutAction } from '../(auth)/logout/action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
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
