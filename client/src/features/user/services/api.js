import { Api2 } from "@/lib/axios";
import { Api } from "@/lib/axios";

export const updateProfile = async (updatedFields) => {
  const { data } = await Api2.post("/user/profile", updatedFields);
  return data;
};

export const getTrustLeaderboard = async (limit = 20) => {
  const { data } = await Api.get(`/user/leaderboard?limit=${limit}`);
  return data;
};

export const getUserProfile = async (username) => {
  const { data } = await Api.get(`/user/${username}`);
  return data;
};

export const getUserPublicItems = async (username) => {
  const { data } = await Api.get(`/items/user/${username}`);
  return data;
};
