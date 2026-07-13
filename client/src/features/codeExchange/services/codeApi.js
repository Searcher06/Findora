import { Api } from "@/lib/axios";

export const verifyHandover = async (requestId, code) => {
  const { data } = await Api.post(`/request/verify/${requestId}`, code);
  return data;
};
