import { getStringParam } from "../../shared/http/params.js";
import type { Request, Response } from "express";
import { ClassService } from "./class.service.js";
import { ClassRepository } from "./class.repository.js";
import { createClassSchema } from "./schema/class.schema.js";
import { ClassMapper } from "./class.mapper.js";

export class ClassController {
    private service = new ClassService(new ClassRepository());

    create = async (req: Request, res: Response) => {
        const validData = createClassSchema.parse(req.body);
        const classEntity = await this.service.create(validData);
        const response = ClassMapper.toResponse(classEntity);
        return res.status(201).json(response);
    };

    list = async (req: Request, res: Response) => {
        const classes = await this.service.list();
        const response = classes.map(ClassMapper.toResponse);
        return res.json(response);
    };

    getById = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const classEntity = await this.service.getById(id);
        const response = ClassMapper.toResponse(classEntity);
        return res.json(response);
    };
}
