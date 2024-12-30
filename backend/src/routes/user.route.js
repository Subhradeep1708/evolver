import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
    checkStudentPermission,
    checkTeacherPermission,
} from "../middlewares/permissions.middleware.js";
import {
    getExamByStudentId,
    getExamByTeacherId,
} from "../controllers/exam.controller.js";

const userRouter = Router();

userRouter.get(
    "/student/:studentId",
    isAuthenticated,
    checkTeacherPermission,
    (req, res) => {
        res.send("Hello, world!");
    }
);

userRouter.get(
    "/teacher/:teacherId",
    isAuthenticated,
    checkTeacherPermission,
    getExamByTeacherId
);

export default userRouter;
