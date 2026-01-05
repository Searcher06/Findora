import { Api } from "@/lib/axios";

export const handleItem = async (requestId, code) => {
  const { data } = Api.post(`/request/handle/${requestId}`, code);
  return data;
};
