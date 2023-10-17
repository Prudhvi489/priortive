import {
  Dialog,
  Grid,
  TextField,
  InputAdornment,
  FormHelperText,
  Stack,
  Button,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import { editprofile } from "../../../assets/styles/Flights";
import Email from "../../../assets/images/Email.svg";
import person from "../../../assets/images/person.svg";
import Lock from "../../../assets/images/Lock.svg";
import viewpassword from "../../../assets/images/viewpassword.svg";
import hidepassword from "../../../assets/images/hidepassword.svg";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Countrycodefilter from "./Countrycodefilter";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CancelIcon from "@mui/icons-material/Cancel";
import "../../../assets/styles/commonstyles.css";
import calender from "../../../assets/images/calender.svg";
import MySnackbar from "./Snackbar";
import { Apipost } from "../../../ApiServices/Apicalls";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { muitextfieldborder } from "../../../assets/styles/Hotelstyles";
import helperFunctions from "../../../helpers/helperFunctions";
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
const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white!important",
    backgroundColor: `${styles.app_color}!important`,
  },
}));
const baseurl = process.env.REACT_APP_BASEURL;
const Completeprofile = (props) => {
  const open = props.open;
  const onclose = props.onclose;
  const profiledata = props.profiledata;
  const otpcall = props.otpdata;
  const inputborder = muitextfieldborder();
  const [profile, setProfile] = useState(props.profiledata);
  const [showpwd, setShowpwd] = useState(false);
  const [showpwd1, setShowpwd1] = useState(false);
  const [gender, setGender] = useState(1);
  const [pwd, setPwd] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [errors, setErrors] = useState({
    pwd_err: "",
    cnfm_err: "",
  });
  const [conerr, setConerr] = useState("");
  const [pwdemail, setPwdemail] = useState({
    mail: "",
    phn: "",
  });
  const [dob, setDob] = useState("");
  const [otpstate, setOtpstate] = useState(false);
  const [selectedcountry, setSelectedcountry] = useState(false);
  const [countrydialog, setCountrydialog] = useState(false);
  const [pwderr, setPwderr] = useState(false);
  const [countrycode, setCountrycode] = useState("74");
  const pwd_regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // country selection
  function handlecountryselected(value) {
    setCountrycode(value.id);
    console.log(countrycode + "country");
    setSelectedcountry(value);
  }
  // Gender handler
  const handleGender = (event, gender) => {
    console.log(gender);
    if (gender === null) {
      // setGender(0);
      return;
    } else {
      setGender(gender);
    }
  };
  useEffect(() => {
    setProfile(profiledata);
    if (profiledata?.code !== "") {
      setCountrycode(profiledata.code);
    } else {
      setCountrycode("74");
    }
  }, [profiledata]);
  // refs
  const fnameref = useRef();
  const lnameref = useRef();
  const pwdref = useRef();
  const mailref = useRef();
  const phnref = useRef();
  const cnfmpwdref = useRef();
  const handleclose = () => {
    // skiphandler();
    onclose();
  };

  // complete profile api handler
  async function completeprofileapi(prflobj) {
    // console.log(prflobj);
    const initiallogintype = localStorage.getItem("type");
    const data = await Apipost("/completeProfile", prflobj);
    console.log(data, "resp");
    console.log(data, "result of complete profile");
    if (data.status && initiallogintype == 1 && prflobj.email !== "") {
      setPwd("");
      setPwd1("");
      onclose();
      setSnackopen(true);
      setSnackmessage(data.message);
      otpcall({ type: 2, email: prflobj.email });
      localStorage.setItem("user", prflobj.email);
      setPwdemail({ mail: "", phn: "" });
      // onclose();
    } else if (data.status && initiallogintype == 2 && prflobj.mobile !== "") {
      // alert("otp screen entered from cmpleteprfl via mobile");
      setPwd("");
      setPwd1("");
      onclose();
      setSnackopen(true);
      setSnackmessage(data.message);
      otpcall({
        type: 1,
        mobile: prflobj.mobile,
        country_code: prflobj.country_code,
      });
      localStorage.setItem("user", prflobj.mobile);
      setPwdemail({ mail: "", phn: "" });
    } else if (
      data.status == 1 &&
      (prflobj.email !== "" || prflobj.mobile !== "")
    ) {
      // alert(data.message)
      // alert("done");
      setPwd("");
      setPwd1("");
      onclose();
      setSnackopen(true);
      setSnackmessage(data.message);
      setPwdemail({ mail: "", phn: "" });
    } else if (data.status == 0) {
      // alert("otp failed");
      setSnackopen(true);
      setSnackmessage(data.message);
    }
  }
  // complete profile handler
  async function completeprofilehandler() {
    setConerr("");
    if (fnameref.current.value === "") {
      alert("firstname should not be empty");
      return;
    }
    // if(gender===0){
    //   alert("select your gender");
    //   return;
    // }
    if (pwd !== "") {
      if (!pwd_regex.test(pwd)) {
        setErrors((prev) => ({ ...prev, pwd_err: "valid" }));
        return;
      } else if (pwd !== pwd1) {
        setErrors((prev) => ({ ...prev, cnfm_err: "valid", pwd_err: "" }));
        return;
      }
    }
    // console.log(profile,"profile")
    const profileobj = {
      user_id: profile.user_id,
      first_name: fnameref.current.value,
      last_name: lnameref.current.value,
      country_code: countrycode.toString(),
      gender: gender,
      type: profile.type,
      mobile: phnref.current.value,
      email: mailref.current.value,
      password: pwdref.current.value,
      dob: helperFunctions.getapi_date(dob),
    };
    // console.log(profileobj);
    // console.log("printed");
    if (
      pwdref.current.value &&
      pwdref.current.value === cnfmpwdref.current.value
    ) {
      completeprofileapi(profileobj);
    } else if (
      pwdref.current.value &&
      !(pwdref.current.value === cnfmpwdref.current.value)
    ) {
      // alert("doesnt exists");
      setPwderr(true);
    } else {
      completeprofileapi(profileobj);
    }
  }
  // handle skip api
  // async function skiphandler() {
  //   const skipobj = {
  //     user_id: localStorage.getItem("userid"),
  //   };
  //   const token = localStorage.getItem("authorization");
  //   const res = await axios.post(`${baseurl}/skip`, skipobj, {
  //     headers: { authorization: token },
  //   });
  //   const data = res.data;
  //   // console.log(data);
  //   if (data.status) {
  //     onclose();
  //   }
  // }
  // css makestyles intitalization
  const editprofiles = editprofile();
  const classes = useStyles();
  //  states
  function snackclose() {
    setSnackopen(false);
  }
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Countrycodefilter
        open={countrydialog}
        onclose={() => setCountrydialog(false)}
        selectedvalue={handlecountryselected}
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
        open={open}
      >
        <div className="profileDialog" style={{ overflowX: "hidden" }}>
          {/* <Grid item textAlign={"right"}>
            <CancelIcon
              sx={{ color: styles.app_color }}
              onClick={() => {
                handleclose();
              }}
            />
          </Grid> */}
          <Grid
            item
            textAlign={"center"}
            sx={{ color: styles.app_color, fontSize: "18px", fontWeight: 500 }}
          >
            Complete Your Profile
          </Grid>
          <form>
            <Grid
              container
              direction={"column"}
              spacing={2}
              p={{ md: "2rem 2rem 0.8rem 2rem", xs: "1rem 0rem" }}
            >
              <Grid item sx={{ width: "100%" }}>
                <Grid item xs={12}>
                  <TextField
                    label="First & Middle Name"
                    className={classes.root}
                    inputRef={fnameref}
                    InputLabelProps={{
                      style: {
                        color: styles.app_color,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={person} alt="person" />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <FormHelperText>{}</FormHelperText>
                </Grid>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Grid item>
                  <TextField
                    inputRef={lnameref}
                    fullWidth
                    size={"small"}
                    InputLabelProps={{
                      style: {
                        color: styles.app_color,
                      },
                    }}
                    className={classes.root}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={person} alt="person" />
                        </InputAdornment>
                      ),
                    }}
                    label="Last Name"
                  />
                </Grid>
                <Grid item>
                  <FormHelperText>{}</FormHelperText>
                </Grid>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ToggleButtonGroup
                  value={gender}
                  exclusive
                  onChange={handleGender}
                  size="large"
                >
                  <ToggleButton
                    disableRipple
                    value={1}
                    sx={{
                      // padding: "0.3rem 1rem",
                      // background: "#EEF7FD",
                      // color: styles.app_color,
                      // border: "none",
                      // borderRadius: "0.8rem!important",
                      background: "#EEF7FD",
                      color: styles.app_color,
                      border: "none",
                      borderRadius: "0.8rem!important",
                      textTransform: "none",
                      fontSize: "14px",
                      width: "80px",
                      height: "30px",
                      borderRadius: "0.5rem!important",
                      "@media (min-width:900px) and (max-width:1075px)": {
                        width: "60px",
                      },
                      "@media (max-width:400px)": {
                        width: "68px",
                      },
                    }}
                  >
                    <Stack direction={"row"} spacing={1}>
                      <span style={{ paddingTop: "2px" }}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.84502 5.36709C10.8257 4.38546 11.7984 3.41181 12.7799 2.42934C12.7282 2.42682 12.6736 2.42219 12.6194 2.42219C11.8749 2.42177 11.1303 2.42513 10.3862 2.42051C9.88116 2.41757 9.52443 2.05996 9.53998 1.58596C9.55258 1.19515 9.83704 0.876205 10.2236 0.821576C10.2858 0.812752 10.3488 0.807289 10.4114 0.807289C11.8476 0.806869 13.2841 0.806448 14.7207 0.80855C14.8194 0.80855 14.9211 0.817374 15.0161 0.842587C15.3526 0.932514 15.5653 1.21448 15.5657 1.57713C15.5678 3.05546 15.5678 4.5338 15.5648 6.01213C15.564 6.47479 15.2896 6.79794 14.8631 6.85971C14.4846 6.91476 14.1089 6.68154 13.9967 6.31007C13.964 6.20165 13.9539 6.08315 13.953 5.96927C13.9493 5.23514 13.9509 4.50144 13.9509 3.76732C13.9509 3.71101 13.9509 3.65428 13.9509 3.61226C12.9804 4.58506 12.0098 5.55829 11.0265 6.54413C12.1266 8.07583 12.4581 9.79705 11.9253 11.6586C11.5371 13.0155 10.7307 14.0829 9.55258 14.8599C7.18701 16.4206 3.99832 16.0155 2.07057 13.9169C0.178951 11.8574 0.0541595 8.66288 1.79451 6.43025C2.76511 5.18514 4.05168 4.46068 5.61556 4.26528C7.1702 4.07114 8.58702 4.45984 9.84502 5.36709Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span style={{ textTransform: "none" }}>Male</span>
                    </Stack>
                  </ToggleButton>
                  <ToggleButton
                    disableRipple
                    value={2}
                    className={editprofiles.genderbtns}
                  >
                    <Stack direction={"row"} spacing={1}>
                      <span style={{ paddingTop: "2px" }}>
                        <svg
                          width="12"
                          height="16"
                          viewBox="0 0 12 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.64408 15.8071C5.53857 15.7601 5.42449 15.726 5.32871 15.6638C5.07875 15.5014 4.95338 15.2607 4.94715 14.9624C4.94208 14.7049 4.94598 14.4469 4.94598 14.1698C4.69602 14.1698 4.45929 14.1784 4.22335 14.1678C3.86982 14.1518 3.61519 13.9721 3.48281 13.6445C3.35316 13.3232 3.40766 13.0202 3.63738 12.7588C3.80791 12.565 4.02984 12.4797 4.28603 12.4805C4.4994 12.4809 4.71237 12.4805 4.93547 12.4805C4.93547 12.1309 4.93547 11.7912 4.93547 11.4452C3.31266 11.1368 2.0504 10.2894 1.20123 8.85758C0.55647 7.77024 0.34116 6.58701 0.531552 5.33724C0.929076 2.73358 3.17639 0.792188 5.81812 0.807061C8.3956 0.821543 10.6293 2.7238 11.0338 5.248C11.2678 6.70874 10.9723 8.05558 10.1169 9.26034C9.26151 10.4643 8.0884 11.179 6.63925 11.4432C6.63925 11.7857 6.63925 12.1212 6.63925 12.4801C6.86507 12.4801 7.08583 12.4766 7.30698 12.4809C7.71775 12.4887 8.03156 12.7314 8.13396 13.1138C8.27062 13.6253 7.89723 14.1459 7.37123 14.1674C7.13411 14.1772 6.89622 14.169 6.63419 14.169C6.63419 14.2645 6.63419 14.3498 6.63419 14.4352C6.63419 14.6109 6.63692 14.7867 6.63341 14.9624C6.62524 15.3511 6.38695 15.6626 6.01629 15.7761C5.98904 15.7844 5.96295 15.7969 5.93648 15.8071C5.83836 15.8071 5.74142 15.8071 5.64408 15.8071Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span style={{ textTransform: "none" }}>Female</span>
                    </Stack>
                  </ToggleButton>
                  <ToggleButton
                    disableRipple
                    value={3}
                    className={editprofiles.genderbtns}
                  >
                    <Stack direction={"row"} spacing={1}>
                      <span style={{ paddingTop: "2px" }}>
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.7435 6.7082C10.4528 6.99908 10.2011 7.25096 10.0165 7.43568C8.88726 6.62128 7.61544 6.27235 6.21991 6.44663C4.81608 6.62203 3.66118 7.27235 2.78992 8.39003C1.22768 10.3942 1.3397 13.2617 3.03772 15.1105C4.76818 16.9943 7.63053 17.3579 9.754 15.9569C10.8116 15.2595 11.5354 14.3013 11.8839 13.0833C12.3621 11.4123 12.0645 9.8672 11.0771 8.49225C11.262 8.30686 11.5138 8.05459 11.8044 7.76356C11.8357 7.79468 11.8596 7.8185 11.8746 7.83351C11.9364 7.89534 11.9929 7.95317 12.0472 8.0088C12.1528 8.1169 12.2502 8.21667 12.363 8.32128C12.742 8.67289 13.3317 8.60175 13.5615 8.18213C13.7331 7.8683 13.6692 7.49634 13.3889 7.20613C13.2866 7.10008 13.177 6.99158 13.0681 6.88379C13.0165 6.83271 12.9651 6.78179 12.9147 6.73137C12.9054 6.72211 12.892 6.70867 12.8749 6.69157C13.0393 6.52693 13.2055 6.36054 13.3703 6.19553C14.1189 5.44601 14.8391 4.72487 15.2378 4.32527V4.46446C15.2378 4.61957 15.2377 4.77466 15.2377 4.92974C15.2374 5.43351 15.2371 5.93718 15.2397 6.44106C15.2405 6.54328 15.2495 6.64966 15.2789 6.74698C15.3796 7.08044 15.7168 7.28979 16.0567 7.24037C16.4395 7.18492 16.6858 6.89485 16.6865 6.47954C16.6892 5.1525 16.6892 3.82547 16.6873 2.49843C16.6869 2.1729 16.4961 1.91979 16.194 1.83906C16.1087 1.81643 16.0174 1.80851 15.9288 1.80851C14.6393 1.80662 13.3497 1.807 12.0605 1.80738C12.0043 1.80738 11.9478 1.81228 11.8919 1.8202C11.5449 1.86924 11.2896 2.15554 11.2783 2.50635C11.2643 2.93185 11.5846 3.25286 12.0379 3.2555C12.4912 3.25831 12.9446 3.25783 13.3981 3.25734C13.6129 3.25711 13.8277 3.25688 14.0426 3.25701C14.0769 3.25701 14.1113 3.25907 14.145 3.26108C14.159 3.26192 14.173 3.26275 14.1867 3.26342C13.7462 3.70434 12.9238 4.52702 12.1015 5.34963C12.0065 5.44464 11.9116 5.53965 11.8172 5.63407C11.5605 5.37741 11.346 5.16285 11.2914 5.10805C11.114 4.92965 10.9057 4.82969 10.6643 4.83425C10.3388 4.84069 10.1086 4.99513 9.99471 5.28914C9.87869 5.58901 9.94148 5.87987 10.1768 6.13556C10.2362 6.2 10.4683 6.43338 10.7435 6.7082Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span style={{ textTransform: "none" }}>Other</span>
                    </Stack>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="MM/dd/yyyy"
                    sx={{
                      "& .MuiPickersToolbar-penIconButton": {
                        display: "none",
                      },
                    }}
                    closeOnSelect
                    disableFuture
                    label="Date"
                    value={dob}
                    onChange={(newValue) => {
                      setDob(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        id="dateInputTag"
                        sx={{ minWidth: "90px" }}
                        {...params}
                        fullWidth
                        autoComplete="off"
                        size="small"
                        label={
                          <span style={{ paddingRight: "0.5rem" }}>
                            Date of Birth
                          </span>
                        }
                        className={`${inputborder.root}`}
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                            fontFamily: "Poppins",
                          },
                        }}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <img
                                src={calender}
                                alt="caleder"
                                width="27"
                                height="100"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item sx={{ width: "100%" }}>
                <Grid container spacing={1.5}>
                  <Grid item md={3.5} xs={4}>
                    <Button
                      fullWidth
                      disableRipple
                      variant="outlined"
                      onClick={() => setCountrydialog(true)}
                      id="btn"
                      startIcon={
                        <img
                          src={
                            Object.keys(selectedcountry).length > 0
                              ? selectedcountry.country_flag
                              : profile.country_flag
                              ? profile.country_flag
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
                      disabled={profile.mobile ? true : false}
                    >
                      {Object.keys(selectedcountry).length > 0
                        ? selectedcountry.code
                        : profile.code
                        ? profile.code
                        : "+91"}
                    </Button>
                  </Grid>
                  <Grid item md={8.5} xs={8}>
                    <TextField
                      size={"small"}
                      inputRef={phnref}
                      label="Phone Number"
                      onChange={(e) =>
                        setPwdemail((prev) => ({
                          ...prev,
                          phn: e.target.value,
                        }))
                      }
                      value={profile.mobile ? profile.mobile : pwdemail.phn}
                      className={classes.root}
                      fullWidth
                      disabled={profile.mobile ? true : false}
                    />

                    <FormHelperText></FormHelperText>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  label="Email"
                  InputLabelProps={{ shrink: true }}
                  inputRef={mailref}
                  onChange={(e) =>
                    setPwdemail((prev) => ({ ...prev, mail: e.target.value }))
                  }
                  value={profile.email ? profile.email : pwdemail.mail}
                  className={classes.root}
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Email} alt="Email" />
                      </InputAdornment>
                    ),
                  }}
                  disabled={profile.email ? true : false}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  label="Create Password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  inputRef={pwdref}
                  className={classes.root}
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  type={showpwd ? "text" : "password"}
                  helperText={
                    errors.pwd_err === "valid" && (
                      <span style={{ color: "red" }}>
                        Password must contains 1 Capital,1 Small,1 Special
                        Character,1 Number and length must be greater than 6
                      </span>
                    )
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Lock} alt="person" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <img
                          src={showpwd ? viewpassword : hidepassword}
                          onClick={() => setShowpwd(!showpwd)}
                          alt="viewpwd"
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  label="Confirm Password"
                  className={classes.root}
                  fullWidth
                  onChange={(e) => setPwd1(e.target.value)}
                  value={pwd1}
                  size="small"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  inputRef={cnfmpwdref}
                  type={showpwd1 ? "text" : "password"}
                  helperText={
                    errors.cnfm_err === "valid" && (
                      <span style={{ color: "red" }}>
                        Password and confirm password should be same
                      </span>
                    )
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Lock} alt="person" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <img
                          src={showpwd1 ? viewpassword : hidepassword}
                          onClick={() => setShowpwd1(!showpwd1)}
                          alt="viewpwd"
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  // fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: `${styles.app_color}!important`,
                    width: "92%",
                    textTransform: "none",
                  }}
                  onClick={completeprofilehandler}
                >
                  Confirm
                </Button>
              </Grid>
              {/* <Grid item textAlign={"center"} sx={{ color: styles.app_color }}>
                <span onClick={skiphandler}>Skip</span>
              </Grid> */}
            </Grid>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Completeprofile;
