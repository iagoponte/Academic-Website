import { z } from 'zod';

//Swagger Documentation
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTeacher:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           example: João Professor
 *         email:
 *           type: string
 *           format: email
 *           example: joao.professor@email.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: senha123
 *
 *     UpdateTeacher:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: João Professor Atualizado
 *         email:
 *           type: string
 *           format: email
 *           example: joao.novo@email.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: novasenha123
 *
 *     TeacherResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: uuid
 *         name:
 *           type: string
 *           example: João Professor
 *         email:
 *           type: string
 *           format: email
 *           example: joao.professor@email.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-01-20T10:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-01-20T10:00:00.000Z
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           example: 400
 *         error:
 *           type: string
 *           example: Bad Request
 *         message:
 *           type: string
 *           example: Validation error
 */

export const createTeacherSchema = z.object({
  name: z.string().min(3, "Name too short"),
  email: z.string().email("E-mail invalid"),
  password: z.string().min(6, "Password has to be at least 6 characters long"),
});

export const updateTeacherSchema = createTeacherSchema.partial();