import { Button, Dialog, DialogActions, Grid, TextField } from '@mui/material'
import React,{useState} from 'react'
import CancelIcon from "@mui/icons-material/Cancel";
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const Queriesdialog = (props) => {
  console.log(props,'props')
    const {open,close,module_type,bookingid}=props;
    const baseurl=process.env.REACT_APP_BASEURL;
    const [issue_data,setIssue_data]=useState("")
    const handleclose=()=>{
      setIssue_data("")
        close()
    }
    const handleUserQueriesDialog = (param) => {
        close()
      }
      // raiserequest api call
      const raiserequest_api=async()=>{
          try{
            if(issue_data===""){
              enqueueSnackbar("Please enter description",{variant:'error'})
              return;
            }
            const raise_reqobj={
              "user_id":localStorage.getItem("userid"),
              "issue":issue_data,
              "module":module_type.toString(),
              "booking_id":bookingid
            }
              const res=await axios.post(`${baseurl}/raiseRequest`,raise_reqobj)
              if(res.data.status){
               handleclose()
               enqueueSnackbar(res.data.message,{variant:'success'})
              }
              else{
                enqueueSnackbar(res.data.message,{variant:'error'})
              }
          }
          catch(error){

          }
      }
  return (
    <Dialog open={open} onClose={handleclose}
    maxWidth='xs'
    sx={{
      "& .MuiDialog-paper": {
        width: "100%",
        // mixHeight: 580,
        // maxWidth: "250px",
        borderRadius: "15px",
        padding: "0.7rem",
      },
    }}
    >
           <Grid container justifyContent={'space-between'}>
          <Grid item>
            <span className="c-000 f-w-500">
              Describe the issue in details
            </span>
          </Grid>
          <Grid item textAlign={"right"} sx={{ color: "#003556" }}>
            {" "}
            <CancelIcon
              onClick={handleclose}
            />
          </Grid> 
        </Grid>

        {/* <Container> */}
        <Grid container direction={"column"} spacing={1} >
          <Grid item sx={{paddingTop:'0px!important'}}>
            {/* <span className="c-p">
              Please confirm to cancel your ticket(s). Once cancelled, your booking can not be reinstated.
            </span> */}
            <TextField
              label='Issue Description'
              placeholder="Please Enter Issue Description"
              value={issue_data}
              onChange={(e)=>setIssue_data(e.target.value)}
              multiline
              rows={3}
              sx={{ margin: '12px 0' }}
              fullWidth
              id='remarkForCancel'
            /><br />
            <span id='textError' className="goAdminErrorMessages"></span>
          </Grid>

        </Grid>
        {/* </Container> */}
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            sx={{
              backgroundColor: "#003556!important",
              color: "#ffff",
              padding: "5px 10px",
              textTransform: "none",
              fontWeight: "600",
            }}
            onClick={() =>raiserequest_api()}
          >
            Raise a Request
          </Button>
        </DialogActions>
        
    </Dialog>
  )
}

export default Queriesdialog