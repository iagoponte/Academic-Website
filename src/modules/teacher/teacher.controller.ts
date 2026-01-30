import type { Request, Response } from "express";
import { teacherRepository } from "./teacher.repository.js";
import { TeacherService } from "./teacher.service.js";
import { createTeacherSchema, updateTeacherSchema } from "./schema/teacher.schema.js";
import { getStringParam } from "../../shared/http/params.js";
import { TeacherMapper } from "./teacher.mapper.js";

export class TeacherController {
    private service = new TeacherService(new teacherRepository());

    create = async (req: Request, res: Response) => {
        // Valida Nome, Email e Senha (necessários para criar User + Teacher)
        const validData = createTeacherSchema.parse(req.body);
        
        const teacher = await this.service.create(validData);
        const teacherResponse = TeacherMapper.toResponse(teacher)
        
        return res.status(201).json(teacherResponse);
    };

    list = async (req: Request, res: Response) => {
        const teachers = await this.service.list();
        const teachersResponse = teachers.map(teacher => TeacherMapper.toResponse(teacher))
        return res.json(teachersResponse);
    };

    getById = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const teacher = await this.service.getById(id);
        const teacherResponse = TeacherMapper.toResponse(teacher)
        return res.json(teacherResponse);
    };

    update = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const validData = updateTeacherSchema.parse(req.body);
        const teacher = await this.service.update(
            id,
            validData,
        );
        const teacherResponse = TeacherMapper.toResponse(teacher)
        return res.json(teacherResponse);
    };
    
    delete = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        await this.service.delete(id);
        return res.status(204).send();
    };
}
