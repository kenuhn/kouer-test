import { newProduct } from "./product";

export type NewUser = {
  name: string;
  email: string;
  password: string;
  products: newProduct[];
};

export type ExistingUser = NewUser & {
  id: string;
};
