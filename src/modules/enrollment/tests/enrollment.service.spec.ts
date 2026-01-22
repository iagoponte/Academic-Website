import { describe, it, expect, beforeEach, vi } from "vitest";
import { AppError } from "../../../shared/errors/appError.js";
import { EnrollmentService } from "../enrollment.service.js";
import { create } from "node:domain";

describe("EnrollmentService", () => {
  let service: any;
  let repository: any;
  let studentRepository: any;
  let classRepository: any;

  const enrollmentEntity = {
    id: "uuid",
    studentId: "student-uuid",
    classId: "class-uuid",
    createdAt: new Date(),
  };

  beforeEach(() => {
    repository = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      findByStudent: vi.fn(),
      findByClass: vi.fn(),
      exists: vi.fn(),
      delete: vi.fn(),
    };
    studentRepository = {
      exists: vi.fn(),
    };
    classRepository = {
      exists: vi.fn(),
    };

    service = new EnrollmentService(
      repository,
      studentRepository,
      classRepository,
    );

    vi.clearAllMocks();
  });

  it("should create a new enrollment", async () => {
    const enrollmentData = {
      studentId: "student-uuid",
      classId: "class-uuid",
    };

    const createdEnrollment = {
      id: "enroll-uuid",
      student: { id: "student-uuid", name: "João", registrationNumber: "registration-uuid"},
      class: { id: "class-uuid", name: "Biochemistry", semester: "2023.1" },
      createdAt: new Date(),
    };

    repository.create.mockResolvedValue(createdEnrollment);
    studentRepository.exists.mockResolvedValue(true);
    classRepository.exists.mockResolvedValue(true);

    const result = await service.create(enrollmentData);

    expect(repository.create).toHaveBeenCalledWith(enrollmentData);
    expect(result).toEqual({
      id: "enroll-uuid",
      student: { id: "student-uuid", name: "João", registration: "registration-uuid"},
      class: { id: "class-uuid", name: "Biochemistry", semester: "2023.1" },
      createdAt: createdEnrollment.createdAt,
    });
  });

  it("should throw error if student does not exist", async () => {
    const enrollmentData = {
      studentId: "invalid-student-uuid",
      classId: "class-uuid",
    };

    studentRepository.exists.mockResolvedValue(false);

    await expect(service.create(enrollmentData)).rejects.toBeInstanceOf(
      AppError,
    );
    await expect(service.create(enrollmentData)).rejects.toMatchObject({
      statusCode: 404,
    });
  });

  it("should throw error if class does not exist", async () => {
    const enrollmentData = {
      studentId: "student-uuid",
      classId: "invalid-class-uuid",
    };

    studentRepository.exists.mockResolvedValue(true);
    classRepository.exists.mockResolvedValue(false);

    await expect(service.create(enrollmentData)).rejects.toBeInstanceOf(
      AppError,
    );
    await expect(service.create(enrollmentData)).rejects.toMatchObject({
      statusCode: 404,
    });
  });

  it("should throw error if enrollment already exists", async () => {
    const enrollmentData = {
      studentId: "student-uuid",
      classId: "class-uuid",
    };

    repository.exists.mockResolvedValue(true);
    studentRepository.exists.mockResolvedValue(true);
    classRepository.exists.mockResolvedValue(true);

    await expect(service.create(enrollmentData)).rejects.toBeInstanceOf(
      AppError,
    );
    await expect(service.create(enrollmentData)).rejects.toMatchObject({
      statusCode: 409,
    });
  });
});
