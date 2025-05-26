"use client";

import {
    ExamHeader,
    DisplayedQuestion,
    ExamTimer,
    QuestionNavigation,
    QuestionPallet,
    SubmitButton,
} from "@/components/exam-panel";
import { MCQType } from "@/components/exam-panel/DisplayedQuestion";
import { QuestionStatus } from "@/components/exam-panel/QuestionPallet";
import apiRoutes from "@/lib/routes";
import axios from "axios";
import { useEffect, useState } from "react";

type OptionKey = "A" | "B" | "C" | "D";

type Mcq = {
    id: number;
    questionBody: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: OptionKey;
};

export default function MainExamPanel({ examId }: { examId: string }) {
    const [examName, setExamName] = useState("Loading...");
    const [mcqs, setMcqs] = useState<Mcq[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, OptionKey | null>>(
        {}
    );
    const [statuses, setStatuses] = useState<
        { id: number; status: QuestionStatus }[]
    >([]);
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const res = await axios.get(`${apiRoutes.getExam}/${examId}`);
                if (res.status !== 200) throw new Error(res.statusText);

                const data = res.data.exam;
                console.log("Fetched Exam MCQs", data);

                setExamName(data.name);
                setMcqs(data.mcqs);
                setTimeLeft(data.durationInMinutes);
                setStatuses(
                    data.mcqs.map((q: MCQType, idx: number) => ({
                        id: q.id,
                        status: idx === 0 ? "current" : "unattempted",
                    }))
                );
            } catch (error: any) {
                console.error(`Error fetching exam data: ${error.message}`);
            }
        };

        fetchExam();
    }, [examId]);

    const currentQuestion = mcqs[currentQuestionIndex];

    const handleSelectOption = (option: OptionKey) => {
        const questionId = currentQuestion.id;

        setAnswers((prev) => ({ ...prev, [questionId]: option }));

        setStatuses((prev) =>
            prev.map((q) =>
                q.id === questionId ? { ...q, status: "answered" } : q
            )
        );
    };

    const handleSelectQuestion = (index: number) => {
        setCurrentQuestionIndex(index);

        setStatuses((prev) =>
            prev.map((q, idx) => {
                if (idx === index) return { ...q, status: "current" };
                const hasAnswer = answers[q.id];
                if (q.status === "current") {
                    return {
                        ...q,
                        status: hasAnswer ? "answered" : "notAnswered",
                    };
                }
                return q;
            })
        );
    };

    const handleNext = () => {
        if (currentQuestionIndex < mcqs.length - 1) {
            handleSelectQuestion(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            handleSelectQuestion(currentQuestionIndex - 1);
        }
    };

    const handleMarkForReview = () => {
        const questionId = currentQuestion.id;
        setStatuses((prev) =>
            prev.map((q) =>
                q.id === questionId ? { ...q, status: "markedForReview" } : q
            )
        );
    };

    const handleSubmit = () => {
        console.log("Submitting exam with answers:", answers);
        console.log("Statuses:", statuses);
    };

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-center my-6">
                    {examName}
                </h1>
            </div>

            {mcqs.length > 0 && (
                <div className="p-6 max-w-8xl mx-auto">
                    <div className="flex flex-row justify-between items-center bg-amber-100 rounded-2xl px-6">
                        <ExamHeader
                            examName={examName}
                            totalQuestions={mcqs.length}
                        />
                        <ExamTimer
                            durationInMinutes={timeLeft}
                            onTimeUp={() =>
                                alert("Time's up! Submitting exam...")
                            }
                        />
                    </div>

                    <div className="flex flex-row md:flex-row gap-4">
                        <div className="basis-3/4 ">
                            <DisplayedQuestion
                                className="my-6"
                                question={currentQuestion}
                                selectedOption={
                                    answers[currentQuestion.id] ?? null
                                }
                                setSelectedOption={handleSelectOption}
                            />

                            <QuestionNavigation
                                currentQuestionId={currentQuestion.id}
                                totalQuestions={mcqs.length}
                                onNext={handleNext}
                                onPrev={handlePrev}
                                onMarkForReview={handleMarkForReview}
                            />
                        </div>

                        <div className="basis-1/4">
                            <div className="my-6">
                                <QuestionPallet
                                    questionStatuses={statuses.map(
                                        (s) => s.status
                                    )}
                                    currentQuestionIndex={currentQuestionIndex}
                                    onSelectQuestion={handleSelectQuestion}
                                />
                                <SubmitButton onSubmit={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
