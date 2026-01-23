import { Router } from 'express';
import { EnrollmentController } from './enrollment.controller.js';

const enrollmentRoutes = Router();
const controller = new EnrollmentController();

//ROTAS DE DOMÍNIO
/**
 * @openapi
 * /api/enrollments:
 *   post:
 *     summary: Criar matrícula
 *     tags:
 *       - Enrollments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEnrollmentDTO'
 *     responses:
 *       201:
 *         description: Matrícula criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentResponse'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
enrollmentRoutes.post('/', controller.create);
/**
 * @openapi
 * /api/enrollments/students/{studentId}/classes:
 *   get:
 *     summary: Listar turmas de um aluno
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de matrículas do aluno
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EnrollmentResponse'
 *       404:
 *         description: Aluno não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
enrollmentRoutes.get('/students/:studentId/classes', controller.listByStudent);
/**
 * @openapi
 * /api/enrollments/classes/{classId}/students:
 *   get:
 *     summary: Listar alunos de uma turma
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de matrículas da turma
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EnrollmentResponse'
 *       404:
 *         description: Turma não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
enrollmentRoutes.get('/classes/:classId/students', controller.listByClass);

//ROTAS DE ADMIN
/**
 * @openapi
 * /api/enrollments/admin:
 *   get:
 *     summary: Listar todas as matrículas (admin)
 *     tags:
 *       - Enrollments
 *     responses:
 *       200:
 *         description: Lista de todas as matrículas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EnrollmentResponse'
 */
enrollmentRoutes.get('/admin', controller.listAll);
/**
 * @openapi
 * /api/enrollments/admin/{id}:
 *   get:
 *     summary: Buscar matrícula por ID (admin)
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Matrícula encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentResponse'
 *       404:
 *         description: Matrícula não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
enrollmentRoutes.get('/admin/:id', controller.getById);
/**
 * @openapi
 * /api/enrollments/admin/{id}:
 *   delete:
 *     summary: Remover matrícula (admin)
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Matrícula removida com sucesso
 *       404:
 *         description: Matrícula não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
enrollmentRoutes.delete('/admin/:id', controller.delete);

export { enrollmentRoutes };
