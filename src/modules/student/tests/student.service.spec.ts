import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StudentService } from '../student.service.js';
import { AppError } from '../../../shared/errors/appError.js';

describe('StudentService', () => {
  let service: StudentService;
  let repository: any;

  const studentEntity = {
    id: 'uuid',
    name: 'John Doe',
    userId: 'uuid',
    email: 'john@email.com',
    registrationNumber: '1234567890',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    repository = {
      findByRegistrationNumber: vi.fn(),
      findUserByEmail: vi.fn(),
      updateRegistration: vi.fn(),
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
    };

    service = new StudentService(repository);
    vi.clearAllMocks();
  });

  // =========================
  // CREATE
  // =========================
  it('should create a student when registration does not exist', async () => {
    repository.findByRegistrationNumber.mockResolvedValue(null);
    repository.create.mockResolvedValue(studentEntity);

    const result = await service.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: 'çalskjdfçlakjsdf',
      registrationNumber: '1234567890',
    });

    expect(repository.create).toHaveBeenCalledOnce();
    expect(result).toHaveProperty('id');
    expect(result.status).toBe('ACTIVE');
  });

  it('should throw error if registration number already exists', async () => {
    repository.findByRegistrationNumber.mockResolvedValue(studentEntity);

    await expect(
      service.create({
        name: 'John',
        email: 'john@email.com',
        password: 'çalskjdfçlakjsdf',
        registrationNumber: '1234567890',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // =========================
  // LIST
  // =========================
  it('should list students', async () => {
    repository.findAll.mockResolvedValue([studentEntity]);

    const result = await service.list();

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('registrationNumber');
  });

  // =========================
  // GET BY ID
  // =========================
  it('should return student by id', async () => {
    repository.findById.mockResolvedValue(studentEntity);

    const result = await service.getById('uuid');

    expect(result.name).toBe('John Doe');
  });

  it('should throw error when student not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(
      service.getById('invalid-id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  // =========================
  // UPDATE
  // =========================
  it('should update a student', async () => {
    repository.findById.mockResolvedValue(studentEntity);
    repository.update.mockResolvedValue({
      ...studentEntity,
      name: 'Updated Name',
    });

    const result = await service.update('uuid', {
      name: 'Updated Name',
    });

    expect(result.name).toBe('Updated Name');
    expect(repository.update).toHaveBeenCalled();
  });

  // =========================
  // INACTIVATE
  // =========================
  it('should inactivate a student', async () => {
    repository.findById.mockResolvedValue(studentEntity);
    repository.update.mockResolvedValue({
      ...studentEntity,
      isActive: false,
    });

    const result = await service.inactivate('uuid');

    expect(result.status).toBe('INACTIVE');
  });

  it('should throw error if student already inactive', async () => {
    repository.findById.mockResolvedValue({
      ...studentEntity,
      isActive: false,
    });

    await expect(
      service.inactivate('uuid'),
    ).rejects.toBeInstanceOf(AppError);
  });

  // =========================
  // CORRECT REGISTRATION
  // =========================
  it('should correct registration number', async () => {
    repository.findByRegistrationNumber.mockResolvedValue(null);
    repository.findById.mockResolvedValue(studentEntity);
    repository.updateRegistration.mockResolvedValue({
      ...studentEntity,
      registrationNumber: '9999999999',
    });

    const result = await service.correctRegistration('uuid', {
      newRegistrationNumber: '9999999999',
      reason: 'Typing error',
    });

    expect(result.registrationNumber).toBe('9999999999');
  });

  it('should throw error if reason is empty', async () => {
    await expect(
      service.correctRegistration('uuid', {
        newRegistrationNumber: '9999999999',
        reason: '   ',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
