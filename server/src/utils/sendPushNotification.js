import webpush from "web-push";
import { pushSubscriptionModel } from "../models/pushSubscription.model.js";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

/**
 * Send a push notification to all subscriptions for a given userId.
 * Fire-and-forget — never throws.
 */
export const sendPushNotification = async (userId, { title, body, url = "/" }) => {
  if (!userId) return;

  let subs;
  try {
    subs = await pushSubscriptionModel.find({ userId });
  } catch {
    return;
  }

  if (!subs.length) return;

  const payload = JSON.stringify({ title, body, url });

  const results = await Promise.allSettled(
    subs.map((sub) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: sub.keys },
        payload
      )
    )
  );

  // Clean up expired/invalid subscriptions (410 Gone)
  const staleIds = [];
  results.forEach((result, i) => {
    if (
      result.status === "rejected" &&
      [404, 410].includes(result.reason?.statusCode)
    ) {
      staleIds.push(subs[i]._id);
    }
  });

  if (staleIds.length) {
    pushSubscriptionModel.deleteMany({ _id: { $in: staleIds } }).catch(() => {});
  }
};
