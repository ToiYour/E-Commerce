export interface ICategory {
  _id?: string;
  name?: string;
  img?: string | FileList;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  status?: boolean;
}
