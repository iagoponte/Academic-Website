import type z from "zod";
import type { createEvaluationSchema, updateEvaluationSchema } from "./schema/evaluation.schema.js";

/* =========================
 * CREATE
 * ========================= */
export type CreateEvaluationDTO = z.infer<typeof createEvaluationSchema>;

/* =========================
 * UPDATE
 * ========================= */
export type UpdateEvaluationDTO = z.infer<typeof updateEvaluationSchema>;

/* =========================
 * RESPONSE
 * ========================= */
export interface EvaluationResponseDTO {
  id: string;
  type: string;
  description?: string | null;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}
