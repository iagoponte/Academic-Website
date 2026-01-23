import { Router } from 'express';
import { ClassTeacherController } from './classTeacher.controller.js';

const classTeacherRoutes = Router();
const classTeacherController = new ClassTeacherController();

/**
 @openapi
 /classes/{id}/teachers:
   post:
     summary: Vincular professor a uma turma
     tags:
       - ClassTeacher
     parameters:
       - in: path
         name: id
         required: true
         schema:
           type: string
           format: uuid
         description: ID da turma
     requestBody:
       required: true
       content:
         application/json:
           schema:
             type: object
             required:
               - teacherId
             properties:
               teacherId:
                 type: string
                 format: uuid
                 example: d1e2f3a4-b5c6-7890-abcd-ef1234567890
     responses:
       201:
         description: Professor vinculado com sucesso
         content:
           application/json:
             schema:
               $ref: '#/components/schemas/ClassTeacherAssignmentResponse'
       400:
         description: Erro de validação ou vínculo já existente
         content:
           application/json:
             schema:
               $ref: '#/components/schemas/ErrorResponse'
       404:
         description: Turma ou professor não encontrado
 */
classTeacherRoutes.post('/classes/:id/teachers', classTeacherController.assign);
/**
 @openapi
 /classes/{id}/teachers/{teacherId}:
   delete:
     summary: Desvincular professor de uma turma
     tags:
       - ClassTeacher
     parameters:
       - in: path
         name: id
         required: true
         schema:
           type: string
           format: uuid
         description: ID da turma
       - in: path
         name: teacherId
         required: true
         schema:
           type: string
           format: uuid
         description: ID do professor
     responses:
       204:
         description: Professor desvinculado com sucesso
       404:
         description: Vínculo não encontrado
         content:
           application/json:
             schema:
               $ref: '#/components/schemas/ErrorResponse'
 */
classTeacherRoutes.delete('/classes/:id/teachers/:teacherId', classTeacherController.unassign);

export { classTeacherRoutes };