import { useState, useEffect } from "react";
import { getItemInfo } from "../api/itemApi";

export const useSingleItem = (id) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getItemInfo(id);
        setItem(data);
      } catch (error) {
        setError(error.response?.data?.message || "failed to get item info");
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  return { item, loading, error };
};
