import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import ConvexProvider from "../integrations/convex/provider.tsx";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import type { TRPCRouter } from "@/integrations/trpc/router";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";

interface MyRouterContext {
	queryClient: QueryClient;
	trpc: TRPCOptionsProxy<TRPCRouter>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover",
			},
			{
				title: "Tamatar - Developer Progress Tracking Platform",
			},
			{
				name: "description",
				content:
					"Track your coding journey, showcase your projects, and connect with fellow developers. Build your developer portfolio with Tamatar's intuitive progress tracking tools.",
			},
			{
				name: "keywords",
				content:
					"developer portfolio, coding progress, project tracking, developer tools, programming journey, code showcase, developer community, progress tracker",
			},
			{
				name: "author",
				content: "Tamatar Team",
			},
			{
				name: "robots",
				content: "index, follow",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: "Tamatar",
			},
			{
				property: "og:title",
				content: "Tamatar - Developer Progress Tracking Platform",
			},
			{
				property: "og:description",
				content:
					"Track your coding journey, showcase your projects, and connect with fellow developers. Build your developer portfolio with ease.",
			},
			{
				property: "og:image",
				content: "https://tamatar.dev/og-image.png",
			},
			{
				property: "og:image:width",
				content: "1200",
			},
			{
				property: "og:image:height",
				content: "630",
			},
			{
				property: "og:url",
				content: "https://tamatar.dev",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:site",
				content: "@tamatar_dev",
			},
			{
				name: "twitter:creator",
				content: "@tamatar_dev",
			},
			{
				name: "twitter:title",
				content: "Tamatar - Developer Progress Tracking Platform",
			},
			{
				name: "twitter:description",
				content:
					"Track your coding journey, showcase your projects, and connect with fellow developers.",
			},
			{
				name: "twitter:image",
				content: "https://tamatar.dev/twitter-image.png",
			},
			{
				name: "theme-color",
				content: "#6366f1",
			},
			{
				name: "msapplication-TileColor",
				content: "#6366f1",
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "default",
			},
			{
				name: "apple-mobile-web-app-title",
				content: "Tamatar",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg",
			},
			{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/logo192.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/logo192.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
			{
				rel: "canonical",
				href: "https://tamatar.dev",
			},
			{
				rel: "sitemap",
				type: "application/xml",
				href: "/sitemap.xml",
			},
		],
	}),
	component: () => (
		<RootDocument>
			<ConvexProvider>
				<ThemeProvider defaultTheme="system">
					<Outlet />
				</ThemeProvider>
				<TanStackRouterDevtools />
				<TanStackQueryLayout />
			</ConvexProvider>
		</RootDocument>
	),
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
				<Toaster />
			</body>
		</html>
	);
}
