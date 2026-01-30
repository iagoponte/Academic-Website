import { TeacherRepository } from "./teacher.repository.js";
import type {
    CreateTeacherDTO,
    TeacherResponseDTO,
    UpdateTeacherDTO,
} from "./teacher.dto.js";
import { AppError } from "../../shared/errors/appError.js";
import type { Teacher } from "./teacher.entity.js";
import { TeacherMapper } from "./teacher.mapper.js";
import { hash } from "bcryptjs";

export class TeacherService {
    constructor(private readonly repository: TeacherRepository) {}

    async create(dto: CreateTeacherDTO): Promise<Teacher> {
        const emailExists = await this.repository.findUserByEmail(dto.email);
        if (emailExists) {
            throw new AppError('Email already in use', 409);
        }
        const hashedPassword = await hash(dto.password, 8);
        const newTeacher = await this.repository.create({
            ...dto,
            password: hashedPassword,
        });
        return newTeacher;
    }

    async list(): Promise<Teacher[]> {
        const teachers = await this.repository.findAll();
        return teachers;
    }

    async getById(id: string): Promise<Teacher> {
        const teacher = await this.repository.findById(id);
        if(!teacher){
            throw new AppError('Teacher not found', 404);
        }
        return teacher;
    }

    async getByEmail(email: string): Promise<Teacher> {
        const teacher = await this.repository.findByEmail(email);
        if(!teacher){
            throw new AppError('Teacher not found', 404);
        }
        return teacher;
    }

    async update(id: string, dto: UpdateTeacherDTO): Promise<Teacher> {
        await this.getById(id);
        const dataToUpdate: UpdateTeacherDTO = {
            ...(dto.name && { name: dto.name }),
        };

        const updatedTeacher = await this.repository.update(id, dataToUpdate);
        return updatedTeacher;
    }

    async delete(id: string): Promise<void> { 
        const teacher = await this.getById(id); 
        if(!teacher){
            throw new AppError('Teacher not found', 404);
        } 
        await this.repository.delete(id);
    }

}
