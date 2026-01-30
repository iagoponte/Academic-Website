import { prisma } from "../../infraestructure/prisma/client.js";
import { Role } from "../../infraestructure/generated/prisma/enums.js";
import type { Student } from "./student.entity.js";
import type {
  CorrectStudentRegistrationDTO,
  CreateStudentDTO,
  UpdateStudentDTO,
} from "./student.dto.js";
import { removeUndefined } from "../../shared/utils/removeUndefined.js";
import { StudentMapper } from "./student.mapper.js";

const studentInclude = {
  user: {
    select: {
      email: true,
    },
  },
};

export class StudentRepository {
  async findById(id: string): Promise<Student | null> {
    const prismaStudent = await prisma.student.findUnique({
      where: { id },
      include: studentInclude,
    });
    if (!prismaStudent) return null;
    return StudentMapper.toDomain(prismaStudent);
  }

  async findUserByEmail(email: string): Promise<boolean> {
    const prismaUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return Boolean(prismaUser);
  }

  async findByRegistrationNumber(
    registrationNumber: string,
  ): Promise<Student | null> {
    const prismaStudent = await prisma.student.findUnique({
      where: { registrationNumber },
      include: studentInclude,
    });
    if (!prismaStudent) return null;
    return StudentMapper.toDomain(prismaStudent);
  }

  async findAll(): Promise<Student[]> {
    const prismaStudents = await prisma.student.findMany({
      include: studentInclude,
      orderBy: { name: "asc" },
    });
    return prismaStudents.map(student => StudentMapper.toDomain(student));
  }

  async exists(id: string): Promise<boolean> {
    const prismaStudent = await prisma.student.findUnique({
      where: { id },
      select: { id: true },
    });
    return Boolean(prismaStudent);
  }

  async create(data: CreateStudentDTO): Promise<Student> {
    // A query agora cria um USER, que conecta um STUDENT.
    const createdUser = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        roles: [Role.Student],
        student: {
          create: {
            name: data.name,
            registrationNumber: data.registrationNumber,
          },
        },
      },
      include: {
        student: {
          include: { user: { select: { email: true } } },
        },
      },
    });

    // O Prisma retorna o User com o Student dentro. Precisamos retornar o Student.
    if (!createdUser.student)
      throw new Error("Erro fatal na criação do estudante");

    return StudentMapper.toDomain(createdUser.student);
  }

  async update(id: string, data: UpdateStudentDTO): Promise<Student> {
    const clearData = removeUndefined(data);
    const prismaStudent = await prisma.student.update({
      where: { id },
      data: clearData,
      include: studentInclude,
    });
    return StudentMapper.toDomain(prismaStudent);
  }

  async updateRegistration(
    id: string,
    newRegistrationNumber: string,
  ): Promise<Student> {
    const prismaStudent = await prisma.student.update({
      where: { id },
      data: {
        registrationNumber: newRegistrationNumber, // Passa direto
      },
      include: {
        user: { select: { email: true } },
      },
    });
    return StudentMapper.toDomain(prismaStudent);
  }
}
