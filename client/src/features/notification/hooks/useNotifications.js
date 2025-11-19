import { useEffect, useState } from "react";
import { getAllRequests } from "../api/notificationApi";
export const useNotification = () => {
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        setLoading(true);
        const data = await getAllRequests();
        setNotifications(data);
      } catch (error) {
        setError(
          error.response?.data?.message || "failed to get notifications"
        );
        setNotifications(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNotification();
  }, []);

  return { notifications, loading, error };
};
