export interface ReportCard {
    student: {
        name: string;
        registrationNumber: string;
    };
    classInfo: { // "class" é reservado
        name: string;
        semester: string;
    };
    evaluations: {
        type: string;
        weight: number;
        grade: number | null;
    }[];
    average: number;
    status: 'Aprovado' | 'Reprovado' | 'Recuperação';
    generatedAt: Date;
}