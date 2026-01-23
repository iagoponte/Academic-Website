import { z } from 'zod';
import { EvaluationType } from '../evaluation.entity.js';

//Swagger Documentation
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEvaluationDTO:
 *       type: object
 *       required:
 *         - type
 *         - weight
 *         - classId
 *       properties:
 *         type:
 *           type: string
 *           description: Tipo da avaliação
 *           example: PROVA
 *         description:
 *           type: string
 *           nullable: true
 *           maxLength: 255
 *           example: Prova final do semestre
 *         weight:
 *           type: number
 *           format: float
 *           example: 3
 *         classId:
 *           type: string
 *           format: uuid
 *           example: a1b2c3d4-e5f6-7890-1234-abcdef123456
 *
 *     UpdateEvaluationDTO:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: TRABALHO
 *         description:
 *           type: string
 *           nullable: true
 *           maxLength: 255
 *           example: Trabalho em grupo
 *         weight:
 *           type: number
 *           format: float
 *           example: 2
 *
 *     EvaluationResponse:
 *       type: object
 *       required:
 *         - id
 *         - type
 *         - weight
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 9f8e7d6c-5b4a-3210-fedc-ba9876543210
 *         type:
 *           type: string
 *           example: PROVA
 *         description:
 *           type: string
 *           nullable: true
 *           example: Prova final do semestre
 *         weight:
 *           type: number
 *           format: float
 *           example: 3
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-06-10T10:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-06-12T14:30:00.000Z
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
 *           example: Evaluation not found
 */

export const createEvaluationSchema = z.object({
  type: z.nativeEnum(EvaluationType, {
    error: () => ({ message: "Tipo inválido." })
  }),
  description: z.string().max(255, "Descrição muito longa") || z.null(),
  weight: z.number(),
  classId: z.string().uuid(),
});

export const updateEvaluationSchema = createEvaluationSchema
  .omit({ classId: true }) 
  .partial();
