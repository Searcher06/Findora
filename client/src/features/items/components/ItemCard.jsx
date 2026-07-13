import { formatDate } from "@/utils/formatDate";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ItemCard = ({ image, name, description, location, date, id, status, category }) => {
  const navigate = useNavigate();
  const isLost = status === "lost";

  return (
    <button
      type="button"
      onClick={() => navigate(`items/${id}`)}
      className="group w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-sm transition active:scale-[0.97] hover:shadow-md hover:border-violet-200"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Status badge */}
        <span
          className={`absolute left-2 top-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${
            isLost
              ? "bg-rose-500/90 text-white"
              : "bg-emerald-500/90 text-white"
          }`}
        >
          {isLost ? "Lost" : "Found"}
        </span>

        {/* Category badge */}
        {category && (
          <span className="absolute bottom-2 right-2 rounded-full border border-white/40 bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            {category}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        <h3 className="line-clamp-1 font-display text-sm font-bold text-slate-900">
          {name}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-slate-500">
          {description}
        </p>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
          <MapPin className="h-3 w-3 shrink-0 text-violet-500" />
          <span className="line-clamp-1">{location}</span>
        </div>
      </div>
    </button>
  );
};
