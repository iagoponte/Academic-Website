import type { Request, Response } from "express";
import { getStringParam } from "../../shared/http/params.js";
import { ClassRepository } from "../discipline(class)/class.repository.js";
import { EvaluationRepository } from "./evaluation.repository.js";
import { EvaluationService } from "./evaluation.service.js";

export class EvaluationController {
  private service = new EvaluationService(new EvaluationRepository(), new ClassRepository());

  create = async (req: Request, res: Response) => {
    const evaluation = await this.service.create(req.body);
    return res.status(201).json(evaluation);
  };

  listByClass = async (req: Request, res: Response) => {
    const classId = getStringParam(req, 'classId');
    const evaluations = await this.service.listByClass(classId);
    return res.json(evaluations);
  };

  getById = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    const evaluation = await this.service.getById(id);
    return res.json(evaluation);
  };

  listAll = async (_: Request, res: Response) => {
    const evaluations = await this.service.listAll();
    return res.json(evaluations);
  };

  update = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    const evaluation = await this.service.update(id, req.body);
    return res.json(evaluation);
  };

  delete = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    await this.service.delete(id);
    return res.status(204).send('Evaluation deleted successfully');
  };
}
