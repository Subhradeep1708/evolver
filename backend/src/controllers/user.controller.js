import db from "../db/db.js";

export const getStudentData = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await db.student.findUnique({
            where: { id: parseInt(studentId) },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        middleName: true,
                    },
                },
            },
        });
        return res.status(200).json({
            message: "Student data retrieved successfully",
            data: student,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const getAllStudent = async (req, res) => {
    try {
        const students = await db.student.findMany({
            include: {
                user: {
                    select: {
                        firstName: true,
                        middleName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });

        return res.status(200).json({
            message: "All students retrieved successfully",
            data: students,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getAllTeacher = async (req, res) => {
    try {
        const teachers = await db.teacher.findMany({
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                subjects: {
                    include: {
                        subject: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        return res.status(200).json({
            message: "All teachers retrieved successfully",
            data: teachers,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getTeacherData = async (req, res) => {};

export const editStudentById = async (req, res) => {
    try {
        const { id, email, password, firstName, lastName, middleName, rollNo } =
            req.body;

        if (!id) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        // const hasUserFields =
        //     email || password || firstName || lastName || middleName;
        const userUpdateData = {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email }),
            ...(password && { password }),
            middleName,
        };

        const user = await db.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let updatedStudent;
        const updatedUser = await db.user.update({
            where: { id },
            data: userUpdateData,
        });

        if (rollNo) {
            const student = await db.student.findUnique({ where: { id } });
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }

            updatedStudent = await db.student.update({
                where: { id },
                data: { rollNo },
            });
        }

        if (!updatedUser && !updatedStudent) {
            return res.status(400).json({
                message: "No valid fields provided to update",
            });
        }

        return res.status(200).json({
            message: "Update successful",
            data: {
                ...(updatedUser && { user: updatedUser }),
                ...(updatedStudent && { student: updatedStudent }),
            },
        });
    } catch (error) {
        console.error("Error updating student:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
