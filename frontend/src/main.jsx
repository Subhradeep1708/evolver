import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { Provider } from "./components/ui/provider.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import StudentLogin from "./pages/auth/StudentLogin.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Provider>
                <Routes>
                    <Route path="/" element={<App />} />
                    {/* <Route path="/auth">
                        <Route
                            index
                            path="/login/student"
                            element={<StudentLogin />}
                        />
                        <Route
                            path="/login/teacher"
                            element={<StudentLogin />}
                        />
                    </Route> */}
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
