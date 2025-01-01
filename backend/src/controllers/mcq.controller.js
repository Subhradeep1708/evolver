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

const addMcqBulk = async (req, res) => {
    const { examId, mcqs } = req.body;
    const mcqData = mcqs.map((mcq) => ({
        questionBody: mcq.questionBody,
        questionImage: mcq.questionImage || null,
        optionA: mcq.options[0],
        optionB: mcq.options[1],
        optionC: mcq.options[2],
        optionD: mcq.options[3],
        answer: mcq.answer,
        point: parseInt(mcq.point),
        examId: examId,
    }));

    await db.mCQ.createMany({
        data: mcqData,
        skipDuplicates: true,
    });

    return res
        .status(201)
        .json({ message: "MCQs created successfully", data: mcqData });
};
