import {
  Container,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
  FormGroup,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { adminAddCoupoun } from "./AdminStyles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import UserAvatar from "../../../assets/images/User.png";
import { useForm, Controller } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useLocation } from "react-router-dom";
import gomytripclient from "../../../GomytripClient";
import { convertDateStr } from "../Buses/BusModuleHelperFunctions";
import { enqueueSnackbar } from "notistack";
import { handleNumInput } from "../Buses/BusModuleHelperFunctions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingButton from "@mui/lab/LoadingButton";
import BusesPageBackDrop from "../Buses/BusesPageBackDrop";

const AdminAddNewCoupons = () => {
  // react hook form
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();
  const adminCoupoun = adminAddCoupoun();

  const [error, setError] = useState("");
  const coupounCodeRef = useRef(null);

  const coupounCodeNameRef = useRef(null);
  // ------------------------------------ Coupouns type users------------------------------------//
  const [typeOfUsers, setTypeOfUsers] = useState(0);
  const handleUserTypeForCoupoun = (e) => {
    setTypeOfUsers(e.target.value);
  };
  const [usersList, setUsersList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const navigate = useNavigate();
  const [quillValue, setQuillValue] = useState(null);
  useEffect(() => {
    if (typeOfUsers == 1 || typeOfUsers == 2) {
      getUserList();
    }
  }, [typeOfUsers]);

  const getUserList = (ev) => {
    let stringSearch = ev?.target?.value || "";
    gomytripclient
      .post(typeOfUsers == 1 ? "/getUsers" : "/getTopUsers", {
        searchString: stringSearch,
        pageNumber: 1,
        pageSize: 100,
      })
      .then((res) => {
        if (res.data.status === 1 && res.data.data.length > 0) {
          setUsersList(res.data.data);
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
          setUsersList([]);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ------------------------------------ Coupouns type users------------------------------------//

  // ------------------------------------ IMAGE------------------------------------//
  const [coupounImage, setCoupounImage] = useState({
    file: "",
    imagePreview: "",
  });

  const handleCoupounImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (allowedTypes.includes(file.type)) {
        let urlObj = URL.createObjectURL(file);
        setCoupounImage(file);
        setCoupounImage({ file: file, imagePreview: urlObj });

        setError("");
      } else {
        enqueueSnackbar(
          "Invalid file type. Please select a JPEG or PNG image.",
          { variant: "error" }
        );
        setCoupounImage({ file: "", imagePreview: "" });
        setError("Invalid file type. Please select a JPEG or PNG image.");
      }
    }
  };
  // ------------------------------------ IMAGE------------------------------------//

  // ------------------------------------ coupounType------------------------------------//
  const [coupounType, setCoupounType] = useState([]);
  // console.log(coupounType,'coupounType')
  const handleCoupounTypeChange = (event) => {
    let checkValue = parseInt(event.target.value);
    let allCheckValues = coupounType;
    if (event.target.checked) {
      if (checkValue === 0 || allCheckValues.length >= 2) {
        setCoupounType([0]);
      } else {
        setCoupounType([...allCheckValues, checkValue]);
      }
    } else {
      setCoupounType((pre) => pre.filter((data, index) => checkValue != data));
    }
  };
  // ------------------------------------ coupounType------------------------------------//

  // ------------------------------------ start date------------------------------------//
  const [selectedStartDate, setSelectedStartDate] = useState(null); //new Date()
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  // ------------------------------------ start date------------------------------------//

  // ------------------------------------ selectedEndDate------------------------------------//
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  // ------------------------------------ selectedEndDate------------------------------------//

  // ------------------------------------ discountType------------------------------------//
  const [discountType, setDiscountType] = useState(1);
  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
    setValue("discountNumber", "");
  };
  // ------------------------------------ discountType------------------------------------//

  const coupounModuleArray = [
    "Entire Module",
    "Plane Module",
    "Hotels Module",
    "Bus Module",
  ];

  // ------------------------------------ submitForm------------------------------------//

  const submitForm = (formData) => {
    const currentDate = new Date();
    if (new Date(selectedStartDate) < currentDate || new Date(selectedEndDate) < currentDate) {
      enqueueSnackbar('Cannot add coupouns for past Date and time', { variant: 'error' })
      return false
    }
    if (quillValue == null) {
      enqueueSnackbar("Enter terms and conditions to continue", {
        variant: "error",
      });
      return;
    }
    if (coupounImage.file) {
      setError("");
    } else {
      enqueueSnackbar("Upload coupon Image", { variant: "error" });
      setCoupounImage({ file: "", imagePreview: "" });
      setError("Invalid file type. Please select a JPEG or PNG image.");
      return;
    }
    setLoading(true)
    let payloadData = new FormData();
    payloadData.append("user_type", typeOfUsers);
    payloadData.append("files", coupounImage.file);
    payloadData.append("module", JSON.stringify(coupounType));
    payloadData.append("coupon_code", formData.coupounCode);
    payloadData.append("coupon_name", formData.coupounCodeName);
    payloadData.append("heading", formData.coupounHeading);
    payloadData.append("description", formData.coupounDescription);
    payloadData.append("start_date", new Date(selectedStartDate).toISOString());
    payloadData.append("end_date", new Date(selectedEndDate).toISOString());
    payloadData.append("discount_type", formData.discountType);
    payloadData.append("discount_value", formData.discountNumber);
    payloadData.append("min_amount", formData.minimunAmount);
    payloadData.append("tc", quillValue);
    payloadData.append("user_list", JSON.stringify(selectedUsers));

    gomytripclient
      .post("/addAdminCoupon", payloadData)
      .then((resp) => {
        if (resp.data.status === 1) {
          enqueueSnackbar(resp.data.message, { variant: "success" });
          reset();
          setCoupounType([]);
          setCoupounImage({ file: "", imagePreview: "" });
          setSelectedStartDate(null);
          setSelectedEndDate(null);
          setSelectedUsers([]);
          setLoading(false)
        } else {
          enqueueSnackbar(resp.data.message, { variant: "error" });
          coupounCodeRef.current.focus();
          setLoading(false)
        }
        console.log(resp);
      })
      .catch((err) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(err);
        setLoading(false)
      });
  };

  const handleCoupounValiadtion = (e, typeOf) => {
    let validPayload = { type: typeOf, value: e.target.value };

    gomytripclient
      .post("validateAdminCoupon", validPayload)
      .then((res) => {
        if (res.data.status === 1) {
          document.getElementById("codeErr").textContent = "";
          document.getElementById("nameErr").textContent = "";
        } else if (res.data.status === 0 && typeOf === 1) {
          coupounCodeRef.current.focus(null);
          document.getElementById(
            "codeErr"
          ).textContent = `${e.target.value} coupoun Code Already Exists`;
        } else if (res.data.status === 0 && typeOf === 2) {
          coupounCodeNameRef.current.focus(null);
          document.getElementById(
            "nameErr"
          ).textContent = `${e.target.value} coupoun Name Already Exists`;
        } else {
          document.getElementById("codeErr").textContent = "";
          document.getElementById("nameErr").textContent = "";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUsersSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers((pre) => pre.filter((data) => userId != data));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
    console.log(userId);
  };

  return (
    <>
      <Box>
        {error && (
          <Alert variant="outlined" severity="error">
            {error}
          </Alert>
        )}
        <BusesPageBackDrop open={loading} />
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Paper elevation={2} sx={{ borderRadius: "10px", padding: "10px" }}>
              <h5>Add New Coupons</h5>
              <Stack item>
                <FormControl className={adminCoupoun.groupRadio}>
                  <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={typeOfUsers}
                    onChange={handleUserTypeForCoupoun}
                  >
                    <FormControlLabel
                      className="c-p"
                      value="0"
                      control={<Radio />}
                      label="All Users"
                    />
                    <FormControlLabel
                      className="c-p"
                      value="1"
                      control={<Radio />}
                      label="Specific Users"
                    />
                    <FormControlLabel
                      className="c-p"
                      value="2"
                      control={<Radio />}
                      label="Top Users"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
              <form onSubmit={handleSubmit(submitForm)}>
                <Grid container p={1} spacing={2}>
                  <Grid item md={6}>
                    <Grid container flexDirection={"column"} spacing={2}>
                      <Grid item>
                        {!coupounImage.imagePreview && (
                          <label htmlFor="fileInput">
                            <input
                              accept="image/*"
                              onChange={(e) => handleCoupounImage(e)}
                              type="file"
                              id="fileInput"
                              style={{ display: "none" }}
                            />
                            <Stack
                              className={adminCoupoun.inputFile}
                              justifyContent={"center"}
                              alignItems={"center"}
                            >
                              <FileUploadOutlinedIcon
                                fontSize="large"
                                className="c-p"
                              />
                              <p className="c-p">Upload File</p>
                            </Stack>
                          </label>
                        )}
                        {coupounImage.imagePreview && (
                          <span style={{ margin: "10px 0" }}>
                            <img
                              width={"320px"}
                              height={"150px"}
                              src={coupounImage.imagePreview}
                              alt="Preview"
                            />
                          </span>
                        )}
                        {coupounImage?.file.name && (
                          <Stack
                            flexDirection={"row"}
                            justifyContent={"space-around"}
                            alignItems={"center"}
                            className={adminCoupoun.uploadedImgDetails}
                          >
                            <span>{coupounImage?.file.name}</span>
                            <IconButton
                              onClick={() =>
                                setCoupounImage({ file: "", imagePreview: "" })
                              }
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Stack>
                        )}
                        <Divider />
                      </Grid>
                      <Grid item>
                        <FormControl
                          sx={{ m: 0 }}
                          component="fieldset"
                          variant="standard"
                        >
                          <FormLabel component="legend">
                            Coupoun Module Type
                          </FormLabel>
                          <FormGroup
                            sx={{ flexDirection: "initial" }}
                            {...register("coupounModuleType", {
                              required: {
                                value: coupounType?.length === 0,
                                message: "Select Module type for Coupoun",
                              },
                            })}
                          >
                            {coupounModuleArray.map((data, i) => (
                              <FormControlLabel
                                key={i}
                                control={
                                  <Checkbox
                                    checked={coupounType.includes(i)}
                                    onChange={handleCoupounTypeChange}
                                    value={i}
                                    name={data}
                                    disabled={i != 0 && coupounType.includes(0)}
                                  />
                                }
                                label={data}
                              />
                            ))}
                          </FormGroup>
                        </FormControl>
                        {errors.coupounModuleType && (
                          <span className="goAdminErrorMessages">
                            {errors.coupounModuleType.message}
                          </span>
                        )}
                      </Grid>
                      <Grid item>
                        <TextField
                          inputRef={coupounCodeRef}
                          onKeyUp={(e) => handleCoupounValiadtion(e, 1)}
                          {...register("coupounCode", {
                            required: {
                              value: true,
                              message: "Enter Coupoun Code ",
                            },
                          })}
                          size="small"
                          variant="outlined"
                          label="Coupon Code"
                          placeholder="Enter coupoun code"
                          fullWidth
                        />
                        {errors.coupounCode && (
                          <span className="goAdminErrorMessages">
                            {errors.coupounCode.message}
                          </span>
                        )}
                        <span
                          id="codeErr"
                          className="goAdminErrorMessages"
                        ></span>
                      </Grid>
                      <Grid item>
                        <TextField
                          inputRef={coupounCodeNameRef}
                          onKeyUp={(e) => handleCoupounValiadtion(e, 2)}
                          {...register("coupounCodeName", {
                            required: {
                              value: true,
                              message: "Enter coupoun code Name ",
                            },
                          })}
                          size="small"
                          variant="outlined"
                          label="Coupon Name"
                          placeholder="Enter Coupon Name"
                          fullWidth
                        />
                        {errors.coupounCodeName && (
                          <span className="goAdminErrorMessages">
                            {errors.coupounCodeName.message}
                          </span>
                        )}
                        <span
                          id="nameErr"
                          className="goAdminErrorMessages"
                        ></span>
                      </Grid>
                      <Grid item>
                        <TextField
                          {...register("coupounHeading", {
                            required: {
                              value: true,
                              message: "Enter coupoun code Heading",
                            },
                          })}
                          size="small"
                          variant="outlined"
                          label="Heading"
                          placeholder="Enter Heading"
                          fullWidth
                        />
                        {errors.coupounHeading && (
                          <span className="goAdminErrorMessages">
                            {errors.coupounHeading.message}
                          </span>
                        )}
                      </Grid>
                      <Grid item>
                        <TextField
                          {...register("coupounDescription")}
                          size="small"
                          variant="outlined"
                          label="Descripition (optional)"
                          placeholder="Enter Descripition (optional)"
                          fullWidth
                        />
                        {/* {errors.coupounDescription && <span className='goAdminErrorMessages'>{errors.coupounDescription.message}</span>} */}
                      </Grid>
                      <Grid item>
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                        // locale={enLocale}
                        >
                          <MobileDateTimePicker
                            {...register("startDate", {
                              required: {
                                value: !selectedStartDate,
                                message: "Select Start date and time",
                              },
                            })}
                            label="Select Start Date and Time"
                            value={selectedStartDate}
                            onChange={handleStartDateChange}
                            disablePast
                            renderInput={(props) => (
                              <TextField size="small" {...props} fullWidth />
                            )}
                            minDate={new Date()} // Disables future dates
                            minTime={new Date().toLocaleTimeString("en-US", {
                              hour12: false,
                            })} // Disables future times
                          />
                        </LocalizationProvider>
                        {errors.startDate && (
                          <span className="goAdminErrorMessages">
                            {errors.startDate.message}
                          </span>
                        )}
                      </Grid>
                      <Grid item>
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                        // locale={enLocale}
                        >
                          <MobileDateTimePicker
                            {...register("EndDate", {
                              required: {
                                value: !selectedEndDate,
                                message: "Please select End date and time",
                              },
                            })}
                            label="Select End Date and Time"
                            value={selectedEndDate}
                            onChange={handleEndDateChange}
                            renderInput={(props) => (
                              <TextField size="small" {...props} fullWidth />
                            )}
                            disablePast
                          />
                        </LocalizationProvider>
                        {errors.EndDate && (
                          <span className="goAdminErrorMessages">
                            {errors.EndDate.message}
                          </span>
                        )}
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item md={6} sm={3}>
                            <FormControl size="small" fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Discount Type
                              </InputLabel>
                              <Select
                                {...register("discountType", {
                                  required: {
                                    value: true,
                                    message:
                                      "Select Discount Type for the coupoun",
                                  },
                                })}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={discountType}
                                label="Discount Type"
                                onChange={handleDiscountTypeChange}
                              >
                                <MenuItem value={1}>Amount</MenuItem>
                                <MenuItem value={2}>Percentage</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          {errors.discountType && (
                            <span className="goAdminErrorMessages">
                              {errors.discountType.message}
                            </span>
                          )}

                          <Grid item md={6} sm>
                            <TextField
                              inputProps={{
                                maxLength: discountType == 1 ? 4 : 2,
                              }}
                              onKeyDown={(e) => handleNumInput(e)}
                              {...register("discountNumber", {
                                required: {
                                  value: true,
                                  message: `Enter ${discountType == 1 ? "Amount" : "Percentage"
                                    }`,
                                },
                                // min:{value:100,message:'min amount'}

                              })}
                              size="small"
                              variant="outlined"
                              label={`${discountType == 1 ? "Amount" : "Percentage"
                                }`}
                              placeholder={`Enter ${discountType == 1 ? "Amount" : "Percentage"
                                }`}
                              id='discountNumber'
                              fullWidth
                            />
                            {errors.discountNumber && (
                              <span className="goAdminErrorMessages">
                                {errors.discountNumber.message}
                              </span>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <TextField
                          onKeyDown={(e) => handleNumInput(e)}
                          {...register("minimunAmount", {
                            required: {
                              value: true,
                              message: "Enter Minimun Amount",
                            },
                            min: { value: isNaN(document?.getElementById('discountNumber')?.value)||discountType == 2 ? 1 : parseInt(document.getElementById('discountNumber')?.value) + 1, message: 'Minimun Amount should be greater than Discount Amount' }
                          })}
                          size="small"
                          variant="outlined"
                          label="Minimum Amount "
                          placeholder="Enter Minimum Amount "
                          fullWidth
                        />
                        {errors.minimunAmount && (
                          <span className="goAdminErrorMessages">
                            {errors.minimunAmount.message}
                          </span>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={6} sm={12} sx={{ marginBottom: '3rem' }}>
                    {/* <TextField {...register('termsAndConditions', { required: { value: true, message: "Anter Terms and conditions" } })} multiline rows={27} size='small' variant='outlined' label='Terms & Conditions ' placeholder='Enter Terms & Conditions' /> */}
                    <Grid item style={{ height: "90%" }} mb={{ md: '0px', sm: '40px' }}>
                      {/* <Controller
                        name="quillContent" // The name should match the key in the form data object
                        control={control}
                        defaultValue="" // Set your initial value here if needed
                        render={({ field }) => (
                          // <ReactQuill
                          //   value={field.value}
                          //   onChange={field.onChange}
                          // />
                      <ReactQuill theme="snow" value={field.value} onChange={field.onChange} style={{ height: "90%" }} placeholder='write something...' />

                        )}
                      /> */}
                      <ReactQuill
                        theme="snow"
                        value={quillValue}
                        onChange={setQuillValue}
                        style={{ height: "90%" }}
                        placeholder="write something..."
                      />
                    </Grid>
                    {errors.termsAndConditions && (
                      <span className="goAdminErrorMessages">
                        {errors.termsAndConditions.message}
                      </span>
                    )}

                    <Grid
                      container
                      justifyContent={"space-around"}
                      sx={{ margin: "30px 0" }}
                    >
                      <Grid item>
                        <Button
                          onClick={(e) => navigate("/admin/AdminCouponsList")}
                          size="small"
                          className={adminCoupoun.cancelOutlinedBtn}
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item>
                        <LoadingButton
                          type="submit"
                          size="small"
                          className="bg-p"
                          variant="contained"
                          loading={loading}
                        >
                          Save
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {typeOfUsers == 1 || typeOfUsers == 2 ? (
            <Grid item md={4}>
              <Paper elevation={2} sx={{ borderRadius: "10px" }}>
                <Box
                  className={adminCoupoun.specificUsersDiv}
                  minHeight={"785px"}
                >
                  <Grid container>
                    <Grid item>
                      <TextField
                        onChange={(e) => getUserList(e)}
                        size="small"
                        variant="outlined"
                        placeholder="Search with coupoun Code,Name"
                        label="search  "
                      />
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        mt={1}
                        className={adminCoupoun.usersToSelectDiv}
                        // spacing={2}
                        rowGap={1}
                        columnGap={1}
                        justifyContent={'space-evenly'}
                      >
                        {usersList &&
                          usersList.length > 0 &&
                          usersList.map((data) => {
                            return (
                              <Grid
                                md={4}
                                maxWidth={{ md: '70px', sm: '115px' }}
                                minWidth={{ md: 'inherit', sm: '115px' }}
                                item
                                onClick={() => handleUsersSelect(data.user_id)}
                                className={`singleUserItem`}
                              >
                                <span className="adminCoupounsUsersSpan">
                                  <img
                                    className={` ${selectedUsers.includes(data.user_id)
                                      ? "iAmSelectedByAdmin"
                                      : "NotSelctedByAdmin"
                                      }`}
                                    width={50}
                                    height={60}
                                    src={data.cover_pic || UserAvatar}
                                    alt="userSpic"
                                  />
                                  <p className="text-eclipsis" style={{ textAlign: "center" }}>
                                    {data.user_name || data.user_id}
                                  </p>
                                </span>
                              </Grid>
                            );
                          })}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Box>
    </>
  );
};

export default AdminAddNewCoupons;
