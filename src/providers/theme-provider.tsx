import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	actualTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
	theme: "system",
	setTheme: () => null,
	actualTheme: "dark",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "tamatar-ui-theme",
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(defaultTheme);
	const [actualTheme, setActualTheme] = useState<"dark" | "light">("dark");
	const [mounted, setMounted] = useState(false);

	// Hydrate theme from localStorage after mount
	useEffect(() => {
		const storedTheme = localStorage.getItem(storageKey) as Theme;
		if (storedTheme) {
			setTheme(storedTheme);
		}
		setMounted(true);
	}, [storageKey]);

	useEffect(() => {
		if (!mounted) return;

		const root = window.document.documentElement;
		root.classList.remove("light", "dark");

		let resolvedTheme: "dark" | "light";
		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			resolvedTheme = mediaQuery.matches ? "dark" : "light";
		} else {
			resolvedTheme = theme;
		}

		root.classList.add(resolvedTheme);
		setActualTheme(resolvedTheme);

		root.style.transition = "background-color 0.3s ease, color 0.3s ease";

		setTimeout(() => {
			root.style.transition = "";
		}, 300);
	}, [theme, mounted]);

	// Listen for system theme changes
	useEffect(() => {
		if (!mounted || theme !== "system") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = () => {
			const systemTheme = mediaQuery.matches ? "dark" : "light";
			setActualTheme(systemTheme);
			document.documentElement.classList.remove("light", "dark");
			document.documentElement.classList.add(systemTheme);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme, mounted]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			if (mounted) {
				localStorage.setItem(storageKey, theme);
			}
			setTheme(theme);
		},
		actualTheme,
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};

// Theme toggle component
export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<button
			onClick={() => {
				if (theme === "dark") {
					setTheme("light");
				} else if (theme === "light") {
					setTheme("system");
				} else {
					setTheme("dark");
				}
			}}
			className="bg-background/90 backdrop-blur-md border-2 border-border rounded-lg p-2 hover:scale-105 smooth-transition text-foreground hover:bg-accent hover:text-accent-foreground shadow-lg hover:shadow-xl"
			aria-label="Toggle theme"
		>
			{theme === "dark" && (
				<svg
					className="h-5 w-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
						clipRule="evenodd"
					/>
				</svg>
			)}
			{theme === "light" && (
				<svg
					className="h-5 w-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					aria-hidden="true"
				>
					<path d="M17.293 13.293A8 8 0 716.707 2.707a8.001 8.001 0 1010.586 10.586z" />
				</svg>
			)}
			{theme === "system" && (
				<svg
					className="h-5 w-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
						clipRule="evenodd"
					/>
				</svg>
			)}
		</button>
	);
}
