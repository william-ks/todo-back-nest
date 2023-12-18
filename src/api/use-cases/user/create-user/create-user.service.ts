import { IUserRepository } from "../../../repositories/IUserRepository";
import { Injectable } from "@nestjs/common";
import { ICreateUserDTO } from "./create-user.dto";
import { IHandlePassword } from "../../../providers/IHandlePassword";

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private handlePassword: IHandlePassword,
  ) {}

  async execute(props: ICreateUserDTO) {
    const { name, email, password } = props;

    const alreadyExists = await this.userRepository.find_first({
      field: "email",
      value: email,
    });

    if (alreadyExists) {
      throw {
        statusCode: 400,
        customMessage: "Email already exists.",
      };
    }

    const hashPassword = await this.handlePassword.hash(password);

    this.userRepository.save({
      name,
      email,
      password: hashPassword,
    });
  }
}
