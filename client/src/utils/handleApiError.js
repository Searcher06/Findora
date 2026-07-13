import { toast } from "sonner";

/**
 * Handles axios errors with meaningful toast messages.
 * Distinguishes between timeout, network failure, and server errors.
 *
 * @param {Error} error - The caught axios error
 * @param {string} fallback - Fallback message if no server message is available
 */
export const handleApiError = (error, fallback = "Something went wrong. Please try again.") => {
  if (error.code === "ECONNABORTED") {
    toast.error("Request timed out. Please check your connection and try again.");
  } else if (error.code === "ERR_NETWORK" || !error.response) {
    toast.error("Unable to reach the server. Please check your connection.");
  } else {
    toast.error(error.response?.data?.message || fallback);
  }
};
