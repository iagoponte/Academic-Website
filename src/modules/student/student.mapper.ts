// import type { Student } from '../../infraestructure/generated/prisma/client.js';
import type { Student } from './student.entity.js';
import type { StudentResponseDTO } from './student.dto.js';

export class StudentMapper {
    static toResponse(student: Student): StudentResponseDTO {
        return {
            id: student.id,
            userId: student.userId,
            registrationNumber: student.registrationNumber,
            name: student.name,
            
            email: student.user?.email ?? "", 
            
            status: student.isActive ? 'ACTIVE' : 'INACTIVE',
            createdAt: student.createdAt,
            updatedAt: student.updatedAt,
        };
    }
}
