import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../shared/errors/appError.js";
import { Role } from "../modules/user/user.entity.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "default_secret";

interface TokenPayload {
  sub: string;
  roles: Role[]; 
  iat: number;
  exp: number;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Token missing", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as TokenPayload;

    req.user = {
      id: decoded.sub,
      roles: decoded.roles 
    };

    return next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}