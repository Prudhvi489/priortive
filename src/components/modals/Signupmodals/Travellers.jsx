import React, { useState } from "react";
//import { TransitionSlide } from "../MuiStyledComponents/MuiStyledComponents";
import {
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Avatar,
  Paper,
  Stack,
  Container,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
//import { TransitionSlideLeft,formatPhoneNumber } from "../MuiStyledComponents/MuiStyledComponents";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Addtraveller from "./Addtraveller";
import EditTraveller from "./EditTraveller";
import { Apipost } from "../../../ApiServices/Apicalls";
import {styles} from '../../../assets/styles/Styles_export'

const useStyles = makeStyles((theme) => ({
  MuiAccordionroot: {
    "&.MuiAccordion-root:before": {
      backgroundColor: "white",
    },
  },
  accordion: {
    '& > *': {
      margin: '0',
      padding:'0'
    },
  },
}));
const TravellersDialog = (props) => {
  const classes = useStyles();
  let open = props.open;
  let closeForm = props.onClose;
  let travellers = props.travellers;
  // console.log(travellers)
  const handleTravellersDialog = (value) => (event) => {
    closeForm();
  };

  const [expanded, setExpanded] = React.useState();
  const [accordsummary, setAccordsummary] = useState();
  const [addtravellerDstate, setAddtravellerDstate] = useState(false);
  const [travellertoedit,setTravellertoedit]=useState("")
  const [edittraveller, setEdittraveller] = useState(false);
  
  const edittravellerdata=(travellerid)=>{
    // alert(travellerid)
    Object.keys(travellers).map((item)=>{
      if(travellers[item].traveller_id == travellerid){
        setTravellertoedit({...travellers[item]})
      }
    })
    setEdittraveller(true);
  }
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setAccordsummary(isExpanded);
  };
  // Delete a traveller
  const deletetraveller=async(travellerid)=>{
    const response = await Apipost("/delTraveller",{user_id:localStorage.getItem("userid"),traveller_id:travellerid})
    if(response.status){
      // callback to recall the travellers api for continuous updation
      props.recalltravellers()
    }

  }
  // Recall the travellers api from the heders agian
  const traverlersrecall = ()=>{
    props.recalltravellers()
  }
  const selecttraveler=()=>{
    // alert("traveller")
  }
  return (
    <React.Fragment>
      <Addtraveller
        open={addtravellerDstate}
        onclose={(e) => {setAddtravellerDstate(false)}}
        travellersapirecall={traverlersrecall}
      />
      <EditTraveller
        open={edittraveller}
        onClose={(e) => setEdittraveller(false)}
        traveller={travellertoedit}
        travellersapirecall={traverlersrecall}
      />
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            mixHeight: 580,
            maxWidth: "420px",
            borderRadius: "15px",
          },
        }}
        maxWidth="xs"
        fullWidth={true}
        className="IssuesFormDialog"
        open={open}
        onClose={handleTravellersDialog(false)}
        //TransitionComponent={TransitionSlide}
      >
        {/* in form loading */}
        <Paper className="" elevation={0}>
          <Grid className="travellercenter" container alignItems="center" justifyContent="center" position={'relative'}>
            <Typography
              textAlign="center"
              
              fontWeight="600"
              padding={1.5}
              variant=""
              component=""
              sx={{fontSize: "20px",color:styles.app_color}}
              
            >
              Traveller's
            </Typography>
            <Grid item sx={{position:'absolute',right:'1%'}}>
              <IconButton onClick={handleTravellersDialog(false)}>
                <CancelRoundedIcon sx={{ color: styles.app_color }} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
        <DialogContent
          className="dialogContent"
          sx={{ padding: "0 20px 25px 20px" }}
        >
          {Object.keys(travellers).map((item, index) => {
            return (
              <Accordion
              key={travellers[item].traveller_id}
                expanded={expanded === travellers[item].traveller_id}
                onChange={handleChange(travellers[item].traveller_id)}
                onClick={selecttraveler}
                sx={{
                  marginBottom: "0.7rem",
                  borderRadius: "1rem",
                  border: "none",
                }}
                classes={{
                  root: classes.MuiAccordionroot,
                }}
                disableGutters={true}
              >
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  disableGutters={true}
                  className={classes.accordion}
                >
                  <Grid container columnSpacing={2}>
                    <Grid item>
                      <Avatar alt="profile" src={travellers[item].traveller_pic}/>
                    </Grid>
                    <Grid item>
                      <Grid container direction={'column'} spacing={1.2}>
                      <Grid item md={10} sx={{ color: styles.app_color }}>
                       {travellers[item].first_name+" "+travellers[item].last_name}
                      </Grid>
                      {!expanded ? (
                        <Grid item >
                          <Grid container spacing={2} justifyContent={"space-between"}>
                            <Grid item md={9}className="grid-width" ><Typography sx={{ color: "#303030" }}>
                            Date of Birth: {travellers[item].dob}
                          </Typography></Grid>
                            <Grid item md={3} textAlign={'right'}>
                              <Stack direction="row" spacing={1.3}>
                              <EditIcon sx={{ color: styles.app_color }} onClick={()=>{edittravellerdata(travellers[item].traveller_id)}}/>
                              <DeleteIcon sx={{ color: "red" }} onClick={()=>{deletetraveller(travellers[item].traveller_id)}}/>
                            </Stack></Grid>
                            </Grid>
                          {/* <Typography sx={{ color: "#303030" }}>
                            Date of Birth: 23/20/1999
                          </Typography>
                          <Typography sx={{ marginLeft: "3rem" }}>
                            <Stack direction="row" spacing={1.3}>
                              <EditIcon sx={{ color: styles.app_color }} onClick={()=>handleEdittravellerDstate(true)}/>
                              <DeleteIcon sx={{ color: "red" }} />
                            </Stack>
                          </Typography> */}
                        </Grid>
                      ):<Grid
                      item
                    >
                      <Typography
                        sx={{ fontSize: "12px", color: styles.app_color }}
                      >
                        Gender
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#303030",
                        }}
                      >
                        {travellers[item].gender==1?"Male":travellers[item].gender==2?"Female":travellers[item].gender==3?"Others":""}
                      </Typography>
                    </Grid>}
                      </Grid>
                    </Grid>
                  </Grid>

                 
                </AccordionSummary>
                <AccordionDetails className={classes.accordion}>
                  <Container>
                    <Container >
                      <Grid
                        container
                        spacing={1.5}
                        pl={1}
                        direction={'column'}
                      >
                        
                        <Grid
                          item
                         
                        >
                          <Typography
                            sx={{ fontSize: "10px", color: styles.app_color }}
                          >
                            Date of Birth
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "#303030",
                            }}
                          >
                           {travellers[item].dob}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          
                        >
                          <Typography
                            sx={{ fontSize: "10px", color: styles.app_color }}
                          >
                            Passport
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "#303030",
                            }}
                          >
                            {travellers[item].passport}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          
                        >
                          <Typography
                            sx={{ fontSize: "10px", color: styles.app_color }}
                          >
                            Passport Expiry
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "#303030",
                            }}
                          >
                            {travellers[item].passport_expiry}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Container>
                  </Container>
                  <Grid
                    container
                    justifyContent="flex-end"
                    spacing={2}
                  >
                    <Grid item sx={{color:styles.app_color,fontSize:'12px'}} >
                      <Stack direction="row" spacing={0.4} onClick={()=>{edittravellerdata(travellers[item].traveller_id)}}>
                        <EditIcon />
                        <Typography>Edit</Typography>
                      </Stack>
                    </Grid>
                    <Grid item sx={{color:'#D02626',fontSize:'12px'}}>
                      <Stack direction='row' spacing={0.4} onClick={()=>{deletetraveller(travellers[item].traveller_id)}}>
                        <DeleteIcon/>
                        <Typography>Delete</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
          {/* {
           Object.keys(travellers).map((item)=>{
            console.log(travellers[item])
           })
          } */}
          {/* 54666666675465464466666666666666666666666 */}
          {/* <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Avatar></Avatar>
              <Grid>
                <Typography sx={{ color: "text.primary" }}>Kumar</Typography>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    style={{ color: "text.secondary", width: "80% !important" }}
                  >
                    Date of Birth: 01/01/01
                  </Typography>
                  <Grid item style={{ display: "flex", width: "20%" }}>
                    <EditIcon />
                    <DeleteIcon />
                  </Grid>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                spacing={2.5}
                sx={{
                  padding: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography color={"primary"}>Name</Typography>
                  <Typography>name comes here</Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography color={"primary"}>Name</Typography>
                  <Typography>name comes here</Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography color={"primary"}>Name</Typography>
                  <Typography>name comes here</Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography color={"primary"}>Name</Typography>
                  <Typography>name comes here</Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography color={"primary"}>Name</Typography>
                  <Typography>name comes here</Typography>
                </Grid>
                <Grid item style={{ display: "flex", width: "20%" }}>
                  <EditIcon />
                  <DeleteIcon />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        General settings
                    </Typography> 
              <Avatar></Avatar>
              <Grid>
                <Typography sx={{ color: "text.primary" }}>Kumar</Typography>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    style={{ color: "text.secondary", width: "80% !important" }}
                  >
                    Date of Birth: 01/01/01
                  </Typography>
                  <Grid item style={{ display: "flex", width: "20%" }}>
                    <EditIcon />
                    <DeleteIcon />
                  </Grid>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                spacing={2.5}
                sx={{
                  padding: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography color={"primary"}>Name</Typography>
                  <Typography>name comes here</Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography color={"primary"}>Name</Typography>
                  <Typography>name comes here</Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography color={"primary"}>Name</Typography>
                  <Typography>name comes here</Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography color={"primary"}>Name</Typography>
                  <Typography>name comes here</Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography color={"primary"}>Name</Typography>
                  <Typography>name comes here</Typography>
                </Grid>
                <Grid item style={{ display: "flex", width: "20%" }}>
                  <EditIcon />
                  <DeleteIcon />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion> */}
          {/* personal detials */}
          {/* <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              //expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Personal data
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion> */}
          <Grid
            contianer
            mt={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item>
              <Button
              disableRipple
                sx={{ background: `${styles.app_color}!important` }}
                variant="contained"
                onClick={(e) => {setAddtravellerDstate(true)}}
              >
                Add Traveller
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default TravellersDialog;
