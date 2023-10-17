import { TextFormat } from '@mui/icons-material';
import { Dialog, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import CancelIcon from "@mui/icons-material/Cancel";
import MySnackbar from '../Signupmodals/Snackbar';
import { Subadminapicalls } from '../../../ApiServices/Subadminapicalls';

const Forgotpwd = (props) => {
    const {open,close,chagepwd}=props;
    const [hotel_code,setHotel_code]=useState("");
    const [otp,setOtp]=useState();
    const [resendotp,setResendotp]=useState(false)
    const [snackopen,setSnackopen]=useState(false);
    const [snackmessage,setSnackmessage]=useState("")
    const handleclose=()=>{
        setHotel_code("");
        setOtp("")
        setResendotp(false)
        close()
    }
    const sendotp=async()=>{
        if(hotel_code===""){
            setSnackopen(true);
            setSnackmessage("hotel code should not be empty")
            return
        }
        const otpres=await Subadminapicalls('subAdminGetOtp',{"hotelCode":parseInt(hotel_code)},"POST","application/json")
        console.log(otpres,"res")
        if(otpres.status){
          setResendotp(true)
        }
        else{
          setSnackopen(true);
          setSnackmessage(otpres.message)
        }
    }
    const verifyotp=async()=>{
      const verify_staus=await Subadminapicalls('subAdminVerifyOtp',{"hotelCode":parseInt(hotel_code),"otp":parseInt(otp)},"POST","application/json")
      if(verify_staus.status){
        setSnackopen(true);
        setSnackmessage(verify_staus?.message)
        handleclose();
        chagepwd(verify_staus?.data?.hotelCode)
      }
      else{
        setSnackopen(true);
        setSnackmessage(verify_staus?.message)
      }  
    }
  return (
    <>
    <MySnackbar open={snackopen} close={()=>setSnackopen(false)} message={snackmessage}/>
    <Dialog open={open} onClose={handleclose} sx={{"& .MuiDialog-paper":{borderRadius:'1rem',minWidth:'500px',"&::-webkit-scrollbar":{display:'none'}}}}>
        <Grid item textAlign={'center'} position={'relative'} p={2}>
            <Typography fontWeight={'600'} fontSize={'20px'}>Forgot Password</Typography>
            <CancelIcon sx={{color:'#003556',position:'absolute',right:10,top:10}} onClick={handleclose}/>
        </Grid>
       <Stack spacing={1} sx={{padding:'1rem 3rem 2rem 3rem'}} gap={1.2}>
        {/* <Grid item textAlign={'right'}>
            <CancelIcon sx={{color:'#003556'}} onClick={handleclose}/>
        </Grid> */}
        {!resendotp&&<Grid item textAlign={'center'}>
            <TextField label="Hotel code" placeholder='Enter your hotel code' value={hotel_code} onChange={(e)=>setHotel_code(e.target.value)} size="small"  InputLabelProps={{
                  style: {
                    color: "#003556",
                  },
                }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight:'0px',
                    "& fieldset": {
                      borderColor: "#003556!important",
                    },
                  },
                }}/>
        </Grid>}
        {resendotp&&<Grid item  textAlign={'center'}>
            <TextField fullWidth label="Enter otp" placeholder={"Enter your otp"} size="small" value={otp} onChange={(e)=>setOtp(e.target.value)}  InputLabelProps={{
                  style: {
                    color: "#003556",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight:'0px',
                    "& fieldset": {
                      borderColor: "#003556!important",
                    },
                  },
                }}/>
        </Grid>}
        <Grid item textAlign={'center'} sx={{color:'skyblue'}}>
            <span onClick={()=>sendotp()}>{resendotp&&"RESENDOTP"}</span>
        </Grid>
        <Grid item textAlign={'center'}>
            <button style={{color:'#fff',border:'none',borderRadius:'0.5rem',height:'40px',width:'188px',background:'#003556'}} onClick={resendotp?()=>verifyotp():()=>sendotp()}>{resendotp?"Verify otp":"Send otp"}</button>
        </Grid>
       </Stack>
    </Dialog>
    </>
  )
}

export default Forgotpwd