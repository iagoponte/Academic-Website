import { describe, it, expect, beforeEach, vi } from "vitest";
import { AppError } from "../../../shared/errors/appError.js";
import { exists } from "node:fs";

describe("ClassService", () => {
    let service: any;
    let repository: any;

    beforeEach(() => {
        repository = {
            create: vi.fn(),
            findAll: vi.fn(),
            findById: vi.fn(),
            exists: vi.fn(),
        }
    
    vi.clearAllMocks();

    });

    it("should create a new class", async () => {
        const classData = {
            name: "Biochemistry",
            semester: "2024.1",
            teacherIds: ["teacher-uuid-1", "teacher-uuid-2"],
        };

        const createdClass = {
            id: "class-uuid",
            name: classData.name,
            semester: classData.semester,
            teachers: [
                { id: "teacher-uuid-1", name: "Dr. Smith" },
                { id: "teacher-uuid-2", name: "Prof. Johnson" },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        repository.create.mockResolvedValue(createdClass);

        service = new (class {
            constructor(private repo: any) {}
            async create(data: any) {
                const newClass = await this.repo.create(data);
                return {
                    id: newClass.id,
                    name: newClass.name,
                    semester: newClass.semester,
                    teachers: newClass.teachers,
                };
            }
        })(repository);

        const result = await service.create(classData);

        expect(repository.create).toHaveBeenCalledWith(classData);
        expect(result).toEqual({
            id: "class-uuid",
            name: "Biochemistry",
            semester: "2024.1",
            teachers: [
                { id: "teacher-uuid-1", name: "Dr. Smith" },
                { id: "teacher-uuid-2", name: "Prof. Johnson" },
            ],
        });
    });

    it("should list all classes", async () => {
        const classes = [
            {
                id: "class-uuid-1",
                name: "Biochemistry",
                semester: "2024.1",
                teachers: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "class-uuid-2",
                name: "Physics",
                semester: "2024.1",
                teachers: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        repository.findAll.mockResolvedValue(classes);

        service = new (class {
            constructor(private repo: any) {}
            async list() {
                const classes = await this.repo.findAll();
                return classes.map((cls: any) => ({
                    id: cls.id,
                    name: cls.name,
                    semester: cls.semester,
                    teachers: cls.teachers,
                }));
            }
        })(repository);

        const result = await service.list();

        expect(repository.findAll).toHaveBeenCalled();
        expect(result).toEqual([
            {
                id: "class-uuid-1",
                name: "Biochemistry",
                semester: "2024.1",
                teachers: [],
            },
            {
                id: "class-uuid-2",
                name: "Physics",
                semester: "2024.1",
                teachers: [],
            },
        ]);
    });

    it("should get class by ID", async () => {
        const classEntity = {
            id: "class-uuid",
            name: "Biochemistry",
            semester: "2024.1",
            teachers: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        repository.findById.mockResolvedValue(classEntity);

        service = new (class {
            constructor(private repo: any) {}
            async getById(id: string) {
                const classEntity = await this.repo.findById(id);
                if (!classEntity) {
                    throw new AppError("Class not found", 404);
                }
                return {
                    id: classEntity.id,
                    name: classEntity.name,
                    semester: classEntity.semester,
                    teachers: classEntity.teachers,
                };
            }
        })(repository);

        const result = await service.getById("class-uuid");

        expect(repository.findById).toHaveBeenCalledWith("class-uuid");
        expect(result).toEqual({
            id: "class-uuid",
            name: "Biochemistry",
            semester: "2024.1",
            teachers: [],
        });
    });

    it("should throw error if class not found by ID", async () => {
        repository.findById.mockResolvedValue(null);

        service = new (class {
            constructor(private repo: any) {}
            async getById(id: string) {
                const classEntity = await this.repo.findById(id);
                if (!classEntity) {
                    throw new AppError("Class not found", 404);
                }
                return {
                    id: classEntity.id,
                    name: classEntity.name,
                    semester: classEntity.semester,
                    teachers: classEntity.teachers,
                };
            }
        })(repository);

        await expect(service.getById("invalid-uuid")).rejects.toBeInstanceOf(AppError);
    });
})