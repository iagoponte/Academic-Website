import { Router } from 'express';
import { StudentController } from './student.controller.js';
import { ensureAuthenticated } from '../../middlewares/authenticate.middleware.js';
import { ensureRoles } from '../../middlewares/authorize.middleware.js';
import { Role } from '../user/user.entity.js';

const studentRoutes = Router();
const controller = new StudentController();

studentRoutes.use(ensureAuthenticated);

/**
 * @openapi
 * /api/students:
 *  post:
 *    summary: Cria um novo estudante
 *    tags: [Students]
 *    security:
 *      - bearerAuth: []
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
studentRoutes.post('/', ensureRoles([Role.Administrator, Role.Coordinator]), controller.create);

/**
 * @openapi
 * /api/students:
 *  get:
 *    summary: Lista todos os estudantes
 *    tags: [Students]
 *    security:
 *      - bearerAuth: []
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
studentRoutes.get('/', ensureRoles([Role.Administrator, Role.Coordinator, Role.Teacher]), controller.list);

/**
 * @openapi
 * /api/students/{id}:
 *  get:
 *    summary: Busca estudante por ID
 *    tags: [Students]
 *    security:
 *      - bearerAuth: []
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
studentRoutes.get('/:id', ensureRoles([Role.Administrator, Role.Coordinator, Role.Teacher]), controller.getById);

/**
 * @openapi
 * /api/students/{id}:
 *  patch:
 *    summary: Atualiza dados cadastrais do estudante
 *    tags: [Students]
 *    security:
 *      - bearerAuth: []
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
 studentRoutes.patch('/:id', ensureRoles([Role.Administrator, Role.Coordinator]), controller.update); 
 
 /**
 * @openapi
 * /api/students/{id}/inactivate:
 *  patch:
 *    summary: Inativa um estudante
 *    tags: [Students]
 *    security:
 *      - bearerAuth: []
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
studentRoutes.patch('/:id/inactivate', ensureRoles([Role.Administrator, Role.Coordinator]), controller.inactivate);

/**
 * @openapi
 * /api/students/{id}/correct-registration:
 *  patch:
 *    summary: Corrige a matrícula do estudante (Requer motivo)
 *    tags: [Students]
 *    security:
 *      - bearerAuth: []
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
studentRoutes.patch('/:id/correct-registration', ensureRoles([Role.Administrator, Role.Coordinator]), controller.correctRegistration);

export { studentRoutes };
