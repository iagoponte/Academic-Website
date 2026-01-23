import { z } from 'zod';

//Swagger Documentation
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEnrollmentDTO:
 *       type: object
 *       required:
 *         - studentId
 *         - classId
 *       properties:
 *         studentId:
 *           type: string
 *           format: uuid
 *           example: a1b2c3d4-e5f6-7890-1234-abcdef123456
 *         classId:
 *           type: string
 *           format: uuid
 *           example: ffeeddcc-bbaa-9988-7766-554433221100
 *
 *     StudentSummary:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - registration
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 111aaa22-bbbb-4ccc-9ddd-eeeeffff0000
 *         name:
 *           type: string
 *           example: João da Silva
 *         registration:
 *           type: string
 *           example: 202312345
 *
 *     ClassSummary:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - semester
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 999aaa88-b777-4c66-9ddd-eeeeffff1111
 *         name:
 *           type: string
 *           example: Matemática
 *         semester:
 *           type: string
 *           example: 2024.1
 *
 *     EnrollmentResponse:
 *       type: object
 *       required:
 *         - id
 *         - student
 *         - class
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         student:
 *           $ref: '#/components/schemas/StudentSummary'
 *         class:
 *           $ref: '#/components/schemas/ClassSummary'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-03-01T10:00:00.000Z
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
 *           example: Enrollment not found
 */

export const createEnrollmentSchema = z.object({
  studentId: z.string().uuid("ID do aluno inválido"),
  classId: z.string().uuid("ID da turma inválido"),
});

