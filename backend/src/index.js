import db from "./db/db.js";
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
// const cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
import subjectRouter from "./routes/subject.route.js";

// console.log("Hello, world!");
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api/subject", subjectRouter);

app.listen(5000, () => {
    console.log("app is listening");
});
