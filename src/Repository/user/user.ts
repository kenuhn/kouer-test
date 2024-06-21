import { TexistingUser, TnewUser, userDto } from "../../Entity/user";
export interface IUserMockRepository {
  create(user: TnewUser): Promise<TexistingUser | string>;
  read(id: number): Promise<TexistingUser | string>;
  findByNameAndPassword(user: userDto): Promise<TexistingUser | string>;
  /*   createProduct(id: number, product: TexistingProduct): Promise<string>; */
}

export class UserRepository {
  #mockRepository: IUserMockRepository;
  #isApi: boolean;

  constructor(mockRepository: IUserMockRepository, isApi: boolean) {
    this.#mockRepository = mockRepository;
    this.#isApi = isApi;
  }

  async create(user: TnewUser): Promise<TexistingUser | string> {
    try {
      if (this.#isApi == true) {
        const response = await fetch("https://my-api.com/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await response.json();

        return data;
      }

      return this.#mockRepository.create(user);
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "unknown error";
    }
  }

  async read(id: number): Promise<TexistingUser | string> {
    try {
      if (this.#isApi == true) {
        const response = await fetch("https://my-api.com/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        });

        const data = await response.json();

        return data;
      }
      return this.#mockRepository.read(id);
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "unknown error";
    }
  }

  async login(user: userDto): Promise<TexistingUser | string> {
    try {
      if (this.#isApi == true) {
        const response = await fetch("https://my-api.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await response.json();

        return data;
      }
      return this.#mockRepository.findByNameAndPassword(user);
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "unknown error";
    }
  }
}

export class UserMockRepository {
  #users: TexistingUser[] = [];

  constructor(users: TexistingUser[]) {
    this.#users = users;
  }

  async create(user: TnewUser): Promise<TexistingUser | string> {
    const existingUser: TexistingUser = {
      id: this.#users.length + 1,
      ...user,
    };
    this.#users.push(existingUser);
    return new Promise((resolve) =>
      setTimeout(() => resolve(existingUser), 500)
    );
  }

  async read(id: number): Promise<TexistingUser | string> {
    const user = this.#users.find((user) => user.id === id);
    if (user) {
      return new Promise((resolve) => setTimeout(() => resolve(user), 500));
    }
    return "User not found";
  }

  async findByNameAndPassword(user: userDto): Promise<TexistingUser | string> {
    const isUser = this.#users.find(
      (item) => item.email === user.email && item.password === user.password
    );

    if (isUser) {
      return new Promise((resolve) => setTimeout(() => resolve(isUser), 500));
    }
    return "User not found";
  }

  /*   createProduct(id: number, product: TexistingProduct): Promise< string> {

    const user = this.#users.find((user) => user.id === id);
    if (user) {
      user.products.push(product);
      return new Promise((resolve) => setTimeout(() => resolve("product added"), 500));
    }
    return "User not found";
  } */
}
