import { Router } from 'express';
import { GradeController } from './evalGrade.controller.js';
import { ensureAuthenticated } from '../../middlewares/authenticate.middleware.js';
import { ensureRoles } from '../../middlewares/authorize.middleware.js';

const gradeRoutes = Router();
const controller = new GradeController();

/**
 * @openapi
 * /api/grades:
 *   post:
 *     summary: Lançar nota
 *     tags:
 *       - Grades
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGradeDTO'
 *     responses:
 *       201:
 *         description: Nota lançada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GradeResponse'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
gradeRoutes.post('/', controller.create);
/**
 * @openapi
 * /api/grades/{id}:
 *   put:
 *     summary: Atualizar nota
 *     tags:
 *       - Grades
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
 *             $ref: '#/components/schemas/UpdateGradeDTO'
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GradeResponse'
 *       404:
 *         description: Nota não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
gradeRoutes.put('/:id', controller.update);
/**
 * @openapi
 * /api/grades/enrollment/{enrollmentId}:
 *   get:
 *     summary: Listar notas por matrícula (boletim)
 *     tags:
 *       - Grades
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de notas da matrícula
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GradeResponse'
 *       404:
 *         description: Matrícula não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
gradeRoutes.get('/enrollment/:enrollmentId', controller.listByEnrollment);
/**
 * @openapi
 * /api/grades/evaluation/{evaluationId}:
 *   get:
 *     summary: Listar notas por avaliação (diário de notas)
 *     tags:
 *       - Grades
 *     parameters:
 *       - in: path
 *         name: evaluationId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de notas da avaliação
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GradeResponse'
 *       404:
 *         description: Avaliação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
gradeRoutes.get('/evaluation/:evaluationId', controller.listByEvaluation);

//ADMIN
/**
 * @openapi
 * /api/grades:
 *   get:
 *     summary: Listar todas as notas (admin)
 *     tags:
 *       - Grades
 *     responses:
 *       200:
 *         description: Lista de todas as notas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GradeResponse'
 */
gradeRoutes.get('/', ensureAuthenticated, ensureRoles(['Teacher', 'Administrator']), controller.listAll);
/**
 * @openapi
 * /api/grades:
 *   get:
 *     summary: Listar todas as notas (admin)
 *     tags:
 *       - Grades
 *     responses:
 *       200:
 *         description: Lista de todas as notas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GradeResponse'
 */
gradeRoutes.get('/:id', ensureAuthenticated, ensureRoles(['Teacher', 'Administrator']), controller.getById);
/**
 * @openapi
 * /api/grades/{id}:
 *   delete:
 *     summary: Remover nota
 *     tags:
 *       - Grades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Nota removida com sucesso
 *       404:
 *         description: Nota não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
gradeRoutes.delete('/:id', ensureAuthenticated, ensureRoles(['Teacher', 'Administrator']), controller.delete);

export { gradeRoutes };
