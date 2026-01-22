import type { Request, Response } from 'express';
import { GradeService } from './evalGrade.service.js';
import { GradeRepository } from './evalGrade.repository.js';
import { EnrollmentRepository } from '../enrollment/enrollment.repository.js';
import { get } from 'node:http';
import { getStringParam } from '../../shared/http/params.js';
import { EvaluationRepository } from '../evaluation/evaluation.repository.js';

export class GradeController {
    private gradeService = new GradeService(new GradeRepository(), new EnrollmentRepository(), new EvaluationRepository());


  /* =========================
   * CREATE
   * ========================= */
  create = async (req: Request, res: Response) => {
    const grade = await this.gradeService.create(req.body);
    return res.status(201).json(grade);
  };

  /* =========================
   * UPDATE
   * ========================= */
  update = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    const grade = await this.gradeService.update(id, req.body);
    return res.json(grade);
  };

  /* =========================
   * CONSULTAS DE DOMÍNIO
   * ========================= */

  // Boletim do aluno
  listByEnrollment = async (req: Request, res: Response) => {
    const enrollmentId = getStringParam(req, 'enrollmentId');
    const grades =
      await this.gradeService.listByEnrollment(enrollmentId);
    return res.json(grades);
  };

  // Diário de notas
  listByEvaluation = async (req: Request, res: Response) => {
    const evaluationId = getStringParam(req, 'evaluationId');
    const grades =
      await this.gradeService.listByEvaluation(evaluationId);
    return res.json(grades);
  };

 // ADMIN

  listAll = async (_: Request, res: Response) => {
    const grades = await this.gradeService.listAll();
    return res.json(grades);
  };

  getById = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    const grade = await this.gradeService.getById(id);
    return res.json(grade);
  };

  delete = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    await this.gradeService.delete(id);
    return res.status(204).send();
  };
}
