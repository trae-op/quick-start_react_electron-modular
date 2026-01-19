import { Navigate, Outlet } from "react-router-dom";
import { useControlContext as useControlContextAuth } from "@conceptions/AuthSocialNetwork";

export const PublicRoute = () => {
  const { isAuthenticated } = useControlContextAuth();
  if (isAuthenticated) {
    return <Navigate to="/window:main" replace />;
  }
  return <Outlet />;
};
