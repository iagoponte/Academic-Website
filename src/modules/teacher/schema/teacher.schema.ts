import { z } from 'zod';

/**
 * @openapi
 * components:
 * schemas:
 * CreateTeacher:
 * type: object
 * required:
 * - name
 * - email
 * - password
 * properties:
 * name:
 * type: string
 * minLength: 3
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * minLength: 6
 * UpdateTeacher:
 * type: object
 * properties:
 * name:
 * type: string
 * example: João Professor Atualizado
 * TeacherResponse:
 * type: object
 * properties:
 * id:
 * type: string
 * userId:
 * type: string
 * name:
 * type: string
 * email:
 * type: string
 * createdAt:
 * type: string
 * format: date-time
 * updatedAt:
 * type: string
 * format: date-time
 */

export const createTeacherSchema = z.object({
  name: z.string().min(3, "Name too short"),
  email: z.string().email("E-mail invalid"),
  password: z.string().min(6, "Password has to be at least 6 characters long"),
});

export const updateTeacherSchema = z.object({
  name: z.string().min(3).optional(),
});