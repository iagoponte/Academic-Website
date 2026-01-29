export interface Teacher {
    id: string;
    userId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    user?: {
        email: string;
    }
}