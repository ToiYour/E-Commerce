import { useAuth } from "@/hooks/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRoute = {
  children: ReactNode;
};
const PrivateRoute = ({ children }: PrivateRoute) => {
  const { authUser, isLoggedIn } = useAuth();
  return isLoggedIn && authUser?.role ? (
    children
  ) : (
    <Navigate to={"/buyer/login"} />
  );
};

export default PrivateRoute;
