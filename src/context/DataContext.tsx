import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ─── Entity Types ─────────────────────────────────────────────────────────────

export interface Stadium {
    id: string;
    name: string;
    image?: string;
    address: string;
    city: string;
    country: string;
    capacity: number;
    constructionYear: number;
    description: string;
    status: "Active" | "Maintenance" | "Renovation";
    seatingCategories: string[];
}

export interface Competition {
    id: string;
    name: string;
    image?: string;
    abbreviation: string;
    teamType: string;
    scope: string;
    country: string;
    continent: string;
}

export interface Club {
    id: string;
    name: string;
    image?: string;
    abbreviation: string;
    teamType: string;
    scope: string;
    country: string;
    continent: string;
}

export interface NationalTeam {
    id: string;
    name: string;
    image?: string;
    abbreviation: string;
    teamType: string;
    scope: string;
    country: string;
    continent: string;
    createdAt: string;
    active: boolean;
}

export interface ZonePricing {
    zoneName: string;
    price: number;
    currency: string;
}

export interface Match {
    id: string;
    dateTime: string;
    status: string;
    matchNumber: string;
    attendance: number;
    referee: string;
    stadiumName: string;
    homeTeam: string;
    awayTeam: string;
    competition: string;
    score?: string;
    zonePricings: ZonePricing[];
}

export interface City {
    id: string;
    name: string;
    country: string;
    continentName: string;
}

export interface Country {
    id: string;
    name: string;
    continentName: string;
}

// ─── Activity / Toast ─────────────────────────────────────────────────────────

export interface ActivityItem {
    id: string;
    type: "success" | "add" | "warning" | "info";
    message: string;
    timestamp: Date;
}

export interface ToastItem {
    id: string;
    type: ActivityItem["type"];
    message: string;
}

// ─── Initial seed data ────────────────────────────────────────────────────────

const INITIAL_STADIUMS: Stadium[] = [
    { id: "1", name: "Camp Nou", address: "C. d'Arístides Maillol, 12", city: "Barcelona", country: "Spain", capacity: 99354, constructionYear: 1957, description: "The historic home of FC Barcelona.", status: "Active", seatingCategories: ["VIP", "Cat 1", "Cat 2", "Tribune Sud"] },
    { id: "2", name: "Santiago Bernabéu", address: "Av. de Concha Espina, 1", city: "Madrid", country: "Spain", capacity: 81044, constructionYear: 1947, description: "The historic home of Real Madrid.", status: "Renovation", seatingCategories: ["VIP", "Premium", "Standard"] },
    { id: "3", name: "Old Trafford", address: "Sir Matt Busby Way", city: "Manchester", country: "United Kingdom", capacity: 74879, constructionYear: 1910, description: "The iconic Theatre of Dreams.", status: "Active", seatingCategories: ["VIP", "Cat 1", "Cat 2"] },
    { id: "4", name: "Allianz Arena", address: "Werner-Heisenberg-Allee 25", city: "Munich", country: "Germany", capacity: 75000, constructionYear: 2005, description: "A modern marvel of stadium design.", status: "Active", seatingCategories: ["VIP", "Premium", "Economy", "Tribune Nord"] },
    { id: "5", name: "Parc des Princes", address: "24 Rue du Commandant Guilbaud", city: "Paris", country: "France", capacity: 47929, constructionYear: 1972, description: "Historic stadium in Paris.", status: "Active", seatingCategories: ["VIP", "Cat 1"] },
];

const INITIAL_COMPETITIONS: Competition[] = [
    { id: "1", name: "UEFA Champions League", abbreviation: "UCL", teamType: "CLUB", scope: "INTERNATIONAL", country: "Europe", continent: "Europe" },
    { id: "2", name: "Premier League", abbreviation: "EPL", teamType: "CLUB", scope: "NATIONAL", country: "England", continent: "Europe" },
    { id: "3", name: "La Liga", abbreviation: "LL", teamType: "CLUB", scope: "NATIONAL", country: "Spain", continent: "Europe" },
    { id: "4", name: "FIFA World Cup", abbreviation: "WC", teamType: "NATIONAL", scope: "INTERNATIONAL", country: "Global", continent: "Global" },
];

const INITIAL_CLUBS: Club[] = [
    { id: "1", name: "FC Barcelona", abbreviation: "FCB", teamType: "CLUB", scope: "NATIONAL", country: "Spain", continent: "Europe" },
    { id: "2", name: "Real Madrid", abbreviation: "RMA", teamType: "CLUB", scope: "NATIONAL", country: "Spain", continent: "Europe" },
    { id: "3", name: "Manchester United", abbreviation: "MNU", teamType: "CLUB", scope: "NATIONAL", country: "England", continent: "Europe" },
    { id: "4", name: "Bayern Munich", abbreviation: "FCB", teamType: "CLUB", scope: "NATIONAL", country: "Germany", continent: "Europe" },
    { id: "5", name: "Raja Club Athletic", abbreviation: "RCA", teamType: "CLUB", scope: "NATIONAL", country: "Morocco", continent: "Africa" },
];

const INITIAL_NATIONAL_TEAMS: NationalTeam[] = [
    { id: "1", name: "Morocco National Team", abbreviation: "MAR", teamType: "NATIONAL", scope: "NATIONAL", country: "Morocco", continent: "Africa", createdAt: "2026-01-12", active: true },
    { id: "2", name: "Spain National Team", abbreviation: "ESP", teamType: "NATIONAL", scope: "NATIONAL", country: "Spain", continent: "Europe", createdAt: "2026-01-15", active: true },
    { id: "3", name: "Argentina National Team", abbreviation: "ARG", teamType: "NATIONAL", scope: "NATIONAL", country: "Argentina", continent: "South America", createdAt: "2026-01-18", active: true },
    { id: "4", name: "France National Team", abbreviation: "FRA", teamType: "NATIONAL", scope: "NATIONAL", country: "France", continent: "Europe", createdAt: "2026-01-20", active: true },
];

const INITIAL_MATCHES: Match[] = [
    { id: "1", dateTime: "2026-06-12T20:00:00Z", status: "SCHEDULED", matchNumber: "M001", attendance: 0, referee: "TBD", stadiumName: "Wembley Stadium", homeTeam: "England", awayTeam: "France", competition: "International Friendly", zonePricings: [] },
    { id: "2", dateTime: "2026-06-15T18:30:00Z", status: "SCHEDULED", matchNumber: "M002", attendance: 0, referee: "TBD", stadiumName: "Camp Nou", homeTeam: "Barcelona", awayTeam: "Real Madrid", competition: "La Liga", zonePricings: [] },
];

const INITIAL_CITIES: City[] = [
    { id: "1", name: "Casablanca", country: "Morocco", continentName: "AFRICA" },
    { id: "2", name: "Berlin", country: "Germany", continentName: "EUROPE" },
    { id: "3", name: "Tokyo", country: "Japan", continentName: "ASIA" },
];

const INITIAL_COUNTRIES: Country[] = [
    { id: "1", name: "Morocco", continentName: "AFRICA" },
    { id: "2", name: "Germany", continentName: "EUROPE" },
    { id: "3", name: "Brazil", continentName: "SOUTH AMERICA" },
    { id: "4", name: "Japan", continentName: "ASIA" },
    { id: "5", name: "Canada", continentName: "NORTH AMERICA" },
    { id: "6", name: "Australia", continentName: "OCEANIA" },
    { id: "7", name: "Egypt", continentName: "AFRICA" },
];

const INITIAL_ACTIVITIES: ActivityItem[] = [
    { id: "1", type: "add", message: "New competition 'Premier League' added", timestamp: new Date(Date.now() - 120000) },
    { id: "2", type: "success", message: "Match results for 'City vs United' updated", timestamp: new Date(Date.now() - 900000) },
    { id: "3", type: "info", message: "New team 'Lions FC' joined 'Cup Winners'", timestamp: new Date(Date.now() - 3600000) },
];

// ─── Context Type ─────────────────────────────────────────────────────────────

interface DataContextType {
    // Entity lists
    stadiums: Stadium[];
    setStadiums: React.Dispatch<React.SetStateAction<Stadium[]>>;
    competitions: Competition[];
    setCompetitions: React.Dispatch<React.SetStateAction<Competition[]>>;
    clubs: Club[];
    setClubs: React.Dispatch<React.SetStateAction<Club[]>>;
    nationalTeams: NationalTeam[];
    setNationalTeams: React.Dispatch<React.SetStateAction<NationalTeam[]>>;
    matches: Match[];
    setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
    cities: City[];
    setCities: React.Dispatch<React.SetStateAction<City[]>>;
    countries: Country[];
    setCountries: React.Dispatch<React.SetStateAction<Country[]>>;

    // Derived real-time stats (computed from list lengths)
    stats: {
        competitions: number;
        teams: number;  // clubs + nationalTeams
        matches: number;
        stadiums: number;
        cities: number;
        countries: number;
    };

    // Activity / Toast
    activities: ActivityItem[];
    toasts: ToastItem[];
    addActivity: (type: ActivityItem["type"], message: string) => void;
    showToast: (type: ActivityItem["type"], message: string) => void;
    removeToast: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// ─── Helper: load from localStorage with fallback ─────────────────────────────
function loadFromStorage<T>(key: string, fallback: T): T {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch {
        return fallback;
    }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stadiums, setStadiums] = useState<Stadium[]>(() => loadFromStorage("data_stadiums", INITIAL_STADIUMS));
    const [competitions, setCompetitions] = useState<Competition[]>(() => loadFromStorage("data_competitions", INITIAL_COMPETITIONS));
    const [clubs, setClubs] = useState<Club[]>(() => loadFromStorage("data_clubs", INITIAL_CLUBS));
    const [nationalTeams, setNationalTeams] = useState<NationalTeam[]>(() => loadFromStorage("data_national_teams", INITIAL_NATIONAL_TEAMS));
    const [matches, setMatches] = useState<Match[]>(() => loadFromStorage("data_matches", INITIAL_MATCHES));
    const [cities, setCities] = useState<City[]>(() => loadFromStorage("data_cities", INITIAL_CITIES));
    const [countries, setCountries] = useState<Country[]>(() => loadFromStorage("data_countries", INITIAL_COUNTRIES));

    const [activities, setActivities] = useState<ActivityItem[]>(() => {
        const saved = localStorage.getItem("app_activities");
        if (saved) {
            const parsed = JSON.parse(saved);
            return parsed.map((a: any) => ({ ...a, timestamp: new Date(a.timestamp) }));
        }
        return INITIAL_ACTIVITIES;
    });

    const [toasts, setToasts] = useState<ToastItem[]>([]);

    // Persist entity lists
    useEffect(() => { localStorage.setItem("data_stadiums", JSON.stringify(stadiums)); }, [stadiums]);
    useEffect(() => { localStorage.setItem("data_competitions", JSON.stringify(competitions)); }, [competitions]);
    useEffect(() => { localStorage.setItem("data_clubs", JSON.stringify(clubs)); }, [clubs]);
    useEffect(() => { localStorage.setItem("data_national_teams", JSON.stringify(nationalTeams)); }, [nationalTeams]);
    useEffect(() => { localStorage.setItem("data_matches", JSON.stringify(matches)); }, [matches]);
    useEffect(() => { localStorage.setItem("data_cities", JSON.stringify(cities)); }, [cities]);
    useEffect(() => { localStorage.setItem("data_countries", JSON.stringify(countries)); }, [countries]);
    useEffect(() => { localStorage.setItem("app_activities", JSON.stringify(activities)); }, [activities]);

    // Derived stats — always real, always live
    const stats = {
        competitions: competitions.length,
        teams: clubs.length + nationalTeams.length,
        matches: matches.length,
        stadiums: stadiums.length,
        cities: cities.length,
        countries: countries.length,
    };

    const addActivity = (type: ActivityItem["type"], message: string) => {
        const newItem: ActivityItem = {
            id: Date.now().toString(),
            type,
            message,
            timestamp: new Date(),
        };
        setActivities((prev) => [newItem, ...prev.slice(0, 19)]);
        showToast(type, message);
    };

    const showToast = (type: ActivityItem["type"], message: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, type, message }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <DataContext.Provider value={{
            stadiums, setStadiums,
            competitions, setCompetitions,
            clubs, setClubs,
            nationalTeams, setNationalTeams,
            matches, setMatches,
            cities, setCities,
            countries, setCountries,
            stats,
            activities,
            toasts,
            addActivity,
            showToast,
            removeToast,
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
