import type { Request, Response } from 'express';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { createUserSchema, updateUserSchema } from './schema/user.schema.js';
import { getStringParam } from '../../shared/http/params.js';
import { UserMapper } from './user.mapper.js';


export class UserController {
    private service = new UserService(new UserRepository());

    create = async (req: Request, res: Response) => {
        const validData = createUserSchema.parse(req.body);
        const user = await this.service.create(validData);
        const userResponse = UserMapper.toResponse(user)
        return res.status(201).json(userResponse);
    };

    list = async (req: Request, res: Response) => {
        const users = await this.service.list();
        const userResponse = users.map(UserMapper.toResponse)
        return res.json(userResponse);
    };

    update = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        const validData = updateUserSchema.parse(req.body);
        const user = await this.service.update(id, validData);
        const userResponse = UserMapper.toResponse(user)
        return res.json(userResponse);
    };

    delete = async (req: Request, res: Response) => {
        const id = getStringParam(req, 'id');
        await this.service.delete(id);
        return res.status(204).send();
    };
}