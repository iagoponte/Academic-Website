import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserService } from '../user.service.js';
import { Role } from '../../../infraestructure/generated/prisma/enums.js';
import { AppError } from '../../../shared/errors/appError.js';

describe('UserService', () => {
    let service: UserService;
    let repository: any;

    // Entidade Mockada (User tem Roles agora!)
    const UserEntity = {
        id: 'uuid-user-123',
        email: 'admin@school.com',
        password: 'hashedpassword123',
        roles: [Role.Administrator], // Exemplo de role
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(() => {
        // Mock do Repositório
        repository = {
            findByEmail: vi.fn(),
            findById: vi.fn(),
            create: vi.fn(),
            findAll: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        };

        service = new UserService(repository);
        vi.clearAllMocks();
    });

    // =========================
    // CREATE
    // =========================
    it('should create a user when email does not exist', async () => {
        // 1. Arrange
        repository.findByEmail.mockResolvedValue(null); // Email livre
        repository.create.mockResolvedValue(UserEntity); // Retorno do banco

        // 2. Act
        const result = await service.create({
            email: 'admin@school.com',
            password: 'password123',
            role: Role.Administrator
        });

        // 3. Assert
        expect(repository.findByEmail).toHaveBeenCalledWith('admin@school.com');
        expect(repository.create).toHaveBeenCalledOnce();
        expect(result).toHaveProperty('id');
        expect(result.roles).toContain('Administrator');
    });

    it('should throw error if email already exists', async () => {
        repository.findByEmail.mockResolvedValue(UserEntity); // Email já existe

        await expect(
            service.create({
                email: 'admin@school.com',
                password: 'password123',
                role: Role.Administrator
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    // =========================
    // LIST
    // =========================
    it('should list all users', async () => {
        repository.findAll.mockResolvedValue([UserEntity]);

        const result = await service.list();

        expect(repository.findAll).toHaveBeenCalledOnce();
        expect(result).toHaveLength(1);
        expect(result[0].email).toBe(UserEntity.email);
    });

    // =========================
    // UPDATE
    // =========================
    it('should update a user password', async () => {
        repository.findById.mockResolvedValue(UserEntity);
        repository.update.mockResolvedValue({
            ...UserEntity,
            password: 'newhashedpassword' 
        });

        const result = await service.update('uuid-user-123', { password: 'newpassword' });

        expect(repository.findById).toHaveBeenCalledWith('uuid-user-123');
        expect(repository.update).toHaveBeenCalledOnce();
    });

    it('should update user email if valid', async () => {
        repository.findById.mockResolvedValue(UserEntity);
        repository.findByEmail.mockResolvedValue(null);
        repository.update.mockResolvedValue({
            ...UserEntity,
            email: 'new@email.com'
        });

        const result = await service.update('uuid-user-123', { email: 'new@email.com' });

        expect(repository.findByEmail).toHaveBeenCalledWith('new@email.com');
        expect(result.email).toBe('new@email.com');
    });

    it('should throw error when updating email to one that is already taken', async () => {
        repository.findById.mockResolvedValue(UserEntity);
        repository.findByEmail.mockResolvedValue({ ...UserEntity, id: 'other-uuid' }); 
        await expect(
            service.update('uuid-user-123', { email: 'taken@email.com' })
        ).rejects.toBeInstanceOf(AppError);
    });

    // =========================
    // DELETE
    // =========================
    it('should delete a user', async () => {
        repository.findById.mockResolvedValue(UserEntity);
        repository.delete.mockResolvedValue(UserEntity);
        await service.delete('uuid-user-123');
        expect(repository.findById).toHaveBeenCalledWith('uuid-user-123');
        expect(repository.delete).toHaveBeenCalledWith('uuid-user-123');
    });

    it('should throw error if trying to delete a non-existing user', async () => {
        repository.findById.mockResolvedValue(null);
        await expect(service.delete('uuid-fake')).rejects.toBeInstanceOf(AppError);
    });
});