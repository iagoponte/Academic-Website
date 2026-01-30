import { prisma } from "../../infraestructure/prisma/client.js";
import { Role } from "../../infraestructure/generated/prisma/client.js";
import type { Teacher } from "./teacher.entity.js";
// import { Prisma } from "../../../generated/prisma/client.js";
import type { Prisma } from "../../infraestructure/generated/prisma/client.js";
import type { CreateTeacherDTO, UpdateTeacherDTO } from "./teacher.dto.js";
import { removeUndefined } from "../../shared/utils/removeUndefined.js";
import { TeacherMapper } from "./teacher.mapper.js";

const teacherInclude = {
  user: {
    select: { email: true },
  },
};

export class TeacherRepository {

  async findById(id: string): Promise<Teacher | null> {
    const prismaTeacher = await prisma.teacher.findUnique({
      where: { id },
      include: teacherInclude,
    });
    if(!prismaTeacher) return null;
    return TeacherMapper.toDomain(prismaTeacher);
  }

  async findUserByEmail(email: string): Promise<boolean> {
    const prismaUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return Boolean(prismaUser);
  }

  async findByEmail(email: string): Promise<Teacher | null> {
    const prismaTeacher = await prisma.teacher.findFirst({
      where: {
        user: { email: email },
      },
      include: teacherInclude,
    });
    if (!prismaTeacher) return null;
    return TeacherMapper.toDomain(prismaTeacher);
  }

  async findAll(): Promise<Teacher[]> {
    const prismaTeachers = await prisma.teacher.findMany({
      include: teacherInclude,
      orderBy: { name: "asc" },
    });
    return prismaTeachers.map(teacher => TeacherMapper.toDomain(teacher))
  }

  async create(data: CreateTeacherDTO): Promise<Teacher> {
    
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
    return TeacherMapper.toDomain(createdUser.teacher);
  }

  async update(id: string, data: UpdateTeacherDTO): Promise<Teacher> {
    const clearData = removeUndefined(data);
    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: clearData,
      include: teacherInclude,
    });
    return TeacherMapper.toDomain(updatedTeacher);
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
