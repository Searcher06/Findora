import { toast } from "react-toastify";
import { handleItem } from "../services/codeApi";
export const useSendCode = async (requestId, code) => {
  if (!requestId || !code) return;
  try {
    const response = await handleItem(requestId, code);
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send Code");
  }
};
