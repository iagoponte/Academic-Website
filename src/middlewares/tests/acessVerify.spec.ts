import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { makeReq, makeRes, makeNext } from './helpers.js';
import { ensureAuthenticated } from '../authenticate.middleware.js';
import { ensureRoles } from '../authorize.middleware.js';
import { AppError } from '../../shared/errors/appError.js';
import { Role } from '../../modules/user/user.entity.js';

// Mock JWT_SECRET for testing
process.env.JWT_SECRET = 'test_secret';

describe('ensureAuthenticated', () => {
  let req: ReturnType<typeof makeReq>;
  let res: ReturnType<typeof makeRes>;
  let next: ReturnType<typeof makeNext>;

  beforeEach(() => {
    req = makeReq();
    res = makeRes();
    next = makeNext();
    vi.clearAllMocks();
  });

  it('should throw AppError if token is missing (no Authorization header)', () => {
    req.headers = {};
    expect(() => ensureAuthenticated(req, res, next)).toThrow(
      new AppError('Token missing', 401)
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw AppError if token is missing (no token after split)', () => {
    req.headers = { authorization: 'Bearer' };
    expect(() => ensureAuthenticated(req, res, next)).toThrow(
      new AppError('Token missing', 401)
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw AppError if token is invalid', () => {
    req.headers = { authorization: 'Bearer invalid-token' };
    expect(() => ensureAuthenticated(req, res, next)).toThrow(
      new AppError('Invalid token', 401)
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should set req.user and call next() if token is valid', () => {
    const userId = 'user-id-123';
    const userRoles = [Role.Administrator];
    const token = jwt.sign({ sub: userId, roles: userRoles }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    req.headers = { authorization: `Bearer ${token}` };

    ensureAuthenticated(req, res, next);

    expect(req.user).toEqual({ id: userId, roles: userRoles });
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe('ensureRoles', () => {
  let req: ReturnType<typeof makeReq>;
  let res: ReturnType<typeof makeRes>;
  let next: ReturnType<typeof makeNext>;

  beforeEach(() => {
    req = makeReq();
    res = makeRes();
    next = makeNext();
    vi.clearAllMocks();
  });

  it('should throw AppError if req.user is not set', () => {
    req.user = undefined;
    const allowedRoles = [Role.Administrator];
    const middleware = ensureRoles(allowedRoles);

    expect(() => middleware(req, res, next)).toThrow(
      new AppError('User not authenticated', 401)
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw AppError if user does not have any roles', () => {
    req.user = { id: 'user-id-123', roles: [] };
    const allowedRoles = [Role.Administrator];
    const middleware = ensureRoles(allowedRoles);

    expect(() => middleware(req, res, next)).toThrow(
      new AppError('User does not have any roles', 403)
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw AppError if user has insufficient permissions', () => {
    req.user = { id: 'user-id-123', roles: [Role.Student] };
    const allowedRoles = [Role.Administrator, Role.Teacher];
    const middleware = ensureRoles(allowedRoles);

    expect(() => middleware(req, res, next)).toThrow(
      new AppError('Insufficient permissions', 403)
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() if user has at least one required role', () => {
    req.user = { id: 'user-id-123', roles: [Role.Student, Role.Teacher] };
    const allowedRoles = [Role.Administrator, Role.Teacher];
    const middleware = ensureRoles(allowedRoles);

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call next() if user has all required roles', () => {
    req.user = { id: 'user-id-123', roles: [Role.Administrator, Role.Coordinator] };
    const allowedRoles = [Role.Administrator, Role.Coordinator];
    const middleware = ensureRoles(allowedRoles);

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
