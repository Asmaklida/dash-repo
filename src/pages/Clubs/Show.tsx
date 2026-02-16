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
}

export default function Show() {
  const { isOpen, openModal, closeModal } = useModal();

  // Fake data for teams
  const fakeTeams: Team[] = [
    {
      id: "1",
      name: "Morocco National Team",
      abbreviation: "MAR",
      teamType: "NATIONAL",
      scope: "NATIONAL",
      country: "Morocco",
      continent: "Africa",
    },
    {
      id: "2",
      name: "Spain National Team",
      abbreviation: "ESP",
      teamType: "NATIONAL",
      scope: "NATIONAL",
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
      <PageMeta title="Teams | chritickets" description="All teams" />
      <PageBreadcrumb pageTitle="Teams" />

      <div className="space-y-6">
        <ComponentCard
          title="All Teams"
          addButton={{
            label: "Add Team +",
            onClick: openModal,
          }}
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
