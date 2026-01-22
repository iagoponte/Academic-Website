import type { ClassEntity } from "../discipline(class)/class.entity.js";
import type { Student } from "../student/student.entity.js";
import type { EnrollmentResponseDTO } from "./enrollment.dto.js";
import type { Enrollment } from "./enrollment.entity.js";

export type EnrollmentWithDetails = Enrollment & {
  student: {
    id: string;
    name: string;
    registrationNumber: string;
  };
  class: {
    id: string;
    name: string;
    semester: string;
  };
};


export class EnrollmentMapper {
    static toResponse(enrollment: EnrollmentWithDetails): EnrollmentResponseDTO {
        return {
            id: enrollment.id,
            createdAt: enrollment.createdAt,
            student: {
                id: enrollment.student.id,
                name: enrollment.student.name,
                registration: enrollment.student.registrationNumber,
            },
            class: {
                id: enrollment.class.id,
                name: enrollment.class.name,
                semester: enrollment.class.semester,
            },
        };
    }
}
