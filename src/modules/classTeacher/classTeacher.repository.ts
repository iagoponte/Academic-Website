import { prisma } from "../../infraestructure/prisma/client.js";
import type { AssignTeacherDTO } from "./classTeacher.dto.js";

export class ClassTeacherRepository {
  
  // Vincular
  async assign(data: AssignTeacherDTO): Promise<void> {
    await prisma.classTeacher.create({
      data: {
        classId: data.classId,
        teacherId: data.teacherId,
      },
    });
  }

  // Desvincular
  async unassign(data: AssignTeacherDTO): Promise<void> {
    await prisma.classTeacher.delete({
      where: {
        teacherId_classId: {
          classId: data.classId,
          teacherId: data.teacherId,
        },
      },
    });
  }

  // Verificar se o VÍNCULO existe
  async exists(classId: string, teacherId: string): Promise<boolean> {
    const relation = await prisma.classTeacher.findUnique({
      where: {
        teacherId_classId: {
          classId: classId,
          teacherId: teacherId,
        },
      },
      select: { id: true },
    });
    return Boolean(relation);
  }
}