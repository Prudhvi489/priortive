import {
  Container,
  Dialog,
  Grid,
  TextField,
  InputAdornment,
  Button,
  FormHelperText,
} from "@mui/material";
import React, { useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { forgotpwdmodel } from "../../../assets/styles/Flights";
import Email from "../../../assets/images/Email.svg";
import Otpverification from "./Otpverification";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { makeStyles } from "@mui/styles";
import { errors } from "../../../assets/styles/Flights";
import Countrycodefilter from "./Countrycodefilter";
import axios from "axios";
import MySnackbar from "./Snackbar";
import { Apipost } from "../../../ApiServices/Apicalls";
import {styles} from '../../../assets/styles/Styles_export'

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: `${styles.app_color}!important`,
      },
    },
  },
}));
const Forgotpassword = (props) => {
  const baseurl=process.env.REACT_APP_BASEURL;
  const open = props.open;
  const onclose = props.onclose;
  const pwdref = useRef();
  const forgotcss = forgotpwdmodel();
  const [otpmodel, setOtpmodel] = useState(false);
  const [mobilenumber, setMobilenumber] = useState(false);
  const [textdata, setTextdata] = useState({
    data: "",
  });
  const [selectedcountry, setSelectedcountry] = useState({});
  const [countrydialog, setCountrydialog] = useState(false);
  const [error, setError] = useState(false);
  const [frgtotpdata, setFrgtotpdata] = useState({
    type: 3,
    mobile: "",
    country_code: "",
    email: "",
  });
  const classes = useStyles();
  const err = errors();
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  const [error_s,setError_s]=useState({
    mobile_err:'',
    mail_err:''
  })

  // mobile number change
  const handledatachange = (e) => {
    if (/^\d+$/.test(e.target.value) && e.target.value.length >= 3) {
      setMobilenumber(true);
    } else {
      setMobilenumber(false);
    }
    setTextdata((prev) => ({
      ...prev,
      data: e.target.value,
    }));
  };
  const handleclose = () => {
    onclose();
  };
  const forgotpwd = async (frgtpwdobj) => {
    console.log(frgtpwdobj);
    const data = await Apipost("/forgotPassword", frgtpwdobj);
    const response = data.data;
    console.log(data);
    if (data.status === 0 && data.message==="Email doesnt exist") {
      setError_s((prev)=>({...prev,mail_err:''}))
      setSnackopen(true);
      setSnackmessage(data.message);
    }
    else if(data.status === 0 && data.message==="Mobile number doesnt exist"){
      setError_s((prev)=>({...prev,mobile_err:''}))
      setSnackopen(true);
      setSnackmessage(data.message);
    }
    if (data.status && frgtpwdobj.type == 1) {
      setFrgtotpdata((prev) => ({
        ...prev,
        mobile: frgtpwdobj.mobile,
        country_code: frgtpwdobj.country_code,
      }));
      localStorage.setItem("user", frgtpwdobj.mobile);
      localStorage.setItem("password", 0);
      setOtpmodel(true);
      onclose();
      console.log(data);
    } else if (data.status && frgtpwdobj.type == 2) {
      setFrgtotpdata((prev) => ({
        ...prev,
        email: frgtpwdobj.email,
      }));
      localStorage.setItem("user", frgtpwdobj.email);
      localStorage.setItem("password", 0);
      setOtpmodel(true);
      onclose();
      console.log(data);
    }
  };
  // otp model opening
  const pno = /^\d+$/;
  let code;
  const otpmodelopening = () => {
   
      if (mobilenumber) {
        if (textdata.data.length<6) {
          setError_s((prev)=>({...prev,mobile_err:'valid'}))
        } else {
          setError_s((prev)=>({...prev,mobile_err:''}))
          if (Object.keys(selectedcountry).length > 0) {
            code = selectedcountry.id.toString();
          } else {
            code = "74";
          }
          const frgtpwd = {
            type: 1,
            mobile: textdata.data,
            country_code: code,
            email: "",
          };
          forgotpwd(frgtpwd);
        }
      } else {
        if (textdata.data == "") {
          setError_s((prev)=>({...prev,mail_err:'empty'}))
          return;
        } 
        else if(!textdata.data.includes('@')){
          setError_s((prev)=>({...prev,mail_err:'valid'}))
          return;
        }
        else if(textdata.data.includes("@")) {
          setError_s((prev)=>({...prev,mail_err:''}))
          const frgtmail = {
            type: 2,
            mobile: "",
            country_code: "",
            email: textdata.data,
          };
          forgotpwd(frgtmail);
        } else {
          setError(true);
        }
      }
    
  };
  // country selection
  function handlecountryselected(value) {
    console.log(value);
    setSelectedcountry(value);
  }
  function snackclose() {
    setSnackopen(false);
  }
  return (
    <div>
      {/* {type:3} */}
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Otpverification
        open={otpmodel}
        onclose={() => setOtpmodel(false)}
        forgotpwd={frgtotpdata}
      />
      <Countrycodefilter
        open={countrydialog}
        onclose={() => setCountrydialog(false)}
        selectedvalue={handlecountryselected}
      />
      <Dialog
        open={open}
        onClose={handleclose}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            mixHeight: 580,
            maxWidth: "350px",
            borderRadius: "15px",
            padding: "1rem",
          },
        }}
      >
        <Grid item textAlign={"right"} sx={{ color: styles.app_color }}>
          <CancelIcon onClick={handleclose} />
        </Grid>
        <Container maxWidth="sm">
          <Grid container direction="column" spacing={3} textAlign={"center"}>
            <Grid item>
              <span className={forgotcss.heading}>Forgot Password</span>
            </Grid>
            <Grid item>
              <span>
                Please enter you email or Phone number to receive verification
                code{" "}
              </span>
            </Grid>
            {/* <Grid item><TextField size="small" inputRef={pwdref}  InputLabelProps={{
        style: {
          color:styles.app_color,
        },
      }} className={forgotcss.root} fullWidth InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                     <img src={Email} alt={"email"}/>
                    </InputAdornment>
                  ),
                }} label="Email/mobile"/></Grid> */}
            <Grid item>
              {mobilenumber ? (
                <Grid item>
                  <Grid container spacing={3}>
                    <Grid item md={3.8}>
                      <Button
                        disableRipple
                        variant="outlined"
                        onClick={() => setCountrydialog(true)}
                        startIcon={
                          <img
                            src={
                              Object.keys(selectedcountry).length > 0
                                ? selectedcountry.country_flag
                                : `${baseurl}/in.png`
                            }
                            width="20px"
                            height="20px"
                            alt=""
                          />
                        }
                        endIcon={
                          <ArrowDropDownIcon sx={{ color: styles.app_color }} />
                        }
                        sx={{
                          padding: "0.4rem 0.5rem",
                          borderRadius: "0.5rem",
                          borderColor: `${styles.app_color}!important`,
                        }}
                      >
                        {Object.keys(selectedcountry).length > 0
                          ? selectedcountry.code
                          : "+91"}
                      </Button>
                    </Grid>
                    <Grid item md={8.2}>
                      <TextField
                        label="Email/Mobile"
                        value={textdata.data}
                        onChange={handledatachange}
                        className={classes.root}
                        helperText={error_s.mobile_err==="valid"&&<span style={{color:'red'}}>Enter Correct mobile number</span>}
                        size="small"
                        fullWidth
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <img src={Email} alt="email" />
                            </InputAdornment>
                          ),
                        }}
                        autoFocus
                      />

                      {/* <FormHelperText>
                        {error && (
                          <p className={err.errtxt}>Enter your mobile number</p>
                        )}
                      </FormHelperText> */}
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <Grid item>
                  <TextField
                    label="Email/Mobile"
                    value={textdata.data}
                    onChange={handledatachange}
                    className={classes.root}
                    helperText={error_s.mail_err==="empty"?<span style={{color:'red'}}>Enter your Email/Mobile number</span>:error_s.mail_err==="valid"&&<span style={{color:'red'}}>Enter Correct Email Address</span>}
                    size="small"
                    InputLabelProps={{
                      style: {
                        color: styles.app_color,
                      },
                    }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={Email} alt="email" />
                        </InputAdornment>
                      ),
                    }}
                    autoFocus
                  />
                  {/* <FormHelperText>
                    {error && (
                      <p className={err.errtxt}>
                        Please Enter Mobile number/Email
                      </p>
                    )}
                  </FormHelperText> */}
                </Grid>
              )}
            </Grid>
            <Grid item mb={3}>
              <Button
                disableRipple
                className={forgotcss.button}
                fullWidth
                variant="contained"
                onClick={otpmodelopening}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
};

export default Forgotpassword;
