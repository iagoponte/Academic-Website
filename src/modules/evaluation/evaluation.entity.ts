export interface Evaluation {
    id: string;
    classId: string;
    type: string;
    description: string | null;
    weight: number;
    createdAt: Date;
    updatedAt: Date;
}

export enum EvaluationType {
    AV1 = 'AV1',
    AV2 = 'AV2',
    FINAL = 'FINAL',
    SUBSTITUTIVE = 'SUBSTITUTIVE',
    OTHER = 'OTHER'
}