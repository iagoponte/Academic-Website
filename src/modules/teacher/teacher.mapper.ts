import type { Teacher } from "./teacher.entity.js";
import type { TeacherResponseDTO } from './teacher.dto.js';

export class TeacherMapper {
    static toResponse(teacher: Teacher): TeacherResponseDTO {
        return {
            id: teacher.id,
            userId: teacher.userId,
            name: teacher.name,
            
            email: teacher.user?.email ?? "", 
            
            createdAt: teacher.createdAt,
            updatedAt: teacher.updatedAt,
        }
    }
}
