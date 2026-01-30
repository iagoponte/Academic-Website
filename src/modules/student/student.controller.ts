import type { Request, Response } from "express";
import { StudentService } from "./student.service.js";
import { StudentMapper } from "./student.mapper.js";
import { getStringParam } from "../../shared/http/params.js";
import { StudentRepository } from "./student.repository.js";
import { correctStudentRegistrationSchema, createStudentSchema, updateStudentSchema } from "./schema/student.schema.js";

export class StudentController {
    private service = new StudentService(new StudentRepository());

    create = async (req: Request, res: Response) => {
        const validData = createStudentSchema.parse(req.body);
        const student = await this.service.create(validData);
        const studentResponse = StudentMapper.toResponse(student)
        return res.status(201).json(studentResponse);
    };

    list = async (req: Request, res: Response) => {
        const students = await this.service.list();
        const studentsResponse = students.map(student => StudentMapper.toResponse(student))
        return res.json(studentsResponse);
    };

    getById = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const student = await this.service.getById(id);
        const studentsResponse = StudentMapper.toResponse(student)
        return res.json(studentsResponse);
    };

    update = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const validData = updateStudentSchema.parse(req.body);
        const student = await this.service.update(
            id,
            validData
        );
        const studentsResponse = StudentMapper.toResponse(student)
        return res.json(studentsResponse);
    };

    inactivate = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const student = await this.service.inactivate(id);
        const studentsResponse = StudentMapper.toResponse(student)
        return res.json(studentsResponse);
    };

    correctRegistration = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const validData = correctStudentRegistrationSchema.parse(req.body);
        const student = await this.service.correctRegistration(
            id,
            validData,
        );
        const studentsResponse = StudentMapper.toResponse(student)
        return res.json(studentsResponse);
    };
};
