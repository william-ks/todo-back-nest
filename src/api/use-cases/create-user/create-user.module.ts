import { Module } from "@nestjs/common";
import { IHandlePassword } from "../../providers/IHandlePassword";
import { HandlePassword } from "../../providers/implementations/HandlePassword";
import { PrismaService } from "../../../config/prisma";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserRepository } from "../../repositories/implementations/prisma/UserRepository";
import { CreateUserController } from "./create-user.controller";
import { CreateUserService } from "./create-user.service";

@Module({
  controllers: [CreateUserController],
  providers: [
    CreateUserService,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IHandlePassword,
      useClass: HandlePassword,
    },
  ],
})
export class CreateUserModule {}
