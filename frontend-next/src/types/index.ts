export type Role = "controller" | "teacher" | "student";
export interface User {
    id: number;
    firstName: string;
    middleName?: string | null;
    lastName: string;
    password: string;
    email: string;
    role: Role;
    createdAt: string; // ISO Date string
    updatedAt: string;
    accessToken?: string | null;
    refreshToekn?: string | null;
    teacher?: Teacher | null;
    student?: Student | null;
}
export interface Teacher {
    id: number;
    isController: boolean;
    createdAt: string;
    updatedAt: string;
    user?: User;
    subjects?: TeacherSubject[];
    exams?: Exam[];
}
export interface Subject {
    id: number;
    name: string;
    description?: string | null;
    teachers?: TeacherSubject[];
    exams?: Exam[];
}
export interface TeacherSubject {
    teacherId: number;
    subjectId: number;
    teacher?: Teacher;
    subject?: Subject;
}
export interface Student {
    id: number;
    rollNo: string;
    createdAt: string;
    updatedAt: string;
    user?: User;
    results?: Result[];
    answers?: Answer[];
}
export interface Exam {
    id: number;
    name: string;
    totalMarks: number;
    subjectId?: number | null;
    addedBy: number;
    createdAt: string;
    updatedAt: string;
    subject?: Subject | null;
    teacher?: Teacher;
    mcqs?: MCQ[];
    results?: Result[];
}
export interface MCQ {
    id: number;
    examId: number;
    questionBody: string;
    questionBodyImage?: string | null;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    point: number;
    answer: string; // A, B, C, D
    createdAt: string;
    updatedAt: string;
    exam?: Exam;
    answers?: Answer[];
}
export interface Result {
    id: number;
    studentId: number;
    examId: number;
    submittedAt: string;
    totalMarks: number;
    createdAt: string;
    updatedAt: string;
    student?: Student;
    exam?: Exam;
}
export interface Answer {
    id: number;
    studentId: number;
    mcqId: number;
    selected: string; // A/B/C/D
    isCorrect: boolean;
    createdAt: string;
    student?: Student;
    mcq?: MCQ;
}
