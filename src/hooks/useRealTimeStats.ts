import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";

export interface StatValue {
    value: number;
    change: string;
}

export interface RealTimeStats {
    competitions: StatValue;
    teams: StatValue;
    matches: StatValue;
    stadiums: StatValue;
    cities: StatValue;
    countries: StatValue;
}

export const useRealTimeStats = () => {
    const { stats: appStats } = useData();
    const [stats, setStats] = useState<RealTimeStats>({
        competitions: { value: appStats.competitions, change: "+0%" },
        teams: { value: appStats.teams, change: "+0%" },
        matches: { value: appStats.matches, change: "+0%" },
        stadiums: { value: appStats.stadiums, change: "+0%" },
        cities: { value: appStats.cities, change: "+0%" },
        countries: { value: appStats.countries, change: "+0%" },
    });

    useEffect(() => {
        setStats((prev) => ({
            ...prev,
            competitions: {
                value: appStats.competitions,
                change: `+${((appStats.competitions - 20) / 20 * 100).toFixed(1)}%`
            },
            teams: {
                value: appStats.teams,
                change: `+${((appStats.teams - 150) / 150 * 100).toFixed(1)}%`
            },
            matches: {
                value: appStats.matches,
                change: `+${((appStats.matches - 340) / 340 * 100).toFixed(1)}%`
            },
            stadiums: {
                value: appStats.stadiums,
                change: `+${((appStats.stadiums - 85) / 85 * 100).toFixed(1)}%`
            }
        }));
    }, [appStats]);

    return stats;
};
