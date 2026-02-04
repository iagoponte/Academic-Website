export interface ReportCard {
  student: {
    name: string;
    registrationNumber: string;
  };
  classInfo: {
    name: string;
    semester: string;
  };
  evaluations: {
    type: string;
    weight: number;
    grade: number | null;
    weightedGrade: number | null;
  }[];
  average: number;
  status: 'Aprovado' | 'Reprovado' | 'Recuperação';
  generatedAt: Date;
}
