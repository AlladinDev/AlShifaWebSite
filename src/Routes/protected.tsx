import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const authStatus = localStorage.getItem("authStatus");

  if (!authStatus) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};