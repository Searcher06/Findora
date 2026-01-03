import { Api } from "@/lib/axios";

export const getRequestById = async (requestId) => {
  const { data } = await Api.get(`request/${requestId}`);
  return data;
};
export const sendClaim = async (itemId) => {
  const { data } = await Api.post(`/request/claim/${itemId}`);
  return data;
};
export const sendFound = async (itemId) => {
  const { data } = await Api.post(`/request/found/${itemId}`);
  return data;
};
export const acceptClaim = async (requestId) => {
  const { data } = await Api.post(`/request/accept/${requestId}`);
  return data;
};
