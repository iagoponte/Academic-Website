import { describe, it, expect, beforeEach, vi } from "vitest";
import { ClassTeacherService } from "../classTeacher.service.js";
import { AppError } from "../../../shared/errors/appError.js";

describe("ClassTeacherService", () => {
  let service: any;
  let repository: any;
  let teacherRepository: any;
  let classRepository: any;

  beforeEach(() => {
    repository = {
      assign: vi.fn(),
      unassign: vi.fn(),
      exists: vi.fn(),
    };

    classRepository = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      exists: vi.fn(),
    };

    teacherRepository = {
      findById: vi.fn(),
      findUserByEmail: vi.fn(), 
      findByEmail: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    }

    service = new ClassTeacherService(repository, classRepository, teacherRepository);
    vi.clearAllMocks();
  });

  it("should assign a teacher to a class", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };

    classRepository.exists.mockResolvedValue(true);
    teacherRepository.findById.mockResolvedValue(true);
    repository.exists.mockResolvedValue(false);

    await service.assign(data);

    expect(repository.exists).toHaveBeenCalledWith(data.classId, data.teacherId);
    expect(classRepository.exists).toHaveBeenCalledWith("class1");
    expect(teacherRepository.findById).toHaveBeenCalledWith("teacher1");
    expect(repository.assign).toHaveBeenCalledWith(data);
  });

  it("should not assign if already assigned", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };
    classRepository.exists.mockResolvedValue(true);
    teacherRepository.findById.mockResolvedValue(true);
    repository.exists.mockResolvedValue(true);

    await expect(service.assign(data)).rejects.toBeInstanceOf(AppError);

    expect(repository.assign).not.toHaveBeenCalled();
  });

  it("should throw if class does not exist", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };

    classRepository.exists.mockResolvedValue(false);
    repository.exists.mockResolvedValue(false);

    await expect(service.assign(data)).rejects.toMatchObject({
      statusCode: 404,
    });

    expect(repository.assign).not.toHaveBeenCalled();
  });

  it("should unassign a teacher from a class", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };

    repository.exists.mockResolvedValue(true);

    await service.unassign(data);

    expect(repository.unassign).toHaveBeenCalledWith(data);
  });
});
