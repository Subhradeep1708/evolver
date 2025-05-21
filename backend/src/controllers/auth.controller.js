import db from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../lib/env.js";

// const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const registerStudent = async (req, res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            email,
            password,
            role,
            rollNo,
        } = req.body;
        // Validate inputs

        console.log(req.body);


        if (
            !email ||
            !password ||
            !role ||
            !lastName ||
            !firstName ||
            !rollNo
        ) {
            console.log("Missing required fields");

            return res.status(400).json({
                message:
                    "Email, password, role, first name, last name, and roll number are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate refresh token
        const refreshToken = jwt.sign({ email }, env.auth.refreshTokenSecret, {
            expiresIn: "15d",
        });

        // Create user

        const newUser = await db.user.create({
            data: {
                email,
                firstName,
                lastName,
                middleName,
                password: hashedPassword,
                role,
                refreshToekn: refreshToken || "",
                student: {
                    create: {
                        rollNo,
                    },
                },
            },
        });

        // console.log("new user")

        return res.json({
            message: "User registered successfully",
            data: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                refreshToken: newUser.refreshToekn || "",
            },
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const registerTeacher = async (req, res) => {
    try {
        const {
            email,
            password,
            role,
            firstName,
            lastName,
            middleName,
            subjects, // Array of subject IDs
            isController,
        } = req.body;

        // Validate inputs
        if (!email || !password || !role || !lastName || !firstName) {
            return res.status(400).json({
                message:
                    "Email, password, role, first name, and last name are required",
            });
        }

        console.log("Subjects", subjects);
        const formattedSubjects = subjects.map((subjectId) => ({
            id: Number(subjectId),
        }));

        console.log("Formatted Subjects", formattedSubjects);

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate refresh token
        const refreshToken = jwt.sign({ email }, env.auth.refreshTokenSecret, {
            expiresIn: "15d",
        });

        console.log("Creating new teacher....");

        // Create user

        const newUser = await db.user.create({
            data: {
                email,
                firstName,
                lastName,
                middleName,
                password: hashedPassword,
                role,
                refreshToekn: refreshToken,
                teacher: {
                    create: {
                        isController: role === "controller",
                    },
                },
            },
        });

        console.log("New teacher created");

        const formattedTeacherSubjectData = subjects.map((subjectId) => ({
            teacherId: newUser.id,
            subjectId: Number(subjectId),
        }));

        const connectSubjects = await db.teacherSubject.createMany({
            data: formattedTeacherSubjectData,
        });

        console.log("Subjects connected");

        return res.status(201).json({
            message: "User registered successfully",
            data: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                refreshToken: newUser.refreshToekn,
                teacher: newUser.teacher, // Includes associated subjects
            },
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// export const login = async (req, res) => {
//     try {
//         // Validate inputs
//         const { email, password, rollNo } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Email and password are required",
//             });
//         }

//         // Find user by email
//         const user = await db.user.findUnique({ where: { email } });
//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found",
//             });
//         }

//         // Verify password
//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) {
//             return res.status(400).json({
//                 message: "Invalid password",
//             });
//         }

//         // Generate access and refresh tokens
//         const accessToken = jwt.sign(
//             { id: user.id, role: user.role },
//             env.auth.accessTokenSecret,
//             { expiresIn: "1d" }
//         );

//         const refreshToken = jwt.sign(
//             { id: user.id, role: user.role },
//             env.auth.refreshTokenSecret,
//             { expiresIn: "15d" }
//         );

//         // Update refresh token in database
//         await db.user.update({
//             where: { id: user.id },
//             data: { refreshToekn: refreshToken },
//         });
//         // add to cookies
//         res.cookie("accessToken", accessToken, {
//             httpOnly: true,
//             secure: env.isProduction,
//         });
//         return res.status(200).json({
//             message: "Login successful",
//             data: {
//                 id: user.id,
//                 email: user.email,
//                 role: user.role,
//                 refreshToken: refreshToken,
//             },
//         });
//     } catch (error) {
//         return res.status(400).json({ message: error.message });
//     }
// };

export const loginStudent = async (req, res) => {
    try {
        // Validate inputs
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // Find user by email
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        // Generate access and refresh tokens
        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            env.auth.accessTokenSecret,
            { expiresIn: "1d" }
        );

        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            env.auth.refreshTokenSecret,
            { expiresIn: "15d" }
        );

        // Update refresh token in database
        await db.user.update({
            where: { id: user.id },
            data: { refreshToekn: refreshToken },
        });
        // add to cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false,
        });
        return res.status(200).json({
            message: "Login successful",
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
                refreshToken: refreshToken,
            },
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const loginTeacher = async (req, res) => {
    try {
        // Validate inputs
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // Find user by email
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        // Generate access and refresh tokens
        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            env.auth.accessTokenSecret,
            { expiresIn: "1d" }
        );

        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            env.auth.refreshTokenSecret,
            { expiresIn: "15d" }
        );

        // Update refresh token in database
        await db.user.update({
            where: { id: user.id },
            data: { refreshToekn: refreshToken },
        });
        // add to cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false,
        });
        return res.status(200).json({
            message: "Login successful",
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
                refreshToken: refreshToken,
            },
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        await db.user.update({
            where: { id: Number(userId) },
            data: { refreshToekn: null }, // Assuming `refreshToken` field in user table
        });

        res.clearCookie("accessToken", {
            httpOnly: true, // Secure cookie for HTTP only
            sameSite: "Strict", // Prevent CSRF
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
