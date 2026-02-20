import { useState, useMemo, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router";
import Create from "./Create";
import { useData } from "../../context/DataContext";
import DeleteConfirmModal from "../../components/ui/DeleteConfirmModal";

import { faCity, faMapPin, faBuildingColumns, faCircleDot, faPenToSquare, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { City } from "../../context/DataContext";

const ITEMS_PER_PAGE = 8;

export const Show = () => {
  const { cities, setCities, addActivity } = useData();
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();
  const [deleteTarget, setDeleteTarget] = useState<City | null>(null);
  const [editingItem, setEditingItem] = useState<City | null>(null);

  useEffect(() => {
    if (location.state?.openModal) {
      handleAddNew();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, openModal]);

  const [page] = useState(1);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return cities.slice(start, start + ITEMS_PER_PAGE);
  }, [page, cities]);

  const handleAddNew = () => {
    setEditingItem(null);
    openModal();
  };

  const handleEdit = (item: City) => {
    setEditingItem(item);
    openModal();
  };

  const handleDelete = (id: string) => {
    const city = cities.find(c => c.id === id);
    if (city) setDeleteTarget(city);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setCities(prev => prev.filter(c => c.id !== deleteTarget.id));
    addActivity("warning", `City '${deleteTarget.name}' removed from registry`);
    setDeleteTarget(null);
  };


  const handleSave = (item: any) => {
    if (editingItem) {
      setCities(prev => prev.map(c => c.id === editingItem.id ? { ...item, id: c.id } : c));
    } else {
      setCities(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
    }
    closeModal();
  };

  return (
    <>
      <PageMeta title="Cities | Football Admin" description="Manage metropolitan locations" />

      {/* Premium Command Header */}
      <div className="mb-10 group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-theme-xl dark:border-white/5 dark:bg-[#0f172a] lg:p-10">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 dark:border-white/10 dark:bg-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Location Control</span>
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white lg:text-4xl">
              Metropolitan <span className="text-blue-500">Hubs.</span>
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xl antialiased">
              Manage your network of global cities. Categorize by continent and assign to countries to build your operational map.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 dark:border-blue-500/10 dark:bg-blue-500/5 lg:flex">
              <FontAwesomeIcon icon={faCircleDot} className="h-1.5 w-1.5 animate-pulse text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Urban Analytics</span>
            </div>
            <button
              onClick={handleAddNew}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-4px_rgba(37,99,235,0.35)] transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Register City
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {paginatedData.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-theme-md transition-all hover:-translate-y-1 hover:shadow-theme-xl dark:border-white/5 dark:bg-gray-dark/80 backdrop-blur-sm">

            <div className="flex items-start justify-between mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faCity} className="h-5 w-5" />
              </div>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold border backdrop-blur-md ${item.continentName === "AFRICA"
                ? "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400"
                : "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
                }`}>
                {item.continentName}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">{item.name}</h3>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                  <FontAwesomeIcon icon={faMapPin} className="text-[10px]" />
                  <span className="text-xs font-bold uppercase tracking-widest">{item.country}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                  <FontAwesomeIcon icon={faBuildingColumns} className="text-[10px]" />
                  <span className="text-xs font-medium">Metropolitan Admin</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-4 dark:border-white/5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 text-gray-500 transition-all hover:bg-emerald-500 hover:text-white hover:border-emerald-500 dark:border-white/5 dark:bg-white/5"
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="text-[10px]" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 text-gray-500 transition-all hover:bg-rose-500 hover:text-white hover:border-rose-500 dark:border-white/5 dark:bg-white/5"
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-[10px]" />
                </button>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">View Map</button>
            </div>
          </div>
        ))}
      </div>

      <Create isOpen={isOpen} closeModal={closeModal} editingItem={editingItem} onSave={handleSave} />
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name ?? ""}
        itemType="city"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
};
