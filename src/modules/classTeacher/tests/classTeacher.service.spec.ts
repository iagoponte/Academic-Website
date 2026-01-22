import { describe, it, expect, beforeEach, vi } from "vitest";
import { ClassTeacherService } from "../classTeacher.service.js";
import { exists } from "node:fs";
import { AppError } from "../../../shared/errors/appError.js";

describe("ClassTeacherService", () => {
  let service: any;
  let repository: any;

  beforeEach(() => {
    repository = {
      assign: vi.fn(),
      unassign: vi.fn(),
      AssignmentExists: vi.fn(),
      ClassExists: vi.fn(),
      TeacherExists: vi.fn(),
    };

    service = new ClassTeacherService(repository);
    vi.clearAllMocks();
  });

  it("should assign a teacher to a class", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };

    repository.AssignmentExists.mockResolvedValue(false);
    repository.ClassExists.mockResolvedValue(true);
    repository.TeacherExists.mockResolvedValue(true);

    await service.assign(data);

    expect(repository.AssignmentExists).toHaveBeenCalledWith(data);
    expect(repository.ClassExists).toHaveBeenCalledWith("class1");
    expect(repository.TeacherExists).toHaveBeenCalledWith("teacher1");
    expect(repository.assign).toHaveBeenCalledWith(data);
  });

  it("should not assign if already assigned", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };

    repository.AssignmentExists.mockResolvedValue(true);

    await expect(service.assign(data)).rejects.toBeInstanceOf(AppError);

    expect(repository.assign).not.toHaveBeenCalled();
  });

  it("should throw if class does not exist", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };

    repository.AssignmentExists.mockResolvedValue(false);
    repository.ClassExists.mockResolvedValue(false);

    await expect(service.assign(data)).rejects.toMatchObject({
      statusCode: 404,
    });

    expect(repository.assign).not.toHaveBeenCalled();
  });

  it("should unassign a teacher from a class", async () => {
    const data = { classId: "class1", teacherId: "teacher1" };

    repository.AssignmentExists.mockResolvedValue(true);

    await service.unassign(data);

    expect(repository.unassign).toHaveBeenCalledWith(data);
  });
});
