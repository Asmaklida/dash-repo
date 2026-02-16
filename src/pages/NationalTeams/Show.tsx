import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import Create from "./Create";

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
      <PageMeta title="National Teams | chritickets" description="All national teams" />
      <PageBreadcrumb pageTitle="National Teams" />

      <div className="space-y-6">
        <ComponentCard
          title="All National Teams"
          addButton={{ label: "Add Team +", onClick: openModal }}
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

      <Create isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
