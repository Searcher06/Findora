import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { getAllRequests } from "../api/notificationApi";
import NotificationSkeleton from "../components/NotificationSkeleton";
import {
  Bell,
  MessageSquare,
  CheckCircle2,
  Clock,
  Package,
  XCircle,
  ShieldCheck,
  ChevronRight,
  Inbox,
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
          ? `"${item}" — review the request and accept or wait.`
          : `You started a conversation about "${item}".`,
        action: { label: "Open Chat", to: chatLink },
      };
    } else {
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
  }

  if (req.status === "accepted") {
    return {
      icon: CheckCircle2,
      color: "emerald",
      title: isFinder ? `You accepted a claim for "${item}"` : `Your claim for "${item}" was accepted!`,
      body: isFinder
        ? `Exchange your handover codes with ${other} to complete the return.`
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
  indigo: { bg: "bg-indigo-100", icon: "text-indigo-700", border: "border-indigo-100", btn: "bg-indigo-700 hover:bg-indigo-800" },
  amber:  { bg: "bg-amber-100",  icon: "text-amber-700",  border: "border-amber-100",  btn: "bg-amber-600 hover:bg-amber-700" },
  emerald:{ bg: "bg-emerald-100",icon: "text-emerald-700",border: "border-emerald-100",btn: "bg-emerald-600 hover:bg-emerald-700" },
  rose:   { bg: "bg-rose-100",   icon: "text-rose-700",   border: "border-rose-100",   btn: "bg-rose-600 hover:bg-rose-700" },
  slate:  { bg: "bg-slate-100",  icon: "text-slate-700",  border: "border-slate-200",  btn: "bg-slate-700 hover:bg-slate-800" },
};

const NotifCard = ({ req, userId }) => {
  const cfg = getConfig(req, userId);
  const c = colorMap[cfg.color] || colorMap.slate;
  const Icon = cfg.icon;

  return (
    <div className={`flex items-start gap-3 rounded-2xl border ${c.border} bg-white p-4 shadow-sm transition hover:shadow-md`}>
      <span className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.bg}`}>
        <Icon className={`h-5 w-5 ${c.icon}`} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-slate-900 leading-snug">{cfg.title}</p>
          <span className="shrink-0 text-[11px] text-slate-400">{timeAgo(req.updatedAt)}</span>
        </div>
        <p className="mt-1 text-xs text-slate-500 leading-relaxed">{cfg.body}</p>

        <div className="mt-3 flex items-center gap-3">
          {cfg.action && (
            <Link
              to={cfg.action.to}
              className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-white transition ${c.btn}`}
            >
              {cfg.action.label === "Open Chat" ? <MessageSquare className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              {cfg.action.label}
            </Link>
          )}
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${c.bg} ${c.icon}`}>
            {req.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export function NotificationsPage() {
  const user = useAuthStore((state) => state.user);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllRequests()
      .then((data) => setRequests(Array.isArray(data) ? data : []))
      .catch((err) => setError(err?.response?.data?.message || "Failed to load notifications"))
      .finally(() => setLoading(false));
  }, []);

  const sorted = [...requests].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-50 via-slate-100/50 to-white px-3 pb-10 pt-3 sm:px-5 md:px-6">
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-2xl">
        {/* Header */}
        <section className="rounded-2xl border border-indigo-100 bg-[linear-gradient(135deg,#faf9ff_0%,#f3f0ff_54%,#f8f7ff_100%)] px-4 py-5 shadow-[0_25px_70px_-50px_rgba(79,70,229,0.5)] sm:rounded-3xl sm:px-6 sm:py-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
              <Bell className="h-5 w-5 text-indigo-700" />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">Notifications</h1>
              <p className="text-xs text-slate-500 sm:text-sm">All activity across your requests</p>
            </div>
          </div>
        </section>

        {/* Feed */}
        <div className="mt-4 space-y-3">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <NotificationSkeleton key={i} />)
          ) : error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">{error}</div>
          ) : sorted.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 py-16 text-center">
              <Inbox className="h-10 w-10 text-slate-400" />
              <p className="text-sm font-semibold text-slate-600">No notifications yet</p>
              <p className="text-xs text-slate-400">Activity from your claims and found requests will appear here.</p>
            </div>
          ) : (
            sorted.map((req) => (
              <NotifCard key={req._id} req={req} userId={user?._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
