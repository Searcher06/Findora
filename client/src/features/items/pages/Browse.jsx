import { Header } from "@/components/Header";
import { SearchBar } from "../components/SearchBar";
import { TabsBar } from "../components/TabsBar";
import { ItemsContainer } from "../components/ItemsContainer";
import ReportButton from "../components/ReportButton.";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, SlidersHorizontal } from "lucide-react";
import { useItemType } from "../context/ItemTypeContext";

const BrowsePage = () => {
  const { bar } = useItemType();
  const [filters, setFilters] = useState({
    category: "all",
    date: "latest",
  });
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

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    setPage(1);
  };

  const handleDateChange = (date) => {
    setFilters((prev) => ({ ...prev, date }));
    setPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [bar]);

  useEffect(() => {
    if (page > 1) {
      pageTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [page]);

  const apiFilters = useMemo(
    () => ({
      category: filters.category,
      date: filters.date,
      search: debouncedSearch,
      status: bar,
      page,
      limit: 12,
    }),
    [filters.category, filters.date, debouncedSearch, bar, page]
  );

  return (
    <div
      ref={pageTopRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/60 to-white px-3 pb-12 pt-3 md:px-6 md:pt-4 lg:pt-6"
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-violet-300/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-300/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl">
        <section className="group relative overflow-hidden rounded-3xl border border-indigo-200/80 bg-[linear-gradient(135deg,#f5f3ff_0%,#e9e1ff_40%,#f6f2ff_100%)] px-5 py-7 text-slate-900 shadow-[0_35px_95px_-60px_rgba(67,56,202,0.55)] ring-1 ring-white/60 sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0)_42%)]" />
          <div className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full bg-violet-300/35 blur-3xl transition-transform duration-700 group-hover:scale-110" />
          <div className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-indigo-300/30 blur-3xl transition-transform duration-700 group-hover:scale-110" />
          <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-60 transition-transform duration-1000 group-hover:translate-x-[420%]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                <Sparkles className="h-3.5 w-3.5" />
                Campus Lost & Found Hub
              </p>
              <Header className="text-3xl font-bold leading-tight text-indigo-950 sm:text-4xl lg:text-5xl">
                Browse Lost And Found Items
              </Header>
              <p className="mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
                Track recent reports, filter quickly, and reconnect owners with their belongings faster.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-indigo-300/60 bg-white/70 p-3 backdrop-blur sm:min-w-[260px]">
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

        <section className="mt-5 rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-white to-violet-50/60 p-4 shadow-[0_25px_65px_-45px_rgba(79,70,229,0.45)] backdrop-blur sm:p-5">
          <div className="flex items-center gap-2 text-indigo-900">
            <SlidersHorizontal className="h-4 w-4 text-violet-700" />
            <p className="text-sm font-semibold">Search & Filters</p>
          </div>
          <SearchBar className="mt-3" onChange={handleSearchChange} value={searchQuery} />
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
                ? "Loading reports..."
                : `${itemsMeta.total} ${itemsMeta.total === 1 ? "item" : "items"} found • Page ${itemsMeta.page} of ${itemsMeta.totalPages}`}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <ItemsContainer
            className=""
            filters={apiFilters}
            onMetaChange={setItemsMeta}
            onPageChange={setPage}
          />
        </div>
      </div>

      <ReportButton />
    </div>
  );
};

export default BrowsePage;
