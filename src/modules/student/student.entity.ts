export interface Student {
    id: string;
    userId: string;
    name: string;
    registrationNumber: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    
    user?: {
        email: string;
    };
}