import { vi } from 'vitest';
import type { Request, Response, NextFunction } from 'express';

export function makeReq(overrides?: Partial<Request>) {
  return {
    headers: {},
    ...overrides,
  } as Request;
}

export function makeRes() {
  const res = {} as Response;

  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);

  return res;
}

export function makeNext(): NextFunction {
  return vi.fn();
}
