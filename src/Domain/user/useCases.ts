import { TexistingProduct } from "../../Entity/product";
import {
  TexistingUser,
  TnewUser,
  TuserError,
  UserEntity,
  userDto,
} from "../../Entity/user";
import { userRepository } from "../../Repository/user";
import { IUserRepository } from "../../Repository/user/user";

export interface IUserService {
  register(
    user: TnewUser
  ): Promise<TexistingUser | string | { [key: string]: string }>;
  getUser(id: number): Promise<TexistingUser | null>;
  login(user: userDto): Promise<TexistingUser | string>;
  addToCart(id: number, product: TexistingProduct): Promise<string>;
}

class UserService implements IUserService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async register(
    newUser: TnewUser
  ): Promise<TexistingUser | string | TuserError> {
    const userEntity = new UserEntity(newUser);
    const userError = userEntity.getValidationErrors();

    console.log("userError", userError);
    if (Object.keys(userError).length > 0) {
      return { ...userError, message: "error" };
    }

    const user: TexistingUser | string = await this.userRepository.create(
      userEntity.getUser()
    );

    return user;
  }

  async getUser(): Promise<TexistingUser | null> {
    const idStorage = localStorage.getItem("userId");
    if (idStorage) {
      const user: TexistingUser | string = await this.userRepository.read(
        Number(idStorage)
      );

      if (typeof user === "string") {
        return null;
      }
      return user;
    }

    return null;
  }

  async login(userDTO: userDto): Promise<TexistingUser | string> {
    const user: TexistingUser | string = await this.userRepository.login(
      userDTO
    );
    if (typeof user === "string") {
      return user;
    }

    localStorage.setItem("userId", JSON.stringify(user.id));

    return user;
  }

  async addToCart(id: number, product: TexistingProduct): Promise<string> {
    return this.userRepository.addProduct(id, product);
  }
}

export const userService = new UserService(userRepository);
