import db from "../db/db.js";

const deleteExam = async (req, res) => {
    const { id } = req.params;
    await db.exam.delete({
        where: {
            id: id,
        },
    });
};

export const createExam = async (req, res) => {
    try {
        const {
            examName,
            subjectId,
            duration,
            noOfQuestions,
            totalMarks,
            addedBy,
        } = req.body;

        console.log(req.body);

        const newExam = await db.exam.create({
            data: {
                subjectId: parseInt(subjectId),
                name: examName,
                noOfQuestions: noOfQuestions,
                totalMarks: totalMarks,
                durationInMinutes: duration,
                addedBy: parseInt(addedBy),
            },
        });

        console.log("New exam:", newExam);

        const examId = newExam.id;

        return res
            .status(201)
            .json({ message: "Exam created successfully", data: newExam });
    } catch (error) {
        console.error("Error creating exam:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

export const getExamById = async (req, res) => {
    const { id } = req.params;
    const exam = await db.exam.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            subject: true,
            mcqs: {
                select: {
                    id: true,
                    questionBody: true,
                    optionA: true,
                    optionB: true,
                    optionC: true,
                    optionD: true,
                    // answer: true,
                    point: true,
                },
            },
        },
    });

    if (!exam) {
        return res.status(404).json({ message: "Exam not found" });
    }
    console.log("Exam details:", exam);

    return res.status(200).json({
        message: "Exam fetched",
        exam,
    });
};

const getLeaderboard = async (req, res) => {};

const getExamByStudentId = async (req, res) => {
    const { studentId } = req.params;
    // const exams = await db.examSubmission.findMany({
    //     where: {
    //         studentId,
    //     },
    //     include: {
    //         exam: true,
    //     },
    // });

    return res.status(200).json({ exams });
};

export const getExamByTeacherId = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await db.teacher.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                isController: true,
            },
        });
        // const id = req.user.id;
        let exams;

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        if (teacher.isController) {
            exams = await db.exam.findMany({
                include: {
                    subject: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
        } else {
            exams = await db.exam.findMany({
                where: {
                    addedBy: parseInt(id),
                },
                include: {
                    subject: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
        }

        return res.status(200).json({ exams });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "An error occurred" });
    }
};

const getAllExams = async (req, res) => {
    const exams = await db.exam.findMany({
        include: {
            teacher: {
                include: {
                    user: {
                        select: {
                            firstName: true,
                            middleName: true,
                            lastName: true,
                        },
                    },
                },
            },
            subject: {
                select: {
                    name: true,
                },
            },
        },
    });

    if (exams) {
        return res.status(200).json({ exams });
    } else {
        return res.status(404).json({ message: "No exams found" });
    }
};

const submitExamByStudentId = async (req, res) => {
    const { studentId } = req.params;
    const { examId, answers } = req.body;

    const exam = await db.exam.findUnique({
        where: {
            id: examId,
        },
    });

    if (!exam) {
        return res.status(404).json({ message: "Exam not found" });
    }

    const mcqs = await db.mCQ.findMany({
        where: {
            examId: examId,
        },
    });

    const totalQuestions = mcqs.length;
    let correctAnswers = 0;

    for (let i = 0; i < totalQuestions; i++) {
        if (mcqs[i].answer === answers[i]) {
            correctAnswers++;
        }
    }

    const score = (correctAnswers / totalQuestions) * 100;

    await db.examSubmission.create({
        data: {
            studentId,
            examId,
            score,
        },
    });

    return res.status(200).json({ score });
};

export {
    deleteExam,
    getLeaderboard,
    getExamByStudentId,
    getAllExams,
    submitExamByStudentId,
};
