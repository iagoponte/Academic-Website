import type { Teacher } from "./teacher.entity.js";
import type { TeacherResponseDTO } from './teacher.dto.js';
import type { Teacher as PrismaTeacher } from "../../infraestructure/generated/prisma/client.js";

type PrismaTeacherWithUser = PrismaTeacher & {
    user?: { email: string } | null;
};
export class TeacherMapper {
    static toResponse(teacher: Teacher): TeacherResponseDTO {
        return {
            id: teacher.id,
            userId: teacher.userId,
            name: teacher.name,
            
            email: teacher.email || "", 
            
            createdAt: teacher.createdAt,
            updatedAt: teacher.updatedAt,
        }
    }

    static toDomain(raw: PrismaTeacherWithUser): Teacher {
        return {
            id: raw.id,
            userId: raw.userId,
            name: raw.name,
            email: raw.user?.email ?? "",
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }
    }
}
