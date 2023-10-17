import React, { useState } from 'react';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../../../assets/Subadminassets/logo.svg';
import loginBackground from '../../../assets/Subadminassets/loginbackground.png';
import { useNavigate } from 'react-router-dom';
import {regex_data} from '../../Regex'
import { Subadminapicalls } from '../../../ApiServices/Subadminapicalls';
import Forgotpwd from '../../modals/Subadminmodals/Forgotpwd';
import Subadminchangepwd from '../../modals/Subadminmodals/Subadminchangepwd';
import {styles} from '../../../assets/styles/Styles_export'
const SubadminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const navigate=useNavigate();
  const [frgtpwd,setFrgtpwd]=useState(false);
  const [pwdopen,setPwdopen]=useState(false);
  const [hotel_id,setHotel_id]=useState("")
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const subadminlogin= async ()=>{
    if(email===""){
      alert("Enter your mail")
      return;
    }
    // else if(!regex_data.email_Regex.test(email)){
    //   alert("Invalid mail");
    //   return;
    // }
    if(password===""){
      alert("Enter your password")
      return;
    }
    const endpoint = `subAdminLogin`
    const data = {
      hotel_code: parseInt(email,10),
      password: password
    }
    try{
      const res = await Subadminapicalls(endpoint,data,"POST","application/json");
      console.log(res);
      if(res.status===1){
        localStorage.setItem("subadmin_login","subadmin")
        localStorage.setItem("subadmin_login_details",JSON.stringify(res.data.logging))
        navigate("/subadmin")
      }else{
        alert(res.message)
      }
    }catch(err){
      console.log(err);
    }

    // navigate("/subadmin")
    // localStorage.setItem("subadmin_login","subadmin")
  }
  const openchangepwd=async(data)=>{
    if(typeof data==="string"){
      setHotel_id(data)
      setPwdopen(true)
    }
  }
  return (
    <>
    <Forgotpwd open={frgtpwd} close={()=>setFrgtpwd(false)} chagepwd={openchangepwd}/>
    <Subadminchangepwd open={pwdopen} close={()=>setPwdopen(false)} hotelid={hotel_id}/>
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
              <TextField label="Hotelcode" fullWidth size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Grid>
            <Grid item md={12} p={'0rem 2rem'} minWidth={'100%'}>
              <TextField
                label="Password"
                type={showPassword ?'text':'password'}
                size="small"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                InputProps={{
                  endAdornment: showPassword ? (
                    <Visibility onClick={handleTogglePassword} />
                    ) : (
                    <VisibilityOff onClick={handleTogglePassword} />
                  ),
                }}
                fullWidth
              />
            </Grid>
            <Grid item minWidth={'100%'}>
              <Typography style={{fontFamily: 'poppins', color: '#AD250A', fontWeight: '600',marginLeft: '10rem'}} onClick={()=>setFrgtpwd(true)}>Forgot Your Password?</Typography>
            </Grid>
            <Grid item p={'0rem 2rem'} md={12} minWidth={'100%'}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: `${styles.app_color}!important`,
                  borderRadius: "0.5rem",
                  textTransform:'none',
                  fontFamily:"'Poppins', sans-serif;",
                  fontWeight:'600',
                  // width:"370px"
                }}
                onClick={()=>subadminlogin()}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SubadminLogin;