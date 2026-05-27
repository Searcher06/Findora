import { pushSubscriptionModel } from "../models/pushSubscription.model.js";

export const subscribe = async (req, res) => {
  const { endpoint, keys } = req.body;

  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    res.status(400);
    throw new Error("Invalid push subscription payload");
  }

  await pushSubscriptionModel.findOneAndUpdate(
    { endpoint },
    { userId: req.user._id, endpoint, keys },
    { upsert: true, new: true }
  );

  res.status(201).json({ message: "Subscribed to push notifications" });
};

export const unsubscribe = async (req, res) => {
  const { endpoint } = req.body;
  if (!endpoint) { res.status(400); throw new Error("Endpoint required"); }
  await pushSubscriptionModel.deleteOne({ endpoint, userId: req.user._id });
  res.status(200).json({ message: "Unsubscribed" });
};

export const getVapidPublicKey = async (_req, res) => {
  const publicKey = process.env.VAPID_PUBLIC_KEY;

  if (!publicKey) {
    return res.status(503).json({
      message: "Push notifications are not configured on this server.",
      publicKey: null,
    });
  }

  res.status(200).json({ publicKey });
};
