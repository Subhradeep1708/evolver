"use client";

import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type OptionKey = "A" | "B" | "C" | "D";

export type MCQType = {
    id: number;
    questionBody: string;
    questionBodyImage?: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
};

type DisplayedQuestionProps = {
    question: MCQType;
    selectedOption: OptionKey | null;
    setSelectedOption: (option: OptionKey) => void;
    className?: string;
};

export const DisplayedQuestion = ({
    question,
    selectedOption,
    setSelectedOption,
    className,
}: DisplayedQuestionProps) => {
    const options = [
        { label: "A", text: question.optionA },
        { label: "B", text: question.optionB },
        { label: "C", text: question.optionC },
        { label: "D", text: question.optionD },
    ];

    return (
        <Card className={`p-4 shadow-md ${className}`}>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <p className="text-lg font-medium">
                            {question.id}. {question.questionBody}
                        </p>
                        {/* {question.questionBodyImage && (
              <img
                src={question.questionBodyImage}
                alt="Question"
                className="mt-2 max-h-60 rounded"
              />
            )} */}
                    </div>

                    <RadioGroup
                        value={selectedOption ?? ""}
                        onValueChange={(val) =>
                            setSelectedOption(val as OptionKey)
                        }
                        className="space-y-3"
                    >
                        {options.map((opt) => (
                            <div
                                key={opt.label}
                                className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                            >
                                <input
                                    type="radio"
                                    id={opt.label}
                                    value={opt.label}
                                    checked={selectedOption === opt.label}
                                    onChange={() =>
                                        setSelectedOption(
                                            opt.label as OptionKey
                                        )
                                    }
                                    className="form-radio text-teal-600"
                                />
                                <Label
                                    htmlFor={opt.label}
                                    className="cursor-pointer"
                                >
                                    <span className="font-semibold">
                                        {opt.label}.
                                    </span>{" "}
                                    {opt.text}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>
    );
};
