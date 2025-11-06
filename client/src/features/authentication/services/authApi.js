import { Api } from "@/lib/axios";

export const loginUser = async (credentials) => {
  const { data } = await Api.post("/user/login", credentials);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await Api.post("/user/sign-up", userData);
  return data;
};

export const logoutUser = async () => {
  await Api.post("/user/sign-out");
};

export const getCurrentUser = async () => {
  const { data } = await Api.get("/user");
  return data;
};
