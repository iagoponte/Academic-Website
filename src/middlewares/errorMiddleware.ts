import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/errors/appError.js';
import { ZodError } from 'zod';

// export const handle400Error = (req: Request, res: Response, message: string, responseObject: any) => {
//     res.status(400).json({ status_code: '400',
//         error: 'Error',
//         message: `${message}`,
//         response: responseObject });
// };

// export const handle404Error = (req: Request, res: Response, message: string) => {
//     res.status(404).json({
//         status_code: '404',
//         error: 'Not Found',
//         message: `${message}`
//     });
// };

// export const handle500Error = (req: Request, res: Response, message: string) => {
//     res.status(500).json({
//         status_code: '500',
//         error: 'Internal Server Error',
//         message: `${message}`
//     });
// };

// export const handle401Error = (req: Request, res: Response, message: string) => {
//     res.status(401).json({ status_code: '404',
//         error: 'Incorret Password',
//         message: `${message}`
//     });
// };

export function globalErrorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction // Middlewares de erro PRECISAM ter 4 parâmetros
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      code: error.statusCode, // Add status in the response body
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

  console.error(error); // Log error

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}