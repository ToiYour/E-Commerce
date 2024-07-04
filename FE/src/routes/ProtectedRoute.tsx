import LoadingFixed from "@/components/LoadingFixed";
import { useAuth } from "@/hooks/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
type ProtectedRoute = {
  children: ReactNode;
};
export const ProtectedRoute = ({ children }: ProtectedRoute) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <LoadingFixed />;
  if (!isLoggedIn) return <Navigate to="/buyer/login" />;
  return children;
};
