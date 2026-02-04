export interface ClassEntity {
    id: string;
    name: string;
    semester: string;
    createdAt: Date;
    
    teachers?: {
        id: string;
        name: string;
        email: string;
    }[];
}