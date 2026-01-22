import { prisma } from "../../infraestructure/prisma/client.js";
import type { CreateEnrollmentDTO } from "./enrollment.dto.js";
import type { EnrollmentWithDetails } from "./enrollment.mapper.js";

const enrollmentSelect = {
    id: true,
    studentId: true,
    classId: true,
    createdAt: true,
    student: {
        select: {
            id: true,
            name: true,
            registrationNumber: true,
        }
    },
    class: {
        select: {
            id: true,
            name: true,
            semester: true,
        }
    }
}

export class EnrollmentRepository {

  async create(data: CreateEnrollmentDTO): Promise<EnrollmentWithDetails> {
    return prisma.enrollment.create({
      data: {
        studentId: data.studentId,
        classId: data.classId,
      },
      select: enrollmentSelect,
    });
  }

  async findByStudent(studentId: string): Promise<EnrollmentWithDetails[]> {
    return prisma.enrollment.findMany({
      where: { studentId },
      select: enrollmentSelect,
      orderBy: {
        class: { semester: 'desc' },
      },
    });
  }

  async findByClass(classId: string): Promise<EnrollmentWithDetails[]> {
    return prisma.enrollment.findMany({
      where: { classId },
      select: enrollmentSelect,
      orderBy: {
        student: { name: 'asc' },
      },
    });
  }

  async exists(studentId: string, classId: string): Promise<boolean> {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_classId: { studentId, classId },
      },
      select: { id: true }, // mínimo necessário
    });

    return Boolean(enrollment);
  }

  async delete(id: string): Promise<void> {
    await prisma.enrollment.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<EnrollmentWithDetails | null> {
    return prisma.enrollment.findUnique({
      where: { id },
      select: enrollmentSelect,
    });
  }

  async findAll(): Promise<EnrollmentWithDetails[]> {
    return prisma.enrollment.findMany({
      select: enrollmentSelect,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
