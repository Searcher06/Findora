import { Api, Api2 } from "@/lib/axios";

export const createItem = async (itemData) => {
  const { data } = await Api2.post("/items", itemData);
  return data;
};

export const updateItem = async (id, itemData) => {
  const { data } = await Api2.patch(`/items/${id}`, itemData);
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

export const getFilteredItems = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.category && filters.category !== "all") {
    params.append("category", filters.category);
  }

  if (filters.date && filters.date !== "latest") {
    params.append("date", filters.date);
  }

  const queryString = params.toString();
  const url = queryString ? `/items?${queryString}` : "/items";

  const { data } = await Api.get(url);
  return data;
};
