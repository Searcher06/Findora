import { Api } from "@/lib/axios";
export const getAllRequests = async () => {
  const { data } = await Api.get(`/request`);
  return data;
};
