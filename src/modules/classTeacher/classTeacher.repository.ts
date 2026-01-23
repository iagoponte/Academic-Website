import { prisma } from "../../infraestructure/prisma/client.js";
import type { AssignTeacherDTO } from "./classTeacher.dto.js";

export class ClassTeacherRepository {
  // Vincular (Criar o relacionamento)
  async assign(data: AssignTeacherDTO): Promise<void> {
    await prisma.classTeacher.create({
      data: {
        classId: data.classId,
        teacherId: data.teacherId,
      },
    });
  }

  // Desvincular (Remover o relacionamento)
  async unassign(data: AssignTeacherDTO): Promise<void> {
    // O Prisma gera 'teacherId_classId' automaticamente por causa do @@unique
    await prisma.classTeacher.delete({
      where: {
        teacherId_classId: {
          classId: data.classId,
          teacherId: data.teacherId,
        },
      },
    });
  }

  // Verificar se já existe (útil para não dar erro 500 de Unique Constraint)
  async assignmentExists(data: AssignTeacherDTO): Promise<boolean> {
    const relation = await prisma.classTeacher.findUnique({
      where: {
        teacherId_classId: {
          classId: data.classId,
          teacherId: data.teacherId,
        },
      },
    });
    return !!relation;
  }

  async classExists(classId: string): Promise<boolean> {
    const clazz = await prisma.class.findUnique({
      where: { id: classId },
      select: { id: true },
    });

    return !!clazz;
  }

  async teacherExists(teacherId: string): Promise<boolean> {
    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
      select: { id: true },
    });
    return !!teacher;
  }
}
