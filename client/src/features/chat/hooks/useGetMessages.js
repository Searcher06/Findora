import { useEffect, useState } from "react";
import { getMessages } from "../services/chatApi";
export const useGetMessages = (requestId, username) => {
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!requestId || !username) return;

      try {
        setLoading(true);
        const response = await getMessages(requestId, username);
        setMessages(response);
      } catch (error) {
        setError(error.response?.data?.message || "failed to send message");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [requestId, username]);

  return { loading, messages, error };
};
