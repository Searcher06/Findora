import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowsePage, ViewItem } from "@/features/items";
import { AppLayout } from "@/layouts/AppLayout";
import { ItemTypeProvider } from "@/features/items/context/ItemTypeContext";
function AppRoutes() {
  return (
    <BrowserRouter>
      <ItemTypeProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/items/:id" element={<ViewItem />} />
          </Route>
          <Route path="/login" element={<h1>Login page</h1>} />
          <Route path="/register" element={<h1>Register page</h1>} />
          <Route path="/chat/:id" element={<h1>chat page</h1>} />
        </Routes>
      </ItemTypeProvider>
    </BrowserRouter>
  );
}
export default AppRoutes;
