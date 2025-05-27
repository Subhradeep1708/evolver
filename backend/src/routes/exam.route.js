import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkTeacherPermission } from "../middlewares/permissions.middleware.js";
import {
    createExam,
    getAllExams,
    getExamById,
    getExamByTeacherId,
    getNoOfQuestions
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

examRouter.get(
    "/teacher/:id",
    // isAuthenticated,
    // checkTeacherPermission,
    getExamByTeacherId
);
examRouter.get(
    "/noOfQuestions/:id",
    // isAuthenticated,
    // checkTeacherPermission,
   getNoOfQuestions
)
export default examRouter;
