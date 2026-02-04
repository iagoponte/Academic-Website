import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/errors/appError.js';
import { ZodError } from 'zod';

export function globalErrorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction 
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      code: error.statusCode, 
    });
  }

  if (error instanceof ZodError) {
    const formattedErrors: Record<string, string[]> = {};

    error.issues.forEach((issue) => {
        const path = issue.path.join('.') || '_errors';

        if (!formattedErrors[path]) {
            formattedErrors[path] = [];
        }

        formattedErrors[path].push(issue.message);
    });

    return response.status(400).json({
        status: 'validation_error',
        errors: formattedErrors,
    });
  };

  console.error(error); 

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}