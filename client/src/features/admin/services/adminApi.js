import { Api } from "@/lib/axios";

const buildQuery = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      query.append(key, String(value));
    }
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};

export const getAdminOverview = async () => {
  const { data } = await Api.get("/admin/overview");
  return data;
};

export const getAdminAnalytics = async () => {
  const { data } = await Api.get("/admin/analytics");
  return data;
};

export const getAdminUsers = async (params = {}) => {
  const { data } = await Api.get(`/admin/users${buildQuery(params)}`);
  return data;
};

export const suspendUserByAdmin = async (userId, reason) => {
  const { data } = await Api.patch(`/admin/users/${userId}/suspend`, { reason });
  return data;
};

export const reactivateUserByAdmin = async (userId) => {
  const { data } = await Api.patch(`/admin/users/${userId}/reactivate`);
  return data;
};

export const getAdminItems = async (params = {}) => {
  const { data } = await Api.get(`/admin/items${buildQuery(params)}`);
  return data;
};

export const hideItemByAdmin = async (itemId, reason) => {
  const { data } = await Api.patch(`/admin/items/${itemId}/hide`, { reason });
  return data;
};

export const unhideItemByAdmin = async (itemId) => {
  const { data } = await Api.patch(`/admin/items/${itemId}/unhide`);
  return data;
};

export const deleteItemByAdmin = async (itemId) => {
  const { data } = await Api.delete(`/admin/items/${itemId}`);
  return data;
};

export const getAdminRequests = async (params = {}) => {
  const { data } = await Api.get(`/admin/requests${buildQuery(params)}`);
  return data;
};

export const forceCloseRequestByAdmin = async (requestId, reason) => {
  const { data } = await Api.patch(`/admin/requests/${requestId}/force-close`, {
    reason,
  });
  return data;
};

export const getAdminFlags = async (params = {}) => {
  const { data } = await Api.get(`/admin/flags${buildQuery(params)}`);
  return data;
};

export const reviewFlagByAdmin = async (flagId, payload) => {
  const { data } = await Api.patch(`/admin/flags/${flagId}`, payload);
  return data;
};

export const getAdminAuditLogs = async (params = {}) => {
  const { data } = await Api.get(`/admin/audit-logs${buildQuery(params)}`);
  return data;
};
