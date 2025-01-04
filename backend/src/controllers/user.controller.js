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
                    },
                },
            },
        });
        return res.status(200).json({
            message: "All students retrieved successfully",
            data: students,
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

const getTeacherData = async (req, res) => { };



