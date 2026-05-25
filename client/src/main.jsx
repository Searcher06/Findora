import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Register service worker for PWA + push notifications
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("[SW] Registered"))
      .catch((err) => console.warn("[SW] Registration failed:", err));
  });
}

createRoot(document.getElementById("root")).render(<App />);
