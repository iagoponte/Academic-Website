import { z } from 'zod';
import { Role } from '../../../infraestructure/generated/prisma/enums.js';

export const createUserSchema = z.object({
  name: z.string().min(3).optional(), // Opcional pois User puro não tem name obrigatório no schema, mas é bom ter
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(Role), // Valida se é ADMIN, TEACHER, etc.
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  // role: z.nativeEnum(Role).optional(), // Cuidado: permitir troca de role é perigoso
});