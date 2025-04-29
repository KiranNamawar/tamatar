export default function AuthLayout({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center p-4">
            <header className="text-center">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="mt-2 text-gray-600">{description}</p>
            </header>
            <main className="m-4 flex w-full max-w-md flex-col items-center justify-center">
                {children}
            </main>
        </div>
    );
}
