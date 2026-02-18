import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ActivityItem {
    id: string;
    type: "success" | "add" | "warning" | "info";
    message: string;
    timestamp: Date;
}

export interface AppStats {
    competitions: number;
    teams: number;
    matches: number;
    stadiums: number;
    cities: number;
    countries: number;
}

export interface ToastItem {
    id: string;
    type: ActivityItem["type"];
    message: string;
}

interface DataContextType {
    stats: AppStats;
    activities: ActivityItem[];
    toasts: ToastItem[];
    addActivity: (type: ActivityItem["type"], message: string) => void;
    showToast: (type: ActivityItem["type"], message: string) => void;
    removeToast: (id: string) => void;
    incrementStat: (key: keyof AppStats) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_STATS: AppStats = {
    competitions: 24,
    teams: 156,
    matches: 342,
    stadiums: 89,
    cities: 67,
    countries: 45,
};

const INITIAL_ACTIVITIES: ActivityItem[] = [
    {
        id: "1",
        type: "add",
        message: "New competition 'Premier League' added",
        timestamp: new Date(Date.now() - 120000),
    },
    {
        id: "2",
        type: "success",
        message: "Match results for 'City vs United' updated",
        timestamp: new Date(Date.now() - 900000),
    },
    {
        id: "3",
        type: "info",
        message: "New team 'Lions FC' joined 'Cup Winners'",
        timestamp: new Date(Date.now() - 3600000),
    },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Persistent state using localStorage for semi-permanence in this demo
    const [stats, setStats] = useState<AppStats>(() => {
        const saved = localStorage.getItem("app_stats");
        return saved ? JSON.parse(saved) : INITIAL_STATS;
    });

    const [activities, setActivities] = useState<ActivityItem[]>(() => {
        const saved = localStorage.getItem("app_activities");
        if (saved) {
            const parsed = JSON.parse(saved);
            return parsed.map((a: any) => ({ ...a, timestamp: new Date(a.timestamp) }));
        }
        return INITIAL_ACTIVITIES;
    });

    const [toasts, setToasts] = useState<ToastItem[]>([]);

    useEffect(() => {
        localStorage.setItem("app_stats", JSON.stringify(stats));
    }, [stats]);

    useEffect(() => {
        localStorage.setItem("app_activities", JSON.stringify(activities));
    }, [activities]);

    const addActivity = (type: ActivityItem["type"], message: string) => {
        const newItem: ActivityItem = {
            id: Date.now().toString(),
            type,
            message,
            timestamp: new Date(),
        };
        setActivities((prev) => [newItem, ...prev.slice(0, 19)]); // Keep last 20
        showToast(type, message);
    };

    const showToast = (type: ActivityItem["type"], message: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, type, message }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const incrementStat = (key: keyof AppStats) => {
        setStats((prev) => ({
            ...prev,
            [key]: prev[key] + 1,
        }));
    };

    return (
        <DataContext.Provider value={{
            stats,
            activities,
            toasts,
            addActivity,
            showToast,
            removeToast,
            incrementStat
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
