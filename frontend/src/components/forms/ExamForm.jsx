import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
    Button,
    Input,
    Stack,
    Fieldset,
    HStack,
    Text,
    Box,
    Grid,
    FileUploadRoot,
    FileUploadTrigger,
    NativeSelectField,
    NativeSelectRoot,
} from "@chakra-ui/react";
import { Field } from "../ui/field";
import { HiUpload } from "react-icons/hi";
import { NumberInputRoot, NumberInputField } from "../ui/number-input";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegImage } from "react-icons/fa";
import { routes } from "../../utils/constants";
import axios from "axios";

// import { Card } from "../ui/card";

const ExamForm = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [mcqs, setMcqs] = useState([
        { question: "", options: ["", "", "", ""], point: 1, answer: "" },
    ]);

    const [subjects, setSubjects] = useState([]);
    const [csvFile, setCsvFile] = useState(null);

    useEffect(() => {
        const getAllSubjects = async () => {
            //! Raktim HELPPPPPPPPPPPPPPPPPPP yeeeeeeeeeeeeeeeeeeeeeeehhhhhhhhhh
            const res = await axios.get(routes.getAllSubject); // Add the api endpoint here
            if (res.status === 200) {
                const data = res.data.data;
                setSubjects(data);
            }
        };

        getAllSubjects();
    }, []);

    // Page 1 Formik setup
    const formikPage1 = useFormik({
        initialValues: {
            subjectId: "",
            examName: "",
            mcqs: [],
        },
        validationSchema: Yup.object({
            subject: Yup.string().required("Subject is required"),
            examName: Yup.string().required("Exam name is required"),
            // csvFile: Yup.mixed(),
            mcqs: Yup.array().min(5, "At least 5 MCQ is required"),
        }),
        onSubmit: (values) => {
            console.log("Page 1 Data:", values);
            const { subjectId, examName, mcqs } = values;
            console.log("Subject ID:", subjectId);
            console.log("Exam Name:", examName);
            console.log("MCQs:", mcqs);
        },
    });

    // Page 2
    const addBlankQuestion = () => {
        setMcqs([
            ...mcqs,
            { question: "", options: ["", "", "", ""], point: 1 },
        ]);
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedMcqs = [...mcqs];

        if (field === "question") {
            updatedMcqs[index].question = value;

            // Automatically add a new question if typing in the last field
            if (index === mcqs.length - 1 && value.trim() !== "") {
                addBlankQuestion();
            }
        }

        if (field.startsWith("option")) {
            const optionIndex = parseInt(field.split("option")[1], 10);
            updatedMcqs[index].options[optionIndex] = value;
        }

        if (field === "point") {
            updatedMcqs[index].point = Number(value) || 1; // Default to 1 point if empty
        }

        setMcqs(updatedMcqs);
    };

    const firstPageSubmit = () => {
        if (csvFile == null) {
            setCurrentPage(2);
        } else {
            // convert csv to mcqs
            // setMcqs()
            // setCurrentPage(3);// Success page
        }
    };

    const handleSubmit = async () => {
        // sample request body

        // console.log(
        //     "Submitted MCQs:",
        //     mcqs.filter((q) => q.question.trim() !== "")
        // {
        //     "examName": "General Knowledge Test",
        //     "subjectId": 2,
        //     "mcqs": [
        //         {
        //             "questionBody": "What is the capital of France?",
        //             "options": ["Berlin", "Madrid", "Paris", "Rome"],
        //             "answer": "C",
        //             "point": 5
        //         },
        //         {
        //             "questionBody": "Which is the largest planet in our solar system?",
        //             "options": ["Earth", "Jupiter", "Mars", "Venus"],
        //             "answer": "B",
        //             "point": 10
        //         }
        //     ]
        // }

        // );
        // change "question" to "questionBody"
        setMcqs(() => {
            const updatedMcqs = mcqs.filter((q) => q.question.trim() !== "");
            updatedMcqs.forEach((q) => {
                q.questionBody = q.question;
            });
            return updatedMcqs;
        });

        const formData = {
            examName: formikPage1.values.examName,
            subjectId: formikPage1.values.subjectId,
            mcqs: mcqs,
        };

        console.log("FormData:", formData);

        //   axios request to submit the exam

        // submit the mcqs
        setCurrentPage(3);
    };

    return (
        <Box p={8}>
            {currentPage === 1 && (
                <form onSubmit={formikPage1.handleSubmit}>
                    <Fieldset.Root>
                        <Stack spacing={4}>
                            <Field label="Subject">
                                <NativeSelectRoot
                                    value={formikPage1.values.subjectId}
                                    onChange={formikPage1.handleChange}
                                    onBlur={formikPage1.handleBlur}
                                >
                                    <NativeSelectField
                                        name="subjectId"
                                        px={4}
                                        value={formikPage1.values.subjectId}
                                        onChange={formikPage1.handleChange}
                                        onBlur={formikPage1.handleBlur}
                                    >
                                        {subjects?.map((sub) => {
                                            return (
                                                <option
                                                    key={sub.id}
                                                    value={sub.id}
                                                >
                                                    {sub.name}
                                                </option>
                                            );
                                        })}
                                    </NativeSelectField>
                                </NativeSelectRoot>
                            </Field>
                            <Field label="Exam Name" h={24}>
                                <Input
                                    name="examName"
                                    value={formikPage1.values.examName}
                                    onChange={formikPage1.handleChange}
                                    onBlur={formikPage1.handleBlur}
                                    placeholder="Enter exam name"
                                    px={2}
                                />
                                {formikPage1.touched.examName &&
                                    formikPage1.errors.examName && (
                                        <Text color="red.500">
                                            {formikPage1.errors.examName}
                                        </Text>
                                    )}
                            </Field>
                            <Field label="Upload CSV File">
                                <FileUploadRoot maxFiles={5}>
                                    <FileUploadTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            p={2}
                                        >
                                            <HiUpload /> Upload file
                                        </Button>
                                    </FileUploadTrigger>
                                </FileUploadRoot>
                            </Field>
                            <Button type={"button"} onClick={firstPageSubmit}>
                                {csvFile ? "Submit" : "Next"}
                            </Button>
                        </Stack>
                    </Fieldset.Root>
                </form>
            )}

            {currentPage === 2 && (
                <Box>
                    <Stack spacing={6}>
                        <Text fontSize="lg" fontWeight="bold">
                            Add Questions
                        </Text>

                        {/* Map over the MCQs to render each question */}
                        {/* <Card> */}
                        {mcqs.map((mcq, index) => (
                            <Box
                                key={index}
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
                                        value={index + 1 + "."}
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
                                        value={mcq.question}
                                        px={2}
                                        onChange={(e) => {
                                            handleQuestionChange(
                                                index,
                                                "question",
                                                e.target.value
                                            );
                                        }}
                                        onFocus={() => {
                                            if (index === mcqs.length - 1) {
                                                addBlankQuestion();
                                            }
                                        }}
                                    />
                                    {/* Points Input */}

                                    <NumberInputRoot
                                        defaultValue="1"
                                        maxW={20}
                                        // px={2}
                                    >
                                        <NumberInputField />
                                    </NumberInputRoot>
                                </HStack>

                                {/* Options Inputs */}
                                <Grid
                                    templateColumns={"repeat(2, 1fr)"}
                                    templateRows={"repeat(2, 1fr)"}
                                    gap={4}
                                    w={"100%"}
                                >
                                    {mcq.options.map((option, optionIndex) => (
                                        <Input
                                            key={optionIndex}
                                            placeholder={`Option ${String.fromCharCode(
                                                65 + optionIndex
                                            )}`}
                                            px={2}
                                            w={"100%"}
                                            value={option}
                                            onChange={(e) =>
                                                handleQuestionChange(
                                                    index,
                                                    `option${optionIndex}`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ))}
                                </Grid>

                                <HStack justify={"space-between"}>
                                    <HStack>
                                        <Field>
                                            <NativeSelectRoot>
                                                <NativeSelectField
                                                    name="role"
                                                    px={4}
                                                    maxW={96}
                                                    background={"bg"}
                                                    font={"fg"}
                                                >
                                                    <option value="">
                                                        Select correct answer
                                                    </option>
                                                    <option value="teacher">
                                                        A. {mcq.options[0]}
                                                    </option>
                                                    <option value="controller">
                                                        B. {mcq.options[1]}
                                                    </option>
                                                    <option value="controller">
                                                        C. {mcq.options[2]}
                                                    </option>
                                                    <option value="controller">
                                                        D. {mcq.options[3]}
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
                                            disabled={mcqs.length === 1}
                                            onClick={() => {
                                                setMcqs(
                                                    mcqs.filter(
                                                        (mcq, i) => i !== index
                                                    )
                                                );
                                            }}
                                        >
                                            <AiOutlineDelete color="red" />
                                        </Button>
                                    </Box>
                                </HStack>
                                {/* </Stack> */}
                            </Box>
                        ))}
                        {/* </Card> */}

                        {/* Submit Button */}
                        <Button onClick={handleSubmit}>Submit Exam</Button>
                    </Stack>
                </Box>
            )}

            {currentPage === 3 && (
                <Box>
                    <Text>Exam Submitted Successfully!</Text>
                    <Button type="submit">Test Submit</Button>
                </Box>
            )}
        </Box>
    );
};

export default ExamForm;
