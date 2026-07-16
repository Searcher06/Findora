import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { getAllRequests } from "../api/notificationApi";
import NotificationSkeleton from "../components/NotificationSkeleton";
import {
  Bell, MessageSquare, CheckCircle2, Clock,
  Package, XCircle, ShieldCheck, ChevronRight, Inbox, RefreshCw,
} from "lucide-react";

const timeAgo = (dateString) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
};

const getConfig = (req, userId) => {
  const isFinder = req.finderId?._id === userId || req.finderId === userId;
  const item = req.itemId?.name || "your item";
  const other = isFinder
    ? `${req.claimerId?.firstName || ""} ${req.claimerId?.lastName || ""}`.trim()
    : `${req.finderId?.firstName || ""} ${req.finderId?.lastName || ""}`.trim();

  const chatLink = `/chat/${req._id}/${isFinder ? req.claimerId?.username : req.finderId?.username}`;
  const handoverLink = `/handover/${req._id}`;

  if (req.status === "pending") {
    if (isFinder) {
      return {
        icon: Package,
        color: "indigo",
        title: req.requestType === "claim"
          ? `${other} claimed your item`
          : `You reached out about "${item}"`,
        body: req.requestType === "claim"
          ? `"${item}" — review and accept or decline.`
          : `You started a conversation about "${item}".`,
        action: { label: "Open Chat", to: chatLink },
      };
    }
    return {
      icon: Clock,
      color: "amber",
      title: req.requestType === "claim"
        ? `Your claim on "${item}" is pending`
        : `${other} found "${item}"`,
      body: req.requestType === "claim"
        ? `Waiting for ${other} to review your request.`
        : `${other} reached out — check the conversation.`,
      action: { label: "Open Chat", to: chatLink },
    };
  }

  if (req.status === "accepted") {
    return {
      icon: CheckCircle2,
      color: "emerald",
      title: isFinder ? `You accepted a claim for "${item}"` : `Your claim for "${item}" was accepted!`,
      body: isFinder
        ? `Exchange handover codes with ${other} to complete the return.`
        : `${other} accepted your claim. Exchange codes to complete the handover.`,
      action: { label: "Verify Handover", to: handoverLink },
    };
  }

  if (req.status === "returned") {
    return {
      icon: ShieldCheck,
      color: "emerald",
      title: `Handover complete — "${item}"`,
      body: `You earned 10 trust points for this successful return. Well done!`,
      action: null,
    };
  }

  if (req.status === "closed") {
    return {
      icon: XCircle,
      color: "rose",
      title: `Request closed — "${item}"`,
      body: req.closeReason || "This request was closed by an admin.",
      action: null,
    };
  }

  return {
    icon: Bell,
    color: "slate",
    title: `Update on "${item}"`,
    body: "There's an update on one of your requests.",
    action: { label: "View", to: chatLink },
  };
};

const colorMap = {
  indigo:  { bg: "bg-indigo-100",  icon: "text-indigo-700",  badge: "bg-indigo-50 text-indigo-600 border-indigo-200",  btn: "bg-indigo-600" },
  amber:   { bg: "bg-amber-100",   icon: "text-amber-700",   badge: "bg-amber-50 text-amber-600 border-amber-200",     btn: "bg-amber-500"  },
  emerald: { bg: "bg-emerald-100", icon: "text-emerald-700", badge: "bg-emerald-50 text-emerald-600 border-emerald-200", btn: "bg-emerald-600" },
  rose:    { bg: "bg-rose-100",    icon: "text-rose-700",    badge: "bg-rose-50 text-rose-600 border-rose-200",        btn: "bg-rose-600"   },
  slate:   { bg: "bg-slate-100",   icon: "text-slate-600",   badge: "bg-slate-50 text-slate-600 border-slate-200",     btn: "bg-slate-700"  },
};

const NotifItem = ({ req, userId }) => {
  const cfg = getConfig(req, userId);
  const c = colorMap[cfg.color] || colorMap.slate;
  const Icon = cfg.icon;

  return (
    <div className="flex items-start gap-3 px-4 py-4">
      <span className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${c.bg}`}>
        <Icon className={`h-5 w-5 ${c.icon}`} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-slate-900 leading-snug">{cfg.title}</p>
          <span className="shrink-0 text-[11px] text-slate-400 mt-0.5">{timeAgo(req.updatedAt)}</span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{cfg.body}</p>
        <div className="mt-2.5 flex items-center gap-2">
          {cfg.action && (
            <Link to={cfg.action.to}
              className={`inline-flex h-7 items-center gap-1 rounded-full px-3 text-[11px] font-semibold text-white transition active:scale-95 ${c.btn}`}>
              {cfg.action.label === "Open Chat" ? <MessageSquare className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              {cfg.action.label}
            </Link>
          )}
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${c.badge}`}>
            {req.status}
          </span>
        </div>
      </div>
    </div>
  );
};

// Desktop card version
const NotifCard = ({ req, userId }) => {
  const cfg = getConfig(req, userId);
  const c = colorMap[cfg.color] || colorMap.slate;
  const Icon = cfg.icon;

  return (
    <div className={`flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${c.badge.includes("indigo") ? "border-indigo-100" : c.badge.includes("amber") ? "border-amber-100" : c.badge.includes("emerald") ? "border-emerald-100" : c.badge.includes("rose") ? "border-rose-100" : "border-slate-200"}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${c.bg}`}>
          <Icon className={`h-5 w-5 ${c.icon}`} />
        </span>
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold capitalize ${c.badge}`}>
          {req.status}
        </span>
      </div>
      <p className="text-sm font-bold text-slate-900 leading-snug flex-1">{cfg.title}</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-500 flex-1">{cfg.body}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">{timeAgo(req.updatedAt)}</span>
        {cfg.action && (
          <Link to={cfg.action.to}
            className={`inline-flex h-8 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-white transition hover:opacity-90 ${c.btn}`}>
            {cfg.action.label === "Open Chat" ? <MessageSquare className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            {cfg.action.label}
          </Link>
        )}
      </div>
    </div>
  );
};

export function NotificationsPage() {
  const user = useAuthStore((state) => state.user);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    setError("");
    getAllRequests()
      .then((data) => setRequests(Array.isArray(data) ? data : []))
      .catch((err) => setError(err?.response?.data?.message || "Failed to load notifications"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const sorted = [...requests].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sticky header - mobile only */}
      <div className="sticky top-14 z-10 flex items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 py-3.5 backdrop-blur-xl md:top-16 lg:hidden">
        <div>
          <h1 className="font-display text-lg font-bold text-slate-900">Notifications</h1>
          <p className="text-xs text-slate-400">Activity across your requests</p>
        </div>
        <button type="button" onClick={load} aria-label="Refresh"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-indigo-600" : ""}`} />
        </button>
      </div>

      {/* Desktop header */}
      <div className="hidden lg:block px-8 pt-8 pb-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Notifications</h1>
            <p className="text-sm text-slate-500 mt-1">All activity across your requests</p>
          </div>
          <button type="button" onClick={load} aria-label="Refresh"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-indigo-600" : ""}`} />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="mx-auto max-w-2xl px-3 lg:max-w-5xl lg:px-8">
        {loading ? (
          <div className="mt-3 overflow-hidden rounded-2xl bg-white divide-y divide-slate-100 shadow-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <NotificationSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              <Inbox className="h-7 w-7 text-indigo-400" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900">No notifications yet</h3>
              <p className="mt-1 max-w-xs text-sm text-slate-500">
                Activity from your claims and found requests will appear here.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile: single column feed */}
            <div className="mt-3 overflow-hidden rounded-2xl bg-white divide-y divide-slate-100 shadow-sm lg:hidden">
              {sorted.map((req) => (
                <NotifItem key={req._id} req={req} userId={user?._id} />
              ))}
            </div>

            {/* Desktop: card grid */}
            <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
              {sorted.map((req) => (
                <NotifCard key={req._id} req={req} userId={user?._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
