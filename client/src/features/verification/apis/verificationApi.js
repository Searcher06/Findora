import { Api } from "@/lib/axios";

export const sendClaim = async (id) => {
  const { data } = await Api.post(`/request/claim/${id}`);
  return data;
};
export const sendFound = async (id) => {
  const { data } = await Api.post(`/request/found/${id}`);
  return data;
};
