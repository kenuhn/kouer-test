import { TnewProduct } from "./product";

export type TnewUser = {
  name: string;
  email: string;
  password: string;
  products: TnewProduct[];
};

export type TexistingUser = TnewUser & {
  id: number;
};

export type userDto = {
  email: string;
  password: string;
};
