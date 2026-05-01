import { useEffect, useMemo, useState } from "react";
import { Trophy, Award, Loader2, Shield } from "lucide-react";
import { getTrustLeaderboard } from "../services/api";
import { useAuthStore } from "@/store/useAuthStore";

export function TrustLeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getTrustLeaderboard(30);
        setLeaders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const myRank = useMemo(() => {
    if (!currentUser?._id) return null;
    return leaders.find((user) => user._id === currentUser._id) || null;
  }, [leaders, currentUser]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white px-3 pb-10 pt-3 sm:px-5 md:px-6">
      <div className="pointer-events-none absolute -left-20 top-8 h-56 w-56 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-300/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-5xl">
        <section className="rounded-3xl border border-sky-100 bg-[linear-gradient(135deg,#f8fbff_0%,#eaf4ff_52%,#f6f8ff_100%)] px-5 py-7 shadow-[0_35px_90px_-65px_rgba(29,78,216,0.45)] sm:px-8 sm:py-9">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
            <Trophy className="h-3.5 w-3.5" />
            Campus Trust
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold text-slate-900 sm:text-3xl">Trust Leaderboard</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Ranking students by successful verified handovers and trust points.
          </p>
        </section>

        {myRank ? (
          <section className="mt-4 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Your Rank</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-lg font-bold text-slate-900">#{myRank.rank} @{myRank.displayUsername || myRank.username}</p>
              <p className="text-sm font-semibold text-sky-700">{myRank.trustPoints || 0} pts</p>
            </div>
          </section>
        ) : null}

        <section className="mt-4 rounded-3xl border border-slate-200/80 bg-white/95 p-3 shadow-[0_25px_90px_-75px_rgba(15,23,42,0.85)] sm:p-4">
          {loading ? (
            <div className="flex min-h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">{error}</div>
          ) : leaders.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">No leaderboard data yet.</div>
          ) : (
            <div className="space-y-2">
              {leaders.map((user) => {
                const isCurrentUser = user._id === currentUser?._id;
                const isTopThree = user.rank <= 3;

                return (
                  <div
                    key={user._id}
                    className={`flex items-center justify-between rounded-xl border p-3 ${
                      isCurrentUser
                        ? "border-sky-300 bg-sky-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${isTopThree ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                        {user.rank}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {user.firstName} {user.lastName} <span className="text-slate-500">@{user.displayUsername || user.username}</span>
                        </p>
                        <p className="text-xs text-slate-500">{user.successfulReturns || 0} successful returns</p>
                      </div>
                    </div>
                    <div className="ml-3 shrink-0 text-right">
                      <p className="text-sm font-bold text-sky-700">{user.trustPoints || 0} pts</p>
                      {user.hasVerifiedReturnBadge ? (
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                          <Award className="h-3 w-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                          <Shield className="h-3 w-3" />
                          New
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
