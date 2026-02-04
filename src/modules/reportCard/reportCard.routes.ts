import { Router } from 'express';
import { ReportCardController } from './reportCard.controller.js';

const reportCardRoutes = Router();
const controller = new ReportCardController();

/**
 * @openapi
 * /report-cards/enrollments/{id}:
 *   get:
 *     summary: Gera o boletim do aluno (JSON)
 *     tags: [Report Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da matrícula
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Boletim gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReportCardResponse'
 *       404:
 *         description: Matrícula não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
reportCardRoutes.get('/enrollments/:id', controller.generate.bind(controller));
/**
 * @openapi
 * /report-cards/enrollments/{id}/pdf:
 *   get:
 *     summary: Gera o boletim do aluno em PDF
 *     tags: [Report Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da matrícula
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF do boletim
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Matrícula não encontrada
 */
reportCardRoutes.get('/enrollments/:id/pdf', controller.generatePdf.bind(controller));

export { reportCardRoutes };
