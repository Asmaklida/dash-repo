import { useState, useMemo } from "react";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { useModal } from "../../hooks/useModal";
import Create from "./Create";

interface CountryData {
  name: string;
  country: {
    id: string;
    name: string;
    continentName: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    active: boolean;
  };
}

const DATA: CountryData[] = [
  {
    name: "Casablanca",
    country: {
      id: "1",
      name: "Morocco",
      continentName: "AFRICA",
      createdAt: "2026-02-15T00:43:21.351Z",
      updatedAt: "2026-02-15T00:43:21.351Z",
      createdBy: "admin",
      updatedBy: "admin",
      active: true,
    },
  },
  {
    name: "Berlin",
    country: {
      id: "2",
      name: "Germany",
      continentName: "EUROPE",
      createdAt: "2026-02-15T01:00:00.000Z",
      updatedAt: "2026-02-15T01:00:00.000Z",
      createdBy: "admin",
      updatedBy: "admin",
      active: true,
    },
  },
  {
    name: "Tokyo",
    country: {
      id: "3",
      name: "Japan",
      continentName: "ASIA",
      createdAt: "2026-02-15T01:30:00.000Z",
      updatedAt: "2026-02-15T01:30:00.000Z",
      createdBy: "admin",
      updatedBy: "admin",
      active: false,
    },
  },
  // Add more countries here
];

const ITEMS_PER_PAGE = 5;

export const Show = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(DATA.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return DATA.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);

  const continentColor = (continent: string) => {
    switch (continent) {
      case "AFRICA":
        return "success";
      case "EUROPE":
        return "primary";
      case "ASIA":
        return "warning";
      case "NORTH AMERICA":
        return "info";
      case "SOUTH AMERICA":
        return "dark";
      case "OCEANIA":
        return "error";
      default:
        return "light";
    }
  };
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <PageMeta title="Country | chritickets" description="All Country" />
      <PageBreadcrumb pageTitle="Country" />

      <div className="space-y-6">
        <ComponentCard
          title="All Studuims"
          addButton={{
            label: "Add Transaction +",
            onClick: openModal,
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {paginatedData.map((item) => (
              <div
                key={item.country.id}
                className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-3"></div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 text-center">
                  {item.country.name}
                </h3>

                <Badge
                  variant="solid"
                  size="sm"
                  color={continentColor(item.country.continentName)}
                >
                  {item.country.continentName}
                </Badge>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Previous
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const isActive = page === p;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium border transition
                ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-transparent dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
                }`}
                >
                  {p}
                </button>
              );
            })}

            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </Button>
          </div>
        </ComponentCard>
      </div>
      <Create isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};
