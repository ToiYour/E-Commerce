import { useAuth } from "@/hooks/auth";
import ChangePassword from "./ChangePassword";
import NewPassword from "./NewPassword";

const ChangeOrNewPassword = () => {
  const { authUser: user } = useAuth();
  return user?.uid && !user.password ? <NewPassword /> : <ChangePassword />;
};

export default ChangeOrNewPassword;
