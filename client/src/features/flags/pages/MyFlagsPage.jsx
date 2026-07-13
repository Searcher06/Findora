import { useEffect, useState } from "react";
import { getMyFlags } from "../services/flagApi";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

const statusClass = {
  open: "bg-amber-100 text-amber-700",
  in_review: "bg-indigo-100 text-indigo-700",
  resolved: "bg-emerald-100 text-emerald-700",
  dismissed: "bg-slate-100 text-slate-700",
};

export const MyFlagsPage = () => {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFlags = async () => {
      try {
        setLoading(true);
        const data = await getMyFlags();
        setFlags(data || []);
      } catch (error) {
        handleApiError(error, "Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };
    loadFlags();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/50 to-white px-3 pb-10 pt-3 sm:px-5 md:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <section className="rounded-3xl border border-indigo-100 bg-[linear-gradient(135deg,#faf9ff_0%,#f3f0ff_54%,#f8f7ff_100%)] px-5 py-7 shadow-[0_35px_90px_-70px_rgba(79,70,229,0.6)] sm:px-7">
          <img src="/iconplusfindoratext.png" alt="Findora" className="h-7 w-auto" />
          <h1 className="mt-3 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            My Reports
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Track the status of abuse/spam/fraud reports you submitted.
          </p>
        </section>

        <section className="mt-4 space-y-3 rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] sm:p-5">
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : flags.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
              No reports submitted yet.
            </div>
          ) : (
            flags.map((flag) => (
              <article
                key={flag._id}
                className="rounded-xl border border-slate-200 bg-white p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                    {flag.targetType}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      statusClass[flag.status] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {flag.status.replace("_", " ")}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-800">{flag.reason}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Submitted {new Date(flag.createdAt).toLocaleString()}
                </p>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
};
