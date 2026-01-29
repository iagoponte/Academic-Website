import { z } from 'zod';

/**
 * @openapi
 * components:
 * schemas:
 * CreateStudent:
 * type: object
 * required:
 * - name
 * - email
 * - password
 * - registrationNumber
 * properties:
 * name:
 * type: string
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * minLength: 6
 * registrationNumber:
 * type: string
 * StudentResponse:
 * type: object
 * properties:
 * id:
 * type: string
 * registrationNumber:
 * type: string
 * name:
 * type: string
 * email:
 * type: string
 * description: "Vem do relacionamento com User"
 * status:
 * type: string
 * enum: [ACTIVE, INACTIVE]
 */

export const createStudentSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  registrationNumber: z.string().length(10, "Matrícula deve ter 10 caracteres"),
});

// Apenas dados cadastrais do aluno
export const updateStudentSchema = z.object({
    name: z.string().min(3).optional(),
    isActive: z.boolean().optional(),
});

export const correctStudentRegistrationSchema = z.object({
  newRegistrationNumber: z.string().length(10, "A nova matrícula deve ter 10 caracteres"),
  reason: z.string().min(5, "O motivo é obrigatório e deve ser detalhado"),
});