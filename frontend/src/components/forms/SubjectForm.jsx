import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Field } from "../chakra-ui/field";

const SubjectForm = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
            console.log(values);
        },
    });

    const handleSubmit = (values) => {
        console.log(values);
        // clear the form
        formik.resetForm();
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Fieldset.Root w={"full"} size="lg" spaceY="6">
                    <Stack>
                        <Fieldset.Legend>Subject</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Please provide your subject details below.
                        </Fieldset.HelperText>
                    </Stack>
                    {/* <HStack></HStack> */}
                    <Fieldset.Content>
                        <Field
                            label="Name"
                            invalid={formik.errors.name && formik.touched.name}
                            errorText={
                                formik.errors.name && formik.touched.name
                            }
                            w={"full"}
                        >
                            <Input
                                placeholder="Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                px={4}
                                w={"full"}
                            />
                        </Field>
                        <Field
                            label="Description"
                            id="description"
                            invalid={
                                formik.errors.description &&
                                formik.touched.description
                            }
                            errorText={
                                formik.errors.description &&
                                formik.touched.description
                            }
                            w={"full"}
                        >
                            <Input
                                placeholder="Description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                px={4}
                                w={"full"}
                            />
                        </Field>
                    </Fieldset.Content>
                    <Button type="submit">Submit</Button>
                </Fieldset.Root>
            </form>
        </div>
    );
};
export default SubjectForm;
