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

export interface IUserEntity {
  getUser(): TexistingUser;
  updateUser(update: Partial<TexistingUser>): void;
}

export type TuserError = {
  message: "error" | "";
  [key: string]: string;
};

export class UserEntity {
  private user: TnewUser | TexistingUser;
  private validationErrors: { [key: string]: string } = {};

  constructor(user: TnewUser | TexistingUser) {
    this.validateUser(user);
    this.user = user;
  }

  public validateUser(user: TnewUser | TexistingUser): void {
    if (!user) {
      this.validationErrors.global = "User data is missing";
      return;
    }

    if ("id" in user && typeof user.id !== "number") {
      this.validationErrors.id = "Invalid user ID";
    }
    if (!user.name || typeof user.name !== "string") {
      console.log("user.nameEnity", user.name);
      this.validationErrors.name = "Invalid user name";
    }
    if (
      !user.email ||
      typeof user.email !== "string" ||
      !this.isValidEmail(user.email)
    ) {
      this.validationErrors.email = "Invalid user email";
    }
    if (!user.password || typeof user.password !== "string") {
      this.validationErrors.password = "Invalid user password";
    }
    if (
      !Array.isArray(user.products) ||
      !user.products.every(this.isValidProduct)
    ) {
      this.validationErrors.products = "Invalid user products";
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private isValidProduct(product: TnewProduct): boolean {
    return (
      typeof product.name === "string" &&
      typeof product.price === "number" &&
      typeof product.description === "string"
    );
  }

  public getUser(): TnewUser | TexistingUser {
    return this.user;
  }

  public updateUser(update: Partial<TexistingUser>): void {
    const updatedUser = { ...this.user, ...update };
    this.validateUser(updatedUser as TexistingUser);
    this.user = updatedUser as TexistingUser;
  }

  public getValidationErrors(): { [key: string]: string } {
    return this.validationErrors;
  }
}
