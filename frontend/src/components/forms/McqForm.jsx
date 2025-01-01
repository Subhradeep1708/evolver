import React, { useState } from "react";
import {
    Button,
    Input,
    Stack,
    HStack,
    Text,
    Box,
    Grid,
    NativeSelectField,
    NativeSelectRoot,
} from "@chakra-ui/react";
import { Field } from "../ui/field";
import { NumberInputRoot, NumberInputField } from "../ui/number-input";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegImage } from "react-icons/fa";
import { routes } from "../../utils/constants";
import { HiUpload } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router";
import axios from "axios";

const McqForm = () => {
    let { examId } = useParams();
    console.log("Exam ID: ", examId);

    const formik = useFormik({
        initialValues: {
            mcqs: [
                {
                    questionBody: "abc",
                    options: ["a", "b", "c", "d"],
                    point: 1,
                    answer: "",
                },
            ],
        },
        validationSchema: Yup.object({
            mcqs: Yup.array().of(
                Yup.object().shape({
                    questionBody: Yup.string().required("Question is required"),
                    options: Yup.array()
                        .of(Yup.string().required("Option is required"))
                        .min(4, "At least 4 options are required")
                        .required("Options are required"),
                    point: Yup.number()
                        .min(1, "Point must be at least 1")
                        .required("Point is required"),
                    answer: Yup.string().required("Answer is required"),
                })
            ),
        }),
        onSubmit: (values) => {
            console.log("Submitting...");
            handleSubmit(values);
        },
    });

    const handleSubmit = (values) => {
        console.log("Form Data: ", values);
        const response = axios.post(routes.addMcqBulk, {
            examId: parseInt(examId),
            mcqs: values.mcqs,
        });

        if (response.status === 201 || response.status === 200) {
            console.log("MCQs added successfully");
        }
    };

    const addBlankQuestion = () => {
        formik.setFieldValue("mcqs", [
            ...formik.values.mcqs,
            {
                questionBody: "",
                options: ["", "", "", ""],
                point: 1,
                answer: "",
            },
        ]);
    };
    const handleDelete = (index) => {
        formik.setFieldValue(
            "mcqs",
            formik.values.mcqs.filter((_, i) => i !== index)
        );
    };
    return (
        <form onSubmit={formik.handleSubmit}>
            <Box>
                <Stack spacing={6}>
                    <Text fontSize="lg" fontWeight="bold">
                        Add Questions
                    </Text>

                    {formik.values.mcqs.map((mcq, mcqIndex) => (
                        <Box
                            key={mcqIndex}
                            p={4}
                            borderRadius="md"
                            spaceY={4}
                            mb={4}
                            bg={"bg"}
                            shadow={"sm"}
                            maxW={""}
                        >
                            {/* <Stack spacing={4}> */}
                            <HStack>
                                <Input
                                    value={mcqIndex + 1 + "."}
                                    disabled={true}
                                    px={2}
                                    maxW={10}
                                    color={"fg"}
                                    fontWeight={"bold"}
                                    borderWidth={0}
                                />
                                {/* Question Input */}
                                <Input
                                    placeholder="Enter question"
                                    // value={mcq.question}
                                    px={2}
                                    name={`mcqs[${mcqIndex}].questionBody`}
                                    onChange={formik.handleChange}
                                    value={
                                        formik.values.mcqs[mcqIndex]
                                            .questionBody
                                    }
                                    onBlur={formik.handleBlur}
                                    onFocus={() => {
                                        if (
                                            mcqIndex ===
                                            formik.values.mcqs.length - 1
                                        ) {
                                            addBlankQuestion();
                                        }
                                    }}
                                />
                                {/* Points Input */}

                                <Field>
                                    <NumberInputRoot
                                        maxW={20}
                                        px={2}
                                        onValueChange={(valueString) => {
                                            formik.setFieldValue(
                                                `mcqs[${mcqIndex}].point`,
                                                valueString.value
                                            );
                                            console.log(
                                                formik.values.mcqs[mcqIndex]
                                                    .point
                                            );
                                            console.log(valueString);
                                        }}
                                    >
                                        <NumberInputField
                                            name={`mcqs[${mcqIndex}].point`}
                                            value={
                                                formik.values.mcqs[mcqIndex]
                                                    .point
                                            }
                                            onBlur={formik.onBlur}
                                        />
                                    </NumberInputRoot>
                                </Field>
                            </HStack>

                            {/* Options Inputs */}
                            <Grid
                                templateColumns={"repeat(2, 1fr)"}
                                templateRows={"repeat(2, 1fr)"}
                                gap={4}
                                w={"100%"}
                            >
                                {mcq.options?.map((option, optionIndex) => (
                                    <Input
                                        key={optionIndex}
                                        px={2}
                                        w={"100%"}
                                        name={`mcqs[${mcqIndex}].options[${optionIndex}]`}
                                        value={
                                            formik.values.mcqs[mcqIndex]
                                                .options[optionIndex]
                                        }
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                ))}
                            </Grid>

                            <HStack justify={"space-between"}>
                                <HStack>
                                    <Field>
                                        <NativeSelectRoot>
                                            <NativeSelectField
                                                px={4}
                                                maxW={96}
                                                background={"bg"}
                                                font={"fg"}
                                                name={`mcqs[${mcqIndex}].answer`}
                                                value={
                                                    formik.values.mcqs[mcqIndex]
                                                        .answer
                                                }
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="" disabled>
                                                    Select Answer
                                                </option>
                                                <option value="A">
                                                    A.{" "}
                                                    {
                                                        formik.values.mcqs[
                                                            mcqIndex
                                                        ].options[0]
                                                    }
                                                </option>
                                                <option value="B">
                                                    B.{" "}
                                                    {
                                                        formik.values.mcqs[
                                                            mcqIndex
                                                        ].options[1]
                                                    }
                                                </option>
                                                <option value="C">
                                                    C.{" "}
                                                    {
                                                        formik.values.mcqs[
                                                            mcqIndex
                                                        ].options[2]
                                                    }
                                                </option>
                                                <option value="D">
                                                    D.{" "}
                                                    {
                                                        formik.values.mcqs[
                                                            mcqIndex
                                                        ].options[3]
                                                    }
                                                </option>
                                            </NativeSelectField>
                                        </NativeSelectRoot>
                                    </Field>
                                    <Button
                                        background={"bg.muted"}
                                        color={"fg"}
                                    >
                                        <FaRegImage />
                                    </Button>
                                </HStack>
                                <Box>
                                    <Button
                                        background={"bg.muted"}
                                        disabled={
                                            formik.values.mcqs.length === 1
                                        }
                                        type="submit"
                                        onClick={() => handleDelete(mcqIndex)}
                                    >
                                        <AiOutlineDelete color="red" />
                                    </Button>
                                </Box>
                            </HStack>
                        </Box>
                    ))}
                    <Button type="submit">Submit Exam</Button>
                </Stack>
            </Box>
        </form>
    );
};

export default McqForm;
