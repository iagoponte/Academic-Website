import { prisma } from "../../infraestructure/prisma/client.js";
import { Role } from "../../infraestructure/generated/prisma/enums.js";
import type { Student } from './student.entity.js';
import type { CorrectStudentRegistrationDTO, CreateStudentDTO, UpdateStudentDTO } from "./student.dto.js";
import { removeUndefined } from "../../shared/utils/removeUndefined.js";

const studentInclude = {
  user: {
    select: {
      email: true
    }
  }
};

export class StudentRepository {

  async findById(id: string): Promise<Student | null> {
    return prisma.student.findUnique({
      where: { id },
      include: studentInclude,
    });
  }

  async findUserByEmail(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
}

  async findByRegistrationNumber(registrationNumber: string): Promise<Student | null> {
    return prisma.student.findUnique({
      where: { registrationNumber },
      include: studentInclude,
    });
  }

  async findAll(): Promise<Student[]> {
    return prisma.student.findMany({
      include: studentInclude,
      orderBy: { name: 'asc' },
    });
  }

  async exists(id: string): Promise<boolean> {
    const student = await prisma.student.findUnique({
      where: { id },
      select: { id: true },
    });
    return Boolean(student);
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
          }
        }
      },
      include: {
        student: {
            include: { user: { select: { email: true } } }
        }
      }
    });

    // O Prisma retorna o User com o Student dentro. Precisamos retornar o Student.
    if (!createdUser.student) throw new Error("Erro fatal na criação do estudante");
    
    return createdUser.student;
  }

  async update(id: string, data: UpdateStudentDTO): Promise<Student> {
    const clearData = removeUndefined(data);
    return prisma.student.update({
      where: { id },
      data: clearData,
      include: studentInclude,
    });
  }

  async updateRegistration(id: string, newRegistrationNumber: string): Promise<Student> {
    return prisma.student.update({
        where: { id },
        data: {
            registrationNumber: newRegistrationNumber // Passa direto
        },
        include: {
            user: { select: { email: true } }
        }
    });
}
}
