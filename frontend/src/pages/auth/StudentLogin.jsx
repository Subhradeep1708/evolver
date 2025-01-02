import {
    Box,
    Button,
    Fieldset,
    Input,
    Link,
    Span,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { InputGroup } from "../../components/ui/input-group";
import { LuUser } from "react-icons/lu";
import { PasswordInput } from "../../components/ui/password-input";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { routes } from "../../utils/constants";
import UserContext, { UserProvider } from "../../contexts/userContext";
import { useNavigate } from "react-router";

const StudentLogin = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

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

    const handleSubmit = async (values) => {
        const response = await axios.post(routes.studentLogin, values, {
            withCredentials: true,
        });
        if (response.status === 200) {
            const data = response.data.data;
            console.log("id", response.data.data.id);
            console.log("role", response.data.data.role);

            setUser({
                id: data.id,
                role: data.role,
            });
            console.log("Form Submitted:", response);
            navigate("/dashboard");
        } else {
            console.log("Error:", response);
        }
    };

    return (
        <UserProvider>
            <form onSubmit={formik.handleSubmit}>
                <Fieldset.Root size="lg" maxW="md" spaceY="4">
                    <Stack>
                        <Fieldset.Legend>Student Login</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Please enter your login details below.
                        </Fieldset.HelperText>
                    </Stack>

                    <Fieldset.Content>
                        <Field
                            label="Email Address"
                            invalid={
                                formik.touched.email && formik.errors.email
                            }
                            errorText={
                                formik.touched.email && formik.errors.email
                            }
                        >
                            <Input
                                name="email"
                                w="100%"
                                placeholder="example@email.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Field>
                    </Fieldset.Content>

                    <Field
                        label="Password"
                        invalid={
                            formik.touched.password && formik.errors.password
                        }
                        errorText={
                            formik.touched.password && formik.errors.password
                        }
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
                            <p style={{ color: "red" }}>
                                {formik.errors.password}
                            </p>
                        )}
                    </Field>

                    <Link
                        href="/forgot-password"
                        fontSize="sm"
                        color="gray.500"
                    >
                        Forgot Password?
                    </Link>

                    <Button
                        type="submit"
                        alignSelf="flex-start"
                        p={4}
                        size="lg"
                    >
                        Login
                    </Button>
                </Fieldset.Root>
            </form>
        </UserProvider>
    );
};

export default StudentLogin;
