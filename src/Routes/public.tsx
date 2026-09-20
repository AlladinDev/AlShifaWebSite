import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const authStatus = localStorage.getItem("authStatus");

  if (authStatus) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};