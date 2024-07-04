import {
  AddCategory,
  ListCategory,
  TrashCategory,
  UpdateCategory,
} from "@/pages/admin/categorys";

const Color = [
  {
    path: "category",
    element: <ListCategory />,
  },
  {
    path: "category/add",
    element: <AddCategory />,
  },
  {
    path: "category/update/:id",
    element: <UpdateCategory />,
  },
  {
    path: "category/trash",
    element: <TrashCategory />,
  },
];
export default Color;
