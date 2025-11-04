import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowsePage, ReportPage, ViewItem } from "@/features/items";
import { AppLayout } from "@/layouts/AppLayout";
import { ItemTypeProvider } from "@/features/items/context/ItemTypeContext";
import { LoginPage } from "@/features/authentication";
function AppRoutes() {
  return (
    <BrowserRouter>
      <ItemTypeProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/items/:id" element={<ViewItem />} />
            <Route path="/report" element={<ReportPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<h1>Register page</h1>} />
          <Route path="/chat/:id" element={<h1>chat page</h1>} />
        </Routes>
      </ItemTypeProvider>
    </BrowserRouter>
  );
}
export default AppRoutes;
