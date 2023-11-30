import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import Navbar from "../components/Navbar";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Alert from "../utils/alert";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, loginAdmin } from "../features/userSlice";
import { vAdminLogin } from "../utils/validators";
import config from "../utils/config";
import { LoadingButton } from "@mui/lab";

export default function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector(getUserData);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: vAdminLogin,
    onSubmit: async (values) => {
      try {
        const res = await dispatch(
          loginAdmin({ ...values, email: values.email.toLowerCase() })
        ).unwrap();
        if (res.success === true)
          window.location.href = config.routes.dashboard;
      } catch (err) {
        console.error(err);
        Alert({ type: "error", message: "Something went wrong" });
      }
    },
  });

  return (
    <div className="border h-[100dvh]">
      <Navbar />
      <div className="flex justify-center items-center w-full h-full">
        <Box
          noValidate
          component="form"
          onSubmit={formik.handleSubmit}
          className="border p-3 rounded"
        >
          <DialogTitle>Login</DialogTitle>
          <Typography className="py-1 mb-4 text-gray-700 text-sm">
            Enter your username and password.
          </Typography>
          <Stack spacing={3}>
            <div className="">
              <label
                htmlFor="email"
                className="block text-[16px] font-medium  text-[#090914]"
              >
                Username
              </label>
              <TextField
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                sx={{ ".MuiInputBase-root": { height: "45px" } }}
                className="border-0 w-full text-gray-900 placeholder:text-gray-400"
                placeholder=""
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={formik.handleFocus}
                error={formik.errors.email && formik.touched.email}
                helperText={
                  formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-[16px] font-medium  text-[#090914]"
              >
                Password
              </label>
              <TextField
                sx={{ ".MuiInputBase-root": { height: "45px" } }}
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                className="border-0 w-full text-gray-900 placeholder:text-gray-400"
                placeholder=""
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={formik.handleFocus}
                error={formik.errors.password && formik.touched.password}
                helperText={
                  formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className="" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <LoadingButton
              variant="contained"
              {...{
                loading,
                sx: {
                  bgcolor: "var(--c-primary-1)",
                  "&:hover": { bgcolor: "var(--c-primary-0)" },
                },
              }}
              type="submit"
            >
              Submit
            </LoadingButton>
          </Stack>
        </Box>
      </div>
    </div>
  );
}
