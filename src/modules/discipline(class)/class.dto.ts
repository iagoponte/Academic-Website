import type z from "zod";
import type { createClassSchema } from "./schema/class.schema.js";

export type CreateClassDTO = z.infer<typeof createClassSchema>;

export interface UpdateClassDTO {
    name?: string;
    semester?: string;
}

export interface ClassResponseDTO {
    id: string;
    name: string;
    semester: string;
    createdAt: Date;
    teachers: {
        id: string;
        name: string;
        email: string;
    }[];
}