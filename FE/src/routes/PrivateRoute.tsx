import LoadingFixed from "@/components/LoadingFixed";
import { useAuth } from "@/hooks/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRoute = {
  children: ReactNode;
};
const PrivateRoute = ({ children }: PrivateRoute) => {
  const { authUser, isLoggedIn, loading } = useAuth();
  if (loading) return <LoadingFixed />;
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  if (!authUser?.role) return <Navigate to="/buyer/login" />;
  return children;
};

export default PrivateRoute;
