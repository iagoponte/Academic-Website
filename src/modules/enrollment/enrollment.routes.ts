import { Router } from 'express';
import { EnrollmentController } from './enrollment.controller.js';

const enrollmentRoutes = Router();
const controller = new EnrollmentController();

/* ======================================================
 * ROTAS DE DOMÍNIO
 * ====================================================== */

// Criar matrícula
// POST /api/enrollments
enrollmentRoutes.post('/', controller.create);

// Turmas de um aluno
// GET /api/enrollments/students/:studentId/classes
enrollmentRoutes.get('/students/:studentId/classes', controller.listByStudent);

// Alunos de uma turma
// GET /api/enrollments/classes/:classId/students
enrollmentRoutes.get('/classes/:classId/students', controller.listByClass);

/* ======================================================
 * ROTAS ADMIN
 * ====================================================== */

// Listar todas as matrículas
// GET /api/enrollments/admin
enrollmentRoutes.get('/admin', controller.listAll);

// Buscar matrícula por ID
// GET /api/enrollments/admin/:id
enrollmentRoutes.get('/admin/:id', controller.getById);

// Remover matrícula
// DELETE /api/enrollments/admin/:id
enrollmentRoutes.delete('/admin/:id', controller.delete);

export { enrollmentRoutes };
