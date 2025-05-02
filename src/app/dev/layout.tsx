export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="prose prose-stone dark:prose-invert ">
            {children}
        </div>
    );
}