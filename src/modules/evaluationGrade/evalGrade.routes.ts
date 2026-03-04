import { Router } from 'express';
import { GradeController } from './evalGrade.controller.js';
import { ensureAuthenticated } from '../../middlewares/authenticate.middleware.js';
import { ensureRoles } from '../../middlewares/authorize.middleware.js';
import { Role } from '../user/user.entity.js';

const gradeRoutes = Router();
const controller = new GradeController();

gradeRoutes.use(ensureAuthenticated);

/**
 * @openapi
 * /api/grades:
 *   post:
 *     summary: Lançar nota
 *     tags:
 *       - Grades
 *     security:
 *       - bearerAuth: []
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
gradeRoutes.post('/', ensureRoles([Role.Administrator, Role.Teacher]), controller.create);
/**
 * @openapi
 * /api/grades/{id}:
 *   put:
 *     summary: Atualizar nota
 *     tags:
 *       - Grades
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
gradeRoutes.put('/:id', ensureRoles([Role.Administrator, Role.Teacher]), controller.update);
/**
 * @openapi
 * /api/grades/enrollment/{enrollmentId}:
 *   get:
 *     summary: Listar notas por matrícula (boletim)
 *     tags:
 *       - Grades
 *     security:
 *       - bearerAuth: []
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
gradeRoutes.get('/enrollment/:enrollmentId', ensureRoles([Role.Administrator, Role.Coordinator, Role.Teacher]), controller.listByEnrollment);
/**
 * @openapi
 * /api/grades/evaluation/{evaluationId}:
 *   get:
 *     summary: Listar notas por avaliação (diário de notas)
 *     tags:
 *       - Grades
 *     security:
 *       - bearerAuth: []
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
gradeRoutes.get('/evaluation/:evaluationId', ensureRoles([Role.Administrator, Role.Teacher]), controller.listByEvaluation);

//ADMIN
/**
 * @openapi
 * /api/grades:
 *   get:
 *     summary: Listar todas as notas (admin)
 *     tags:
 *       - Grades
 *     security:
 *       - bearerAuth: []
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
gradeRoutes.get('/', ensureRoles([Role.Teacher, Role.Administrator]), controller.listAll);
/**
 * @openapi
 * /api/grades/{id}:
 *   get:
 *     summary: Buscar nota por ID (admin)
 *     tags:
 *       - Grades
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
 *         description: Nota encontrada
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
gradeRoutes.get('/:id', ensureRoles([Role.Teacher, Role.Administrator]), controller.getById);
/**
 * @openapi
 * /api/grades/{id}:
 *   delete:
 *     summary: Remover nota
 *     tags:
 *       - Grades
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
 *         description: Nota removida com sucesso
 *       404:
 *         description: Nota não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
gradeRoutes.delete('/:id', ensureRoles([Role.Teacher, Role.Administrator]), controller.delete);

export { gradeRoutes };
