import { z } from 'zod';

//Swagger Documentation
/**
 * @openapi
 * components:
 *   schemas:
 *
 *     Class:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - semester
 *         - createdAt
 *         - teachers
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 8a1b2c3d-4e5f-6789-abcd-1234567890ef
 *         name:
 *           type: string
 *           example: Matemática
 *         semester:
 *           type: string
 *           example: 2024.1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-02-01T10:30:00.000Z
 *         teachers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ClassTeacher'
 *
 *     ClassTeacher:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: d1e2f3a4-b5c6-7890-abcd-ef1234567890
 *         name:
 *           type: string
 *           example: Maria Oliveira
 *         email:
 *           type: string
 *           format: email
 *           example: maria.oliveira@universidade.edu.br
 *
 *     CreateClass:
 *       type: object
 *       required:
 *         - name
 *         - semester
 *       properties:
 *         name:
 *           type: string
 *           example: Física
 *         semester:
 *           type: string
 *           example: 2024.2
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           example: 404
 *         error:
 *           type: string
 *           example: Not Found
 *         message:
 *           type: string
 *           example: Class not found
 */


export const createClassSchema = z.object({
  name: z.string().min(3, "O nome da disciplina deve ser claro"),
  semester: z
    .string()
    .regex(/^\d{4}\.\d$/, "Formato inválido. Use AAAA.S (ex: 2025.1)"),
  teacherIds: z.array(z.string().uuid("ID de professor inválido")).optional(),
});
