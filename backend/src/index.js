import db from "./db/db.js";
import express from "express";
import dotenv from "dotenv";

console.log("Hello, world!");

dotenv.config();
const app = express();
app.use("/api/auth",)

app.listen(5000, () => {
    console.log("app is listening");
});

