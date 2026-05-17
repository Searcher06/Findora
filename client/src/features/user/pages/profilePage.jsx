import { createElement, useMemo } from "react";
import {
  User,
  Mail,
  Calendar,
  GraduationCap,
  BookOpen,
  Shield,
  Award,
  Loader2,
  Edit2,
  Plus,
  LogOut,
  KeyRound,
  Flag,
  Trophy,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

const FieldCard = ({
  icon,
  label,
  value,
  helper,
  tone = "blue",
  isEmpty = false,
  onEmptyAction,
}) => {
  const tones = {
    blue: {
      dot: "bg-indigo-500",
      icon: "text-indigo-700",
      iconBg: "bg-indigo-100",
      hover: "hover:border-indigo-200",
    },
    emerald: {
      dot: "bg-emerald-500",
      icon: "text-emerald-700",
      iconBg: "bg-emerald-100",
      hover: "hover:border-emerald-200",
    },
    violet: {
      dot: "bg-violet-500",
      icon: "text-violet-700",
      iconBg: "bg-violet-100",
      hover: "hover:border-violet-200",
    },
    slate: {
      dot: "bg-slate-500",
      icon: "text-slate-700",
      iconBg: "bg-slate-100",
      hover: "hover:border-slate-300",
    },
    amber: {
      dot: "bg-amber-500",
      icon: "text-amber-700",
      iconBg: "bg-amber-100",
      hover: "hover:border-amber-200",
    },
  };

  const style = tones[tone] || tones.blue;

  if (isEmpty) {
    return (
      <button
        type="button"
        onClick={onEmptyAction}
        className="w-full rounded-2xl border-2 border-dashed border-slate-300 bg-white p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/40"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <Plus className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-700">Add {label}</p>
            <p className="text-xs text-slate-500">Tap to complete your profile.</p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-4 transition ${style.hover}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${style.iconBg}`}>
          {createElement(icon, { className: `h-4 w-4 ${style.icon}` })}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{value}</p>
          {helper ? <p className="mt-0.5 text-xs text-slate-500">{helper}</p> : null}
        </div>
      </div>
    </div>
  );
};

export function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const logOut = useAuthStore((state) => state.logOut);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const membershipDuration = (dateString) => {
    const created = new Date(dateString);
    const now = new Date();
    const diffDays = Math.max(
      Math.ceil((Math.abs(now - created) / (1000 * 60 * 60 * 24))),
      0
    );
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}, ${months} month${months === 1 ? "" : "s"}`;
    }
    return `${months} month${months === 1 ? "" : "s"}`;
  };

  const accountName = useMemo(() => {
    if (!user) return "";
    const joined = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    return joined || user.username || "User";
  }, [user]);

  const accountUsername = useMemo(() => {
    if (!user) return "";
    return user.displayUsername || user.username || "user";
  }, [user]);

  const handleEditClick = () => navigate("/profile/edit");

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <User className="mx-auto mb-4 h-16 w-16 text-slate-400" />
          <h2 className="text-xl font-semibold text-slate-700">No User Found</h2>
          <p className="mt-2 text-slate-500">Please log in to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/55 to-white px-2.5 pb-8 pt-2.5 sm:px-5 sm:pb-10 sm:pt-3 md:px-6">
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        <section className="rounded-2xl border border-indigo-100 bg-[linear-gradient(135deg,#faf9ff_0%,#f3f0ff_54%,#f8f7ff_100%)] px-3 py-4 shadow-[0_35px_90px_-70px_rgba(79,70,229,0.6)] sm:rounded-3xl sm:px-6 sm:py-6">
          <img src="/iconplusfindoratext.png" alt="Findora" className="h-7 w-auto" />
          <h1 className="mt-2.5 font-display text-xl font-bold text-slate-900 sm:mt-3 sm:text-3xl">
            Your Account
          </h1>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Manage your profile details and security settings.
          </p>
        </section>

        <section className="mt-3.5 rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] sm:mt-4 sm:rounded-3xl sm:p-5">
          <div className="flex flex-col items-center gap-3.5 text-center min-[390px]:flex-row min-[390px]:items-center min-[390px]:text-left sm:gap-4">
            <div className="relative shrink-0">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 p-0.5 min-[390px]:h-16 min-[390px]:w-16 sm:h-20 sm:w-20">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-7 w-7 text-indigo-600 min-[390px]:h-8 min-[390px]:w-8 sm:h-9 sm:w-9" />
                  )}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-indigo-700">
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate font-display text-lg font-bold text-slate-900 min-[390px]:text-xl sm:text-2xl">
                {accountName}
              </h2>
              <p className="truncate text-xs text-slate-500 min-[390px]:text-sm">@{accountUsername}</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 min-[390px]:justify-start">
                <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
                  {user.role} account
                </span>
                {user.hasVerifiedReturnBadge ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <Award className="h-3.5 w-3.5" />
                    Verified Return
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3.5 grid gap-3.5 lg:mt-4 lg:gap-4 lg:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] sm:rounded-3xl sm:p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <GraduationCap className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-slate-900 sm:text-lg">Academic Info</h3>
                <p className="text-xs text-slate-500">Department and faculty details</p>
              </div>
            </div>

            <FieldCard
              icon={BookOpen}
              label="Department"
              value={user.department}
              helper="Department information"
              tone="blue"
              isEmpty={!user.department}
              onEmptyAction={handleEditClick}
            />
            <FieldCard
              icon={GraduationCap}
              label="Faculty"
              value={user.foculty}
              helper="Faculty information"
              tone="emerald"
              isEmpty={!user.foculty}
              onEmptyAction={handleEditClick}
            />
            <FieldCard
              icon={Shield}
              label="Role"
              value={user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
              helper={user.role === "student" ? "Undergraduate member" : "Academic member"}
              tone="violet"
            />
            <FieldCard
              icon={Award}
              label="Campus Trust Points"
              value={String(user.trustPoints || 0)}
              helper="Earned from successful verified handovers"
              tone="emerald"
            />
            <FieldCard
              icon={Shield}
              label="Successful Returns"
              value={String(user.successfulReturns || 0)}
              helper="Completed handovers with both codes verified"
              tone="amber"
            />
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] sm:rounded-3xl sm:p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <User className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-slate-900 sm:text-lg">Account Details</h3>
                <p className="text-xs text-slate-500">Personal and membership info</p>
              </div>
            </div>

            <FieldCard
              icon={Mail}
              label="Email"
              value={user.email}
              helper="Primary email address"
              tone="slate"
            />
            <FieldCard
              icon={Calendar}
              label="Member Since"
              value={formatDate(user.createdAt)}
              helper={membershipDuration(user.createdAt)}
              tone="amber"
            />

            <div className="space-y-2 pt-2">
              <button
                onClick={handleEditClick}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>

              <Link
                to="/change-password"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <KeyRound className="h-4 w-4" />
                Change Password
              </Link>

              <Link
                to="/my-flags"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Flag className="h-4 w-4" />
                My Reports
              </Link>

              <Link
                to="/leaderboard"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
              >
                <Trophy className="h-4 w-4" />
                Trust Leaderboard
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
