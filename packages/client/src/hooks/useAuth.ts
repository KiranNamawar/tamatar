import { create } from 'zustand';

interface AuthState {
    accessToken: string;
    setAccessToken: (token: string) => void;
    clearAccessToken: () => void;
}

const useAuth = create<AuthState>()((set) => ({
    accessToken: '',
    setAccessToken: (token) => set({ accessToken: token }),
    clearAccessToken: () => set({ accessToken: '' }),
}));

export default useAuth;
