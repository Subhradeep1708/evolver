// import { useState } from "react";
import "./app.css";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import MainLayout from "./layout/MainLayout";
import SubjectForm from "./components/forms/SubjectForm";
import TeacherForm from "./components/forms/TeacherForm";
import StudentForm from "./components/forms/StudentForm";
import ExamForm from "./components/forms/ExamForm";
function App() {
    return (
        <Box background="bg.muted">
            {/* <ExamLayout /> */}
            <MainLayout>
                {/* <SubjectForm /> */}
                {/* <TeacherForm teacher={sampleTeacher} /> */}
                {/* <StudentForm /> */}
                <ExamForm />
            </MainLayout>
        </Box>
    );
}

export default App;

const sampleTeacher = {
    id: 1,
    firstName: "John",
    middleName: "",
    lastName: "Doe",
    email: "johdow@gmail.com",
    phone: "08012345678",
    address: "123, Lagos Street",
    subjects: [
        { id: 1, name: "Mathematics" },
        { id: 2, name: "English" },
    ],
};
