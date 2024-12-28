import { Fieldset, Input, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Field } from "../ui/field";

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
    };

    return (
        <VStack w={"full"} spacing={4}>
            <form onSubmit={formik.handleSubmit}>
                <Fieldset.Root id="fieldset" w={"full"} size="lg" spaceY="6">
                    <VStack>
                        <Fieldset.Legend>Subject</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Please provide your subject details below.
                        </Fieldset.HelperText>
                    </VStack>
                    <Fieldset.Content>
                        <Field
                            label="Name"
                            id="name"
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
                </Fieldset.Root>
            </form>
        </VStack>
    );
};
export default SubjectForm;
