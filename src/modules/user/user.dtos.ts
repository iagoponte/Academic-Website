import { z } from 'zod';
import { createUserSchema, updateUserSchema } from './schema/user.schema.js'
import type { Role } from './user.entity.js';

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;

export interface UserResponseDTO {
    id: string;
    email: string;
    roles: Role[]; // Lembre-se que mudamos para array
    createdAt: Date;
    updatedAt: Date;
}