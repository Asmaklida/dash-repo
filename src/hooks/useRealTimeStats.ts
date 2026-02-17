import { useState, useEffect } from "react";

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
    const [stats, setStats] = useState<RealTimeStats>({
        competitions: { value: 24, change: "+12%" },
        teams: { value: 156, change: "+8%" },
        matches: { value: 342, change: "+23%" },
        stadiums: { value: 89, change: "+5%" },
        cities: { value: 67, change: "+15%" },
        countries: { value: 45, change: "+3%" },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats((prev) => {
                // Randomly simulate a change in matches or teams
                const updateMatches = Math.random() > 0.7;
                const updateTeams = Math.random() > 0.9;

                return {
                    ...prev,
                    matches: updateMatches
                        ? { value: prev.matches.value + 1, change: "+24%" }
                        : prev.matches,
                    teams: updateTeams
                        ? { value: prev.teams.value + 1, change: "+9%" }
                        : prev.teams,
                };
            });
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return stats;
};
