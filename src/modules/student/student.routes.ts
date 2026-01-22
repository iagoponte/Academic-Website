import { Router } from 'express';
import { StudentController } from './student.controller.js';

const studentRoutes = Router();
const controller = new StudentController();

studentRoutes.post('/', controller.create);
studentRoutes.get('/', controller.list);
studentRoutes.get('/:id', controller.getById);
studentRoutes.put('/:id', controller.update);
studentRoutes.patch('/:id/inactivate', controller.inactivate);
studentRoutes.patch(
  '/:id/correct-registration',
  controller.correctRegistration,
);

export { studentRoutes };
