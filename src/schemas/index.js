import * as Yup from "yup";

export const signUpSchema = Yup.object({
  firstname: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your Firstname"),
  lastname: Yup.string().min(2).max(25).required("Please enter your Lastname"),
  email: Yup.string().email().required("Please enter your Email ID"),
  password: Yup.string().min(6).required("Please enter your password"),
  role: Yup.string().required("Please select a role"),
  manager: Yup.string().required("Please select your manager"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email ID"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const forgotPasswordEmailSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email ID"),
});

export const resetYourPassword = Yup.object({
  password: Yup.string().min(6).required("Please enter your new password!"),
});

export const addLeadSchema = Yup.object({
  leadname: Yup.string().min(2).max(25).required("Please enter lead name"),
  company: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter lead's company name"),
  email: Yup.string().email().required("Please enter lead's Email ID"),
  status: Yup.string().ensure().required("Status is required"),
  serviceRequest: Yup.string().ensure().required("Service request is required"),
});

// confirmPassword: Yup.string()
//     .min(6)
//     .oneOf([Yup.ref("password"), null], "Password must match"),
