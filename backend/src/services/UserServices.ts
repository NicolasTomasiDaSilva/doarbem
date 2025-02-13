import User from "../database/models/User";
import { UniqueConstraintError, ValidationErrorItem } from "sequelize";
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
} from "../errors";
import { validateUser } from "../validators/userValidator";
import { UserCreationAttributes } from "../database/models/User";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

class UserServices {
  async register(user: UserCreationAttributes) {
    validateUser(user);
    user.email = user.email.toLowerCase();

    try {
      const newUser = await User.create(user);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        error.errors.map((err) => {
          const formattedPath = capitalizeFirstLetter(err.path);
          throw new BadRequestError(`${formattedPath} already exists`);
        });
      } else {
        throw new InternalServerError();
      }
    }
  }
}

export default new UserServices();
