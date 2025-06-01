import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
/**
 * Theme Toggle Component
 *
 * This component provides a toggle button to switch between light and dark themes.
 * It follows the Tamatar style guidelines and uses the standard Button component.
 */
import { useEffect, useState } from "react";

interface ThemeToggleProps {
	className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
	const [theme, setTheme] = useState<"light" | "dark">("dark");

	useEffect(() => {
		// Check if user has a theme preference stored
		const storedTheme = localStorage.getItem("tamatar-theme");
		if (storedTheme === "light" || storedTheme === "dark") {
			setTheme(storedTheme);
			document.documentElement.classList.toggle("dark", storedTheme === "dark");
		} else {
			// Default to dark theme as per our "dark first" approach
			setTheme("dark");
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
		localStorage.setItem("tamatar-theme", newTheme);
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			className={cn("rounded-full", className)}
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
		>
			{theme === "dark" ? (
				<Sun className="h-[1.2rem] w-[1.2rem]" />
			) : (
				<Moon className="h-[1.2rem] w-[1.2rem]" />
			)}
		</Button>
	);
}
