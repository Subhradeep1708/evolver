import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkTeacherPermission } from "../middlewares/permissions.middleware.js";
import {
    createExam,
    getAllExams,
    getExamById,
} from "../controllers/exam.controller.js";

const examRouter = Router();

examRouter.post(
    "/",
    // isAuthenticated,
    //  checkTeacherPermission,
    createExam
);

examRouter.get(
    "/",
    // isAuthenticated,
    // checkTeacherPermission,
    getAllExams
);

examRouter.get(
    "/:id",
    // isAuthenticated,
    getExamById
);

export default examRouter;
