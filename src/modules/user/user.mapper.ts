import type { UserResponseDTO } from "./user.dtos.js";
import type { User } from "./user.entity.js";
import { Role as PrismaRole } from "../../infraestructure/generated/prisma/enums.js";
import { Role as DomainRole } from "./user.entity.js";

export class UserMapper {
    static toResponse(user: User): UserResponseDTO {
        return {
            id: user.id,
            email: user.email,
            roles: user.roles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}

export function mapRolesToDomain(
    roles: PrismaRole[]
): DomainRole[] {
    return roles.map(role => role as DomainRole)
}