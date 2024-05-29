import { ICustomer } from "@/interfaces/customer";
import { useLoaderData } from "react-router-dom";
import NewPassword from "./NewPassword";
import ChangePassword from "./ChangePassword";

const ChangeOrNewPassword = () => {
  const user = useLoaderData() as ICustomer;
  return user.uid && !user.password ? <NewPassword /> : <ChangePassword />;
};

export default ChangeOrNewPassword;
