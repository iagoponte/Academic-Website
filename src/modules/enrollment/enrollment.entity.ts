export interface Enrollment {
    id: string;
    studentId: string;
    classId: string;
    createdAt: Date;

    student?: {
        id: string;
        name: string;
        registrationNumber: string;
    } | undefined;

    classInfo?: {
        id: string;
        name: string;
        semester: string;
    } | undefined;
}