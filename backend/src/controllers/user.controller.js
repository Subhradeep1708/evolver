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
        throw new Error(error.message);
    }
};

const getTeacherData = async (req, res) => {};
