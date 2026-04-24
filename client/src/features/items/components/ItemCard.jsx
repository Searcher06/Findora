import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ItemCard = ({ image, name, description, location, date, id, status }) => {
  const dateReported = formatDate(date);
  const navigate = useNavigate();
  const isLost = status === "lost";

  return (
    <Card className="group flex w-full max-w-[340px] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_18px_50px_-35px_rgba(15,23,42,0.58)] transition hover:-translate-y-1 hover:shadow-[0_22px_65px_-35px_rgba(14,116,144,0.6)]">
      <div className="relative">
        <img src={image} alt={name} className="h-44 w-full object-cover" />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
            isLost
              ? "bg-rose-100 text-rose-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {isLost ? "Lost" : "Found"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-h-[80px]">
          <h1 className="mb-1 line-clamp-1 font-display text-lg font-bold text-slate-900">
            {name}
          </h1>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
            {description}
          </p>
        </div>

        <div className="space-y-2 rounded-xl bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-[13px] text-slate-600">
            <MapPin className="h-4 w-4 shrink-0 text-slate-500" />
            <p className="line-clamp-1">{location}</p>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-slate-600">
            <CalendarDays className="h-4 w-4 shrink-0 text-slate-500" />
            <p>{dateReported}</p>
          </div>
        </div>

        <Button
          onClick={() => {
            navigate(`items/${id}`);
          }}
          className="mt-auto h-10 rounded-xl bg-slate-900 text-sm font-semibold text-white transition group-hover:bg-cyan-700"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
