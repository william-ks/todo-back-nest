import { CreateUserModule } from "./create-user/create-user.module";
import { Module } from "@nestjs/common";
import { LoginUserModule } from "./login-user/login-user.module";

@Module({
  imports: [CreateUserModule, LoginUserModule],
})
export class UserModule {}
