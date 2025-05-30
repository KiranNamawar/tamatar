import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Monitor, Moon, Sun } from "lucide-react";

export function ModeToggle({ className }: { className?: string }) {
	const { theme, setTheme } = useTheme();
	// Show the icon for the theme that will be activated next
	const getNextTheme = () => {
		if (theme === "light") return "dark";
		if (theme === "dark") return "system";
		return "light";
	};

	// Remove all background, border, and shadow for icon-only mode
	const iconOnly =
		"!bg-none !shadow-none !border-none !rounded-none !p-0 !m-0 !outline-none !ring-0 !backdrop-blur-none";

	return (
		<Button
			size="icon"
			className={clsx(iconOnly, className)}
			style={{ background: "none", boxShadow: "none", border: "none" }}
			onClick={() => setTheme(getNextTheme())}
		>
			{/* Add color to the icon based on the next theme */}
			{(() => {
				const next = getNextTheme();
				if (next === "light") {
					return (
						<Sun className="h-[1.2rem] w-[1.2rem] transition-all text-orange-500 dark:text-orange-300" />
					);
				}
				if (next === "dark") {
					return (
						<Moon className="h-[1.2rem] w-[1.2rem] transition-all text-blue-500 dark:text-blue-300" />
					);
				}
				return (
					<Monitor className="h-[1.2rem] w-[1.2rem] transition-all text-purple-500 dark:text-purple-300" />
				);
			})()}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
