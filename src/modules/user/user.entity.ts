import type { Role } from "../../infraestructure/generated/prisma/enums.js";

export interface User {
    id: string;
    email: string;
    password: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
}