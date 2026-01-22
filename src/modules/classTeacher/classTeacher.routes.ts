import { Router } from 'express';
import { ClassTeacherController } from './classTeacher.controller.js';

const classTeacherRoutes = Router();
const classTeacherController = new ClassTeacherController();

classTeacherRoutes.post('/classes/:id/teachers', classTeacherController.assign);
classTeacherRoutes.delete('/classes/:id/teachers/:teacherId', classTeacherController.unassign);

export { classTeacherRoutes };