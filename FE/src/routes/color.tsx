import {
  AddColor,
  ListColor,
  TrashColor,
  UpdateColor,
} from "@/pages/admin/variants/colors";

const Color = [
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
    element: <UpdateColor />,
  },
  {
    path: "variant/color/trash",
    element: <TrashColor />,
  },
];
export default Color;
