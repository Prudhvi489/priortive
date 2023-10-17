import {
  Button,
  InputAdornment,
  Container,
  Dialog,
  Grid,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { forgotpwdmodel } from "../../../assets/styles/Flights";
import viewpassword from "../../../assets/images/viewpassword.svg";
import hidepassword from "../../../assets/images/hidepassword.svg";
import Lock from "../../../assets/images/Lock.svg";
import React, { useRef, useState } from "react";
import MySnackbar from "./Snackbar";
import { Apipost } from "../../../ApiServices/Apicalls";
import {styles} from '../../../assets/styles/Styles_export'

const ChangePassword = (props) => {
  const forgotcss = forgotpwdmodel();
  const { open, close } = props;
  const [showpwd, setShowpwd] = useState(false);
  const [showpwd2, setShowpwd2] = useState(false);
  const [showpwd3, setShowpwd3] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const oldpass = useRef();
  const newpass = useRef();
  const conpass = useRef();
  const [mainerror, setMainerror] = useState("");
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  function handleclose() {
    close();
  }
  async function handlesubmit() {
    setError1("");
    setError2("");
    setError3("");
    setMainerror("");
    const oldp = oldpass.current.value;
    const newp = newpass.current.value;
    const conp = conpass.current.value;
    if (oldp === "") {
      setError1("Enter your old password");
      return;
    }
    else if(!pwd_regex.test(oldp)){
      setError1("Password must contian Atleast 1 Capital,1 Small,1 Special Character,1 Number and length  must >6")
      return;
    }
    if (newp === "") {
      setError2("Enter your New password");
      return;
    }
    else if(!pwd_regex.test(newp)){
      setError2("Password must contian Atleast 1 Capital,1 Small,1 Special Character,1 Number and length  must >6")
      return;
    }
    if (conp === "") {
      setError3("Enter Confirm password");
      return;
    }
    if (newp !== conp) {
      setError3("Enter Confirm Password same as New password");
      return;
    }
    const data = await Apipost("/changePassword", {
      user_id: localStorage.getItem("userid"),
      password: newp,
      old_password: oldp,
    });
    console.log(data);
    if (data.status === 0) {
      setMainerror(data.message);
    } else {
      // alert('Password changed successfully')
      setSnackopen(true);
      setSnackmessage(data.message);
      close();
    }
  }

  function snackclose() {
    setSnackopen(false);
  }

  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Dialog
        open={open}
        onClose={handleclose}
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
          <CancelIcon sx={{ color: styles.app_color }} onClick={handleclose} />
        </Grid>
        <Container>
          <Grid container textAlign={"center"} direction={"column"} spacing={2}>
            <Grid
              item
              style={{ fontSize: "18px", color: styles.app_color, fontWeight: "500" }}
            >
              Change Password
            </Grid>
            <Grid item>
              <TextField
                label={"Old Password"}
                className={forgotcss.root}
                InputLabelProps={{ shrink: true, sx: { color: `${styles.app_color}!important`} }}
                fullWidth
                size="small"
                inputRef={oldpass}
                type={showpwd ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Lock} alt="person" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                      <img
                        src={showpwd ? viewpassword : hidepassword}
                        onClick={() => setShowpwd(!showpwd)}
                        alt="viewpwd"
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {error1 && (
                <span style={{ float: "left", fontSize: "80%", color: "red" }}>
                  {error1}
                </span>
              )}
            </Grid>
            <Grid item>
              <TextField
                label={"New Password"}
                className={forgotcss.root}
                InputLabelProps={{ shrink: true, sx: { color: `${styles.app_color}!important`} }}
                fullWidth
                size="small"
                inputRef={newpass}
                type={showpwd2 ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Lock} alt="person" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                      <img
                        src={showpwd2 ? viewpassword : hidepassword}
                        onClick={() => setShowpwd2(!showpwd2)}
                        alt="viewpwd"
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {error2 && (
                <span style={{ float: "left", fontSize: "80%", color: "red" }}>
                  {error2}
                </span>
              )}
            </Grid>
            <Grid item>
              <TextField
                label={"Confirm Password"}
                className={forgotcss.root}
                InputLabelProps={{ shrink: true, sx: { color: `${styles.app_color}!important`} }}
                fullWidth
                size="small"
                inputRef={conpass}
                type={showpwd3 ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Lock} alt="person" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                      <img
                        src={showpwd3 ? viewpassword : hidepassword}
                        onClick={() => setShowpwd3(!showpwd3)}
                        alt="viewpwd"
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {error3 && (
                <span style={{ float: "left", fontSize: "80%", color: "red" }}>
                  {error3}
                </span>
              )}
            </Grid>
            <Grid item>
              <Button
                onClick={handlesubmit}
                className={forgotcss.button}
                sx={{ textTransform: "none" }}
              >
                Confirm
              </Button>
            </Grid>
            <Grid item sx={{ color: "red" }}>
              {mainerror && <span>{mainerror}</span>}
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
