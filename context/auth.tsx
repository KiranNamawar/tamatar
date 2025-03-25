'use client';

import { createContext, useContext } from "react";

interface AuthContextProps {
    isAuthenticated: boolean;
    userId?: string;
    profileId?: string;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
});

interface AuthProviderProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    userId?: string;
    profileId?: string;
}

export const AuthProvider: React.FC<Readonly<AuthProviderProps>> = ({
    children,
    isAuthenticated,
    userId,
    profileId,
}) => {
    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, profileId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);