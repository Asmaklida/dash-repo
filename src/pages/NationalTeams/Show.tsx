import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router";
import Create from "./Create";
import { useData } from "../../context/DataContext";
import { faFlag, faEarthAmericas, faAward, faCircleDot, faHistory, faGlobe, faPenToSquare, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteConfirmModal from "../../components/ui/DeleteConfirmModal";

import type { NationalTeam } from "../../context/DataContext";

export default function Show() {
  const { nationalTeams: teams, setNationalTeams: setTeams, addActivity } = useData();
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();
  const [deleteTarget, setDeleteTarget] = useState<NationalTeam | null>(null);
  const [editingItem, setEditingItem] = useState<NationalTeam | null>(null);

  useEffect(() => {
    if (location.state?.openModal) {
      handleAddNew();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, openModal]);

  const [page, setPage] = useState(0);
  const totalPages = 1;

  const handleAddNew = () => {
    setEditingItem(null);
    openModal();
  };

  const handleEdit = (item: NationalTeam) => {
    setEditingItem(item);
    openModal();
  };

  const handleDelete = (id: string) => {
    const team = teams.find(t => t.id === id);
    if (team) setDeleteTarget(team);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setTeams(prev => prev.filter(t => t.id !== deleteTarget.id));
    addActivity("warning", `National squad '${deleteTarget.name}' decommissioned`);
    setDeleteTarget(null);
  };

  const handleSave = (item: any) => {
    if (editingItem) {
      setTeams(prev => prev.map(t => t.id === editingItem.id ? { ...item, id: t.id, createdAt: t.createdAt } : t));
    } else {
      setTeams(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString().split('T')[0], active: true }]);
    }
    closeModal();
  };

  const columns = [
    {
      header: "NATION / SQUAD",
      render: (row: NationalTeam) => (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-100 bg-rose-50/50 dark:border-white/5 dark:bg-white/5 overflow-hidden">
            {row.image ? (
              <img src={row.image} alt={row.name} className="h-full w-full object-cover" />
            ) : (
              <FontAwesomeIcon icon={faFlag} className="text-rose-500 text-sm" />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{row.name}</p>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-tighter">{row.abbreviation} • FIFA Member</p>
          </div>
        </div>
      )
    },
    {
      header: "CONFEDERATION",
      render: (row: NationalTeam) => (
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faGlobe} className="text-gray-400 text-xs" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{row.continent}</p>
        </div>
      )
    },
    {
      header: "REGISTRATION",
      render: (row: NationalTeam) => (
        <div className="inline-flex items-center gap-2 bg-gray-50/50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-white/5">
          <FontAwesomeIcon icon={faHistory} className="text-[10px] text-gray-400" />
          <p className="font-mono text-[10px] font-bold text-gray-700 dark:text-gray-200 uppercase tracking-tight">
            {new Date(row.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
          </p>
        </div>
      )
    },
    {
      header: "STATUS",
      render: (row: NationalTeam) => (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold border backdrop-blur-md ${row.active
          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
          : "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400"
          }`}>
          {row.active ? "OPERATIONAL" : "SUSPENDED"}
        </span>
      )
    },
    {
      header: "ACTIONS",
      render: (row: NationalTeam) => (
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
      ),
    },
  ];

  return (
    <>
      <PageMeta title="National Teams | Football Admin" description="Manage national football teams" />

      {/* Premium Command Header */}
      <div className="mb-10 group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-theme-xl dark:border-white/5 dark:bg-[#0f172a] lg:p-10">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 dark:border-white/10 dark:bg-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Squad Intelligence</span>
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white lg:text-4xl">
              Global <span className="text-emerald-500">Squads.</span>
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xl antialiased">
              Oversee international football squads, manage their stats, and track global tournament participation.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 dark:border-blue-500/10 dark:bg-blue-500/5 lg:flex">
              <FontAwesomeIcon icon={faCircleDot} className="h-1.5 w-1.5 animate-pulse text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">FIFA Integrated</span>
            </div>
            <button
              onClick={handleAddNew}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-4px_rgba(37,99,235,0.35)] transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Enlist Nation
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Command Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-blue-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Total Nations</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">{teams.length}</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faFlag} className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-cyan-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Ranked Teams</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">210</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faAward} className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-cyan-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Confederations</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">6</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faEarthAmericas} className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Improved Table Container with glassmorphism */}
        <div className="rounded-3xl border border-gray-200/50 bg-white shadow-theme-lg dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm overflow-hidden">
          <div className="border-b border-gray-100 p-8 dark:border-white/5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Global Squad Registry</h3>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Operational National Database</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <PaginatedTable
              columns={columns}
              data={teams}
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
        itemType="national squad"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
