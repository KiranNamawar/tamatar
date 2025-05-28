import { useStore } from "@/hooks/useStore";
import type { Theme as ZustandTheme } from "@/hooks/useStore";
import { createContext, useContext, useEffect, useRef } from "react";

export type Theme = ZustandTheme;

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};


const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
	undefined,
);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	...props
}: ThemeProviderProps) {
	// Use Zustand for theme state
	const theme = useStore((state) => state.theme.theme);
	const setTheme = useStore((state) => state.theme.setTheme);
	const hydrated = useRef(false);

	// Hydrate Zustand from cookie or defaultTheme only once on mount
	useEffect(() => {
		if (typeof window === "undefined" || hydrated.current) return;
		hydrated.current = true;
		const match = document.cookie.match(/(?:^|; )theme=([^;]*)/);
		const cookieTheme = match ? decodeURIComponent(match[1]) : null;
		if (cookieTheme && cookieTheme !== theme) {
			setTheme(cookieTheme as Theme);
		} else if (!cookieTheme && theme !== defaultTheme) {
			setTheme(defaultTheme);
		}
	}, [defaultTheme, setTheme, theme]);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";

			root.classList.add(systemTheme);
			return;
		}
		root.classList.add(theme);
		// Persist theme in cookie
		document.cookie = `theme=${theme}; path=/; max-age=31536000`;
	}, [theme]);

	const value = {
		theme,
		setTheme,
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};
