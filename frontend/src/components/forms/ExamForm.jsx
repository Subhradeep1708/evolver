import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
    Button,
    Input,
    Stack,
    Fieldset,
    HStack,
    Text,
    Select,
    NumberInput,
    Box,
    Flex,
} from "@chakra-ui/react";
import { Field } from "../ui/field";

const MultiPageExamForm = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [mcqs, setMcqs] = useState([]);
    const [csvFile, setCsvFile] = useState(null);

    // Page 1 Formik setup
    const formikPage1 = useFormik({
        initialValues: {
            subject: "",
            examName: "",
            mcqs: [],
            // csvFile: null,

        },
        validationSchema: Yup.object({
            subject: Yup.string().required("Subject is required"),
            examName: Yup.string().required("Exam name is required"),
            // csvFile: Yup.mixed(),
            mcqs: Yup.array().min(5, "At least 5 MCQ is required"),
        }),
        onSubmit: (values) => {
            console.log("Page 1 Data:", values);
        },
    });

    // Add a new MCQ
    const addMcq = () => {
        setMcqs([...mcqs, { question: "", options: ["", "", "", ""], correctAnswer: 0, score: 1 }]);
    };

    // Update an MCQ
    const updateMcq = (index, field, value) => {
        const updatedMcqs = [...mcqs];
        if (field === "question") updatedMcqs[index].question = value;
        if (field.startsWith("option")) {
            const optionIndex = parseInt(field.split("option")[1]);
            updatedMcqs[index].options[optionIndex] = value;
        }
        if (field === "correctAnswer") updatedMcqs[index].correctAnswer = value;
        if (field === "score") updatedMcqs[index].score = value;
        setMcqs(updatedMcqs);
    };

    // Submit final MCQs
    const submitExam = () => {
        console.log("Exam Data:", mcqs);
    };

    const firstPageSubmit = () => {
        if (csvFile == null) {
            setCurrentPage(2);
        } else {
            // convert csv to mcqs
            // setMcqs()
            // setCurrentPage(3);{Success page}
        }
    }

    return (
        <Box p={8}>
            {currentPage === 1 && (
                <form onSubmit={formikPage1.handleSubmit}>
                    <Fieldset.Root>
                        <Stack spacing={4}>
                            <Field label="Subject">
                                <Input
                                    name="subject"
                                    value={formikPage1.values.subject}
                                    onChange={formikPage1.handleChange}
                                    onBlur={formikPage1.handleBlur}
                                    placeholder="Enter subject"
                                />
                                {formikPage1.touched.subject && formikPage1.errors.subject && (
                                    <Text color="red.500">{formikPage1.errors.subject}</Text>
                                )}
                            </Field>
                            <Field label="Exam Name">
                                <Input
                                    name="examName"
                                    value={formikPage1.values.examName}
                                    onChange={formikPage1.handleChange}
                                    onBlur={formikPage1.handleBlur}
                                    placeholder="Enter exam name"
                                />
                                {formikPage1.touched.examName && formikPage1.errors.examName && (
                                    <Text color="red.500">{formikPage1.errors.examName}</Text>
                                )}
                            </Field>
                            <Field label="Upload CSV">
                                <Input
                                    type="file"
                                    name="csvFile"
                                    onChange={(event) => {
                                        formikPage1.setFieldValue(
                                            "csvFile",
                                            event.target.files[0]
                                        );
                                    }}
                                />
                            </Field>
                            <Button type={"button"} onClick={firstPageSubmit}>{csvFile ? "Submit" : "Next"}</Button>
                        </Stack>
                    </Fieldset.Root>
                </form>
            )}

            {currentPage === 2 && (
                <Box>
                    page 2
                </Box>
            )}
        </Box>
    );
};

export default MultiPageExamForm;


// remove csv from formik add mcqs array instead