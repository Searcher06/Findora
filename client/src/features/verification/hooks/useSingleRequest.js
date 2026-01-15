/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getRequestById, acceptClaim } from "../apis/verificationApi";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";
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

  const AcceptClaim = async (requestId) => {
    if (!requestId) return;
    try {
      setLoading(true);
      const response = await acceptClaim(requestId);
      setRequest((prevs) => ({ ...prevs, status: "accepted" }));
      toast.success("Claim Accepted Successfull");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept claim");
    } finally {
      setLoading(false);
    }
  };

  const subscribeToAcceptClaim = (requestId, username) => {
    if (!requestId || !username) return;
    const socket = useAuthStore.getState().socket;

    socket.on("acceptClaim", (updatedRequest) => {
      setRequest(updatedRequest);
      toast.success("Your claim was Accepted");
    });
  };

  const unsubscribeToAcceptClaim = () => {
    const socket = useAuthStore.getState().socket;
    socket.off("acceptClaim");
  };
  return {
    request,
    setRequest,
    loading,
    error,
    AcceptClaim,
    subscribeToAcceptClaim,
    unsubscribeToAcceptClaim,
  };
};
