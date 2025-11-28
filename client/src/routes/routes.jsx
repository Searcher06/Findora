import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowsePage, ReportPage, ViewItem, UpdateItem } from "@/features/items";
import { Notification } from "@/features/notification";
import { AppLayout } from "@/layouts/AppLayout";
import { ItemTypeProvider } from "@/features/items/context/ItemTypeContext";
import { LoginPage, SignUpPage } from "@/features/authentication";
import { UploadPhotoProvider } from "@/features/items/context/UploadPhotoContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./privateRoute";
import { NavProvider } from "@/context/NavContext";
import {
  GenerateQuestions,
  AnswerQuestions,
  VerificationDecision,
} from "@/features/verification";
function AppRoutes() {
  return (
    <NavProvider>
      <BrowserRouter>
        <ItemTypeProvider>
          <UploadPhotoProvider>
            <AuthProvider>
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
                      path="/verification/questions/:requestId"
                      element={<GenerateQuestions />}
                    />
                    <Route
                      path="/verification/answers/:requestId"
                      element={<AnswerQuestions />}
                    />
                    <Route
                      path="/verification/decision/:requestId"
                      element={<VerificationDecision />}
                    />
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
            </AuthProvider>
          </UploadPhotoProvider>
        </ItemTypeProvider>
      </BrowserRouter>
    </NavProvider>
  );
}

export default AppRoutes;
