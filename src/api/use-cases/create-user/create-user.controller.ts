import { Response } from "express";
import { ICreateUserDTO } from "./create-user.dto";
import { CreateUserService } from "./create-user.service";
import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";

@Controller("user")
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post("create")
  async createUser(@Body() body: ICreateUserDTO, @Res() res: Response) {
    const { name, email, password } = body;
    try {
      await this.createUserService.execute({ name, email, password });
      return res
        .status(HttpStatus.CREATED)
        .json({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }
}
