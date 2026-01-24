import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowsePage, ReportPage, ViewItem, UpdateItem } from "@/features/items";
import { AppLayout } from "@/layouts/AppLayout";
import { ItemTypeProvider } from "@/features/items/context/ItemTypeContext";
import { LoginPage, SignUpPage } from "@/features/authentication";
import { UploadPhotoProvider } from "@/features/items/context/UploadPhotoContext";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./privateRoute";
import { ChatPage, ChatSelectionPage } from "@/features/chat";
import { NavProvider } from "@/context/NavContext";
import { CodeExchangePage } from "@/features/codeExchange";
import { EditProfilePage, ProfilePage } from "@/features/user";
function AppRoutes() {
  return (
    <NavProvider>
      <BrowserRouter>
        <ItemTypeProvider>
          <UploadPhotoProvider>
            <Routes>
              {/* Public routes - no authentication required */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* Protected routes - require authentication */}
              <Route element={<PrivateRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<BrowsePage />} />
                  <Route path="/items/:id" element={<ViewItem />} />
                  <Route path="/report" element={<ReportPage />} />
                  <Route path="/update/:id" element={<UpdateItem />} />
                  <Route path="/notification" element={<Notification />} />
                  <Route
                    path="/chat/:requestId/:username"
                    element={<ChatPage />}
                  />
                  <Route
                    path="/handover/:requestId"
                    element={<CodeExchangePage />}
                  />
                  <Route path="/chats" element={<ChatSelectionPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/profile/edit" element={<EditProfilePage />} />
                </Route>
              </Route>
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              theme="light"
            />
          </UploadPhotoProvider>
        </ItemTypeProvider>
      </BrowserRouter>
    </NavProvider>
  );
}

export default AppRoutes;
