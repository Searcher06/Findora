import { useState } from "react";
import { toast } from "sonner";
import { verifyHandover } from "../services/codeApi";

export const useSendCode = () => {
  const [loading, setLoading] = useState(false);

  const sendCode = async (requestId, code) => {
    if (!requestId || !code) return null;

    setLoading(true);
    try {
      const data = await verifyHandover(requestId, code);
      toast.success("Code verified successfully!");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || error?.message || "Error verifying code"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendCode, loading };
};
