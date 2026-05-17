import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  getAdminAnalytics,
  getAdminAuditLogs,
  getAdminFlags,
  getAdminItems,
  getAdminOverview,
  getAdminRequests,
  getAdminUsers,
  hideItemByAdmin,
  reactivateUserByAdmin,
  reviewFlagByAdmin,
  suspendUserByAdmin,
  unhideItemByAdmin,
  forceCloseRequestByAdmin,
  deleteItemByAdmin,
} from "../services/adminApi";
import {
  AlertTriangle,
  BarChart3,
  FileSearch,
  Flag,
  LayoutDashboard,
  RefreshCw,
  Shield,
  ShieldAlert,
  Trash2,
  UserCheck,
  UserX,
  Users,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "items", label: "Items", icon: Shield },
  { id: "requests", label: "Requests", icon: FileSearch },
  { id: "flags", label: "Flags", icon: Flag },
  { id: "logs", label: "Audit Logs", icon: BarChart3 },
];

const EmptyState = ({ text }) => (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 px-4 py-9 text-center text-sm text-slate-500">
    {text}
  </div>
);

const ActionModal = ({
  open,
  onClose,
  title,
  description,
  inputLabel,
  inputPlaceholder,
  inputValue,
  onInputChange,
  showInput = false,
  confirmLabel,
  onConfirm,
  loading = false,
  danger = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-indigo-950/30 px-3 pb-3 sm:items-center sm:px-4 sm:pb-0">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:rounded-3xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900 sm:text-xl">{title}</h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">{description}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (loading) return;
              onClose();
            }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {showInput ? (
          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              {inputLabel}
            </span>
            <textarea
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              rows={3}
              placeholder={inputPlaceholder}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-violet-100 sm:text-sm"
            />
          </label>
        ) : null}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => {
              if (loading) return;
              onClose();
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`w-full rounded-xl px-4 py-2 text-sm font-semibold text-white transition sm:w-auto ${
              danger ? "bg-red-600 hover:bg-red-700" : "bg-indigo-700 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Working..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

const getStatusPill = (status) => {
  const map = {
    suspended: "bg-amber-100 text-amber-700",
    active: "bg-emerald-100 text-emerald-700",
    hidden: "bg-rose-100 text-rose-700",
    visible: "bg-indigo-100 text-indigo-700",
    open: "bg-amber-100 text-amber-700",
    in_review: "bg-indigo-100 text-indigo-700",
    resolved: "bg-emerald-100 text-emerald-700",
    dismissed: "bg-slate-100 text-slate-700",
    pending: "bg-amber-100 text-amber-700",
    accepted: "bg-indigo-100 text-indigo-700",
    returned: "bg-emerald-100 text-emerald-700",
    closed: "bg-slate-100 text-slate-700",
  };

  return map[status] || "bg-slate-100 text-slate-700";
};

export const AdminDashboardPage = () => {
  const { user } = useAuthStore();
  const isSuperAdmin = user?.role === "admin";

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [overview, setOverview] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  const [users, setUsers] = useState([]);
  const [usersSearch, setUsersSearch] = useState("");

  const [items, setItems] = useState([]);
  const [itemsSearch, setItemsSearch] = useState("");

  const [requests, setRequests] = useState([]);
  const [flags, setFlags] = useState([]);
  const [logs, setLogs] = useState([]);

  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    payload: null,
  });
  const [actionNote, setActionNote] = useState("");

  const loadOverview = async () => {
    const [overviewData, analyticsData] = await Promise.all([
      getAdminOverview(),
      getAdminAnalytics(),
    ]);
    setOverview(overviewData);
    setAnalytics(analyticsData);
  };

  const loadUsers = async () => {
    const data = await getAdminUsers({ search: usersSearch, limit: 30 });
    setUsers(data.users || []);
  };

  const loadItems = async () => {
    const data = await getAdminItems({ search: itemsSearch, limit: 30 });
    setItems(data.items || []);
  };

  const loadRequests = async () => {
    const data = await getAdminRequests({ limit: 30 });
    setRequests(data.requests || []);
  };

  const loadFlags = async () => {
    const data = await getAdminFlags({ limit: 30 });
    setFlags(data.flags || []);
  };

  const loadLogs = async () => {
    const data = await getAdminAuditLogs({ limit: 40 });
    setLogs(data.logs || []);
  };

  const refreshTab = async () => {
    try {
      setLoading(true);
      if (activeTab === "overview") await loadOverview();
      if (activeTab === "users") await loadUsers();
      if (activeTab === "items") await loadItems();
      if (activeTab === "requests") await loadRequests();
      if (activeTab === "flags") await loadFlags();
      if (activeTab === "logs") await loadLogs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const cards = useMemo(() => {
    if (!overview || !analytics) return [];

    return [
      {
        label: "Total Users",
        value: overview.users?.total ?? 0,
        hint: "Registered accounts",
        color: "from-indigo-600/15 to-violet-500/15 border-indigo-200",
      },
      {
        label: "Suspended Users",
        value: overview.users?.suspended ?? 0,
        hint: "Access blocked",
        color: "from-amber-500/15 to-orange-500/15 border-amber-200",
      },
      {
        label: "Total Items",
        value: overview.items?.total ?? 0,
        hint: "All submitted reports",
        color: "from-violet-500/15 to-fuchsia-500/15 border-violet-200",
      },
      {
        label: "Hidden Items",
        value: overview.items?.hidden ?? 0,
        hint: "Moderated content",
        color: "from-rose-500/15 to-red-500/15 border-rose-200",
      },
      {
        label: "Pending Requests",
        value: overview.requests?.pending ?? 0,
        hint: "Waiting for response",
        color: "from-yellow-500/15 to-amber-500/15 border-yellow-200",
      },
      {
        label: "Returned Items",
        value: overview.handovers?.returnedItems ?? 0,
        hint: "Completed handovers",
        color: "from-emerald-500/15 to-teal-500/15 border-emerald-200",
      },
      {
        label: "Return Success Rate",
        value: `${analytics.requests?.returnSuccessRate ?? 0}%`,
        hint: "Requests converted to returns",
        color: "from-slate-500/15 to-indigo-500/15 border-violet-200",
      },
      {
        label: "Open Flags",
        value: overview.moderation?.openFlags ?? 0,
        hint: "Needs investigation",
        color: "from-pink-500/15 to-rose-500/15 border-pink-200",
      },
    ];
  }, [overview, analytics]);

  const openActionModal = (type, payload = {}) => {
    setActionNote("");
    setModalState({ open: true, type, payload });
  };

  const closeActionModal = () => {
    if (actionLoading) return;
    setModalState({ open: false, type: null, payload: null });
    setActionNote("");
  };

  const runModalAction = async () => {
    const { type, payload } = modalState;
    if (!type || !payload) return;

    try {
      setActionLoading(true);

      if (type === "suspend_user") {
        await suspendUserByAdmin(payload.userId, actionNote.trim());
        toast.success("User suspended");
        await loadUsers();
      }

      if (type === "delete_item") {
        await deleteItemByAdmin(payload.itemId);
        toast.success("Item deleted");
        await loadItems();
      }

      if (type === "hide_item") {
        await hideItemByAdmin(payload.itemId, actionNote.trim());
        toast.success("Item hidden");
        await loadItems();
      }

      if (type === "force_close") {
        await forceCloseRequestByAdmin(payload.requestId, actionNote.trim());
        toast.success("Request force-closed");
        await loadRequests();
      }

      if (type === "review_flag") {
        await reviewFlagByAdmin(payload.flagId, {
          status: payload.status,
          adminNote: actionNote.trim() || undefined,
        });
        toast.success("Flag updated");
        await loadFlags();
      }

      closeActionModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  const modalConfig = useMemo(() => {
    const payload = modalState.payload || {};

    if (modalState.type === "suspend_user") {
      return {
        title: "Suspend User",
        description: `Suspend @${payload.username || "user"}. They will be blocked from protected actions until reactivated.`,
        showInput: true,
        inputLabel: "Suspension Reason (Optional)",
        inputPlaceholder: "Example: Repeated spam reports and policy violations.",
        confirmLabel: "Suspend User",
        danger: true,
      };
    }

    if (modalState.type === "delete_item") {
      return {
        title: "Delete Item Permanently",
        description: `This will permanently remove "${payload.itemName || "this item"}". This action cannot be undone.`,
        showInput: false,
        confirmLabel: "Delete Item",
        danger: true,
      };
    }

    if (modalState.type === "hide_item") {
      return {
        title: "Hide Item",
        description: `Hide "${payload.itemName || "this item"}" from normal users while retaining it for moderation context.`,
        showInput: true,
        inputLabel: "Moderation Note (Optional)",
        inputPlaceholder: "Example: Potential scam listing under investigation.",
        confirmLabel: "Hide Item",
        danger: true,
      };
    }

    if (modalState.type === "force_close") {
      return {
        title: "Force Close Request",
        description: "Close this request manually. This is useful for policy violations or stale conflict cases.",
        showInput: true,
        inputLabel: "Close Reason (Optional)",
        inputPlaceholder: "Example: Verification failed after repeated attempts.",
        confirmLabel: "Force Close",
        danger: true,
      };
    }

    if (modalState.type === "review_flag") {
      return {
        title: "Update Flag Status",
        description: `Set this report to ${String(payload.status || "").replace("_", " ")}. Optionally include a moderation note.`,
        showInput: true,
        inputLabel: "Admin Note (Optional)",
        inputPlaceholder: "Example: Marked resolved after checking account and item history.",
        confirmLabel: "Update Flag",
        danger: false,
      };
    }

    return null;
  }, [modalState]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,#ede9fe_0%,#f3f0ff_36%,#faf9ff_74%,#ffffff_100%)] px-2 pb-8 pt-2 sm:px-5 sm:pb-10 sm:pt-4 md:px-7">
      <div className="pointer-events-none absolute -left-24 top-28 hidden h-64 w-64 rounded-full bg-violet-200/45 blur-3xl sm:block" />
      <div className="pointer-events-none absolute -right-24 top-2 hidden h-72 w-72 rounded-full bg-indigo-200/45 blur-3xl sm:block" />

      <div className="relative mx-auto w-full max-w-7xl">
        <section className="rounded-2xl border border-indigo-100 bg-[linear-gradient(135deg,#faf9ff_0%,#ede9fe_52%,#f8f7ff_100%)] px-4 py-5 text-slate-900 shadow-[0_35px_90px_-65px_rgba(67,56,202,0.45)] sm:rounded-[28px] sm:px-8 sm:py-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-5">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">
                <ShieldAlert className="h-3.5 w-3.5" />
                Trust & Moderation
              </p>
              <img src="/iconplusfindoratext.png" alt="Findora" className="mt-3 h-9 w-auto sm:mt-4 sm:h-10" />
              <p className="mt-2 max-w-2xl text-xs text-slate-600 sm:text-base">
                Moderate reports, protect users, and keep recovery workflows healthy from one polished workspace.
              </p>
            </div>

            <button
              onClick={refreshTab}
              type="button"
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 text-sm font-semibold text-violet-700 transition hover:bg-indigo-50 sm:h-11 sm:w-auto"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh {activeTab}
            </button>
          </div>

          <div className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-3">
            <div className="rounded-xl border border-indigo-100 bg-white/85 p-3 sm:rounded-2xl sm:p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-violet-700">Your role</p>
              <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">{user?.role || "moderator"}</p>
            </div>
            <div className="rounded-xl border border-indigo-100 bg-white/85 p-3 sm:rounded-2xl sm:p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-violet-700">Open flags</p>
              <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">{overview?.moderation?.openFlags ?? "-"}</p>
            </div>
            <div className="rounded-xl border border-indigo-100 bg-white/85 p-3 sm:rounded-2xl sm:p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-violet-700">Pending requests</p>
              <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">{overview?.requests?.pending ?? "-"}</p>
            </div>
          </div>
        </section>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-4 sm:flex-wrap sm:gap-2.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${
                  isActive
                    ? "bg-indigo-700 text-white shadow-lg"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <section className="mt-3 rounded-2xl border border-white/80 bg-white/75 p-3 shadow-[0_28px_100px_-70px_rgba(15,23,42,0.8)] backdrop-blur sm:mt-4 sm:rounded-[28px] sm:p-6">
          {activeTab === "overview" ? (
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
              {cards.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState text="No analytics data yet." />
                </div>
              ) : (
                cards.map((card) => (
                  <article
                    key={card.label}
                    className={`rounded-xl border bg-gradient-to-br ${card.color} p-3 sm:rounded-2xl sm:p-4`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600 sm:text-[11px] sm:tracking-[0.14em]">
                      {card.label}
                    </p>
                    <p className="mt-1.5 font-display text-2xl font-bold text-slate-900 sm:mt-2 sm:text-3xl">{card.value}</p>
                    <p className="mt-1 text-[11px] text-slate-600 sm:text-xs">{card.hint}</p>
                  </article>
                ))
              )}
            </div>
          ) : null}

          {activeTab === "users" ? (
            <div className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <input
                  value={usersSearch}
                  onChange={(e) => setUsersSearch(e.target.value)}
                  placeholder="Search by name, username, or email"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-violet-100 sm:max-w-md"
                />
                <button
                  type="button"
                  onClick={loadUsers}
                  className="h-10 w-full rounded-xl bg-indigo-700 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
                >
                  Search
                </button>
              </div>

              {!isSuperAdmin ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  You are in moderator mode. User suspension/reactivation requires admin role.
                </div>
              ) : null}

              {users.length === 0 ? (
                <EmptyState text="No users found." />
              ) : (
                <div className="space-y-2.5">
                  {users.map((entry) => {
                    const statusText = entry.isSuspended ? "suspended" : "active";

                    return (
                      <div
                        key={entry._id}
                        className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-900 sm:text-base">
                              {entry.firstName} {entry.lastName}
                              <span className="ml-1 text-slate-500">@{entry.username}</span>
                            </p>
                            <p className="text-xs text-slate-500 sm:text-sm">{entry.email}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                                role: {entry.role}
                              </span>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusPill(statusText)}`}
                              >
                                {statusText}
                              </span>
                            </div>
                          </div>

                          {isSuperAdmin ? (
                            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                              {entry.isSuspended ? (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    try {
                                      await reactivateUserByAdmin(entry._id);
                                      toast.success("User reactivated");
                                      loadUsers();
                                    } catch (error) {
                                      toast.error(
                                        error.response?.data?.message || "Failed to reactivate user"
                                      );
                                    }
                                  }}
                                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white sm:w-auto sm:py-1.5"
                                >
                                  <UserCheck className="h-3.5 w-3.5" />
                                  Reactivate
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    openActionModal("suspend_user", {
                                      userId: entry._id,
                                      username: entry.username,
                                    })
                                  }
                                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white sm:w-auto sm:py-1.5"
                                >
                                  <UserX className="h-3.5 w-3.5" />
                                  Suspend
                                </button>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}

          {activeTab === "items" ? (
            <div className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <input
                  value={itemsSearch}
                  onChange={(e) => setItemsSearch(e.target.value)}
                  placeholder="Search items by name, location, description"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-violet-100 sm:max-w-md"
                />
                <button
                  type="button"
                  onClick={loadItems}
                  className="h-10 w-full rounded-xl bg-indigo-700 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
                >
                  Search
                </button>
              </div>

              {items.length === 0 ? (
                <EmptyState text="No items found." />
              ) : (
                <div className="space-y-2.5">
                  {items.map((entry) => {
                    const visibility = entry.isHidden ? "hidden" : "visible";

                    return (
                      <div
                        key={entry._id}
                        className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-900 sm:text-base">{entry.name}</p>
                            <p className="text-xs text-slate-500 sm:text-sm">
                              {entry.category} • {entry.location} • {entry.status}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusPill(visibility)}`}
                              >
                                {visibility}
                              </span>
                            </div>
                          </div>

                          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
                            {entry.isHidden ? (
                              <button
                                type="button"
                                onClick={async () => {
                                  try {
                                    await unhideItemByAdmin(entry._id);
                                    toast.success("Item restored");
                                    loadItems();
                                  } catch (error) {
                                    toast.error(
                                      error.response?.data?.message || "Failed to restore item"
                                    );
                                  }
                                }}
                                className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white sm:w-auto sm:py-1.5"
                              >
                                Unhide
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  openActionModal("hide_item", {
                                    itemId: entry._id,
                                    itemName: entry.name,
                                  })
                                }
                                className="w-full rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white sm:w-auto sm:py-1.5"
                              >
                                Hide
                              </button>
                            )}

                            {isSuperAdmin ? (
                              <button
                                type="button"
                                onClick={() =>
                                  openActionModal("delete_item", {
                                    itemId: entry._id,
                                    itemName: entry.name,
                                  })
                                }
                                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white sm:w-auto sm:py-1.5"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}

          {activeTab === "requests" ? (
            requests.length === 0 ? (
              <EmptyState text="No requests available." />
            ) : (
              <div className="space-y-2.5">
                {requests.map((entry) => (
                  <div
                    key={entry._id}
                    className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 sm:text-base">{entry.itemId?.name || "Unknown item"}</p>
                        <p className="text-xs text-slate-500 sm:text-sm">
                          {entry.requestType} • {entry.finderId?.username} ↔ {entry.claimerId?.username}
                        </p>
                        <span
                          className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusPill(
                            entry.status
                          )}`}
                        >
                          {entry.status}
                        </span>
                      </div>

                      {entry.status !== "returned" && entry.status !== "closed" ? (
                        <button
                          type="button"
                          onClick={() =>
                            openActionModal("force_close", {
                              requestId: entry._id,
                            })
                          }
                          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white sm:w-auto sm:py-1.5"
                        >
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Force Close
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : null}

          {activeTab === "flags" ? (
            flags.length === 0 ? (
              <EmptyState text="No flags in queue." />
            ) : (
              <div className="space-y-2.5">
                {flags.map((entry) => (
                  <div
                    key={entry._id}
                    className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                          {entry.targetType}
                        </p>
                        <p className="mt-1 text-xs text-slate-800 sm:text-sm">{entry.reason}</p>
                        <span
                          className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusPill(
                            entry.status
                          )}`}
                        >
                          {entry.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
                        <button
                          type="button"
                          onClick={() =>
                            openActionModal("review_flag", {
                              flagId: entry._id,
                              status: "in_review",
                            })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 sm:w-auto sm:py-1.5"
                        >
                          In Review
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            openActionModal("review_flag", {
                              flagId: entry._id,
                              status: "resolved",
                            })
                          }
                          className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white sm:w-auto sm:py-1.5"
                        >
                          Resolve
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            openActionModal("review_flag", {
                              flagId: entry._id,
                              status: "dismissed",
                            })
                          }
                          className="w-full rounded-lg bg-indigo-700 px-3 py-2 text-xs font-semibold text-white sm:w-auto sm:py-1.5"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : null}

          {activeTab === "logs" ? (
            logs.length === 0 ? (
              <EmptyState text="No admin logs yet." />
            ) : (
              <div className="space-y-2.5">
                {logs.map((entry) => (
                  <div
                    key={entry._id}
                    className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4"
                  >
                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                      <p className="text-sm font-semibold text-slate-900 sm:text-base">{entry.action}</p>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                        {entry.targetType}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{new Date(entry.createdAt).toLocaleString()}</p>
                    <p className="mt-1 text-xs text-slate-600">by @{entry.adminId?.username || "unknown"}</p>
                  </div>
                ))}
              </div>
            )
          ) : null}
        </section>
      </div>

      <ActionModal
        open={modalState.open && Boolean(modalConfig)}
        onClose={closeActionModal}
        title={modalConfig?.title || ""}
        description={modalConfig?.description || ""}
        showInput={modalConfig?.showInput}
        inputLabel={modalConfig?.inputLabel || ""}
        inputPlaceholder={modalConfig?.inputPlaceholder || ""}
        inputValue={actionNote}
        onInputChange={setActionNote}
        confirmLabel={modalConfig?.confirmLabel || "Confirm"}
        onConfirm={runModalAction}
        loading={actionLoading}
        danger={modalConfig?.danger}
      />
    </div>
  );
};
