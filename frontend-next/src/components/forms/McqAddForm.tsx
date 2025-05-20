"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "../ui/card";

type McqAddFormProps = {
    noOfQuestions: number;
    examId: string;
};

const questionSchema = z.object({
    question: z.string().min(1, "Question is required"),
    optionA: z.string().min(1, "Option A is required"),
    optionB: z.string().min(1, "Option B is required"),
    optionC: z.string().min(1, "Option C is required"),
    optionD: z.string().min(1, "Option D is required"),
    marksForCorrectAns: z.coerce.number().min(1, "Marks are required"),
    marksForWrongAns: z.coerce.number().max(0, "Marks are required"),
    answer: z.enum(["A", "B", "C", "D"], {
        errorMap: () => ({ message: "Answer is required" }),
    }),
});

const formSchema = z.object({
    question: z.array(questionSchema),
});

const McqAddForm = ({ noOfQuestions, examId }: McqAddFormProps) => {
    const options = ["A", "B", "C", "D"];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: [...Array(noOfQuestions)].map(() => ({
                question: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                marksForCorrectAns: 1,
                marksForWrongAns: 0,
                answer: "A",
            })),
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Submitting...");
        const data = {
            examId,
            questions: values.question.map((question) => ({
                question: question.question,
                options: {
                    A: question.optionA,
                    B: question.optionB,
                    C: question.optionC,
                    D: question.optionD,
                },
                marksForCorrectAns: question.marksForCorrectAns,
                marksForWrongAns: question.marksForWrongAns,
                answer: question.answer,
            })),
        };
        console.log("Submitted:", data);
        form.reset(); // Clear form
    }
    return (
        <div className="w-full max-w-5xl mx-auto p-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    {[...Array(noOfQuestions)].map((_, index) => (
                        <Card key={index} className="bg-secondary/30">
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name={`question.${index}.question`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Question {index + 1}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter question"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    {options.map((option) => (
                                        <FormField
                                            key={index + option}
                                            control={form.control}
                                            name={
                                                `question.${index}.option${option}` as
                                                    | `question.${number}.optionA`
                                                    | `question.${number}.optionB`
                                                    | `question.${number}.optionC`
                                                    | `question.${number}.optionD`
                                            }
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Option {option}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={`Enter option ${option}`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {/* +ve marks */}
                                    <FormField
                                        control={form.control}
                                        name={`question.${index}.marksForCorrectAns`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Marks</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter marks"
                                                        min={1}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* -ve marks */}
                                    <FormField
                                        control={form.control}
                                        name={`question.${index}.marksForWrongAns`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>-ve Marks</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter -ve marks"
                                                        max={0}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* answer */}
                                    <FormField
                                        control={form.control}
                                        name={`question.${index}.answer`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Answer</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select answer" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {options.map(
                                                            (option) => (
                                                                <SelectItem
                                                                    key={
                                                                        index +
                                                                        option
                                                                    }
                                                                    value={
                                                                        option
                                                                    }
                                                                >
                                                                    {option}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            {/* <Separator className="my-4" /> */}
                        </Card>
                    ))}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default McqAddForm;
