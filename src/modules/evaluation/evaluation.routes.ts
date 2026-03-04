import { Router } from "express";
import { EvaluationController } from "./evaluation.controller.js";
import { ensureAuthenticated } from '../../middlewares/authenticate.middleware.js';
import { ensureRoles } from '../../middlewares/authorize.middleware.js';
import { Role } from '../user/user.entity.js';


const evaluationRoutes = Router();
const controller = new EvaluationController();

evaluationRoutes.use(ensureAuthenticated);

/**
 * @openapi
 * /api/evaluations:
 *   post:
 *     summary: Criar avaliação
 *     tags:
 *       - Evaluations
 *     security:
 *       - bearerAuth: []
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
evaluationRoutes.post('/', ensureRoles([Role.Administrator, Role.Teacher]), controller.create);
/**
 * @openapi
 * /api/evaluations/class/{classId}:
 *   get:
 *     summary: Listar avaliações por turma
 *     tags:
 *       - Evaluations
 *     security:
 *       - bearerAuth: []
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
evaluationRoutes.get('/class/:classId', ensureRoles([Role.Administrator, Role.Coordinator, Role.Teacher]), controller.listByClass);

//ADMIN
/**
 * @openapi
 * /api/evaluations:
 *   get:
 *     summary: Listar todas as avaliações (admin)
 *     tags:
 *       - Evaluations
 *     security:
 *       - bearerAuth: []
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
evaluationRoutes.get('/', ensureRoles([Role.Administrator, Role.Coordinator, Role.Teacher]), controller.listAll);
/**
 * @openapi
 * /api/evaluations/{id}:
 *   get:
 *     summary: Buscar avaliação por ID
 *     tags:
 *       - Evaluations
 *     security:
 *       - bearerAuth: []
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
evaluationRoutes.get('/:id', ensureRoles([Role.Administrator, Role.Coordinator, Role.Teacher]), controller.getById);
/**
 * @openapi
 * /api/evaluations/{id}:
 *   put:
 *     summary: Atualizar avaliação
 *     tags:
 *       - Evaluations
 *     security:
 *       - bearerAuth: []
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
evaluationRoutes.put('/:id', ensureRoles([Role.Administrator, Role.Teacher]), controller.update);
/**
 * @openapi
 * /api/evaluations/{id}:
 *   delete:
 *     summary: Remover avaliação
 *     tags:
 *       - Evaluations
 *     security:
 *       - bearerAuth: []
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
evaluationRoutes.delete('/:id', ensureRoles([Role.Administrator, Role.Teacher]), controller.delete);

export { evaluationRoutes };
