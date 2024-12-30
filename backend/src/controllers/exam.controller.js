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
        const { examName, subjectId, mcqs } = req.body;
        //TODO: examDate, examTime, examDuration, examType add these later to the db

        if (req.user.role === "student") {
            return res
                .status(403)
                .json({ message: "You are not authorized to create an exam" });
        }

        if (mcqs.length === 0) {
            return res.status(400).json({ message: "No MCQs provided" });
        }

        const totalMarks = mcqs.reduce((acc, mcq) => acc + mcq.point, 0);

        const newExam = await db.exam.create({
            data: {
                subjectId,
                name: examName,
                addedBy: req.user.id,

                totalMarks,
            },
        });

        const examId = newExam.id;

        const mcqData = mcqs.map((mcq) => ({
            questionBody: mcq.questionBody,
            optionA: mcq.options[0],
            optionB: mcq.options[1],
            optionC: mcq.options[2],
            optionD: mcq.options[3],
            answer: mcq.answer,
            point: parseInt(mcq.point),
            examId: examId,
        }));

        mcqs.forEach((mcq) => {
            if (!["A", "B", "C", "D"].includes(mcq.answer)) {
                return res.status(400).json({
                    message: "Answer should be one of A, B, C, or D",
                });
            }
        });

        console.log(mcqData);

        // Insert MCQs in bulk
        const newMcqs = await db.mCQ.createMany({
            data: mcqData,
            skipDuplicates: true,
        });

        return res.status(201).json({ message: "Exam created successfully" });
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
    const { id } = req.params;
    const exams = await db.exam.findMany({
        where: {
            addedBy: id,
        },
    });

    return res.status(200).json({ exams });
};

const getAllExams = async (req, res) => {};

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
