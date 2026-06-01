import axios from "axios";

/**
 * Send a WhatsApp text message via the wawp.net V2 API.
 * Fire-and-forget safe — errors are logged but never thrown.
 *
 * @param {string} phone  E.164 phone number  e.g. +2347012345678
 * @param {string} text   Plain-text message body
 */
export const sendWhatsApp = async (phone, text) => {
  const instanceId = process.env.WAWP_INSTANCE_ID;
  const token = process.env.WAWP_ACCESS_TOKEN;

  // Bail out silently if credentials or phone are missing
  if (!phone || !instanceId || !token) return;

  // wawp chatId: strip leading '+', append '@c.us'
  // e.g. +2347012345678  →  2347012345678@c.us
  const chatId = phone.replace(/^\+/, "") + "@c.us";

  try {
    await axios.post(
      "https://api.wawp.net/v2/send/text",
      { instance_id: instanceId, access_token: token, chatId, text },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 8000,
      }
    );
    console.log(`[WhatsApp] ✓ Sent to ${chatId}`);
  } catch (err) {
    console.error("[WhatsApp] ✗ Failed:", err.response?.data || err.message);
  }
};
