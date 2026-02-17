import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRealTimeStats } from "../../hooks/useRealTimeStats";
import { Link } from "react-router";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import MatchSchedule from "../../components/dashboard/MatchSchedule";
import {
  faTrophy,
  faUsers,
  faCalendarDays,
  faBuilding,
  faCity,
  faEarthAmericas,
  faPlus,
  faFutbol,
  faCalendarPlus,
  faLocationDot,
  faSignal,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const rtStats = useRealTimeStats();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: "Total Competitions",
      value: rtStats.competitions.value,
      change: rtStats.competitions.change,
      icon: faTrophy,
      path: "/competitions",
      borderClass: "bg-brand-500",
      gradient: "from-brand-500/20 to-brand-600/20",
      accent: "text-brand-500",
      shadow: "shadow-brand-500/10",
    },
    {
      title: "Total Teams",
      value: rtStats.teams.value,
      change: rtStats.teams.change,
      icon: faUsers,
      path: "/clubs",
      borderClass: "bg-success-500",
      gradient: "from-success-500/20 to-success-600/20",
      accent: "text-success-500",
      shadow: "shadow-success-500/10",
    },
    {
      title: "Total Matches",
      value: rtStats.matches.value,
      change: rtStats.matches.change,
      icon: faCalendarDays,
      path: "/matchs",
      borderClass: "bg-warning-500",
      gradient: "from-warning-500/20 to-warning-600/20",
      accent: "text-warning-500",
      shadow: "shadow-warning-500/10",
    },
    {
      title: "Total Stadiums",
      value: rtStats.stadiums.value,
      change: rtStats.stadiums.change,
      icon: faBuilding,
      path: "/studiums",
      borderClass: "bg-blue-light-500",
      gradient: "from-blue-light-500/20 to-blue-light-600/20",
      accent: "text-blue-light-500",
      shadow: "shadow-blue-light-500/10",
    },
    {
      title: "Total Cities",
      value: rtStats.cities.value,
      change: rtStats.cities.change,
      icon: faCity,
      path: "/city",
      borderClass: "bg-cyan-500",
      gradient: "from-cyan-500/20 to-cyan-600/20",
      accent: "text-cyan-500",
      shadow: "shadow-cyan-500/10",
    },
    {
      title: "Total Countries",
      value: rtStats.countries.value,
      change: rtStats.countries.change,
      icon: faEarthAmericas,
      path: "/country",
      borderClass: "bg-violet-500",
      gradient: "from-violet-500/20 to-violet-600/20",
      accent: "text-violet-500",
      shadow: "shadow-violet-500/10",
    },
  ];

  const quickActions = [
    {
      label: "Add Competition",
      icon: faPlus,
      path: "/competitions",
      color: "brand",
      accent: "text-brand-600",
      glow: "group-hover:shadow-brand-500/10",
      border: "hover:border-brand-500/30",
    },
    {
      label: "Add Team",
      icon: faFutbol,
      path: "/clubs",
      color: "success",
      accent: "text-success-600",
      glow: "group-hover:shadow-success-500/10",
      border: "hover:border-success-500/30",
    },
    {
      label: "Schedule Match",
      icon: faCalendarPlus,
      path: "/matchs",
      color: "warning",
      accent: "text-warning-600",
      glow: "group-hover:shadow-warning-500/10",
      border: "hover:border-warning-500/30",
    },
    {
      label: "Add Stadium",
      icon: faLocationDot,
      path: "/studiums",
      color: "blue-light",
      accent: "text-blue-light-600",
      glow: "group-hover:shadow-blue-light-500/10",
      border: "hover:border-blue-light-500/30",
    },
  ];

  return (
    <>
      <PageMeta
        title="Dashboard | Football Admin"
        description="Football Admin Dashboard - Manage competitions, teams, matches, and more"
      />
      <PageBreadcrumb pageTitle="Dashboard" />

      <div className="space-y-8">
        {/* Enhanced Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
              Football Admin Center
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Your central hub for managing the football ecosystem.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark">
              <FontAwesomeIcon icon={faClock} className="text-brand-500" />
              <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500"></span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                System Online
              </span>
              <FontAwesomeIcon icon={faSignal} className="ml-1 text-success-500" />
            </div>
          </div>
        </div>

        {/* Premium Welcome Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-theme-xl dark:border-white/5 dark:bg-[#0f172a] lg:p-12">
          {/* Refined Geometric Background */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-500/20 blur-[100px] transition-all group-hover:bg-brand-500/30"></div>
            <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-[100px]"></div>
            <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-[80px]"></div>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 dark:border-white/10 dark:bg-white/5 backdrop-blur-md">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">System v2.4 - Season 2026</span>
              </div>
              <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white lg:text-5xl">
                Command <span className="text-brand-500">Center.</span>
              </h2>
              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 lg:max-w-md antialiased font-medium">
                The centralized operational interface for football administration. Monitor live flows and system metrics in real-time.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/matchs"
                  className="rounded-xl bg-brand-500 px-8 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:bg-brand-600 hover:scale-105 active:scale-95"
                >
                  Live Monitor
                </Link>
                <Link
                  to="/competitions"
                  className="rounded-xl border border-gray-200 bg-gray-50 px-8 py-4 text-sm font-bold text-slate-900 transition-all hover:bg-gray-100 hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/20"
                >
                  System Analytics
                </Link>
              </div>
            </div>
            <div className="hidden justify-end lg:flex">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faFutbol}
                  className="h-64 w-64 text-white/5 animate-pulse"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-brand-500/10 blur-3xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.path || "#"}
              className={`group relative block overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${stat.shadow} dark:border-gray-800 dark:bg-gray-dark/80`}
            >
              <div className={`absolute top-0 left-0 h-1 w-full ${stat.borderClass}`}></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <h3 className="mt-3 text-4xl font-black text-gray-900 dark:text-white">
                    {stat.value}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-success-50 px-2 py-1 text-[10px] font-black text-success-600 dark:bg-success-500/10 dark:text-success-400">
                    <span>↑</span>
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} ${stat.accent} shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  <FontAwesomeIcon icon={stat.icon} className="text-2xl" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Operational Section - Higher Prominence */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <MatchSchedule />
          </div>
          <div className="xl:col-span-2">
            <ActivityFeed />
          </div>
        </div>

        {/* Quick Access Area */}
        <div className="rounded-3xl border border-gray-200/50 bg-white p-10 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Quick Command
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Execute essential tasks with one click.
              </p>
            </div>
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-brand-500 to-indigo-600"></div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                state={{ openModal: true }}
                className={`group relative overflow-hidden rounded-2xl border border-gray-100/50 bg-white p-6 shadow-theme-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${action.border} ${action.glow} dark:border-white/5 dark:bg-gray-dark/40 dark:backdrop-blur-md`}
              >
                <div className="relative z-10">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${action.color}-500/5 backdrop-blur-sm transition-all group-hover:bg-${action.color}-500/10 group-hover:scale-110 dark:bg-white/5`}>
                    <FontAwesomeIcon icon={action.icon} className={`text-xl ${action.accent}`} />
                  </div>
                  <h4 className="mt-4 text-lg font-bold tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    {action.label}
                  </h4>
                  <p className="mt-1 text-xs font-medium text-slate-400 transition-colors group-hover:text-slate-500 dark:group-hover:text-slate-300">
                    Launch System Entry
                  </p>
                </div>


                {/* Subtle Decorative Elements */}
                <div className={`absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-${action.color}-500/[0.03] blur-2xl transition-all group-hover:bg-${action.color}-500/10`}></div>
                <div className="absolute inset-0 translate-y-full bg-gradient-to-b from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-y-0"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
