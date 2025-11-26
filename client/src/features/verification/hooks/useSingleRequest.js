import { useState, useEffect } from "react";
import { getRequestById } from "../apis/verificationApi";
export const useFetchRequestById = (requestId) => {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!requestId) return;
    const fetchFullRequest = async () => {
      try {
        setLoading(true);
        const response = await getRequestById(requestId);
        setRequest(response);
      } catch (error) {
        setError(error.response?.data?.message || "failed to get request info");
        setRequest(null);
      } finally {
        setLoading(false);
      }
    };
    fetchFullRequest();
  }, [requestId]);

  return { request, loading, error };
};
