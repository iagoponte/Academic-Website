// import type { Role } from "../../infraestructure/generated/prisma/enums.js";

export enum Role{
    Student = 'Student',
    Teacher = 'Teacher',
    Administrator = 'Administrator',
    Coordinator = 'Coordinator',
    Director = 'Director'
}
export interface User {
    id: string;
    email: string;
    password: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
} 