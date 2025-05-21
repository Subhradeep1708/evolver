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

export const getTeacherData = async (req, res) => { };

export const editStudentById = async (req, res) => {
    try {
        const { id, email, password, firstName, lastName, middleName, rollNo } = req.body;
        const student = await db.student.findUnique({
            where: id,
        });
        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }
        const updatedStudent = await db.student.update({
            where: id,
            data: {
                user: {
                    update: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        middleName: middleName,
                        rollNo: rollNo,
                    },
                },
            },
        });

    } catch (error) {
        console.log(error.message);
    }
}