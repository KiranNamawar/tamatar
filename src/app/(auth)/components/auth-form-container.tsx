export default function AuthFormContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full space-y-4 rounded-lg border-2 border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-4 shadow-md backdrop-blur-sm">
            {children}
        </div>
    );
}
