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
