import { z } from 'zod';
import { EvaluationType } from '../evaluation.entity.js';

export const createEvaluationSchema = z.object({
  type: z.nativeEnum(EvaluationType, {
    error: () => ({ message: "Tipo inválido." })
  }),
  description: z.string().max(255, "Descrição muito longa") || z.null(),
  weight: z.number(),
  classId: z.string().uuid(),
});

export const updateEvaluationSchema = createEvaluationSchema
  .omit({ classId: true }) 
  .partial();
