import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PaginatedTable from "../../components/tables/PaginatedTable";
import Create from "./Create";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router";
import { faBuilding, faUsersRectangle, faCity, faCircleDot, faSearch, faFilter, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
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
  status: "Active" | "Maintenance" | "Renovation";
  seatingCategories: string[];
}

const fakeData: Studium[] = [
  {
    id: "1",
    name: "Camp Nou",
    address: "C. d'Arístides Maillol, 12",
    city: "Barcelona",
    country: "Spain",
    capacity: 99354,
    constructionYear: 1957,
    description: "The historic home of FC Barcelona.",
    status: "Active",
    seatingCategories: ["VIP", "Cat 1", "Cat 2", "Tribune Sud"],
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
    status: "Renovation",
    seatingCategories: ["VIP", "Premium", "Standard"],
  },
  {
    id: "3",
    name: "Old Trafford",
    address: "Sir Matt Busby Way",
    city: "Manchester",
    country: "United Kingdom",
    capacity: 74879,
    constructionYear: 1910,
    description: "The iconic Theatre of Dreams.",
    status: "Active",
    seatingCategories: ["VIP", "Cat 1", "Cat 2"],
  },
  {
    id: "4",
    name: "Allianz Arena",
    address: "Werner-Heisenberg-Allee 25",
    city: "Munich",
    country: "Germany",
    capacity: 75000,
    constructionYear: 2005,
    description: "A modern marvel of stadium design.",
    status: "Active",
    seatingCategories: ["VIP", "Premium", "Economy", "Tribune Nord"],
  },
  {
    id: "5",
    name: "Parc des Princes",
    address: "24 Rue du Commandant Guilbaud",
    city: "Paris",
    country: "France",
    capacity: 47929,
    constructionYear: 1972,
    description: "Historic stadium in Paris.",
    status: "Active",
    seatingCategories: ["VIP", "Cat 1"],
  },
];

export default function Show() {
  const [stadiums, setStadiums] = useState<Studium[]>(fakeData);
  const [editingStadium, setEditingStadium] = useState<Studium | null>(null);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 8;
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openModal) {
      openModal();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, openModal]);

  const handleAddStadium = (newStadium: Studium) => {
    setStadiums([newStadium, ...stadiums]);
  };

  const handleEdit = (stadium: Studium) => {
    setEditingStadium(stadium);
    openModal();
  };

  const handleUpdateStadium = (updatedStadium: Studium) => {
    setStadiums(stadiums.map(s => s.id === updatedStadium.id ? updatedStadium : s));
    setEditingStadium(null);
  };

  const handleCloseModal = () => {
    setEditingStadium(null);
    closeModal();
  };

  const handleDelete = (id: string) => {
    setStadiums(stadiums.filter(s => s.id !== id));
  };

  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredData = stadiums.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const currentPageData = filteredData.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );

  const columns = [
    {
      header: "NAME",
      render: (row: Studium) => (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 dark:border-white/5 dark:bg-white/5">
            <FontAwesomeIcon icon={faBuilding} className="text-gray-400 dark:text-gray-500 text-sm" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{row.name}</p>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-tighter">{row.address}</p>
          </div>
        </div>
      )
    },
    {
      header: "CITY",
      render: (row: Studium) => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50"></div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{row.city}</p>
        </div>
      )
    },
    {
      header: "CAPACITY",
      render: (row: Studium) => (
        <div className="inline-flex items-center gap-2 bg-gray-50/50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-white/5">
          <p className="font-mono text-xs font-bold text-gray-700 dark:text-gray-200 tracking-tight">
            {row.capacity.toLocaleString()}
          </p>
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Seats</span>
        </div>
      )
    },
    {
      header: "SEATING CATEGORIES",
      render: (row: Studium) => (
        <div className="flex flex-wrap gap-2">
          {row.seatingCategories.map((cat, idx) => (
            <span key={idx} className="inline-flex items-center rounded-full bg-white/[0.03] px-3 py-1 text-[10px] font-bold text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/10 shadow-sm backdrop-blur-md transition-all hover:border-emerald-500/30 hover:text-emerald-500">
              {cat}
            </span>
          ))}
        </div>
      )
    },
    {
      header: "ACTIONS",
      render: (row: Studium) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleEdit(row)}
            className="text-gray-400 hover:text-brand-500 transition-colors"
          >
            <FontAwesomeIcon icon={faPencilAlt} className="text-xs" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-gray-400 hover:text-error-500 transition-colors"
          >
            <FontAwesomeIcon icon={faTrash} className="text-xs" />
          </button>
        </div>
      )
    },
  ];

  return (
    <>
      <PageMeta title="Stadiums | Football Admin" description="Manage football venues and stadiums" />

      {/* Premium Command Header */}
      <div className="mb-10 group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-theme-xl dark:border-white/5 dark:bg-[#0f172a] lg:p-10">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-[80px]"></div>
          <div className="absolute top-1/2 left-1/4 h-48 w-48 rounded-full bg-cyan-500/10 blur-[60px]"></div>
        </div>

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 dark:border-white/10 dark:bg-white/5 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Venue Management</span>
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white lg:text-4xl">
              Football <span className="text-emerald-500">Arenas.</span>
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xl antialiased">
              Operational interface for venue coordination. Monitor infrastructure status and seating metrics.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 dark:border-emerald-500/10 dark:bg-emerald-500/5 backdrop-blur-sm lg:flex">
              <FontAwesomeIcon icon={faCircleDot} className="h-1.5 w-1.5 animate-pulse text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Live Monitoring</span>
            </div>
            <button
              onClick={openModal}
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-600 hover:scale-105 active:scale-95"
            >
              Initialize Venue
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Command Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-emerald-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Total Stadiums</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">{stadiums.length}</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faBuilding} className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-cyan-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Avg. Capacity</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
                  {stadiums.length > 0
                    ? Math.round(stadiums.reduce((acc, curr) => acc + curr.capacity, 0) / stadiums.length).toLocaleString()
                    : 0}
                </h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faUsersRectangle} className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md transition-all dark:border-gray-800 dark:bg-gray-dark/80">
            <div className="absolute top-0 left-0 h-1 w-full bg-indigo-500"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Operational Cities</p>
                <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
                  {new Set(stadiums.map(s => s.city)).size}
                </h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 shadow-inner group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faCity} className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Technical Data Overview */}
        <div className="rounded-3xl border border-gray-200/50 bg-white shadow-theme-lg dark:border-gray-700/50 dark:bg-gray-dark/80 backdrop-blur-sm overflow-hidden">
          <div className="border-b border-gray-100 p-8 dark:border-white/5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Operational Registry
                </h3>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Comprehensive Venue Database</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                  <input
                    type="text"
                    placeholder="Search registry..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10 w-64 rounded-xl border border-gray-100 bg-gray-50 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none dark:border-white/5 dark:bg-white/5 dark:text-white"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${statusFilter !== "All"
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "border-gray-100 bg-gray-50 dark:border-white/5 dark:bg-white/5 text-gray-500"
                      }`}
                  >
                    <FontAwesomeIcon icon={faFilter} className="text-xs" />
                  </button>

                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-xl dark:border-white/5 dark:bg-gray-900 z-50">
                      {["All", "Active", "Maintenance", "Renovation"].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setStatusFilter(status);
                            setIsFilterOpen(false);
                            setPage(0);
                          }}
                          className={`w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${statusFilter === status
                            ? "bg-emerald-500 text-white"
                            : "text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5"
                            }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <PaginatedTable
              columns={columns}
              data={currentPageData}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      <Create
        isOpen={isOpen}
        closeModal={handleCloseModal}
        onAddStadium={handleAddStadium}
        onUpdateStadium={handleUpdateStadium}
        stadium={editingStadium}
      />
    </>
  );
}
