import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
    checkStudentPermission,
    checkTeacherPermission,
} from "../middlewares/permissions.middleware.js";

import {
    getAllStudent,
    getAllTeacher,
    getStudentData,
    editStudentById,
    getTeacherData,
    editTeacherById,
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
    // isAuthenticated,
    // checkTeacherPermission,
    getTeacherData
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

userRouter.put(
    "/teacher/:teacherId",
    // isAuthenticated,
    // checkTeacherPermission,
    editTeacherById
)

export default userRouter;
