import type { ClassResponseDTO } from "./class.dto.js";
import type { ClassEntity } from "./class.entity.js";
import type { Class as PrismaClass, Teacher, User } from "../../infraestructure/generated/prisma/client.js";

type PrismaClassWithRelations = PrismaClass & {
    teachers?: {
        teacher: Teacher & {
            user?: { email: string } | null;
        };
    }[];
};

export class ClassMapper {

    static toDomain(raw: PrismaClassWithRelations): ClassEntity {
        return {
            id: raw.id,
            name: raw.name,
            semester: raw.semester,
            createdAt: raw.createdAt,

            // Achatamento: Remove a camada 'ClassTeacher' e pega o email do User
            teachers: raw.teachers?.map(item => ({
                id: item.teacher.id,
                name: item.teacher.name,
                email: item.teacher.user?.email ?? "" // Navegação segura
            })) ?? []
        };
    }

    static toResponse(clazz: ClassEntity): ClassResponseDTO {
        return {
            id: clazz.id,
            name: clazz.name,
            semester: clazz.semester,
            createdAt: clazz.createdAt,
            teachers: clazz.teachers ?? []
        };
    }
}