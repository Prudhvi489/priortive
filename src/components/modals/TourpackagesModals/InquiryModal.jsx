import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import {
  AccountCircle,
  MailOutline,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { handleNumInput } from "../../pages/Buses/BusModuleHelperFunctions";
import { regex_data } from "../../Regex";

const InquiryModal = ({ open, close, openfund }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm(); // Initialize useForm

  const onSubmit = async (data) => {
    const userid = localStorage.getItem("userid")
    if (userid) {
      const payload = {
        name: data.name,
        email: data.email,
        mobile: data.phoneNumber,
        destination: data.location,
        query_by: userid,
        platform: 0,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASEURL}/addinquiry`,
          payload
        );
        console.log(response, 'response');
        if (response.data.status === 1) {
          enqueueSnackbar(response.data.message, { variant: 'success' })
          close()
          reset()
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' })

        }
      } catch (error) {
        // Handle error
      }
    } else {
      enqueueSnackbar('Login To Send Inquiry', { variant: 'error' })
    }
  };

  return (
    <>
      <Dialog open={open} onClose={close} sx={{"& .MuiDialog-paper": {borderRadius:"50px !important"}}}>
        <DialogTitle>
          <Grid container justifyContent={"space-between"} sx={{ borderRadius: "10%" }}>
            <Grid container>
              <Grid item md={11} xs={11}></Grid>
              <Grid item md={1} xs={1} >
                <CloseIcon onClick={close} sx={{
                color: "#FFFF",
                backgroundColor: "#033556",
                padding: "3px",
                borderRadius: "15px",
              }} />
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} textAlign={"center"} sx={{padding: {md: "0rem 3rem"}}}>
              <Grid item md={12} xs={12}>
                <Typography className="details">Personal Details</Typography>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  type="text"
                  placeholder="Name"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  {...register("name", { required: { value: true, message: "Name is required" } })}
                  helperText={errors?.name?.message}
                  error={errors?.name}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  placeholder="Mail"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutline />
                      </InputAdornment>
                    ),
                  }}
                  {...register("email", { required: { value: true, message: "Email is required" }, pattern: { value: regex_data.email_Regex, message: 'Enter Valid Email Address' } })}
                  error={errors?.email}
                  helperText={errors?.email?.message}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  type="text"
                  placeholder="Phone Number"
                  onKeyDown={(e) => handleNumInput(e)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                  {...register("phoneNumber", { required: { value: true, message: "Phone number is required" } })}
                  helperText={errors?.phoneNumber?.message}
                  error={errors?.phoneNumber}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  type="text"
                  placeholder="Location"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn />
                      </InputAdornment>
                    ),
                  }}
                  {...register("location", { required: { value: true, message: "Location is required" } })}
                  helperText={errors?.location?.message}
                  error={errors?.location}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Button
                  className="bg-submit"
                  size="small"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog >
      <style>
        {`
          p.error-message {
            color: red;
          }
        `}
      </style>
    </>
  );
};

export default InquiryModal;
