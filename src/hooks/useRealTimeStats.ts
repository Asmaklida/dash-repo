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
                change: "+1.2%"
            },
            teams: {
                value: appStats.teams,
                change: "+2.4%"
            },
            matches: {
                value: appStats.matches,
                change: "+0.8%"
            },
            stadiums: {
                value: appStats.stadiums,
                change: "+1.5%"
            },
            cities: {
                value: appStats.cities,
                change: "+0.5%"
            },
            countries: {
                value: appStats.countries,
                change: "+0.2%"
            }
        }));
    }, [appStats]);

    return stats;
};
