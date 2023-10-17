import React, { useState } from 'react'
import MySnackbar from '../Signupmodals/Snackbar'
import { Dialog, Grid, Stack, TextField, Typography } from '@mui/material';
import CancelIcon from "@mui/icons-material/Cancel";
import {regex_data} from '../../Regex';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Subadminapicalls } from '../../../ApiServices/Subadminapicalls';
const Subadminchangepwd = (props) => {
    const {open,close,hotelid}=props;
    const [snackopen,setSnackopen]=useState(false);
    const [snackmessage,setSnackmessage]=useState("")
    const [pwd,setPwd]=useState({
        newpwd:'',
        cnfmpwd:''
    })
    const [showpwd,setShowpwd]=useState({
        newpwdshow:false,
        cnfmpwdshow:false
    })
    const handleclose=()=>{
        setPwd({newpwd:'',
        cnfmpwd:''    
    })
        close()
    }
    const handletogglepwd=(type)=>{
        if(type===1){
            setShowpwd((prev)=>({
                ...prev,newpwdshow:!prev.newpwdshow
            }))
        }
        else{
            setShowpwd((prev)=>({...prev,cnfmpwdshow:!prev?.cnfmpwdshow}))
        }
    }
    const ChangePassword=async()=>{
        console.log(!regex_data?.pwd_regex.test("krify@123"))
        if(!regex_data?.pwd_regex.test(pwd?.newpwd)||pwd?.newpwd===""){
            setSnackopen(true);
            setSnackmessage("NewPassword should have atleast 1 special character,1 Capital letter,length must be >6")
        }
        else if(!regex_data?.pwd_regex.test(pwd?.cnfmpwd)||pwd?.cnfmpwd===""){
            setSnackopen(true);
            setSnackmessage("CnfmPassword should have atleast 1 special character,1 Capital letter,length must be >6")
        }
        else if(pwd?.newpwd!==pwd?.cnfmpwd){
            setSnackopen(true);
            setSnackmessage("Newpassword and confirm password should be same.")
        }
        else{
            // api call goes here
            const changepwd_status=await Subadminapicalls('subAdminChangePassword',{
              "id":hotelid,
              "password":pwd?.newpwd
              },"POST","application/json"
              )
              if(changepwd_status.status){
                setSnackopen(true);
                setSnackmessage(changepwd_status?.message);
                handleclose()
              }
              else{
                setSnackopen(true);
                setSnackmessage(changepwd_status?.message)
              }
        }
    }
  return (
    <>
    <MySnackbar open={snackopen} close={()=>setSnackopen(false)} message={snackmessage}/>
    <Dialog open={open} onClose={handleclose} sx={{"& .MuiDialog-paper":{borderRadius:'1rem',minWidth:'500px',padding:'1rem',"&::-webkit-scrollbar":{display:'none'}}}}>
        {/* <Grid item md={11} textAlign={'center'}><span style={{fontSize:'1.5rem'}}>Change Password</span></Grid> */}
        <Grid item textAlign={'center'} position={'relative'} p={2} pt={0.5}>
            <Typography fontWeight={'600'} fontSize={'20px'}>Change Password</Typography>
            <CancelIcon sx={{color:'#003556',position:'absolute',right:0,top:0}} onClick={handleclose}/>
        </Grid>
        <Stack spacing={1} sx={{padding:'1rem 3rem 2rem 3rem'}} gap={1.2}>
            {/* <Grid item container alignItems={'center'}>
                
                <Grid item md={1} textAlign={'right'}>
                <CancelIcon sx={{color:'#003556'}}/>
                </Grid>
                </Grid> */}
            <Grid item textAlign={'center'}>
                <TextField size="small" label="New Password" InputLabelProps={{
                  style: {
                    color: "#003556",
                  },
                }}
                InputProps={{
                    endAdornment: showpwd?.newpwdshow ? (
                      <Visibility  onClick={()=>handletogglepwd(1)}/>
                      ) : (
                      <VisibilityOff  onClick={()=>handletogglepwd(1)}/>
                    ),
                  }}
                onChange={(e)=>setPwd((prev)=>({...prev,newpwd:e.target.value}))}
                type={showpwd?.newpwdshow?"text":'password'}
                value={pwd.newpwd}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#003556!important",
                    },
                  },
                }}/>
            </Grid>
            <Grid item textAlign={'center'}>
                <TextField label="Confirm Password" size="small" InputLabelProps={{
                  style: {
                    color: "#003556",
                  },
                }}
                InputProps={{
                    endAdornment: showpwd?.cnfmpwdshow ? (
                      <Visibility onClick={()=>handletogglepwd(2)} />
                      ) : (
                      <VisibilityOff onClick={()=>handletogglepwd(2)}  />
                    ),
                  }}
                  type={showpwd?.cnfmpwdshow?"text":'password'}
                fullWidth
                value={pwd.cnfmpwd}
                onChange={(e)=>setPwd((prev)=>({...prev,cnfmpwd:e.target.value}))}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#003556!important",
                    },
                  },
                }}/>
            </Grid>
            <Grid item textAlign={'center'}>
                <button style={{color:'#fff',border:'none',background:'#003556',height:"40px",width:'140px',borderRadius:'0.5rem'}} onClick={()=>ChangePassword()}>Done</button>
            </Grid>
        </Stack>
    </Dialog>
    </>
  )
}

export default Subadminchangepwd