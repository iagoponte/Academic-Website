import { teacherRepository } from "./teacher.repository.js";
import type {
    CreateTeacherDTO,
    TeacherResponseDTO,
    UpdateTeacherDTO,
} from "./teacher.dto.js";
import type { Prisma } from "../../infraestructure/generated/prisma/client.js";
import { AppError } from "../../shared/errors/appError.js";
import type { Teacher } from "./teacher.entity.js";
import { TeacherMapper } from "./teacher.mapper.js";
import { hash } from "node:crypto";

export class TeacherService {
    constructor(private readonly repository: teacherRepository) {}

    async create(dto: CreateTeacherDTO): Promise<TeacherResponseDTO> {
        const exists = await this.repository.findByEmail(dto.email)
        if (exists) {
            throw new AppError('This teacher is already hired', 409)
        }
        const passwordHash = await hash('sha1', dto.password)
        const newTeacher = await this.repository.create({
            name: dto.name,
            email: dto.email,
            password: passwordHash,
        })
        return TeacherMapper.toResponse(newTeacher);
    }

    async list(): Promise<TeacherResponseDTO[]> {
        const teachers = await this.repository.findAll()
        return teachers.map(TeacherMapper.toResponse);
    }

    async getById(id: string): Promise<TeacherResponseDTO> {
        const teacher = await this.repository.findById(id)
        if(!teacher){
            throw new AppError('This teacher does not exist', 404);
        }
        return TeacherMapper.toResponse(teacher);
    }

    async getByEmail(email: string): Promise<TeacherResponseDTO> {
        const teacher = await this.repository.findByEmail(email)
        if(!teacher){
            throw new AppError('this teacher does not exist', 404);
        }
        return TeacherMapper.toResponse(teacher);
    }

    //ATENTION!!! Password update not implemented
    async update(id: string, dto: UpdateTeacherDTO): Promise<TeacherResponseDTO> {
        await this.getById(id);

        const dataToUpdate: UpdateTeacherDTO = {
            ...(dto.name !== undefined && { name: dto.name }),
            ...(dto.email !== undefined && { email: dto.email }),
        };
        const updatedTeacher = await this.repository.update(id, dataToUpdate);
        return TeacherMapper.toResponse(updatedTeacher);
    }

    async delete(id: string): Promise<void> {
        const student = await this.getById(id);
        if(!student){
            throw new AppError('This teacher does not exist', 404);
        } 
        await this.repository.delete(id);
    }
}
