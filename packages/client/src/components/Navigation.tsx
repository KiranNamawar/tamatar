import { FloatingDock } from "@/components/ui/floating-dock";
import type { FloatingDockItem } from "@/components/ui/floating-dock";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useLocation } from "@tanstack/react-router";
import { Home, User } from "lucide-react";

// Map route paths to their nav items
const dockNavConfig: { [key: string]: FloatingDockItem[] } = {
	"/": [
		{
			title: "Home",
			icon: <Home className="w-6 h-6 text-orange-500 dark:text-orange-300" />,
			to: "/",
		},
		
		{
			title: "Dashboard",
			icon: <User className="w-6 h-6 text-blue-500 dark:text-blue-300" />,
			to: "/dashboard",
		},
	],
	"/resources": [
		{
			title: "Home",
			icon: <Home className="w-6 h-6 text-orange-500 dark:text-orange-300" />,
			to: "/",
		},
	],
	// ...add more routes as needed
};

export function Navigation() {
	const location = useLocation();
	const pathname = location.pathname as keyof typeof dockNavConfig;
	const items: FloatingDockItem[] = [
		...(dockNavConfig[pathname] || dockNavConfig["/"]),
		{
			title: "Theme",
			render: () => <ModeToggle className="" />,
		},
	];
	return (
		<FloatingDock
			items={items}
			desktopClassName="bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 shadow-xl"
			mobileClassName=""
		/>
	);
}
