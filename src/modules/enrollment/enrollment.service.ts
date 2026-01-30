import { AppError } from "../../shared/errors/appError.js";
import type { ClassRepository } from "../discipline(class)/class.repository.js";
import type { StudentRepository } from "../student/student.repository.js";
import type { CreateEnrollmentDTO, EnrollmentResponseDTO } from "./enrollment.dto.js";
import type { Enrollment } from "./enrollment.entity.js";
import { EnrollmentMapper } from "./enrollment.mapper.js";
import type { EnrollmentRepository } from "./enrollment.repository.js";

export class EnrollmentService {
    constructor(
        private enrollmentRepository: EnrollmentRepository,
        private studentRepository: StudentRepository,
        private classRepository: ClassRepository,
    ) {}

    async create(data: CreateEnrollmentDTO): Promise<Enrollment> {
        // Validações
        const studentExists = await this.studentRepository.exists(data.studentId);
        if (!studentExists) throw new AppError('Aluno não encontrado', 404);

        const classExists = await this.classRepository.exists(data.classId);
        if (!classExists) throw new AppError('Turma não encontrada', 404);

        const enrollmentExists = await this.enrollmentRepository.exists(data.studentId, data.classId);
        if (enrollmentExists) throw new AppError('Aluno já matriculado nesta disciplina', 409);

        // Retorna Entidade pura
        return this.enrollmentRepository.create(data);
    }

    async listByStudent(studentId: string): Promise<Enrollment[]> {
        return this.enrollmentRepository.findByStudent(studentId);
    }

    async listByClass(classId: string): Promise<Enrollment[]> {
        return this.enrollmentRepository.findByClass(classId);
    }

    async listAll(): Promise<Enrollment[]> {
        return this.enrollmentRepository.findAll();
    }
       
    async getById(id: string): Promise<Enrollment> {
        const enrollment = await this.enrollmentRepository.findById(id);
        if (!enrollment) {
            throw new AppError('Matrícula não encontrada', 404);
        }
        return enrollment;
    }

    async delete(id: string): Promise<void> {
        // Apenas verificamos se existe chamando o getById
        await this.getById(id);
        await this.enrollmentRepository.delete(id);
    }
}
