import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';
import { ticket_travellers } from '../../../assets/styles/Flights';
import clsx from "clsx";
import {styles} from '../../../assets/styles/Styles_export'

const Tickettravellers = (props) => {
const ticket = ticket_travellers()
  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: 600,
    borderRadius:'30px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    display:"grid",
    justifyContent:"center",
    "@media (max-width:600px)":{
      width:'90%',
      px: 0,
    }
  };
  const scrollDiv = {
    width: 475,
    maxHeight: 500,
    height:'100%',
    overflowY:"scroll",
    "@media (max-width:600px)":{
      width:250,
      maxHeight:'100%',
      p:0,
    }
  }
  const headerDiv = {
    width: "100%",
    height: 55,
    display:"flex",
    alignItems:"center",
    textAlign:"center",
    justifyContent:"center",
    fontWeight: 500,
    fontSize: "26px",
  }

  const closeIcon = {
    color:styles.app_color ,
    position:"absolute !important" ,
    top:"0px !important" ,
    right:"0px !important" ,
    margin :4,
  }

  let open=props.open;
  let close=props.close;

  let travellers=props.travellers
  // const handleticketdialog=()=>{
  //   close();
  // }
  const handleclose=()=>{
    close()
  }
  const handleclick=(index)=>{
    props.traveller_data(travellers[index])
    close()
  }
  return (
    <Modal
    open={open}
    onClose={handleclose}
    aria-labelledby="child-modal-title"
    aria-describedby="child-modal-description"
  >
    <Box sx={{ ...style }} >
      <CancelIcon sx={{...closeIcon}} onClick={handleclose}/>
      <Grid sx={{...headerDiv}}>
        <Typography sx={{fontWeight: 500,fontSize: "26px" , color:styles.app_color}}>Traveller's</Typography>
      </Grid>
      <Grid sx={{...scrollDiv}} className='scroll_none1'>
        {
          travellers.map((traveller,index)=>{
            let name=`${traveller.first_name} ${traveller.last_name}`
            return(
              <Grid container className={ticket.innerDiv} onClick={()=>handleclick(index)} >
              <Grid item>
                <Avatar
                  alt={traveller?.first_name}
                  src={traveller?.traveller_pic}
                  sx={{ width: 45.25, height: 45.25 , margin:1.5}}
                />
              </Grid>
              <Grid item>
                <Typography className={clsx(ticket.name,"name")}>{name}</Typography>
                <Typography sx={{  fontSize:"12px"}}>{traveller.dob} </Typography>
              </Grid>
            </Grid>
            )
          })
        }
        
     
        

      </Grid>
      
     
    </Box>
  </Modal>
  )
}

export default Tickettravellers