// Swagger Documentation
/**
 * @openapi
 * components:
 *   schemas:
 *     ReportCardResponse:
 *       type: object
 *       required:
 *         - student
 *         - class
 *         - evaluations
 *         - average
 *         - status
 *         - generatedAt
 *       properties:
 *         student:
 *           type: object
 *           required:
 *             - name
 *             - registrationNumber
 *           properties:
 *             name:
 *               type: string
 *               example: João da Silva
 *             registrationNumber:
 *               type: string
 *               example: 202312345
 *         class:
 *           type: object
 *           required:
 *             - name
 *             - semester
 *           properties:
 *             name:
 *               type: string
 *               example: Matemática
 *             semester:
 *               type: string
 *               example: 2024.1
 *         evaluations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReportCardEvaluation'
 *         average:
 *           type: number
 *           format: float
 *           example: 7.5
 *         status:
 *           type: string
 *           enum:
 *             - Aprovado
 *             - Reprovado
 *             - Recuperação
 *           example: Aprovado
 *         generatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-06-30T14:30:00.000Z
 *     ReportCardEvaluation:
 *       type: object
 *       required:
 *         - type
 *         - weight
 *         - grade
 *       properties:
 *         type:
 *           type: string
 *           example: Prova
 *         weight:
 *           type: number
 *           format: float
 *           example: 3
 *         grade:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 8.5
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
