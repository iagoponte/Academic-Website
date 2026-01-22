import { Router } from "express";
import { EvaluationController } from "./evaluation.controller.js";


const evaluationRoutes = Router();
const controller = new EvaluationController();


evaluationRoutes.post('/', controller.create);
evaluationRoutes.get('/class/:classId', controller.listByClass);

//ADMIN
evaluationRoutes.get('/', controller.listAll);
evaluationRoutes.get('/:id', controller.getById);
evaluationRoutes.put('/:id', controller.update);
evaluationRoutes.delete('/:id', controller.delete);

export { evaluationRoutes };
