import { StudentAddForm } from "@/components/forms/StudentAddForm";
import apiRoutes from "@/lib/routes";
import { StudentFormTypes } from "@/types/form-types";
import axios from "axios";
import React from "react";

const EditStudentPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    console.log("EditStudent ID:", id);
    let studentData: StudentFormTypes | null = null;

    try {
        const res = await axios.get(`${apiRoutes.getStudent}/${id}`);
        if (res.status === 200) {
            console.log("Student Data:", res.data);
            const student = res.data.data;
            studentData = {
                id: student.id,
                user: {
                    firstName: student.user.firstName,
                    middleName: student.user.middleName,
                    lastName: student.user.lastName,
                    email: student.user.email,
                },
                rollNo: res.data.data.rollNo,
            };
        } else {
            console.error("Error fetching student");
        }
    } catch (error) {
        console.error("Error fetching student:", error);
    }

    return (
        <div>
            {studentData ? (
                <StudentAddForm student={studentData} />
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>
            )}
        </div>
    );
};

export default EditStudentPage;
