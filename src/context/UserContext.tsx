import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
    name: string;
    email: string;
    role: string;
    image: string;
    phone?: string;
    lastPasswordChange?: string;
    activeSessions?: number;
}

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
    updateUser: (updates: Partial<User>) => void;
    logout: () => void;
}

const DEFAULT_USER: User = {
    name: "John Admin",
    email: "admin@football.com",
    role: "Administrator",
    image: "/images/user/owner.jpg",
    phone: "+1 (555) 123-4567",
    lastPasswordChange: "3 months ago",
    activeSessions: 2,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<User>(() => {
        const savedUser = localStorage.getItem("user_data");
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            // Ensure new fields exist if coming from old storage
            return {
                ...DEFAULT_USER,
                ...parsed
            };
        }
        return DEFAULT_USER;
    });

    const setUser = (newUser: User) => {
        setUserState(newUser);
        localStorage.setItem("user_data", JSON.stringify(newUser));
    };

    const updateUser = (updates: Partial<User>) => {
        setUserState((prevUser) => {
            const newUser = { ...prevUser, ...updates };
            localStorage.setItem("user_data", JSON.stringify(newUser));
            return newUser;
        });
    };

    const logout = () => {
        localStorage.removeItem("user_data");
        window.location.href = "/signin";
    };

    useEffect(() => {
        // Persist changes
        localStorage.setItem("user_data", JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
