import { createBrowserRouter } from "react-router-dom";
import { ListProducts } from "./admin/components/products";
import LayoutAdmin from "./admin/LayoutAdmin";
import NotFound from "./NotFound";
import { RouterColors, RouterSizes } from "./routes";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "",
        element: <ListProducts />,
      },
      // Quản lý màu variant/color
      ...RouterColors,
      // Quản lý size variant/size
      ...RouterSizes,
      {
        path: "*",
        element: <NotFound href="/admin" />,
      },
    ],
  },
]);
export default router;
