import { Container, Dialog } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { forgotpwdmodel } from "../../../assets/styles/Flights";
import axios from "axios";
import Completeprofile from "./Completeprofile";
import { useDispatch } from "react-redux";
import { LoginActions } from "../../../store/LoginSlice";
import CreatePassword from "./CreatePassword";
import Countdown from "react-countdown";
import MySnackbar from "./Snackbar";
import {styles} from '../../../assets/styles/Styles_export'

const Otpverification = (props) => {
  const baseurl=process.env.REACT_APP_BASEURL;
  const otpopen = props.open;
  const otpclose = props.onclose;
  const frgtpwdotp = props.forgotpwd;
  const otpprofile = props.profiledata;
  const editprofileotp = props.editprofile;
  const dispatch = useDispatch();
  const [cmpleteprfldata, setCmpleteprfldata] = useState("");
  const [otp_err,setOtp_err]=useState("")
  const handleotpclose = (mess) => {
    otpclose();
  };
  // refs
  const otpref = useRef();
  const [cmpleteprfl, setCmpleteprfl] = useState(false);
  const [cmpleteprflotp, setCmpleteprflotp] = useState(false);
  const [cmpleteprflobj, setCmpleteprflobj] = useState("");
  const [createpwdmodel, setCreatepwdmodel] = useState(false);
  const [codesent, setCodesent] = useState("");
  const [showpwdbtn, setShowpwdbtn] = useState(0);

  useEffect(() => {
    setCodesent(localStorage.getItem("user"));
    setShowpwdbtn(localStorage.getItem("password"));
  }, [props]);

  // pwd opener using callbacks
  const pwdopener = () => {
    props.pwdopened();
    otpclose();
  };
  // verify otp
  const verifyotp = async () => {
    const userid = localStorage.getItem("userid");
    let otpobj;
    console.log(otpref.current.value==="","vlaue")
    if(otpref.current.value===""){
      setOtp_err("empty")
      return;
    }
    if (editprofileotp?.email != "" && editprofileotp?.email !== undefined) {
      // alert("edit email");
      otpobj = {
        user_id: userid,
        otp: otpref.current.value,
        platform: 0,
        device_id: "",
        type: 2,
        email: editprofileotp.email,
        mobile: "",
        country_code: "",
      };
    } 
    else if (
      editprofileotp?.mobile != "" &&
      editprofileotp?.mobile !== undefined
    ) {
      // alert("mobile");
      otpobj = {
        user_id: userid,
        otp: otpref.current.value,
        platform: 0,
        device_id: "",
        type: 1,
        email: "",
        mobile: editprofileotp.mobile,
        country_code: editprofileotp.country_code,
      };
    } else {
      if (frgtpwdotp?.type == 3) {
        // alert("from forgot password");
        otpobj = {
          user_id: userid,
          otp: otpref.current.value,
          platform: 0,
          device_id: "",
          type: 3,
        };
      } else {
        // console.log(cmpleteprflobj, "complete");
        if (cmpleteprflobj) {
          // alert("complete profileobj is not empty from cmplete profile");
          otpobj = {
            user_id: userid,
            otp: otpref.current.value,
            platform: 0,
            email: cmpleteprflobj?.email || "",
            mobile: cmpleteprflobj?.mobile || "",
            country_code: cmpleteprflobj?.country_code || "",
            type: cmpleteprflobj?.type,
          };
        } else {
          // alert("loginotp");
          if (otpprofile?.type == 1) {
            // alert("type1");
            otpobj = {
              user_id: userid,
              otp: otpref.current.value,
              platform: 0,
              device_id: "",
              type: localStorage.getItem("type"),
              // mobile: otpprofile.mobile,
              // email: "",
              // mobile:"",
              // country_code:""
              // country_code: otpprofile.country_code,
            };
          } 
          else {
            // alert("type2");
            otpobj = {
              user_id: userid,
              otp: otpref.current.value,
              platform: 0,
              device_id: "",
              type: localStorage.getItem("type"),
              // mobile: "",
              // // email: otpprofile?.email,
              // email:'',
              // country_code: "",
            };
          }
        }
        //  otpobj ={
        //   user_id:userid,
        //   otp:otpref.current.value,
        //   platform:0,
        //   device_id:"",
        //   type:localStorage.getItem("type")
        // }
      }
    }

    console.log(otpobj, "posting to otp");
    const res = await axios.post(`${baseurl}/verifyOtp`, otpobj, {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_DEFAULT_TOKEN,
      },
    });
    const data = await res.data;
    const response = data.data;
    console.log(data, "aferotpsucees");
    if (data.status === 0 && data.message==="Invalid OTP") {
      setOtp_err("valid")
    }
    console.log(frgtpwdotp?.type,"frgtpwd")
    if (data.status && frgtpwdotp?.type ===3) {
      // alert("create pwd model")
      setCmpleteprflobj("");
      setCreatepwdmodel(true);
      localStorage.setItem("authorization", response.token);
      localStorage.setItem("loggedin", 1);
      dispatch(LoginActions.userlogin(1));
      otpclose();
    
      setCmpleteprflotp(false);
    } 
    else {
      if (data.status && response.profile_status == 0) {
        setCmpleteprflobj("");
        setCmpleteprfldata({ ...response });
        setCmpleteprfl(true);
        localStorage.setItem("authorization", response.token);
        localStorage.setItem("loggedin", 1);
        dispatch(LoginActions.userlogin(1));
        handleotpclose(data.message);
      } 
      else if (data.status && response.profile_status) {
        // setCmpleteprflobj("");
        // handleotpclose(data.message);
        otpclose();
        setCmpleteprflotp(false);
        localStorage.setItem("loggedin", 1);
        localStorage.setItem("authorization", response.token);
        dispatch(LoginActions.userlogin(1));
      }
      setCmpleteprflobj("");
    }
    setCmpleteprflobj("");
    // console.log(data)
  };
  // css initialization
  const forgotcss = forgotpwdmodel();
  // complete profile callback
  const cmpletefun = (data) => {
    if (data.type == 2) {
      setCodesent(data.email);
    } else if (data.type == 1) {
      setCodesent(data.mobile);
    }
    setCmpleteprflobj(data);
    setCmpleteprflotp(true);
  };
  const handleotpclosed = () => {
    handleotpclose();
    setCmpleteprflotp(false);
  };
  const [start, setStart] = useState(false);
  useEffect(() => {
    setStart(true);
  }, [otpopen, cmpleteprflotp]);
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      // return <Button>Resend OTP</Button>;
      setStart(false);
    } else {
      // Render a countdown
      return (
        <span style={{color:styles.app_color}}>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  // Resend otpcall
  const resendotpapi = async () => {
    let resendotpobj;
    if (frgtpwdotp?.type == 3) {
      resendotpobj = {
        type: 3,
      };
    } else {
      if (otpprofile?.type == 1) {
        resendotpobj = {
          user_id: localStorage.getItem("userid"),
          type: 1,
          email: "",
          mobile: otpprofile?.mobile,
          country_code: otpprofile?.country_code,
          forgot_type: 0,
        };
      } else if (otpprofile?.type == 2) {
        resendotpobj = {
          user_id: localStorage.getItem("userid"),
          type: 2,
          email: otpprofile?.email,
          mobile: "",
          country_code: "",
          forgot_type: 0,
        };
      }
    }
    // alert("next");
    console.log(resendotpobj);
    const res = await axios.post(
      `${process.env.REACT_APP_BASEURL}/resendOtp`,
      resendotpobj,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "V1B6Wk9VxIAxrGptEXKlJclP9o0ZuOeV",
        },
      }
    );
    const data = res.data;
    console.log(data);
    if (data.status) {
      setStart(true);
    }
  };
  function snackclose() {
  }
  return (
    <div>
      <CreatePassword
        open={createpwdmodel}
        onclose={() => setCreatepwdmodel(false)}
      />
      <Completeprofile
        open={cmpleteprfl}
        onclose={() => setCmpleteprfl(false)}
        profiledata={cmpleteprfldata}
        otpdata={cmpletefun}
      />
      <Dialog
        open={otpopen || cmpleteprflotp}
        // onClose={handleotpclosed}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            mixHeight: 580,
            maxWidth: "350px",
            borderRadius: "15px",
            padding: "0.7rem",
          },
        }}
      >
        <Grid item textAlign="right">
          <CancelIcon sx={{ color: styles.app_color }} onClick={handleotpclosed} />
        </Grid>
        <Container>
          <Grid
            container
            textAlign={"center"}
            direction={"column"}
            spacing={2}
            sx={{ padding: "10px 0px" }}
          >
            <Grid item style={{ fontSize: "18px", color: styles.app_color,fontWeight:'500' }}>
              OTP Authentication
            </Grid>
            <Grid item style={{ fontSize: "14px" }}>
              We have sent a code to{" "}
              <span style={{ fontWeight: 500, color: styles.app_color }}>
                {codesent}
              </span>
            </Grid>
            {/* <Grid item style={{ fontSize: "16px" }}>
              Please enter the OTP Which has been sent to your{" "}
              <span style={{ fontWeight: 500 }}>{codesent}</span>  Mobile
            </Grid> */}

            <Grid item>
              <TextField
                label={"Enter OTP"}
                className={forgotcss.root}
                // InputLabelProps={{ shrink: true, sx: { color: "#003556!important" } }}
                inputRef={otpref}
                InputLabelProps={{ shrink: true, sx: { color: "#8F9098!important" } }}
                helperText={otp_err==="empty"?<span style={{color:'red'}}>Please Enter your OTP</span>:otp_err==="valid"&&<span style={{color:'red'}}>Please Enter Valid OTP</span>}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item>
              {" "}
              {start ? (
                <Countdown date={Date.now() + 30000} renderer={renderer} />
              ) : (
                <Button disableRipple onClick={resendotpapi} sx={{fontSize:'13px',color:styles.app_color}}>
                  Resend OTP
                </Button>
              )}{" "}
            </Grid>
            <Grid item>
              <Button
                className={forgotcss.button}
                onClick={verifyotp}
                sx={{ textTransform: "none",fontSize:'16px',fontWeight:'600' }}
              >
                Verify
              </Button>
            </Grid>
            {/* {console.log(frgtpwdotp?.type,"otpdata")} */}
            {showpwdbtn == 1 && (
              <Grid item>
                <Button disableRipple onClick={pwdopener} sx={{fontSize:'13px',fontWeight:'500',color:styles.app_color,textTransform:'none'}}>
                  Login with Password
                </Button>
              </Grid>
            )}
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
};

export default Otpverification;
