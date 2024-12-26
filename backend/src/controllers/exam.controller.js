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
    const { subjectId, examDuration, examType, mcqs } = req.body;
    //! examDate, examTime, examDuration, examType add these later to the db

    if (req.user.role === "student") {
        return res
            .status(403)
            .json({ message: "You are not authorized to create an exam" });
    }

    await db.exam.create({
        data: {
            subjectId,
            mcqs: db.mCQ.createMany(mcqs),
            addedBy: req.user.id,
            subject: {
                connect: {
                    id: subjectId,
                },
            },
        },
    });
    return res.status(201).json({ message: "Exam created successfully" });
};

const getLeaderboard = async (req, res) => {};

const getExamByStudentId = async (req, res) => {};

const getExamByTeacherId = async (req, res) => {};

const getAllExams = async (req, res) => {};

const submitExamByStudentId = async (req, res) => {};
