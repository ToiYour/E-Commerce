import {
  AddSize,
  ListSize,
  TrashSize,
  UpdateSize,
} from "../admin/components/variants/sizes";
const Color = [
  {
    path: "variant/size",
    element: <ListSize />,
  },
  {
    path: "variant/size/add",
    element: <AddSize />,
  },
  {
    path: "variant/size/update/:id",
    element: <UpdateSize />,
  },
  {
    path: "variant/size/trash",
    element: <TrashSize />,
  },
];
export default Color;
