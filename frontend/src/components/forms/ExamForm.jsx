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
    const [mcqs, setMcqs] = useState([
        {
            question: "abc",
            options: ["a", "b", "c", "d"],
            point: 1,
            answer: "",
        },
    ]);

    const [subjects, setSubjects] = useState([]);
    const [csvFile, setCsvFile] = useState(null);

    useEffect(() => {
        const getAllSubjects = async () => {
            const res = await axios.get(routes.getAllSubject); // Add the api endpoint here
            if (res.status === 200) {
                const data = res.data.data;
                setSubjects(data);
                console.log("Subjects:", data);
            }
        };

        getAllSubjects();
    }, []);

    
    const formik= useFormik({
        initialValues: {
            subjectId: 0,
            examName: "",
        },
        validationSchema: Yup.object({
            subjectId: Yup.number().required("Subject is required"),
            examName: Yup.string().required("Exam name is required"),
        }),
        onSubmit: (values) => {
            console.log("Form values:", values);
            handleSubmit(values);
        },
    });




    const handleSubmit = async (values) => {
       console.log("Form values:", values);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box p={8}>
                    <Fieldset.Root>
                        <Stack spacing={4}>
                            <Field label="Subject">
                                <NativeSelectRoot
                                    value={formik.values.subjectId}
                                >
                                    <NativeSelectField
                                        name="subjectId"
                                        value={formik.values.subjectId}
                                        onChange={formik.handleChange} // This should be enough to update Formik
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value="" disabled>
                                            Select Subject
                                        </option>
                                        {subjects?.map((sub) => (
                                            <option key={sub.id} value={sub.id}>
                                                {sub.name}
                                            </option>
                                        ))}
                                    </NativeSelectField>
                                </NativeSelectRoot>
                            </Field>
                            <Field label="Exam Name" h={24}>
                                <Input
                                    name="examName"
                                    value={formik.values.examName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter exam name"
                                    px={2}
                                />
                                {formik.touched.examName &&
                                    formik.errors.examName && (
                                        <Text color="red.500">
                                            {formik.errors.examName}
                                        </Text>
                                    )}
                            </Field>
                            {/* <Field label="Upload CSV File">
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
                            </Button> */}
                            <Button type="submit">Submit</Button>
                        </Stack>
                    </Fieldset.Root>
              </Box>
        </form>
    );
};

export default ExamForm;
