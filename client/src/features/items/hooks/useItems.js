// hooks/useItems.js - Modified version
import { useEffect, useState } from "react";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  getFoundItems,
  getItemInfo,
  getLostItems,
  getFilteredItems, // Import the new function
} from "../api/itemApi";

export const useItems = (filters = null) => {
  const [items, setItems] = useState(null);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        let data;

        if (filters) {
          // Use filtered items if filters are provided
          data = await getFilteredItems(filters);
        } else {
          // Use regular getAllItems if no filters
          data = await getAllItems();
        }

        setItems(data);
      } catch (error) {
        setError(error.response?.data?.message || "failed to load items");
        setItems(null);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, [filters]);

  const createAnItem = async (itemData) => {
    try {
      setLoading(true);
      const data = await createItem(itemData);
      setItem(data);
    } catch (error) {
      setError(error.response?.data?.message || "failed to create item");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateAnItem = async (id, itemData) => {
    try {
      setLoading(true);
      const data = await updateItem(id, itemData);
      setItem(data);
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
      setItem(data);
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
      setItem(data);
    } catch (error) {
      setError(error.response?.data?.message || "failed to get item info");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    error,
    items,
    createAnItem,
    updateAnItem,
    deleteAnItem,
    getAllFoundItems,
    getAll_LostItems,
    getFullItemInfo,
    item,
  };
};
