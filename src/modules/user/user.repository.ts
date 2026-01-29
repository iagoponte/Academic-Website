import { prisma } from "../../infraestructure/prisma/client.js";
import { removeUndefined } from "../../shared/utils/removeUndefined.js";
import type { CreateUserDTO, UpdateUserDTO } from "./user.dtos.js";
import type { User } from "./user.entity.js";

export class UserRepository {
    
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async create(data: CreateUserDTO): Promise<User> {
        return prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                roles: [data.role],
            }
        });
    }

    async update(id: string, data: UpdateUserDTO): Promise<User> {
        const clearData = removeUndefined(data)
        return prisma.user.update({
            where: { id },
            data: clearData
        });
    }

    async delete(id: string): Promise<User> {
        return prisma.user.delete({ where: { id } });
    }
}