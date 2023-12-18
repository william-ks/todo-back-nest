import { Module } from "@nestjs/common";
import { PrismaGlobalModule } from "./config/prisma/prisma-global.module";
import { RoutesModule } from "./api/routes.module";

@Module({
  imports: [PrismaGlobalModule, RoutesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
