import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router";
import Create from "./Create";
import PageHeader from "../../components/common/PageHeader";
import { faCalendarDays, faClock, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ZonePricing {
  zoneName: string;
  price: number;
  availableSeats: number;
}

interface Match {
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
  zonePricings: ZonePricing[];
}

export default function ShowMatches() {
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openModal) {
      openModal();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, openModal]);

  const [page, setPage] = useState(0);
  const totalPages = 1;

  const columns = [
    {
      header: "Match",
      render: (row: Match) => (
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-900 dark:text-white">{row.homeTeam}</span>
          <span className="text-gray-400 font-medium">vs</span>
          <span className="font-bold text-gray-900 dark:text-white">{row.awayTeam}</span>
        </div>
      ),
    },
    { header: "Competition", render: (row: Match) => row.competition },
    { header: "Stadium", render: (row: Match) => row.stadiumName },
    {
      header: "Date & Time",
      render: (row: Match) => new Date(row.dateTime).toLocaleString(),
    },
    {
      header: "Status",
      render: (row: Match) => (
        <span className="inline-flex items-center rounded-full bg-success-100 px-2.5 py-0.5 text-xs font-medium text-success-800 dark:bg-success-500/20 dark:text-success-400">
          {row.status}
        </span>
      ),
    },
  ];

  const fakeData: Match[] = [
    {
      id: "1",
      dateTime: "2026-06-12T20:00:00Z",
      status: "SCHEDULED",
      matchNumber: "M001",
      attendance: 0,
      referee: "TBD",
      stadiumName: "Wembley Stadium",
      homeTeam: "England",
      awayTeam: "France",
      competition: "International Friendly",
      zonePricings: [],
    },
  ];

  return (
    <>
      <PageMeta title="Matches | Football Admin" description="Manage football match schedules" />

      <PageHeader
        title="Matches"
        description="Schedule new fixtures, manage existing match details, and monitor live match statuses."
        icon={faCalendarDays}
        gradient="from-violet-500 via-purple-600 to-indigo-700"
      />

      <div className="space-y-8">
        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                <FontAwesomeIcon icon={faCalendarDays} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Matches</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">42</h4>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                <FontAwesomeIcon icon={faCirclePlay} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Live Now</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">2</h4>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <FontAwesomeIcon icon={faClock} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming (24h)</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">8</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Table Container with glassmorphism */}
        <div className="rounded-2xl border border-gray-200/50 bg-white shadow-theme-lg dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm overflow-hidden">
          <ComponentCard
            title="All Matches"
            addButton={{
              label: "Add Match +",
              onClick: openModal,
              className: "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 border-none shadow-lg transform transition hover:-translate-y-0.5",
            }}
            className="border-none bg-transparent"
          >
            <PaginatedTable
              columns={columns}
              data={fakeData}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </ComponentCard>
        </div>
      </div>

      <Create isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
