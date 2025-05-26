import { create } from 'zustand';


interface AuthState {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	clearAccessToken: () => void;
}

interface StoreState {
    auth: AuthState;
}

export const useStore = create<StoreState>()((set) => ({
    auth: {
        accessToken: null,
        setAccessToken: (token) => set((state) => ({ auth: { ...state.auth, accessToken: token } })),
        clearAccessToken: () => set((state) => ({ auth: { ...state.auth, accessToken: null } })),
    }
}));