import LayoutAdmin from "@/layouts/LayoutAdmin";
import LayoutHome from "@/layouts/LayoutHome";
import { ListProducts } from "@/pages/admin/products";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/users/DetailProducts";
import HomePage from "@/pages/users/Homes";
import ShopPage from "@/pages/users/Shops";
import {
  RouterAuth,
  RouterCategory,
  RouterColors,
  RouterCustomer,
  RouterDiscount,
  RouterProducts,
  RouterSizes,
} from "@/routes";
import PrivateRoute from "@/routes/PrivateRoute";
import { createBrowserRouter } from "react-router-dom";
import WelcomeChat from "@/components/WelcomeChat";
import LayoutChatAdmin from "@/layouts/LayoutChatAdmin";
import MainChat from "@/pages/admin/chats/MainChat";
import Carts from "@/pages/users/Carts";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import Checkout from "@/pages/users/Orders/Checkout";
import VerifyPayment from "./pages/users/Orders/VerifyPayment";

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
      ...RouterAuth,
      // Giỏ hàng
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Carts />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "checkout/verify-payment",
        element: <VerifyPayment />,
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
      //Quản lý mã giảm giá
      ...RouterDiscount,
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
