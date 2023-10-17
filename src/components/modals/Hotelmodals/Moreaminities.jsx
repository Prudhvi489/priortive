import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material'
import React from 'react'
import {styles} from '../../../assets/styles/Styles_export'
const Moreaminities = (props) => {
    const {open,onclose,aminitie}=props;
    const handleclose=()=>{
        onclose();
    }
  return (
    <div>
        {open&&<Dialog open={open} onClose={handleclose}
        fullWidth
        maxWidth="sm"
        sx={{
            "& .MuiDialog-paper": {
              width: "100%",
              height:'80vh',
              mixHeight:'80vh',
              borderRadius: "15px",
              padding: "1rem",
            },
          }}
        >
        <DialogTitle>
        <Grid item textAlign={'center'} sx={{fontSize:'18px',fontWeight:'600',color:styles.app_color}}>Aminities</Grid>
            </DialogTitle>    
            <DialogContent>
           <Grid container>
{ aminitie.length>0&&aminitie.map((item,index)=>{
    return(
        <Grid item md={4}>{item}</Grid>
    )
})          
}            </Grid> 
</DialogContent>    
        </Dialog>}
    </div>
  )
}

export default Moreaminities