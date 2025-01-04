import App from "./App.jsx";
import { StrictMode } from "react";
import { UserProvider } from "./contexts/userContext.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </StrictMode>
);
