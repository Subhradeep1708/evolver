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
                teachers: {
                    select: {
                        teacher: {
                            select: {
                                id: true,
                                user: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                        email: true,
                                    },
                                },
                                isController: true,
                            },
                        },
                    },
                },
            },
        });

        // Transform the response to include only relevant teacher data
        const transformedSubjects = subjects.map((subject) => ({
            id: subject.id,
            name: subject.name,
            description: subject.description,
            teachers: subject.teachers.map((teacherSubject) => ({
                id: teacherSubject.teacher.id,
                firstName: teacherSubject.teacher.user.firstName,
                lastName: teacherSubject.teacher.user.lastName,
                email: teacherSubject.teacher.user.email,
                isController: teacherSubject.teacher.isController,
            })),
        }));

        return res.status(200).json({
            message: "Subjects fetched successfully",
            data: transformedSubjects,
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

export const updateSubject = async (req, res) => {
    try {
        const { subjectId } = req.params;
        // API should be /api/subject/:subjectId
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: "Name and description are required",
            });
        }

        const updatedSubject = await db.subject.update({
            where: {
                id: parseInt(subjectId),
            },
            data: {
                name,
                description,
            },
        });

        return res.status(200).json({
            message: "Subject updated successfully",
            data: updatedSubject,
        });
    } catch (error) {
        return res.status(400).json({
            message:
                error.message || "An error occurred while updating subject",
        });
    }
};
