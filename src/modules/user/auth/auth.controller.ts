import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { loginSchema } from "./auth.dto.js";

export class AuthController {
  private authService = new AuthService();

  handle = async (req: Request, res: Response): Promise<Response> => {
    console.log('entrou na função handle')
    const { email, password } = loginSchema.parse(req.body);
    const result = await this.authService.execute({ email, password });
    return res.json(result);
  };
}