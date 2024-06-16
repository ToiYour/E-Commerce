import { useAuth } from "@/hooks/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
type ProtectedRoute = {
  children: ReactNode;
};
export const ProtectedRoute = ({ children }: ProtectedRoute) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to={"/buyer/login"} />;
};
