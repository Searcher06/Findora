import { useState } from "react";
import { sendClaim } from "../apis/verificationApi";
export const useVerify = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const sendClaimRequest = async (id) => {
    try {
      setLoading(true);
      const data = await sendClaim(id);
      setData(data);
    } catch (error) {
      setError(error.response?.data?.message || "failed to get item info");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, sendClaimRequest, setLoading };
};
