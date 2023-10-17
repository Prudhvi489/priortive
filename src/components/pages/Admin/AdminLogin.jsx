import React, { useState } from 'react';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../../../assets/Subadminassets/logo.svg';
import loginBackground from '../../../assets/Subadminassets/loginbackground.png';
// import MySnackbar from '../../modals/Signupmodals/Snackbar';
import { useNavigate } from 'react-router-dom';
import { regex_data } from '../../Regex'
import { useForm } from 'react-hook-form';
import { makeAdminLogin } from '../../../ApiServices/ServiceApiCalls';
import { enqueueSnackbar } from 'notistack';
import AdminForgotPassword from '../../modals/AdminModals/AdminForgotPassword';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const [showForgotPassword,setShowForgotPassword] = useState(false)
 function handleClose(){
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
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const adminlogin = async (formData) => {
    const adminLoginService = await makeAdminLogin(formData)
    if (adminLoginService.data.status && adminLoginService?.data?.message==="valid user") {
      enqueueSnackbar("Login Successfull", { variant: 'success' })
      localStorage.setItem("admin_login", adminLoginService.data.data)
      navigate("/admin")
    } else {
      enqueueSnackbar(adminLoginService.data.message, { variant: 'error' })

    }
  }
  
  return (
    <>
    <AdminForgotPassword open={showForgotPassword} close={handleClose}/>
     <div
        style={{
          minHeight: '100vh',
          backgroundImage: `url(${loginBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Grid item style={{ backgroundColor: 'white',/* width: '35vw', height: '80vh',*/ borderRadius: '20px', padding:'0px 20px 40px 20px' }} textAlign={'center'} alignContent={'center'}>
          <Grid item md={1} mt={4}>
            <img src={logo} alt="Gomytriplogo" style={{ width: '6rem' }} />
          </Grid>
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
              <Typography style={{fontFamily: 'poppins'}}>Login</Typography>
            </Grid>
            <Grid item md={12} p={'0rem 2rem'} minWidth={'100%'}>
              <TextField 
              {...register('email', { required: { value: true, message: "E-Mail is required" }, pattern: { value: regex_data.email_Regex, message: 'Enter Valid E-mail address' } })}
                  label="Email"
                  size="small"
                  value={email}
                 fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={errors?.email?.message}
              />
            </Grid>
            <Grid item md={12} p={'0rem 2rem'} minWidth={'100%'}>
              <TextField
                {...register('password', { required: { value: true, message: 'Enter Password' } })}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                helperText={errors?.password?.message}
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%' }}
                InputProps={{
                  endAdornment: showPassword ? (
                    <VisibilityOff onClick={handleTogglePassword} />
                  ) : (
                    <Visibility onClick={handleTogglePassword} />
                  ),
                }}
                fullWidth
              />
            </Grid>
            <Grid item minWidth={'100%'}>
              <Button onClick={()=>setShowForgotPassword(true)} variant='text' style={{fontFamily: 'poppins', color: '#AD250A', fontWeight: '600',marginLeft: '10rem'}}>Forgot Your Password?</Button>
            </Grid>
            <Grid item p={'0rem 2rem'} md={12} minWidth={'100%'}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#003556!important",
                  borderRadius: "0.5rem",
                  textTransform:'none',
                  fontFamily:"'Poppins', sans-serif;",
                  fontWeight:'600',
                  // width:"370px"
                }}
                onClick={handleSubmit(adminlogin)}              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AdminLogin;