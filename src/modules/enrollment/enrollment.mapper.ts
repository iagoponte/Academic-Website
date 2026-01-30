import type { EnrollmentResponseDTO } from "./enrollment.dto.js";
import type { Enrollment } from "./enrollment.entity.js";
import type { Enrollment as PrismaEnrollment, Student, Class } from "../../infraestructure/generated/prisma/client.js";

type PrismaEnrollmentWithRelations = PrismaEnrollment & {
    student?: Pick<Student, 'id' | 'name' | 'registrationNumber'> | null;
    class?: Pick<Class, 'id' | 'name' | 'semester'> | null;
};

export class EnrollmentMapper {
    
    static toDomain(raw: PrismaEnrollmentWithRelations): Enrollment {
        return {
            id: raw.id,
            studentId: raw.studentId,
            classId: raw.classId,
            createdAt: raw.createdAt,
            
            student: raw.student ? {
                id: raw.student.id,
                name: raw.student.name,
                registrationNumber: raw.student.registrationNumber
            } : undefined,

            classInfo: raw.class ? {
                id: raw.class.id,
                name: raw.class.name,
                semester: raw.class.semester
            } : undefined
        };
    }

    static toResponse(enrollment: Enrollment): EnrollmentResponseDTO {
        return {
            id: enrollment.id,
            createdAt: enrollment.createdAt,
            
            student: enrollment.student ? {
                id: enrollment.student.id,
                name: enrollment.student.name,
                registration: enrollment.student.registrationNumber,
            } : { id: "", name: "Desconhecido", registration: "" }, // Fallback

            class: enrollment.classInfo ? {
                id: enrollment.classInfo.id,
                name: enrollment.classInfo.name,
                semester: enrollment.classInfo.semester,
            } : { id: "", name: "Desconhecido", semester: "" } // Fallback
        };
    }
}