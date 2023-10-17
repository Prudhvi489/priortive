import {
  Dialog,
  Grid,
  TextField,
  InputAdornment,
  Button,
  FormHelperText,
} from "@mui/material";
import React, { useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Container } from "@mui/system";
import { forgotpwdmodel, errorsdata } from "../../../assets/styles/Flights";
// import Lock from '../../assets/Lock.jsx'
import Lock from "../../../assets/images/Lock.svg";
import axios from "axios";
import hidepassword from "../../../assets/images/hidepassword.svg";
import viewpassword from "../../../assets/images/viewpassword.svg";
import MySnackbar from "./Snackbar";
import { Apipost } from "../../../ApiServices/Apicalls";
import {styles} from '../../../assets/styles/Styles_export'

const CreatePassword = (props) => {
  const open = props.open;
  const onclose = props.onclose;
  const forgotcss = forgotpwdmodel();
  const pwdref = useRef();
  const cnfmpwdref = useRef();
  const [errors,setErrors]=useState({
    pwderr:'',
    cnfmerr:''
  })
  const [showpwd, setShowpwd] = useState(false);
  const [cnfmpwd, setCnfmpwd] = useState(false);
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  const [error,setError] = useState(false)
  const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  function handleclose() {
    onclose();
  }
  const createpasswordhandler = async () => {
    const pwd = pwdref.current.value;
    const cnfmpwd = cnfmpwdref.current.value;
    if(pwd===""){
      setErrors((prev)=>({...prev,pwderr:'empty'}))
      return;
    }
    else if(!pwd_regex.test(pwd)){
      setErrors((prev)=>({...prev,pwderr:'valid'}))
      return;
    }
    else if ((pwd !== cnfmpwd && pwd !== "" )|| pwd !== cnfmpwd) {
      setErrors((prev)=>({...prev,pwderr:'',cnfmerr:'valid'}))
      return;
    } else {
      // axios call comes here
      setErrors((prev)=>({...prev,pwderr:'',cnfmerr:''}))
      const data1 = { user_id: localStorage.getItem("userid") };
      console.log(data1);
      const data = await Apipost("/changePassword", {
        user_id: localStorage.getItem("userid"),
        password: pwd,
        old_password: "",
      });
      console.log(data);
      if (data.status) {
        setSnackopen(true);
        setSnackmessage(data.message);
        onclose();
      } else {
        setSnackopen(true);
        setSnackmessage(data.message);
      }
    }
  };
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
            padding: "1rem 1rem 2rem 1rem",
          },
        }}
      >
        <Grid
          item
          textAlign={"right"}
          sx={{ color: styles.app_color, height: "1.7rem" }}
        >
          <CancelIcon onClick={handleclose} />
        </Grid>
        <Container>
          <Grid container direction={"column"} textAlign={"center"} spacing={2}>
            <Grid item>
              <span className={forgotcss.heading}>Create New Password</span>
            </Grid>
            <Grid item>
              <TextField
                label="Create Password"
                type={showpwd ? "text" : "password"}
                inputRef={pwdref}
                fullWidth
                size="small"
                helperText={errors.pwderr==="empty"?<span style={{color:'red'}}>Please Enter Create Password</span>:errors.pwderr==="valid"&&<span style={{color:'red'}}>Password should contain Atleast 1 Capital,1 Small, 1 SpecialCharacter and 1 Number and length must be greater than 6</span>}
                InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img
                        src={Lock}
                        alt="lock"
                        onClick={() => {
                          setShowpwd((prev) => !prev);
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <img
                        src={showpwd ? viewpassword : hidepassword}
                        onClick={() => {
                          setShowpwd((prev) => !prev);
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                className={forgotcss.root}
              />
            
            </Grid>
            <Grid item>
              <TextField
                label="Confirm Password"
                type={cnfmpwd ? "text" : "password"}
                inputRef={cnfmpwdref}
                fullWidth
                size="small"
                helperText={errors.cnfmerr==="valid"&&<span style={{color:'red'}}>Password and Confirm Password should be same</span>}
                InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Lock} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <img
                        src={cnfmpwd ? viewpassword : hidepassword}
                        onClick={() => {
                          setCnfmpwd((prev) => !prev);
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                className={forgotcss.root}
              />
             
            </Grid>
            <Grid item>
              <Button
                disableRipple
                className={forgotcss.button}
                fullWidth
                variant="contained"
                onClick={createpasswordhandler}
                sx={{ textTransform: "none" }}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
};

export default CreatePassword;
