import { itemModel } from "../models/item.model.js";
import { adminFlagModel } from "../models/adminFlag.model.js";
import { sendWhatsApp } from "./sendWhatsApp.js";
import { sendPushNotification } from "./sendPushNotification.js";
import { scoreCandidatesWithGroq } from "./groqMatcher.js";

const DIGEST_LOOKBACK_DAYS = 7;
const OLD_ITEM_MIN_AGE_DAYS = 7;
const HIGH_CONFIDENCE = 0.85;
const DELAY_BETWEEN_CALLS_MS = 2000;

const itemLink = (id) => `${process.env.CLIENT_URL}/items/${id}`;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Weekly digest: for every unresolved item older than 7 days, find NEW items
 * (posted in the last 7 days) of opposite status that Groq considers a match.
 * Notifies via WhatsApp (or push as fallback) and auto-flags high-confidence
 * matches for admin review.
 *
 * Scheduled every Monday at 8:00 AM from index.js.
 */
export const runWeeklyDigest = async () => {
  if (
    !process.env.GROQ_API_KEY ||
    process.env.GROQ_API_KEY === "your_groq_api_key_here"
  )
    return;

  console.log("[WeeklyDigest] Starting run...");

  const now = new Date();

  const recentCutoff = new Date(now);
  recentCutoff.setDate(now.getDate() - DIGEST_LOOKBACK_DAYS);

  const oldCutoff = new Date(now);
  oldCutoff.setDate(now.getDate() - OLD_ITEM_MIN_AGE_DAYS);

  // Items posted in the last 7 days (the "new" pool)
  const recentItems = await itemModel.find({
    status: { $in: ["lost", "found"] },
    isHidden: { $ne: true },
    dateReported: { $gte: recentCutoff },
  });

  if (recentItems.length === 0) {
    console.log("[WeeklyDigest] No recent items — skipping.");
    return;
  }

  const recentByStatus = {
    lost: recentItems.filter((i) => i.status === "lost"),
    found: recentItems.filter((i) => i.status === "found"),
  };

  // Old unresolved items (posted before this week)
  const oldItems = await itemModel
    .find({
      status: { $in: ["lost", "found"] },
      isHidden: { $ne: true },
      dateReported: { $lt: oldCutoff },
    })
    .populate("reportedBy", "firstName whatsappPhone")
    .limit(100);

  let notified = 0;

  for (const oldItem of oldItems) {
    const owner = oldItem.reportedBy;
    if (!owner) continue;

    const oppositeStatus = oldItem.status === "lost" ? "found" : "lost";

    const candidates = recentByStatus[oppositeStatus].filter(
      (r) =>
        r.category === oldItem.category &&
        r.reportedBy.toString() !== owner._id.toString()
    );

    if (candidates.length === 0) continue;

    if (notified > 0) await sleep(DELAY_BETWEEN_CALLS_MS);

    const matchResults = await scoreCandidatesWithGroq(
      oldItem,
      candidates
    ).catch((err) => {
      console.error("[WeeklyDigest] Groq error:", err.message);
      return [];
    });

    if (matchResults.length === 0) continue;

    const matchLines = matchResults
      .map(({ item: m }) => `• ${m.name} (${m.location}): ${itemLink(m._id)}`)
      .join("\n");

    const message = `Hi ${owner.firstName}! 📋 Weekly update from Findora — we found ${matchResults.length} new potential match${matchResults.length > 1 ? "es" : ""} for your *${oldItem.status}* item *"${oldItem.name}"* posted this week.\n\n${matchLines}\n\nOpen the app to connect with the other party!`;

    if (owner.whatsappPhone) {
      sendWhatsApp(owner.whatsappPhone, message).catch(() => {});
    } else {
      sendPushNotification(owner._id, {
        title: "New matches found this week! 🔎",
        body: `We found ${matchResults.length} new match(es) for your ${oldItem.status} item "${oldItem.name}".`,
        url: `/items/${matchResults[0].item._id}`,
      }).catch(() => {});
    }

    // Auto-flag high-confidence matches for admin review
    for (const { item: match, confidence } of matchResults) {
      if (confidence >= HIGH_CONFIDENCE) {
        adminFlagModel
          .create({
            targetType: "item",
            targetId: oldItem._id,
            reason: `Weekly digest auto-match (${Math.round(confidence * 100)}% confidence): "${oldItem.name}" (${oldItem.status}) may be the same item as "${match.name}" (${match.status}) at "${match.location}". Consider connecting these parties.`,
            reportedBy: owner._id,
            status: "open",
          })
          .catch(() => {});
      }
    }

    notified++;
  }

  console.log(`[WeeklyDigest] Done — notified ${notified} item owner(s).`);
};
