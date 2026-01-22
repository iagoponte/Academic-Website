import { AppError } from "../../shared/errors/appError.js";
import type { ClassRepository } from "../discipline(class)/class.repository.js";
import type { StudentRepository } from "../student/student.repository.js";
import type { CreateEnrollmentDTO, EnrollmentResponseDTO } from "./enrollment.dto.js";
import { EnrollmentMapper } from "./enrollment.mapper.js";
import type { EnrollmentRepository } from "./enrollment.repository.js";

export class EnrollmentService {
  constructor(
    private enrollmentRepository: EnrollmentRepository,
    private studentRepository: StudentRepository,
    private classRepository: ClassRepository,
  ) {}

  async create(data: CreateEnrollmentDTO): Promise<EnrollmentResponseDTO> {
    if (await this.enrollmentRepository.exists(data.studentId, data.classId)) {
      throw new AppError('Aluno já matriculado nesta disciplina', 409);
    }
    if (!(await this.studentRepository.exists(data.studentId))) {
      throw new AppError('Aluno não encontrado', 404);
    }
    if (!(await this.classRepository.exists(data.classId))) {
      throw new AppError('Turma não encontrada', 404);
    }
    const enrollment = await this.enrollmentRepository.create(data);

    return EnrollmentMapper.toResponse(enrollment);
  }

  async listByStudent(studentId: string): Promise<EnrollmentResponseDTO[]> {
    const enrollments = await this.enrollmentRepository.findByStudent(studentId);
    return enrollments.map(EnrollmentMapper.toResponse);
  }

  async listByClass(classId: string): Promise<EnrollmentResponseDTO[]> {
    const enrollments = await this.enrollmentRepository.findByClass(classId);
    return enrollments.map(EnrollmentMapper.toResponse);
  }

  async listAll(): Promise<EnrollmentResponseDTO[]> {
    const enrollments = await this.enrollmentRepository.findAll();
    return enrollments.map(EnrollmentMapper.toResponse);
  }
       
  async getById(id: string): Promise<EnrollmentResponseDTO> {
    const enrollment = await this.enrollmentRepository.findById(id);
    if (!enrollment) {
      throw new AppError('Matrícula não encontrada', 404);
    }
    return EnrollmentMapper.toResponse(enrollment);
  }

  async delete(id: string): Promise<void> {
    const enrollment = await this.enrollmentRepository.findById(id);
    if (!enrollment) {
      throw new AppError('Matrícula não encontrada', 404);
    }
    await this.enrollmentRepository.delete(id);
  }
}
