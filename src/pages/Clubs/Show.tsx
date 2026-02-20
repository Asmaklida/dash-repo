import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router";
import Create from "./Create";
import { useData } from "../../context/DataContext";
import { faUsers, faShieldHalved, faEarthAfrica, faCircleDot, faPlus, faBuilding, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteConfirmModal from "../../components/ui/DeleteConfirmModal";

import type { Club } from "../../context/DataContext";

export default function Show() {
  const { isOpen, openModal, closeModal } = useModal();
  const { clubs, setClubs, addActivity } = useData();
  const location = useLocation();
  const [deleteTarget, setDeleteTarget] = useState<Club | null>(null);
  const [editingItem, setEditingItem] = useState<Club | null>(null);


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

  const handleEdit = (item: Club) => {
    setEditingItem(item);
    openModal();
  };

  const handleDelete = (id: string) => {
    const club = clubs.find(c => c.id === id);
    if (club) setDeleteTarget(club);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setClubs(prev => prev.filter(c => c.id !== deleteTarget.id));
    addActivity("warning", `Club '${deleteTarget.name}' disbanded from registry`);
    setDeleteTarget(null);
  };

  const handleSave = (item: any) => {
    if (editingItem) {
      setClubs(prev => prev.map(c => c.id === editingItem.id ? { ...item, id: c.id } : c));
    } else {
      setClubs(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
    }
    closeModal();
  };

  const columns = [
    {
      header: "TEAM",
      render: (row: Club) => (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50/50 dark:border-white/5 dark:bg-white/5 overflow-hidden">
            {row.image ? (
              <img src={row.image} alt={row.name} className="h-full w-full object-cover" />
            ) : (
              <FontAwesomeIcon icon={faShieldHalved} className="text-blue-500 text-sm" />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{row.name}</p>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-tighter">{row.abbreviation} • Professional</p>
          </div>
        </div>
      )
    },
    {
      header: "LOCATION",
      render: (row: Club) => (
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBuilding} className="text-gray-400 text-xs" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{row.country}</p>
        </div>
      )
    },
    {
      header: "SCOPE",
      render: (row: Club) => (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold border backdrop-blur-md ${row.scope === "INTERNATIONAL"
          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
          : "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
          }`}>
          {row.scope}
        </span>
      )
    },
    {
      header: "CONTINENT",
      render: (row: Club) => (
        <span className="inline-flex items-center rounded-full bg-white/[0.03] px-3 py-1 text-[10px] font-bold text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/10 shadow-sm transition-all hover:border-blue-500/30 hover:text-blue-500">
          {row.continent}
        </span>
      )
    },
    {
      header: "ACTIONS",
      render: (row: Club) => (
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
      <PageMeta title="Clubs | Football Admin" description="Manage your football clubs" />

      {/* Premium Command Header */}
      <div className="mb-10 group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-theme-xl dark:border-white/5 dark:bg-[#0f172a] lg:p-10">

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 dark:border-white/10 dark:bg-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Club Management</span>
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white lg:text-4xl">
              Shield <span className="text-emerald-500">Registry.</span>
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xl antialiased">
              Manage professional football clubs, track their primary locations, and continental affiliations.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 dark:border-blue-500/10 dark:bg-blue-500/5 lg:flex">
              <FontAwesomeIcon icon={faCircleDot} className="h-1.5 w-1.5 animate-pulse text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Elite Squads</span>
            </div>
            <button
              onClick={handleAddNew}
              className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all hover:bg-blue-600 hover:scale-105 active:scale-95"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add New Club
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
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Total Clubs</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">{clubs.length}</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faShieldHalved} className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-cyan-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Professional</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">128</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-indigo-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Continents</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">6</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faEarthAfrica} className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Improved Table Container with glassmorphism */}
        <div className="rounded-3xl border border-gray-200/50 bg-white shadow-theme-lg dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm overflow-hidden">
          <div className="border-b border-gray-100 p-8 dark:border-white/5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Shield Database</h3>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Comprehensive Club Directory</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <PaginatedTable
              columns={columns}
              data={clubs}
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
        itemType="club"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
