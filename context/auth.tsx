'use client';

import { createContext, useContext } from "react";

interface AuthContextProps {
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
});

interface AuthProviderProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
}

export const AuthProvider: React.FC<Readonly<AuthProviderProps>> = ({
    children,
    isAuthenticated,
}) => {
    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);