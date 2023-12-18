import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { ILoginUserDTO } from "./login-user.dto";
import { LoginUserService } from "./login-user.service";

@Controller()
export class LoginUserController {
  constructor(private readonly loginUserService: LoginUserService) {}

  @Post("/user/login")
  async LoginUser(@Body() body: ILoginUserDTO, @Res() res: Response) {
    const { email, password } = body;
    try {
      const userReturn = await this.loginUserService.execute({
        email,
        password,
      });

      return res.status(HttpStatus.OK).json(userReturn);
    } catch (error) {
      console.log(error);
      return res
        .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.customMessage || "Internal Server Error" });
    }
  }
}
