import type { NextFunction, Request, Response } from "express";
import type { Role } from "../modules/user/user.entity.js";
import { AppError } from "../shared/errors/appError.js";

export function authorize(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("User not authenticated", 401);
    }

    const hasPermission = req.user.roles.some((role) =>
      allowedRoles.includes(role),
    );

    if (!hasPermission) {
      throw new AppError("Acess denied", 403);
    }

    return next();
  };
}
