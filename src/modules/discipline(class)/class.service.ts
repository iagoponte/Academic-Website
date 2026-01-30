import { AppError } from "../../shared/errors/appError.js";
import type { ClassResponseDTO, CreateClassDTO } from "./class.dto.js"
import type { ClassEntity } from "./class.entity.js";
import { ClassRepository } from "./class.repository.js"

export class ClassService {
    constructor(private readonly repository: ClassRepository) {}

    async create(data: CreateClassDTO): Promise<ClassEntity> {
        // Retorna a entidade pura
        return this.repository.create(data);
    }

    async list(): Promise<ClassEntity[]> {
        return this.repository.findAll();
    }

    async getById(id: string): Promise<ClassEntity> {
        const classEntity = await this.repository.findById(id);
        if (!classEntity) {
            throw new AppError('Turma não encontrada', 404);
        }
        return classEntity;
    }
}
