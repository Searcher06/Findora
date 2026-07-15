import { createElement, useMemo, useState, useEffect } from "react";
import {
  User, Mail, Calendar, GraduationCap, BookOpen, Shield, Award,
  Loader2, Edit2, LogOut, KeyRound, Flag, Trophy, Phone, Layers,
  Bell, BellOff, BellRing, ChevronRight, Plus,
} from "lucide-react";
import { requestPushPermission } from "@/hooks/usePushNotifications";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

// ── Shared components ────────────────────────────────────────────────────────
const Row = ({ icon: Icon, label, sublabel, to, onClick, iconBg = "bg-slate-100", iconColor = "text-slate-600", danger = false }) => {
  const inner = (
    <div className={`flex items-center gap-3 px-4 py-3.5 transition active:bg-slate-50 ${danger ? "active:bg-rose-50" : ""}`}>
      <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </span>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold ${danger ? "text-red-600" : "text-slate-900"}`}>{label}</p>
        {sublabel ? <p className="mt-0.5 text-xs text-slate-400">{sublabel}</p> : null}
      </div>
      {!danger && <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />}
    </div>
  );
  if (to) return <Link to={to} className="block">{inner}</Link>;
  return <button type="button" onClick={onClick} className="w-full text-left">{inner}</button>;
};

const Divider = ({ label }) => (
  <div className="px-4 pb-1 pt-4">
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
  </div>
);

// ── Desktop field card ────────────────────────────────────────────────────────
const FieldCard = ({ icon, label, value, helper, tone = "blue", isEmpty = false, onEmptyAction }) => {
  const tones = {
    blue:    { dot: "bg-indigo-500",  icon: "text-indigo-700",  iconBg: "bg-indigo-100",  hover: "hover:border-indigo-200" },
    emerald: { dot: "bg-emerald-500", icon: "text-emerald-700", iconBg: "bg-emerald-100", hover: "hover:border-emerald-200" },
    violet:  { dot: "bg-violet-500",  icon: "text-violet-700",  iconBg: "bg-violet-100",  hover: "hover:border-violet-200" },
    slate:   { dot: "bg-slate-500",   icon: "text-slate-700",   iconBg: "bg-slate-100",   hover: "hover:border-slate-300" },
    amber:   { dot: "bg-amber-500",   icon: "text-amber-700",   iconBg: "bg-amber-100",   hover: "hover:border-amber-200" },
  };
  const style = tones[tone] || tones.blue;

  if (isEmpty) {
    return (
      <button type="button" onClick={onEmptyAction}
        className="w-full rounded-2xl border-2 border-dashed border-slate-300 bg-white p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/40">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <Plus className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-700">Add {label}</p>
            <p className="text-xs text-slate-500">Click to complete your profile.</p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-4 transition ${style.hover}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
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

// ── Push notification ────────────────────────────────────────────────────────
const PushRow = () => {
  const [permission, setPermission] = useState("Notification" in window ? Notification.permission : "unsupported");
  const [loading, setLoading] = useState(false);
  if (permission === "unsupported") return null;
  const handleEnable = async () => {
    setLoading(true);
    const granted = await requestPushPermission();
    setPermission(granted ? "granted" : "denied");
    setLoading(false);
  };
  if (permission === "granted") return <Row icon={BellRing} label="Push Notifications" sublabel="Enabled" iconBg="bg-emerald-100" iconColor="text-emerald-700" />;
  if (permission === "denied") return <Row icon={BellOff} label="Push Notifications" sublabel="Blocked — enable in browser settings" iconBg="bg-rose-100" iconColor="text-rose-600" />;
  return <Row icon={Bell} label="Enable Push Notifications" sublabel="Get notified about claims and handovers" iconBg="bg-indigo-100" iconColor="text-indigo-700" onClick={loading ? undefined : handleEnable} />;
};

// ── Main ─────────────────────────────────────────────────────────────────────
export function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const logOut = useAuthStore((state) => state.logOut);
  const isLoggingOut = useAuthStore((state) => state.isLoggingOut);

  const accountName = useMemo(() => {
    if (!user) return "";
    return `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username || "User";
  }, [user]);

  const accountUsername = useMemo(() => {
    if (!user) return "";
    return user.displayUsername || user.username || "user";
  }, [user]);

  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const handleLogout = async () => { await logOut(); navigate("/login"); };
  const handleEditClick = () => navigate("/profile/edit");

  if (isCheckingAuth) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-indigo-500" /></div>;
  if (!user) return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
      <User className="h-14 w-14 text-slate-300" />
      <p className="font-semibold text-slate-700">No user found</p>
      <Link to="/login" className="text-sm font-semibold text-indigo-600">Go to login</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-6">

      {/* ══════════════════════════════════════════
          MOBILE layout (hidden on lg+)
      ══════════════════════════════════════════ */}
      <div className="lg:hidden">
        <div className="bg-white px-4 pb-5 pt-5 text-center">
          <div className="relative mx-auto h-20 w-20">
            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-indigo-200 bg-indigo-50">
              {user.profilePic
                ? <img src={user.profilePic} alt="Profile" className="h-full w-full object-cover" />
                : <div className="flex h-full w-full items-center justify-center"><User className="h-9 w-9 text-indigo-400" /></div>}
            </div>
            <button type="button" onClick={handleEditClick} aria-label="Edit profile"
              className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-white shadow-sm">
              <Edit2 className="h-3 w-3" />
            </button>
          </div>
          <h1 className="mt-3 font-display text-xl font-bold text-slate-900">{accountName}</h1>
          <p className="text-sm text-slate-400">@{accountUsername}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-semibold capitalize text-indigo-700">{user.role}</span>
            {user.hasVerifiedReturnBadge && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-700">
                <Award className="h-3 w-3" /> Verified Return
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-3 py-3">
              <p className="font-display text-2xl font-bold text-indigo-700">{user.trustPoints || 0}</p>
              <p className="mt-0.5 text-xs text-slate-500">Trust Points</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-3 py-3">
              <p className="font-display text-2xl font-bold text-emerald-700">{user.successfulReturns || 0}</p>
              <p className="mt-0.5 text-xs text-slate-500">Successful Returns</p>
            </div>
          </div>
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl bg-white divide-y divide-slate-100 mx-3">
          <Divider label="Account" />
          <Row icon={Mail} label={user.email} sublabel="Email address" iconBg="bg-slate-100" iconColor="text-slate-500" />
          {user.whatsappPhone ? <Row icon={Phone} label={user.whatsappPhone} sublabel="WhatsApp" iconBg="bg-emerald-100" iconColor="text-emerald-600" />
            : <Row icon={Phone} label="Add WhatsApp number" sublabel="For handover notifications" iconBg="bg-slate-100" iconColor="text-slate-400" to="/profile/edit" />}
          {user.department ? <Row icon={BookOpen} label={user.department} sublabel="Department" iconBg="bg-blue-100" iconColor="text-blue-600" />
            : <Row icon={BookOpen} label="Add department" sublabel="Complete your profile" iconBg="bg-slate-100" iconColor="text-slate-400" to="/profile/edit" />}
          {user.foculty ? <Row icon={GraduationCap} label={user.foculty} sublabel="Faculty" iconBg="bg-violet-100" iconColor="text-violet-600" />
            : <Row icon={GraduationCap} label="Add faculty" sublabel="Complete your profile" iconBg="bg-slate-100" iconColor="text-slate-400" to="/profile/edit" />}
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl bg-white divide-y divide-slate-100 mx-3">
          <Divider label="Navigation" />
          <Row icon={Edit2} label="Edit Profile" iconBg="bg-slate-100" iconColor="text-slate-600" to="/profile/edit" />
          <Row icon={KeyRound} label="Change Password" iconBg="bg-amber-100" iconColor="text-amber-600" to="/change-password" />
          <Row icon={Layers} label="My Items" iconBg="bg-indigo-100" iconColor="text-indigo-600" to="/my-items" />
          <Row icon={Flag} label="My Reports" iconBg="bg-slate-100" iconColor="text-slate-600" to="/my-flags" />
          <Row icon={Trophy} label="Trust Leaderboard" iconBg="bg-amber-100" iconColor="text-amber-600" to="/leaderboard" />
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl bg-white divide-y divide-slate-100 mx-3">
          <Divider label="Notifications" />
          <PushRow />
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl bg-white mx-3">
          <button type="button" onClick={handleLogout} disabled={isLoggingOut}
            className="flex w-full items-center gap-3 px-4 py-3.5 transition active:bg-rose-50 disabled:opacity-60">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100">
              {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin text-red-600" /> : <LogOut className="h-4 w-4 text-red-600" />}
            </span>
            <p className="text-sm font-semibold text-red-600">{isLoggingOut ? "Logging out..." : "Log Out"}</p>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP layout (hidden on mobile)
      ══════════════════════════════════════════ */}
      <div className="hidden lg:block">
        <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-50 via-slate-100/55 to-white px-6 pb-10 pt-6">
          <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-200/20 blur-3xl" />

          <div className="relative mx-auto w-full max-w-6xl">
            {/* Header */}
            <section className="rounded-3xl border border-indigo-100 bg-[linear-gradient(135deg,#faf9ff_0%,#f3f0ff_54%,#f8f7ff_100%)] px-6 py-6 shadow-[0_35px_90px_-70px_rgba(79,70,229,0.6)]">
              <img src="/iconplusfindoratext.png" alt="Findora" className="h-7 w-auto" />
              <h1 className="mt-2.5 font-display text-3xl font-bold text-slate-900">Your Account</h1>
              <p className="mt-1 text-sm text-slate-600">Manage your profile details and security settings.</p>
            </section>

            {/* Avatar card */}
            <section className="mt-4 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)]">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="h-20 w-20 rounded-full bg-linear-to-br from-indigo-600 to-violet-600 p-0.5">
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
                      {user.profilePic
                        ? <img src={user.profilePic} alt="Profile" className="h-full w-full object-cover" />
                        : <User className="h-9 w-9 text-indigo-600" />}
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-2xl font-bold text-slate-900">{accountName}</h2>
                  <p className="text-sm text-slate-500">@{accountUsername}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">{user.role} account</span>
                    {user.hasVerifiedReturnBadge && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <Award className="h-3.5 w-3.5" /> Verified Return
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Two-column layout */}
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {/* Left: Academic Info */}
              <div className="space-y-3 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700"><GraduationCap className="h-4 w-4" /></span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-slate-900">Academic Info</h3>
                    <p className="text-xs text-slate-500">Department and trust details</p>
                  </div>
                </div>
                <FieldCard icon={BookOpen} label="Department" value={user.department} helper="Department information" tone="blue" isEmpty={!user.department} onEmptyAction={handleEditClick} />
                <FieldCard icon={GraduationCap} label="Faculty" value={user.foculty} helper="Faculty information" tone="emerald" isEmpty={!user.foculty} onEmptyAction={handleEditClick} />
                <FieldCard icon={Shield} label="Role" value={user.role?.charAt(0).toUpperCase() + user.role?.slice(1)} helper={user.role === "student" ? "Undergraduate member" : "Academic member"} tone="violet" />
                <FieldCard icon={Award} label="Trust Points" value={String(user.trustPoints || 0)} helper="Earned from successful verified handovers" tone="emerald" />
                <FieldCard icon={Shield} label="Successful Returns" value={String(user.successfulReturns || 0)} helper="Completed handovers with both codes verified" tone="amber" />
              </div>

              {/* Right: Account Details + Actions */}
              <div className="space-y-3 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700"><User className="h-4 w-4" /></span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-slate-900">Account Details</h3>
                    <p className="text-xs text-slate-500">Personal and membership info</p>
                  </div>
                </div>
                <FieldCard icon={Mail} label="Email" value={user.email} helper="Primary email address" tone="slate" />
                <FieldCard icon={Phone} label="WhatsApp" value={user.whatsappPhone} helper="For handover and chat notifications" tone="emerald" isEmpty={!user.whatsappPhone} onEmptyAction={handleEditClick} />
                <FieldCard icon={Calendar} label="Member Since" value={formatDate(user.createdAt)} helper="Account creation date" tone="amber" />

                <div className="space-y-2 pt-2">
                  <button onClick={handleEditClick} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800">
                    <Edit2 className="h-4 w-4" /> Edit Profile
                  </button>
                  <Link to="/change-password" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    <KeyRound className="h-4 w-4" /> Change Password
                  </Link>
                  <Link to="/my-items" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-100">
                    <Layers className="h-4 w-4" /> My Items
                  </Link>
                  <Link to="/my-flags" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    <Flag className="h-4 w-4" /> My Reports
                  </Link>
                  <Link to="/leaderboard" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 text-sm font-semibold text-amber-800 transition hover:bg-amber-100">
                    <Trophy className="h-4 w-4" /> Trust Leaderboard
                  </Link>
                  <button onClick={handleLogout} disabled={isLoggingOut}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                    {isLoggingOut ? "Logging out..." : "Log Out"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
