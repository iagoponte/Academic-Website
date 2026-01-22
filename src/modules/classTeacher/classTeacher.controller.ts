import type { Request, Response } from 'express';
import { assignTeacherSchema } from './classTeacher.dto.js';
import { ClassTeacherRepository } from './classTeacher.repository.js';
import { ClassTeacherService } from './classTeacher.service.js';

export class ClassTeacherController {
    private service = new ClassTeacherService(new ClassTeacherRepository());

    assign = async (req: Request, res: Response) => {
        const { id } = req.params; 
        const { teacherId } = req.body;
        const data = assignTeacherSchema.parse({ classId: id, teacherId });
        await this.service.assign(data);
        return res.status(201).send('Teacher assigned successfully'); 
    };

    unassign = async (req: Request, res: Response) => {
        const { id, teacherId } = req.params; 
        const data = assignTeacherSchema.parse({ classId: id, teacherId });
        await this.service.unassign(data);
        return res.status(204).send('Teacher unassigned successfully');
    };
}