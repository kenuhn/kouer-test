import db from "../../Mock-db/db.json";
import { UserMockRepository, UserRepository } from "./user";

const mockRepository = new UserMockRepository(db.user);
export const userRepository = new UserRepository(mockRepository, false);
