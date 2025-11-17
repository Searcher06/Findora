import { Api } from "@/lib/axios";

export const sendClaim = async (itemId) => {
  const { data } = await Api.get(`/request/claim/${itemId}`);
  return data;
};
export const sendFound = async (itemId) => {
  const { data } = await Api.get(`/request/found/${itemId}`);
  return data;
};
export const sendQuestion = async (requestId, questions) => {
  const { data } = await Api.get(`/verify/setquestion/${requestId}`, questions);
  return data;
};
export const sendAnswers = async (requestId, questions) => {
  const { data } = await Api.get(`/verify/setanswers/${requestId}`, questions);
  return data;
};
export const sendDecision = async (requestId, decision) => {
  const { data } = await Api.get(`/verify/${requestId}`, decision);
  return data;
};
