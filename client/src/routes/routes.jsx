import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainNavbar } from "@/layouts/MainNavbar";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainNavbar />} />
        <Route path="/login" element={<h1>Login page</h1>} />
        <Route path="/register" element={<h1>Register page</h1>} />
        <Route path="/chat/:id" element={<h1>chat page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
