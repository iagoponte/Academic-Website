import type z from "zod";
import type { createTeacherSchema } from "./schema/teacher.schema.js";

export type CreateTeacherDTO = z.infer<typeof createTeacherSchema>;


export interface UpdateTeacherDTO {
    name?: string;
    email?: string;
    password?: string;
}

export interface TeacherResponseDTO {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}