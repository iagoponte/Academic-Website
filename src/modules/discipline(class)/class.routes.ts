import { Router } from "express";
import { ClassController } from "./class.controller.js";

const classRoutes = Router();
const controller = new ClassController();

classRoutes.post('/', controller.create);
classRoutes.get('/', controller.list);
classRoutes.get('/:id', controller.getById);

export { classRoutes };