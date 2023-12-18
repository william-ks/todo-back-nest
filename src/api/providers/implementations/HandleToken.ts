import { Catch, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { IHandleToken } from "../IHandleTokens";

@Injectable()
export class HandleToken implements IHandleToken {
  generate(userId: string): string {
    const token = jwt.sign({}, process.env.JWT_PASS, {
      subject: userId,
      expiresIn: `8h`,
    });

    return token;
  }

  validate(token: string): string {
    try {
      const { sub } = jwt.verify(token, process.env.JWT_PASS);

      return sub as string;
    } catch (e) {
      return "Invalid Error";
    }
  }
}
