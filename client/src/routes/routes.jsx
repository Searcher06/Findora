import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowsePage, ReportPage, ViewItem } from "@/features/items";
import { AppLayout } from "@/layouts/AppLayout";
import { ItemTypeProvider } from "@/features/items/context/ItemTypeContext";
import { LoginPage, SignUpPage } from "@/features/authentication";
import { UploadPhotoProvider } from "@/features/items/context/UploadPhotoContext";
import { ToastContainer } from "react-toastify";
function AppRoutes() {
  return (
    <BrowserRouter>
      <ItemTypeProvider>
        <UploadPhotoProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<BrowsePage />} />
              <Route path="/items/:id" element={<ViewItem />} />
              <Route path="/report" element={<ReportPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/chat/:id" element={<h1>chat page</h1>} />
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
  );
}
export default AppRoutes;
