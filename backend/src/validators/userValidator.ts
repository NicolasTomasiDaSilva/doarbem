import { BadRequestError } from "../errors";
import { UserCreationAttributes } from "../database/models/User";
import { cpf } from "cpf-cnpj-validator";
import validator from "validator";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export function validateUser(user: UserCreationAttributes) {
  const requiredFields: (keyof UserCreationAttributes)[] = [
    "firstName",
    "lastName",
    "email",
    "password",
    "cpf",
  ];
  requiredFields.forEach((field) => {
    if (!user[field as keyof typeof user]) {
      const formattedPath = capitalizeFirstLetter(field.toString());
      throw new BadRequestError(`${formattedPath} is required`);
    }
  });

  const nameRegex = /^[a-zA-Z]{2,30}$/;

  if (!nameRegex.test(user.firstName)) {
    throw new BadRequestError("Invalid firstName");
  }

  if (!nameRegex.test(user.lastName)) {
    throw new BadRequestError("Invalid lastName");
  }

  if (!cpf.isValid(user.cpf)) {
    throw new BadRequestError("Invalid cpf");
  }

  if (!validator.isEmail(user.email)) {
    throw new BadRequestError("Invalid email");
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{6,30}$/;
  if (!validator.matches(user.password, passwordRegex)) {
    throw new BadRequestError("Invalid password");
  }
}
