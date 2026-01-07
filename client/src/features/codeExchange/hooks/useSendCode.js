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
      const data = await handleItem(requestId, code);
      toast.success("Code sent successfully!");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || error?.message || "Error sending code"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendCode, loading };
};
