import { itemModel } from "../models/item.model.js";
import { userModel } from "../models/user.model.js";
import { sendWhatsApp } from "./sendWhatsApp.js";

const EXPIRY_DAYS = 60;
const WARNING_DAYS = 57;

/**
 * Lazily archives expired items and sends WhatsApp warnings.
 * Call this inside any frequently-hit endpoint (e.g. allItems) — no cron needed.
 * Runs fast: both operations are non-blocking fire-and-forget.
 */
export const archiveExpiredItems = () => {
  const now = new Date();

  // Threshold dates
  const expiredBefore = new Date(now);
  expiredBefore.setDate(now.getDate() - EXPIRY_DAYS);

  const warnFrom = new Date(now);
  warnFrom.setDate(now.getDate() - WARNING_DAYS - 1); // 1-day window to avoid re-warns
  const warnTo = new Date(now);
  warnTo.setDate(now.getDate() - WARNING_DAYS);

  // --- 1. Archive expired items (fire-and-forget) ---
  itemModel
    .find({
      dateReported: { $lt: expiredBefore },
      status: { $in: ["lost", "found"] },
      isHidden: { $ne: true },
    })
    .populate("reportedBy", "whatsappPhone firstName")
    .then(async (expiredItems) => {
      for (const item of expiredItems) {
        item.isHidden = true;
        item.hiddenReason = `Auto-archived after ${EXPIRY_DAYS} days of inactivity`;
        await item.save();

        if (item.reportedBy?.whatsappPhone) {
          sendWhatsApp(
            item.reportedBy.whatsappPhone,
            `Hi ${item.reportedBy.firstName}! 📦 Your item *"${item.name}"* on Findora has been auto-archived after ${EXPIRY_DAYS} days of inactivity.\n\nIf you still need help finding it, contact support to restore the listing.`
          ).catch(() => {});
        }
      }

      if (expiredItems.length > 0) {
        console.log(`[AutoArchive] Archived ${expiredItems.length} expired item(s)`);
      }
    })
    .catch((err) => console.error("[AutoArchive] Archive error:", err.message));

  // --- 2. Send 3-day expiry warnings (fire-and-forget) ---
  itemModel
    .find({
      dateReported: { $gte: warnFrom, $lt: warnTo },
      status: { $in: ["lost", "found"] },
      isHidden: { $ne: true },
      expiryWarningSent: { $ne: true },
    })
    .populate("reportedBy", "whatsappPhone firstName")
    .then(async (warnItems) => {
      for (const item of warnItems) {
        item.expiryWarningSent = true;
        await item.save();

        if (item.reportedBy?.whatsappPhone) {
          sendWhatsApp(
            item.reportedBy.whatsappPhone,
            `Hi ${item.reportedBy.firstName}! ⏳ Heads up — your item *"${item.name}"* on Findora will be auto-archived in 3 days due to inactivity.\n\nOpen the app to update your listing and keep it active.`
          ).catch(() => {});
        }
      }

      if (warnItems.length > 0) {
        console.log(`[AutoArchive] Sent expiry warning to ${warnItems.length} item owner(s)`);
      }
    })
    .catch((err) => console.error("[AutoArchive] Warning error:", err.message));
};
