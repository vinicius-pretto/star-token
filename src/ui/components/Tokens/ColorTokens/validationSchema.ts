import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Required")
    .max(48, "Maximum 48 characters")
    .matches(
      /^[a-zA-Z]{1,1}[a-zA-Z0-9\-\_]*$/,
      "Must start with a letter and contain only letters, numbers, hyphens (-), and underscores (_)"
    ),
  value: yup.string().required("Required"),
});

export default validationSchema;
