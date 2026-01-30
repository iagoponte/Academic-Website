import type { UserResponseDTO } from "./user.dtos.js";
import type { User, Role as DomainRole } from "./user.entity.js";
import type { User as PrismaUser, Role as PrismaRole } from "../../infraestructure/generated/prisma/client.js";

export class UserMapper {
    static toDomain(raw: PrismaUser): User {
        return {
            id: raw.id,
            email: raw.email,
            password: raw.password, 
            roles: raw.roles.map(role => role as unknown as DomainRole), 
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        };
    }

    
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