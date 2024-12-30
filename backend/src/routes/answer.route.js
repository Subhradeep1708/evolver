import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkStudentPermission } from "../middlewares/permissions.middleware.js";
import { submitAnswer } from "../controllers/answer.controller.js";

const answerRouter = Router();

answerRouter.post(
    "/submit",
    isAuthenticated,
    checkStudentPermission,
    submitAnswer
);

export default answerRouter;
