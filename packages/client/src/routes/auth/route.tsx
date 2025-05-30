import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import {
	AtSign,
	BookOpen,
	Code,
	GitBranch,
	KeyRound,
	Lock,
	Rocket,
	Shield,
	User,
} from "lucide-react";

export const Route = createFileRoute("/auth")({
	component: RouteComponent,
});

/**
 * Floating background icons for auth pages
 */
function FloatingAuthIcons() {
	return (
		<div className="absolute inset-0 z-0 overflow-hidden">
			<Code
				className="absolute top-20 left-10 w-12 h-12 text-red-400/20 dark:text-red-300/10 animate-float"
				style={{ animationDelay: "0s" }}
			/>
			<GitBranch
				className="absolute top-32 right-20 w-8 h-8 text-orange-400/20 dark:text-orange-300/10 animate-float"
				style={{ animationDelay: "2s" }}
			/>
			<Rocket
				className="absolute bottom-40 left-16 w-10 h-10 text-blue-400/20 dark:text-blue-300/10 animate-float"
				style={{ animationDelay: "4s" }}
			/>
			<BookOpen
				className="absolute bottom-20 right-12 w-14 h-14 text-purple-400/20 dark:text-purple-300/10 animate-float"
				style={{ animationDelay: "1s" }}
			/>
			<User
				className="absolute top-1/2 left-8 w-6 h-6 text-green-400/20 dark:text-green-300/10 animate-float"
				style={{ animationDelay: "3s" }}
			/>
			<AtSign
				className="absolute top-1/3 right-8 w-9 h-9 text-pink-400/20 dark:text-pink-300/10 animate-float"
				style={{ animationDelay: "5s" }}
			/>
			<Lock
				className="absolute top-40 right-32 w-7 h-7 text-cyan-400/20 dark:text-cyan-300/10 animate-float"
				style={{ animationDelay: "1.5s" }}
			/>
			<Shield
				className="absolute bottom-32 left-32 w-9 h-9 text-indigo-400/20 dark:text-indigo-300/10 animate-float"
				style={{ animationDelay: "3.5s" }}
			/>
			<KeyRound
				className="absolute top-60 left-20 w-8 h-8 text-rose-400/20 dark:text-rose-300/10 animate-float"
				style={{ animationDelay: "2.5s" }}
			/>
		</div>
	);
}

/**
 * Shared auth card wrapper for all auth forms
 */
export function AuthCard({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative z-10 w-full max-w-sm px-4 sm:px-6 md:px-8 py-10 rounded-3xl shadow-2xl flex flex-col gap-8 backdrop-blur-lg bg-white/80 dark:bg-gray-900/90 border border-white/60 dark:border-gray-800/80 animate-fade-in">
			{children}
		</div>
	);
}

/**
 * Shared auth layout with background and floating icons
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200/80 via-white/90 to-purple-200/80 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-700 overflow-hidden">
			<FloatingAuthIcons />
			<AuthCard>{children}</AuthCard>
		</div>
	);
}

function RouteComponent() {
	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<AuthLayout>
				<Outlet />
			</AuthLayout>
		</GoogleOAuthProvider>
	);
}
