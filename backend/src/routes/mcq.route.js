import { Router } from "express";
import { addMcqBulk } from "../controllers/mcq.controller.js";

const mcqRouter = Router();

mcqRouter.post("/", addMcqBulk);

export default mcqRouter;
