import type { ClassTeacher, Prisma } from "../../infraestructure/generated/prisma/client.js";
import type { Teacher } from "../teacher/teacher.entity.js";
import type { ClassResponseDTO } from "./class.dto.js";
import type { ClassEntity } from "./class.entity.js";

export const classWithTeachersSelect = {
  id: true,
  name: true,
  semester: true,
  createdAt: true,
  teachers: {
    select: {
      id: true,
      teacherId: true,
      classId: true,
      teacher: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  },
}

export type ClassWithTeachers = Prisma.ClassGetPayload<{
    select: typeof classWithTeachersSelect
}> 
//     ClassEntity & {
//     teachers: (ClassTeacher & {
//         teacher: Teacher
//     })[];
// };

export class ClassMapper {
    static toResponse(clazz: ClassWithTeachers): ClassResponseDTO {
        return {
            id: clazz.id,
            name: clazz.name,
            semester: clazz.semester,
            createdAt: clazz.createdAt,
            teachers: clazz.teachers.map((ct => ({
                id: ct.teacher.id,
                name: ct.teacher.name,
                email: ct.teacher.email
            })))
        };
    }
}