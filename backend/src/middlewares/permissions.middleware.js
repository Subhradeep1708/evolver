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
    if (req.user.role !== "teacher" && req.user.role !== "controller") {
        return res.status(403).json({
            message:
                "You are not authorized to perform this action. Only Teachers can be allowed.",
            role: req.user.role,
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

const checkStudentAndControllerPermission = (req, res, next) => {
    if (req.user.role !== "student" || req.user.role !== "controller") {
        return res.status(403).json({
            message:
                "You are not authorized to perform this action. Only Students and Controllers can be allowed.",
        });
    }
    next();
};

const checkSelfPermission = (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(403).json({
            message: "You are not authorized to perform this action.",
        });
    }
    next();
};

export {
    checkStudentPermission,
    checkTeacherPermission,
    checkControllerPermission,
    checkStudentAndControllerPermission,
    checkSelfPermission,
};
