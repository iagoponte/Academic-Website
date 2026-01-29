import { prisma } from "../../infraestructure/prisma/client.js";
import { Role } from "../../infraestructure/generated/prisma/client.js";
import type { Teacher } from "./teacher.entity.js";
// import { Prisma } from "../../../generated/prisma/client.js";
import type { Prisma } from "../../infraestructure/generated/prisma/client.js";
import type { CreateTeacherDTO, UpdateTeacherDTO } from "./teacher.dto.js";
import { removeUndefined } from "../../shared/utils/removeUndefined.js";

const teacherInclude = {
  user: {
    select: { email: true },
  },
};

export class teacherRepository {

  async findById(id: string): Promise<Teacher | null> {
    return prisma.teacher.findUnique({
      where: { id },
      include: teacherInclude,
    });
  }

  async findUserByEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return Boolean(user);
  }

  async findByEmail(email: string): Promise<Teacher | null> {
    return prisma.teacher.findFirst({
      where: {
        user: { email: email },
      },
      include: teacherInclude,
    });
  }

  async findAll(): Promise<Teacher[]> {
    return prisma.teacher.findMany({
      include: teacherInclude,
      orderBy: { name: "asc" },
    });
  }

  async create(data: CreateTeacherDTO): Promise<Teacher> {
    // Transação: Cria User e Teacher juntos
    // OBS: Service deve mandar a senha já hasheada!
    const createdUser = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        roles: [Role.Teacher], // Define o papel
        teacher: {
          create: {
            name: data.name,
          },
        },
      },
      include: {
        teacher: {
          include: teacherInclude,
        },
      },
    });

    if (!createdUser.teacher) throw new Error("Erro ao criar professor");
    return createdUser.teacher;
  }

  async update(id: string, data: UpdateTeacherDTO): Promise<Teacher> {
    const clearData = removeUndefined(data);
    return prisma.teacher.update({
      where: { id },
      data: clearData,
      include: teacherInclude,
    });
  }

  
  async delete(id: string): Promise<Teacher> {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!teacher) {
      throw new Error("Teacher record not found");
    }
    const [deletedTeacher] = await prisma.$transaction([
      prisma.teacher.delete({
        where: { id },
        include: teacherInclude,
      }),
      prisma.user.delete({
        where: { id: teacher.userId },
      }),
    ]);

    return deletedTeacher;
  }
}
