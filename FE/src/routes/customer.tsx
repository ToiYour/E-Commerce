import { getByIdCustomer } from "@/api/customer";
import {
  AddCustomer,
  ListCustomer,
  UpdateCustomer,
} from "@/pages/admin/customers";

const Customer = [
  {
    path: "customers",
    element: <ListCustomer />,
  },
  {
    path: "customers/add",
    element: <AddCustomer />,
  },

  {
    path: "customer/update/:id",
    loader: async ({ params }: { params: { id: string } }) => {
      const { data } = await getByIdCustomer(params.id);
      return data.data;
    },
    element: <UpdateCustomer />,
  },
];
export default Customer;
