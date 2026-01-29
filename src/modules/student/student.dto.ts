import type z from "zod";
import type { correctStudentRegistrationSchema, createStudentSchema, updateStudentSchema } from "./schema/student.schema.js";

export type CreateStudentDTO = z.infer<typeof createStudentSchema>;

export type UpdateStudentDTO = z.infer<typeof updateStudentSchema>;

export type CorrectStudentRegistrationDTO = z.infer<typeof correctStudentRegistrationSchema>;

export interface StudentResponseDTO {
    id: string;
    userId: string;
    registrationNumber: string;
    name: string;
    email: string; 
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: Date;
    updatedAt: Date;
}
