export interface ReportCardDTO {
  student: {
    name: string;
    registrationNumber: string;
  };
  class: {
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

