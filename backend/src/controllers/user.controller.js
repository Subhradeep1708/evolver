import db from "../db/db.js";

const getStudentData = async (req, res) => {
    try {
        const student = await db.student.findUnique({
            where: { id: req.user.id },
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

const getTeacherData = async (req, res) => {};
