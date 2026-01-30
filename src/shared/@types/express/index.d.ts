import type { Role } from "../../../modules/user/user.entity.ts";

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      roles: Role[];
    };
  }
}

export {}
