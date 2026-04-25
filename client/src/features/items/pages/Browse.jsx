import { Header } from "@/components/Header";
import { SearchBar } from "../components/SearchBar";
import { TabsBar } from "../components/TabsBar";
import { ItemsContainer } from "../components/ItemsContainer";
import ReportButton from "../components/ReportButton.";
import { useEffect, useMemo, useState } from "react";
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white px-3 pb-12 pt-3 md:px-6 md:pt-4 lg:pt-6">
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-300/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl">
        <section className="rounded-3xl border border-sky-100 bg-[linear-gradient(135deg,#f8fbff_0%,#eaf4ff_52%,#f6f8ff_100%)] px-5 py-7 text-slate-900 shadow-[0_35px_90px_-65px_rgba(29,78,216,0.45)] sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                <Sparkles className="h-3.5 w-3.5" />
                Findora Discovery
              </p>
              <Header className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Browse Lost And Found Items
              </Header>
              <p className="mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
                Track recent reports, filter quickly, and reconnect owners with their belongings faster.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-sky-100 bg-white/85 p-3 sm:min-w-[260px]">
              <div className="rounded-xl bg-sky-50 px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-sky-700">Viewing</p>
                <p className="font-display text-lg font-bold capitalize text-slate-900">{itemsMeta.view}</p>
              </div>
              <div className="rounded-xl bg-sky-50 px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-sky-700">Results</p>
                <p className="font-display text-lg font-bold text-slate-900">{itemsMeta.loading ? "..." : itemsMeta.total}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-[0_25px_65px_-45px_rgba(37,99,235,0.4)] backdrop-blur sm:p-5">
          <div className="flex items-center gap-2 text-slate-700">
            <SlidersHorizontal className="h-4 w-4" />
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
            <h2 className="font-display text-2xl font-bold text-slate-900">
              {bar === "lost" ? "Lost Item Reports" : "Found Item Reports"}
            </h2>
            <p className="text-sm text-slate-600">
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
