import db from "../db/db.js";

const deleteMcq = async (req, res) => {
    const { id } = req.params;
    await db.mCQ.delete({
        where: {
            id: id,
        },
    });
};

const addMcq = async (req, res) => {
    const { question, questionImage, options, correctOption, examId } =
        req.body;

    await db.mCQ.create({
        data: {
            questionBody: question,
            questionImage: questionImage,
            optionA: options[0],
            optionB: options[1],
            optionC: options[2],
            optionD: options[3],
            examId,
            answer: correctOption,
        },
    });
    return res.status(201).json({ message: "MCQ created successfully" });
};

export const addMcqBulk = async (req, res) => {
    const { examId, mcqs } = req.body;

    if (!mcqs || mcqs.length === 0) {
        return res.status(400).json({ message: "No MCQs provided" });
    }

    let totalMarks = 0;

    const mcqData = mcqs.map((mcq) => {
        totalMarks += parseInt(mcq.point);
        return {
            questionBody: mcq.question,
            questionBodyImage: mcq.questionBodyImage || "",
            optionA: mcq.options.A,
            optionB: mcq.options.B,
            optionC: mcq.options.C,
            optionD: mcq.options.D,
            answer: mcq.answer,
            point: parseInt(mcq.point),
            examId: examId,
        };
    });

    const newMcqs = await db.mCQ.createMany({
        data: mcqData,
        skipDuplicates: true,
    });

    const updatedExam = await db.exam.update({
        where: { id: examId },
        data: { totalMarks: totalMarks },
    });

    console.log("New MCQs:", newMcqs);
    console.log("MCQs:", mcqData);

    return res
        .status(201)
        .json({ message: "MCQs created successfully", data: mcqData });
};
