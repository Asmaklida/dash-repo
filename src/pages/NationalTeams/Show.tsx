import { useState, useEffect } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router";
import Create from "./Create";
import PageHeader from "../../components/common/PageHeader";
import { faFlag, faEarthAmericas, faAward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  teamType: string;
  scope: string;
  country: string;
  continent: string;
  createdAt: string;
  active: boolean;
}

export default function Show() {
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openModal) {
      openModal();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, openModal]);

  const fakeTeams: Team[] = [
    {
      id: "1",
      name: "Morocco National Team",
      abbreviation: "MAR",
      teamType: "NATIONAL",
      scope: "NATIONAL",
      country: "Morocco",
      continent: "Africa",
      createdAt: "2026-01-12",
      active: true,
    },
    {
      id: "2",
      name: "Spain National Team",
      abbreviation: "ESP",
      teamType: "NATIONAL",
      scope: "NATIONAL",
      country: "Spain",
      continent: "Europe",
      createdAt: "2026-01-15",
      active: true,
    },
  ];

  const columns = [
    { header: "Name", render: (row: Team) => row.name },
    { header: "Abbreviation", render: (row: Team) => row.abbreviation },
    { header: "Country", render: (row: Team) => row.country },
    { header: "Continent", render: (row: Team) => row.continent },
    {
      header: "Created At",
      render: (row: Team) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Status",
      render: (row: Team) =>
        row.active ? (
          <span className="text-green-600 font-medium">Active</span>
        ) : (
          <span className="text-red-600 font-medium">Inactive</span>
        ),
    },
  ];

  const [page, setPage] = useState(0);
  const totalPages = 1;

  return (
    <>
      <PageMeta title="National Teams | Football Admin" description="Manage national football teams" />

      <PageHeader
        title="National Teams"
        description="Oversee international football squads, manage their stats, and track global tournament participation."
        icon={faFlag}
        gradient="from-red-500 via-rose-600 to-crimson-700"
      />

      <div className="space-y-8">
        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <FontAwesomeIcon icon={faFlag} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Nations</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">211</h4>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                <FontAwesomeIcon icon={faAward} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ranked Teams</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">210</h4>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-crimson-500/10 text-crimson-500">
                <FontAwesomeIcon icon={faEarthAmericas} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Confederations</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">6</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Table Container with glassmorphism */}
        <div className="rounded-2xl border border-gray-200/50 bg-white shadow-theme-lg dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm overflow-hidden">
          <ComponentCard
            title="All National Teams"
            addButton={{
              label: "Add Team +",
              onClick: openModal,
              className: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 border-none shadow-lg transform transition hover:-translate-y-0.5",
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
