import db from "../db/db";

const addSubject = async (req, res) => {
    try {
        const { name, description, teacherId } = req.body;
        if (!name || !description) {
            throw new Error("Name and description are required");
        }

        const newSubject = db.subject.create({
            data: {
                name,
                description,
                teacher: {
                    connect: {
                        id: teacherId ? teacherId : null,
                    },
                },
            },
        });

        return res.status(201).json({
            message: "Subject added successfully",
            data: newSubject,
        });
    } catch (error) {
        throw new Error(error.message);
    }
};
