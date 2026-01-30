// Swagger Documentation
/**
 * @openapi
 * components:
 *   schemas:
 *     ReportCardResponse:
 *       type: object
 *       properties:
 *         student:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             registrationNumber:
 *               type: string
 *         class:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             semester:
 *               type: string
 *         evaluations:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               weight:
 *                 type: number
 *               grade:
 *                 type: number
 *                 nullable: true # Importante: nota pode ser null
 *         average:
 *           type: number
 *         status:
 *           type: string
 *           enum: [Aprovado, Reprovado, Recuperação]
 *         generatedAt:
 *           type: string
 *           format: date-time
 */
