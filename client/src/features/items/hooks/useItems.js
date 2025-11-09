import { useEffect, useState } from "react";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  getFoundItems,
  getItemInfo,
  getLostItems,
} from "../api/itemApi";
export const useItems = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  fetch items when page loads
  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const data = await getAllItems();
        setItems(data);
      } catch (error) {
        setError(error.response?.data?.message || "failed to load items");
        setItems(null);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const createAnItem = async (itemData) => {
    try {
      setLoading(true);
      const data = await createItem(itemData);
      setItems(data);
    } catch (error) {
      setError(error.response?.data?.message || "failed to create item");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateAnItem = async (itemData) => {
    try {
      setLoading(true);
      const data = await updateItem(itemData);
      setItems(data);
    } catch (error) {
      setError(error.response?.data?.message || "failed to update item");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAnItem = async (id) => {
    try {
      setLoading(true);
      const data = await deleteItem(id);
      setItems(data);
    } catch (error) {
      setError(error.response?.data?.message || "failed to delete item");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllFoundItems = async () => {
    try {
      setLoading(true);
      const data = await getFoundItems();
      setItems(data);
    } catch (error) {
      setError(error.response?.data?.message || "failed to get found items");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAll_LostItems = async () => {
    try {
      setLoading(true);
      const data = await getLostItems();
      setItems(data);
    } catch (error) {
      setError(error.response?.data?.message || "failed to get lost items");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getFullItemInfo = async (id) => {
    try {
      setLoading(true);
      const data = await getItemInfo(id);
      setItems(data);
    } catch (error) {
      setError(error.response?.data?.message || "failed to get item info");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    items,
    createAnItem,
    updateAnItem,
    deleteAnItem,
    getAllFoundItems,
    getAll_LostItems,
    getFullItemInfo,
  };
};
