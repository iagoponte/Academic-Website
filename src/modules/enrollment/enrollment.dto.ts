import type z from "zod";
import type { createEnrollmentSchema } from "./schema/enrollment.schema.js";

export type CreateEnrollmentDTO = z.infer<typeof createEnrollmentSchema>;

export interface StudentSummaryDTO {
  id: string;
  name: string;
  registration: string;
}

export interface ClassSummaryDTO {
  id: string;
  name: string;
  semester: string;
}

export interface EnrollmentResponseDTO {
  id: string;
  student: StudentSummaryDTO;
  class: ClassSummaryDTO;
  createdAt: Date;
}

export interface EnrollmentFilterDTO {
    studentId?: string;
    classId?: string;
}
