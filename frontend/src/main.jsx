import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { Provider } from "./components/ui/provider.jsx";
import ExamPanel from "./layout/ExamLayout.jsx";
import TeacherLogin from "./pages/auth/TeacherLogin.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// createRoot(document.getElementById("root")).render(
//     <StrictMode>
//         <Provider>
//             <App />
//         </Provider>
//     </StrictMode>
// );

createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ExamPanel />} />
            <Route path="/dashboard" element={<TeacherLogin />} />
        </Routes>
    </BrowserRouter>
);
