import { describe, it, expect, beforeEach, vi } from "vitest";
import { AppError } from "../../../shared/errors/appError.js";
import { EvaluationService } from "../evaluation.service.js";

describe("EvaluationService", () => {
    let service: any;
    let repository: any;
    let classRepository: any;

    const evaluationEntity = {
        id: "uuid",
        type: "AV2",
        classId: "class-uuid",
        description: "Second evaluation",
        weight: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    beforeEach(() => {
        repository = {
            findById: vi.fn(),
            create: vi.fn(),
            findAll: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        };

        classRepository = {
            findById: vi.fn(),
            exists: vi.fn(),
        }

        service = new EvaluationService(repository, classRepository);
        vi.clearAllMocks();
    });

    // =========================
    // CREATE
    // =========================
    it("should create an evaluation", async () => {
        classRepository.exists.mockResolvedValue(true);
        repository.create.mockResolvedValue(evaluationEntity);

        const result = await service.create({
            type: "AV2",
            classId: "class-uuid",
            description: "Second evaluation",
            weight: 6,
        });

        expect(repository.create).toHaveBeenCalledOnce();
        expect(result).toHaveProperty("id");
        expect(result.type).toBe("AV2");
    });

    it("should throw error if class does not exist when creating evaluation", async () => {
        classRepository.findById.mockResolvedValue(null);

        await expect(
            service.create({
                type: "AV1",
                classId: "invalid-class-uuid",
                description: "First evaluation",
                weight: 5,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    
    // Additional tests for list, get, update, delete can be added here
    it("should list all evaluations", async () => {
        repository.findAll.mockResolvedValue([evaluationEntity]);

        const result = await service.listAll();

        expect(repository.findAll).toHaveBeenCalledOnce();
        expect(result).toHaveLength(1);
    });

    it("should get evaluation by id", async () => {
        repository.findById.mockResolvedValue(evaluationEntity);

        const result = await service.getById("uuid");

        expect(repository.findById).toHaveBeenCalledOnce();
        expect(result).toHaveProperty("id", "uuid");
    });

    it("should throw error if evaluation not found by id", async () => {
        repository.findById.mockResolvedValue(null);

        await expect(service.getById("invalid-uuid")).rejects.toBeInstanceOf(
            AppError,
        );
    });

    it("should update an evaluation", async () => {
        repository.findById.mockResolvedValue(evaluationEntity);
        repository.update.mockResolvedValue({
            ...evaluationEntity,
            description: "Updated description",
        });

        const result = await service.update("uuid", {
            description: "Updated description",
        });

        expect(repository.findById).toHaveBeenCalledOnce();
        expect(repository.update).toHaveBeenCalledOnce();
        expect(result.description).toBe("Updated description");
    });

    it("should delete an evaluation", async () => {
        repository.findById.mockResolvedValue(evaluationEntity);
        repository.delete.mockResolvedValue();

        await service.delete("uuid");

        expect(repository.findById).toHaveBeenCalledOnce();
        expect(repository.delete).toHaveBeenCalledOnce();
    });

    it("should throw error if evaluation to delete does not exist", async () => {
        repository.findById.mockResolvedValue(null);

        await expect(service.delete("invalid-uuid")).rejects.toBeInstanceOf(
            AppError,
        );
    });
})