import db from "../db/db.js";

export const submitAnswer = async (req, res) => {
    try {
        const studentId = req.user.id; //! For testing purposes
        console.log("Student Id:", studentId);

        const { examId, answers } = req.body;

        if (!answers || answers.length === 0) {
            return res.status(400).json({ message: "No answers provided" });
        }
        console.log("Answers provided");

        const exam = await db.exam.findUnique({
            where: { id: parseInt(examId) },
            include: { mcqs: true },
        });

        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        console.log("Exam found");

        const existingResult = await db.result.findFirst({
            where: { studentId: parseInt(studentId), examId: parseInt(examId) },
        });

        if (existingResult) {
            return res
                .status(400)
                .json({ message: "You have already submitted this exam" });
        }

        let totalMarks = 0;

        const answerData = answers.map((ans) => {
            const mcq = exam.mcqs.find((q) => q.id === ans.mcqId);
            if (!mcq) {
                console.error(`Invalid MCQ ID: ${ans.mcqId}`);
                throw new Error("Invalid MCQ submitted");
            }

            const isCorrect = mcq.answer === ans.selected;
            if (isCorrect) totalMarks += mcq.point;

            return {
                studentId,
                mcqId: ans.mcqId,
                selected: ans.selected,
                isCorrect,
            };
        });

        console.log("Answer data:", answerData);
        console.log("Total marks:", totalMarks);
        console.log("Submitting answers...");

        // Transaction for atomicity
        await db.$transaction(async (prisma) => {
            await prisma.answer.createMany({
                data: answerData,
                skipDuplicates: true,
            });
            await prisma.result.create({
                data: {
                    studentId: parseInt(studentId),
                    examId: parseInt(examId),
                    totalMarks,
                },
            });
        });

        console.log("Answers submitted successfully");

        return res
            .status(201)
            .json({ message: "Answers submitted successfully", totalMarks });
    } catch (error) {
        console.error("Error submitting answers:", error);
        return res
            .status(500)
            .json({ message: "An error occurred while submitting answers" });
    }
};
