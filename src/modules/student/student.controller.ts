import type { Request, Response } from "express";
import { StudentService } from "./student.service.js";
import { StudentMapper } from "./student.mapper.js";
import { getStringParam } from "../../shared/http/params.js";
import { StudentRepository } from "./student.repository.js";
import { correctStudentRegistrationSchema, createStudentSchema, updateStudentSchema } from "./schema/student.schema.js";

export class StudentController {
    private service = new StudentService(new StudentRepository());

    //use arrow functions to preserve 'this' context, avoiding the need for .bind(this) on route handlers 

    // create = async (req: Request, res: Response) => {
    //     const validData = createStudentSchema.parse(req.body);
    //     const student = await this.service.create(validData);
    //     return res.status(201).json(student);
    // };

    // list = async (req: Request, res: Response) => {
    //     const students = await this.service.list();
    //     return res.json(students);
    // };

    // getById = async (req: Request, res: Response) => {
    //     const id = getStringParam(req, 'id');
    //     const student = await this.service.getById(id);
    //     return res.json(student);
    // };

    // //after registration, the email update is no longer validated...
    // // update already does what correctRegistration was supposed to do.
    // update = async (req: Request, res: Response) => {
    //     const id = getStringParam(req, 'id');
        
    //     const validData = updateStudentSchema.parse(req.body);
    //     const student = await this.service.update(
    //         id,
    //         validData
    //     );
    //     return res.json(student);
    // };

    // inactivate = async (req: Request, res: Response) => {
    //     const id = getStringParam(req, 'id');
    //     const student = await this.service.inactivate(id);
    //     return res.json(student);
    // };

    // correctRegistration = async (req: Request, res: Response) => {
    //     const id = getStringParam(req, 'id');
    //     const student = await this.service.correctRegistration(
    //         id,
    //         req.body,
    //     );
    //     return res.json(student);
    // };

    create = async (req: Request, res: Response) => {
        const validData = createStudentSchema.parse(req.body);
        const student = await this.service.create(validData);
        return res.status(201).json(student);
    };

    list = async (req: Request, res: Response) => {
        const students = await this.service.list();
        return res.json(students);
    };

    getById = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const student = await this.service.getById(id);
        return res.json(student);
    };

    update = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const validData = updateStudentSchema.parse(req.body);
        const student = await this.service.update(
            id,
            validData
        );
        return res.json(student);
    };

    inactivate = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const student = await this.service.inactivate(id);
        return res.json(student);
    };

    correctRegistration = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const validData = correctStudentRegistrationSchema.parse(req.body);
        const student = await this.service.correctRegistration(
            id,
            validData,
        );
        return res.json(student);
    };
};
