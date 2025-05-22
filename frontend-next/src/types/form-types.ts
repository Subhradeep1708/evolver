export type SubjectFormTypes = {
    id: number;
    name: string;
    description: string;
};

export type StudentFormTypes = {
    id: number | string;
    rollNo: string;
    user: {
        firstName: string;
        middleName?: string;
        lastName: string;
        email: string;
    };
};

export type TeacherFormTypes = {
    id: number | string;
    user: {
        firstName: string;
        middleName?: string;
        lastName: string;
        email: string;
    };
    subjects: {
        id: number | string;
        subject: {
            name: string;
        };
    }[];
};
