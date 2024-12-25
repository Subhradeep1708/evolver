import db from "./db/db.js";
import express from "express";
import dotenv from "dotenv";

console.log("Hello, world!");

const app = express();

dotenv.config();

app.listen(5000, () => {
    console.log("app is listening");
});

const testDB = async () => {
    try {
        await db.user.create({
            data: {
                email: "raktim@gmail.com",
                firstName: "Raktim",
                lastName: "Mitra",
                password: "123456",
                role: "student",
            },
        });

        const res = await db.user.findMany();
        console.log(res);

        console.log("database is listening");
    } catch (error) {
        console.log("This is error");

        console.log(error);
    }
};

testDB();
