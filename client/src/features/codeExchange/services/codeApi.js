import { Api } from "@/lib/axios";

export const handleItem = async (requestId, code) => {
  const { data } = await Api.post(`/request/handle/${requestId}`, code);
  return data;
};
