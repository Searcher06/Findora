import { useState } from "react";
import {
  sendClaim,
  sendFound,
  sendQuestion,
  sendAnswers,
  sendDecision,
} from "../apis/verificationApi";
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

  const sendVerificationQuestions = async (requestId, questions) => {
    try {
      setLoading(true);
      const data = await sendQuestion(requestId, questions);
      setData(data);
    } catch (error) {
      setError(error.response?.data?.message || "failed to send questions");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationAnswers = async (requestId, answers) => {
    try {
      setLoading(true);
      const data = await sendAnswers(requestId, answers);
      setData(data);
    } catch (error) {
      setError(error.response?.data?.message || "failed to send answers");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationDecision = async (requestId, decision) => {
    try {
      setLoading(true);
      const data = await sendDecision(requestId, decision);
      setData(data);
    } catch (error) {
      setError(
        error.response?.data?.message || "failed to send final decision"
      );
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
    sendVerificationQuestions,
    sendVerificationAnswers,
    sendVerificationDecision,
    setData,
  };
};
