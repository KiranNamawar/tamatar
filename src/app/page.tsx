import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import {
    ShieldCheck,
    Key,
    Database,
    Code,
    Mail,
    Users,
    Zap,
    Lock,
    CheckCircle,
    Globe,
    Smartphone,
    Server,
    Layers,
    ArrowRight,
    Github,
    ExternalLink,
} from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Header */}
            <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold">Tamatar</h1>
                        <Badge variant="secondary" className="text-xs">
                            Next.js 15
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link
                                href="https://github.com/kirnnamawar/tamatar"
                                target="_blank"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/login">
                                <Key className="mr-2 h-4 w-4" />
                                Login
                            </Link>
                        </Button>
                        <Button variant="default" asChild>
                            <Link href="/signup">
                                <Users className="mr-2 h-4 w-4" />
                                Sign up
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4 py-16">
                <div className="mb-16 text-center">
                    <div className="mb-4 flex justify-center">
                        <Badge
                            variant="outline"
                            className="text-sm font-medium"
                        >
                            <Server className="mr-1 h-3 w-3" />
                            Enterprise Next.js Authentication
                        </Badge>
                    </div>
                    <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl dark:text-slate-100">
                        Modern Authentication with{' '}
                        <span className="text-blue-600 dark:text-blue-400">
                            Next.js 15
                        </span>
                    </h1>{' '}
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-slate-600 dark:text-slate-300">
                        A cutting-edge authentication system built with Next.js
                        15, Server Actions, React 19, and Server Components.
                        Showcasing modern full-stack development with
                        enterprise-grade security and performance.
                    </p>
                    {/* CTA Buttons */}
                    <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button size="lg" asChild className="min-w-[160px]">
                            <Link href="/signup">
                                <Users className="mr-2 h-4 w-4" />
                                Try Live Demo
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            asChild
                            className="min-w-[160px]"
                        >
                            <Link href="/login">
                                <Key className="mr-2 h-4 w-4" />
                                Sign In
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                            asChild
                            className="min-w-[160px]"
                        >
                            <Link
                                href="https://github.com/kirannamawar/tamatar/tree/nextjs"
                                target="_blank"
                            >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Source
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Key Features */}
                <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="border-2 transition-shadow hover:border-blue-200 hover:shadow-lg dark:hover:border-blue-800">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                                    <Server className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <CardTitle className="text-lg">
                                    Server Actions
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Form handling without API routes using Next.js
                                15 Server Actions. Secure, type-safe, and
                                optimized for performance.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 transition-shadow hover:border-green-200 hover:shadow-lg dark:hover:border-green-800">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900">
                                    <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <CardTitle className="text-lg">
                                    Enterprise Security
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                JWT authentication, secure cookies, CSRF
                                protection, and comprehensive input validation
                                for production-ready security.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 transition-shadow hover:border-purple-200 hover:shadow-lg dark:hover:border-purple-800">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                                    <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <CardTitle className="text-lg">
                                    Server Actions
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                End-to-end type safety with Server Actions,
                                eliminating runtime errors and improving
                                developer experience with auto-completion.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 transition-shadow hover:border-orange-200 hover:shadow-lg dark:hover:border-orange-800">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900">
                                    <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <CardTitle className="text-lg">
                                    OAuth & Social Login
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Seamless Google OAuth integration with automatic
                                profile synchronization and secure session
                                management.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 transition-shadow hover:border-indigo-200 hover:shadow-lg dark:hover:border-indigo-800">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900">
                                    <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <CardTitle className="text-lg">
                                    Email System
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                React Email templates with Resend integration
                                for reliable email verification and password
                                reset functionality.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 transition-shadow hover:border-yellow-200 hover:shadow-lg dark:hover:border-yellow-800">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900">
                                    <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <CardTitle className="text-lg">
                                    Modern Stack
                                </CardTitle>
                            </div>
                        </CardHeader>{' '}
                        <CardContent>
                            <CardDescription>
                                Built with React 19, Server Actions, Prisma ORM,
                                and Turbopack for optimal performance and
                                developer experience.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* Technology Stack */}
                <Card className="mb-16">
                    <CardHeader className="text-center">
                        <CardTitle className="mb-2 text-2xl">
                            Technology Stack
                        </CardTitle>
                        <CardDescription>
                            Leveraging cutting-edge technologies for maximum
                            performance and developer experience
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg bg-slate-50 p-4 text-center dark:bg-slate-800">
                                <div className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    Frontend
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            Next.js 15
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            React 19
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            Tailwind CSS
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            shadcn/ui
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-slate-50 p-4 text-center dark:bg-slate-800">
                                <div className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    Backend
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            Server Actions
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            Server Actions
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            Prisma ORM
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            PostgreSQL
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-slate-50 p-4 text-center dark:bg-slate-800">
                                <div className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    State & Data
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            React Hook Form
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            TanStack Query
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            React Hook Form
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            Zod
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-slate-50 p-4 text-center dark:bg-slate-800">
                                <div className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    Dev Tools
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            TypeScript
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            Turbopack
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            ESLint
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            Prettier
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Authentication Features */}
                <Card className="mb-16">
                    <CardHeader className="text-center">
                        <CardTitle className="mb-2 text-2xl">
                            Authentication Features
                        </CardTitle>
                        <CardDescription>
                            Comprehensive authentication system with modern
                            security practices
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-4">
                                <h3 className="flex items-center gap-2 text-lg font-semibold">
                                    <Lock className="h-5 w-5" />
                                    Security Features
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                                        <span className="text-sm">
                                            Server Actions for secure form
                                            processing
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                                        <span className="text-sm">
                                            JWT tokens with secure HTTP-only
                                            cookies
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                                        <span className="text-sm">
                                            Bcrypt password hashing with salt
                                            rounds
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                                        <span className="text-sm">
                                            CSRF protection and rate limiting
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                                        <span className="text-sm">
                                            Comprehensive input validation with
                                            Zod
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="flex items-center gap-2 text-lg font-semibold">
                                    <Smartphone className="h-5 w-5" />
                                    User Experience
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-blue-600" />
                                        <span className="text-sm">
                                            Progressive enhancement with Server
                                            Actions
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-blue-600" />
                                        <span className="text-sm">
                                            Real-time form validation and error
                                            handling
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-blue-600" />
                                        <span className="text-sm">
                                            Google OAuth with one-click
                                            registration
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-blue-600" />
                                        <span className="text-sm">
                                            Email verification with OTP system
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-blue-600" />
                                        <span className="text-sm">
                                            Responsive design with dark mode
                                            support
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Call to Action */}
                <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-center dark:border-blue-800 dark:from-blue-950 dark:to-indigo-950">
                    <CardHeader>
                        <CardTitle className="mb-2 text-2xl">
                            Experience Modern Authentication
                        </CardTitle>
                        <CardDescription className="text-base">
                            Test the complete authentication flow with real-time
                            validation, secure sessions, and seamless OAuth
                            integration
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button size="lg" asChild className="min-w-[180px]">
                                <Link href="/signup">
                                    <Users className="mr-2 h-4 w-4" />
                                    Create Account
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <span className="font-medium text-slate-400">
                                or
                            </span>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="min-w-[180px]"
                            >
                                <Link href="/login">
                                    <Key className="mr-2 h-4 w-4" />
                                    Sign In
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <Separator className="my-6" />
                        <div className="mx-auto max-w-2xl">
                            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                                This live demo showcases a production-ready
                                authentication system built with Next.js 15 and
                                modern React patterns. Features include Server
                                Actions, comprehensive security measures, and
                                optimal performance.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                    Server Actions
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    Type Safety
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    OAuth Integration
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    Email Verification
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    Enterprise Security
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* Footer */}
            <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur">
                <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
                    <div className="flex items-center gap-2">
                        <p className="text-muted-foreground text-sm">
                            Built with Next.js 15 & React 19 by{' '}
                            <Link
                                href="https://github.com/kirannamawar"
                                className="font-medium underline underline-offset-4"
                            >
                                Kiran Namawar
                            </Link>
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://github.com/kirannamawar/tamatar/tree/nextjs"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <Github className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-muted-foreground hover:text-foreground text-sm"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
