import { AppError } from "../../shared/errors/appError.js";
import type { ClassResponseDTO, CreateClassDTO } from "./class.dto.js"
import { ClassMapper } from "./class.mapper.js";
import { ClassRepository } from "./class.repository.js"

export class ClassService {
  constructor(private readonly repository: ClassRepository) {}

  async create(data: CreateClassDTO): Promise<ClassResponseDTO> {
    const newClass = await this.repository.create(data);
    return ClassMapper.toResponse(newClass);
  }

  async list(): Promise<ClassResponseDTO[]> {
    const classes = await this.repository.findAll();
    return classes.map(ClassMapper.toResponse);
  }

  async getById(id: string): Promise<ClassResponseDTO> {
    const classEntity = await this.repository.findById(id);

    if (!classEntity) {
      throw new AppError('Turma não encontrada', 404);
    }

    return ClassMapper.toResponse(classEntity);
  }
}
