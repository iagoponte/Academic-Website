import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/appError.js";

export function ensureRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.user) {
      throw new AppError("User not authenticated", 401);
    }

    if (!req.user.roles || req.user.roles.length === 0) {
      throw new AppError("User does not have any roles", 403);
    }

    const hasPermission = req.user.roles.some((userRole) => 
      allowedRoles.includes(userRole)
    );

    if (!hasPermission) {
      throw new AppError("Insufficient permissions", 403);
    }

    return next();
  };
}