import { Router } from 'express';
import { UserController } from './user.controller.js';
import { AuthController } from './auth/auth.controller.js';

const userRoutes = Router();
const controller = new UserController();
const authController = new AuthController();

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUser:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - role
 *      properties:
 *        name:
 *          type: string
 *          example: Admin Principal
 *        email:
 *          type: string
 *          format: email
 *          example: admin@escola.com
 *        password:
 *          type: string
 *          minLength: 6
 *          example: senhaSegura123
 *        role:
 *          type: string
 *          enum: [ADMIN, STUDENT, TEACHER, COORDINATOR, DIRECTOR]
 *          example: ADMIN
 *    UpdateUser:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          example: novo.email@escola.com
 *        password:
 *          type: string
 *          minLength: 6
 *          example: novaSenha123
 *        UserResponse:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              example: uuid-v4-string
 *              email:
 *                type: string
 *                example: admin@escola.com
 *            roles:
 *              type: array
 *              items:
 *                type: string
 *                example: ["ADMIN"]
 *            createdAt:
 *              type: string
 *              format: date-time
 *            updatedAt:
 *              type: string
 *              format: date-time
 *
 */

//rota de login
/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Dados inválidos (Schema Validation)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: E-mail ou senha incorretos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRoutes.post('/login', authController.handle)

/**
 * @openapi
 * /api/users:
 *  post:
 *    summary: Cria um novo usuário (Geral/Admin)
 *    description: Endpoint utilizado para criar administradores ou usuários sem perfil específico inicialmente.
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateUser"
 *    responses:
 *      201:
 *        description: Usuário criado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserResponse"
 *      409:
 *        description: Email já está em uso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
userRoutes.post('/', controller.create);

/**
 * @openapi
 * /api/users:
 *  get:
 *    summary: Lista todos os usuários do sistema
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: Lista de usuários recuperada com sucesso
 *        content:
 *          application/json:
 *            schema:
 *            type: array
 *            items:
 *              $ref: "#/components/schemas/UserResponse"
 */
userRoutes.get('/', controller.list);

/**
 * @openapi
 * /api/users/{id}:
 *  patch:
 *    summary: Atualiza credenciais do usuário (Email/Senha)
 *    tags: [Users]
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
 *            $ref: "#/components/schemas/UpdateUser"
 *    responses:
 *      200:
 *        description: Usuário atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserResponse"
 *      404:
 *        description: Usuário não encontrado
 */
userRoutes.patch('/:id', controller.update);

/**
 * @openapi
 * /api/users/{id}:
 *  delete:
 *    summary: Remove um usuário permanentemente
 *    description: CUIDADO. Ao remover um usuário, se ele for Aluno ou Professor, os dados vinculados também serão removidos (dependendo da configuração do banco).
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: Usuário removido com sucesso
 *      404:
 *        description: Usuário não encontrado
 */
userRoutes.delete('/:id', controller.delete);

//falta criar rota de update roles.

export { userRoutes };