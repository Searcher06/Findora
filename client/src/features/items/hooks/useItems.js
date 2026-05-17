// hooks/useItems.js - Modified version
import { useEffect, useMemo, useState } from "react";
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

export const useItems = (filters = null, options = {}) => {
  const { autoFetch = true } = options;
  const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!autoFetch) return;
    const loadItems = async () => {
      try {
        setLoading(true);
        if (filters) {
          const data = await getFilteredItems(filters);
          setItems(data?.items || []);
          setPagination(
            data?.pagination || {
              page: 1,
              limit: 12,
              total: 0,
              totalPages: 1,
              hasNextPage: false,
              hasPrevPage: false,
            }
          );
        } else {
          const data = await getAllItems();
          setItems(data?.items || data || []);
          setPagination(
            data?.pagination || {
              page: 1,
              limit: 12,
              total: Array.isArray(data) ? data.length : 0,
              totalPages: 1,
              hasNextPage: false,
              hasPrevPage: false,
            }
          );
        }
      } catch (error) {
        setError(error.response?.data?.message || "failed to load items");
        setItems([]);
        setPagination({
          page: 1,
          limit: 12,
          total: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        });
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, [autoFetch, filters, filtersKey]);

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
    pagination,
  };
};
