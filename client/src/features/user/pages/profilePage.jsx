import { useMemo, useState, useEffect } from "react";
import {
  User, Mail, Calendar, GraduationCap, BookOpen, Shield, Award,
  Loader2, Edit2, LogOut, KeyRound, Flag, Trophy, Phone, Layers,
  Bell, BellOff, BellRing, ChevronRight, Plus,
} from "lucide-react";
import { requestPushPermission } from "@/hooks/usePushNotifications";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

// ── Tappable row (used for nav links on mobile) ──────────────────────────────
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

// ── Push notification row ────────────────────────────────────────────────────
const PushRow = () => {
  const [permission, setPermission] = useState(
    "Notification" in window ? Notification.permission : "unsupported"
  );
  const [loading, setLoading] = useState(false);

  if (permission === "unsupported") return null;

  const handleEnable = async () => {
    setLoading(true);
    const granted = await requestPushPermission();
    setPermission(granted ? "granted" : "denied");
    setLoading(false);
  };

  if (permission === "granted") {
    return (
      <Row icon={BellRing} label="Push Notifications" sublabel="Enabled" iconBg="bg-emerald-100" iconColor="text-emerald-700" />
    );
  }
  if (permission === "denied") {
    return (
      <Row icon={BellOff} label="Push Notifications" sublabel="Blocked — enable in browser settings" iconBg="bg-rose-100" iconColor="text-rose-600" />
    );
  }
  return (
    <Row
      icon={Bell}
      label="Enable Push Notifications"
      sublabel="Get notified about claims and handovers"
      iconBg="bg-indigo-100"
      iconColor="text-indigo-700"
      onClick={loading ? undefined : handleEnable}
    />
  );
};

// ── Main profile page ────────────────────────────────────────────────────────
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

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <User className="h-14 w-14 text-slate-300" />
        <p className="font-semibold text-slate-700">No user found</p>
        <Link to="/login" className="text-sm font-semibold text-indigo-600">Go to login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-6">

      {/* ── Avatar + name hero ── */}
      <div className="bg-white px-4 pb-5 pt-5 text-center">
        <div className="relative mx-auto h-20 w-20">
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-indigo-200 bg-indigo-50">
            {user.profilePic ? (
              <img src={user.profilePic} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-9 w-9 text-indigo-400" />
              </div>
            )}
          </div>
          {/* Edit badge */}
          <button
            type="button"
            onClick={() => navigate("/profile/edit")}
            aria-label="Edit profile"
            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-white shadow-sm"
          >
            <Edit2 className="h-3 w-3" />
          </button>
        </div>

        <h1 className="mt-3 font-display text-xl font-bold text-slate-900">{accountName}</h1>
        <p className="text-sm text-slate-400">@{accountUsername}</p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-semibold capitalize text-indigo-700">
            {user.role}
          </span>
          {user.hasVerifiedReturnBadge && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-700">
              <Award className="h-3 w-3" /> Verified Return
            </span>
          )}
        </div>

        {/* Trust stats row */}
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

      {/* ── Account info ── */}
      <div className="mt-3 overflow-hidden rounded-2xl bg-white divide-y divide-slate-100 mx-3">
        <Divider label="Account" />
        <Row icon={Mail} label={user.email} sublabel="Email address" iconBg="bg-slate-100" iconColor="text-slate-500" />
        {user.whatsappPhone ? (
          <Row icon={Phone} label={user.whatsappPhone} sublabel="WhatsApp" iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        ) : (
          <Row icon={Phone} label="Add WhatsApp number" sublabel="For handover notifications" iconBg="bg-slate-100" iconColor="text-slate-400" to="/profile/edit" />
        )}
        {user.department ? (
          <Row icon={BookOpen} label={user.department} sublabel="Department" iconBg="bg-blue-100" iconColor="text-blue-600" />
        ) : (
          <Row icon={BookOpen} label="Add department" sublabel="Complete your profile" iconBg="bg-slate-100" iconColor="text-slate-400" to="/profile/edit" />
        )}
        {user.foculty ? (
          <Row icon={GraduationCap} label={user.foculty} sublabel="Faculty" iconBg="bg-violet-100" iconColor="text-violet-600" />
        ) : (
          <Row icon={GraduationCap} label="Add faculty" sublabel="Complete your profile" iconBg="bg-slate-100" iconColor="text-slate-400" to="/profile/edit" />
        )}
      </div>

      {/* ── Navigation ── */}
      <div className="mt-3 overflow-hidden rounded-2xl bg-white divide-y divide-slate-100 mx-3">
        <Divider label="Navigation" />
        <Row icon={Edit2} label="Edit Profile" iconBg="bg-slate-100" iconColor="text-slate-600" to="/profile/edit" />
        <Row icon={KeyRound} label="Change Password" iconBg="bg-amber-100" iconColor="text-amber-600" to="/change-password" />
        <Row icon={Layers} label="My Items" iconBg="bg-indigo-100" iconColor="text-indigo-600" to="/my-items" />
        <Row icon={Flag} label="My Reports" iconBg="bg-slate-100" iconColor="text-slate-600" to="/my-flags" />
        <Row icon={Trophy} label="Trust Leaderboard" iconBg="bg-amber-100" iconColor="text-amber-600" to="/leaderboard" />
      </div>

      {/* ── Notifications ── */}
      <div className="mt-3 overflow-hidden rounded-2xl bg-white divide-y divide-slate-100 mx-3">
        <Divider label="Notifications" />
        <PushRow />
      </div>

      {/* ── Danger zone ── */}
      <div className="mt-3 overflow-hidden rounded-2xl bg-white mx-3">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 px-4 py-3.5 transition active:bg-rose-50 disabled:opacity-60"
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100">
            {isLoggingOut
              ? <Loader2 className="h-4 w-4 animate-spin text-red-600" />
              : <LogOut className="h-4 w-4 text-red-600" />}
          </span>
          <p className="text-sm font-semibold text-red-600">
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </p>
        </button>
      </div>

      {/* ── Desktop layout — keep original card-based layout ── */}
      {/* The above is the mobile layout. Desktop gets padding from sidebar, this is fine as-is. */}
    </div>
  );
}
