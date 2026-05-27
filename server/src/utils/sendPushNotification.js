import webpush from "web-push";
import { pushSubscriptionModel } from "../models/pushSubscription.model.js";

const vapidSubject = process.env.VAPID_EMAIL;
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

const pushNotificationsEnabled =
  Boolean(vapidSubject) && Boolean(vapidPublicKey) && Boolean(vapidPrivateKey);

if (pushNotificationsEnabled) {
  webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
} else {
  console.warn(
    "Web push notifications are disabled because VAPID_EMAIL, VAPID_PUBLIC_KEY, or VAPID_PRIVATE_KEY is missing."
  );
}

/**
 * Send a push notification to all subscriptions for a given userId.
 * Fire-and-forget — never throws.
 */
export const sendPushNotification = async (userId, { title, body, url = "/" }) => {
  if (!pushNotificationsEnabled) return;
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
