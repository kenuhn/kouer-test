export type TnewProduct = {
  name: string;
  price: number;
  description: string;
};

export type TexistingProduct = TnewProduct & {
  id: number;
};

export class ProductEntity {
  private product: TexistingProduct;

  constructor(product: TexistingProduct) {
    this.validateProduct(product);
    this.product = product;
  }

  private validateProduct(product: TexistingProduct): void {
    if (!product.id || typeof product.id !== "number") {
      throw new Error("Invalid product ID");
    }
    if (!product.name || typeof product.name !== "string") {
      throw new Error("Invalid product name");
    }
    if (typeof product.price !== "number" || product.price < 0) {
      throw new Error("Invalid product price");
    }
    if (!product.description || typeof product.description !== "string") {
      throw new Error("Invalid product description");
    }
  }

  public getProduct(): TexistingProduct {
    return this.product;
  }

  public updateProduct(update: Partial<TexistingProduct>): void {
    const updatedProduct = { ...this.product, ...update };
    this.validateProduct(updatedProduct);
    this.product = updatedProduct;
  }
}
