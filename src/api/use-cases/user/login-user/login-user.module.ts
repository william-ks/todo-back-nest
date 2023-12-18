import { Module } from "@nestjs/common";
import { LoginUserController } from "./login-user.controller";
import { LoginUserService } from "./login-user.service";
import { IUserRepository } from "src/api/repositories/IUserRepository";
import { UserRepository } from "src/api/repositories/implementations/prisma/UserRepository";
import { IHandlePassword } from "src/api/providers/IHandlePassword";
import { HandlePassword } from "src/api/providers/implementations/HandlePassword";
import { IHandleToken } from "src/api/providers/IHandleTokens";
import { HandleToken } from "src/api/providers/implementations/HandleToken";

@Module({
  controllers: [LoginUserController],
  providers: [
    LoginUserService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IHandlePassword,
      useClass: HandlePassword,
    },
    {
      provide: IHandleToken,
      useClass: HandleToken,
    },
  ],
})
export class LoginUserModule {}
