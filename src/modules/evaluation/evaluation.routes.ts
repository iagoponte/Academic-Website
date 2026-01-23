import { Router } from "express";
import { EvaluationController } from "./evaluation.controller.js";


const evaluationRoutes = Router();
const controller = new EvaluationController();

/**
 * @openapi
 * /api/evaluations:
 *   post:
 *     summary: Criar avaliação
 *     tags:
 *       - Evaluations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEvaluationDTO'
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvaluationResponse'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
evaluationRoutes.post('/', controller.create);
/**
 * @openapi
 * /api/evaluations/class/{classId}:
 *   get:
 *     summary: Listar avaliações por turma
 *     tags:
 *       - Evaluations
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de avaliações da turma
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EvaluationResponse'
 *       404:
 *         description: Turma não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
evaluationRoutes.get('/class/:classId', controller.listByClass);

//ADMIN
/**
 * @openapi
 * /api/evaluations:
 *   get:
 *     summary: Listar todas as avaliações (admin)
 *     tags:
 *       - Evaluations
 *     responses:
 *       200:
 *         description: Lista de todas as avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EvaluationResponse'
 */
evaluationRoutes.get('/', controller.listAll);
/**
 * @openapi
 * /api/evaluations/{id}:
 *   get:
 *     summary: Buscar avaliação por ID
 *     tags:
 *       - Evaluations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvaluationResponse'
 *       404:
 *         description: Avaliação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
evaluationRoutes.get('/:id', controller.getById);
/**
 * @openapi
 * /api/evaluations/{id}:
 *   put:
 *     summary: Atualizar avaliação
 *     tags:
 *       - Evaluations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEvaluationDTO'
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvaluationResponse'
 *       404:
 *         description: Avaliação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
evaluationRoutes.put('/:id', controller.update);
/**
 * @openapi
 * /api/evaluations/{id}:
 *   delete:
 *     summary: Remover avaliação
 *     tags:
 *       - Evaluations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Avaliação removida com sucesso
 *       404:
 *         description: Avaliação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
evaluationRoutes.delete('/:id', controller.delete);

export { evaluationRoutes };
