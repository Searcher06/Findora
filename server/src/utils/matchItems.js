import { itemModel } from "../models/item.model.js";
import { userModel } from "../models/user.model.js";
import { adminFlagModel } from "../models/adminFlag.model.js";
import { sendWhatsApp } from "./sendWhatsApp.js";
import { sendPushNotification } from "./sendPushNotification.js";
import { scoreCandidatesWithGroq } from "./groqMatcher.js";

const DATE_WINDOW_DAYS = 30;
const MAX_CANDIDATES = 15;
const HIGH_CONFIDENCE = 0.85;

const itemLink = (id) => `${process.env.CLIENT_URL}/items/${id}`;

/**
 * After a new item is created, find likely matches from the opposite-status pool,
 * notify both parties via WhatsApp (or push as fallback), and auto-flag
 * very high-confidence matches for admin review.
 * Fire-and-forget — never throws.
 */
export const matchAndNotify = (newItem) => {
  if (
    !process.env.GROQ_API_KEY ||
    process.env.GROQ_API_KEY === "your_groq_api_key_here"
  )
    return;

  _run(newItem).catch((err) =>
    console.error("[AutoMatch] Unexpected error:", err.message)
  );
};

const _run = async (newItem) => {
  const oppositeStatus = newItem.status === "lost" ? "found" : "lost";

  const itemDate = new Date(newItem.dateLostOrFound);
  const windowStart = new Date(itemDate);
  windowStart.setDate(itemDate.getDate() - DATE_WINDOW_DAYS);
  const windowEnd = new Date(itemDate);
  windowEnd.setDate(itemDate.getDate() + DATE_WINDOW_DAYS);

  const candidates = await itemModel
    .find({
      category: newItem.category,
      status: oppositeStatus,
      isHidden: { $ne: true },
      reportedBy: { $ne: newItem.reportedBy },
      dateLostOrFound: { $gte: windowStart, $lte: windowEnd },
    })
    .populate("reportedBy", "firstName whatsappPhone")
    .limit(MAX_CANDIDATES);

  if (candidates.length === 0) return;

  const matchResults = await scoreCandidatesWithGroq(newItem, candidates).catch(
    (err) => {
      console.error("[AutoMatch] Groq error:", err.message);
      return [];
    }
  );

  if (matchResults.length === 0) return;

  // Notify the new item's reporter
  const reporter = await userModel
    .findById(newItem.reportedBy)
    .select("firstName whatsappPhone");

  if (reporter) {
    const matchLines = matchResults
      .map(({ item: m }) => `• ${m.name} (${m.location}): ${itemLink(m._id)}`)
      .join("\n");

    const message = `Hi ${reporter.firstName}! 🔎 We found ${matchResults.length} potential match${matchResults.length > 1 ? "es" : ""} for your *${newItem.status}* item *"${newItem.name}"* on Findora.\n\n${matchLines}`;

    if (reporter.whatsappPhone) {
      sendWhatsApp(reporter.whatsappPhone, message).catch(() => {});
    } else {
      sendPushNotification(reporter._id, {
        title: "Potential match found! 🔎",
        body: `We found ${matchResults.length} potential match(es) for your ${newItem.status} item "${newItem.name}".`,
        url: `/items/${matchResults[0].item._id}`,
      }).catch(() => {});
    }
  }

  // Notify each matched item's owner + create admin flag for high-confidence matches
  for (const { item: match, confidence } of matchResults) {
    const owner = match.reportedBy;

    if (owner) {
      const message = `Hi ${owner.firstName}! 🔎 A new *${newItem.status}* item that might match your *${match.status}* item *"${match.name}"* was just posted on Findora.\n\n🔗 View it here: ${itemLink(newItem._id)}`;

      if (owner.whatsappPhone) {
        sendWhatsApp(owner.whatsappPhone, message).catch(() => {});
      } else {
        sendPushNotification(owner._id, {
          title: "Potential match found! 🔎",
          body: `A new ${newItem.status} item might match your ${match.status} item "${match.name}".`,
          url: `/items/${newItem._id}`,
        }).catch(() => {});
      }
    }

    // Auto-flag very high-confidence matches for admin review (skip if already flagged)
    if (confidence >= HIGH_CONFIDENCE) {
      adminFlagModel
        .exists({ targetType: "item", targetId: newItem._id, status: "open" })
        .then((exists) => {
          if (!exists) {
            return adminFlagModel.create({
              targetType: "item",
              targetId: newItem._id,
              reason: `Auto-match (${Math.round(confidence * 100)}% confidence): "${newItem.name}" (${newItem.status}) may be the same item as "${match.name}" (${match.status}) at "${match.location}". Consider connecting these parties.`,
              reportedBy: newItem.reportedBy,
              status: "open",
            });
          }
        })
        .catch(() => {});
    }
  }

  console.log(
    `[AutoMatch] "${newItem.name}" (${newItem.status}) → ${matchResults.length} match(es) notified`
  );
};
