import { Button, Dialog, Grid, TextField, InputAdornment } from "@mui/material";
import React, { useRef, useState } from "react";
import Forgotpassword from "./Forgotpassword";
import viewpassword from "../../../assets/images/viewpassword.svg";
import hidepassword from "../../../assets/images/hidepassword.svg";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { LoginActions } from "../../../store/LoginSlice";
import Otpverification from "./Otpverification";
import MySnackbar from "./Snackbar";
import { Apipost } from "../../../ApiServices/Apicalls";
import {muitextfieldborder} from '../../../assets/styles/Flights';
import {styles} from '../../../assets/styles/Styles_export'

const Passwordlogin = (props) => {
  const open = props.open;
  const onclose = props.onclose;
  const textfieldborder = muitextfieldborder()
  const [forgotpwd, setForgotpwd] = useState(false);
  const [otplogin, setOtplogin] = useState(false);
  const [status, setStatus] = useState("");
  const [pwdtootp, setPwdtootp] = useState(false);
  const [showpwd, setShowpwd] = useState(false);
  const [pwd_err,setPwd_err]=useState("")
  const pwdref = useRef();
  const [snackopen, setSnackopen] = useState("");
  const [snackmessage, setSnackmessage] = useState("");
  const [mainerr, setMainerr] = useState("");
  const dispatch = useDispatch();
  // console.log(props,"pwd")
  const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const handleclose = () => {
    setPwdtootp(false);
    onclose();
  };
  function handleclick() {
    console.log("consoled ");
  }
  function forgotpwdhandler() {
    setForgotpwd(true);
    onclose();
  }
  // handle callback from otpscreen to password
  const openpwd = () => {
    setPwdtootp(true);
  };
  async function verifypassword() {
    const pwd = pwdref.current.value;
    if(pwd===""){
      setPwd_err("empty")
      return;
    }
    else if(!pwd_regex.test(pwd)){
      setPwd_err("valid");
      return;
    }
    const pwdobj = {
      user_id: localStorage.getItem("userid"),
      password: pwd,
      platform: 0,
      device_id: "",
    };
    const data = await Apipost("/verifyPassword", pwdobj);
    const response = data.data;
    // console.log(response);
    if (data.status) {
      // console.log(response.token);
      dispatch(LoginActions.userlogin(1));
      localStorage.setItem("authorization", response.token);
      localStorage.setItem("loggedin", 1);
      localStorage.setItem("userid", response.user_id);
      setSnackopen(true);
      setSnackmessage("login successful");
      handleclose();
    } else if(data.message==="Invalid Password"){
      setPwd_err("valid");
      // alert(data.message)
      setSnackopen(true)
      setSnackmessage(data.message)

      setMainerr(data.message);
    }
  }
  const otphandler = async () => {
    const data = await Apipost("/resendOtp", {
      user_id: localStorage.getItem("userid"),
      type: localStorage.getItem("type"),
      forgot_type:0,
    });
    console.log(data, "resednign");
    if(data.status){

      setPwdtootp(false);
      onclose();
      setOtplogin(true);
    }
  };
  function snackclose() {
    setSnackopen(false);
  }
  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Forgotpassword
        open={forgotpwd}
        onclose={() => {
          setForgotpwd(false);
        }}
      />
      <Otpverification
        open={otplogin}
        onclose={() => {
          setOtplogin(false);
        }}
        pwdopened={openpwd}
        profiledata={props.profiledata}
      />
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            mixHeight: 580,
            maxWidth: "350px",
            borderRadius: "15px",
            padding: "0.7rem",
          },
        }}
        open={open || pwdtootp}
        onClose={handleclose}
      >
        {/* <div ><span style={{display:'flex',float:'right',pointer:'cursor',height:'3vh'}} onClick={handleclose}><img src={bluecancel} alt="bluecancel"/></span></div> */}
        <Grid item textAlign={"right"} sx={{ color: styles.app_color }}>
          <CancelIcon onClick={handleclose} />
        </Grid>
        <Grid
          container
          direction={"column"}
          textAlign={"center"}
          spacing={2}
          p={3}
        >
          <Grid
            item
            style={{ fontSize: "16px", color: styles.app_color, fontWeight: "500" }}
            paddingBottom={2}
          >
            Password Authentication
          </Grid>
          <Grid item>
            <Grid container direction={"column"}>
              <Grid item>
                <TextField
                  label="Enter Password"
                  inputRef={pwdref}
                  fullWidth
                  className={textfieldborder.root}
                  helperText={pwd_err==="empty"?<span style={{color:'red'}}>Enter your password</span>:pwd_err==="valid"&&<span style={{color:'red'}}>Enter Correct Password</span>}
                  InputLabelProps={{
                    style: {
                      color: "#8F9098",
                    },
                  }}
                  type={showpwd ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <img
                          src={showpwd ? viewpassword : hidepassword}
                          alt="eye"
                          onClick={() => {
                            setShowpwd((prev) => !prev);
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  size={"small"}
                />{" "}
              </Grid>
              <Grid item textAlign={"right"}>
                <span
                  style={{ fontSize: "14px", color: "red", fontWeight: "600" }}
                  onClick={forgotpwdhandler}
                >
                  Forgot Password?
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item mt={1}>
            <Button
              disableRipple
              variant="contained"
              fullWidth
              sx={{
                background: `${styles.app_color}!important`,
                textTransform: "none",
                fontWeight: "600",
                fontFamily: "'Poppins', sans-serif",
                width: "92%",
                borderRadius:'11px'
              }}
              onClick={verifypassword}
            >
              Verify
            </Button>
          </Grid>
          <Grid item>
            {" "}
            <span
              style={{ fontSize: "14px", color: styles.app_color, fontWeight: "500",cursor:'pointer' }}
              onClick={otphandler}
            >
              Login with OTP
            </span>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default Passwordlogin;
