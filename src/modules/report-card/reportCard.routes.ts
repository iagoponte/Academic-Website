import { Router } from 'express';
import { ReportCardController } from './reportCard.controller.js';

const reportCardRoutes = Router();
const controller = new ReportCardController();

reportCardRoutes.get('/enrollments/:id', controller.generate.bind(controller));
reportCardRoutes.get('/enrollments/:id/pdf', controller.generatePdf.bind(controller));

export { reportCardRoutes };
