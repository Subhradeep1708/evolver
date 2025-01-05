import db from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../lib/env.js";

// const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const registerStudent = async (req, res) => {
    try {
        const {
            email,
            password,
            role,
            firstName,
            lastName,
            middleName,
            rollNo,
        } = req.body;
        // Validate inputs
        if (
            !email ||
            !password ||
            !role ||
            !lastName ||
            !firstName ||
            !rollNo
        ) {
            throw new Error("Email, password, and role are required");
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters");
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error("User already exists");
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

        return res.send({
            message: "User registered successfully",
            data: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                refreshToken: newUser.refreshToekn || "",
            },
        });
    } catch (error) {
        // throw new Error(error.message);
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
            subjects,
        } = req.body;
        // Validate inputs
        if (!email || !password || !role || !lastName || !firstName) {
            return res.status(400).json({
                message:
                    "Email, password, role, first name, and last name are required",
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
            throw new Error("User already exists");
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
                refreshToekn: refreshToken,
                teacher: {
                    create: {
                        isController: role === "controller",
                        subjects: {
                            connect: subjects.map((subject) => ({
                                id: parseInt(subject),
                            })),
                        },
                    },
                },
            },
        });

        return res.status(201).json({
            message: "User registered successfully",
            data: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                refreshToken: newUser.refreshToekn,
            },
        });
    } catch (error) {
        // throw new Error(error.message);
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

export const logout = async (id) => {
    try {
        // Validate input
        if (!id) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        // Clear refresh token
        await db.user.update({
            where: { id },
            data: { refreshToekn: null },
        });

        return {
            message: "Logout successful",
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
