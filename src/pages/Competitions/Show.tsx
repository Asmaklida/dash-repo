import { useState, useEffect } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router";
import Create from "./Create";
import PageHeader from "../../components/common/PageHeader";
import { faTrophy, faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Competition {
  id: string;
  name: string;
  abbreviation: string;
  teamType: string;
  scope: string;
  country: string;
  continent: string;
}

export default function Show() {
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openModal) {
      openModal();
      // Clear state after opening to prevent re-opening on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state, openModal]);

  // Fake data
  const fakeData: Competition[] = [
    {
      id: "1",
      name: "Champions League",
      abbreviation: "UCL",
      teamType: "CLUB",
      scope: "INTERNATIONAL",
      country: "Europe",
      continent: "Europe",
    },
    {
      id: "2",
      name: "Premier League",
      abbreviation: "EPL",
      teamType: "CLUB",
      scope: "DOMESTIC",
      country: "England",
      continent: "Europe",
    },
  ];

  const columns = [
    { header: "Name", render: (row: Competition) => row.name },
    { header: "Abbreviation", render: (row: Competition) => row.abbreviation },
    { header: "Team Type", render: (row: Competition) => row.teamType },
    { header: "Scope", render: (row: Competition) => row.scope },
    { header: "Country", render: (row: Competition) => row.country },
    { header: "Continent", render: (row: Competition) => row.continent },
  ];

  const [page, setPage] = useState(0);
  const totalPages = 1;

  return (
    <>
      <PageMeta title="Competitions | Football Admin" description="Manage your football competitions" />

      <PageHeader
        title="Competitions"
        description="Oversee and manage your global football tournaments and domestic leagues."
        icon={faTrophy}
        gradient="from-amber-400 via-orange-500 to-red-600"
      />

      <div className="space-y-8">
        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                <FontAwesomeIcon icon={faTrophy} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Competitions</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{fakeData.length}</h4>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-500/10 text-success-500">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Leagues</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">12</h4>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <FontAwesomeIcon icon={faClock} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">4</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Table Container with glassmorphism */}
        <div className="rounded-2xl border border-gray-200/50 bg-white shadow-theme-lg dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm overflow-hidden">
          <ComponentCard
            title="All Competitions"
            addButton={{
              label: "Add Competition +",
              onClick: openModal,
              className: "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 border-none shadow-lg transform transition hover:-translate-y-0.5",
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

      {/* Modal */}
      <Create isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
