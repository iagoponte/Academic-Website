import type { Request, Response } from 'express';
import { assignTeacherSchema } from './classTeacher.dto.js';
import { ClassTeacherRepository } from './classTeacher.repository.js';
import { ClassTeacherService } from './classTeacher.service.js';
import { ClassRepository } from '../discipline(class)/class.repository.js';
import { TeacherRepository } from '../teacher/teacher.repository.js';

export class ClassTeacherController {
    private service = new ClassTeacherService(
        new ClassTeacherRepository(),
        new ClassRepository(),
        new TeacherRepository()
    );

    assign = async (req: Request, res: Response) => {
        const { id } = req.params; 
        const { teacherId } = req.body;
        const data = assignTeacherSchema.parse({ classId: id, teacherId });
        await this.service.assign(data);
        return res.status(201).send();
    };

    unassign = async (req: Request, res: Response) => {
        const { id, teacherId } = req.params; 
        const data = assignTeacherSchema.parse({ classId: id, teacherId });
        await this.service.unassign(data);
        return res.status(204).send(); 
    };
}