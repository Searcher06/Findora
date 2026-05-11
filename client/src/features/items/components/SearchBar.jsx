import { Search, X } from "lucide-react";

export const SearchBar = ({ className, onChange, value = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="group flex h-12 w-full items-center gap-2 rounded-xl border border-indigo-200/70 bg-gradient-to-r from-white to-violet-50/60 px-3 shadow-[0_10px_40px_-25px_rgba(67,56,202,0.35)] backdrop-blur transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
        <Search size={18} className="text-indigo-400 group-focus-within:text-violet-700" />
        <input
          type="text"
          className="h-full w-full border-none bg-transparent text-sm font-sans text-indigo-950/90 outline-0 placeholder:text-indigo-400 sm:text-base"
          placeholder="Search by name, location, description, category..."
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange && onChange("")}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
};
