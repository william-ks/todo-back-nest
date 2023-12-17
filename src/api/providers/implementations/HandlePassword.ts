import { Injectable } from "@nestjs/common";
import { IHandlePassword } from "../IHandlePassword";
import * as bcrypt from "bcrypt";

@Injectable()
export class HandlePassword implements IHandlePassword {
  async hash(password: string): Promise<string> {
    const hashPass = await bcrypt.hash(password, 10);

    return hashPass;
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hashPassword);

    return isValid;
  }
}
