import { useState } from "react";
import { toast } from "react-toastify";
import { handleItem } from "../services/codeApi";

// Proper hook for sending OTP code
export const useSendCode = () => {
  const [loading, setLoading] = useState(false);

  // sendCode function to call from component
  const sendCode = async (requestId, code) => {
    if (!requestId || !code) return null;

    setLoading(true);
    try {
      const response = await handleItem(requestId, code);
      return response.data; // assuming handleItem returns axios response
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send code");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendCode, loading };
};
