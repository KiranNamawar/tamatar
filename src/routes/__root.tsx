import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AnimatePresence } from "motion/react";

import Header from "../components/Header";
import { AuroraBackground } from "../components/aurora";
import { MotionPage } from "../components/motion";
import { ThemeProvider } from "../providers/theme-provider";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Tamatar",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	component: () => (
		<RootDocument>
			<ThemeProvider defaultTheme="dark" storageKey="tamatar-ui-theme">
				<AuroraBackground variant="subtle">
					<Header />
					<AnimatePresence mode="wait">
						<MotionPage key="main">
							<Outlet />
							<Toaster position="top-right" expand={false} richColors />
						</MotionPage>
					</AnimatePresence>
				</AuroraBackground>
				<TanStackRouterDevtools />
				<ReactQueryDevtools buttonPosition="bottom-right" />
			</ThemeProvider>
		</RootDocument>
	),
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
