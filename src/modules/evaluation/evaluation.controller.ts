import type { Request, Response } from "express";
import { getStringParam } from "../../shared/http/params.js";
import { ClassRepository } from "../discipline(class)/class.repository.js";
import { EvaluationRepository } from "./evaluation.repository.js";
import { EvaluationService } from "./evaluation.service.js";
import { EvaluationMapper } from "./evaluation.mapper.js";

export class EvaluationController {
  private service = new EvaluationService(new EvaluationRepository(), new ClassRepository());

  create = async (req: Request, res: Response) => {
    const evaluation = await this.service.create(req.body);
    const evaluationResponse = EvaluationMapper.toResponse(evaluation)
    return res.status(201).json(evaluationResponse);
  };

  listByClass = async (req: Request, res: Response) => {
    const classId = getStringParam(req, 'classId');
    const evaluations = await this.service.listByClass(classId);
    const evaluationsResponse = evaluations.map(evaluation => EvaluationMapper.toResponse(evaluation))
    return res.json(evaluationsResponse)
  };

  getById = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    const evaluation = await this.service.getById(id);
    const evaluationResponse = EvaluationMapper.toResponse(evaluation)
    return res.json(evaluationResponse);
  };

  listAll = async (_: Request, res: Response) => {
    const evaluations = await this.service.listAll();
    const evaluationsResponse = evaluations.map(evaluation => EvaluationMapper.toResponse(evaluation))
    return res.json(evaluationsResponse)
  };

  update = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    const evaluation = await this.service.update(id, req.body);
    const evaluationResponse = EvaluationMapper.toResponse(evaluation)
    return res.json(evaluationResponse);
  };

  delete = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    await this.service.delete(id);
    return res.status(204).send('Evaluation deleted successfully');
  };
}
