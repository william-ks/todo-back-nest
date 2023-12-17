import { Module } from "@nestjs/common";
import { CreateUserModule } from "./api/use-cases/create-user/create-user.module";

@Module({
  imports: [CreateUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
