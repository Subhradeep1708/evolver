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
        const { subjectId, examDuration, examType, mcqs } = req.body;
        //TODO: examDate, examTime, examDuration, examType add these later to the db

        if (req.user.role === "student") {
            return res
                .status(403)
                .json({ message: "You are not authorized to create an exam" });
        }

        const newExam = await db.exam.create({
            data: {
                subjectId,
                addedBy: req.user.id,
                subject: {
                    connect: {
                        id: subjectId,
                    },
                },
            },
        });

        const examId = newExam.id;

        const mcqData = mcqs.map((mcq) => ({
            questionBody: mcq.questionBody,
            questionBodyImage: mcq.questionBodyImage,
            optionA: mcq.options[0],
            optionB: mcq.options[1],
            optionC: mcq.options[2],
            optionD: mcq.options[3],
            answer: mcq.answer,
            examId: examId,
        }));

        // Insert MCQs in bulk
        await db.mCQ.createMany({
            data: mcqData,
        });

        return res.status(201).json({ message: "Exam created successfully" });
    } catch (error) {
        console.error("Error creating exam:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

const getLeaderboard = async (req, res) => {};

const getExamByStudentId = async (req, res) => {};

const getExamByTeacherId = async (req, res) => {};

const getAllExams = async (req, res) => {};

const submitExamByStudentId = async (req, res) => {};
