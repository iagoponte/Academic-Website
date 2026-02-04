import { describe, it, expect, beforeEach, vi } from "vitest";
import { AppError } from "../../../shared/errors/appError.js";
import { ReportCardService } from "../reportCard.service.js";

describe("ReportCardService", () => {
  let service: ReportCardService;
  let repository: any;

  let enrollmentRepository: any;
  let gradeRepository: any;
  let evaluationRepository: any;

  const reportCardEntity = {
    id: "uuid",
    studentId: "student-uuid",
    semester: "2023.1",
    grades: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    enrollmentRepository = {
      findById: vi.fn(),
    };

    gradeRepository = {
      findByEnrollment: vi.fn(),
    };

    evaluationRepository = {
      findByClass: vi.fn(),
    };

    service = new ReportCardService(
      enrollmentRepository,
      gradeRepository,
      evaluationRepository,
    );

    vi.clearAllMocks();
  });

  it("should throw error if enrollment does not exist", async () => {
    enrollmentRepository.findById.mockResolvedValue(null);
    await expect(service.generate("invalid-id")).rejects.toBeInstanceOf(
      AppError,
    );
    await expect(service.generate("invalid-id")).rejects.toMatchObject({
      statusCode: 404,
    });
  });

  it("should generate report card successfully", async () => {
    enrollmentRepository.findById.mockResolvedValue({
      id: "enroll-1",
      student: { name: "João", registrationNumber: "123" },
      class: { name: "Matemática", semester: "2023.1" },
    });

    evaluationRepository.findByClass.mockResolvedValue([
      { id: "eval-1", type: "EXAM", weight: 2 },
    ]);

    gradeRepository.findByEnrollment.mockResolvedValue([
      { evaluation: {
        id: 'eval-1'},
        weight: 8
      },
    ]);

    const result = await service.generate("enroll-1");

    expect(result.student.name).toBe("João");
    expect(result.evaluations.length).toBe(1);
    expect(result.average).toBeDefined();
  });
});
