import { useFormik } from "formik";
import { Button, Fieldset, HStack, Input, Stack } from "@chakra-ui/react";
import { Field } from "../chakra-ui/field";
import * as Yup from "yup";

const StudentForm = ({ student }) => {
    const formik = useFormik({
        initialValues: {
            firstName: student?.firstName || "",
            lastName: student?.lastName || "",
            middleName: student?.middleName || "",
            email: student?.email || "",
            role: student?.role || "student",
            rollNumber: student?.rollNumber || "",
        },

        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            middleName: Yup.string(),
            email: Yup.string()
                // .email("Invalid email address")
                .required("Email is required")
                .matches(
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    "Invalid email address"
                ),
            role: Yup.string().required("Role is required").default("student"),
            rollNumber: Yup.string().required("Roll number is required"),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleSubmit = (values) => {
        console.log("Form Submitted:", values);
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Fieldset.Root size="lg" spaceY="6">
                    <Stack>
                        <Fieldset.Legend>Student Details</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Please provide the student details below.
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
                            errorText={
                                formik.touched.middleName &&
                                formik.errors.middleName
                            }
                            invalid={
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
                            errorText={
                                formik.touched.lastName &&
                                formik.errors.lastName
                            }
                            invalid={
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
                                errorText={
                                    formik.touched.email && formik.errors.email
                                }
                                invalid={
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
                        </Fieldset.Content>
                    </HStack>
                    <HStack>
                        <Field
                            label="Roll Number"
                            invalid={
                                formik.touched.rollNumber &&
                                formik.errors.rollNumber
                            }
                            errorText={
                                formik.touched.rollNumber &&
                                formik.errors.rollNumber
                            }
                        >
                            <Input
                                name="rollNumber"
                                type="text"
                                px={2}
                                value={formik.values.rollNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Field>
                    </HStack>

                    <Button type="submit">Submit</Button>
                </Fieldset.Root>
            </form>
        </div>
    );
};

export default StudentForm;
