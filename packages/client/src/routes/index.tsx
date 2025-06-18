import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
	Smartphone
} from "lucide-react";

export const Route = createFileRoute("/")({
	component: HomePage,
});

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			{/* Hero Section */}
			<div className="container mx-auto px-4 py-16">
				<div className="text-center mb-16">
					<div className="flex justify-center mb-4">
						<Badge variant="secondary" className="text-sm font-medium">
							Enterprise Authentication System
						</Badge>
					</div>
					<h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
						Welcome to <span className="text-blue-600 dark:text-blue-400">Tamatar</span>
					</h1>
					<p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
						A comprehensive, enterprise-grade authentication system built with modern TypeScript technologies. 
						Featuring JWT tokens, OAuth integration, and robust security measures.
					</p>
					
					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
						<Link to="/auth/signup">
							<Button size="lg" className="w-full sm:w-auto min-w-[140px]">
								<Users className="w-4 h-4 mr-2" />
								Sign Up
							</Button>
						</Link>
						<Link to="/auth/login">
							<Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[140px]">
								<Key className="w-4 h-4 mr-2" />
								Log In
							</Button>
						</Link>
					</div>
				</div>

				{/* Features Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<div className="flex items-center gap-3">
								<ShieldCheck className="w-8 h-8 text-green-600" />
								<CardTitle className="text-lg">Secure Authentication</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<CardDescription>
								JWT-based authentication with refresh tokens, password hashing, and session management 
								for maximum security.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<div className="flex items-center gap-3">
								<Globe className="w-8 h-8 text-blue-600" />
								<CardTitle className="text-lg">OAuth Integration</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Seamless Google OAuth login integration with automatic account creation and 
								profile synchronization.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<div className="flex items-center gap-3">
								<Mail className="w-8 h-8 text-purple-600" />
								<CardTitle className="text-lg">Email Verification</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<CardDescription>
								OTP-based email verification system with React Email templates and 
								Resend integration for reliable delivery.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<div className="flex items-center gap-3">
								<Database className="w-8 h-8 text-orange-600" />
								<CardTitle className="text-lg">GraphQL API</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Type-safe GraphQL API built with Pothos, featuring comprehensive error handling 
								and input validation.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<div className="flex items-center gap-3">
								<Code className="w-8 h-8 text-indigo-600" />
								<CardTitle className="text-lg">Modern Stack</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Built with React 19, TanStack Router, Prisma ORM, and Bun runtime for 
								optimal performance and developer experience.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<div className="flex items-center gap-3">
								<Zap className="w-8 h-8 text-yellow-600" />
								<CardTitle className="text-lg">Type Safety</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<CardDescription>
								End-to-end type safety with TypeScript, Zod validation, and shared schemas 
								across client and server.
							</CardDescription>
						</CardContent>
					</Card>
				</div>

				{/* Tech Stack Section */}
				<Card className="mb-16">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl mb-2">Technology Stack</CardTitle>
						<CardDescription>
							Built with modern, production-ready technologies
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="text-center p-4">
								<div className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Frontend</div>
								<div className="space-y-1 text-sm">
									<div>React 19</div>
									<div>TanStack Router</div>
									<div>Tailwind CSS</div>
									<div>React Hook Form</div>
								</div>
							</div>
							<div className="text-center p-4">
								<div className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Backend</div>
								<div className="space-y-1 text-sm">
									<div>Bun Runtime</div>
									<div>GraphQL Yoga</div>
									<div>Pothos</div>
									<div>Prisma ORM</div>
								</div>
							</div>
							<div className="text-center p-4">
								<div className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Database</div>
								<div className="space-y-1 text-sm">
									<div>PostgreSQL</div>
									<div>Prisma Migrations</div>
									<div>Database Indexing</div>
									<div>Session Storage</div>
								</div>
							</div>
							<div className="text-center p-4">
								<div className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Security</div>
								<div className="space-y-1 text-sm">
									<div>JWT Tokens</div>
									<div>Bcrypt Hashing</div>
									<div>Input Validation</div>
									<div>CSRF Protection</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Authentication Flow Section */}
				<Card className="mb-16">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl mb-2">Authentication Features</CardTitle>
						<CardDescription>
							Comprehensive authentication system with multiple login methods
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 gap-8">
							<div>
								<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
									<Lock className="w-5 h-5" />
									Security Features
								</h3>
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<CheckCircle className="w-4 h-4 text-green-600" />
										<span className="text-sm">JWT access & refresh tokens</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="w-4 h-4 text-green-600" />
										<span className="text-sm">Secure password hashing with bcrypt</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="w-4 h-4 text-green-600" />
										<span className="text-sm">Session management with expiration</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="w-4 h-4 text-green-600" />
										<span className="text-sm">Input validation & sanitization</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="w-4 h-4 text-green-600" />
										<span className="text-sm">Comprehensive error handling</span>
									</div>
								</div>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
									<Smartphone className="w-5 h-5" />
									User Experience
								</h3>
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<CheckCircle className="w-4 h-4 text-blue-600" />
										<span className="text-sm">Real-time form validation</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="w-4 h-4 text-blue-600" />
										<span className="text-sm">Google OAuth integration</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="w-4 h-4 text-blue-600" />
										<span className="text-sm">Email verification with OTP</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="w-4 h-4 text-blue-600" />
										<span className="text-sm">Password reset functionality</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="w-4 h-4 text-blue-600" />
										<span className="text-sm">Responsive design</span>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Test the System */}
				<Card className="text-center">
					<CardHeader>
						<CardTitle className="text-2xl mb-2">Test the Authentication System</CardTitle>
						<CardDescription>
							Try out the complete authentication flow with signup, login, and email verification
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<Link to="/auth/signup">
								<Button size="lg" className="w-full sm:w-auto min-w-[160px]">
									<Users className="w-4 h-4 mr-2" />
									Create Account
								</Button>
							</Link>
							<span className="text-slate-400">or</span>
							<Link to="/auth/login">
								<Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[160px]">
									<Key className="w-4 h-4 mr-2" />
									Sign In
								</Button>
							</Link>
						</div>
						<Separator className="my-6" />
						<p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
							This demo showcases a production-ready authentication system with features like 
							Google OAuth, email verification, secure password handling, and comprehensive error management. 
							Perfect for enterprise applications requiring robust user authentication.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
