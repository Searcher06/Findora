import { useState } from "react";
import { sendMessage, getMessages } from "../services/chatApi";
export const useChat = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send_Message = async (requestId, username, message) => {
    try {
      setLoading(true);
      const response = await sendMessage(requestId, username, message);
      setData(response);
    } catch (error) {
      setError(error.response?.data?.message || "failed to send message");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const get_Messages = async (requestId, username) => {
    try {
      setLoading(true);
      const response = await getMessages(requestId, username);
      setData(response);
    } catch (error) {
      setError(error.response?.data?.message || "failed to get messages");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, send_Message, get_Messages };
};
