import { describe, it, expect, beforeEach, vi } from "vitest";
import { AppError } from "../../../shared/errors/appError.js";
import { GradeService } from "../evalGrade.service.js";

describe("EvalGradeService", () => {
  let service: GradeService;
  let repository: any;
  let enrollmentRepository: any;
  let evaluationRepository: any;

  const gradeEntity = {
    id: "uuid",
    value: 9.5,

    enrollment: {
      id: "enroll-uuid",
      student: {
        id: "student-uuid",
        name: "John Doe",
        registrationNumber: "123456",
      },
      class: {
        id: "class-uuid",
        name: "Biochemistry",
        semester: "2024.1",
      },
    },

    evaluation: {
      id: "eval-uuid",
      type: "AV1",
      weight: 5,
    },

    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    repository = {
      findByEvaluation: vi.fn(),
      create: vi.fn(),
      findByEnrollment: vi.fn(),
      update: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      delete: vi.fn(),
      exists: vi.fn(),
    };

    enrollmentRepository = {
      findById: vi.fn(),
    };

    evaluationRepository = {
      findById: vi.fn(),
    };

    service = new GradeService(
      repository,
      enrollmentRepository,
      evaluationRepository,
    );

    vi.clearAllMocks();
  });
  // =========================
  // CREATE
  // =========================
  it("should create a grade when it does not already exist", async () => {
    repository.exists.mockResolvedValue(false);
    enrollmentRepository.findById.mockResolvedValue({
      id: "enroll-uuid",
      classId: "class-uuid",
    });
    evaluationRepository.findById.mockResolvedValue({
      id: "eval-uuid",
      classId: "class-uuid",
    });
    repository.create.mockResolvedValue(gradeEntity);

    const result = await service.create({
      enrollmentId: "enroll-uuid",
      evaluationId: "eval-uuid",
      value: 9.5,
    });

    expect(repository.create).toHaveBeenCalledOnce();
    expect(result).toHaveProperty("id");
  });

  it("should throw error if grade already exists for the evaluation and enrollment", async () => {
    repository.exists.mockResolvedValue(true);

    await expect(
      service.create({
        enrollmentId: "enroll-uuid",
        evaluationId: "eval-uuid",
        value: 9.5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should throw error if enrollment does not exist", async () => {
    repository.exists.mockResolvedValue(false);
    enrollmentRepository.findById.mockResolvedValue(null);
    await expect(
      service.create({
        enrollmentId: "invalid-enroll-uuid",
        evaluationId: "eval-uuid",
        value: 9.5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should throw error if evaluation does not exist", async () => {
    repository.exists.mockResolvedValue(false);
    enrollmentRepository.findById.mockResolvedValue({
      id: "enroll-uuid",
      classId: "class-uuid",
    });
    evaluationRepository.findById.mockResolvedValue(null);
    await expect(
      service.create({
        enrollmentId: "enroll-uuid",
        evaluationId: "invalid-eval-uuid",
        value: 9.5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should throw error if evaluation does not belong to the same class as the enrollment", async () => {
    repository.exists.mockResolvedValue(false);
    enrollmentRepository.findById.mockResolvedValue({
      id: "enroll-uuid",
      classId: "class-uuid-1",
    });
    evaluationRepository.findById.mockResolvedValue({
      id: "eval-uuid",
      classId: "class-uuid-2",
    });
    await expect(
      service.create({
        enrollmentId: "enroll-uuid",
        evaluationId: "eval-uuid",
        value: 9.5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // =========================
  // UPDATE
  // =========================
  it("should update a grade successfully", async () => {
    repository.findById.mockResolvedValue(gradeEntity);
    repository.update.mockResolvedValue({
      ...gradeEntity,
      value: 8.0,
    });

    const result = await service.update("uuid", { value: 8.0 });

    expect(repository.update).toHaveBeenCalledOnce();
    expect(result.value).toBe(8.0);
  });

  it("should throw error if grade to update does not exist", async () => {
    repository.findById.mockResolvedValue(null);

    await expect(
      service.update("invalid-uuid", { value: 8.0 }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // =========================
  // LIST BY ENROLLMENT
  // =========================
  it("should list grades by enrollment", async () => {
    repository.findByEnrollment.mockResolvedValue([gradeEntity]);

    const result = await service.listByEnrollment("enroll-uuid");

    expect(repository.findByEnrollment).toHaveBeenCalledOnce();
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("enrollment.id", "enroll-uuid");
  });

  // =========================
  // LIST BY EVALUATION
  // =========================
  it("should list grades by evaluation", async () => {
    repository.findByEvaluation.mockResolvedValue([gradeEntity]);

    const result = await service.listByEvaluation("eval-uuid");

    expect(repository.findByEvaluation).toHaveBeenCalledOnce();
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("evaluation.id", "eval-uuid");
  });

  // =========================
  // LIST ALL
  // =========================
  it("should list all grades", async () => {
    repository.findAll.mockResolvedValue([gradeEntity]);

    const result = await service.listAll();

    expect(repository.findAll).toHaveBeenCalledOnce();
    expect(result).toHaveLength(1);
  });

  // =========================
  // GET BY ID
  // =========================
  it("should get grade by id", async () => {
    repository.findById.mockResolvedValue(gradeEntity);

    const result = await service.getById("uuid");

    expect(repository.findById).toHaveBeenCalledOnce();
    expect(result).toHaveProperty("id", "uuid");
  });

  it("should throw error if grade not found by id", async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.getById("invalid-uuid")).rejects.toBeInstanceOf(
      AppError,
    );
  });

  // =========================
  // DELETE
  // =========================
  it("should delete a grade successfully", async () => {
    repository.findById.mockResolvedValue(gradeEntity);
    repository.delete.mockResolvedValue();

    await service.delete("uuid");

    expect(repository.delete).toHaveBeenCalledOnce();
  });

  it("should throw error if grade to delete does not exist", async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.delete("invalid-uuid")).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
