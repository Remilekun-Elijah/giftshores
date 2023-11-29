import * as Yup from "yup";

const lettersRegex = /^[A-Za-z\s{2,}]+$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/gi;

const email = Yup.string()
    .required("Email Address is required")
    .email("Email Address is invalid")
    .matches(emailRegex, "Email Address is invalid"),
  firstName = Yup.string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters")
    .max(30, "First Name must be less than 30 characters")
    .matches(lettersRegex, "cannot contain numbers and special characters"),
  lastName = Yup.string()
    .required("Last Name is required")
    .min(3, "Last Name must be at least 3 characters")
    .max(30, "Last Name must be less than 30 characters")
    .matches(lettersRegex, "cannot contain numbers and special characters"),
  password = Yup.string().required("Password is required");

export const vCreateUser = Yup.object({
  firstName,
  lastName,
  email,
  country: Yup.string().required("Country is required"),
  gender: Yup.string().required("Gender is required"),
  purpose: Yup.string().required("Purpose of Gift is required"),
  others: Yup.string().required("Others is required"),
});

export const vAdminLogin = Yup.object({
  email: Yup.string().required("Username is required"),
  password,
});
