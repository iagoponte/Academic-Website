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
    grade: number | null;         // Grade given
    weightedGrade: number | null; // Grade considering the weight (ex: 8.0 if weight 0.8)
  }[];
  average: number;
  status: 'Aprovado' | 'Reprovado' | 'Recuperação';
  generatedAt: Date;
}
