import db from "../db/db.js";
//leaderboard
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

export const getResultsByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;
        const results = await db.result.findMany({
            where: {
                studentId: parseInt(studentId),
            },
            include: {
                exam: {
                    include: {
                        subject: true,
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
                    },
                },
            },
        });

        const student = await db.student.findUnique({
            where: {
                id: parseInt(studentId),
            },
            select: {
                user: {
                    select: {
                        firstName: true,
                        middleName: true,
                        lastName: true,
                    },
                },
            },
        });

        return res.status(200).json({
            message: "Results fetched successfully",
            student: student.user,
            results: results.map((result) => ({
                examName: result.exam.name,
                subject: result.exam.subject.name,
                teacher: `${result.exam.teacher.user.firstName} ${result.exam.teacher.user.middleName} ${result.exam.teacher.user.lastName}`,
                totalMarks: result.totalMarks,
                obtainedMarks: result.obtainedMarks,
                percentageMarks: (
                    (Number(result.obtainedMarks) / Number(result.totalMarks)) *
                    100
                ).toFixed(2),
                submittedAt: result.submittedAt,
            })),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

export default {
    getExamResults,
};
