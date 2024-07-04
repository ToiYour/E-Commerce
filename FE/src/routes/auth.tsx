import LayOutAccount from "@/layouts/LayoutAccount";
import {
  ForgotPassWord,
  LoginPage,
  MeAccountPage,
  Purchase,
  RegisterPage,
} from "@/pages/users/Accounts";
import AddressAccount from "@/pages/users/Accounts/Address";
import ChangeOrNewPassword from "@/pages/users/Accounts/ChangeOrNewPassword";
import PurchaseOrder from "@/pages/users/Accounts/PurchaseOrder";
import { ProtectedRoute } from "./ProtectedRoute";

const Auth = [
  // Đăng nhập
  {
    path: "buyer/login",
    element: <LoginPage />,
  },
  // Đăng ký
  {
    path: "buyer/register",
    element: <RegisterPage />,
  },
  // Quên mật khẩu
  {
    path: "buyer/forgot-password",
    element: <ForgotPassWord />,
  },
  // Trang cá nhân
  {
    path: "account",
    element: (
      <ProtectedRoute>
        <LayOutAccount />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: <MeAccountPage />,
      },
      {
        path: "password",

        element: <ChangeOrNewPassword />,
      },
      {
        path: "address",
        element: <AddressAccount />,
      },
      {
        path: "purchase",
        element: <Purchase />,
      },
      {
        path: "purchase/order/:id",
        element: <PurchaseOrder />,
      },
    ],
  },
];
export default Auth;
