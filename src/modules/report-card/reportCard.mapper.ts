import type { ReportCard } from "./reportCard.entity.js";
import type { ReportCardDTO } from "./reportCard.dto.js";

export class ReportCardMapper {
    static toResponse(entity: ReportCard): ReportCardDTO {
        return {
            student: entity.student,
            class: {
                name: entity.classInfo.name,
                semester: entity.classInfo.semester
            },
            evaluations: entity.evaluations,
            average: entity.average,
            status: entity.status,
            generatedAt: entity.generatedAt
        };
    }
}