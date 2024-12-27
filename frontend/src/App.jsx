// import { useState } from "react";
import { Box } from "@chakra-ui/react";
import ExamLayout from "./layout/ExamLayout";
import "./app.css";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import StudentLogin from "./pages/auth/StudentLogin";
function App() {
    return (
        <Box background="bg.muted">
            {/* <ExamLayout /> */}
            {/* <MainLayout>
                bantu
            </MainLayout> */}
            <AuthLayout>
                <StudentLogin />
            </AuthLayout>
        </Box>
    );
}

export default App;
