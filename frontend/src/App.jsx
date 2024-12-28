// import { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import ExamLayout from "./layout/ExamLayout";
import "./app.css";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import StudentLogin from "./pages/auth/StudentLogin";
import TeacherLogin from "./pages/auth/TeacherLogin";
import SubjectCard from "./components/students/SubjectCard";
import ResultTable from "./components/students/ResultTable";
function App() {
    return (
        <Box background="bg.muted">
            {/* <ExamLayout /> */}
            <MainLayout>
                {/* <Grid
                    templateColumns="repeat(3, 1fr)"
                    gap={4}
                    // placeContent={"center"}
                    placeItems={"center"}
                    // justifyContent={"center"}
                    // alignItems={"center"}
                >
                    <SubjectCard />
                    <SubjectCard />
                    <SubjectCard />
                </Grid> */}

                <ResultTable />
            </MainLayout>
            {/* <AuthLayout> */}
            {/* <TeacherLogin/> */}
            {/* <StudentLogin/> */}
            {/* </AuthLayout> */}
        </Box>
    );
}

export default App;
