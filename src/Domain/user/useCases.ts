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
  getUser(id: number): Promise<TexistingUser | string>;
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

  async getUser(id: number): Promise<TexistingUser | string> {
    const user: TexistingUser | string = await this.userRepository.read(id);
    if (typeof user === "string") {
      return user;
    }

    localStorage.setItem("userId", JSON.stringify(user.id));

    return user;
  }

  async login(user: userDto): Promise<TexistingUser | string> {
    return this.userRepository.login(user);
  }

  async addToCart(id: number, product: TexistingProduct): Promise<string> {
    return this.userRepository.addProduct(id, product);
  }
}

export const userService = new UserService(userRepository);
