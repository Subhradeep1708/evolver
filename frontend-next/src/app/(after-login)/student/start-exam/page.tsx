"use client";

import {
    ExamHeader,
    DisplayedQuestion,
    ExamTimer,
    QuestionNavigation,
    QuestionPallet,
    SubmitButton,
} from "@/components/exam-panel";
import { useEffect, useState } from "react";

type OptionKey = "A" | "B" | "C" | "D";

// Sample exam data
const fakeExam = {
    id: 1,
    name: "Sample Exam",
    totalMarks: 100,
    mcqs: [
        {
            id: 1,
            questionBody: "What is the capital of France?",
            optionA: "Paris",
            optionB: "London",
            optionC: "Berlin",
            optionD: "Madrid",
            answer: "A",
        },
        {
            id: 2,
            questionBody: "What is 2 + 2?",
            optionA: "3",
            optionB: "4",
            optionC: "5",
            optionD: "22",
            answer: "B",
        },
        {
            id: 3,
            questionBody: "Which language is used for web apps?",
            optionA: "Python",
            optionB: "Java",
            optionC: "JavaScript",
            optionD: "C++",
            answer: "C",
        },
    ],
};

// Initial statuses
const initStatuses = fakeExam.mcqs.map((q) => ({
    id: q.id,
    status: "unattempted" as
        | "unattempted"
        | "answered"
        | "notAnswered"
        | "markedForReview"
        | "current",
}));

export default function ExamPanelPage() {
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    const [answers, setAnswers] = useState<Record<number, OptionKey | null>>(
        {}
    );

    const [statuses, setStatuses] = useState(initStatuses);
    const [timeLeft] = useState(10 * 60); // 10 minutes example

    const currentQuestion = fakeExam.mcqs.find(
        (q) => q.id === currentQuestionId
    )!;

    // Handle option select - option is OptionKey
    const handleSelectOption = (option: OptionKey) => {
        setAnswers((prev) => ({ ...prev, [currentQuestionId]: option }));

        setStatuses((prev) =>
            prev.map((q) => {
                if (q.id === currentQuestionId) {
                    return {
                        ...q,
                        status: option ? "answered" : "notAnswered",
                    };
                }
                return q;
            })
        );
    };

    // Handle question select from pallet
    const handleSelectQuestion = (id: number) => {
        setCurrentQuestionId(id);

        setStatuses((prev) =>
            prev.map((q) => ({
                ...q,
                status:
                    q.id === id
                        ? "current"
                        : q.status === "current"
                        ? "unattempted"
                        : q.status,
            }))
        );
    };

    // Navigation handlers
    const handleNext = () => {
        if (currentQuestionId < fakeExam.mcqs.length) {
            handleSelectQuestion(currentQuestionId + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionId > 1) {
            handleSelectQuestion(currentQuestionId - 1);
        }
    };

    const handleMarkForReview = () => {
        setStatuses((prev) =>
            prev.map((q) => {
                if (q.id === currentQuestionId) {
                    return { ...q, status: "markedForReview" };
                }
                return q;
            })
        );
    };

    // Submit Handler
    const handleSubmit = () => {
        alert("Submit exam logic here");
    };

    // Initialize current question status on first render and update on currentQuestionId change
    useEffect(() => {
        setStatuses((prev) =>
            prev.map((q) => ({
                ...q,
                status: q.id === currentQuestionId ? "current" : q.status,
            }))
        );
    }, [currentQuestionId]);

    return (
        <div className="p-6 max-w-8xl mx-auto">
            <div className="flex">
                <ExamHeader
                    examName={fakeExam.name}
                    totalQuestions={fakeExam.mcqs.length}
                />

                <ExamTimer
                    durationInMinutes={timeLeft}
                    onTimeUp={() => alert("Time's up! Submitting exam...")}
                />
            </div>
            <div className="flex flex-row md:flex-row gap-4">
                <div className="basis-3/4">
                    <DisplayedQuestion
                        className="my-6"
                        question={currentQuestion}
                        selectedOption={answers[currentQuestionId] ?? null}
                        setSelectedOption={handleSelectOption}
                    />

                    <QuestionNavigation
                        currentQuestionId={currentQuestionId}
                        totalQuestions={fakeExam.mcqs.length}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        onMarkForReview={handleMarkForReview} // pass here
                    />
                </div>
                <div className="basis-1/4">
                    {/* Pass correct props for QuestionPallet */}
                    <div className="my-6">
                        <QuestionPallet
                            questionStatuses={statuses.map((s) => s.status)}
                            currentQuestionIndex={currentQuestionId - 1}
                            onSelectQuestion={(idx) =>
                                handleSelectQuestion(idx + 1)
                            }
                        />
                        <SubmitButton onSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}
