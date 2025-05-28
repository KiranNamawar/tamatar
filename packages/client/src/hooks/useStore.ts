import { create } from "zustand";

interface AuthState {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	clearAccessToken: () => void;
}

// Add ThemeState interface
export type Theme = "dark" | "light" | "system";

interface ThemeState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

interface StoreState {
	auth: AuthState;
	theme: ThemeState;
}

export const useStore = create<StoreState>()((set) => ({
	auth: {
		accessToken: null,
		setAccessToken: (token) =>
			set((state) => ({ auth: { ...state.auth, accessToken: token } })),
		clearAccessToken: () =>
			set((state) => ({ auth: { ...state.auth, accessToken: null } })),
	},
	theme: {
		theme: "system",
		setTheme: (theme) => set((state) => ({ theme: { ...state.theme, theme } })),
	},
}));
