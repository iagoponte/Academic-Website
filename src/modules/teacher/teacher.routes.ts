import { Router } from 'express';
import { TeacherController } from './teacher.controller.js';

const teacherRoutes = Router();
const controller = new TeacherController();

/**
 * @openapi
 * /api/teachers/:
 *   post:
 *     summary: Cria um novo professor
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTeacher'
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherResponse'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
teacherRoutes.post('/', controller.create);
/**
 * @openapi
 * /api/teachers/:
 *   get:
 *     summary: Lista todos os professores
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Lista de professores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeacherResponse'
 */
teacherRoutes.get('/', controller.list);
/**
 * @openapi
 * /api/teachers/{id}:
 *   get:
 *     summary: Busca professor por ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Professor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherResponse'
 *       404:
 *         description: Professor não encontrado
 */
teacherRoutes.get('/:id', controller.getById);
/**
 * @openapi
 * /api/teachers/{id}:
 *   put:
 *     summary: Atualiza um professor
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTeacher'
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherResponse'
 */
teacherRoutes.put('/:id', controller.update);
/**
 * @openapi
 * /api/teachers/{id}:
 *   delete:
 *     summary: Remove um professor
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Professor removido com sucesso
 */
teacherRoutes.delete('/:id', controller.delete);

export { teacherRoutes };