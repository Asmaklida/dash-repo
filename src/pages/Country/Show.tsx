import { useMemo, useState } from "react";
import Badge from "../../components/ui/badge/Badge";
import Button from "../../components/ui/button/Button";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { useModal } from "../../hooks/useModal";
import Create from "./Create";

interface Country {
  id: number;
  name: string;
  continentName: string;
}

const DATA: Country[] = [
  { id: 1, name: "Morocco", continentName: "AFRICA" },
  { id: 2, name: "Germany", continentName: "EUROPE" },
  { id: 3, name: "Brazil", continentName: "SOUTH AMERICA" },
  { id: 4, name: "Japan", continentName: "ASIA" },
  { id: 5, name: "Canada", continentName: "NORTH AMERICA" },
  { id: 6, name: "Australia", continentName: "OCEANIA" },
  { id: 7, name: "Egypt", continentName: "AFRICA" },
];

const ITEMS_PER_PAGE = 4;

function Show() {
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
          <div className="p-6">
            <div className="grid grid-cols-5 gap-6">
              {paginatedData.map((country) => (
                <div
                  key={country.id}
                  className="rounded-xl p-6 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1
        bg-gradient-to-br from-white dark:from-gray-800 to-gray-50 dark:to-gray-900 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {country.name}
                  </h3>
                  <Badge
                    variant="solid"
                    size="sm"
                    color={continentColor(country.continentName)}
                  >
                    {country.continentName}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-8">
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
          </div>
        </ComponentCard>
      </div>

      <Create isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

export default Show;
