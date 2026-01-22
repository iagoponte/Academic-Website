import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TeacherService } from '../teacher.service.js';
import { AppError } from '../../../shared/errors/appError.js';

describe('TeacherService', () => {
    let service: TeacherService;
    let repository: any;

    const TeacherEntity = {
        id: 'uuid',
        name: 'Jane Done',
        email: 'jane@email.com',
        password: 'hashedanypassword',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(() => {
        repository = {
          findByEmail: vi.fn(),
          create: vi.fn(),
          findAll: vi.fn(),
          findById: vi.fn(),
          update: vi.fn(),
          delete: vi.fn(),
        };
    
        service = new TeacherService(repository);
        vi.clearAllMocks();
    })

    // =========================
    // CREATE
    // =========================
    it('should create a teacher when email does not exist', async () => {
        repository.findByEmail.mockResolvedValue(null);
        repository.create.mockResolvedValue(TeacherEntity);

        const result = await service.create({
            name: 'Jane Done',
            email: 'jane@email.com',
            password: 'anypassword',
        });
        expect(repository.create).toHaveBeenCalledOnce();
        expect(result).toHaveProperty('id');
    });

    it('should throw error if email already exists', async () => {
        repository.findByEmail.mockResolvedValue(TeacherEntity);

        await expect(
            service.create({
                name: 'Jane',
                email: 'jane@email.com',
                password: 'anypassword',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    // =========================
    // LIST
    // =========================
    it('should list all teachers', async () => {
        repository.findAll.mockResolvedValue([TeacherEntity]);

        const result = await service.list();

        expect(repository.findAll).toHaveBeenCalledOnce();
        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('id');
    });

    // =========================
    // GET BY ID
    // =========================
    it('should get a teacher by id', async () => {
        repository.findById.mockResolvedValue(TeacherEntity);

        const result = await service.getById('uuid');

        expect(repository.findById).toHaveBeenCalledOnce();
        expect(result).toHaveProperty('id');
    });

    it('should throw error if teacher not found by id', async () => {
        repository.findById.mockResolvedValue(null);

        await expect(service.getById('uuid')).rejects.toBeInstanceOf(AppError);
    });

    // =========================
    // UPDATE
    // =========================
    it('should update a teacher', async () => {
        repository.findById.mockResolvedValue(TeacherEntity);
        repository.update.mockResolvedValue({
            ...TeacherEntity,
            name: 'Jane Updated',
            email: 'jane.updated@email.com',
        });

        const result = await service.update('uuid', { name: 'Jane Updated' });

        expect(repository.findById).toHaveBeenCalledOnce();
        expect(repository.update).toHaveBeenCalledOnce();
        expect(result.name).toBe('Jane Updated');
        expect(result.email).toBe('jane.updated@email.com');
    });

    // =========================
    // DELETE
    // =========================
    it('should delete a teacher', async () => {
        repository.findById.mockResolvedValue(TeacherEntity);
        repository.delete.mockResolvedValue();

        await service.delete('uuid');

        expect(repository.findById).toHaveBeenCalledOnce();
        expect(repository.delete).toHaveBeenCalledOnce();
    });

    it('should throw error if trying to delete a non-existing teacher', async () => {
        repository.findById.mockResolvedValue(null);

        await expect(service.delete('uuid')).rejects.toBeInstanceOf(AppError);
    });
});