import React from "react";

interface ExamHeaderProps {
    examName: string;
    totalQuestions: number;
}

const ExamHeader: React.FC<ExamHeaderProps> = ({
    examName,
    totalQuestions,
}) => {
    return (
        <header className="mb-4">
            <h1 className="text-2xl font-bold">{examName}</h1>
            <p>Total Questions: {totalQuestions}</p>
        </header>
    );
};

export default ExamHeader;
