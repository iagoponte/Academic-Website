import { AppError } from '../../shared/errors/appError.js';
import type { AssignTeacherDTO } from './classTeacher.dto.js';
import type { ClassTeacherRepository } from './classTeacher.repository.js';
import type { ClassRepository } from '../discipline(class)/class.repository.js'; // Importe
import type { TeacherRepository } from '../teacher/teacher.repository.js'; // Importe

export class ClassTeacherService {
    constructor(
        private repository: ClassTeacherRepository,
        private classRepository: ClassRepository,  
        private teacherRepository: TeacherRepository 
    ) {}

    async assign(data: AssignTeacherDTO): Promise<void> {
        const classExists = await this.classRepository.exists(data.classId);
        if (!classExists) {
            throw new AppError('Turma não encontrada', 404);
        }
        const teacherExists = await this.teacherRepository.findById(data.teacherId); 
        if (!teacherExists) {
            throw new AppError('Professor não encontrado', 404);
        }
        const alreadyAssigned = await this.repository.exists(data.classId, data.teacherId);
        if (alreadyAssigned) {
            throw new AppError('Professor já está vinculado a esta turma', 409);
        }
        await this.repository.assign(data);
    }

    async unassign(data: AssignTeacherDTO): Promise<void> {
        const exists = await this.repository.exists(data.classId, data.teacherId);
        if (!exists) {
            throw new AppError('Este professor não está vinculado a esta turma', 404);
        }
        await this.repository.unassign(data);
    }
}