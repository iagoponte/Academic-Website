import { getStringParam } from "../../shared/http/params.js";
import type { Request, Response } from "express";
import { ClassService } from "./class.service.js";
import { ClassRepository } from "./class.repository.js";

export class ClassController {
    private service = new ClassService(new ClassRepository());

    create = async (req: Request, res: Response) => {
        const validData = req.body;
        const classEntity = await this.service.create(validData);
        return res.status(201).json(classEntity);
    };

    list = async (req: Request, res: Response) => {
        const classes = await this.service.list();
        return res.json(classes);
    };

    getById = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const classEntity = await this.service.getById(id);
        return res.json(classEntity);
    };
};
