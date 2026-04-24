import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowsePage, ReportPage, ViewItem, UpdateItem } from "@/features/items";
import { AppLayout } from "@/layouts/AppLayout";
import { ItemTypeProvider } from "@/features/items/context/ItemTypeContext";
import { LoginPage, ResendEmail, SignUpPage, EmailVerify, ForgotPasswordPage, ResetPasswordPage, ChangePasswordPage } from "@/features/authentication";
import { UploadPhotoProvider } from "@/features/items/context/UploadPhotoContext";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./privateRoute";
import { ChatPage, ChatSelectionPage } from "@/features/chat";
import { NavProvider } from "@/context/NavContext";
import { CodeExchangePage } from "@/features/codeExchange";
import { EditProfilePage, ProfilePage } from "@/features/user";
import { ScrollToTop } from "@/utils/scrollToTop";
function AppRoutes() {
  return (
    <NavProvider>
      <BrowserRouter>
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
                  <Route path="/profile/edit" element={<EditProfilePage />} />
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
