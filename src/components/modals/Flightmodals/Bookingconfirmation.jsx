import {
  Breadcrumbs,
  Dialog,
  Grid,
  Typography,
  Tab,
  Divider,
  Stack,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { mybookingstyles, ticketbooking } from "../../../assets/styles/Flights";
import confirmed from "../../../assets/images/confirmed.svg";
import Flight from "../../../assets/images/Flight.svg";
import plane from "../../../assets/images/plane.svg";
import information from "../../../assets/images/information.svg";
import direct from "../../../assets/images/direct.svg";
import burger from "../../../assets/images/burger.svg";
import nonveg from "../../../assets/images/nonveg.svg";
import baggage from "../../../assets/images/baggage.svg";
import vistara from "../../../assets/images/vistara.svg";
import trujet from "../../../assets/images/trujet.svg";
import indigo from "../../../assets/images/indigo.svg";
import Refundpolicy from "../../../assets/images/Refundpolicy.svg";
import downarrow from "../../../assets/images/downarrow.svg";
import uparrow from "../../../assets/images/uparrow.svg";
import personblue from '../../../assets/images/personblue.svg'
import correctprimary from '../../../assets/images/correctprimary.svg'
import travelinsurance from '../../../assets/images/travelinsurance.svg'
import correct from '../../../assets/images/correct.svg'
import faredetails from '../../../assets/images/faredetails.svg'
import whitecancelicon from '../../../assets/images/whitecancelicon.svg'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Invoice from "../../pages/Flights/Invoice";
import { useSelector } from "react-redux";
import MySnackbar from "../Signupmodals/Snackbar";
import {styles} from '../../../assets/styles/Styles_export'
const Bookingconfirmation = (props) => {
  const { open, close } = props;
  const mybooking = mybookingstyles();
  const ticketbook = ticketbooking();

  const [flighttab, setFlighttab] = useState(0);
  const [value, setValue] = React.useState("1");
  const [cancellation,setCancellation]=useState(false);
  const bookingdetails = useSelector(state=>state.bookingdetails.bookingdetails)
  // console.log(bookingdetails,"booking details")
  const handleflighttab = (event, newvalue) => {
    setFlighttab(newvalue);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const handlebookingclose=()=>{
    close()
  }
  // pdf download
  const downloadPdf=async()=> {
    // Get the content of the hidden div
    const element = document.getElementById('hiddenDiv');
    const content = element.innerHTML;
    // Create a new div element with the same content as the hidden div
    const newElement = document.createElement('div');
    newElement.style.width="100%"
    newElement.innerHTML = content;
  
    // Set the style properties to position the new element off-screen
    newElement.style.position = 'absolute';
    newElement.style.top = '-9999px';
    newElement.style.left = '-9999px';
  
     // Create a new jsPDF instance
     const pdf = new jsPDF(
      'p','in', 
        [200,297]
      );
    // Add the new element to the DOM
    document.body.appendChild(newElement);
// Calculate the number of pages required to display the entire component
const componentHeight = newElement.clientHeight;
console.log(componentHeight)
const pageHeight = pdf.internal.pageSize.getHeight();
console.log(pageHeight)
const totalPages = Math.ceil(componentHeight / 1000);
       // Loop through each page and add the component image to the PDF
  for (let i = 0; i < totalPages; i++) {
    // Use html2canvas to create an image of the component for the current page
    const scrollY = i * 740;
    const canvas = await html2canvas(newElement, {
      x:0,
      y:scrollY,
      height:740,
      width: 780,
    });
    const imgData = canvas.toDataURL('image/png', 1.0);
    // Add the image to the PDF and create a new page if necessary
    if (i > 0) {
      setSnackopen(true);
      setSnackmessage(i);
      // alert(i)
      pdf.addPage();
    }
    pdf.addImage(imgData, 'PNG', 0, i*10, 200, 0, null, 'FAST');
    // if (i < totalPages - 1) {
    //   pdf.addPage();
    // }
    
  }
  // document.body.removeChild(newElement);
 
  pdf.save("json.pdf")
   
   
  }
    // date conversion
    const get_date=(dep_date)=>{
      const date =  new Date(dep_date)
      return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    }
    // time conversion
    const get_time=(time24h)=>{
      const date=new Date(time24h)
      const hours24=date.getHours()
     //  console.log(hours24)
     const hours12 = hours24 % 12 || 12;
     const minutes = date.getMinutes();
     const amPm = hours24 >= 12 ? 'PM' : 'AM';
      const time12h = `${hours12}:${minutes} ${amPm}`;
     //  console.log(time12h)
  return time12h;
      }
      const get_age=(dob)=>{
        const birth_date=new Date(dob);
        // today date
        const today=new Date();
        // Calculate the age
const ageInMilliseconds = today - birth_date;
const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
// Round down to the nearest integer
const age = Math.floor(ageInYears);
return age;
      }
  return (
    <div>
       <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Dialog
        open={open}
        onClose={handlebookingclose}
        sx={{
          "& .MuiDialog-paper": {
            maxHeight: "95vh",
            maxWidth: "50vw",
            borderRadius: "15px",
          },
        }}
      ><div className="profileDialog">
        <div id="hiddenDiv"  style={{display:'none'}}>
          <Invoice/>
          
      </div>
        <Grid container direction={"column"} rowSpacing={2} >
          {/* upcoming trip */}
          <Grid
            item
            sx={{
                background:`linear-gradient(109.58deg, ${styles.app_color} -43.74%, #0077C1 114.69%)`,
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                padding:'1.5rem',
                paddingTop:'2rem!important'
              }}
          >
            <Grid container direction="column" >
                <Grid item textAlign={'right'}><img src={whitecancelicon} alt="whitecancel" onClick={handlebookingclose}/></Grid>
            <Grid item container direction="column" spacing={1} textAlign="center">
              <Grid item>
                <span className={mybooking.bookingfont}>Booking Confirmed</span>{" "}
                <img src={confirmed} alt="confirmed" />
              </Grid>
              <Grid item>
                <img src={Flight} alt="flight" />
              </Grid>

              <Grid item>
                <span className={mybooking.ticketfont}>
                  TICKET NO: NU7123399400008
                </span>
              </Grid>
              <Grid item mb={2}>
                <span className={mybooking.ticketfont}>
                  ORDER ID: 208833992
                </span>
              </Grid>
              
            </Grid>
            
            </Grid>
          </Grid >
              <Grid sx={{backgroundColor:'rgba(0, 53, 86, 1.2)',color:'#ffff',fontSize:'14px'}} p={2}>
                <Grid container direction={'column'} rowSpacing={0.5} textAlign={'center'}>
                    <Grid item>Ticket has been emailed to </Grid>
                    <Grid item>Koppakaharshavardhan25@gmail.com</Grid>
                    <Grid item>and SMS sent to 908978890</Grid>
                </Grid>
                {JSON.stringify(bookingdetails,null,2)}

              </Grid>
          {/* flight details */}
          <Grid item>
            <Container>
              <TabContext value={flighttab}>
                <TabList
                  onChange={handleflighttab}
                  className={mybooking.flighttabs}
                  sx={{marginLeft:'1.5rem'}}
                >
                  {
                    bookingdetails.map((flight,val)=>{
                      const airline_name=flight.Segments[0].Airline.AirlineName
                      return(
                        <>
                        <Tab value={val} className={mybooking.tabssecondary} label={ <Stack direction="row" spacing={1}>
                        <img src={trujet} alt={airline_name} />
                        <span style={{ textTransform: "none" }}>{airline_name}</span>
                      </Stack>}></Tab></>
                      )
                    })
                  }
                  {/* <Tab
                    disableRipple
                    className={mybooking.tabssecondary}
                    label={
                      <Stack direction="row" spacing={1}>
                        <img src={indigo} alt="indigo" />
                        <span style={{ textTransform: "none" }}>Indigo</span>
                      </Stack>
                    }
                    value="1"
                  ></Tab> */}
                  {/* <Tab
                    disableRipple
                    className={mybooking.tabssecondary}
                    label={
                      <Stack direction="row" spacing={1}>
                        <img src={trujet} alt="trujet" />
                        <span style={{ textTransform: "none" }}>Trujet</span>
                      </Stack>
                    }
                    value="2"
                  >
                    vistara
                  </Tab>
                  <Tab
                    disableRipple
                    className={mybooking.tabssecondary}
                    label={
                      <Stack direction="row" spacing={1}>
                        <img src={vistara} alt="vistara" />
                        <span style={{ textTransform: "none" }}>Vistara</span>
                      </Stack>
                    }
                    value="3"
                  >
                    truejet
                  </Tab> */}
                </TabList>
                <Paper sx={{borderRadius:'1rem'}} elevation={3}>
                  {
                    bookingdetails.map((flight,index)=>{
                      const {Segments:innersegments}=flight;
                      // console.log(flight.Segments[0].Origin.Airport.CityName)
                      const origin=flight.Segments[0].Origin.Airport.CityName;
                      const destination=flight.Segments.at(-1).Destination.Airport.CityName;
                      const date=get_date(flight.Segments[0].Origin.DepTime);
                      const stops=flight.Segments.length-1;
                      const duration=flight.Segments.at(-1)?.AccumulatedDuration??flight.Segments[0].Duration;
                      const jrney_time=`${Math.floor(duration/60).toString().padStart(2,'0')}h ${(duration%60).toString().padStart(2,"0")}m`

                      return(
                        <TabPanel value={index}>
                        <Grid container direction="column" rowSpacing={2.5}>
                          <Grid item>
                            <Grid container direction={"column"} rowSpacing={1}>
                              <Grid item>
                                <Grid container>
                                  <Grid item md={12}>
                                    <span
                                      style={{
                                        fontSize: "18px",
                                        fontWeight: 400,
                                      }}
                                    >
                                      {origin}-{destination}
                                    </span>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Breadcrumbs sx={{ color: "#303030!important" }}>
                                  <span>{date}
                                  </span>
                                  <span>{stops===0?"Non-stop":`${stops}Stop`}</span>
                                  <span>{jrney_time}</span>
                                </Breadcrumbs>
                              </Grid>
                              {
                                innersegments.map((segment,index)=>{
                                  const G_time=segment.GroundTime;
                                  const layover_time=`${Math.floor(G_time/60).toString().padStart(2,'0')}h ${(G_time%60).toString().padStart(2,'0')}mins`;
                                  const duration= segment.Duration;
                        const cal_duration=`${Math.floor(duration/60).toString().padStart(2,'0')}h ${(duration%60).toString().padStart(2,'0')}m`;
                        const depseg_time=get_time(segment.Origin.DepTime);
                        const arrseg_time=get_time(segment.Destination.ArrTime);
                        const dest_loc=segment.Destination.Airport.CityName;
                        const origin_loc=segment.Origin.Airport.CityName
                        const flight_number=`${segment.Airline.AirlineName}, ${segment.Airline.AirlineCode}-${segment.Airline.FlightNumber}`
                        const airline=segment.Airline.AirlineName;
                        const check_inbag=segment.Baggage
                        const cabin_bag=segment.CabinBaggage
                                  return(
                                        <>
                            {G_time>0&&
                            <Grid item>
                            <Divider>Layover:{layover_time}</Divider>
                             </Grid>}
                              <Grid item>
                                <Grid container rowSpacing={1}>
                                  <Grid item md={6}>
                                    <img src={indigo} alt="indigo" /> {flight_number}
                                  </Grid>
                                  <Grid item sm={6} textAlign={"right"}>
                                    <Grid container>
                                      <Grid item md={11}>
                                        Economy
                                      </Grid>
                                      <Grid item md={1} mt={0.5}>
                                        <img src={information} alt="info" />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                {/* Departure time */}
                                <Grid container>
                                  <Grid item md={2}>
                                    <Stack spacing={1}>
                                      <span className={mybooking.timefont}>
                                        {depseg_time}
                                      </span>
                                      <span style={{ fontSize: "12px" }}>
                                        {origin_loc}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: styles.app_color,
                                        }}
                                      >
                                        Sat, 28Dec 22
                                      </span>
                                    </Stack>
                                  </Grid>
                                  {/* Flight design */}
                                  <Grid item md={8}>
                                    <Grid container>
                                      <Grid item md={2} mt={2}>
                                        <img src={plane} alt="plane" />
                                      </Grid>
                                      <Grid item md={6.5}>
                                        <Grid
                                          container
                                          direction="column"
                                          textAlign={"center"}
                                        >
                                          <Grid item sx={{ height: "1rem" }}>
                                            <span
                                              style={{
                                                fontSize: "12px",
                                              }}
                                            >
                                              {cal_duration}
                                            </span>
                                          </Grid>
                                          <Grid item sx={{ height: "1rem" }}>
                                            <img src={direct} alt="onestop" />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item md={3} mt={2}>
                                        <img src={plane} alt="plane" />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  {/* Arrival time */}
                                  <Grid item md={2}>
                                    <Stack spacing={1}>
                                      <span className={mybooking.timefont}>
                                        {arrseg_time}
                                      </span>
                                      <span style={{ fontSize: "12px" }}>
                                        {dest_loc}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: styles.app_color,
                                        }}
                                      >
                                        Sat, 28Dec 22
                                      </span>
                                    </Stack>
                                  </Grid>
                                </Grid>
                              </Grid>
                              {/* Baggage */}
                              <Grid item>
                                <Grid container>
                                  <Grid item md={4} className={mybooking.baggagefont}>
                                    Baggage Type:Adult
                                  </Grid>
                                  <Grid
                                    item
                                    md={3.5}
                                    className={mybooking.baggagefont}
                                  >
                                    Check-in: {check_inbag}
                                  </Grid>
                                  <Grid item md={4} className={mybooking.baggagefont}>
                                    Cabin:{cabin_bag}
                                  </Grid>
                                </Grid>
                              </Grid>
                              {/* coupen */}
                             {(G_time>0 && index===0)&& <Grid item>
                                <Grid container>
                                  <Grid item md={12}>
                                    <span
                                      className={mybooking.baggagefont}
                                      style={{
                                        background: "#DFF3FF",
                                        padding: "5px",
                                        borderRadius: "0.5rem",
                                      }}
                                    >
                                      Change of Plane : Layover in Visakhapatnam {layover_time}
                                    </span>
                                  </Grid>
                                </Grid>
                              </Grid>}
                                        </>
                                  )
                                })
                              }
                             
                            </Grid>
                          </Grid>
                          
                          {/* <Grid item>
                            <Grid container direction="column" rowSpacing={1}>
                              <Grid item>
                                <Grid container>
                                  <Grid item md={6}>
                                    <img src={indigo} alt="indigo" /> IndiGo , IN 6432
                                  </Grid>
                                  <Grid item sm={6} textAlign={"right"}>
                                    <Grid container>
                                      <Grid item md={11}>
                                        Economy
                                      </Grid>
                                      <Grid item md={1} mt={0.5}>
                                        <img src={information} alt="info" />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container>
                                  <Grid item md={2}>
                                    <Stack spacing={1}>
                                      <span className={mybooking.timefont}>
                                        05:30 PM
                                      </span>
                                      <span style={{ fontSize: "12px" }}>
                                        New Delhi
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: styles.app_color,
                                        }}
                                      >
                                        Sat, 28Dec 22
                                      </span>
                                    </Stack>
                                  </Grid>
                                  <Grid item md={8}>
                                    <Grid container>
                                      <Grid item md={2} mt={2}>
                                        <img src={plane} alt="plane" />
                                      </Grid>
                                      <Grid item md={6.5}>
                                        <Grid
                                          container
                                          direction="column"
                                          textAlign={"center"}
                                        >
                                          <Grid item sx={{ height: "1rem" }}>
                                            <span
                                              style={{
                                                fontSize: "12px",
                                              }}
                                            >
                                              00h 45m
                                            </span>
                                          </Grid>
                                          <Grid item sx={{ height: "1rem" }}>
                                            <img src={direct} alt="onestop" />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item md={3} mt={2}>
                                        <img src={plane} alt="plane" />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item md={2}>
                                    <Stack spacing={1}>
                                      <span className={mybooking.timefont}>
                                        6:15 PM
                                      </span>
                                      <span style={{ fontSize: "12px" }}>
                                        Vishakapatnam
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: styles.app_color,
                                        }}
                                      >
                                        Sat, 28Dec 22
                                      </span>
                                    </Stack>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container>
                                  <Grid item md={4} className={mybooking.baggagefont}>
                                    Baggage Type:Adult
                                  </Grid>
                                  <Grid
                                    item
                                    md={3.5}
                                    className={mybooking.baggagefont}
                                  >
                                    Check-in: 15kgs
                                  </Grid>
                                  <Grid item md={4} className={mybooking.baggagefont}>
                                    Cabin:7kgs
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container>
                                  <Grid item md={12}>
                                    <span
                                      className={mybooking.baggagefont}
                                      style={{
                                        background: "#DFF3FF",
                                        padding: "5px",
                                        borderRadius: "0.5rem",
                                      }}
                                    >
                                      Change of Plane : Layover in Visakhapatnam 2 hrs
                                      30 mins
                                    </span>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid> */}
                          <Grid item>
                            <Divider>Add ons</Divider>
                          </Grid>
                          <Grid item>
                            <Grid container direction="column">
                              {
                                flight.Passenger.map((item,index)=>{
                                  return(
                                      item.MealDynamic.map((meal,val)=>{
                                        // console.log(meal)
                                        const price=meal.Price;
                                        const meal_desc=meal.AirlineDescription;
                                        const currency=meal.Currency;
                                        return(
                                          <>
                                          <Grid item>
                                <Grid container>
                                  <Grid item md={1}>
                                    <img src={burger} alt="burger" />
                                  </Grid>
                                  <Grid item md={8}>
                                    <img src={nonveg} alt="nonveg" />{" "}
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: styles.app_color,
                                      }}
                                    >
                                     {meal_desc}
                                    </span>
                                  </Grid>
                                  <Grid item md={3} textAlign="right">
                                    {currency} {price}//&#8377;
                                  </Grid>
                                </Grid>
                              </Grid>
                                          </>
                                        )
                                      }))
                                })
                              }
                              
                              {/* <Grid item>
                                <Grid container>
                                  <Grid item md={1}>
                                    <img src={baggage} alt="baggage" />
                                  </Grid>
                                  <Grid item md={8}>
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: styles.app_color,
                                      }}
                                    >
                                      Additional 25 kg
                                    </span>
                                  </Grid>
                                  <Grid item md={3} textAlign="right">
                                    &#8377; 450.00
                                  </Grid>
                                </Grid>
                              </Grid> */}
                            </Grid>
                          </Grid>
                        </Grid>
                      </TabPanel>
                      )
                    })
                  }
                
                
                <Grid
            item
            sx={{
              backgroundColor: styles.app_color,
              borderBottomLeftRadius: "1rem",
              borderBottomRightRadius: "1rem",
              padding: "0.8rem 0rem",
              color: "#fff",
            }}
            textAlign="center"
          >
            <Typography  onClick={() => {
        setTimeout(() => {
          downloadPdf();
        }, 1000);
      }}>Download invoice</Typography>
          </Grid>
                </Paper>
              </TabContext>
            </Container>
          </Grid>
          
          <Grid item>
            <Container>
            <Paper sx={{ borderRadius: "1rem" }} elevation={3}>
              <Container>
                <Accordion expanded={cancellation} elevation={0}>
                  <AccordionSummary>
                    <Grid container>
                      <Grid item md={0.7}>
                        <img src={Refundpolicy} alt="cancellation" />
                      </Grid>
                      <Grid item md={6}>
                        Cancellation Refund Policy
                      </Grid>
                      <Grid
                        item
                        md={1}
                        onClick={() => {
                          setCancellation((prev) => !prev);
                        }}
                      >
                        <img
                          src={cancellation ? downarrow : uparrow}
                          alt="downarrow"
                        />
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      sx={{
                        background: "#EDF5FA",
                        padding: "1rem",
                        borderRadius: "1rem",
                      }}
                     direction="column" 
                    >
                      <Grid item container>
                      <Grid item md={5}>
                        {/* <Grid container direction="column" rowSpacing={1}>
                          <Grid item className={mybooking.cancellationhead}>
                            Cancellation Time
                          </Grid>
                          <Grid item className={mybooking.cancellationdata}>
                            More than 2hrs
                          </Grid>
                          <Grid item className={mybooking.cancellationdata}>
                            2hrs - 3days
                          </Grid>
                          <Grid item className={mybooking.cancellationdata}>
                            3 - 365days
                          </Grid>
                        </Grid> */}
                        Cancellation Time
                      </Grid>
                      <Grid item md={3}>
                        {/* <Grid container direction={"column"} rowSpacing={1}>
                          <Grid item className={mybooking.cancellationhead}>
                            Penalty%
                          </Grid>
                          <Grid item className={mybooking.cancellationdata}>
                            100%
                          </Grid>
                          <Grid item className={mybooking.cancellationdata}>
                            30%
                          </Grid>
                          <Grid item className={mybooking.cancellationdata}>
                            10%
                          </Grid>
                        </Grid> */}
                        Penalty%
                      </Grid>
                      <Grid item md={4}>
                        Penalty &#8377;
                        {/* <Grid container direction={"column"} rowSpacing={1}>
                          <Grid item>Penalty&#8377;</Grid>
                          <Grid item className={mybooking.cancellationdata}>
                            Non Refundable
                          </Grid>
                          <Grid item className={mybooking.cancellationdata}>
                            &#8377; 690
                          </Grid>
                          <Grid item className={mybooking.cancellationdata}>
                            &#8377; 690
                          </Grid>
                        </Grid> */}
                      </Grid>
                      </Grid>
                      {/* {console.log(bookingdetails)} */}
                      <Grid item container>
                        <Grid item md={5}></Grid>
                        <Grid item md={3}></Grid>
                        <Grid item md={4}></Grid>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Container>
            </Paper>
            </Container>
          </Grid>
          <Grid item>
            <Container>
            <Paper sx={{ borderRadius: "1rem" }} elevation={3}>
              <Grid
                container
                direction="column"
                rowSpacing={1}
                sx={{ padding: "1rem" }}
              >
                <Grid item>
                  <img src={personblue} alt="personblue" />{" "}
                  <span className={mybooking.bookingfontprimary}>
                    Traveller Details
                  </span>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item md={4.5} className={mybooking.cancellationdata}>
                      Name
                      {/* <Grid container direction={"column"} rowSpacing={1}>
                        <Grid item className={mybooking.cancellationhead}>
                          Name
                        </Grid>
                        <Grid item className={mybooking.cancellationdata}>
                          Koppaka harshavardhan
                        </Grid>
                      </Grid> */}
                    </Grid>
                    <Grid item md={1.5} className={mybooking.cancellationdata}>
                      Age
                      {/* <Grid container direction={"column"} rowSpacing={1}>
                        <Grid item className={mybooking.cancellationhead}>
                          Age
                        </Grid>
                        <Grid item className={mybooking.cancellationdata}>
                          24
                        </Grid>
                      </Grid> */}
                    </Grid>
                    <Grid item md={2} className={mybooking.cancellationdata}>
                      Gender
                      {/* <Grid container direction={"column"} rowSpacing={1}>
                        <Grid item className={mybooking.cancellationhead}>
                          Gender
                        </Grid>
                        <Grid item className={mybooking.cancellationdata}>
                          Male
                        </Grid>
                      </Grid> */}
                    </Grid>
                    <Grid item md={2} className={mybooking.cancellationdata}>
                      Traveller
                      {/* <Grid container direction={"column"} rowSpacing={1}>
                        <Grid item className={mybooking.cancellationhead}>
                          Traveller
                        </Grid>
                        <Grid item className={mybooking.cancellationdata}>
                          Adult
                        </Grid>
                      </Grid> */}
                    </Grid>
                    <Grid item md={2} className={mybooking.cancellationdata}>
                      Seat No.
                      {/* <Grid container direction={"column"} rowSpacing={1}>
                        <Grid item className={mybooking.cancellationhead}>
                          Seat No.
                        </Grid>
                        <Grid item className={mybooking.cancellationdata}>
                          <Grid container>
                            <Grid item md={6} textAlign="center">
                              11D
                            </Grid>
                            <Grid item md={6} textAlign="right">
                              <img src={correctprimary} alt="correct" />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid> */}
                    </Grid>
                  </Grid>
                </Grid>
                {
                  bookingdetails.map((flight,index)=>{
                    return(
                      flight.Passenger.map((item,val)=>{
                        // console.log(item.FirstName)
                        const name=`${item.FirstName} ${item.LastName}`
                        const age=get_age(item.DateOfBirth)
                        const gen=item.Gender;
                        const gender=gen===1?"Male":gen===2?"Female":gen===3&&"Others"
                        const traveller=0<=age<=2?"Infant":2<=age<=15?"Child":age>15&&"Adult"
                        const seatno=item.SeatDynamic[0].Code
                        return(
                          <>
                           <Grid item>
                  <Grid container spacing={2}>
                    <Grid item md={4.5} className={mybooking.cancellationdata}>
                      {name}
                      {/* <Grid container direction={"column"} rowSpacing={1}>
                        <Grid item className={mybooking.cancellationhead}>
                          Name
                        </Grid>
                        <Grid item className={mybooking.cancellationdata}>
                          Koppaka harshavardhan
                        </Grid>
                      </Grid> */}
                    </Grid>
                    <Grid item md={1.5} className={mybooking.cancellationdata}>
                      {age}
                      {/* <Grid container direction={"column"} rowSpacing={1}>
                        <Grid item className={mybooking.cancellationhead}>
                          Age
                        </Grid>
                        <Grid item className={mybooking.cancellationdata}>
                          24
                        </Grid>
                      </Grid> */}
                    </Grid>
                    <Grid item md={2} className={mybooking.cancellationdata}>
                      {gender}
                      {/* <Grid container direction={"column"} rowSpacing={1}>
                        <Grid item className={mybooking.cancellationhead}>
                          Gender
                        </Grid>
                        <Grid item className={mybooking.cancellationdata}>
                          Male
                        </Grid>
                      </Grid> */}
                    </Grid>
                    <Grid item md={2} className={mybooking.cancellationdata}>
                      {traveller}
                      {/* <Grid container direction={"column"} rowSpacing={1}>
                        <Grid item className={mybooking.cancellationhead}>
                          Traveller
                        </Grid>
                        <Grid item className={mybooking.cancellationdata}>
                          Adult
                        </Grid>
                      </Grid> */}
                    </Grid>
                    <Grid item md={2} className={mybooking.cancellationdata}>
                      {seatno}
                      {/* <Grid container direction={"column"} rowSpacing={1}>
                        <Grid item className={mybooking.cancellationhead}>
                          Seat No.
                        </Grid>
                        <Grid item className={mybooking.cancellationdata}>
                          <Grid container>
                            <Grid item md={6} textAlign="center">
                              11D
                            </Grid>
                            <Grid item md={6} textAlign="right">
                              <img src={correctprimary} alt="correct" />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid> */}
                    </Grid>
                  </Grid>
                </Grid>
                          </>
                        )
                      })
                    )
                  })
                }
               
              </Grid>
            </Paper>
            </Container>
          </Grid>
          <Grid item>
            <Container>
            <Paper sx={{ borderRadius: "1rem", padding: "1rem" }} elevation={3}>
              <Grid container direction={"column"} rowSpacing={1.5}>
                <Grid item>
                  <img src={travelinsurance} alt="travel insurance" />{" "}
                  <span className={mybooking.bookingfontprimary}>
                    Travel Insurance Details
                  </span>
                </Grid>
                <Grid item className={mybooking.cancellationdata}>
                  Protection your trip from COVID - 19, medical costs & more
                  with Travel Protection from our award-winning partner Xcover.{" "}
                </Grid>
                <Grid item>
                  <Grid container spacing={1.5}>
                    <Grid item md={6}>
                      <Stack direction={"row"} spacing={1}>
                        <img src={correct} alt="correct" />
                        <span className={mybooking.travelinsurancedata}>
                          Refundable flight and trip costs
                        </span>
                      </Stack>
                    </Grid>
                    <Grid item md={6}>
                      <Stack direction={"row"} spacing={1}>
                        <img src={correct} alt="correct" />
                        <span className={mybooking.travelinsurancedata}>
                          24/7 Emergency assistance
                        </span>
                      </Stack>
                    </Grid>
                    <Grid item md={6.5}>
                      <Stack direction={"row"} spacing={1}>
                        <img src={correct} alt="correct" />
                        <span className={mybooking.travelinsurancedata}>
                          Express baggage tracking and cover
                        </span>
                      </Stack>
                    </Grid>
                    <Grid item md={5.5}>
                      <Stack direction={"row"} spacing={1}>
                        <img src={correct} alt="correct" />
                        <span className={mybooking.travelinsurancedata}>
                          Emergency medical and dental
                        </span>
                      </Stack>
                    </Grid>
                    <Grid item md={6}>
                      <Stack direction={"row"} spacing={1}>
                        <img src={correct} alt="correct" />
                        <span className={mybooking.travelinsurancedata}>
                          Delayed or missed flights
                        </span>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            </Container>
          </Grid>
          <Grid item>
            <Container>
            <Paper className={ticketbook.paperadjustment} elevation={3}>
              <Grid container direction={"column"} spacing={1.5}>
                <Grid item>
                  <Stack direction={"row"} spacing={1}>
                    <img src={information} alt="information" />
                    <span className={ticketbook.textsize}>
                      Important Information
                    </span>
                  </Stack>
                </Grid>
                <Grid item>
                  <span className={mybooking.cancellationdata}>
                    Wearing masks/face covers is no longer mandatory. However,,
                    all travellers are advised to wear them, in view of the
                    threat posed by COVID-19.
                  </span>
                </Grid>
              </Grid>
            </Paper>
            </Container>
          </Grid>
          <Grid item sx={{ height: "12rem" }}>
            <Container>
            <Paper sx={{ borderRadius: "1rem", padding: "1rem" }}>
              <Stack direction="row" spacing={1}>
                <img src={faredetails} alt="faredetails" />
                <span className={mybooking.bookingfontprimary}>
                  Fare Details
                </span>
              </Stack>
              <Stack spacing={1.5} mt={2}>
                <Grid item>
                  <Grid container>
                    <Grid item md={4} className={mybooking.cancellationhead}>
                      Base Fare
                    </Grid>
                    <Grid
                      item
                      md={4}
                      textAlign="center"
                      className={mybooking.faredata}
                    >
                      1 x Adult
                    </Grid>
                    <Grid
                      item
                      md={4}
                      textAlign="right"
                      className={mybooking.faredata}
                    >
                      &#8377;2,300
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container>
                    <Grid item md={6} className={mybooking.cancellationhead}>
                      Fee & Surcharges
                    </Grid>
                    <Grid
                      item
                      md={6}
                      textAlign="right"
                      className={mybooking.faredata}
                    >
                      &#8377; 300
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
                <Grid item>
                  <Grid container>
                    <Grid item className={mybooking.bookingfontprimary} md={6}>
                      Grand Total
                    </Grid>
                    <Grid
                      item
                      md={6}
                      textAlign={"right"}
                      className={mybooking.travelinsurancedata}
                    >
                      &#8377;2,600
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
            </Container>
          </Grid>
          
        </Grid>
        </div>
      </Dialog>
      
    </div>
  );
};

export default Bookingconfirmation;
