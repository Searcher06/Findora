import { Api } from "@/lib/axios";
export const getUsersToChat = async () => {
  const { data } = await Api.get("/chat/users");
  return data;
};
export const sendMessage = async (requestId, username, message) => {
  const { data } = await Api.post(`/chat/${requestId}/${username}`, message);
  return data;
};
export const getMessages = async (requestId, username) => {
  const { data } = await Api.get(`chat/${requestId}/${username}`);
  return data;
};
