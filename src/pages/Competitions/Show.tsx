import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router";
import Create from "./Create";
import { useData } from "../../context/DataContext";
import { faTrophy, faCheckCircle, faClock, faCircleDot, faEarthEurope, faPenToSquare, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteConfirmModal from "../../components/ui/DeleteConfirmModal";

interface Competition {
  id: string;
  name: string;
  image?: string;
  abbreviation: string;
  teamType: string;
  scope: string;
  country: string;
  continent: string;
}

export default function Show() {
  const { isOpen, openModal, closeModal } = useModal();
  const { addActivity } = useData();
  const location = useLocation();
  const [deleteTarget, setDeleteTarget] = useState<Competition | null>(null);
  const [editingItem, setEditingItem] = useState<Competition | null>(null);

  const [competitions, setCompetitions] = useState<Competition[]>([
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
    {
      id: "3",
      name: "La Liga",
      abbreviation: "LAL",
      teamType: "CLUB",
      scope: "DOMESTIC",
      country: "Spain",
      continent: "Europe",
    },
    {
      id: "4",
      name: "Botola Pro",
      abbreviation: "BOT",
      teamType: "CLUB",
      scope: "DOMESTIC",
      country: "Morocco",
      continent: "Africa",
    }
  ]);

  useEffect(() => {
    if (location.state?.openModal) {
      handleAddNew();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, openModal]);

  const handleAddNew = () => {
    setEditingItem(null);
    openModal();
  };

  const handleEdit = (item: Competition) => {
    setEditingItem(item);
    openModal();
  };

  const handleDelete = (id: string) => {
    const competition = competitions.find(c => c.id === id);
    if (competition) setDeleteTarget(competition);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setCompetitions(prev => prev.filter(c => c.id !== deleteTarget.id));
    addActivity("warning", `Competition '${deleteTarget.name}' removed from database`);
    setDeleteTarget(null);
  };

  const handleSave = (item: any) => {
    if (editingItem) {
      setCompetitions(prev => prev.map(c => c.id === editingItem.id ? { ...item, id: c.id } : c));
    } else {
      setCompetitions(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
    }
    closeModal();
  };

  const columns = [
    {
      header: "COMPETITION",
      render: (row: Competition) => (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 dark:border-white/5 dark:bg-white/5 overflow-hidden">
            {row.image ? (
              <img src={row.image} alt={row.name} className="h-full w-full object-cover" />
            ) : (
              <FontAwesomeIcon icon={faTrophy} className="text-amber-500 text-sm" />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{row.name}</p>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-tighter">{row.abbreviation} • {row.teamType}</p>
          </div>
        </div>
      )
    },
    {
      header: "SCOPE",
      render: (row: Competition) => (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold border backdrop-blur-md ${row.scope === "INTERNATIONAL"
          ? "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400"
          : "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
          }`}>
          {row.scope}
        </span>
      )
    },
    {
      header: "REGION",
      render: (row: Competition) => (
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faEarthEurope} className="text-gray-400 text-xs" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{row.country}</p>
        </div>
      )
    },
    {
      header: "CONTINENT",
      render: (row: Competition) => (
        <span className="inline-flex items-center rounded-full bg-white/[0.03] px-3 py-1 text-[10px] font-bold text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/10 shadow-sm transition-all hover:border-brand-500/30 hover:text-brand-500">
          {row.continent}
        </span>
      )
    },
    {
      header: "ACTIONS",
      render: (row: Competition) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 text-gray-500 transition-all hover:bg-emerald-500 hover:text-white hover:border-emerald-500 dark:border-white/5 dark:bg-white/5"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="text-[10px]" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 text-gray-500 transition-all hover:bg-rose-500 hover:text-white hover:border-rose-500 dark:border-white/5 dark:bg-white/5"
          >
            <FontAwesomeIcon icon={faTrashCan} className="text-[10px]" />
          </button>
        </div>
      )
    }
  ];

  const [page, setPage] = useState(0);
  const totalPages = 1;

  return (
    <>
      <PageMeta title="Competitions | Football Admin" description="Manage your football competitions" />

      {/* Premium Command Header */}
      <div className="mb-10 group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-theme-xl dark:border-white/5 dark:bg-[#0f172a] lg:p-10">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/20 blur-[80px]"></div>
          <div className="absolute top-1/2 left-1/4 h-48 w-48 rounded-full bg-orange-500/10 blur-[60px]"></div>
        </div>

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 dark:border-white/10 dark:bg-white/5 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">Tournament Control</span>
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white lg:text-4xl">
              League <span className="text-amber-500">Center.</span>
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xl antialiased">
              Oversee and manage your global football tournaments and domestic leagues. Track participation and scope.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 dark:border-orange-500/10 dark:bg-orange-500/5 backdrop-blur-sm lg:flex">
              <FontAwesomeIcon icon={faCircleDot} className="h-1.5 w-1.5 animate-pulse text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">Global Coverage</span>
            </div>
            <button
              onClick={handleAddNew}
              className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:bg-amber-600 hover:scale-105 active:scale-95"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Register Competition
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Command Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-amber-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Total Leagues</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">42</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faTrophy} className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-success-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Active Tours</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">12</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-500/10 text-success-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-orange-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Upcoming Games</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">4</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faClock} className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Improved Table Container with glassmorphism */}
        <div className="rounded-3xl border border-gray-200/50 bg-white shadow-theme-lg dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm overflow-hidden">
          <div className="border-b border-gray-100 p-8 dark:border-white/5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Tournament Registry</h3>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Active Competition Data</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <PaginatedTable
              columns={columns}
              data={competitions}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      <Create isOpen={isOpen} closeModal={closeModal} editingItem={editingItem} onSave={handleSave} />
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name ?? ""}
        itemType="competition"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
