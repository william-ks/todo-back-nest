import { Module } from "@nestjs/common";
import { UserModule } from "./use-cases/user/user.module";

@Module({
  imports: [UserModule],
})
export class RoutesModule {}
