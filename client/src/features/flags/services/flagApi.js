import { Api } from "@/lib/axios";

export const createFlag = async (payload) => {
  const { data } = await Api.post("/flags", payload);
  return data;
};

export const getMyFlags = async () => {
  const { data } = await Api.get("/flags/mine");
  return data;
};
