import { StudentRepository } from "./student.repository.js";
import type {
    CorrectStudentRegistrationDTO,
    CreateStudentDTO,
    StudentResponseDTO,
    UpdateStudentDTO,
} from "./student.dto.js";
import { AppError } from "../../shared/errors/appError.js";
import { StudentMapper } from "./student.mapper.js";

export class StudentService {
    constructor(private readonly repository: StudentRepository) {}
        async create(dto: CreateStudentDTO): Promise<StudentResponseDTO> {
            const exists = await this.repository.findByRegistrationNumber(
                dto.registrationNumber,
            );
            if (exists) {
                throw new AppError('RA already exists', 409);
            }
            const newStudent = await this.repository.create(dto);
            return StudentMapper.toResponse(newStudent)
        };

        async list(): Promise<StudentResponseDTO[]> {
            const students = await this.repository.findAll();
            return students.map(StudentMapper.toResponse);
        }

        async getById(id: string): Promise<StudentResponseDTO> {
            const student = await this.repository.findById(id);
            if(!student) {
                throw new AppError('Student not found', 404);
            }
            return StudentMapper.toResponse(student);
        }

        async update(id: string, dto: UpdateStudentDTO): Promise<StudentResponseDTO> {
            await this.getById(id);
            const updatedStudent = await this.repository.update(id, dto);
            return StudentMapper.toResponse(updatedStudent);
        }

        async inactivate(id: string): Promise<StudentResponseDTO> {
            const student = await this.getById(id);

            if (student.status === 'INACTIVE') {
                throw new AppError('Student already inactive', 400);
            }
            return StudentMapper.toResponse(await this.repository.update(id, { isActive: false }));
        }


        async correctRegistration(id: string, dto: CorrectStudentRegistrationDTO): Promise<StudentResponseDTO> {
            if (!dto.reason.trim()) {
                throw new AppError('Reason is required', 400);
            }
            const exists = await this.repository.findByRegistrationNumber(
                dto.newRegistrationNumber,
            );
            if (exists) {
                throw new AppError('New registration number already exists', 400);
            }
            await this.getById(id);
            const studentCorrectedRegis = await this.repository.update(id, {
                registrationNumber: dto.newRegistrationNumber,
            });
            return StudentMapper.toResponse(studentCorrectedRegis);
        }
}