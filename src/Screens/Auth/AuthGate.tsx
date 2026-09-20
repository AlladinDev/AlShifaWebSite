import { Navigate } from "react-router-dom";

export const AuthGate = () => {
  const authStatus = localStorage.getItem("authStatus");

  if (authStatus) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/onboarding" replace />;
};