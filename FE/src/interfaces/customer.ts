export interface ICustomer {
  _id?: string;
  name?: {
    first_name?: string;
    last_name?: string;
  };
  avatar?: string | FileList;
  email?: string;
  user_name?: string;
  password?: string;
  phone?: string;
  address?: {
    province?: string;
    district?: string;
    commune?: string;
    specific?: string;
  };
  role?: string;
  account_status?: boolean;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
