import { Search, X } from "lucide-react";

export const SearchBar = ({ className, onChange, value = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="group flex h-12 w-full items-center gap-2 rounded-xl border border-white/50 bg-white/85 px-3 shadow-[0_10px_40px_-25px_rgba(12,74,110,0.65)] backdrop-blur transition focus-within:border-cyan-300 focus-within:ring-4 focus-within:ring-cyan-100">
        <Search size={18} className="text-slate-400 group-focus-within:text-cyan-700" />
        <input
          type="text"
          className="h-full w-full border-none bg-transparent text-sm font-sans text-slate-700 outline-0 placeholder:text-slate-400 sm:text-base"
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
