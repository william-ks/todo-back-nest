import { Module } from "@nestjs/common";
import { CreateUserModule } from "./api/use-cases/user/create-user/create-user.module";
import { PrismaGlobalModule } from "./config/prisma/prisma-global.module";

@Module({
  imports: [PrismaGlobalModule, CreateUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
