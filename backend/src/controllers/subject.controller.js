import db from "../db/db.js";

export const addSubject = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: "Name and description are required",
            });
        }

        const newSubject = await db.subject.create({
            data: {
                name,
                description,
            },
        });

        return res.status(201).json({
            message: "Subject added successfully",
            data: newSubject,
        });
    } catch (error) {
        // throw new Error(error.message);
        return res.status(400).json({
            message: error.message || "An error occurred",
        });
    }
};

export const getAllSubjects = async (req, res) => {
    try {
        const subjects = await db.subject.findMany({
            select: {
                id: true,
                name: true,
                description: true,
            },
        });

        return res.status(200).json({
            message: "Subjects fetched successfully",
            data: subjects,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error.message || "An error occurred while fetching subjects",
        });
    }
};

export const getSubjectById = async (req, res) => {
    try {
        const { subjectId } = req.params;

        const subject = await db.subject.findUnique({
            where: {
                id: parseInt(subjectId),
            },
            include: {
                exams: true,
            },
        });

        if (!subject) {
            return res.status(404).json({
                message: "Subject not found",
            });
        }
        return res.status(200).json({
            message: "Subject fetched successfully",
            data: subject,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error.message || "An error occurred while fetching subject",
        });
    }
};

// const subjects = [
//     {
//         id: 1,
//         name: "Mathematics",
//         description:
//             "Mathematics is the study of numbers, quantity, space, structure, and change.",
//     },
//     {
//         id: 2,
//         name: "English",
//         description:
//             "English is a West Germanic language first spoken in early medieval England, which has become the leading language of international discourse in the 21st century.",
//     },
//     {
//         id: 3,
//         name: "Data Structures and Algorithms",
//         description:
//             "Data structures and algorithms are the building blocks of programming. They are the foundation of computer science.",
//     },
// ];
