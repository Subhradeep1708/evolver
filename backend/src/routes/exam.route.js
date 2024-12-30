import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkTeacherPermission } from "../middlewares/permissions.middleware.js";
import { createExam } from "../controllers/exam.controller.js";

const examRouter = Router();

examRouter.post("/", isAuthenticated, checkTeacherPermission, createExam);

export default examRouter;
