import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkControllerPermission } from "../middlewares/permissions.middleware.js";
import {
    addSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
} from "../controllers/subject.controller.js";

const subjectRouter = Router();

subjectRouter.post("/", 
    // isAuthenticated, checkControllerPermission,
     addSubject);

subjectRouter.get("/", getAllSubjects);

subjectRouter.get(
    "/:subjectId",
    // isAuthenticated,
    getSubjectById
);

subjectRouter.put(
    "/:subjectId",
    // isAuthenticated,
    // checkControllerPermission,
    updateSubject
);

export default subjectRouter;
