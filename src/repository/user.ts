import { ExistingUser, NewUser } from "../Entity/user";

interface IUserMockRepository {
  create(user: NewUser): Promise<ExistingUser | string>;
  read(id: string): Promise<ExistingUser | string>;
}

export class UserRepository {
  #mockRepository: IUserMockRepository;
  #isApi: boolean;

  constructor(mockRepository: IUserMockRepository, isApi: boolean) {
    this.#mockRepository = mockRepository;
    this.#isApi = isApi;
  }

  async create(user: NewUser): Promise<ExistingUser | string> {
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

  async read(id: string): Promise<ExistingUser | string> {
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
}

export class UserMockRepository {
  #users: ExistingUser[] = [];

  constructor(users: ExistingUser[]) {
    this.#users = users;
  }

  async create(user: NewUser): Promise<ExistingUser | string> {
    const existingUser: ExistingUser = {
      id: (this.#users.length + 1).toString(),
      ...user,
    };
    this.#users.push(existingUser);
    return new Promise((resolve) =>
      setTimeout(() => resolve(existingUser), 500)
    );
  }

  async read(id: string): Promise<ExistingUser | string> {
    const user = this.#users.find((user) => user.id === id);
    if (user) {
      return new Promise((resolve) => setTimeout(() => resolve(user), 500));
    }
    return new Promise((resolve) =>
      setTimeout(() => resolve("User not found"), 500)
    );
  }
}
