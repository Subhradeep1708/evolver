import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { PasswordInput } from "../../components/ui/password-input";
import { useFormik } from "formik";
import * as Yup from "yup";

const TeacherLogin = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
            console.log("Form Submitted:", values);
        },
    });

    const handleSubmit = (values) => {
        // e.preventDefault();

        console.log("Form Submitted:", values);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Fieldset.Root size="lg" maxW="md" spaceY="4">
                <Stack>
                    <Fieldset.Legend>Contact details</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Please provide your contact details below.
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Field
                        label="Email address"
                        // error={formik.touched.email && formik.errors.email}
                        invalid={formik.touched.email && formik.errors.email}
                        errorText={formik.touched.email && formik.errors.email}
                    >
                        <Input
                            name="email"
                            type="email"
                            px={2}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Field>
                </Fieldset.Content>

                <Field
                    label="Password"
                    error={formik.touched.password && formik.errors.password}
                >
                    <PasswordInput
                        name="password"
                        px={2}
                        pr={4}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p style={{ color: "red" }}>{formik.errors.password}</p>
                    )}
                </Field>

                <Button type="submit" alignSelf="flex-start" p={4} size="lg">
                    Submit
                </Button>
            </Fieldset.Root>
        </form>
    );
};

export default TeacherLogin;
