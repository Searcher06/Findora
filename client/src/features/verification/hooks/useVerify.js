import { useState } from "react";
import { sendClaim, sendFound } from "../apis/verificationApi";
export const useVerify = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const sendClaimRequest = async (id) => {
    try {
      setLoading(true);
      const data = await sendClaim(id);
      setData(data);
      return data;
    } catch (error) {
      setError(error.response?.data?.message || "failed to send claim request");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendFoundRequest = async (id) => {
    try {
      setLoading(true);
      const response = await sendFound(id);
      setData(response);
      return response;
    } catch (error) {
      setError(error.response?.data?.message || "failed to send request");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
    sendClaimRequest,
    sendFoundRequest,
    setLoading,

    setData,
  };
};
