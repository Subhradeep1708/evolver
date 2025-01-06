import { Router } from "express";
import {
    loginStudent,
    loginTeacher,
    logout,
    registerStudent,
    registerTeacher,
} from "../controllers/auth.controller.js";

// route for login
const authRouter = Router();

authRouter.post("/student/login", loginStudent);
authRouter.post("/teacher/login", loginTeacher);

authRouter.post("/student/register", registerStudent);
authRouter.post("/teacher/register", registerTeacher);

authRouter.get("/logout/:userId", logout);

export default authRouter;
