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
import Welcome from "./components/Welcome.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import LandingLayout from "./layout/LandingLayout.jsx";
import Faq from "./pages/Landing/Faq.jsx";
import About from "./pages/Landing/About.jsx";
import Contact from "./pages/Landing/Contact.jsx";
import Dashboard from "./pages/common/dashboard/Dashboard.jsx";
import MyResults from "./pages/student/MyResults.jsx";
import CreateExam from "./pages/teacher/CreateExam.jsx";
import ExamResults from "./pages/teacher/ExamResults.jsx";

function App() {
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
                        <Route path="student/add" element={<StudentForm />} />
                        <Route
                            path="teacher/add"
                            element={<TeacherForm />}
                        ></Route>
                        <Route
                            path="subject/add"
                            element={<SubjectForm />}
                        ></Route>
                        <Route path="student" element={<StudentForm />} />
                        <Route path="teacher" element={<TeacherForm />}></Route>
                        <Route path="subject" element={<SubjectForm />}></Route>

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
