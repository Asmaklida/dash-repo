import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router";
import Create from "./Create";
import { useData } from "../../context/DataContext";
import { faCalendarDays, faClock, faCirclePlay, faCircleDot, faLocationDot, faPenToSquare, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteConfirmModal from "../../components/ui/DeleteConfirmModal";

import type { Match } from "../../context/DataContext";

export default function ShowMatches() {
  const { matches, setMatches, addActivity } = useData();
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();
  const [deleteTarget, setDeleteTarget] = useState<Match | null>(null);
  const [editingItem, setEditingItem] = useState<Match | null>(null);

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

  const handleEdit = (item: Match) => {
    setEditingItem(item);
    openModal();
  };

  const handleDelete = (id: string) => {
    const match = matches.find(m => m.id === id);
    if (match) setDeleteTarget(match);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setMatches(prev => prev.filter(m => m.id !== deleteTarget.id));
    addActivity("warning", `Fixture ${deleteTarget.homeTeam} vs ${deleteTarget.awayTeam} cancelled`);
    setDeleteTarget(null);
  };

  const handleSave = (item: any) => {
    if (editingItem) {
      setMatches(prev => prev.map(m => m.id === editingItem.id ? { ...item, id: m.id } : m));
    } else {
      setMatches(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
    }
    closeModal();
  };

  const columns = [
    {
      header: "FIXTURE / TEAMS",
      render: (row: Match) => (
        <div className="flex items-center justify-between w-[240px] px-4 py-2 bg-gray-50/50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 rounded-lg bg-white shadow-sm dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-white/10 mb-1">
              <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-tighter">{row.homeTeam[0]}</span>
            </div>
            <span className="text-[10px] font-black tracking-tight text-gray-900 dark:text-white uppercase">{row.homeTeam}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em]">VS</span>
            <div className="h-0.5 w-6 bg-gray-200 dark:bg-white/10 rounded-full"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 rounded-lg bg-white shadow-sm dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-white/10 mb-1">
              <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-tighter">{row.awayTeam[0]}</span>
            </div>
            <span className="text-[10px] font-black tracking-tight text-gray-900 dark:text-white uppercase">{row.awayTeam}</span>
          </div>
        </div>
      ),
    },
    {
      header: "COMPETITION",
      render: (row: Match) => (
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">{row.competition}</p>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-tighter">Round of 16 • Official</p>
        </div>
      )
    },
    {
      header: "VENUE",
      render: (row: Match) => (
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLocationDot} className="text-gray-400 text-xs" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{row.stadiumName}</p>
        </div>
      )
    },
    {
      header: "STARTING TIME",
      render: (row: Match) => (
        <div className="inline-flex items-center gap-2 bg-gray-50/50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-white/5">
          <FontAwesomeIcon icon={faClock} className="text-[10px] text-gray-400" />
          <p className="font-mono text-[10px] font-bold text-gray-700 dark:text-gray-200 uppercase tracking-tight">
            {new Date(row.dateTime).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} • {new Date(row.dateTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      ),
    },
    {
      header: "STATUS",
      render: (row: Match) => (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold border backdrop-blur-md ${row.status === "LIVE"
          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
          : "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
          }`}>
          {row.status}
        </span>
      ),
    },
    {
      header: "ACTIONS",
      render: (row: Match) => (
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
      <PageMeta title="Matches | Football Admin" description="Manage football match schedules" />

      {/* Premium Command Header */}
      <div className="mb-10 group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-theme-xl dark:border-white/5 dark:bg-[#0f172a] lg:p-10">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 dark:border-white/10 dark:bg-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Match Operations</span>
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white lg:text-4xl">
              Fixture <span className="text-emerald-500">Board.</span>
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xl antialiased">
              Schedule new fixtures, manage existing match details, and monitor live match statuses across global arenas.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 dark:border-blue-500/10 dark:bg-blue-500/5 lg:flex">
              <FontAwesomeIcon icon={faCircleDot} className="h-1.5 w-1.5 animate-pulse text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Tactical View</span>
            </div>
            <button
              onClick={handleAddNew}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-4px_rgba(37,99,235,0.35)] transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Assign Match
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
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Total Matches</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">42</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faCalendarDays} className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-emerald-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Live Now</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">2</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faCirclePlay} className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-indigo-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Upcoming (24h)</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">8</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 shadow-inner group-hover:scale-110 transition-transform">
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
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Match Registry</h3>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Operational Fixture Schedule</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <PaginatedTable
              columns={columns}
              data={matches}
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
        itemName={`${deleteTarget?.homeTeam ?? ""} vs ${deleteTarget?.awayTeam ?? ""}`}
        itemType="match fixture"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
