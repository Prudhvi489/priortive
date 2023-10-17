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
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { mybookingstyles, ticketbooking } from "../../assets/styles/Flights";
import confirmed from "../../assets/images/confirmed.svg";
import Flight from "../../assets/images/Flight.svg";
import plane from "../../assets/images/plane.svg";
import information from "../../assets/images/information.svg";
import direct from "../../assets/images/direct.svg";
import burger from "../../assets/images/burger.svg";
import nonveg from "../../assets/images/nonveg.svg";
import baggage from "../../assets/images/baggage.svg";
import vistara from "../../assets/images/vistara.svg";
import trujet from "../../assets/images/trujet.svg";
import indigo from "../../assets/images/indigo.svg";
import Refundpolicy from "../../assets/images/Refundpolicy.svg";
import downarrow from "../../assets/images/downarrow.svg";
import uparrow from "../../assets/images/uparrow.svg";
import personblue from "../../assets/images/personblue.svg";
import correctprimary from "../../assets/images/correctprimary.svg";
import travelinsurance from "../../assets/images/travelinsurance.svg";
import correct from "../../assets/images/correct.svg";
import faredetails from "../../assets/images/faredetails.svg";
import whitecancelicon from "../../assets/images/whitecancelicon.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Invoice from "../pages/Flights/Invoice";
import { useSelector } from "react-redux";
import BusImg from "../../assets/BusesAssets/busBookingBusImg.jpg";
import miniBus from "../../assets/BusesAssets/miniBus.jpg";
import gomytripclient from "../../GomytripClient";
import helperFunctions from "../../helpers/helperFunctions";
import { getTimeDifferenceBtTwoDates, convertDateFormat } from '../../components/pages/Buses/BusModuleHelperFunctions'
import { useLocation, useNavigate } from "react-router-dom";
import Importantinfo from "../OffersCarousel/Importantinfo";
// import MySnackbar from "./Signupmodals/Snackbar";
const BusBookingConfirmation = (props) => {
  const { open, close } = props;
  const navigate = useNavigate()
  const mybooking = mybookingstyles();
  // for snackbar
  // const [snackopen, setSnackopen] = useState(false);
  // const [snackmessage, setSnackmessage] = useState("");
  // function snackclose() {
  //   setSnackopen(false);
  // };
  //
  const ticketbook = ticketbooking();
  const bookConfirmData = props?.confirmBookData
  const [bookDetailsData, setBookDetailsData] = useState('')

  const [busFairDetails, setBusFairDetails] = useState([])

  const handlebookingclose = () => {
    close();
    navigate('/mybookings/1')


  };
  // pdf download
  const downloadPdf = async () => {
    // Get the content of the hidden div
    const element = document.getElementById("hiddenDiv");
    const content = element.innerHTML;
    // Create a new div element with the same content as the hidden div
    const newElement = document.createElement("div");
    newElement.style.width = "100%";
    newElement.innerHTML = content;

    // Set the style properties to position the new element off-screen
    newElement.style.position = "absolute";
    newElement.style.top = "-9999px";
    newElement.style.left = "-9999px";

    // Create a new jsPDF instance
    const pdf = new jsPDF("p", "in", [200, 297]);
    // Add the new element to the DOM
    document.body.appendChild(newElement);
    // Calculate the number of pages required to display the entire component
    const componentHeight = newElement.clientHeight;
    console.log(componentHeight);
    const pageHeight = pdf.internal.pageSize.getHeight();
    console.log(pageHeight);
    const totalPages = Math.ceil(componentHeight / 1000);
    // Loop through each page and add the component image to the PDF
    for (let i = 0; i < totalPages; i++) {
      // Use html2canvas to create an image of the component for the current page
      const scrollY = i * 740;
      const canvas = await html2canvas(newElement, {
        x: 0,
        y: scrollY,
        height: 740,
        width: 780,
      });
      const imgData = canvas.toDataURL("image/png", 1.0);
      // Add the image to the PDF and create a new page if necessary
      if (i > 0) {
        // setSnackopen(true);
        // setSnackmessage(i);
        alert(i);
        pdf.addPage();
      }
      pdf.addImage(imgData, "PNG", 0, i * 10, 200, 0, null, "FAST");
      // if (i < totalPages - 1) {
      //   pdf.addPage();
      // }
    }
    // document.body.removeChild(newElement);

    pdf.save("json.pdf");
  };
  // date conversion
  const get_date = (dep_date) => {
    const date = new Date(dep_date);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  // time conversion
  const get_time = (time24h) => {
    const date = new Date(time24h);
    const hours24 = date.getHours();
    //  console.log(hours24)
    const hours12 = hours24 % 12 || 12;
    const minutes = date.getMinutes();
    const amPm = hours24 >= 12 ? "PM" : "AM";
    const time12h = `${hours12}:${minutes} ${amPm}`;
    //  console.log(time12h)
    return time12h;
  };
  const get_age = (dob) => {
    const birth_date = new Date(dob);
    // today date
    const today = new Date();
    // Calculate the age
    const ageInMilliseconds = today - birth_date;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
    // Round down to the nearest integer
    const age = Math.floor(ageInYears);
    return age;
  };

  useEffect(() => {
    if (bookConfirmData?.BusId) {
      getTheBookingDetails()
    }
  }, [bookConfirmData])
  const getTheBookingDetails = () => {
    gomytripclient.post('/getBusBookingDetail', { "BusId": bookConfirmData?.BusId, "booking_id": bookConfirmData?.booking_id }//
    ).then((res => {
      if (res.status) {
        setBookDetailsData(res.data.data.bookingResults)
        if (res.data.data.bookingData.length > 0) {
          setBusFairDetails(res.data.data.bookingData)
        } else {
          setBusFairDetails([])
        }
      } else {
        setBookDetailsData([])
      }
      console.log(res)
    })).catch(err => {
      console.log(err)
    })
  }
  return (
    <div>
      {/* <MySnackbar open={snackopen} close={snackclose} message={snackmessage} /> */}
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
      >
        <div className="profileDialog">
          <div id="hiddenDiv" style={{ display: "none" }}>
            <Invoice />
          </div>
          <Grid container direction={"column"} rowSpacing={2}>
            {/* upcoming trip */}
            <Grid
              item
              sx={{
                background:
                  "linear-gradient(109.58deg, #003556 -43.74%, #0077C1 114.69%);",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                padding: "1.5rem",
                paddingTop: "2rem!important",
              }}
            >
              <Grid container direction="column">
                <Grid item textAlign={"right"}>
                  {/* <img
                    src={whitecancelicon}
                    alt="whitecancel"
                    onClick={handlebookingclose}
                  /> */}
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  spacing={1}
                  textAlign="center"
                >
                  <Grid item>
                    <span className={mybooking.bookingfont}>
                      Booking Confirmed
                    </span>{" "}
                    <img src={confirmed} alt="confirmed" />
                  </Grid>
                  <Grid item>
                    <img src={BusImg} alt="BusImg" />
                  </Grid>

                  <Grid item>
                    <span className={mybooking.ticketfont}>
                      TICKET NO:  {bookDetailsData?.TicketNo}
                    </span>
                  </Grid>
                  <Grid item mb={2}>
                    <span className={mybooking.ticketfont}>
                      Invoice Number: {bookDetailsData?.InvoiceNumber}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              sx={{
                backgroundColor: "rgba(0, 53, 86, 1.2)",
                color: "#ffff",
                fontSize: "14px",
              }}
              p={2}
            >
              <Grid
                container
                direction={"column"}
                rowSpacing={0.5}
                textAlign={"center"}
              >
                <Grid item>Ticket has been emailed to </Grid>
                <Grid item>{bookDetailsData?.Passenger?.length > 0 ? bookDetailsData?.Passenger[0]?.Email : ""}</Grid>
                <Grid item>and SMS sent to {bookDetailsData?.Passenger?.length > 0 ? bookDetailsData?.Passenger[0]?.Phoneno : ""}</Grid>
              </Grid>
              {/* {JSON.stringify(bookingdetails,null,2)} */}
            </Grid>
            {/* flight details */}
            <Grid item>
              <Container>
                {/* <Paper> */}
                <Grid container p={1}>
                  <Grid item md={12} className={mybooking.busTravelName}>{bookDetailsData?.TravelName}</Grid>
                  <Grid item>{bookDetailsData?.BusType}</Grid>
                  <Grid item md={12} mt={2}>
                    <Grid container justifyContent={"space-between"}>
                      <Grid item>
                        <img src={miniBus} alt="boardBus" />
                      </Grid>
                      <Grid item className={mybooking.busTravelTimeDifference}> {bookDetailsData?.DepartureTime ? getTimeDifferenceBtTwoDates(bookDetailsData?.DepartureTime, bookDetailsData?.ArrivalTime) : ""}</Grid>
                      <Grid item>
                        <Grid item>
                          <img src={miniBus} alt="boardBus" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider sx={{ display: "flex", margin: "5px 0" }} />
                  </Grid>
                  <Grid container justifyContent={"space-between"} p={1}>
                    <Grid item>
                      Origin:<span className="c-p f-w-500"> {bookDetailsData?.Origin}</span>
                      {/* <p>{bookDetailsData?.BoardingPointdetails ? helperFunctions.get_time(bookDetailsData?.BoardingPointdetails?.CityPointTime) : ""}</p> */}
                      <p>{bookDetailsData?.BoardingPointdetails ? (bookDetailsData?.BoardingPointdetails?.CityPointTime).slice(11, 16) : ""}</p>
                      <p>{bookDetailsData?.BoardingPointdetails?.CityPointTime ? helperFunctions.getshortdate(bookDetailsData?.BoardingPointdetails?.CityPointTime) : ""}</p>
                      <p>{bookDetailsData?.BoardingPointdetails?.CityPointName}</p>
                      <p>{bookDetailsData?.BoardingPointdetails?.CityPointLocation}</p>
                    </Grid>
                    <Grid item>
                      <Divider orientation="vertical" />
                    </Grid>
                    <Grid item>
                      Destination:<span className="c-p f-w-500"> {bookDetailsData?.Destination}</span>
                      {/* <p>{bookDetailsData?.ArrivalTime ? helperFunctions.get_time(bookDetailsData?.ArrivalTime) : ""}</p> */}
                      <p>{bookDetailsData?.ArrivalTime ? (bookDetailsData?.ArrivalTime).slice(11, 16) : ""}</p>
                      <p>{bookDetailsData?.ArrivalTime ? helperFunctions.getshortdate(bookDetailsData?.ArrivalTime) : bookDetailsData?.ArrivalTime}</p>
                      <p>{bookDetailsData?.Destination}</p>
                    </Grid>
                  </Grid>
                  <Divider sx={{ width: "100%" }} />
                  {bookDetailsData?.Passenger?.length > 0 && bookDetailsData?.Passenger.map((PeopleData, index) => {
                    return (
                      <Grid key={index} container justifyContent={"space-between"} p={1} textAlign={'center'}>
                        <Grid md={4} item>{PeopleData?.FirstName}{" "}{PeopleData?.LastName}/{PeopleData?.Age}</Grid>
                        <Grid item md={4}>Seat: {PeopleData?.Seat?.SeatName}</Grid>
                        <Grid md={4} item className={mybooking.busTravelTimeDifference}>Confirmed</Grid>
                      </Grid>
                    )
                  })}

                  {/* <Grid
                                        item
                                        sx={{
                                          backgroundColor: "#003556",
                                          borderBottomLeftRadius: "1rem",
                                          borderBottomRightRadius: "1rem",
                                          padding: "0.8rem 0rem",
                                          color: "#fff",
                                        }}
                                        md={12}
                                        textAlign="center"
                                      >
                                        <Typography
                                        // onClick={() => {
                                        //   setTimeout(() => {
                                        //     downloadPdf();
                                        //   }, 1000);
                                        // }}
                                        >
                                          Download invoice
                                        </Typography>
                                      </Grid> */}
                </Grid>
                {/* </Paper> */}
              </Container>
            </Grid>
            {/* cancellation details Tablet */}
            <Grid item>
              <Container>
                <Paper sx={{ borderRadius: "1rem" }} elevation={3}>
                  <Container>
                    <Accordion expanded={true} elevation={0}>
                      <AccordionSummary sx={{ padding: '0' }}>
                        <Grid container>
                          <Grid item md={0.7}>
                            <img src={Refundpolicy} alt="cancellation" />
                          </Grid>
                          <Grid item md={8}>
                            Cancellation Refund Policy
                          </Grid>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid
                          container
                          sx={{
                            background: "#EDF5FA",
                            padding: ".5rem",
                            borderRadius: "1rem",
                          }}
                          direction="column"
                        >
                          <Grid item container>
                            <Grid item md={12}>
                              <Grid container direction="row" justifyContent={'space-between'} rowSpacing={1}>
                                <Grid md={3} item className={mybooking.cancellationhead}>
                                  From Time
                                </Grid>
                                <Grid md={3} item className={mybooking.cancellationdata}>
                                  To Time
                                </Grid>
                                <Grid md={3} item className={mybooking.cancellationdata}>
                                  Policy
                                </Grid>
                                <Grid md={3} item className={mybooking.cancellationdata} textAlign={'right'}>
                                  Charges
                                </Grid>
                              </Grid>
                            </Grid>
                            {bookDetailsData?.CancelPolicy?.length > 0 && bookDetailsData?.CancelPolicy.map((cancelData, index) => {
                              const cancelfromDate = convertDateFormat(cancelData.FromDate);
                              const canceltoDate = convertDateFormat(cancelData.ToDate);
                              const cancelpolicyString = cancelData.PolicyString;
                              const cancelCancellationCharge = `${cancelData?.CancellationCharge ?? ""} ${cancelData?.CancellationChargeType === 1 ? "₹" : "%"}`
                              return (
                                <Grid item key={index} md={12}>
                                  <Grid container direction={"row"} rowSpacing={1}>
                                    <Grid md={3} item className={mybooking.cancellationhead}>
                                      {cancelfromDate}
                                    </Grid>
                                    <Grid md={3} item className={mybooking.cancellationdata}>
                                      {canceltoDate}
                                    </Grid>
                                    <Grid md={3} item className={mybooking.cancellationdata}>
                                      {cancelpolicyString}
                                    </Grid>
                                    <Grid md={3} item className={mybooking.cancellationdata} textAlign={'right'}>
                                      {cancelCancellationCharge}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              )
                            })}
                          </Grid>
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
            {/* cancellation details Tablet */}

            <Grid item>
              <Container>
                <Paper
                  sx={{ borderRadius: "1rem", padding: "1rem" }}
                  elevation={3}
                >
                  <Grid container direction={"column"} rowSpacing={1.5}>
                    <Grid item>
                      <img src={travelinsurance} alt="travel insurance" />{" "}
                      <span className={mybooking.bookingfontprimary}>
                        Travel Insurance Details
                      </span>
                    </Grid>
                    <Grid item className={mybooking.cancellationdata}>
                      Protection your trip from COVID - 19, medical costs & more
                      with Travel Protection from our award-winning partner
                      Xcover.{" "}
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
                <Importantinfo module_type={3} />
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
                        <Grid
                          item
                          md={4}
                          className={mybooking.cancellationhead}
                        >
                          Base Fare
                        </Grid>
                        <Grid
                          item
                          md={4}
                          textAlign="center"
                          className={mybooking.faredata}
                        >
                          {bookDetailsData?.Passenger?.length} Seat
                        </Grid>
                        <Grid
                          item
                          md={4}
                          textAlign="right"
                          className={mybooking.faredata}
                        >
                          &#8377;{busFairDetails[0]?.published_price}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid
                          item
                          md={6}
                          className={mybooking.cancellationhead}
                        >
                          Fee & Surcharges
                        </Grid>
                        <Grid
                          item
                          md={6}
                          textAlign="right"
                          className={mybooking.faredata}
                        >
                          &#8377; {busFairDetails[0]?.admin_commission}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid
                          item
                          md={4}
                          className={mybooking.cancellationhead}
                        >
                          Discount
                        </Grid>
                        <Grid
                          item
                          md={4}
                          textAlign="center"
                          className={mybooking.faredata}
                        >
                          {/* {bookDetailsData?.Passenger?.length} x Adult */}
                        </Grid>
                        <Grid
                          item
                          md={4}
                          textAlign="right"
                          className={mybooking.faredata}
                        >
                          - &#8377; {busFairDetails[0]?.discount}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Divider />
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid
                          item
                          className={mybooking.bookingfontprimary}
                          md={6}
                        >
                          Grand Total
                        </Grid>
                        <Grid
                          item
                          md={6}
                          textAlign={"right"}
                          className={mybooking.travelinsurancedata}
                        >
                          &#8377;{busFairDetails[0]?.total_price}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Stack>
                </Paper>
                <Stack sx={{ padding: '10px 0' }}>
                  <Button onClick={handlebookingclose} className="bg-p" variant="contained">Done</Button>
                </Stack>
              </Container>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
};

export default BusBookingConfirmation;
