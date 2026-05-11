import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { MapPin, CalendarDays, ArrowRight, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ItemCard = ({ image, name, description, location, date, id, status, category }) => {
  const dateReported = formatDate(date);
  const navigate = useNavigate();
  const isLost = status === "lost";

  return (
    <Card className="group flex w-full max-w-[320px] flex-col overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.65)] transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_28px_70px_-38px_rgba(67,56,202,0.4)]">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="h-36 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] backdrop-blur ${
            isLost ? "bg-rose-100/95 text-rose-700" : "bg-emerald-100/95 text-emerald-700"
          }`}
        >
          {isLost ? "Lost" : "Found"}
        </span>
        <span className="absolute bottom-2 right-2 rounded-full border border-slate-200 bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
          {dateReported}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <div className="min-h-[64px]">
          <h1 className="mb-1 line-clamp-1 font-display text-base font-bold text-indigo-950">{name}</h1>
          <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-600">{description}</p>
        </div>

        <div className="space-y-1.5 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-violet-50/40 p-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-violet-700" />
            <p className="line-clamp-1">{location}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-violet-700" />
            <p>Reported {dateReported}</p>
          </div>
          {category ? (
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Tag className="h-3.5 w-3.5 shrink-0 text-violet-700" />
              <p className="line-clamp-1">{category}</p>
            </div>
          ) : null}
        </div>

        <Button
          onClick={() => {
            navigate(`items/${id}`);
          }}
          className="mt-auto h-9 rounded-xl bg-gradient-to-r from-indigo-800 to-indigo-700 text-xs font-semibold text-white transition hover:from-violet-700 hover:to-indigo-700"
        >
          View Details
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </Card>
  );
};
