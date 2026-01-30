import type { EvaluationType } from "../evaluation/evaluation.entity.js";

export interface EvaluationGrade {
    id: string;
    value: number;
    enrollmentId: string;
    evaluationId: string;
    createdAt: Date;
    updatedAt: Date;

    student?: {
        id: string;
        name: string;
        registrationNumber: string;
    } | undefined;
    classInfo?: { // "class" é palavra reservada, usamos classInfo
        id: string;
        name: string;
        semester: string;
    } | undefined;
    evaluationInfo?: {
        id: string;
        type: EvaluationType;
        weight: number;
    } | undefined;
}