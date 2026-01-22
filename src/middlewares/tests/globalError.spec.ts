import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { globalErrorHandler } from "../errorMiddleware.js";
import { AppError } from "../../shared/errors/appError.js";
import { ZodError, z } from "zod";

describe("globalErrorHandler", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  it("should handle AppError correctly", () => {
    const error = new AppError("Not found", 404);
    globalErrorHandler(error, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Not found",
      code: 404,
    });
  });

  it("should handle ZodError correctly", () => {
    const schema = z.object({
      name: z.string().min(3),
      age: z.number().min(18),
    });
    try {
      schema.parse({ name: "Jo", age: 15 });
    } catch (error) {
      globalErrorHandler(
        error as ZodError,
        req as Request,
        res as Response,
        next,
      );
    }
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "validation_error",
      errors: {
        name: ["Too small: expected string to have >=3 characters"],
        age: ["Too small: expected number to be >=18"],
      },
    });
  });

  it("should handle generic error as internal server error", () => {
    const error = new Error("Unexpected failure");
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    globalErrorHandler(error, req as Request, res as Response, next);
    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Internal server error",
    });
    consoleSpy.mockRestore();
  });
});
