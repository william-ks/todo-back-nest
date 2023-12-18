import { Injectable } from "@nestjs/common";
import { User } from "../../../entities/User";

import {
  IFindFirst,
  IFindOtherEmail,
  IUserRepository,
} from "../../IUserRepository";
import { PrismaService } from "src/config/prisma/prisma";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private db: PrismaService) {}

  async find_first({ field, value }: IFindFirst): Promise<User> {
    const user = await this.db.user.findFirst({
      where: {
        [field]: value,
      },
    });

    return user;
  }

  async find_other_email({ id, email }: IFindOtherEmail): Promise<User | void> {
    const user = await this.db.user.findFirst({
      where: {
        email,
        NOT: {
          id,
        },
      },
    });

    return user;
  }

  async save(props: Omit<User, "id">): Promise<void> {
    await this.db.user.create({
      data: {
        ...props,
      },
    });
  }
}
