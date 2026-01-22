import type z from "zod";
import type { createStudentSchema, updateStudentSchema } from "./schema/student.schema.js";

export type CreateStudentDTO = z.infer<typeof createStudentSchema>;

// export interface CreateStudentDTO {
//     registrationNumber: string;
//     name: string;
//     email: string;
// }

// export interface UpdateStudentDTO {
//     name?: string;
//     email?: string;
//     registrationNumber?: string;
//     isActive?: boolean;

// }

export type UpdateStudentDTO = z.infer<typeof updateStudentSchema>;

export interface CorrectStudentRegistrationDTO {
    newRegistrationNumber: string;
    reason: string;
}

export interface StudentResponseDTO {
    id: string;
    registrationNumber: string;
    name: string;
    email: string;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: Date;
    updatedAt: Date;
}
