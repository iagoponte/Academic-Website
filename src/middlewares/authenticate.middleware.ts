import type { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/appError.js";
import { prisma } from "../infraestructure/prisma/client.js";
import jwt from 'jsonwebtoken'
import { mapRolesToDomain } from "../modules/user/user.mapper.js";

interface JwtPayload {
    sub: string;
}

export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw new AppError('Token not found', 401);
    }

    const [, token] = authHeader.split(' ');
    if(!token) {
        throw new AppError('Token with wrong format', 401);
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        const user = await prisma.user.findUnique({
            where: { id: decoded.sub },
            select: {
                id: true,
                roles: true,
            },
        });
        if (!user) {
            throw new AppError('User not found', 401);
        }
        req.user = {
            id: user.id,
            roles: mapRolesToDomain(user.roles),
        };

        return next();
    } catch {
        throw new AppError('Token expired or invalid', 401);
    }
}