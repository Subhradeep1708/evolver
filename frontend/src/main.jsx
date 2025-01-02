import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import StudentLogin from "./pages/auth/StudentLogin.jsx";
import TeacherLogin from "./pages/auth/TeacherLogin.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import StudentForm from "./components/forms/StudentForm.jsx";
import TeacherForm from "./components/forms/TeacherForm.jsx";
import SubjectForm from "./components/forms/SubjectForm.jsx";
import ExamForm from "./components/forms/ExamForm.jsx";
import McqForm from "./components/forms/McqForm.jsx";
import ExamLayout from "./layout/ExamLayout.jsx";
import ExamPanel from "./pages/student/exam/ExamPanel.jsx";
import StartExam from "./pages/student/exam/StartExam.jsx";
import Dashboard from "./components/students/Dashboard.jsx";
import Welcome from "./components/Welcome.jsx";
import { UserProvider } from "./contexts/userContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserProvider>
        <BrowserRouter>
            <Provider>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="auth" element={<AuthLayout />}>
                        <Route path="student" element={<StudentLogin />} />
                        <Route path="teacher" element={<TeacherLogin />} />
                    </Route>
                    <Route path="/" element={<MainLayout />}>
                        {/* exams */}
                        <Route path="dashboard" element={<Dashboard />}></Route>
                        {/* Add Student */}
                        <Route path="student/add" element={<StudentForm />} />
                        <Route
                            path="teacher/add"
                            element={<TeacherForm />}
                        ></Route>
                        <Route
                            path="subject/add"
                            element={<SubjectForm />}
                        ></Route>
                        {/*  */}
                        <Route path="exam/add" element={<ExamForm />}></Route>
                        <Route
                            path="/exam/:examId/mcq"
                            element={<McqForm />}
                        ></Route>
                    </Route>
                    <Route path="start" element={<ExamLayout />}>
                        <Route index element={<StartExam />} />
                        <Route path="exam/:examId" element={<ExamPanel />} />
                    </Route>
                </Routes>
            </Provider>
        </BrowserRouter>
        </UserProvider>
    </StrictMode>
);
