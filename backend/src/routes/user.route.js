import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkStudentPermission } from "../middlewares/permissions.middleware.js";
import { getExamByTeacherId } from "../controllers/exam.controller.js";

const userRouter = Router();

userRouter.get("/student/:studentId", isAuthenticated, checkStudentPermission, getExamByStudentId);

userRouter.get("/teacher/:teacherId", isAuthenticated,checkTeacherPermission, getExamByTeacherId);