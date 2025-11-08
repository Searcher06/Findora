/* eslint-disable no-unused-vars */
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
  const [items, setItems] = useState([]);
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
};
