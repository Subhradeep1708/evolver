import { Router } from "express";
import { getExamResults } from "../controllers/result.controller.js";

const resultRouter = Router();

resultRouter.get("/:examId", getExamResults);

export default resultRouter;
