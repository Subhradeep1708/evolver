// import db from "./db/db.js";
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import subjectRouter from "./routes/subject.route.js";
import examRouter from "./routes/exam.route.js";
import answerRouter from "./routes/answer.route.js";
import resultRouter from "./routes/result.route.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    methods:["GET","PUT","POST","PATCH","DELETE"],
    credentials:true,
}))
// Routes

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api/subject", subjectRouter);
app.use("/api/exam", examRouter);

app.use("/api/answer", answerRouter);

app.use("/api/result", resultRouter);

app.listen(5000, () => {
    console.log("app is listening");
});
