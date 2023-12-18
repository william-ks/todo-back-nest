import { Response } from "express";
import { ICreateUserDTO } from "./create-user.dto";
import { CreateUserService } from "./create-user.service";
import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";

@Controller()
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post("/user/create")
  async createUser(@Body() body: ICreateUserDTO, @Res() res: Response) {
    const { name, email, password } = body;
    try {
      await this.createUserService.execute({ name, email, password });
      return res
        .status(HttpStatus.CREATED)
        .json({ message: "User created successfully" });
    } catch (error) {
      return res
        .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.customMessage || "Internal Server Error" });
    }
  }
}
