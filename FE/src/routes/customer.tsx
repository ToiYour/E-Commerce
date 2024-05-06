import {
  AddCustomer,
  ListCustomer,
  UpdateCustomer,
} from "@/admin/components/customers";
import { getByIdCustomer } from "@/api/customer";

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
