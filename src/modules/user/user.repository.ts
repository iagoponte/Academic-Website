import { prisma } from "../../infraestructure/prisma/client.js";
import { removeUndefined } from "../../shared/utils/removeUndefined.js";
import type { CreateUserDTO, UpdateUserDTO } from "./user.dtos.js";
import type { User } from "./user.entity.js";
import { Role as PrismaRole } from "../../infraestructure/generated/prisma/enums.js";
import { UserMapper } from "./user.mapper.js";

export class UserRepository {
    
    async findByEmail(email: string): Promise<User | null> {
        //prisma type
        const prismaUser = await prisma.user.findUnique({ where: { email }});
        if (!prismaUser) return null;
        //domain type
        return UserMapper.toDomain(prismaUser);
    }

    async findById(id: string): Promise<User | null> {
        const prismaUser = await prisma.user.findUnique({ where: { id } });
        if (!prismaUser) return null;
        return UserMapper.toDomain(prismaUser);
    }

    async findAll(): Promise<User[]> {
        const prismaUsers = await prisma.user.findMany();
        return prismaUsers.map(user => UserMapper.toDomain(user))
    }

    async create(data: CreateUserDTO): Promise<User> {
        const prismaRole = data.role as unknown as PrismaRole;
        const newPrismaUser = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                roles: [prismaRole],
            }
        });
        return UserMapper.toDomain(newPrismaUser)
    }

    async update(id: string, data: UpdateUserDTO): Promise<User> {
        const clearData = removeUndefined(data)
        const updatePrismaUser = await prisma.user.update({
            where: { id },
            data: clearData
        });
        return UserMapper.toDomain(updatePrismaUser);
    }

    async delete(id: string): Promise<User> {
        const deletedPrismaUser = await prisma.user.delete({ where: { id } });
        return UserMapper.toDomain(deletedPrismaUser);
    }
}