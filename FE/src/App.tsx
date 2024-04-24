import { createBrowserRouter } from "react-router-dom";
import { ListProducts } from "./admin/components/products";
import { AddColor, ListColor } from "./admin/components/variants/colors";
import Update from "./admin/components/variants/colors/Update";
import LayoutAdmin from "./admin/LayoutAdmin";
import NotFound from "./NotFound";
import Trash from "./admin/components/variants/colors/Trash";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "",
        element: <ListProducts />,
      },
      // variant/color
      {
        path: "variant/color",
        element: <ListColor />,
      },
      {
        path: "variant/color/add",
        element: <AddColor />,
      },
      {
        path: "variant/color/update/:id",
        element: <Update />,
      },
      {
        path: "variant/color/trash",
        element: <Trash />,
      },
      // variant/color   end
      {
        path: "*",
        element: <NotFound href="/admin" />,
      },
    ],
  },
]);
export default router;
