import type { GradeResponseDTO } from "./evalGrade.dto.js";
import type { GradeWithDetails } from "./evalGrade.repository.js";


export class GradeMapper {
  static toResponse(grade: GradeWithDetails): GradeResponseDTO {
    return {
      id: grade.id,
      value: grade.value,

      enrollment: {
        id: grade.enrollment.id,
        student: {
          id: grade.enrollment.student.id,
          name: grade.enrollment.student.name,
          registrationNumber:
            grade.enrollment.student.registrationNumber,
        },
        class: {
          id: grade.enrollment.class.id,
          name: grade.enrollment.class.name,
          semester: grade.enrollment.class.semester,
        },
      },

      evaluation: {
        id: grade.evaluation.id,
        type: grade.evaluation.type,
        weight: grade.evaluation.weight,
      },

      createdAt: grade.createdAt,
      updatedAt: grade.updatedAt,
    };
  }

  static toResponseList(
    grades: GradeWithDetails[]
  ): GradeResponseDTO[] {
    return grades.map(GradeMapper.toResponse);
  }
}
