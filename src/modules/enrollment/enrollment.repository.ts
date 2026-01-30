import { prisma } from "../../infraestructure/prisma/client.js";
import type { CreateEnrollmentDTO } from "./enrollment.dto.js";
import type { Enrollment } from "./enrollment.entity.js";
import { EnrollmentMapper } from "./enrollment.mapper.js";


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
};

export class EnrollmentRepository {

    async create(data: CreateEnrollmentDTO): Promise<Enrollment> {
        const prismaEnrollment = await prisma.enrollment.create({
            data: {
                studentId: data.studentId,
                classId: data.classId,
            },
            select: enrollmentSelect,
        });
        return EnrollmentMapper.toDomain(prismaEnrollment);
    }

    async findByStudent(studentId: string): Promise<Enrollment[]> {
        const prismaEnrollments = await prisma.enrollment.findMany({
            where: { studentId },
            select: enrollmentSelect,
            orderBy: {
                class: { semester: 'desc' },
            },
        });
        return prismaEnrollments.map(EnrollmentMapper.toDomain);
    }

    async findByClass(classId: string): Promise<Enrollment[]> {
        const prismaEnrollments = await prisma.enrollment.findMany({
            where: { classId },
            select: enrollmentSelect,
            orderBy: {
                student: { name: 'asc' },
            },
        });
        return prismaEnrollments.map(EnrollmentMapper.toDomain);
    }

    async exists(studentId: string, classId: string): Promise<boolean> {
        const enrollment = await prisma.enrollment.findUnique({
            where: {
                studentId_classId: { studentId, classId },
            },
            select: { id: true },
        });
        return Boolean(enrollment);
    }

    async delete(id: string): Promise<void> {
        await prisma.enrollment.delete({ where: { id } });
    }

    async findById(id: string): Promise<Enrollment | null> {
        const prismaEnrollment = await prisma.enrollment.findUnique({
            where: { id },
            select: enrollmentSelect,
        });
        
        if (!prismaEnrollment) return null;
        
        return EnrollmentMapper.toDomain(prismaEnrollment);
    }

    async findAll(): Promise<Enrollment[]> {
        const prismaEnrollments = await prisma.enrollment.findMany({
            select: enrollmentSelect,
            orderBy: { createdAt: 'desc' },
        });
        return prismaEnrollments.map(EnrollmentMapper.toDomain);
    }
}
