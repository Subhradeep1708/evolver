import db from "../db/db.js";

export const getExamResults = async (req, res) => {
    try {
        const { examId } = req.params;

        // Fetch the exam to ensure it exists
        const exam = await db.exam.findUnique({
            where: { id: parseInt(examId) },
            include: {
                results: {
                    include: {
                        student: {
                            include: {
                                user: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                    },
                                },
                            },
                        },
                    },
                },
                teacher: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
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

        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        // Sort results by totalMarks in descending order, and by submission time in ascending order if marks are equal
        const sortedResults = exam.results.sort((a, b) => {
            if (b.totalMarks === a.totalMarks) {
                // If marks are equal, sort by submission time in ascending order
                return new Date(a.submittedAt) - new Date(b.submittedAt);
            }
            // Otherwise, sort by marks in descending order
            return b.totalMarks - a.totalMarks;
        });

        // Send the sorted results
        return res.status(200).json({
            message: "Results fetched successfully",
            examName: exam.name,
            subject: exam.subject.name,
            createdBy: `${exam.teacher.user.firstName} ${exam.teacher.user.lastName}`,
            results: sortedResults.map((result, index) => ({
                rank: index + 1,
                studentName: `${result.student.user.firstName} ${result.student.user.lastName}`,
                studentRollNo: result.student.rollNo,
                marksObtained: result.totalMarks,
                percentageMarks: (
                    (result.totalMarks / exam.totalMarks) *
                    100
                ).toFixed(2),
                submittedAt: result.submittedAt,
            })),
        });
    } catch (error) {
        console.error("Error fetching results:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

export default {
    getExamResults,
};
