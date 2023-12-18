import { Injectable } from "@nestjs/common";
import { ILoginUserDTO } from "./login-user.dto";
import { IUserRepository } from "src/api/repositories/IUserRepository";
import { IHandlePassword } from "src/api/providers/IHandlePassword";
import { IHandleToken } from "src/api/providers/IHandleTokens";

@Injectable()
export class LoginUserService {
  constructor(
    private userRepository: IUserRepository,
    private handlePassword: IHandlePassword,
    private handleToken: IHandleToken,
  ) {}

  async execute({ email, password }: ILoginUserDTO) {
    const user = await this.userRepository.find_first({
      field: "email",
      value: email,
    });

    if (!user) {
      throw {
        statusCode: 404,
        customMessage: "User not found",
      };
    }

    const isValidPass = await this.handlePassword.compare(
      password,
      user.password,
    );

    if (!isValidPass) {
      throw {
        statusCode: 400,
        customMessage: "Incorrect e-mail or password.",
      };
    }

    const token = this.handleToken.generate(user.id);

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
