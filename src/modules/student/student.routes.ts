import { Router } from 'express';
import { StudentController } from './student.controller.js';

const studentRoutes = Router();
const controller = new StudentController();

/**
 * @openapi
 * /api/students:
 *  post:
 *    summary: Cria um novo estudante
 *    tags: [Students]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateStudent"
 *    responses:
 *      201:
 *        description: Estudante criado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StudentResponse"
 *      400:
 *        description: Erro de validação
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
studentRoutes.post('/', controller.create);

/**
 * @openapi
 * /api/students:
 *  get:
 *    summary: Lista todos os estudantes
 *    tags: [Students]
 *    responses:
 *      200:
 *        description: Lista de estudantes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/StudentResponse"
 */
studentRoutes.get('/', controller.list);

/**
 * @openapi
 * /api/students/{id}:
 *  get:
 *    summary: Busca estudante por ID
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Estudante encontrado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StudentResponse"
 *      404:
 *        description: Estudante não encontrado
 */
studentRoutes.get('/:id', controller.getById);

/**
 * @openapi
 * /api/students/{id}:
 *  patch:
 *    summary: Atualiza dados cadastrais do estudante
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateStudent"
 *    responses:
 *      200:
 *        description: Estudante atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StudentResponse"
 */
 studentRoutes.patch('/:id', controller.update); 
 
 /**
 * @openapi
 * /api/students/{id}/inactivate:
 *  patch:
 *    summary: Inativa um estudante
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Estudante inativado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StudentResponse"
 *
 */
studentRoutes.patch('/:id/inactivate', controller.inactivate);

/**
 * @openapi
 * /api/students/{id}/correct-registration:
 *  patch:
 *    summary: Corrige a matrícula do estudante (Requer motivo)
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CorrectStudentRegistration"
 *    responses:
 *      200:
 *        description: Matrícula corrigida com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StudentResponse"
 */
studentRoutes.patch('/:id/correct-registration', controller.correctRegistration);

export { studentRoutes };
