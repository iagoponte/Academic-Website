import type { Request, Response } from "express";
import { teacherRepository } from "./teacher.repository.js";
import { TeacherService } from "./teacher.service.js";
import { createTeacherSchema } from "./schema/teacher.schema.js";
import { getStringParam } from "../../shared/http/params.js";

export class TeacherController {
    private service = new TeacherService(new teacherRepository());

    create = async (req: Request, res: Response) => {
        const validData = createTeacherSchema.parse(req.body);
        const teacher = await this.service.create(validData);
        return res.status(201).json(teacher);
    };

    list = async (req: Request, res: Response) => {
        const teachers = await this.service.list();
        return res.json(teachers);
    };

    getById = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const teacher = await this.service.getById(id);
        return res.json(teacher);
    };

    update = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const teacher = await this.service.update(
            id,
            req.body,
        );
        return res.json(teacher);
    };
    
    delete = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        await this.service.delete(id);
        return res.status(204).send();
    };
}
