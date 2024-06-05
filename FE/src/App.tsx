import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "./pages/admin/LayoutAdmin";
import { ListProducts } from "./pages/admin/products";
import NotFound from "./pages/NotFound";
import {
  ForgotPassWord,
  LoginPage,
  MeAccountPage,
  Purchase,
  RegisterPage,
} from "./pages/users/Accounts";
import AddressAccount from "./pages/users/Accounts/Address";
import ChangeOrNewPassword from "./pages/users/Accounts/ChangeOrNewPassword";
import LayOutAccount from "./pages/users/Accounts/Layout";
import ProductDetail from "./pages/users/DetailProducts";
import HomePage from "./pages/users/Homes";
import LayoutHome from "./pages/users/LayoutHome";
import ShopPage from "./pages/users/Shops";
import {
  RouterCategory,
  RouterColors,
  RouterCustomer,
  RouterProducts,
  RouterSizes,
} from "./routes";

const router = createBrowserRouter([
  {
    path: "",
    element: <LayoutHome />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      // Danh sách sản phẩm
      {
        path: "shop",
        element: <ShopPage />,
      },
      // Chi tiết sản phẩm
      {
        path: "shop/:slug",
        element: <ProductDetail />,
      },
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
        element: <LayOutAccount />,
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
        ],
      },
      {
        path: "*",
        element: <NotFound href="/" />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "",
        element: <ListProducts />,
      },
      //Quản lý sản phẩm
      ...RouterProducts,
      // Quản lý màu variant/color
      ...RouterColors,
      // Quản lý size variant/size
      ...RouterSizes,
      //Quản lý danh mục
      ...RouterCategory,
      // Quản lý khách hàng
      ...RouterCustomer,
      {
        path: "*",
        element: <NotFound href="/admin" />,
      },
    ],
  },
]);
export default router;
