// src/modules/evaluationGrade/evalGrade.mapper.ts
import type { EvaluationGrade as PrismaGrade, Student, Class, Evaluation, Enrollment, User } from "../../infraestructure/generated/prisma/client.js";
import type { EvaluationGrade } from "./evalGrade.entity.js";
import type { GradeResponseDTO } from "./evalGrade.dto.js";
import type { EvaluationType } from "../evaluation/evaluation.entity.js";

// Definição do Tipo Complexo que vem do Prisma (Join de tabelas)
type PrismaGradeWithRelations = PrismaGrade & {
    enrollment?: (Enrollment & {
        student?: Student | null;
        class?: Class | null;
    }) | null;
    evaluation?: Evaluation | null;
};

export class GradeMapper {
    static toDomain(raw: PrismaGradeWithRelations): EvaluationGrade {
        return {
            id: raw.id,
            value: raw.value,
            enrollmentId: raw.enrollmentId,
            evaluationId: raw.evaluationId,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,

            // Mapeando dados do Aluno (se existirem)
            student: raw.enrollment?.student ? {
                id: raw.enrollment.student.id,
                name: raw.enrollment.student.name,
                registrationNumber: raw.enrollment.student.registrationNumber
            } : undefined,

            // Mapeando dados da Turma (se existirem)
            classInfo: raw.enrollment?.class ? {
                id: raw.enrollment.class.id,
                name: raw.enrollment.class.name,
                semester: raw.enrollment.class.semester
            } : undefined,

            // Mapeando dados da Avaliação (se existirem)
            evaluationInfo: raw.evaluation ? {
                id: raw.evaluation.id,
                type: raw.evaluation.type as unknown as EvaluationType,
                weight: raw.evaluation.weight
            } : undefined
        };
    }

    static toResponse(grade: EvaluationGrade): GradeResponseDTO {
        return {
            id: grade.id,
            value: grade.value,
            createdAt: grade.createdAt,
            updatedAt: grade.updatedAt,
            
            enrollment: {
                id: grade.enrollmentId,
                student: grade.student ? {
                    id: grade.student.id,
                    name: grade.student.name,
                    registrationNumber: grade.student.registrationNumber
                } : { id: "", name: "Desconhecido", registrationNumber: "" }, // Fallback seguro
                class: grade.classInfo ? {
                    id: grade.classInfo.id,
                    name: grade.classInfo.name,
                    semester: grade.classInfo.semester
                } : { id: "", name: "Desconhecido", semester: "" }
            },

            evaluation: grade.evaluationInfo ? {
                id: grade.evaluationInfo.id,
                type: grade.evaluationInfo.type,
                weight: grade.evaluationInfo.weight
            } : { id: grade.evaluationId, type: "OTHER", weight: 0 }
        };
    }

    static toResponseList(grades: EvaluationGrade[]): GradeResponseDTO[] {
        return grades.map(GradeMapper.toResponse);
    }
}