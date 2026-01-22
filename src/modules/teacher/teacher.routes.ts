import { Router } from 'express';
import { TeacherController } from './teacher.controller.js';

const teacherRoutes = Router();
const controller = new TeacherController();

teacherRoutes.post('/', controller.create);
teacherRoutes.get('/', controller.list);
teacherRoutes.get('/:id', controller.getById);
teacherRoutes.put('/:id', controller.update);
teacherRoutes.delete('/:id', controller.delete);

export { teacherRoutes };