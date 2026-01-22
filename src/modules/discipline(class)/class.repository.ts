import { prisma } from "../../infraestructure/prisma/client.js";
import type { CreateClassDTO } from "./class.dto.js";
import { classWithTeachersSelect, type ClassWithTeachers } from "./class.mapper.js";


export class ClassRepository {
    
    // CRIAR: Salva a turma e já cria as linhas na tabela pivô 'ClassTeacher'
  async create(data: CreateClassDTO): Promise<ClassWithTeachers> {
    return prisma.class.create({
      data: {
        name: data.name,
        semester: data.semester,

        ...(data.teacherIds && {
          teachers: {
            create: data.teacherIds.map(teacherId => ({
              teacher: { connect: { id: teacherId } },
            })),
          },
        }),
      },
      select: classWithTeachersSelect,
    });
  }

  // Listar todas as turmas
  async findAll(): Promise<ClassWithTeachers[]> {
    return prisma.class.findMany({
      select: classWithTeachersSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Buscar turma por ID
  async findById(id: string): Promise<ClassWithTeachers | null> {
    return prisma.class.findUnique({
      where: { id },
      select: classWithTeachersSelect,
    });
  }

  // Verificar existência da turma
  async exists(id: string): Promise<boolean> {
    const classEntity = await prisma.class.findUnique({
      where: { id },
      select: { id: true },
    });

    return Boolean(classEntity);
  }
}
