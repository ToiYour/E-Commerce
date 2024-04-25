import {
  AddCategory,
  ListCategory,
  TrashCategory,
  UpdateCategory,
} from "../admin/components/categorys";
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
