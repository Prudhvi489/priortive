import { Button, Dialog, DialogTitle, Grid } from '@mui/material';
import React from 'react'
import { Subadminapicalls } from '../../../ApiServices/Subadminapicalls';

const Blockhotelconfirmation = ({open,close,blockdata,hotels_refresh}) => {
    console.log(blockdata,"blockdat")
    const handleclose=()=>{
        close()
    }
    // styles
  const styles = {
    title : {
      fontWeight:'500',
      color:'rgba(0, 53, 86, 1)'
    },
    btn: {
      background:'rgba(0, 53, 86, 1)',
      color:'white',
      textTransform:'none',
      borderRadius:'0.6rem',
      "&:hover":{
        background:'rgba(0, 53, 86, 1)',
        color:'white',
      }
    },
    btnRed: {
      background:'rgba(188, 0, 0, 1)',
      color:'white',
      textTransform:'none',
      borderRadius:'0.6rem',
      "&:hover":{
        background:'rgba(188, 0, 0, 1)',
        color:'white',
      }
    }
  }
//   updating the hotel data
const updateblockstatus=async()=>{
    try{
        const blockobj={
            "id":blockdata.id,
            "block_status":!blockdata.block_status?1:0
        }
        const res= await Subadminapicalls('gmtHotels',blockobj,"PUT","application/json")
        if(res.status){
            // alert(res.message)
            alert(!blockdata.block_status?'hotel blocked successfully':'hotel unblocked successfully')
            hotels_refresh()
            handleclose()
        }
        else{
            alert(res.message)
        }
    }
    catch(error){
            alert(error)
    }
}
  return (
    <Dialog open={open} onClose={handleclose} sx={{"& .MuiDialog-paper":{maxWidth: "330px",borderRadius:'1rem'}}}>
    <Grid container p={'1.5rem 2.5rem'} rowGap={2.5}>
      <Grid item>Do you really want to {blockdata.block_status===1?"Unblock":"Block"} the hotel?</Grid>
      <Grid item container justifyContent={'space-evenly'}>
        <Grid item>
          <Button sx={styles.btn} 
            onClick={()=>updateblockstatus()}
            >Yes</Button>
        </Grid>
        <Grid item>
          <Button sx={styles.btnRed} onClick={handleclose}>No</Button>
        </Grid>
      </Grid>
    </Grid>
  </Dialog>
  )
}

export default Blockhotelconfirmation