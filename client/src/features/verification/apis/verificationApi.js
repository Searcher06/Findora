import { Api } from "@/lib/axios";

export const sendClaim = async (id) => {
  const { data } = await Api.post(`/request/claim/${id}`);
  return data;
};
