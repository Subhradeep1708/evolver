import { TeacherAddForm } from "@/components/forms/TeacherAddForm";
import apiRoutes from "@/lib/routes";
import { TeacherFormTypes } from "@/types/form-types";
import axios from "axios";
import React from "react";

const EditTeacherPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    console.log("EditTeacher ID:", id);
    let teacherData: TeacherFormTypes | null = null;
    try {
        const res = await axios.get(`${apiRoutes.getTeacher}/${id}`);
        if (res.status === 200) {
            console.log("Teacher Data:", res.data);
            const teacher = res.data.data;
             teacherData = {
                id: teacher.id,
                user: {
                    firstName: teacher.user.firstName,
                    middleName: teacher.user.middleName,
                    lastName: teacher.user.lastName,
                    email: teacher.user.email,
                },
                subjects: teacher.subjects.map((subject: any) => ({
                    id: subject.id,
                    subject: {
                        name: subject.subject.name,
                    },
                })),
            };
        } else {
            console.error("Error fetching teacher");
        }
    } catch (error) {
        console.error("Error fetching teacher:", error);
    }
    return (
        <div>
            {teacherData ? (
                <TeacherAddForm />
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>
            )}
        </div>
    );
};

export default EditTeacherPage;
