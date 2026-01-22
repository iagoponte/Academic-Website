import { Router } from 'express';
import { GradeController } from './evalGrade.controller.js';

const gradeRoutes = Router();
const controller = new GradeController();

// Lançar nota
gradeRoutes.post('/', controller.create);

// Atualizar nota
gradeRoutes.put('/:id', controller.update);

// Boletim (por matrícula)
gradeRoutes.get('/enrollment/:enrollmentId', controller.listByEnrollment);

// Diário (por avaliação)
gradeRoutes.get('/evaluation/:evaluationId', controller.listByEvaluation);

//ADMIN
gradeRoutes.get('/', controller.listAll);
gradeRoutes.get('/:id', controller.getById);
gradeRoutes.delete('/:id', controller.delete);

export { gradeRoutes };
