import type z from "zod";
import type { createTeacherSchema, updateTeacherSchema } from "./schema/teacher.schema.js";

export type CreateTeacherDTO = z.infer<typeof createTeacherSchema>;

export type UpdateTeacherDTO = z.infer<typeof updateTeacherSchema>;

export interface TeacherResponseDTO {
    id: string;
    userId: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}