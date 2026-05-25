import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Api } from "@/lib/axios";

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
};

export function usePushNotifications() {
  const user = useAuthStore((state) => state.user);
  const subscribed = useRef(false);

  useEffect(() => {
    if (!user || subscribed.current) return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.ready;

        // Check if already subscribed
        const existing = await registration.pushManager.getSubscription();
        if (existing) { subscribed.current = true; return; }

        // Only subscribe if permission is already granted — don't auto-prompt
        if (Notification.permission !== "granted") return;

        const { data } = await Api.get("/push/vapid-public-key");
        const applicationServerKey = urlBase64ToUint8Array(data.publicKey);

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });

        await Api.post("/push/subscribe", subscription.toJSON());
        subscribed.current = true;
        console.log("[Push] ✓ Subscribed");
      } catch (err) {
        console.warn("[Push] Subscription failed:", err.message);
      }
    };

    register();
  }, [user]);
}

export async function requestPushPermission() {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;

  const result = await Notification.requestPermission();
  return result === "granted";
}
