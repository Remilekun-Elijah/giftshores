import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Textarea } from "@material-tailwind/react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Navbar from "../components/Navbar";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import SendIcon from "@mui/icons-material/Send";
import { vCreateUser } from "../utils/validators";
import { useDispatch, useSelector } from "react-redux";
import {
  createGift,
  createUser,
  getUserData,
  sendGift,
  sendToWhatsapp,
} from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import countries from "../utils/countries";
import config from "../utils/config";
import { purposeList } from "../utils/helper";

const steps = [
  "Select master blaster campaign settings",
  "Create an ad group",
  "Create an ad",
];

const GiftList = () => {
  let { payload, loading, modalLoading } = useSelector(getUserData),
    navigate = useNavigate(),
    payload_t = {};

  Array(10)
    .fill("name")
    .map((name, i) => name + "_" + i)
    .map((name) => (payload_t[name] = ""));

  const [model1, setModel1] = useState(payload_t);

  const dispatch = useDispatch(),
    [step, setStep] = useState(0),
    {
      values,
      handleBlur,
      handleChange,
      handleFocus,
      handleSubmit,
      errors,
      setValues,
      touched,
    } = useFormik({
      validationSchema: vCreateUser,
      initialValues: payload,
      // eslint-disable-next-line no-unused-vars
      onSubmit: async ({ purpose, others, ...values }) => {
        const res = await dispatch(createUser(values)).unwrap();
        res.success && setStep(step + 1);
      },
    });

  const responsiveCss = {
    flexDirection: { sm: "row", sx: "column" },
    maxWidth: { lg: "80%", md: "90%", sm: "95%", xs: "100%" },
    maxHeight: { xl: "95%", lg: "100%", md: "90%", sm: "90%" },
    // height: { sm: "20px" },
  };

  const handleChange2 = ({ target: { name, value } }) => {
      setModel1((state) => ({ ...state, [name]: value }));
    },
    submit = async (e) => {
      e.preventDefault();
      if (step === 1) {
        const res = await dispatch(
          createGift({
            gifts: Object.values(model1).filter(Boolean),
            purpose:
              values.purpose.toLowerCase() === "others"
                ? values.others
                : values.purpose,
          })
        ).unwrap();

        res?.success && setStep(step + 1);
      } else {
        const res = await dispatch(
          sendGift({ recipients: values.recipients })
        ).unwrap();

        if (res?.success) {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    };

  const formattedList = Object.values(model1)
    ?.filter(Boolean)
    .map((n, i) => `${i + 1}. ${n}\r\n`);
  let message = `
Hi there,\n

Great news! ${values.firstName} ${
    values.lastName
  } has just shared a fantastic wishlist for their ${
    values.purpose.toLowerCase() === "others" ? values.others : values.purpose
  }, and we thought you might want to join in on the fun.\n

Check out their list: \r\n
${formattedList.join("")}
\n
Ready to create your own wishlist and spread the joy? Head over to ${
    config.frontendUrl
  } and start crafting your perfect wishlist to share with family and friends.
\r\n
Happy gifting! \n
Giftshores
`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    message
  )}`;

  const btnGroped = (
    <>
      <LoadingButton
        startIcon={<WestIcon />}
        variant="text"
        loading={false}
        sx={{
          height: "2.3rem",
          alignItems: "center",
          px: "1em",
          fontSize: "semibold",
          color: "white",
          background: "#333",
        }}
        onClick={() => setStep(step - 1)}
      >
        {" "}
        Previous{" "}
      </LoadingButton>

      <LoadingButton
        {...{ loading }}
        endIcon={<EastIcon />}
        variant="text"
        type="submit"
        disabled={!Object.values(model1).filter(Boolean).length}
        sx={{
          height: "2.3rem",
          alignItems: "center",
          px: "1em",
          fontSize: "semibold",
          color: "white",
          background: "linear-gradient(to right, purple, #E491E8)",
        }}
      >
        {" "}
        Next{" "}
      </LoadingButton>
    </>
  );

  const handleShare = async () => {
    const res = await dispatch(sendToWhatsapp({ url: whatsappUrl })).unwrap();

    if (res?.success) {
      window.innerWidth > 740
        ? open(whatsappUrl, "#openWhatsapp", "popup=1")
        : (window.location.href = whatsappUrl);
    }
  };
  return (
    <div className="md:h-screen bg-[#eee]">
      <Navbar />
      <div className="flex justify-center items-center h-full md:mt-18 my-16">
        <Box
          className="img h-full flex flex-col  md:shadow-xl"
          sx={responsiveCss}
        >
          <img
            className="md:h-full h-[70%] w-ful max-w-[400px] lg:w-full md:w-[40%] md:inline-block hidden"
            src="./slide_2.jpg"
            alt=""
          />
          <Box className="h-full w-full py-5 flex flex-col pt-10 max-w-[800px] bg-white">
            <h1 className="text-center text-3xl uppercase font-[600] mb-5">
              Gift Shores
            </h1>

            <Stepper activeStep={step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel className="hidden inv">{}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {step === 2 && (
              <div className="px-10 mt-2">
                <div className="flex justify-center my-5">
                  <LoadingButton
                    sx={{
                      ".MuiLoadingButton-loadingIndicatorCenter": {
                        color: "#fff !important",
                      },
                      background:
                        "linear-gradient(to right, darkgreen, #0DE815)",
                    }}
                    loading={modalLoading}
                    className="z-10"
                    variant="contained"
                    color="success"
                    onClick={handleShare}
                    size="small"
                  >
                    <Avatar src="./whatsapp.png" /> Share on WhatsApp
                  </LoadingButton>
                </div>
                <Divider>OR</Divider>
              </div>
            )}
            <h2 className="text-2xl text-center mt-5 mb-8">
              {step === 0
                ? "Fill the form to proceed"
                : step === 1
                ? "Enter your gift names"
                : "Enter email address of your friends, colleagues and family"}
            </h2>

            <div className={`relative ${step === 1 && "md:overflow-y-aut"}`}>
              {/* STEP 1 */}
              <Box
                noValidate
                component="form"
                className={`grid lg:grid-cols-2 gap-10 m-auto transition-opacity px-10 w-full ${
                  step === 0
                    ? "z-40 opacity-100"
                    : `z-0 opacity-0 ${step === 2 && "sm:block hidden"}`
                }`}
                onSubmit={handleSubmit}
              >
                <FormControl className="w-full border-none lg:mt-5">
                  <TextField
                    className="w-full z-10 bg-[rgba(255,255,255,.5)]"
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    variant="standard"
                    value={values.firstName}
                    required
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.firstName && touched.firstName}
                    helperText={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : ""
                    }
                  />
                </FormControl>
                {step === 0 && (
                  <>
                    <FormControl className="w-full border-none lg:mt-5">
                      <TextField
                        className="w-full z-10 bg-[rgba(255,255,255,.5)]"
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        variant="standard"
                        value={values.lastName}
                        required
                        onFocus={handleFocus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.lastName && touched.lastName}
                        helperText={
                          errors.lastName && touched.lastName
                            ? errors.lastName
                            : ""
                        }
                      />
                    </FormControl>

                    <FormControl className="w-full border-none lg:mt-5">
                      <TextField
                        className="w-full z-10 bg-[rgba(255,255,255,.5)]"
                        id="email"
                        label="Email Address"
                        name="email"
                        variant="standard"
                        value={values.email}
                        required
                        onFocus={handleFocus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email && touched.email}
                        helperText={
                          errors.email && touched.email ? errors.email : ""
                        }
                      />
                    </FormControl>

                    <FormControl
                      className="w-full border lg:mt-5 z-10 bg-[rgba(255,255,255,.5)]"
                      variant="standard"
                    >
                      <InputLabel id="country">Country</InputLabel>
                      <Select
                        labelId="country"
                        id="country"
                        name="country"
                        onFocus={handleFocus}
                        value={values.country}
                        onChange={handleChange}
                        label="country"
                        onBlur={handleBlur}
                        error={errors.country && touched.country}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {countries.map((name, i) => (
                          <MenuItem key={i} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>

                      {errors.country && touched.country && (
                        <FormHelperText
                          variant="standard"
                          error={errors.country && touched.country}
                          className="py-1 bg-[#F8FAFC] text-[0.75rem] px-[14px] leading-[1.66] font-normal"
                        >
                          {errors.country}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </>
                )}

                <FormControl
                  className="w-full border lg:mt-5 z-10 bg-[rgba(255,255,255,.5)]"
                  variant="standard"
                >
                  <InputLabel id="purpose">Purpose</InputLabel>
                  <Select
                    labelId="purpose"
                    id="purpose"
                    name="purpose"
                    onFocus={handleFocus}
                    value={values.purpose}
                    onChange={(e) => {
                      if (e.target.value.toLowerCase() === "others") {
                        setValues({ ...values, others: "" });
                      } else setValues({ ...values, others: "none" });
                      handleChange(e);
                    }}
                    label="purpose"
                    onBlur={handleBlur}
                    error={errors.purpose && touched.purpose}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {purposeList.map((name, i) => (
                      <MenuItem key={i} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>

                  {errors.purpose && touched.purpose && (
                    <FormHelperText
                      variant="standard"
                      error={errors.purpose && touched.purpose}
                      className="py-1 bg-[#F8FAFC] text-[0.75rem] px-[14px] leading-[1.66] font-normal"
                    >
                      {errors.purpose}
                    </FormHelperText>
                  )}
                </FormControl>

                {values.purpose.toLowerCase() === "others" && (
                  <FormControl className="w-full border-none lg:mt-5">
                    <TextField
                      className="w-full z-10 bg-[rgba(255,255,255,.5)]"
                      id="others"
                      label="Others"
                      name="others"
                      variant="standard"
                      value={values.others}
                      required
                      placeholder="Enter other purpose"
                      onFocus={handleFocus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.others && touched.others}
                      helperText={
                        errors.others && touched.others ? errors.others : ""
                      }
                    />
                  </FormControl>
                )}

                <FormControl className="z-10 w-full">
                  <FormLabel id="gender">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    value={values?.gender}
                    name="gender"
                  >
                    <FormControlLabel
                      value="male"
                      onChange={handleChange}
                      control={<Radio id="gender" value={"male"} />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      onChange={handleChange}
                      control={<Radio id="gender" value={"female"} />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="non-binary"
                      onChange={handleChange}
                      control={<Radio id="gender" value={"non-binary"} />}
                      label="Non-binary"
                    />
                  </RadioGroup>
                  {errors.gender && touched.gender && (
                    <FormHelperText
                      variant="standard"
                      error={errors.gender && touched.gender}
                      className="py-1 bg-[#F8FAFC] text-[0.75rem] px-[14px] leading-[1.66] font-normal"
                    >
                      {errors.gender}
                    </FormHelperText>
                  )}
                </FormControl>
                <LoadingButton
                  {...{ loading }}
                  endIcon={<EastIcon />}
                  variant="text"
                  type="submit"
                  sx={{
                    ".MuiLoadingButton-loadingIndicatorCenter": {
                      color: "#fff !important",
                    },
                    // mt: "1em",
                    height: "2.3rem",
                    alignItems: "center",
                    px: "1em",
                    fontSize: "semibold",
                    color: "white",
                    background: "linear-gradient(to right, purple, #E491E8)",
                  }}
                >
                  {" "}
                  Next{" "}
                </LoadingButton>
              </Box>

              {/* STEP 2 */}
              <Box
                noValidate
                component="form"
                onSubmit={submit}
                className={`grid items-center lg:grid-cols-3 transition-opacity px-10 absolute top-0 gap-10 m-auto w-full  ${
                  step === 1 ? "opacity-100 z-40" : "opacity-0 z-0 hidden"
                }`}
              >
                {Array(10)
                  .fill("")
                  .map((_, i) => {
                    const name = `name_${i}`;

                    return (
                      <FormControl
                        key={i}
                        className="w-full border-none lg:mt-5"
                      >
                        <TextField
                          className="w-full z-10 bg-[rgba(255,255,255,.5)]"
                          id={name}
                          label={`Gift ${i + 1}`}
                          name={name}
                          variant="standard"
                          value={model1[name]}
                          onChange={handleChange2}
                        />
                      </FormControl>
                    );
                  })}
                <Button
                  startIcon={<WestIcon />}
                  variant="text"
                  className="__btn_res"
                  sx={{
                    height: "2.3rem",
                    alignItems: "center",
                    px: "1em",
                    fontSize: "semibold",
                    color: "white",
                    background: "#333",
                  }}
                  onClick={() => setStep(step - 1)}
                >
                  {" "}
                  Previous{" "}
                </Button>

                <LoadingButton
                  {...{ loading }}
                  className="__btn_res text-white"
                  endIcon={<EastIcon />}
                  variant="text"
                  type="submit"
                  disabled={!Object.values(model1).filter(Boolean).length}
                  style={{}}
                  sx={{
                    ".MuiLoadingButton-loadingIndicatorCenter": {
                      color: "#fff !important",
                    },
                    height: "2.3rem",
                    alignItems: "center",
                    px: "1em",
                    fontSize: "semibold",
                    color: "#fff",
                    background: "linear-gradient(to right, purple, #E491E8)",
                  }}
                >
                  {" "}
                  Next{" "}
                </LoadingButton>

                <div className="md:hidden hidden"></div>
                <div className="md:hidden flex justify-between my-5">
                  {btnGroped}
                </div>
              </Box>

              {/* STEP 3 */}
              <Box
                noValidate
                component="form"
                onSubmit={submit}
                className={` transition-opacity px-10 absolute top-0 gap-10 m-auto w-full  ${
                  step === 2 ? "opacity-100 z-40" : "opacity-0 z-0 hidden"
                }`}
              >
                <FormControl className="w-full lg:mt-5 z-10 bg-[rgba(255,255,255,.5)]">
                  <Textarea
                    placeholder="Receivers email addresses separated by comma..."
                    name="recipients"
                    id="recipients"
                    value={values?.recipients}
                    {...{
                      onChange: handleChange,
                      onBlur: handleBlur,
                      onFocus: handleFocus,
                    }}
                    rows="5"
                    className="w-full  border border-purple-800 outline-none p-1 resize-none bg-[rgba(255,255,255,.5)] h-full"
                    error={errors.recipients && touched.recipients}
                    color={errors.recipients && touched.recipients && "red"}
                    variant="standard"
                    cols={40}
                    size="lg"
                  />
                  {errors.recipients && touched.recipients && (
                    <FormHelperText
                      variant="standard"
                      error={errors.recipients && touched.recipients}
                      className="py-1 bg-[#F8FAFC] text-[0.75rem] px-[14px] leading-[1.66] font-normal"
                    >
                      {errors.recipients}
                    </FormHelperText>
                  )}
                </FormControl>
                <div></div>
                <div className="flex justify-around mb-5">
                  <LoadingButton
                    startIcon={<WestIcon />}
                    variant="text"
                    loading={false}
                    className="z-10"
                    sx={{
                      height: "2.3rem",
                      alignItems: "center",
                      px: "1em",
                      fontSize: "semibold",
                      color: "white",
                      background: "#333",
                    }}
                    onClick={() => setStep(step - 1)}
                  >
                    {" "}
                    Previous{" "}
                  </LoadingButton>

                  <LoadingButton
                    {...{ loading }}
                    endIcon={<SendIcon />}
                    type="submit"
                    variant="text"
                    className="z-10"
                    sx={{
                      ".MuiLoadingButton-loadingIndicatorCenter": {
                        color: "#fff !important",
                      },
                      height: "2.3rem",
                      alignItems: "center",
                      px: "1em",
                      fontSize: "semibold",
                      color: "white",
                      background: "linear-gradient(to right, purple, #E491E8)",
                    }}
                  >
                    {" "}
                    Send To mail{" "}
                  </LoadingButton>
                </div>
              </Box>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default GiftList;
