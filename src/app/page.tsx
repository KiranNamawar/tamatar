import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen">
            <header className="bg-accent flex items-center justify-between p-4">
                <h1 className="text-4xl font-bold">Tamatar</h1>
                <div className="flex items-center gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button variant="default" asChild>
                        <Link href="/signup">Sign up</Link>
                    </Button>
                </div>
            </header>
            <main></main>
            <footer></footer>
        </div>
    );
}
