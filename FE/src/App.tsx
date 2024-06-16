import LayOutAccount from "@/layouts/LayoutAccount";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import LayoutHome from "@/layouts/LayoutHome";
import { ListProducts } from "@/pages/admin/products";
import NotFound from "@/pages/NotFound";
import {
  ForgotPassWord,
  LoginPage,
  MeAccountPage,
  Purchase,
  RegisterPage,
} from "@/pages/users/Accounts";
import AddressAccount from "@/pages/users/Accounts/Address";
import ChangeOrNewPassword from "@/pages/users/Accounts/ChangeOrNewPassword";
import ProductDetail from "@/pages/users/DetailProducts";
import HomePage from "@/pages/users/Homes";
import ShopPage from "@/pages/users/Shops";
import {
  RouterCategory,
  RouterColors,
  RouterCustomer,
  RouterProducts,
  RouterSizes,
} from "@/routes";
import PrivateRoute from "@/routes/PrivateRoute";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";
import WelcomeChat from "./components/WelcomeChat";
import LayoutChatAdmin from "./layouts/LayoutChatAdmin";
import MainChat from "./pages/admin/chats/MainChat";

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
    element: (
      <PrivateRoute>
        <LayoutAdmin />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <ListProducts />,
      },
      //Quản lý tin nhắn
      {
        path: "messages",
        element: <LayoutChatAdmin />,
        children: [
          {
            path: "",
            element: <WelcomeChat />,
          },
          {
            path: ":id",
            element: <MainChat />,
          },
        ],
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
