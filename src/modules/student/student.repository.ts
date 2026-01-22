import { prisma } from "../../infraestructure/prisma/client.js";
// import type { Student } from "../../infraestructure/generated/prisma/client.js";
import type { Student } from './student.entity.js';
import type { CreateStudentDTO, UpdateStudentDTO } from "./student.dto.js";
import { removeUndefined } from "../../shared/utils/removeUndefined.js";

const studentSelect = {
  id: true,
  name: true,
  email: true,
  registrationNumber: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

// use cases where i don't want to expose email.
const studentSafeSelect = {
    id: true,
    name: true,
    registrationNumber: true,
    isActive: true,
}

export class StudentRepository {

  async findById(id: string): Promise<Student | null> {
    return prisma.student.findUnique({
      where: { id },
      select: studentSelect,
    });
  }

  async findByRegistrationNumber(registrationNumber: string): Promise<Student | null> {
    return prisma.student.findUnique({
      where: { registrationNumber },
      select: studentSelect,
    });
  }

  async findAll(): Promise<Student[]> {
    return prisma.student.findMany({
      select: studentSelect,
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
    return prisma.student.create({
      data,
      select: studentSelect,
    });
  }

  async update(id: string, data: UpdateStudentDTO): Promise<Student> {
    const clearData = removeUndefined(data);
    return prisma.student.update({
      where: { id },
      data: clearData,
      select: studentSelect,
    });
  }
}   
