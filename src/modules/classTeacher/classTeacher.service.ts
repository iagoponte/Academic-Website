import { AppError } from '../../shared/errors/appError.js';
import type { AssignTeacherDTO } from './classTeacher.dto.js';
import { prisma } from '../../infraestructure/prisma/client.js';
import type { ClassTeacherRepository } from './classTeacher.repository.js';

export class ClassTeacherService {
    constructor(private repository: ClassTeacherRepository) {}

    // missing mapper for class-teacher relationships
    async assign(data: AssignTeacherDTO): Promise<void> {
        const alreadyExists = await this.repository.AssignmentExists(data);
        if (alreadyExists) {
            throw new AppError('Professor já está vinculado a esta turma', 409);
        }
        const classExists = await this.repository.ClassExists(data.classId);
        if (!classExists) throw new AppError('Turma não encontrada', 404);
        const teacherExists = await this.repository.TeacherExists(data.teacherId);
        if (!teacherExists) throw new AppError('Professor não encontrado', 404);
        await this.repository.assign(data);
    }

    async unassign(data: AssignTeacherDTO): Promise<void> {
        // Verifica se existe antes de tentar deletar
        const exists = await this.repository.AssignmentExists(data);
        if (!exists) {
            throw new AppError('Este professor não está vinculado a esta turma', 404);
        }

        await this.repository.unassign(data);
    }
}