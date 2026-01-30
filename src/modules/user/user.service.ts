import { hash } from "bcryptjs";
import { UserRepository } from "./user.repository.js";
import { AppError } from "../../shared/errors/appError.js";
import type { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from "./user.dtos.js";
import type { User } from "./user.entity.js";

export class UserService {
    constructor(private readonly repository: UserRepository) {}

    // Criar ADMINS ou COORDENADORES que não têm perfil específico
    async create(dto: CreateUserDTO): Promise<User> {
        const exists = await this.repository.findByEmail(dto.email);
        if (exists) {
            throw new AppError("Email already in use", 409);
        }
        const hashedPassword = await hash(dto.password, 8);
        const user = await this.repository.create({
            ...dto,
            password: hashedPassword
        });
        return user;
    }

    async list(): Promise<User[]> {
        const users = await this.repository.findAll();
        return users;
    }

    async getById(id: string): Promise<User> {
        const user = await this.repository.findById(id);
        if (!user) throw new AppError('User not found', 404);
        return user;
    }

    async getByEmail(email: string): Promise<User> {
        const user = await this.repository.findByEmail(email);
        if (!user) throw new AppError('User not found', 404);
        return user;
    }

    async update(id: string, dto: UpdateUserDTO): Promise<User> {
        const user = await this.repository.findById(id);
        if (!user) throw new AppError("User not found", 404);
        const dataToUpdate: UpdateUserDTO = {};
        if (dto.email && dto.email !== user.email) {
            const emailExists = await this.repository.findByEmail(dto.email);
            if (emailExists) throw new AppError("Email already in use", 409);
            dataToUpdate.email = dto.email;
        }
        if (dto.password) {
            dataToUpdate.password = await hash(dto.password, 8);
        }

        const updatedUser = await this.repository.update(id, dataToUpdate);
        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        const user = await this.repository.findById(id);
        if (!user) throw new AppError("User not found", 404);
        await this.repository.delete(id);
    }
}