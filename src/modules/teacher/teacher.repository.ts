import { prisma } from "../../infraestructure/prisma/client.js";
import type { Teacher } from "./teacher.entity.js";
// import { Prisma } from "../../../generated/prisma/client.js";
import type { Prisma } from "../../infraestructure/generated/prisma/client.js";
import type { CreateTeacherDTO, UpdateTeacherDTO } from "./teacher.dto.js";

export class teacherRepository {
    findById(id: string): Promise<Teacher | null> {
        return prisma.teacher.findUnique({where: {id}})
    }

    findByEmail(email: string): Promise<Teacher | null> {
        return prisma.teacher.findUnique({where: {email}})
    }

    findAll(): Promise<Teacher[]> {
        return prisma.teacher.findMany();
    }

    create(data: CreateTeacherDTO): Promise<Teacher> {
        return prisma.teacher.create({ data })
    }

    update(id: string, data: UpdateTeacherDTO): Promise<Teacher> {
        return prisma.teacher.update({where: {id}, data})
    }

    delete(id: string): Promise<Teacher> {
        return prisma.teacher.delete({where: {id}})
    }
}