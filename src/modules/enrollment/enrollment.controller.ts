import type { Request, Response } from 'express';
import { EnrollmentService } from './enrollment.service.js';
import { createEnrollmentSchema } from './schema/enrollment.schema.js';
import { get } from 'node:http';
import { getStringParam } from '../../shared/http/params.js';
import { EnrollmentRepository } from './enrollment.repository.js';
import { StudentRepository } from '../student/student.repository.js';
import { ClassRepository } from '../discipline(class)/class.repository.js';
import { EnrollmentMapper } from './enrollment.mapper.js';

export class EnrollmentController {
    // Injeção de dependências correta
    private service = new EnrollmentService(
        new EnrollmentRepository(), 
        new StudentRepository(), 
        new ClassRepository()
    );

    create = async (req: Request, res: Response): Promise<Response> => {
        const data = createEnrollmentSchema.parse(req.body);
        
        // 1. Recebe Entidade
        const enrollment = await this.service.create(data);
        
        // 2. Converte para DTO
        const response = EnrollmentMapper.toResponse(enrollment);
        
        return res.status(201).json(response);
    }

    listByStudent = async (req: Request, res: Response): Promise<Response> => {
        const studentId = getStringParam(req, 'studentId');
        const enrollments = await this.service.listByStudent(studentId);
        const response = enrollments.map(EnrollmentMapper.toResponse);
        return res.json(response);
    }

    listByClass = async (req: Request, res: Response): Promise<Response> => {
        const classId = getStringParam(req, 'classId');
        const enrollments = await this.service.listByClass(classId);
        const response = enrollments.map(EnrollmentMapper.toResponse);
        return res.json(response);
    }

    listAll = async (req: Request, res: Response): Promise<Response> => {
        const enrollments = await this.service.listAll();
        const response = enrollments.map(EnrollmentMapper.toResponse);
        return res.json(response);
    }

    getById = async (req: Request, res: Response): Promise<Response> => {
        const id = getStringParam(req, 'id');
        const enrollment = await this.service.getById(id);
        const response = EnrollmentMapper.toResponse(enrollment);
        return res.json(response);
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const id = getStringParam(req, 'id');
        await this.service.delete(id);
        return res.status(204).send();
    }
}
