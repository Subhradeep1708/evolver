export type SubjectFormTypes = {
  id: number;
  name: string;
  description: string;
};

export type StudentFormTypes = {
  id: number | string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  rollNo: string;
};
