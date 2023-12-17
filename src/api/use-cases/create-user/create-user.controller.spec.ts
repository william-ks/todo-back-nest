import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { PrismaService } from "../../../config/prisma";
import { IHandlePassword } from "../../providers/IHandlePassword";
import { HandlePassword } from "../../providers/implementations/HandlePassword";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserRepository } from "../../repositories/implementations/prisma/UserRepository";
import { CreateUserController } from "./create-user.controller";
import { ICreateUserDTO } from "./create-user.dto";
import { CreateUserService } from "./create-user.service";

describe("CreateUserController", () => {
  let controller: CreateUserController;
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        CreateUserService,
        CreateUserService,
        PrismaService,
        {
          provide: IUserRepository,
          useClass: UserRepository,
        },
        {
          provide: IHandlePassword,
          useClass: HandlePassword,
        },
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
    createUserService = module.get<CreateUserService>(CreateUserService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("createUser", () => {
    it("should create a user successfully", async () => {
      // Arrange
      const userDto: ICreateUserDTO = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      const responseMock: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      jest.spyOn(createUserService, "execute").mockResolvedValueOnce();

      // Act
      await controller.createUser(userDto, responseMock);

      // Assert
      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: "User created successfully",
      });
      expect(createUserService.execute).toHaveBeenCalledWith(userDto);
    });

    it("should handle errors during user creation", async () => {
      // Arrange
      const userDto: ICreateUserDTO = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      const responseMock: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const error = "Something went wrong";
      jest.spyOn(createUserService, "execute").mockRejectedValueOnce(error);

      // Act
      await controller.createUser(userDto, responseMock);

      // Assert
      expect(responseMock.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(responseMock.json).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
      expect(createUserService.execute).toHaveBeenCalledWith(userDto);
    });
  });
});
