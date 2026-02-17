import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRealTimeStats } from "../../hooks/useRealTimeStats";
import { Link } from "react-router";
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
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const rtStats = useRealTimeStats();

  const stats = [
    {
      title: "Total Competitions",
      value: rtStats.competitions.value,
      change: rtStats.competitions.change,
      icon: faTrophy,
      path: "/competitions",
      gradient: "from-amber-400 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      darkBgGradient: "dark:from-amber-500/10 dark:to-orange-500/10",
    },
    {
      title: "Total Teams",
      value: rtStats.teams.value,
      change: rtStats.teams.change,
      icon: faUsers,
      path: "/clubs",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "dark:from-blue-500/10 dark:to-cyan-500/10",
    },
    {
      title: "Total Matches",
      value: rtStats.matches.value,
      change: rtStats.matches.change,
      icon: faCalendarDays,
      path: "/matchs",
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
      darkBgGradient: "dark:from-violet-500/10 dark:to-purple-500/10",
    },
    {
      title: "Total Stadiums",
      value: rtStats.stadiums.value,
      change: rtStats.stadiums.change,
      icon: faBuilding,
      path: "/studiums",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      darkBgGradient: "dark:from-emerald-500/10 dark:to-teal-500/10",
    },
    {
      title: "Total Cities",
      value: rtStats.cities.value,
      change: rtStats.cities.change,
      icon: faCity,
      path: "/city",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      darkBgGradient: "dark:from-pink-500/10 dark:to-rose-500/10",
    },
    {
      title: "Total Countries",
      value: rtStats.countries.value,
      change: rtStats.countries.change,
      icon: faEarthAmericas,
      path: "/country",
      gradient: "from-indigo-500 to-blue-600",
      bgGradient: "from-indigo-50 to-blue-50",
      darkBgGradient: "dark:from-indigo-500/10 dark:to-blue-500/10",
    },
  ];

  const quickActions = [
    {
      label: "Add Competition",
      icon: faPlus,
      path: "/competitions",
      gradient: "from-brand-500 to-brand-600",
      hoverGradient: "hover:from-brand-600 hover:to-brand-700",
    },
    {
      label: "Add Team",
      icon: faFutbol,
      path: "/clubs",
      gradient: "from-success-500 to-success-600",
      hoverGradient: "hover:from-success-600 hover:to-success-700",
    },
    {
      label: "Schedule Match",
      icon: faCalendarPlus,
      path: "/matchs",
      gradient: "from-orange-500 to-orange-600",
      hoverGradient: "hover:from-orange-600 hover:to-orange-700",
    },
    {
      label: "Add Stadium",
      icon: faLocationDot,
      path: "/studiums",
      gradient: "from-blue-light-500 to-blue-light-600",
      hoverGradient: "hover:from-blue-light-600 hover:to-blue-light-700",
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
        {/* Premium Welcome Section with Gradient */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-purple-600 p-8 shadow-theme-lg transition-all duration-300 hover:shadow-theme-xl">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <h2 className="text-title-lg font-bold text-white drop-shadow-lg">
                Welcome to Football Admin Dashboard
              </h2>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">Live</span>
              </div>
            </div>
            <p className="mt-3 text-xl text-white/90">
              Manage your football competitions, teams, matches, and venues all in one place.
            </p>
          </div>

          {/* Decorative Football Icon */}
          <div className="absolute -bottom-8 -right-8 opacity-10">
            <FontAwesomeIcon icon={faFutbol} className="h-48 w-48 text-white" />
          </div>
        </div>

        {/* Premium Statistics Grid with Glassmorphism */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.path || "#"}
              className="group relative block overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-theme-xl dark:border-gray-700/50 dark:bg-gray-dark/80"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} ${stat.darkBgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <h3 key={stat.value} className="mt-3 animate-fade-in text-4xl font-extrabold text-gray-900 dark:text-white">
                      {stat.value}
                    </h3>
                    <div className="mt-2 inline-flex items-center rounded-full bg-success-100 px-3 py-1 text-xs font-semibold text-success-700 dark:bg-success-500/20 dark:text-success-400">
                      <span>↗</span>
                      <span className="ml-1">{stat.change}</span>
                    </div>
                  </div>

                  {/* Premium Icon with Gradient */}
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    <FontAwesomeIcon
                      icon={stat.icon}
                      className="h-8 w-8 text-white drop-shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Animated Border Gradient */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20`}></div>
            </Link>
          ))}
        </div>

        {/* Premium Quick Actions with Gradient Buttons */}
        <div className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-8 shadow-theme-md backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-dark/80">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-title-sm font-bold text-gray-900 dark:text-white">
              Quick Actions
            </h3>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-purple-600"></div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                state={{ openModal: true }}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${action.gradient} ${action.hoverGradient} px-6 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <FontAwesomeIcon
                    icon={action.icon}
                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="font-semibold">{action.label}</span>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
