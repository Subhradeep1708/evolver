import db from "./db/db.js";
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";

console.log("Hello, world!");
dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(5000, () => {
    console.log("app is listening");
});
