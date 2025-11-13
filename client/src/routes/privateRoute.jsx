import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@/context/AuthContext";
import { Loader } from "@/components/Loader";
const PrivateRoute = () => {
  const { user, isLoading } = useAuthStore();
  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
// <div className="flex justify-center items-center min-h-screen">
//   <div className="text-center">
//     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//     <p className="text-gray-600 font-display">
//       Checking authentication...
//     </p>
//   </div>
// </div>
