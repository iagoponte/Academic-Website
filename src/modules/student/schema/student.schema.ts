import { z } from 'zod';

//Swagger Documentation
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateStudent:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - registrationNumber
 *       properties:
 *         name:
 *           type: string
 *           example: Maria Souza
 *         email:
 *           type: string
 *           format: email
 *           example: maria.souza@email.com
 *         registrationNumber:
 *           type: string
 *           example: 202400123
 *
 *     UpdateStudent:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Maria Souza Atualizada
 *         email:
 *           type: string
 *           format: email
 *           example: maria.nova@email.com
 *
 *     CorrectStudentRegistration:
 *       type: object
 *       required:
 *         - newRegistrationNumber
 *         - reason
 *       properties:
 *         newRegistrationNumber:
 *           type: string
 *           example: 202400999
 *         reason:
 *           type: string
 *           example: Erro de digitação na matrícula original
 *
 *     StudentResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: uuid
 *         registrationNumber:
 *           type: string
 *           example: 202400123
 *         name:
 *           type: string
 *           example: Maria Souza
 *         email:
 *           type: string
 *           format: email
 *           example: maria.souza@email.com
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *           example: ACTIVE
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

export const createStudentSchema = z.object({
  name: z.string().min(3, "Name too short"),
  email: z.string().email("E-mail invalid"),
  registrationNumber: z.string().length(10),
});

export const updateStudentSchema = createStudentSchema
.extend({
  isActive: z.boolean()
})
.partial();