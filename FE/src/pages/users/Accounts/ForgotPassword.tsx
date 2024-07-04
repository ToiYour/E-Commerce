import { useState } from "react";
import Breadcrumd from "../Breadcrumd";
import { FindUserName } from "./FindUserName";
import VerifyOTP from "./VerifyOTP";
import { ICustomer } from "@/interfaces/customer";
import ResetPassword from "./ResetPassword";

const ForgotPassword = () => {
  const [user, setUser] = useState<ICustomer>();
  const [step, setStep] = useState(1);
  return (
    <div>
      <Breadcrumd
        breadcrumbs={[{ title: "Trang chủ", urlLink: "/" }]}
        page="Quên mật khẩu"
      />
      {step == 1 && <FindUserName setStep={setStep} setUser={setUser} />}
      {step == 2 && <VerifyOTP user={user as ICustomer} setStep={setStep} />}
      {step == 3 && (
        <ResetPassword user={user as ICustomer} setStep={setStep} />
      )}
    </div>
  );
};

export default ForgotPassword;
