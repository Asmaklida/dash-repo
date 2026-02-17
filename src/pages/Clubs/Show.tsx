import { useState, useEffect } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router";
import Create from "./Create";
import PageHeader from "../../components/common/PageHeader";
import { faUsers, faShieldHalved, faEarthAfrica } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Team {
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

  // Fake data for teams
  const fakeTeams: Team[] = [
    {
      id: "1",
      name: "Raja Club Athletic",
      abbreviation: "RCA",
      teamType: "CLUB",
      scope: "INTERNATIONAL",
      country: "Morocco",
      continent: "Africa",
    },
    {
      id: "2",
      name: "Real Madrid CF",
      abbreviation: "RMA",
      teamType: "CLUB",
      scope: "INTERNATIONAL",
      country: "Spain",
      continent: "Europe",
    },
  ];

  const columns = [
    { header: "Name", render: (row: Team) => row.name },
    { header: "Abbreviation", render: (row: Team) => row.abbreviation },
    { header: "Team Type", render: (row: Team) => row.teamType },
    { header: "Scope", render: (row: Team) => row.scope },
    { header: "Country", render: (row: Team) => row.country },
    { header: "Continent", render: (row: Team) => row.continent },
  ];

  const [page, setPage] = useState(0);
  const totalPages = 1;

  return (
    <>
      <PageMeta title="Clubs | Football Admin" description="Manage your football clubs" />

      <PageHeader
        title="Clubs"
        description="Manage professional football clubs, track their primary locations, and continental affiliations."
        icon={faShieldHalved}
        gradient="from-blue-500 via-cyan-500 to-indigo-600"
      />

      <div className="space-y-8">
        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <FontAwesomeIcon icon={faShieldHalved} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Clubs</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{fakeTeams.length}</h4>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Professional</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">128</h4>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <FontAwesomeIcon icon={faEarthAfrica} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Continents</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">6</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Table Container with glassmorphism */}
        <div className="rounded-2xl border border-gray-200/50 bg-white shadow-theme-lg dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm overflow-hidden">
          <ComponentCard
            title="All Teams"
            addButton={{
              label: "Add Team +",
              onClick: openModal,
              className: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-none shadow-lg transform transition hover:-translate-y-0.5",
            }}
            className="border-none bg-transparent"
          >
            <PaginatedTable
              columns={columns}
              data={fakeTeams}
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
