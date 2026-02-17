import { useState, useEffect } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Create from "./Create";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router";
import PageHeader from "../../components/common/PageHeader";
import { faBuilding, faUsersRectangle, faCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Studium {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  constructionYear: number;
  description: string;
}

// Fake data
const fakeData: Studium[] = [
  {
    id: "1",
    name: "Mohamed V Stadium",
    address: "Rue Ahmed Lazrak",
    city: "Casablanca",
    country: "Morocco",
    capacity: 45000,
    constructionYear: 1955,
    description: "Iconic stadium in the heart of Casablanca.",
  },
  {
    id: "2",
    name: "Santiago Bernabéu",
    address: "Av. de Concha Espina, 1",
    city: "Madrid",
    country: "Spain",
    capacity: 81044,
    constructionYear: 1947,
    description: "The historic home of Real Madrid.",
  },
];

export default function Show() {
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openModal) {
      openModal();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, openModal]);

  const totalPages = Math.ceil(fakeData.length / pageSize);
  const currentPageData = fakeData.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );

  const columns = [
    { header: "Name", render: (row: Studium) => row.name },
    { header: "City", render: (row: Studium) => row.city },
    { header: "Country", render: (row: Studium) => row.country },
    { header: "Capacity", render: (row: Studium) => row.capacity.toLocaleString() },
    { header: "Year", render: (row: Studium) => row.constructionYear },
  ];

  return (
    <>
      <PageMeta title="Stadiums | Football Admin" description="Manage football venues and stadiums" />

      <PageHeader
        title="Stadiums"
        description="Maintain detailed information about football venues, including capacity, location, and history."
        icon={faBuilding}
        gradient="from-emerald-500 via-teal-600 to-cyan-700"
      />

      <div className="space-y-8">
        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <FontAwesomeIcon icon={faBuilding} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Stadiums</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{fakeData.length}</h4>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-500">
                <FontAwesomeIcon icon={faUsersRectangle} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Capacity</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">63,022</h4>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                <FontAwesomeIcon icon={faCity} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Host Cities</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">54</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Table Container with glassmorphism */}
        <div className="rounded-2xl border border-gray-200/50 bg-white shadow-theme-lg dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm overflow-hidden">
          <ComponentCard
            title="All Stadiums"
            addButton={{
              label: "Add Stadium +",
              onClick: openModal,
              className: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-none shadow-lg transform transition hover:-translate-y-0.5",
            }}
            className="border-none bg-transparent"
          >
            <PaginatedTable
              columns={columns}
              data={currentPageData}
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
