import { describe, it, expect, beforeEach, vi } from "vitest";
import { ClassTeacherService } from "../classTeacher.service.js";
import { AppError } from "../../../shared/errors/appError.js";

describe("ClassTeacherService", () => {
  let service: any;
  let repository: any;

  beforeEach(() => {
    repository = {
      assign: vi.fn(),
      unassign: vi.fn(),
      assignmentExists: vi.fn(),
      classExists: vi.fn(),
      teacherExists: vi.fn(),
    };

    service = new ClassTeacherService(repository);
    vi.clearAllMocks();
  });

  it("should assign a teacher to a class", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };

    repository.assignmentExists.mockResolvedValue(false);
    repository.classExists.mockResolvedValue(true);
    repository.teacherExists.mockResolvedValue(true);

    await service.assign(data);

    expect(repository.assignmentExists).toHaveBeenCalledWith(data);
    expect(repository.classExists).toHaveBeenCalledWith("class1");
    expect(repository.teacherExists).toHaveBeenCalledWith("teacher1");
    expect(repository.assign).toHaveBeenCalledWith(data);
  });

  it("should not assign if already assigned", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };

    repository.assignmentExists.mockResolvedValue(true);

    await expect(service.assign(data)).rejects.toBeInstanceOf(AppError);

    expect(repository.assign).not.toHaveBeenCalled();
  });

  it("should throw if class does not exist", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };

    repository.assignmentExists.mockResolvedValue(false);
    repository.classExists.mockResolvedValue(false);

    await expect(service.assign(data)).rejects.toMatchObject({
      statusCode: 404,
    });

    expect(repository.assign).not.toHaveBeenCalled();
  });

  it("should unassign a teacher from a class", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };

    repository.assignmentExists.mockResolvedValue(true);

    await service.unassign(data);

    expect(repository.unassign).toHaveBeenCalledWith(data);
  });
});
