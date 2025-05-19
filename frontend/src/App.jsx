import { Provider } from "./components/ui/provider.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import StudentLogin from "./pages/auth/StudentLogin.jsx";
import TeacherLogin from "./pages/auth/TeacherLogin.jsx";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import McqForm from "./components/forms/McqForm.jsx";
import ExamLayout from "./components/layout/ExamLayout.jsx";
import ExamPanel from "./pages/student/exam/ExamPanel.jsx";
import StartExam from "./pages/student/exam/StartExam.jsx";
import Welcome from "./components/shared/Welcome.jsx";
import LandingLayout from "./components/layout/LandingLayout.jsx";
import Faq from "./pages/Landing/Faq.jsx";
import About from "./pages/Landing/About.jsx";
import Contact from "./pages/Landing/Contact.jsx";
import Dashboard from "./pages/common/dashboard/Dashboard.jsx";
import MyResults from "./pages/student/MyResults.jsx";
import CreateExam from "./pages/teacher/CreateExam.jsx";
import ExamResults from "./pages/teacher/ExamResults.jsx";
import AddStudent from "./pages/teacher/controller/AddStudent.jsx";
import AddTeacher from "./pages/teacher/controller/AddTeacher.jsx";
import AddSubject from "./pages/teacher/controller/AddSubject.jsx";
import AllStudent from "./pages/teacher/controller/AllStudent.jsx";
import AllSubjects from "./pages/teacher/controller/AllSubjects.jsx";
import AllTeachers from "./pages/teacher/controller/AllTeachers.jsx";
import { useAppStore } from "./Store/index.js";
function App() {
    const user = useAppStore((state) => state.user);
    return (
        <BrowserRouter>
            <Provider>
                <Routes>
                    <Route path="/" element={<LandingLayout />}>
                        <Route index element={<Welcome />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="faq" element={<Faq />} />
                    </Route>
                    <Route path="auth" element={<AuthLayout />}>
                        <Route path="student" element={<StudentLogin />} />
                        <Route path="teacher" element={<TeacherLogin />} />
                    </Route>
                    <Route path="/" element={<MainLayout />}>
                        {/*Common  */}
                        <Route path="dashboard" element={<Dashboard />}></Route>
                        <Route
                            path="edit-profile"
                            element={<p>Edit Profile</p>}
                        ></Route>

                        {
                            // !Students
                            // *My Results
                        }

                        <Route
                            path="my-results"
                            element={<MyResults />}
                        ></Route>
                        {
                            //! Teacher and Controllers
                            // *Exams
                            // *Add Exam
                            // *Results
                        }
                        <Route path="exam/add" element={<CreateExam />}></Route>
                        <Route
                            path="exam-results"
                            element={<ExamResults />}
                        ></Route>
                        {
                            //! Controller Only
                            // *Add Student
                            // *Add Teacher
                            // *Add Subject
                            // *All Students
                            // *All Teachers
                            // *All Subjects Data
                            // *All Teachers Data
                            // *All Students Data
                        }
                        <Route path="student/add" element={<AddStudent />} />
                        <Route path="teacher/add" element={<AddTeacher />} />
                        <Route path="subject/add" element={<AddSubject />} />
                        <Route path="student/all" element={<AllStudent />} />
                        <Route path="teacher/all" element={<AllTeachers />} />
                        <Route path="subject/all" element={<AllSubjects />} />

                        {/*  */}

                        <Route
                            path="/exam/:examId/mcq"
                            element={<McqForm />}
                        ></Route>
                    </Route>
                    {/* Student Only - Exam Panel */}
                    <Route path="start" element={<ExamLayout />}>
                        <Route index element={<StartExam />} />
                        <Route path="exam/:examId" element={<ExamPanel />} />
                    </Route>
                </Routes>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
