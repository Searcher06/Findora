import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
// import { useAuthStore } from "@/store/useAuthStore"; todo:Delete this later
import { Loader } from "@/components/Loader";
import { useEffect } from "react";
const PrivateRoute = () => {
  const { user, isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
