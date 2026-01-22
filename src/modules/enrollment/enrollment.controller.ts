import type { Request, Response } from 'express';
import { EnrollmentService } from './enrollment.service.js';
import { createEnrollmentSchema } from './schema/enrollment.schema.js';
import { get } from 'node:http';
import { getStringParam } from '../../shared/http/params.js';
import { EnrollmentRepository } from './enrollment.repository.js';
import { StudentRepository } from '../student/student.repository.js';
import { ClassRepository } from '../discipline(class)/class.repository.js';

export class EnrollmentController {
  private service = new EnrollmentService(new EnrollmentRepository(), new StudentRepository(), new ClassRepository());

  // POST /enrollments
  create = async (req: Request, res: Response): Promise<Response> => {
    const data = createEnrollmentSchema.parse(req.body);
    const enrollment = await this.service.create(data);
    return res.status(201).json(enrollment);
  }

  // GET /enrollments/student/:studentId
  listByStudent = async (req: Request, res: Response): Promise<Response> => {
    const studentId = getStringParam(req, 'studentId');
    const enrollments = await this.service.listByStudent(studentId);
    return res.json(enrollments);
  }

  // GET /enrollments/class/:classId
  listByClass = async (req: Request, res: Response): Promise<Response> => {
    const classId = getStringParam(req, 'classId');
    const enrollments = await this.service.listByClass(classId);
    return res.json(enrollments);
  }

  listAll = async (req: Request, res: Response): Promise<Response> => {
    const enrollments = await this.service.listAll();
    return res.json(enrollments);
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    const id = getStringParam(req, 'id');
    const enrollment = await this.service.getById(id);
    return res.json(enrollment);
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    const id = getStringParam(req, 'id');
    await this.service.delete(id);
    return res.status(204).send();
 }

}
