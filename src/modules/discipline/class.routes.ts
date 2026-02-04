import { Router } from "express";
import { ClassController } from "./class.controller.js";

const classRoutes = Router();
const controller = new ClassController();

/**
 * @openapi
 * /api/classes:
 *   post:
 *     tags:
 *       - Classes
 *     summary: Criar uma nova turma
 *     description: Cria uma nova turma informando nome e semestre.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClass'
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
classRoutes.post('/', controller.create);
/**
 * @openapi
 * /api/classes:
 *   get:
 *     tags:
 *       - Classes
 *     summary: Listar todas as turmas
 *     description: Retorna a lista de todas as turmas cadastradas.
 *     responses:
 *       200:
 *         description: Lista de turmas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       500:
 *         description: Erro interno do servidor
 */
classRoutes.get('/', controller.list);
/**
 * @openapi
 * /api/classes/{id}:
 *   get:
 *     tags:
 *       - Classes
 *     summary: Buscar turma por ID
 *     description: Retorna os dados de uma turma específica, incluindo professores vinculados.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Turma encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
classRoutes.get('/:id', controller.getById);

export { classRoutes };