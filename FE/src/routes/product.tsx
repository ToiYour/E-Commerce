import { getComboboxCategory } from "@/services/category";
import { getByIdUpdateProduct, getDetailProduct } from "@/services/product";
import { getComboboxColors } from "@/services/variants/color";
import { getComboboxSizes } from "@/services/variants/size";
import {
  AddProducts,
  DetailProducts,
  ListProducts,
  TrashProducts,
  UpdateProducts,
} from "@/pages/admin/products";
const Products = [
  { path: "products", element: <ListProducts /> },
  {
    path: "products/add",
    loader: async () => {
      const data = await Promise.all([
        getComboboxColors(),
        getComboboxSizes(),
        getComboboxCategory(),
      ]);
      const comboboxs = data.map((combobox) => combobox?.data.data);
      return comboboxs;
    },
    element: <AddProducts />,
  },
  {
    path: "products/update/:id",
    loader: async ({ params }: { params: { id: string } }) => {
      const response = await Promise.all([
        getComboboxColors(),
        getComboboxSizes(),
        getComboboxCategory(),
      ]);
      const comboboxs = response.map((combobox) => combobox?.data.data);
      const { data } = await getByIdUpdateProduct(params.id);
      comboboxs.push(data.data);

      return comboboxs;
    },
    element: <UpdateProducts />,
  },
  {
    path: "products/detail/:id",
    loader: async ({ params }: { params: { id: string } }) => {
      const { data } = await getDetailProduct(params.id);
      return data.data?.[0];
    },
    element: <DetailProducts />,
  },
  {
    path: "products/trash",
    element: <TrashProducts />,
  },
];
export default Products;
