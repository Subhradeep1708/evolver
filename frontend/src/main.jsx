import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { Provider } from "./components/ui/provider.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import StudentLogin from "./pages/auth/StudentLogin.jsx";
import TeacherLogin from "./pages/auth/TeacherLogin.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import MainLayout from "./layout/MainLayout.jsx";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Provider>
                <Routes>
                    <Route path="/" element={<p>Welcome to Evolver</p>} />
                    <Route path="auth" element={<AuthLayout />}>
                        <Route path="student" element={<StudentLogin />} />
                        <Route path="teacher" element={<TeacherLogin />} />
                    </Route>
                    <Route path="/" element={<MainLayout />}>
                        {/* exams */}
                        <Route path="dashboard" element={<p>Hi</p>} />
                        {/*  */}
                    </Route>
                </Routes>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);

// createRoot(root).render(
//     <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<ExamPanel />} />
//             <Route path="/dashboard" element={<TeacherLogin />} />
//         </Routes>
//     </BrowserRouter>
// );
