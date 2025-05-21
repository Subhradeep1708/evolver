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
import {
    getAllStudent,
    getAllTeacher,
    getStudentData,
    editStudentById,
} from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.put(
    "/student/:studentId",
    // isAuthenticated,
    // checkStudentPermission,
    editStudentById
);
userRouter.get(
    "/student/:studentId",
    // isAuthenticated,
    // checkTeacherPermission,
    getStudentData
);

userRouter.get(
    "/teacher/:teacherId",
    isAuthenticated,
    checkTeacherPermission,
    getExamByTeacherId
);
userRouter.get(
    "/student",
    // isAuthenticated,
    // checkTeacherPermission,
    getAllStudent
);

userRouter.get(
    "/teacher",
    // isAuthenticated,
    getAllTeacher
);

export default userRouter;
