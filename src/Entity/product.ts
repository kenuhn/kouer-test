export type newProduct = {
  name: string;
  price: number;
  stock: number;
};

export type existingProduct = newProduct & {
  id: string;
};
