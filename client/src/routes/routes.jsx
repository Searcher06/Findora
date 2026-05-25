import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BrowsePage, ReportPage, ViewItem, UpdateItem } from "@/features/items";
import { AdminDashboardPage } from "@/features/admin";
import { MyFlagsPage } from "@/features/flags";
import { AppLayout } from "@/layouts/AppLayout";
import { ItemTypeProvider } from "@/features/items/context/ItemTypeContext";
import { LoginPage, ResendEmail, SignUpPage, EmailVerify, ForgotPasswordPage, ResetPasswordPage, ChangePasswordPage } from "@/features/authentication";
import { UploadPhotoProvider } from "@/features/items/context/UploadPhotoContext";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./privateRoute";
import AdminRoute from "./adminRoute";
import { ChatPage, ChatSelectionPage } from "@/features/chat";
import { NavProvider } from "@/context/NavContext";
import { CodeExchangePage } from "@/features/codeExchange";
import { EditProfilePage, ProfilePage, TrustLeaderboardPage, PublicProfilePage } from "@/features/user";
import { NotificationsPage } from "@/features/notification";
import { ScrollToTop } from "@/utils/scrollToTop";

const getPageTitle = (pathname) => {
  if (pathname === "/") return "Browse Items | Findora";
  if (pathname === "/login") return "Login | Findora";
  if (pathname === "/signup") return "Sign Up | Findora";
  if (pathname === "/verify-email") return "Verify Email | Findora";
  if (pathname === "/resend-email") return "Resend Verification | Findora";
  if (pathname === "/forgot-password") return "Forgot Password | Findora";
  if (pathname === "/reset-password") return "Reset Password | Findora";
  if (pathname === "/change-password") return "Change Password | Findora";
  if (pathname === "/report") return "Report Item | Findora";
  if (pathname === "/chats") return "Conversations | Findora";
  if (pathname === "/profile") return "Profile | Findora";
  if (pathname === "/leaderboard") return "Trust Leaderboard | Findora";
  if (pathname === "/profile/edit") return "Edit Profile | Findora";
  if (pathname === "/my-flags") return "My Reports | Findora";
  if (pathname === "/notifications") return "Notifications | Findora";
  if (pathname === "/admin") return "Admin Dashboard | Findora";
  if (pathname.startsWith("/items/")) return "Item Details | Findora";
  if (pathname.startsWith("/update/")) return "Update Item | Findora";
  if (pathname.startsWith("/chat/")) return "Chat | Findora";
  if (pathname.startsWith("/handover/")) return "Verify Handover | Findora";
  if (pathname.startsWith("/u/")) return "Profile | Findora";

  return "Findora";
};

const PageTitleManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = getPageTitle(pathname);
  }, [pathname]);

  return null;
};

function AppRoutes() {
  return (
    <NavProvider>
      <BrowserRouter>
        <PageTitleManager />
        <ScrollToTop />
        <ItemTypeProvider>
          <UploadPhotoProvider>
            <Routes>
              {/* Public routes - no authentication required */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/verify-email" element={<EmailVerify />} />
              <Route path="/resend-email" element={<ResendEmail />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              {/* Protected routes - require authentication */}
              <Route element={<PrivateRoute />}>
                <Route path="/change-password" element={<ChangePasswordPage />} />
                <Route element={<AppLayout />}>
                  <Route path="/" element={<BrowsePage />} />
                  <Route path="/items/:id" element={<ViewItem />} />
                  <Route path="/report" element={<ReportPage />} />
                  <Route path="/update/:id" element={<UpdateItem />} />
                  <Route path="/chat/:requestId/:username" element={<ChatPage />} />
                  <Route path="/handover/:requestId" element={<CodeExchangePage />} />
                  <Route path="/chats" element={<ChatSelectionPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/leaderboard" element={<TrustLeaderboardPage />} />
                  <Route path="/profile/edit" element={<EditProfilePage />} />
                  <Route path="/my-flags" element={<MyFlagsPage />} />
                  <Route path="/u/:username" element={<PublicProfilePage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminDashboardPage />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover theme="light" />
          </UploadPhotoProvider>
        </ItemTypeProvider>
      </BrowserRouter>
    </NavProvider>
  );
}

export default AppRoutes;
