import { useFormik } from 'formik';
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import * as Yup from "yup";
import { Checkbox } from '../../components/ui/checkbox';

const TeacherForm = () => {

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      role: "teacher",
      isController: false,
      subjects: [],
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      middleName: Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")

      ,
      role: Yup.string().required("Role is required").default("teacher"),
      isController: Yup.boolean().required("Controller is required").default(false),
      subjects: Yup.array().required("Subjects is required").min(1),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
      console.log("Form Submitted:", values);
    },
  });

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div>

      <form onSubmit={formik.handleSubmit}>
        <Fieldset.Root size="lg" maxW="md" spaceY="4">
          <Stack>
            <Fieldset.Legend>Teacher details</Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide your teacher details below.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field
              label="First Name"
              // error={formik.touched.email && formik.errors.email}
              invalid={formik.touched.firstName && formik.errors.firstName}
              errorText={formik.touched.firstName && formik.errors.firstName}
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
            label="Last Name"
            error={formik.touched.lastName && formik.errors.lastName}
          >
            <Input
              name="lastName"
              px={2}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Field>
          <Field
            label="Middle Name"
            error={formik.touched.middleName && formik.errors.middleName}
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
            label="Email"
            error={formik.touched.email && formik.errors.email}
          >
            <Input
              name="email"
              px={2}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Field>
          <Field
            label="Role"
            error={formik.touched.role && formik.errors.role}
          >
            <Input
              name="role"
              px={2}
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Field>
          <Field
            label="Controller"
            error={formik.touched.isController && formik.errors.isController}
          >
            <Input
              name="isController"
              px={2}
              value={formik.values.isController}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Field>

          {/* <Input
              name="subjects"
              px={2}
              value={formik.values.subjects}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            /> */}
          <Checkbox name="subjects" value="DSA" checked={formik.values.subjects.includes('DSA')} onChange={formik.handleChange} onBlur={formik.handleBlur}>DSA</Checkbox>
          <Checkbox name="subjects" value="COA" checked={formik.values.subjects.includes('COA')} onChange={formik.handleChange} onBlur={formik.handleBlur}>COA</Checkbox>
          <Checkbox name="subjects" value="English" checked={formik.values.subjects.includes('English')} onChange={formik.handleChange} onBlur={formik.handleBlur}>English</Checkbox>
          <Checkbox name="subjects" value="DBMS" checked={formik.values.subjects.includes('DBMS')} onChange={formik.handleChange} onBlur={formik.handleBlur}>DBMS</Checkbox>
          <Checkbox name="subjects" value="ENVS" checked={formik.values.subjects.includes('ENVS')} onChange={formik.handleChange} onBlur={formik.handleBlur}>ENVS</Checkbox>

          <Button type="submit">Submit</Button>
        </Fieldset.Root>
      </form>
    </div>
  )
}

export default TeacherForm
