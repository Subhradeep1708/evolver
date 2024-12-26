// import express from "express";
// import db from "../db/db.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import env from "../utils/env.js";

// const authRouter = express.Router();

// // /register
// authRouter.post("/register", async (req, res) => {
//     try {
//         /*
//          * 1. Get email, password, and role from the request body
//          * 2. Validate the email, password, and role
//          * 3. Check if the user already exists
//          * 4. Hash the password
//          * 5. Generate a refresh token
//          * 6. Insert the user into the database
//          * 7. Return a success response
//          */

//         const { email, password, role } = req.body;

//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "Email, password, and role are required",
//                 success: false,
//             });
//         }

//         if (password.length < 6) {
//             return res.status(400).json({
//                 message: "Password must be at least 6 characters",
//                 success: false,
//             });
//         }

//         const [existingUser] = await db.query(
//             "SELECT id FROM `users` WHERE email=?",
//             [email]
//         );

//         if (existingUser.length > 0) {
//             return res.status(400).json({
//                 message: "User already exists",
//                 success: false,
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const refreshToken = jwt.sign({ email }, env.auth.refreshTokenSecret);

//         const result = await db.query(
//             "INSERT INTO users (email, password, role, refresh_token) VALUES (?, ?, ?, ?)",
//             [email, hashedPassword, role, refreshToken]
//         );

//         return res.status(201).json({
//             message: "User registered successfully",
//             data: {
//                 id: result[0].insertId,
//                 email: email,
//                 role: role,
//                 refreshToken: refreshToken,
//             },
//             success: true,
//         });
//         console.log("User registered successfully");

//         //
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             data: null,
//             error: error,
//             success: false,
//         });
//     }
// });

// // /login
// authRouter.post("/login", async (req, res) => {
//     try {
//         /*
//          * 1. Get email, password, and role from the request body
//          * 2. Validate the email, password and role
//          * 3. Find the user by email
//          * 4. Check if the user exists
//          * 5. Check if the password is correct
//          * 6. Generate an access token
//          * 7. Generate a refresh token
//          * 8. Save the refresh token in the database
//          * 9. Send access and refresh tokens as cookies
//          * 10. Return a success response
//          */

//         const { email, password, role } = req.body;

//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "Email, password, and role are required",
//                 success: false,
//             });
//         }

//         const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
//             email,
//         ]);

//         if (user.length === 0) {
//             return res.status(401).json({
//                 message: "Invalid email",
//                 success: false,
//             });
//         }

//         const validPassword = await bcrypt.compare(password, user[0].password);
//         if (!validPassword) {
//             return res.status(401).json({
//                 message: "Incorrect password",
//                 success: false,
//             });
//         }

//         const accessToken = jwt.sign(
//             { id: user[0].id, role: user[0].role },
//             env.auth.accessTokenSecret,
//             { expiresIn: "1d" }
//         );

//         const refreshToken = jwt.sign(
//             { id: user[0].id, role: user[0].role },
//             env.auth.refreshTokenSecret,
//             { expiresIn: "15d" }
//         );

//         await db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [
//             refreshToken,
//             user[0].id,
//         ]);

//         res.cookie("accessToken", accessToken, {
//             httpOnly: true,
//             maxAge: 1 * 24 * 60 * 1000,
//         }); // 1 day
//         res.cookie("refreshToken", refreshToken, {
//             httpOnly: true,
//             maxAge: 15 * 24 * 60 * 60 * 1000,
//         }); // 15 mins

//         console.log("Login successful");
//         // Success response
//         return res.status(200).json({
//             message: "Login successful",
//             success: true,
//         });

//         //
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             success: false,
//         });
//     }
// });

// // /logout
// authRouter.post("/logout", async (req, res) => {
//     try {
//         /*
//          * 1. Get email from the request body
//          * 2. Validate the email
//          * 3. Remove the refresh token from the database for the user
//          * 4. Clear the cookies
//          * 5. Return a success response
//          */

//         const { id } = req.body;

//         if (!id) {
//             return res.status(400).json({
//                 message: "ID is required",
//                 success: false,
//             });
//         }

//         await db.query("UPDATE users SET refresh_token = NULL WHERE id = ?", [
//             id,
//         ]);

//         res.clearCookie("accessToken");
//         res.clearCookie("refreshToken");

//         return res.status(200).json({
//             message: "Logout successful",
//             success: true,
//         });
//         //
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             success: false,
//         });
//     }
// });

// authRouter.get("/check-login", (req, res) => {
//     const accessToken = req.cookies.accessToken;

//     if (!accessToken) {
//         return res.json({ isLoggedIn: false });
//     }

//     try {
//         const decoded = jwt.verify(accessToken, env.auth.accessTokenSecret);
//         return res.json({
//             isLoggedIn: true,
//             role: decoded.role,
//             id: decoded.id,
//         });
//     } catch (error) {
//         console.error("Error verifying token:", error);
//         return res.json({ isLoggedIn: false });
//     }
// });

// export { authRouter };
