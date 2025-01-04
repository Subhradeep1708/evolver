import { Router } from "express";
import {
    getExamResults,
    getResultsByStudentId,
} from "../controllers/result.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
    checkControllerPermission,
    checkStudentPermission,
} from "../middlewares/permissions.middleware.js";

const resultRouter = Router();

resultRouter.get("/:examId", getExamResults);
resultRouter.get(
    "/student/:studentId",
    isAuthenticated,
    checkStudentPermission,
    getResultsByStudentId
);

export default resultRouter;
