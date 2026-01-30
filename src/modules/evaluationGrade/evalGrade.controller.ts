import type { Request, Response } from 'express';
import { GradeService } from './evalGrade.service.js';
import { GradeRepository } from './evalGrade.repository.js';
import { EnrollmentRepository } from '../enrollment/enrollment.repository.js';
import { get } from 'node:http';
import { getStringParam } from '../../shared/http/params.js';
import { EvaluationRepository } from '../evaluation/evaluation.repository.js';
import { GradeMapper } from './evalGrade.mapper.js';

export class GradeController {
    private gradeService = new GradeService(new GradeRepository(), new EnrollmentRepository(), new EvaluationRepository());


  /* =========================
   * CREATE
   * ========================= */
  create = async (req: Request, res: Response) => {
    const grade = await this.gradeService.create(req.body);
    const gradeResponse = GradeMapper.toResponse(grade)
    return res.status(201).json(gradeResponse);
  };

  /* =========================
   * UPDATE
   * ========================= */
  update = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    const grade = await this.gradeService.update(id, req.body);
    const gradeResponse = GradeMapper.toResponse(grade);
    return res.json(gradeResponse);
  };

  /* =========================
   * CONSULTAS DE DOMÍNIO
   * ========================= */

  // Boletim do aluno
  listByEnrollment = async (req: Request, res: Response) => {
    const enrollmentId = getStringParam(req, 'enrollmentId');
    const grades =
      await this.gradeService.listByEnrollment(enrollmentId);
    const gradesResponse = grades.map(grade => GradeMapper.toResponse(grade))
    return res.json(gradesResponse);
  };

  // Diário de notas
  listByEvaluation = async (req: Request, res: Response) => {
    const evaluationId = getStringParam(req, 'evaluationId');
    const grades =
      await this.gradeService.listByEvaluation(evaluationId);
    const gradesResponse = grades.map(grade => GradeMapper.toResponse(grade))
    return res.json(gradesResponse);
  };

 // ADMIN

  listAll = async (req: Request, res: Response) => {
    const grades = await this.gradeService.listAll();
    const gradesResponse = grades.map(grade => GradeMapper.toResponse(grade))
    return res.json(gradesResponse);
  };

  getById = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    const grade = await this.gradeService.getById(id);
    const gradeResponse = GradeMapper.toResponse(grade)
    return res.json(gradeResponse);
  };

  delete = async (req: Request, res: Response) => {
    const id = getStringParam(req, 'id');
    await this.gradeService.delete(id);
    return res.status(204).send();
  };
}
