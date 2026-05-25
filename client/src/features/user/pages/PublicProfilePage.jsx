import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  User,
  Award,
  Shield,
  Trophy,
  Calendar,
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Package,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getUserProfile, getUserPublicItems } from "../services/api";

const StatCard = ({ icon: Icon, label, value, tone = "indigo" }) => {
  const colors = {
    indigo: { bg: "bg-indigo-100", text: "text-indigo-700", val: "text-indigo-950" },
    emerald: { bg: "bg-emerald-100", text: "text-emerald-700", val: "text-emerald-950" },
    amber: { bg: "bg-amber-100", text: "text-amber-700", val: "text-amber-950" },
  };
  const c = colors[tone] || colors.indigo;
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm">
      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${c.bg}`}>
        <Icon className={`h-4 w-4 ${c.text}`} />
      </span>
      <p className={`text-xl font-bold ${c.val}`}>{value}</p>
      <p className="text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
};

const ItemChip = ({ item }) => {
  const statusColors = {
    lost: "bg-rose-100 text-rose-700",
    found: "bg-emerald-100 text-emerald-700",
    returned: "bg-slate-100 text-slate-600",
    claimed: "bg-amber-100 text-amber-700",
  };
  return (
    <Link
      to={`/items/${item._id}`}
      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-indigo-300 hover:bg-indigo-50/40"
    >
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <Package className="m-auto mt-3 h-6 w-6 text-slate-400" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
        <p className="truncate text-xs text-slate-500">{item.location}</p>
        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${statusColors[item.status] || "bg-slate-100 text-slate-600"}`}>
          {item.status}
        </span>
      </div>
    </Link>
  );
};

export function PublicProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError("");

    Promise.all([
      getUserProfile(username),
      getUserPublicItems(username).catch(() => []),
    ])
      .then(([profileData, itemsData]) => {
        setProfile(profileData);
        setItems(Array.isArray(itemsData) ? itemsData : []);
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "User not found");
      })
      .finally(() => setLoading(false));
  }, [username]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4">
        <AlertCircle className="h-14 w-14 text-slate-400" />
        <h2 className="text-xl font-semibold text-slate-700">{error || "User not found"}</h2>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <ArrowLeft className="h-4 w-4" /> Go back
        </button>
      </div>
    );
  }

  const displayName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || profile.username;
  const displayUsername = profile.displayUsername || profile.username;

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-50 via-slate-100/50 to-white px-3 pb-10 pt-3 sm:px-5 md:px-6">
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-3xl">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Hero card */}
        <section className="rounded-2xl border border-indigo-100 bg-[linear-gradient(135deg,#faf9ff_0%,#f3f0ff_54%,#f8f7ff_100%)] px-4 py-5 shadow-[0_25px_70px_-50px_rgba(79,70,229,0.55)] sm:rounded-3xl sm:px-6 sm:py-7">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-20 w-20 rounded-full bg-linear-to-br from-indigo-600 to-violet-600 p-0.5">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
                  {profile.profilePic ? (
                    <img src={profile.profilePic} alt={displayName} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-9 w-9 text-indigo-600" />
                  )}
                </div>
              </div>
              {profile.hasVerifiedReturnBadge && (
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
                  <Award className="h-3 w-3 text-white" />
                </span>
              )}
            </div>

            {/* Name + badges */}
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">{displayName}</h1>
              <p className="mt-0.5 text-sm text-slate-500">@{displayUsername}</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
                  <Shield className="h-3 w-3" />
                  {profile.role} account
                </span>
                {profile.hasVerifiedReturnBadge && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <Award className="h-3.5 w-3.5" />
                    Verified Return
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-4 grid grid-cols-3 gap-3">
          <StatCard icon={Trophy} label="Trust Points" value={profile.trustPoints ?? 0} tone="indigo" />
          <StatCard icon={Award} label="Returns" value={profile.successfulReturns ?? 0} tone="emerald" />
          <StatCard
            icon={Calendar}
            label="Member since"
            value={formatDate(profile.createdAt)}
            tone="amber"
          />
        </section>

        {/* Academic info */}
        {(profile.department || profile.foculty) && (
          <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100">
                <GraduationCap className="h-4 w-4 text-indigo-700" />
              </span>
              <h2 className="font-display text-base font-semibold text-slate-900">Academic Info</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {profile.department && (
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                  <BookOpen className="h-4 w-4 shrink-0 text-indigo-500" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Department</p>
                    <p className="text-sm font-semibold text-slate-800">{profile.department}</p>
                  </div>
                </div>
              )}
              {profile.foculty && (
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                  <GraduationCap className="h-4 w-4 shrink-0 text-indigo-500" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Faculty</p>
                    <p className="text-sm font-semibold text-slate-800">{profile.foculty}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Items section */}
        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100">
              <Package className="h-4 w-4 text-indigo-700" />
            </span>
            <h2 className="font-display text-base font-semibold text-slate-900">
              Reported Items
              <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                {items.length}
              </span>
            </h2>
          </div>

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center">
              <Package className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-2 text-sm text-slate-500">No public items yet</p>
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {items.map((item) => (
                <ItemChip key={item._id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
