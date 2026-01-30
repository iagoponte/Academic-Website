// import type { Student } from '../../infraestructure/generated/prisma/client.js';
import type { Student } from './student.entity.js';
import type { Student as PrismaStudent } from '../../infraestructure/generated/prisma/client.js';
import type { StudentResponseDTO } from './student.dto.js';

type PrismaStudentWithUser = PrismaStudent & {
    user?: { email: string } | null;
};

export class StudentMapper {
    static toResponse(student: Student): StudentResponseDTO {
        return {
            id: student.id,
            userId: student.userId,
            registrationNumber: student.registrationNumber,
            name: student.name,
            
            email: student.email || "", 
            
            status: student.isActive ? 'ACTIVE' : 'INACTIVE',
            createdAt: student.createdAt,
            updatedAt: student.updatedAt,
        };
    }

    static toDomain(raw: PrismaStudentWithUser): Student {
        return {
        id: raw.id,
        userId: raw.userId,
        registrationNumber: raw.registrationNumber,
        name: raw.name,
            
        email: raw.user?.email ?? "", 
            
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        }
    }
}
