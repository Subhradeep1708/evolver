import { useFormik } from "formik";
import {
    Button,
    Fieldset,
    HStack,
    Input,
    NativeSelectField,
    NativeSelectRoot,
    Stack,
} from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import * as Yup from "yup";
import { Checkbox } from "../../components/ui/checkbox";
import { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../../utils/constants.js";

const TeacherForm = ({ teacher = null }) => {
    const isUpdateMode = !!teacher; // Determine if it's update mode
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        // Fetch subjects from API and set it to state

        const fetchSubjects = async () => {
            const response = await axios.get(routes.getAllSubject);
            // console.log(response.data.data);

            if (response.status == 200) {
                setSubjects(response.data.data);
            }
        };
        fetchSubjects();
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: teacher?.firstName || "",
            lastName: teacher?.lastName || "",
            middleName: teacher?.middleName || "",
            email: teacher?.email || "",
            password: "123456",
            role: teacher?.role || "teacher",
            isController: teacher?.isController || false,
            subjects: teacher?.subjects?.map((sub) => sub.name) || [],
        },

        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            middleName: Yup.string(),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string().required("Password is required"),
            role: Yup.string().required("Role is required"),
            isController: Yup.boolean().required(),
            subjects: Yup.array().required("At least one subject is required"),
        }),

        onSubmit: (values) => {
            if (isUpdateMode) {
                handleUpdate(values);
            } else {
                handleAdd(values);
            }
        },
    });

    const handleAdd = (values) => {
        try {
            console.log("Add Teacher:", values);

            const response = axios.post(
                `${import.meta.env.VITE_ORIGIN}/api/auth/teacher/register`,
                values,
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (values) => {
        console.log("Update Teacher:", values);
        // Call update teacher API or handle state update here
    };
    // const subjects = [
    //     { id: 1, name: "Mathematics" },
    //     { id: 2, name: "English" },
    //     { id: 3, name: "Physics" },
    // ];

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Fieldset.Root size="lg" spaceY="6">
                    <Stack>
                        <Fieldset.Legend>
                            {isUpdateMode ? "Update Teacher" : "Add Teacher"}
                        </Fieldset.Legend>
                        <Fieldset.HelperText>
                            {isUpdateMode
                                ? "Update the teacher details below."
                                : "Provide the teacher details below."}
                        </Fieldset.HelperText>
                    </Stack>

                    <HStack>
                        <Fieldset.Content>
                            <Field
                                label="First Name"
                                invalid={
                                    formik.touched.firstName &&
                                    formik.errors.firstName
                                }
                                errorText={
                                    formik.touched.firstName &&
                                    formik.errors.firstName
                                }
                            >
                                <Input
                                    name="firstName"
                                    type="text"
                                    px={2}
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Field>
                        </Fieldset.Content>
                        <Field
                            label="Middle Name"
                            error={
                                formik.touched.middleName &&
                                formik.errors.middleName
                            }
                        >
                            <Input
                                name="middleName"
                                px={2}
                                value={formik.values.middleName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Field>
                        <Field
                            label="Last Name"
                            error={
                                formik.touched.lastName &&
                                formik.errors.lastName
                            }
                        >
                            <Input
                                name="lastName"
                                px={2}
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Field>
                    </HStack>
                    <HStack>
                        <Fieldset.Content>
                            <Field
                                label="Email"
                                error={
                                    formik.touched.email && formik.errors.email
                                }
                            >
                                <Input
                                    name="email"
                                    px={2}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Field>
                            <Field label="Role">
                                <NativeSelectRoot>
                                    <NativeSelectField
                                        name="role"
                                        px={4}
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="teacher">Teacher</option>
                                        <option value="controller">
                                            Controller
                                        </option>
                                    </NativeSelectField>
                                </NativeSelectRoot>
                            </Field>
                        </Fieldset.Content>
                    </HStack>
                    <HStack>
                        {subjects?.map((subject) => (
                            <Checkbox
                                key={subject.id}
                                name="subjects"
                                // value={subject.id}
                                // checked={formik.values.subjects.includes(
                                //     subject.id
                                // )}
                                value={String(subject.id)}
                                checked={formik.values.subjects.includes(
                                    String(subject.id)
                                )}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                {subject.name}
                            </Checkbox>
                        ))}
                    </HStack>

                    <Button type="submit">
                        {isUpdateMode ? "Update" : "Add"}
                    </Button>
                </Fieldset.Root>
            </form>
        </div>
    );
};

export default TeacherForm;
