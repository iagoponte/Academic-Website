import type { UserResponseDTO } from "./user.dtos.js";
import type { User } from "./user.entity.js";

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