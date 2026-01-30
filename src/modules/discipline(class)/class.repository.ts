import { prisma } from "../../infraestructure/prisma/client.js";
import type { CreateClassDTO } from "./class.dto.js";
import type { ClassEntity } from "./class.entity.js";
import { ClassMapper } from "./class.mapper.js";


const classSelect = {
    id: true,
    name: true,
    semester: true,
    createdAt: true,
    teachers: {
        select: {
            teacher: {
                select: {
                    id: true,
                    name: true,
                    // O email está no User!
                    user: {
                        select: { email: true }
                    }
                }
            }
        }
    }
};

export class ClassRepository {

    async create(data: CreateClassDTO): Promise<ClassEntity> {
        const prismaClass = await prisma.class.create({
            data: {
                name: data.name,
                semester: data.semester,
                ...(data.teacherIds && {
                    teachers: {
                        create: data.teacherIds.map(teacherId => ({
                            teacher: { connect: { id: teacherId } },
                        })),
                    },
                }),
            },
            select: classSelect,
        });
        return ClassMapper.toDomain(prismaClass as any); // Cast seguro devido à complexidade do select
    }

    async findAll(): Promise<ClassEntity[]> {
        const prismaClasses = await prisma.class.findMany({
            select: classSelect,
            orderBy: { createdAt: 'desc' },
        });
        // OBS: Usamos 'as any' aqui momentaneamente pois o tipo inferido do Select 
        // profundo do Prisma às vezes confunde o TS, mas a estrutura bate com o Mapper.
        return prismaClasses.map(c => ClassMapper.toDomain(c as any));
    }

    async findById(id: string): Promise<ClassEntity | null> {
        const prismaClass = await prisma.class.findUnique({
            where: { id },
            select: classSelect,
        });

        if (!prismaClass) return null;

        return ClassMapper.toDomain(prismaClass as any);
    }

    async exists(id: string): Promise<boolean> {
        const classEntity = await prisma.class.findUnique({
            where: { id },
            select: { id: true },
        });
        return Boolean(classEntity);
    }
}
