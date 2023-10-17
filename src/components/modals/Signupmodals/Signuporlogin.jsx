import {
  Dialog,
  Grid,
  TextField,
  InputAdornment,
  Button,
  FormHelperText,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import bluecancel from "../../../assets/images/bluecancel.svg";
import Email from "../../../assets/images/Email.svg";
import loginorsignup from "../../.././assets/images/loginorsignup.svg";
import Google from "../../../assets/images/Google.svg";
import Applelogin from "../../../assets/images/Applelogin.svg";
import { makeStyles } from "@mui/styles";
import Otpverification from "./Otpverification";
import SocialButton from "./SocialButton";
import { useDispatch } from "react-redux";
import { LoginActions } from "../../../store/LoginSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Countrycodefilter from "./Countrycodefilter";
import { errors, muitextfieldborder } from "../../../assets/styles/Flights";
import axios from "axios";
import Passwordlogin from "./Passwordlogin";
import Completeprofile from "./Completeprofile";
import { gapi } from "gapi-script";
import { Apipost } from "../../../ApiServices/Apicalls";
import ReCAPTCHA from "react-google-recaptcha";
import "./recaptcha.css";
import MySnackbar from "./Snackbar";
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
const GAPPID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const baseurl = process.env.REACT_APP_BASEURL;
const ReCAPTCHAId = process.env.REACT_APP_RECAPTCHA;
// console.log(ReCAPTCHAId,'recaptcha');
const Signuporlogin = (props) => {
  const dispatch = useDispatch();
  const signupopen = props.open;
  const onclose = props.onclose;
  const classes = muitextfieldborder();
  const err = errors();
  const handleclose = () => {
    onclose();
  };
  const [otpscreen, setOtpscreen] = useState(false);
  const [mobilenumber, setMobilenumber] = useState(false);
  const [textdata, setTextdata] = useState({
    data: "",
  });
  const [error, setError] = useState(false);
  const [countrydialog, setCountrydialog] = useState(false);
  const [selectedcountry, setSelectedcountry] = useState({});
  const [passwordmodel, setPasswordmodel] = useState(false);
  const [profilemodel, setProfilemodel] = useState(false);
  const [errordata, setErrordata] = useState("");
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  }
  //
  const [error_s, setError_s] = useState({
    mobile_err: "",
    email_err: "",
  });
  const [profiledata, setProfiledata] = useState({
    mobile: "",
    email: "",
    userid: "",
    country_code: "",
    country_flag: "",
    code: "",
  });
  const [loginotpdata, setLoginotpdata] = useState("");
  const [recaptchaval, setRecaptchaval] = useState(null);
  const [otpprfl, setOtpprfl] = useState({
    mobile: "",
    email: "",
    country_code: "",
    type: "",
  });
  // useEffect(()=>{
  //   gapi.load("client:auth2", () => {
  //     gapi.auth2.init({ clientId:GAPPID });
  //  });
  // },[])
  const [status, setStatus] = useState("");
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
  // signup/login api call
  async function signuporlogin(postingdata) {
    if (recaptchaval === null && postingdata?.type !== 3) {
      setSnackopen(true);
      setSnackmessage("validate yourself");
      return;
    }
    const data = await Apipost("/signup", postingdata);
    const response = await data.data;
    // Redirecting  to otp model
    if (data.status == 0) {
      setSnackopen(true);
      setSnackmessage(data.message);
      return;
    }
    // social logins
    if (data.status && (response.type === 3 || response?.type === 4)) {
      //&&!response.profile_status
      if (!response?.password_status) {
        setMobilenumber(false);
        setProfiledata((prev) => ({
          ...prev,
          email: response.email,
          user_id: response.user_id,
          type: 2,
        }));
        localStorage.setItem("authorization", data.data.token);
        localStorage.setItem("loggedin", 1);
        localStorage.setItem("userid", response.user_id);
        localStorage.setItem("user", response.email);
        setProfilemodel(true);
      } else {
        localStorage.setItem("authorization", data.data.token);
        localStorage.setItem("loggedin", 1);
        localStorage.setItem("userid", response.user_id);
        localStorage.setItem("user", response.email);
      }
    }
    // Mail and mobile logins
    else {
      if (data.status && response.password_status == 0) {
        setMobilenumber(false);
        // alert("otp model")
        setOtpscreen(true);
        localStorage.setItem("password", response.password_status);
        // for resendotp
        if (postingdata.type == 1) {
          setOtpprfl((prev) => ({
            ...prev,
            country_code: response.country_code,
            mobile: response.mobile,
            type: response.type,
          }));
          setLoginotpdata(response.mobile);
        } else if (postingdata.type == 2) {
          setOtpprfl((prev) => ({
            ...prev,
            email: response.email,
            type: response.type,
          }));
          setLoginotpdata(response.email);
        }
        setStatus({
          user_id: response.user_id,
          // password_status: 0,
          type: postingdata.type,
        });
        localStorage.setItem("userid", response.user_id);
        localStorage.setItem("type", postingdata.type);
        localStorage.setItem("user", textdata.data);
        localStorage.setItem("password", response.password_status);
        setTextdata({
          data: "",
        });
        onclose();
      }

      //Redirecting to the password model
      else if (data.status && response.password_status) {
        // alert("pwd")
        if (postingdata.type == 1) {
          // alert("pwdtype1")
          setOtpprfl((prev) => ({
            ...prev,
            country_code: postingdata.country_code,
            mobile: postingdata.mobile,
            type: 1,
          }));
        } else if (postingdata.type == 2) {
          // alert("pwdtype2")
          setOtpprfl((prev) => ({
            ...prev,
            email: response?.email,
            type: response?.type,
          }));
        }
        setStatus({
          user_id: response.user_id,
          type: postingdata.type,
        });
        localStorage.setItem("password", response.password_status);
        localStorage.setItem("userid", response.user_id);
        localStorage.setItem("type", postingdata.type);
        localStorage.setItem("user", textdata.data);
        setTextdata({
          data: "",
        });
        // alert("entering to pwd")
        onclose();
        setPasswordmodel(true);
      }
    }
    // google login
    // else if (response.type==3 && data.status && !response.profile_status){
    //   setProfiledata((prev)=>(
    //     {...prev,email:response.email,userid:response.user_id}
    //   ))
    //   localStorage.setItem("authorization",data.data.token)
    //   localStorage.setItem("loggedin",1);

    //   setProfilemodel(true)
    // }
  }
  // mobile number and email validation
  const pno = /^\d+$/;
  const greg = /^[\w.+\-]+@gmail\.com$/;
  var email_Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let code;
  const loginhandler = () => {
    if (mobilenumber) {
      if (textdata.data.length < 6) {
        setError_s((prev) => ({ ...prev, mobile_err: "valid" }));
        setError(true);
      } else {
        setError_s((prev) => ({ ...prev, mobile_err: "" }));
        if (Object.keys(selectedcountry).length > 0) {
          code = selectedcountry.id.toString();
        } else {
          code = "74";
        }
        const phnobj = {
          type: 1,
          country_code: code,
          mobile: textdata.data,
          platform: "0",
          device_id: "",
        };
        signuporlogin(phnobj);
        setError(false);
      }
    } else {
      if (textdata.data === "") {
        setError_s((prev) => ({ ...prev, email_err: "empty" }));
        return;
      } else {
        if (!email_Regex.test(textdata.data)) {
          setError_s((prev) => ({ ...prev, email_err: "valid" }));
          return;
        } else {
          setError_s((prev) => ({ ...prev, email_err: "" }));
          const mailobj = {
            type: 2,
            email: textdata.data,
            platform: "0",
            device_id: "",
          };
          signuporlogin(mailobj);
        }
      }
    }
  };
  // social logins
  const handleSocialLoginsuccess = async (user) => {
    console.log(user);
    dispatch(LoginActions.userlogin(1));
    const googleobj = {
      type: 3,
      first_name: user.profile?.firstName ?? "",
      last_name: user.profile?.lastName ?? "",
      email: user.profile?.email,
      platform: 0,
      device_id: "",
      google_id: user.profile.id,
    };
    console.log(googleobj);

    signuporlogin(googleobj);

    onclose();
  };
  const handleSocialLoginFailure = (err) => {
    // alert("error")
    console.log(err.Error);
  };
  // country selection
  function handlecountryselected(value) {
    console.log(value);
    setSelectedcountry(value);
  }
  // handlgoogle recaptcha
  // Handle reCAPTCHA validation here
  const handleRecaptchaChange = (value) => {
    setRecaptchaval(value);
    // console.log('reCAPTCHA value:', value);
  };

  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Otpverification
        open={otpscreen}
        profiledata={otpprfl}
        onclose={() => setOtpscreen(false)}
      />
      <Passwordlogin
        open={passwordmodel}
        profiledata={otpprfl}
        onclose={() => setPasswordmodel(false)}
      />
      <Countrycodefilter
        open={countrydialog}
        onclose={() => setCountrydialog(false)}
        selectedvalue={handlecountryselected}
        left={17}
      />
      <Completeprofile
        open={profilemodel}
        onclose={() => setProfilemodel(false)}
        profiledata={profiledata}
      />
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            mixHeight: 580,
            maxWidth: "400px",
            borderRadius: "15px",
            padding: "0.7rem",
          },
        }}
        open={signupopen}
        onClose={handleclose}
        maxWidth="lg"
      >
        <Grid
          container
          direction={"column"}
          sx={{ padding: "0px 5px 5px 5px" }}
          spacing={2.5}
        >
          <Grid
            item
            textAlign={"right"}
            sx={{ height: "1rem", minHeight: "2.5rem", width: "100%" }}
          >
            <img src={bluecancel} alt="bluecancel" onClick={handleclose} />
          </Grid>
          {/* <Grid item textAlign={'right'}><img src={bluecancel} alt="bluecancel" /></Grid> */}
          <Grid item textAlign={"center"} sx={{ width: "100%" }}>
            <span className={"titlebold"}> Login or Create an Account</span>
          </Grid>
          {mobilenumber ? (
            <Grid item sx={{ width: "100%" }}>
              <Grid container spacing={1.5}>
                <Grid item md={3} sm={3} xs={4.7}>
                  <Button
                    fullWidth
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
                    endIcon={<ArrowDropDownIcon sx={{ color: styles.app_color }} />}
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
                <Grid item md={9} sm={9} xs={7.3}>
                  <TextField
                    label="Email/Mobile"
                    value={textdata.data}
                    onChange={handledatachange}
                    className={classes.root}
                    size="small"
                    helperText={
                      error_s.mobile_err === "valid" && (
                        <span style={{ color: "red" }}>
                          Enter Valid mobile number
                        </span>
                      )
                    }
                    fullWidth
                    InputLabelProps={{
                      style: {
                        color: "#8F9098",
                      },
                    }}
                    autoFocus
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item sx={{ width: "100%" }}>
              <TextField
                label="Email/Mobile"
                value={textdata.data}
                onChange={handledatachange}
                className={classes.root}
                helperText={
                  error_s.email_err === "empty" ? (
                    <span style={{ color: "red" }}>
                      Please Enter Mobile number/Email
                    </span>
                  ) : (
                    error_s.email_err === "valid" && (
                      <span style={{ color: "red" }}>
                        Enter valid Email Address
                      </span>
                    )
                  )
                }
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Email} alt="email" />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: {
                    color: "#8F9098",
                  },
                }}
                autoFocus
              />
            </Grid>
          )}
          <Grid item container justifyContent={"center"}>
            <Grid item>
              <ReCAPTCHA
                sitekey={ReCAPTCHAId}
                onChange={handleRecaptchaChange}
                size="normal"
              />
            </Grid>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Grid container justifyContent={"center"}>
              {/* <Grid item md={0.4}></Grid> */}

              <Grid item md={11.2} xs={12}>
                <Button
                  variant="contained"
                  onClick={loginhandler}
                  fullWidth
                  sx={{
                    background: `${styles.app_color}!important`,
                    borderRadius: "0.5rem",
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif;",
                    fontWeight: "600",
                  }}
                >
                  Login/Signup
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item textAlign={"center"} sx={{ width: "100%" }}>
            <img src={loginorsignup} alt="login" />
          </Grid>
          <Grid item textAlign={"center"} sx={{ width: "100%" }}>
            <Grid container justifyContent={"center"}>
              <Grid item md={11.2} xs={12}>
                {/* <img src={Google} alt="google" width={'100%'}/> */}
                <SocialButton
                  provider="google"
                  appId={GAPPID}
                  onLoginSuccess={handleSocialLoginsuccess}
                  onLoginFailure={handleSocialLoginFailure}
                  style={{
                    border: "none",
                    borderRadius: "1rem",
                    background: "transparent",
                    width: "100%",
                    padding: "0px",
                  }}
                >
                  <img src={Google} alt="google" width={"100%"} />
                </SocialButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item textAlign={"center"} sx={{ width: "100%" }}>
            <Grid container justifyContent={"center"}>
              <Grid item md={11.2} xs={12}>
                <img src={Applelogin} alt="apple login" width={"100%"} />
                {/* <SocialButton
                  provider="google"
                  appId={GAPPID}
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure}
                  style={{
                    border: "none",
                    borderRadius: "1rem",
                    background: 'transparent',
                    width:'100%',
                    padding:'0px',
                  }}
                >
                  <img src={Applelogin} alt="apple login" width={'100%'}/>
                </SocialButton> */}
              </Grid>
            </Grid>
            {/* <SocialButton
              provider="google"
              appId={GAPPID}
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
              style={{
                border: "none",
                borderRadius: "1rem",
                background: 'transparent',
              }}
            >
              <img src={Applelogin} alt="apple login" width={'100%'}/>
            </SocialButton> */}
          </Grid>
          <Grid
            item
            sx={{ fontSize: "12px", width: "100%" }}
            textAlign="center"
          >
            <Grid container direction={"column"} spacing={1}>
              <Grid item>
                {" "}
                By Proceeding, You agree to gomytrip{" "}
                <span style={{ color: styles.app_color }}>Terms &</span>
              </Grid>
              <Grid item sx={{ color: styles.app_color }}>
                {" "}
                Condition’s, Privacy Policy{" "}
                <span style={{ color: "#303030" }}>and</span> User Agreement
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* {JSON.stringify(selectedcountry, 2, undefined)} */}
      </Dialog>
    </div>
  );
};

export default Signuporlogin;
