import { createBrowserRouter } from "react-router-dom";
import { ListProducts } from "./admin/components/products";
import LayoutAdmin from "./admin/LayoutAdmin";
import NotFound from "./NotFound";
import {
  RouterCategory,
  RouterColors,
  RouterCustomer,
  RouterProducts,
  RouterSizes,
} from "./routes";
import LayoutHome from "./pages/LayoutHome";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "",
    element: <LayoutHome />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <h1>Shop</h1>,
      },
      {
        path: "*",
        element: <h1>Tơis</h1>,
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
