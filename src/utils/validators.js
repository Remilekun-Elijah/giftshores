import * as Yup from "yup";

const lettersRegex = /^[A-Za-z\s{2,}]+$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/gi;
const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
const numberRegex = /^[0-9]+$/;

const email = Yup.string()
    .required("Email Address is required")
    .email("Email Address is invalid")
    .matches(emailRegex, "Email Address is invalid"),
  phoneNumber = Yup.string()
    .required("Phone Number is required")
    .min(11, "Phone Number must be at least 11 characters")
    .max(15, "Phone Number must be less than 15 characters"),
  fullName = Yup.string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters")
    .max(30, "First Name must be less than 30 characters")
    .matches(lettersRegex, "cannot contain numbers and special characters"),
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
  employeeId = Yup.string()
    .required("Employee ID is required")
    .min(3, "Employee ID must be at least 3 characters")
    .max(30, "Employee ID must be less than 30 characters"),
  password = Yup.string().required("Password is required");
//  .min(8, 'Password must be at least 8 characters long').max(16, 'Password must be less than 16 characters').matches()

export const vCreateUser = Yup.object({
  firstName,
  lastName,
  email,
  country: Yup.string().required("Country is required"),
  gender: Yup.string().required("Gender is required"),
  purpose: Yup.string().required("Purpose of Gift is required"),
});

export const vendorForm = Yup.object({
  comment: Yup.string()
    .min(3, "Vendor's Comment must be at least 3 characters")
    .max(500, "Vendor's Comment must be less than 500 characters"),
  landmark: Yup.string().required("Proof of Residence/Landmark is required"),
  addressDescription: Yup.string()
    .min(3, "must be at least 3 characters")
    .required("Address Description is required"),
  status: Yup.string().required("Job Status is required"),
});

export const solicitorForm = Yup.object({
  comment: Yup.string()
    .min(3, "Vendor's Comment must be at least 3 characters")
    .max(500, "Vendor's Comment must be less than 500 characters"),
  // landmark: Yup.string().required("Proof of Residence/Landmark is required"),
  // addressDescription: Yup.string().min(3, 'must be at least 3 characters').required('Address Description is required'),
  status: Yup.string().required("Job Status is required"),
});

export const vrejectReassign = Yup.object({
  comment: Yup.string()
    .min(3, "Rejection Comment must be at least 3 characters")
    .max(800, "Rejection Comment must be less than 800 characters")
    .required("Rejection Comment is required"),
});

export const vRejectAndReassign = Yup.object({
  newVendorId: Yup.string().required("To Vendor is required"),
  updatedAddress: Yup.string().nullable(),
});

export const vcreateV = Yup.object({
  firstName,
  lastName,
  email,
  vendorPreferredName: Yup.string().nullable(),
  companyName: Yup.string().required("Company Name is required"),
  accountNumber: Yup.string()
    .required("Account Number is required")
    .min(10, "Account Number cannot be less than 10 digits")
    .max(10, "Account Number cannot be more than 10 digits")
    .matches(numberRegex, "Invalid Account Number")
    .nullable(),
  stateIds: Yup.array(Yup.string().required("State Covered is required")),
});

export const vcreateEmployee = Yup.object({
  firstName,
  lastName,
  email,
  employeeId,
  branchId: Yup.string().required("Branch Name is required"),
});

export const vNewAddress = Yup.object({
  newAddress: Yup.string().required("Address is required"),
});

export const userLogin = Yup.object({
  email,
  password,
});

export const userForgotPassword = Yup.object({
  email,
});

export const userResetPassword = Yup.object({
  password: password.matches(
    passwordRegex,
    "New Password must contain at least 1 of the following characters; uppercase, lowercase, numbers and special characters"
  ),
});
