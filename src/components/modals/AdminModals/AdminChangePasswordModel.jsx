import {
  Button,
  InputAdornment,
  Container,
  Dialog,
  Grid,
  TextField, Typography
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { forgotpwdmodel } from "../../../assets/styles/Flights";
import viewpassword from "../../../assets/images/viewpassword.svg";
import hidepassword from "../../../assets/images/hidepassword.svg";
import Lock from "../../../assets/images/Lock.svg";
import React, { useRef, useState, useEffect } from "react";
import { Apipost } from "../../../ApiServices/Apicalls";
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from "notistack";
import gomytripclient from "../../../GomytripClient";
import { regex_data } from "../../Regex";

const AdminChangePasswordModel = (props) => {
  const forgotcss = forgotpwdmodel();
  const { open, close } = props;
  const [showpwd, setShowpwd] = useState(false);
  const [showpwd2, setShowpwd2] = useState(false);
  const [showpwd3, setShowpwd3] = useState(false);
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const token = searchParams.get('token');

  const navigate = useNavigate();

  const [showForgotPassword, setShowForgotPassword] = useState(false)
  function handleClose() {
    setShowForgotPassword(false)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();


  useEffect(() => {
    if (!id || !token) {
      navigate('/admin')
    }
  }, [])

  function adminChangePassword(dataa) {
    console.log(dataa);
    if (dataa.password !== dataa.ConfirmPassword) {
      enqueueSnackbar('Password and confirm password mismatch', { variant: 'error' })
      return false
    }
    let payload = {"id":localStorage.getItem('admin_login'),"oldPass":dataa.oldPassword,"newPass":dataa.ConfirmPassword}

    setLoading(true)
    gomytripclient.post('/adminChangePassword', payload
    ).then(res => {
      if (res.data.status === 1) {
        enqueueSnackbar(res.data.message, { variant: 'success' })
        setLoading(false)
        reset()
        localStorage.removeItem('admin_login')
        window.location.reload('/admin')
      } else {
        enqueueSnackbar(res.data.message, { variant: 'error' })
        setLoading(false)
      }
    }).catch(err => {
      setLoading(false)
      enqueueSnackbar(err.message, { variant: 'error' })
    })
  }
  function handleclose() {
    close();
  }

  return (
    <div>
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
          <CancelIcon sx={{ color: "#003556" }} onClick={handleclose} />
        </Grid>
        <Container>
          <form onSubmit={handleSubmit(adminChangePassword)} >
            <Grid
              container
              // spacing={3}
              direction="column"
              alignItems="center"
              justify="center"
              columnGap={3}
              rowGap={3}
            >
              <Grid item md={12} mt={3}>
                <Typography fontWeight={'700'} fontSize={'18px'} color={'#003556'} style={{ fontFamily: 'poppins' }}>Change Password</Typography>
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  {...register("oldPassword", { required: { value: true, message: "Enter Old password" } })}
                  label={"Old Password"}
                  className={forgotcss.root}
                  InputLabelProps={{ shrink: true, sx: { color: "#003556!important" } }}
                  fullWidth
                  size="small"
                  helperText={errors?.oldPassword?.message}
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
              </Grid>
              <Grid item>
                <TextField
                  {...register("password", { required: { value: true, message: "Enter New password" }, pattern: { value: regex_data.passwordStrength, message: "Your password must be 8 characters long. It can be the combination of character , symbols , numbers" } })}
                  label={"New Password"}
                  className={forgotcss.root}
                  InputLabelProps={{ shrink: true, sx: { color: "#003556!important" } }}
                  fullWidth
                  size="small"
                  helperText={errors?.password?.message}
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
              </Grid>
              <Grid item>
                <TextField
                  {...register("ConfirmPassword", { required: { value: true, message: "Enter Confirm password" }, pattern: { value: regex_data.passwordStrength, message: "Your password must be 8 characters long. It can be the combination of character , symbols , numbers" } })}

                  label={"Confirm Password"}
                  className={forgotcss.root}
                  InputLabelProps={{ shrink: true, sx: { color: "#003556!important" } }}
                  fullWidth
                  size="small"
                  type={showpwd3 ? "text" : "password"}
                  helperText={errors?.ConfirmPassword?.message}
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
              </Grid>
              <Grid item p={'0rem 2rem'} md={12} minWidth={'100%'}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#003556!important",
                    borderRadius: "0.5rem",
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif;",
                    fontWeight: '600',
                    '&:disabled': {
                      backgroundColor: "#eee !important",
                      cursor: 'not-allowed',
                    },
                    // width:"370px"
                  }}
                  type='submit'
                  disabled={loading}
                >
                  Confirm change
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Dialog>
    </div>
  );
};

export default AdminChangePasswordModel;
