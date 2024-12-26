const checkStudentPermission = (req, res, next) => {
    if (req.user.role !== "student") {
        return res.status(403).json({
            message:
                "You are not authorized to perform this action. Only Students can be allowed.",
        });
    }
    next();
};

const checkTeacherPermission = (req, res, next) => {
    if (req.user.role !== "teacher") {
        return res.status(403).json({
            message:
                "You are not authorized to perform this action. Only Teachers can be allowed.",
        });
    }
    next();
};

const checkControllerPermission = (req, res, next) => {
    if (req.user.role !== "controller") {
        return res.status(403).json({
            message:
                "You are not authorized to perform this action. Only Controllers can be allowed.",
        });
    }
    next();
};
