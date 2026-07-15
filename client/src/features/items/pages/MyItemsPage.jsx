import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyItems } from "../api/itemApi";
import {
  Package,
  PlusIcon,
  Search,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Pencil,
  Eye,
  AlertCircle,
} from "lucide-react";

const placeholderImage = "/item-placeholder.svg";

const STATUS_CONFIG = {
  lost: {
    label: "Lost",
    color: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    icon: Clock,
  },
  found: {
    label: "Found",
    color: "bg-indigo-100 text-indigo-700",
    dot: "bg-indigo-500",
    icon: Package,
  },
  claimed: {
    label: "Claimed",
    color: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  returned: {
    label: "Returned",
    color: "bg-emerald-100 text-emerald-800",
    dot: "bg-emerald-600",
    icon: ShieldCheck,
  },
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "lost", label: "Lost" },
  { key: "found", label: "Found" },
  { key: "claimed", label: "Claimed" },
  { key: "returned", label: "Returned" },
  { key: "resolved", label: "Resolved" },
];

const timeAgo = (dateString) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
};

const ItemCard = ({ item }) => {
  const isResolved = item.resolvedByOwner;
  const cfg = isResolved
    ? { label: "Resolved", color: "bg-slate-100 text-slate-600", dot: "bg-slate-400", icon: CheckCircle2 }
    : STATUS_CONFIG[item.status] || STATUS_CONFIG.lost;
  const Icon = cfg.icon;
  const navigate = useNavigate();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-indigo-200 hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={item.image || placeholderImage}
          alt={item.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        {/* Status badge overlay */}
        <span className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${cfg.color}`}>
          <Icon className="h-3 w-3" />
          {cfg.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div>
          <p className="line-clamp-1 text-sm font-bold text-slate-900">{item.name}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{item.category} · {item.location}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400">{timeAgo(item.dateReported)}</span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <Link
            to={`/items/${item._id}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </Link>
          {item.status !== "returned" && !item.resolvedByOwner && (
            <button
              type="button"
              onClick={() => navigate(`/update/${item._id}`)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-700 py-2 text-xs font-semibold text-white transition hover:bg-indigo-800"
            >
              <Pencil className="h-3.5 w-3.5" />
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export function MyItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMyItems()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((err) => setError(err?.response?.data?.message || "Failed to load your items"))
      .finally(() => setLoading(false));
  }, []);

  const counts = {
    all: items.length,
    lost: items.filter((i) => i.status === "lost" && !i.resolvedByOwner).length,
    found: items.filter((i) => i.status === "found" && !i.resolvedByOwner).length,
    claimed: items.filter((i) => i.status === "claimed").length,
    returned: items.filter((i) => i.status === "returned").length,
    resolved: items.filter((i) => i.resolvedByOwner).length,
  };

  const filtered = items
    .filter((i) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "resolved") return i.resolvedByOwner;
      return i.status === activeFilter && !i.resolvedByOwner;
    })
    .filter((i) =>
      search.trim()
        ? i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.location?.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported));

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Sticky header — mobile/tablet only ── */}
      <div className="sticky top-14 z-10 border-b border-slate-200/80 bg-white/95 px-3 pb-3 pt-3 backdrop-blur-xl md:top-16 lg:hidden">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-display text-lg font-bold text-slate-900">My Items</h1>
          <Link
            to="/report"
            className="inline-flex items-center gap-1.5 rounded-full bg-indigo-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-800"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            New
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-full border border-slate-200 bg-slate-100 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Filter chips */}
        {!loading && items.length > 0 && (
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {FILTERS.filter((f) => f.key === "all" || counts[f.key] > 0).map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition ${
                  activeFilter === f.key
                    ? "bg-indigo-700 text-white"
                    : "border border-slate-200 bg-white text-slate-600"
                }`}
              >
                {f.label}
                {(f.key === "all" ? counts.all : counts[f.key]) > 0 && (
                  <span className={`ml-1 text-[10px] ${activeFilter === f.key ? "opacity-80" : "text-slate-400"}`}>
                    {f.key === "all" ? counts.all : counts[f.key]}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop header ── */}
      <div className="hidden lg:block px-6 pt-6 pb-4">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                <Layers className="h-5 w-5 text-indigo-700" />
              </span>
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">My Items</h1>
                <p className="text-sm text-slate-500">All items you've reported</p>
              </div>
            </div>
            <Link
              to="/report"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800"
            >
              <PlusIcon className="h-4 w-4" />
              Report Item
            </Link>
          </div>

          {/* Desktop filters + search row */}
          {!loading && items.length > 0 && (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {FILTERS.filter((f) => f.key === "all" || counts[f.key] > 0).map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setActiveFilter(f.key)}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                      activeFilter === f.key
                        ? "bg-indigo-700 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {f.label}
                    {(f.key === "all" ? counts.all : counts[f.key]) > 0 && (
                      <span className={`ml-1.5 text-xs ${activeFilter === f.key ? "opacity-80" : "text-slate-400"}`}>
                        {f.key === "all" ? counts.all : counts[f.key]}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="relative shrink-0">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 w-56 rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-3 pt-4 pb-6 sm:px-4">
        <div className="mx-auto max-w-5xl">
          {loading ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-slate-100 bg-white">
                  <div className="aspect-video w-full rounded-t-2xl bg-slate-200" />
                  <div className="space-y-2 p-3">
                    <div className="h-3 w-3/4 rounded bg-slate-200" />
                    <div className="h-2.5 w-1/2 rounded bg-slate-100" />
                    <div className="mt-3 flex gap-2">
                      <div className="h-8 flex-1 rounded-xl bg-slate-100" />
                      <div className="h-8 flex-1 rounded-xl bg-slate-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 py-20 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                <Package className="h-7 w-7 text-indigo-600" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-700">No items reported yet</p>
                <p className="mt-1 text-xs text-slate-400">Lost something? Found something? Report it now.</p>
              </div>
              <Link
                to="/report"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800"
              >
                <PlusIcon className="h-4 w-4" />
                Report an Item
              </Link>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 py-14 text-center">
              <Search className="h-8 w-8 text-slate-300" />
              <p className="text-sm font-semibold text-slate-500">No items match your filter</p>
              <button
                type="button"
                onClick={() => { setActiveFilter("all"); setSearch(""); }}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {filtered.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
