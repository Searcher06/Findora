import { Api } from "@/lib/axios";

export const createItem = async (itemData) => {
  const { data } = await Api.post("/items", itemData);
  return data;
};

export const updateItem = async (id, itemData) => {
  const { data } = await Api.patch(`/items/${id}`, itemData);
  return data;
};

export const deleteItem = async (id) => {
  const { data } = await Api.delete(`/items/${id}`);
  return data;
};

export const getAllItems = async () => {
  const { data } = await Api.get(`/items`);
  return data;
};

export const getLostItems = async () => {
  const { data } = await Api.get(`/items/lost`);
  return data;
};

export const getFoundItems = async () => {
  const { data } = await Api.get(`/items/found`);
  return data;
};

export const getItemInfo = async (id) => {
  const { data } = await Api.get(`/items/${id}`);
  return data;
};
