import { Dialog, Grid } from '@mui/material'
import React from 'react'
import gmtloading from '../../../assets/images/gmtloading.gif'
import CircularProgress from '@mui/material/CircularProgress';
const Loadingmodal = (props) => {
    const {open,loadingclose}=props
    const handleclose=()=>{
        loadingclose()
    }
  return (
    <Dialog fullScreen open={open} onClose={handleclose} PaperProps={{
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}>
        <>
        <CircularProgress sx={{color:'#003556'}}/>
       {/* <Grid item textAlign={'center'} sx={{fontSize:'2rem',fontWeight:600}}>Loading...</Grid> */}
        </>
    </Dialog>
  )
}

export default Loadingmodal