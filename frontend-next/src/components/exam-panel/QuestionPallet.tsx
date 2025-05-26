import React from "react";
import { Button } from "../ui/button";

export type QuestionStatus =
    | "unattempted" // gray
    | "answered" // green (attempted & answered)
    | "notAnswered" // red (attempted & not answered)
    | "markedForReview" // purple
    | "current"; // teal

type QuestionPalletProps = {
    questionStatuses: QuestionStatus[];
    currentQuestionIndex: number;
    onSelectQuestion: (index: number) => void;
};

const colorMap: Record<QuestionStatus, string> = {
    unattempted: "bg-gray-400 text-white",
    answered: "bg-green-600 text-white",
    notAnswered: "bg-red-600 text-white",
    markedForReview: "bg-purple-600 text-white",
    current: "bg-teal-600 text-white",
};

export const QuestionPallet: React.FC<QuestionPalletProps> = ({
    questionStatuses,
    currentQuestionIndex,
    onSelectQuestion,
}) => {
    return (
        <div className="grid grid-cols-8 gap-2 p-2">
            {questionStatuses.map((status, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const colorClass = isCurrent
                    ? colorMap.current
                    : colorMap[status];

                return (
                    <Button
                        key={idx}
                        className={`${colorClass} rounded w-8 h-8 flex items-center justify-center font-semibold cursor-pointer`}
                        onClick={() => onSelectQuestion(idx)}
                        aria-label={`Question ${idx + 1} - ${status}`}
                    >
                        {idx + 1}
                    </Button>
                );
            })}
        </div>
    );
};
