import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Button className={`bg-blue-600 rounded-sm font-calibri`}>
              Home page
            </Button>
          }
        />
        <Route path="/login" element={<h1>Login page</h1>} />
        <Route path="/register" element={<h1>Register page</h1>} />
        <Route path="/chat/:id" element={<h1>chat page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
