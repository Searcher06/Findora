import { SearchBar } from "../components/SearchBar";
import { TabsBar } from "../components/TabsBar";
import { ItemsContainer } from "../components/ItemsContainer";
import { Header } from "@/components/Header";
import { useEffect, useMemo, useRef, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useItemType } from "../context/ItemTypeContext";

const BrowsePage = () => {
  const { bar } = useItemType();
  const [filters, setFilters] = useState({ category: "all", date: "latest" });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageTopRef = useRef(null);
  const [itemsMeta, setItemsMeta] = useState({
    total: 0,
    loading: false,
    error: false,
    view: bar,
    page: 1,
    totalPages: 1,
  });

  const handleCategoryChange = (category) => { setFilters((p) => ({ ...p, category })); setPage(1); };
  const handleDateChange = (date) => { setFilters((p) => ({ ...p, date })); setPage(1); };
  const handleSearchChange = (query) => { setSearchQuery(query); setPage(1); };

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => { setPage(1); }, [bar]);

  useEffect(() => {
    if (page > 1) pageTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const apiFilters = useMemo(
    () => ({ category: filters.category, date: filters.date, search: debouncedSearch, status: bar, page, limit: 12 }),
    [filters.category, filters.date, debouncedSearch, bar, page]
  );

  return (
    <div ref={pageTopRef} className="min-h-screen bg-slate-50">

      {/* MOBILE sticky header */}
      <div className="sticky top-14 z-10 border-b border-slate-200/80 bg-white/95 px-3 pb-3 pt-3 backdrop-blur-xl md:top-16 lg:hidden">
        {/* Lost / Found pill toggle */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <LostFoundToggle />
          <span className="text-xs text-slate-400 font-medium">
            {itemsMeta.loading ? "Loading..." : `${itemsMeta.total} results`}
          </span>
        </div>

        {/* Search */}
        <SearchBar onChange={handleSearchChange} value={searchQuery} />

        {/* Filters row */}
        <MobileFilters
          onCategoryChange={handleCategoryChange}
          onDateChange={handleDateChange}
          categoryValue={filters.category}
          dateValue={filters.date}
        />
      </div>

      {/* DESKTOP hero + filters */}
      <div className="hidden lg:block">
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/60 to-white px-6 pb-6 pt-6">
          <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-violet-300/25 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-300/15 blur-3xl" />
          <div className="relative mx-auto w-full max-w-7xl">
            <section className="group relative overflow-hidden rounded-3xl border border-indigo-200/80 bg-[linear-gradient(135deg,#f5f3ff_0%,#e9e1ff_40%,#f6f2ff_100%)] px-8 py-10 text-slate-900 shadow-[0_35px_95px_-60px_rgba(67,56,202,0.55)] ring-1 ring-white/60">
              <div className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full bg-violet-300/35 blur-3xl" />
              <div className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-indigo-300/30 blur-3xl" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700/90">
                    Campus Lost & Found Hub
                  </p>
                  <Header className="text-4xl font-bold leading-tight text-indigo-950 lg:text-5xl">
                    Browse Lost And Found Items
                  </Header>
                  <p className="mt-3 max-w-xl text-base text-slate-600">
                    Track recent reports, filter quickly, and reconnect owners with their belongings faster.
                  </p>
                </div>
                <div className="grid w-auto min-w-[260px] grid-cols-2 gap-2 rounded-2xl border border-indigo-300/60 bg-white/70 p-3 backdrop-blur">
                  <div className="rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide text-violet-700">Viewing</p>
                    <p className="font-display text-lg font-bold capitalize text-indigo-950">{itemsMeta.view}</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide text-violet-700">Results</p>
                    <p className="font-display text-lg font-bold text-indigo-950">{itemsMeta.loading ? "..." : itemsMeta.total}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-5 rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-white to-violet-50/60 p-5 shadow-[0_25px_65px_-45px_rgba(79,70,229,0.45)] backdrop-blur">
              <div className="flex items-center gap-2 text-indigo-900 mb-3">
                <SlidersHorizontal className="h-4 w-4 text-violet-700" />
                <p className="text-sm font-semibold">Search & Filters</p>
              </div>
              <SearchBar onChange={handleSearchChange} value={searchQuery} />
              <TabsBar
                className="mt-3"
                onCategoryChange={handleCategoryChange}
                onDateChange={handleDateChange}
                dateValue={filters.date}
                categoryValue={filters.category}
              />
            </section>

            <div className="mt-6 flex items-center justify-between gap-3 px-1">
              <div>
                <h2 className="font-display text-2xl font-bold text-indigo-950">
                  {bar === "lost" ? "Lost Item Reports" : "Found Item Reports"}
                </h2>
                <p className="text-sm text-indigo-800/80">
                  {itemsMeta.loading
                    ? "Loading..."
                    : `${itemsMeta.total} ${itemsMeta.total === 1 ? "item" : "items"} · Page ${itemsMeta.page} of ${itemsMeta.totalPages}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items grid */}
      <div className="px-3 pt-4 pb-6 sm:px-4 lg:px-6 lg:pt-0">
        <div className="mx-auto max-w-7xl">
          <ItemsContainer
            filters={apiFilters}
            onMetaChange={setItemsMeta}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

// ── Lost / Found pill toggle (mobile only) ──
const LostFoundToggle = () => {
  const { bar, setBar } = useItemType();
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-0.5">
      <button
        type="button"
        onClick={() => setBar("lost")}
        className={`h-8 rounded-full px-4 text-xs font-semibold transition ${
          bar === "lost" ? "bg-rose-500 text-white shadow-sm" : "text-slate-500"
        }`}
      >
        Lost
      </button>
      <button
        type="button"
        onClick={() => setBar("found")}
        className={`h-8 rounded-full px-4 text-xs font-semibold transition ${
          bar === "found" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-500"
        }`}
      >
        Found
      </button>
    </div>
  );
};

// ── Inline filter chips for mobile ──
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MobileFilters = ({ onCategoryChange, onDateChange, categoryValue, dateValue }) => (
  <div className="mt-2 flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
    <Select onValueChange={onCategoryChange} value={categoryValue}>
      <SelectTrigger className="h-8 shrink-0 rounded-full border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-none">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="Electronics">Electronics</SelectItem>
        <SelectItem value="Books & Stationary">Books & Stationary</SelectItem>
        <SelectItem value="Bags & Accessories">Bags & Accessories</SelectItem>
        <SelectItem value="Clothing & Wearables">Clothing & Wearables</SelectItem>
        <SelectItem value="ID & Cards">ID & Cards</SelectItem>
        <SelectItem value="Keys & Locks">Keys & Locks</SelectItem>
        <SelectItem value="Documents">Documents</SelectItem>
        <SelectItem value="Personal Items">Personal Items</SelectItem>
        <SelectItem value="Sports & Equipment">Sports & Equipment</SelectItem>
        <SelectItem value="Others">Others</SelectItem>
      </SelectContent>
    </Select>

    <Select onValueChange={onDateChange} value={dateValue}>
      <SelectTrigger className="h-8 shrink-0 rounded-full border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-none">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectItem value="latest">Latest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="last7">Last 7 days</SelectItem>
        <SelectItem value="last30">Last 30 days</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default BrowsePage;
