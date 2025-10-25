import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainNavbar } from "@/layouts/MainNavbar";
import { BrowsePage } from "@/features/items";
import { AppLayout } from "@/layouts/AppLayout";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<BrowsePage />} />
        </Route>
        <Route path="/login" element={<h1>Login page</h1>} />
        <Route path="/register" element={<h1>Register page</h1>} />
        <Route path="/chat/:id" element={<h1>chat page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
