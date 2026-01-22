import type { Request, Response } from 'express';
import { AppError } from '../errors/appError.js';

export function getStringParam(req: Request, paramName: string): string {
    const value = req.params[paramName];

    if (typeof value !== 'string') {
        throw new AppError(`Parameter '${paramName}' is missing or invalid`, 400);
    }

    const cleanedValue = value.trim();

    if (cleanedValue.length === 0) {
        throw new AppError(`Parameter '${paramName}' cannot be empty`, 400);
    }

    return cleanedValue;
}
