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
import { RefreshCw } from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "items", label: "Items" },
  { id: "requests", label: "Requests" },
  { id: "flags", label: "Flags" },
  { id: "logs", label: "Audit Logs" },
];

const EmptyState = ({ text }) => (
  <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
    {text}
  </div>
);

export const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  const [overview, setOverview] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  const [users, setUsers] = useState([]);
  const [usersSearch, setUsersSearch] = useState("");

  const [items, setItems] = useState([]);
  const [itemsSearch, setItemsSearch] = useState("");

  const [requests, setRequests] = useState([]);
  const [flags, setFlags] = useState([]);
  const [logs, setLogs] = useState([]);

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
      { label: "Total Users", value: overview.users?.total ?? 0 },
      { label: "Suspended Users", value: overview.users?.suspended ?? 0 },
      { label: "Total Items", value: overview.items?.total ?? 0 },
      { label: "Hidden Items", value: overview.items?.hidden ?? 0 },
      { label: "Pending Requests", value: overview.requests?.pending ?? 0 },
      { label: "Returned Items", value: overview.handovers?.returnedItems ?? 0 },
      {
        label: "Return Success Rate",
        value: `${analytics.requests?.returnSuccessRate ?? 0}%`,
      },
      { label: "Open Flags", value: overview.moderation?.openFlags ?? 0 },
    ];
  }, [overview, analytics]);

  const handleSuspend = async (userId) => {
    const reason = window.prompt("Suspension reason (optional):") || "";
    try {
      await suspendUserByAdmin(userId, reason);
      toast.success("User suspended");
      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to suspend user");
    }
  };

  const handleReactivate = async (userId) => {
    try {
      await reactivateUserByAdmin(userId);
      toast.success("User reactivated");
      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reactivate user");
    }
  };

  const handleHideItem = async (itemId) => {
    const reason = window.prompt("Reason for hiding this item:") || "";
    try {
      await hideItemByAdmin(itemId, reason);
      toast.success("Item hidden");
      loadItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to hide item");
    }
  };

  const handleUnhideItem = async (itemId) => {
    try {
      await unhideItemByAdmin(itemId);
      toast.success("Item restored");
      loadItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to restore item");
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Delete this item permanently?")) return;
    try {
      await deleteItemByAdmin(itemId);
      toast.success("Item deleted");
      loadItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete item");
    }
  };

  const handleForceCloseRequest = async (requestId) => {
    const reason = window.prompt("Reason for force-close:") || "";
    try {
      await forceCloseRequestByAdmin(requestId, reason);
      toast.success("Request force-closed");
      loadRequests();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to close request");
    }
  };

  const handleFlagStatus = async (flagId, status) => {
    const adminNote =
      window.prompt("Optional admin note for this update:") || undefined;
    try {
      await reviewFlagByAdmin(flagId, { status, adminNote });
      toast.success("Flag updated");
      loadFlags();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update flag");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50/30 to-white px-3 pb-10 pt-3 sm:px-5 md:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <section className="rounded-3xl border border-sky-100 bg-[linear-gradient(135deg,#f8fbff_0%,#eef5ff_54%,#f7f9ff_100%)] px-5 py-7 shadow-[0_35px_90px_-70px_rgba(37,99,235,0.6)] sm:px-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="inline-flex rounded-full border border-sky-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700">
                Findora Admin
              </p>
              <h1 className="mt-3 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Moderate users, items, requests, and trust operations.
              </p>
            </div>

            <button
              onClick={refreshTab}
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </section>

        <div className="mt-4 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <section className="mt-4 rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)] sm:p-5">
          {activeTab === "overview" ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {cards.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState text="No analytics data yet." />
                </div>
              ) : (
                cards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {card.label}
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold text-slate-900">
                      {card.value}
                    </p>
                  </div>
                ))
              )}
            </div>
          ) : null}

          {activeTab === "users" ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <input
                  value={usersSearch}
                  onChange={(e) => setUsersSearch(e.target.value)}
                  placeholder="Search by name, username, or email"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100 sm:max-w-md"
                />
                <button
                  type="button"
                  onClick={loadUsers}
                  className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
              {users.length === 0 ? (
                <EmptyState text="No users found." />
              ) : (
                <div className="space-y-2">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {user.firstName} {user.lastName} (@{user.username})
                          </p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                          <p className="mt-1 text-xs text-slate-600">
                            role: {user.role} • status:{" "}
                            {user.isSuspended ? "suspended" : "active"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {user.isSuspended ? (
                            <button
                              type="button"
                              onClick={() => handleReactivate(user._id)}
                              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
                            >
                              Reactivate
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSuspend(user._id)}
                              className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white"
                            >
                              Suspend
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {activeTab === "items" ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <input
                  value={itemsSearch}
                  onChange={(e) => setItemsSearch(e.target.value)}
                  placeholder="Search items by name, location, description"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100 sm:max-w-md"
                />
                <button
                  type="button"
                  onClick={loadItems}
                  className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
              {items.length === 0 ? (
                <EmptyState text="No items found." />
              ) : (
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">
                            {item.category} • {item.location} • {item.status}
                          </p>
                          <p className="mt-1 text-xs text-slate-600">
                            hidden: {item.isHidden ? "yes" : "no"}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.isHidden ? (
                            <button
                              type="button"
                              onClick={() => handleUnhideItem(item._id)}
                              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
                            >
                              Unhide
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleHideItem(item._id)}
                              className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white"
                            >
                              Hide
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item._id)}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {activeTab === "requests" ? (
            requests.length === 0 ? (
              <EmptyState text="No requests available." />
            ) : (
              <div className="space-y-2">
                {requests.map((request) => (
                  <div
                    key={request._id}
                    className="rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {request.itemId?.name || "Unknown item"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {request.requestType} • {request.status}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          {request.finderId?.username} ↔ {request.claimerId?.username}
                        </p>
                      </div>
                      {request.status !== "returned" && request.status !== "closed" ? (
                        <button
                          type="button"
                          onClick={() => handleForceCloseRequest(request._id)}
                          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
                        >
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
              <div className="space-y-2">
                {flags.map((flag) => (
                  <div
                    key={flag._id}
                    className="rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                      {flag.targetType} • {flag.status}
                    </p>
                    <p className="mt-2 text-sm text-slate-800">{flag.reason}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleFlagStatus(flag._id, "in_review")}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                      >
                        In Review
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFlagStatus(flag._id, "resolved")}
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Resolve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFlagStatus(flag._id, "dismissed")}
                        className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Dismiss
                      </button>
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
              <div className="space-y-2">
                {logs.map((log) => (
                  <div
                    key={log._id}
                    className="rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <p className="text-sm font-semibold text-slate-900">{log.action}</p>
                    <p className="text-xs text-slate-500">
                      {log.targetType} •{" "}
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      by @{log.adminId?.username || "unknown"}
                    </p>
                  </div>
                ))}
              </div>
            )
          ) : null}
        </section>
      </div>
    </div>
  );
};
