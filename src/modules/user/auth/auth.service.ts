import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../../infraestructure/prisma/client.js";
import { AppError } from "../../../shared/errors/appError.js";
import type { LoginDTO } from "./auth.dto.js";
import { UserService } from "../user.service.js";
import { UserRepository } from "../user.repository.js";

export class AuthService {
  async execute({ email, password }: LoginDTO) {
    const userService = new UserService(new UserRepository());

    const user = await userService.getByEmail(email);
    if (!user) throw new AppError("Email ou senha incorretos", 401);

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError("Email ou senha incorretos", 401);

    const token = jwt.sign(
      {
        roles: user.roles, //all roles goes into token
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "1d",
      },
    );

    const {password: _, ...userNoPassword} = user;

    return { token, userNoPassword };
  }
}
