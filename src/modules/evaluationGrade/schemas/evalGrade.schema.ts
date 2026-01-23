/**
 * @openapi
 * components:
 *   schemas:
 *     CreateGradeDTO:
 *       type: object
 *       required:
 *         - enrollmentId
 *         - evaluationId
 *         - value
 *       properties:
 *         enrollmentId:
 *           type: string
 *           format: uuid
 *           example: 9c1c1e2e-5c9d-4c3b-9f34-8f4b5b6f1234
 *         evaluationId:
 *           type: string
 *           format: uuid
 *           example: 7a2f9e3c-3d91-4a8a-bf0a-1c2d3e4f5678
 *         value:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 10
 *           example: 8.5
 *
 *     UpdateGradeDTO:
 *       type: object
 *       required:
 *         - value
 *       properties:
 *         value:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 10
 *           example: 9
 *
 *     GradeResponse:
 *       type: object
 *       required:
 *         - id
 *         - value
 *         - enrollment
 *         - evaluation
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 4b6c2f7a-8e91-4e9f-bb6f-2d9e1a3c4567
 *         value:
 *           type: number
 *           format: float
 *           example: 7.5
 *
 *         enrollment:
 *           type: object
 *           required:
 *             - id
 *             - student
 *             - class
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: a123b456-c789-4d12-9f34-56789abcde01
 *             student:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *                 - registrationNumber
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: f1e2d3c4-b5a6-7890-1234-abcdef123456
 *                 name:
 *                   type: string
 *                   example: João da Silva
 *                 registrationNumber:
 *                   type: string
 *                   example: 202312345
 *             class:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *                 - semester
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 111aaa22-bbbb-4ccc-9ddd-eeeeffff0000
 *                 name:
 *                   type: string
 *                   example: Matemática
 *                 semester:
 *                   type: string
 *                   example: 2024.1
 *
 *         evaluation:
 *           type: object
 *           required:
 *             - id
 *             - type
 *             - weight
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: 999aaa88-b777-4c66-9ddd-eeeeffff1111
 *             type:
 *               type: string
 *               example: Prova
 *             weight:
 *               type: number
 *               format: float
 *               example: 3
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-06-20T10:15:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-06-25T14:40:00.000Z
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
 *           example: Grade not found
 */