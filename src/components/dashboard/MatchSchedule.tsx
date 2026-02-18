import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock, faLocationArrow, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../context/DataContext";

import type { Match } from "../../context/DataContext";

const MatchSchedule: React.FC = () => {
    const { matches } = useData();
    const liveMatches = matches.filter(m => m.status === "LIVE" || m.status === "InProgress");
    const upcomingMatches = matches.filter(m => m.status === "Scheduled" || m.status === "UPCOMING").slice(0, 5);
    const displayMatches = [...liveMatches, ...upcomingMatches];

    return (
        <div className="rounded-3xl border border-gray-200/50 bg-white p-8 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 h-full transition-all">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Operational Schedule
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">Monitoring active match-days</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-success-500/10 bg-success-500/5 px-3 py-1.5 backdrop-blur-sm">
                    <FontAwesomeIcon icon={faCircleDot} className="h-1.5 w-1.5 animate-pulse text-success-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-success-600 dark:text-success-400">System Ready</span>
                </div>
            </div>

            <div className="space-y-4">
                {displayMatches.map((match) => (
                    <div
                        key={match.id}
                        className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/30 p-5 transition-all duration-300 hover:border-brand-500/20 hover:bg-white hover:shadow-xl dark:border-white/5 dark:bg-white/2 dark:hover:border-brand-500/30"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-brand-600 dark:text-brand-400">
                                {match.competition}
                            </span>
                            {(match.status === "LIVE" || match.status === "InProgress") ? (
                                <div className="inline-flex items-center gap-2 rounded-md bg-error-500/10 px-2 py-1">
                                    <FontAwesomeIcon icon={faCircleDot} className="h-1.5 w-1.5 animate-pulse text-error-500" />
                                    <span className="text-[9px] font-black text-error-500 uppercase tracking-tight">Live • 74'</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                    <FontAwesomeIcon icon={faCalendarDays} className="h-2.5 w-2.5" />
                                    <span>{new Date(match.dateTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-5 flex items-center justify-center gap-6 text-center">
                            <div className="flex-1">
                                <p className="text-base font-black tracking-tight text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400 transition-colors">
                                    {match.homeTeam}
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm font-black shadow-sm dark:border-white/5 dark:bg-gray-800 flex items-center gap-2 transition-transform group-hover:scale-110">
                                    {(match.status === "LIVE" || match.status === "InProgress") ? (
                                        <span className="tabular-nums tracking-tighter text-gray-900 dark:text-white">
                                            {match.score || "0 — 0"}
                                        </span>
                                    ) : (
                                        <span className="text-[10px] text-gray-400">VS</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-base font-black tracking-tight text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400 transition-colors">
                                    {match.awayTeam}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/5">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                <FontAwesomeIcon icon={faClock} className="h-2.5 w-2.5" />
                                <span>{new Date(match.dateTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                                <FontAwesomeIcon icon={faLocationArrow} className="h-2.5 w-2.5 text-brand-500/50" />
                                <span className="group-hover:text-brand-500 transition-colors">{match.stadiumName}</span>
                            </div>
                        </div>

                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-500/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchSchedule;
