import { Router } from "express";
import { login, registerStudent, registerTeacher } from "../controllers/auth.controller.js";

// route for login
const authRouter = Router();
authRouter.post("/student/login", login ); //TODO: login for student and teacher

// authRouter.post("/teacher/login", login ); // TODO

authRouter.post("/student/register", registerStudent );
authRouter.post("/teacher/register", registerTeacher );

export default authRouter;