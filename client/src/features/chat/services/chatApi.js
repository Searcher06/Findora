import { Api, Api2 } from "@/lib/axios";
export const getUsersToChat = async () => {
  const { data } = await Api.get("/request");
  return data;
};

// - Always use Api2 with multipart/form-data
export const sendMessage = async (requestId, username, formData) => {
  const { data } = await Api2.post(`/chat/${requestId}/${username}`, formData);
  return data;
};

export const getMessages = async (requestId, username) => {
  const { data } = await Api.get(`chat/${requestId}/${username}`);
  return data;
};

export const markAsRead = async (requestId) => {
  const { data } = await Api.patch(`/chat/read/${requestId}`);
  return data;
};
