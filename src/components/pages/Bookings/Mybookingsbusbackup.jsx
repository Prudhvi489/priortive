import { convertDateFormat } from "../Buses/BusModuleHelperFunctions";
import {
  Container,
  Grid,
  Paper,
  Breadcrumbs,
  Stack,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button, Rating, CircularProgress, Dialog, TextField, DialogActions, Box, Stepper, Step, StepLabel, StepIcon
} from "@mui/material";
import { getTimeDifferenceBtTwoDates } from "../Buses/BusModuleHelperFunctions";
import React, { useEffect, useState } from "react";
import { mybookingstyles, ticketbooking } from "../../../assets/styles/Flights";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import indigo from "../../../assets/images/indigo.svg";
import sideseat from "../../../assets/images/sideseat.svg";
import plane from "../../../assets/images/plane.svg";
import onestop from "../../../assets/images/onestop.svg";
import nonstop from "../../../assets/images/nonstop.svg";

import filter from "../../../assets/images/filter.svg";
import Flight from "../../../assets/images/Flight.svg";
import information from "../../../assets/images/information.svg";
import direct from "../../../assets/images/direct.svg";
import burger from "../../../assets/images/burger.svg";
import nonveg from "../../../assets/images/nonveg.svg";
import baggage from "../../../assets/images/baggage.svg";
import Refundpolicy from "../../../assets/images/Refundpolicy.svg";
import downarrow from "../../../assets/images/downarrow.svg";
import uparrow from "../../../assets/images/uparrow.svg";
import personblue from '../../../assets/images/personblue.svg'
import correctprimary from '../../../assets/images/correctprimary.svg'
import travelinsurance from '../../../assets/images/travelinsurance.svg'
import correct from '../../../assets/images/correct.svg'
import faredetails from '../../../assets/images/faredetails.svg'
import vistara from '../../../assets/images/vistara.svg'
import trujet from '../../../assets/images/trujet.svg'
import confirmed from '../../../assets/images/confirmed.svg'
import done from '../../../assets/images/done.svg'
import axios from 'axios'
import busimage from "../../../assets/images/busimage.png";
import busBookingBusImg from "../../../assets/BusesAssets/busBookingBusImg.jpg";

import helperFunctions from '../../../helpers/helperFunctions'
import gomytripclient from "../../../GomytripClient";
import RateAndReviewForService from "../../modals/BusesModals/RateAndReviewForService";
import ShowFareDeductionCharges from "../../modals/BusesModals/ShowFareDeductionCharges";
import Swal from "sweetalert2";
import { enqueueSnackbar } from "notistack";
import bookPending from '../../../assets/images/bookPending.svg'
import CancelIcon from "@mui/icons-material/Cancel";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ReplayIcon from '@mui/icons-material/Replay';
import RefreshIcon from '@mui/icons-material/Refresh';
import LoadingButton from '@mui/lab/LoadingButton';
import {StatusStepper,PendingStepper} from "../Buses/StatusStepper";
import Hotelcard from "./Hotels/Hotelcard";

const Mybookings = () => {
  const mybooking = mybookingstyles();
  const ticketbook = ticketbooking();
  const [tabValue, setTabValue] = React.useState("1");
  const [cancellation, setCancellation] = useState(false);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    setBookDetailsData('')
  };
  const steps = [
    'Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad',
  ];
  // -------------------------Bookings data variable
  const [bookingsData, setBookingsData] = useState([])

  // ---INDIVIDUAL BOOK DETAILS DATA
  const [bookDetailsData, setBookDetailsData] = useState('')
  console.log(bookDetailsData,'bookDetailsData')
  const [busFairDetails, setBusFairDetails] = useState([])
  const [bookingDetailsLoading, setBookingDetailsLoading] = useState(null)

  const [cancelDialogState, setCancelDialogState] = useState(false)

  const handleCancelDialogState = (bool) => {
    setCancelDialogState(bool)
  }
  const [userQuerySubmitForm, setUserQuerySubmitForm] = useState(false)
  const handleUserQueriesDialog = (param) => {
    setUserQuerySubmitForm(param)
  }
  useEffect(() => {
    getAllUserBookings()
  }, [tabValue])

  const getAllUserBookings = () => {
    let payloadToSend = {
      "userId": localStorage.getItem('userid'),
      "type":Number(tabValue),
      "module":0
    }
    axios.post(`${process.env.REACT_APP_BASEURL}/userOverallBookings`, payloadToSend
    ).then(res => {
      if (res.data.status === 1 && res.data.data.busData.length > 0) {
        setBookingsData(res.data.data.busData)
      } else {
        setBookingsData([])
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const getTheBookingDetails = (busBookId, bookingId,userRating) => {
    setBookingDetailsLoading(true)
    gomytripclient.post('/getBusBookingDetail', { "BusId": busBookId, "booking_id": parseInt(bookingId) }
    ).then((res => {
      if (res.status) {
        res.data.data.bookingResults.rating = userRating //adding rating key to details obj for feedabck button condition
        setBookDetailsData(res.data.data.bookingResults)
        setBookingDetailsLoading(false)
        if (res.data.data.bookingData.length > 0) {
          setBusFairDetails(res.data.data.bookingData)
        } else {
          setBusFairDetails([])
        }
      } else {
        setBookDetailsData([])
        setBookingDetailsLoading(false)
      }
    })).catch(err => {
      setBookingDetailsLoading(false)
      console.log(err)
    })
  }

  // RATE AND REVIEW CODE

  const [bookingId, setBookingId] = useState('')
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const handleReviewDialogOpen = (dState) => {
    setIsReviewOpen(dState)
  }

  function callBackFromDialog() {
    getAllUserBookings()
    handleReviewDialogOpen(false)
  }
  const [isCancelLoading, setIsCancelLoading] = useState(false)
  // --------------------------------handleBookingCancelApi
  const handleBookingCancelApi = () => {
    const remarkText = document.getElementById('remarkForCancel').value
    const errorSpan = document.getElementById('textError')
    if (remarkText && remarkText.length > 5) {
      setIsCancelLoading(true)
      errorSpan.innerText = ''
      let payLoadToSend = {
        "busId": bookDetailsData.BusId, "remarks": remarkText, "booking_id": bookingId
      }
      gomytripclient.post('busCancel', payLoadToSend
      ).then((res) => {
        if (res.data.status === 1) {
          enqueueSnackbar(res.data.message, { variant: 'success' })
          getAllUserBookings()
          handleCancelDialogState(false)
          setIsCancelLoading(false)
          setBookDetailsData('')
        } else {
          enqueueSnackbar(res.data.message, { variant: 'error' })
          handleCancelDialogState(false)
          setIsCancelLoading(false)
        }
        console.log(res)
      }).catch(err => {
        handleCancelDialogState(false)
        setIsCancelLoading(false)
        console.log(err)
      })

    }
    else if (!remarkText) {
      errorSpan.innerText = 'Remark Is required'
    } else {
      errorSpan.innerText = 'Please enter more Remark Text'
    }
  }
  const [refundBreakUpState, setRefundBreakUpState] = useState(false)
  const handleRefundBreakUpState = (boolState) => {
    setRefundBreakUpState(boolState)
  }
  return (
    <>
      <RateAndReviewForService
        open={isReviewOpen}
        onClose={(e) => handleReviewDialogOpen(false)}
        bookId={bookingId}
        callBackReview={callBackFromDialog}
      />

      {refundBreakUpState && <ShowFareDeductionCharges
        open={refundBreakUpState}
        onClose={(e) => handleRefundBreakUpState(false)}
        cancelData={busFairDetails}
      />}
      <Grid>
        <Grid>
          <Grid sx={{ height: "5vh" }}></Grid>
        </Grid>
        <Grid>
          <Grid>
            <Container maxWidth="xl">
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <span className={mybooking.bookingfontprimary}>My Bookings</span>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item md={7}>
                      <TabContext value={tabValue}>
                        <TabList
                          onChange={handleChange}
                          aria-label="my booking tabs4"
                          className={mybooking.tabsstyles}
                        >
                          <Tab
                            disableRipple
                            className={mybooking.tabs}
                            sx={{ color: "#003556" }}
                            label="Upcoming"
                            value="1"
                          />
                          <Tab
                            disableRipple
                            className={mybooking.tabs}
                            sx={{ color: "#003556" }}
                            label="Past"
                            value="2"
                          />
                          <Tab
                            disableRipple
                            className={mybooking.tabs}
                            sx={{ color: "#003556" }}
                            label="Pending"
                            value="3"
                          />
                          <Tab
                            disableRipple
                            className={mybooking.tabs}
                            sx={{ color: "#003556" }}
                            label="Cancelled"
                            value="4"
                          />
                        </TabList>

                      </TabContext>
                    </Grid>
                    <Grid item textAlign={"right"} md={5}>
                      <img src={filter} alt="filter" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item md={7}>
                      {bookingsData.map((BookItem) => {
                        return (
                          <Paper className={`${mybooking.seeBookDetails} ${BookItem?.book_id == bookDetailsData?.BusId ? "activeBookItem" : "NonBookItem"}`} onClick={(e) => { tabValue == 3 ? setBookDetailsData(BookItem) :  getTheBookingDetails(BookItem.book_id, BookItem.booking_id,BookItem.rating); setBookingId(BookItem.booking_id); }} key={BookItem.booking_id} sx={{ borderRadius: "0.5rem", margin: '8px 0' }}>
                            <Grid container direction={"column"} mt={1.5}>
                              <Container>
                                <Grid item mt={2}>
                                  <Grid container>
                                    <Grid item md={9}>
                                      {/* <img src={indigo} alt="indigo" />{" "} */}
                                      {/* <span>IndiGo , IN 6432</span> */}
                                      <span className={mybooking.busTravelName}>{BookItem.service_name}</span>
                                    </Grid>
                                    <Grid item md={3} textAlign="right">
                                      &#8377; {BookItem.total_price}
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item mt={1}>
                                  <Grid container>
                                    <Grid item md={9}>
                                      <Grid container>
                                        <Grid item md={6}>
                                          <span
                                            className={mybooking.timefont}
                                          >
                                            {/* {helperFunctions.get_time(BookItem.boardingpoint_time)} */}
                                            {(BookItem.boardingpoint_time).slice(11,16)}
                                            
                                          </span>
                                        </Grid>
                                        <Grid item md={6} textAlign="right">
                                          <span
                                            className={mybooking.timefont}
                                          >
                                            {/* {helperFunctions.get_time(BookItem.droppingpoint_time)} */}
                                            {(BookItem.droppingpoint_time).slice(11,16)}

                                          </span>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                {/* main */}
                                <Grid item>
                                  <Grid container>
                                    <Grid item md={9}>
                                      <Grid container alignItems={"center"}>
                                        <Grid item md={3}>
                                          <span className="c-p f-w-700">{BookItem.origin}</span><br />
                                          <span>{BookItem.boardingpoint_name}</span>
                                        </Grid>
                                        <Grid item md={6}>
                                          <Grid
                                            container
                                            alignItems={"flex-end"}
                                          >
                                            <Grid item md={3}>
                                              <img
                                                src={busimage}
                                                alt="Bus"
                                              />
                                            </Grid>
                                            <Grid
                                              item
                                              md={6}
                                              textAlign="center"
                                            >
                                              <Grid
                                                container
                                                direction="column"
                                              >
                                                <Grid
                                                  item
                                                // sx={{ height: "1rem" }}
                                                >
                                                  <span
                                                    className={mybooking.busTravelTimeDifference}
                                                  >
                                                    {getTimeDifferenceBtTwoDates(BookItem.boardingpoint_time, BookItem.droppingpoint_time)}
                                                  </span>
                                                </Grid>
                                                <Grid
                                                  item
                                                  sx={{ height: "1rem" }}
                                                >
                                                  <img
                                                    src={nonstop}
                                                    alt="nonstop"
                                                    width="100%"
                                                  />
                                                </Grid>
                                                <Grid
                                                  item
                                                  sx={{ height: "1rem" }}
                                                >
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                    }}
                                                  >
                                                    {/* 1 Stop */}
                                                  </span>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            <Grid item md={3}>
                                              <img
                                                src={busimage}
                                                alt="busimage"
                                              />
                                            </Grid>
                                          </Grid>
                                        </Grid>

                                        <Grid item md={3} textAlign="right">
                                          <span className="c-p f-w-700">{BookItem.destination}</span>
                                          <br />
                                          <span>{BookItem.droppingpoint_name}</span>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Container>

                              <Grid item pl={3} sx={{ height: "2.8rem" }}>
                                <Grid container>
                                  <Grid item md={9}>
                                    <Grid container>
                                      <Grid item md={6}>
                                        <span
                                          className={mybooking.timefont}
                                        >
                                          {helperFunctions.getshortdate(BookItem.boardingpoint_time)}
                                        </span>
                                      </Grid>
                                      <Grid item md={6} textAlign="right">
                                        <span
                                          className={mybooking.timefont}
                                        >
                                          {helperFunctions.getshortdate(BookItem.droppingpoint_time)}
                                        </span>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item md={3} textAlign="right">
                                    {BookItem.rating && tabValue == 2 ?
                                      <Rating name="size-medium" defaultValue={BookItem.rating} readOnly precision={0.5} /> :
                                      tabValue == 2 && !BookItem.rating ? <button
                                        style={{
                                          color: "#ffff",
                                          backgroundColor: "#003556",
                                          padding: "0.8rem 1rem",
                                          border: "none",
                                          borderBottomRightRadius: "0.6rem",
                                          fontSize: "14px",
                                        }}
                                        onClick={(e) => { handleReviewDialogOpen(true); setBookingId(BookItem.booking_id) }}
                                      >
                                        Rate Us
                                      </button> : ""
                                    }
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Paper>
                        );
                      })}
                      <Grid item mt={5}>
                       <Hotelcard />
                       </Grid>
                    </Grid>
                    {bookingDetailsLoading === false && bookDetailsData?.BusId && tabValue != 3 ?
                      <Grid item md={5}>
                        <Grid
                          container
                          direction={"column"}
                          spacing={2}
                          justifyItems={"center"}
                        >

                          <Grid item mt={4}>
                            <Paper sx={{ borderRadius: "1rem" }}>
                              <Grid container direction={"column"} rowSpacing={2}>
                                {/* upcoming trip */}
                                {tabValue == "1" ?
                                  <Grid
                                    item
                                    sx={{
                                      background: 'linear-gradient(109.58deg, #003556 -43.74%, #0077C1 114.69%);',
                                      borderTopLeftRadius: "1rem",
                                      borderTopRightRadius: "1rem",
                                    }}
                                  >
                                    <Grid
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
                                        <img src={busBookingBusImg} alt="flight" />
                                      </Grid>

                                      <Grid item>
                                        <span className={mybooking.ticketfont}>
                                          TICKET NO: {bookDetailsData?.TicketNo}
                                        </span>
                                      </Grid>
                                      <Grid item mb={2}>
                                        <span className={mybooking.ticketfont}>
                                          Invoice Number: {bookDetailsData?.InvoiceNumber}
                                        </span>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  : tabValue == "2" ?
                                    <Grid
                                      item
                                      sx={{
                                        background: "linear-gradient(99.75deg, #485F66 1.33%, #122226 104.22%);",
                                        borderTopLeftRadius: "1rem",
                                        borderTopRightRadius: "1rem",
                                      }}
                                    >
                                      <Grid
                                        container
                                        direction="column"
                                        spacing={1}
                                        textAlign="center"
                                      >
                                        <Grid item>
                                          <span className={mybooking.bookingfont}>
                                            Hope You had a nice journey
                                          </span>{" "}

                                        </Grid>
                                        <Grid item>
                                          <img src={done} alt="done" />
                                        </Grid>

                                        <Grid item>
                                          <span className={mybooking.ticketfont}>
                                            TICKET NO: {bookDetailsData?.TicketNo}
                                          </span>
                                        </Grid>
                                        <Grid item mb={2}>
                                          <span className={mybooking.ticketfont}>
                                            Invoice Number: {bookDetailsData?.InvoiceNumber}
                                          </span>
                                        </Grid>
                                      </Grid>
                                    </Grid> : tabValue == "3" ?
                                      <Grid
                                        item
                                        sx={{
                                          background: "linear-gradient(99.75deg, #485F66 1.33%, #122226 104.22%);",
                                          borderTopLeftRadius: "1rem",
                                          borderTopRightRadius: "1rem",
                                        }}
                                      >
                                        <Grid
                                          container
                                          direction="column"
                                          spacing={1}
                                          textAlign="center"
                                        >
                                          <Grid item>
                                            <span className={mybooking.bookingfont}>
                                              Hope You had a nice journey
                                            </span>{" "}

                                          </Grid>
                                          <Grid item>
                                            <img src={done} alt="done" />
                                          </Grid>

                                          <Grid item>
                                            <span className={mybooking.ticketfont}>
                                              TICKET NO: {bookDetailsData?.TicketNo}
                                            </span>
                                          </Grid>
                                          <Grid item mb={2}>
                                            <span className={mybooking.ticketfont}>
                                              Invoice Number: {bookDetailsData?.InvoiceNumber}
                                            </span>
                                          </Grid>
                                        </Grid>
                                      </Grid> : <Grid
                                        item
                                        sx={{
                                          background: "linear-gradient(116.32deg, #AD250A -5.88%, #E22500 111.84%);",
                                          borderTopLeftRadius: "1rem",
                                          borderTopRightRadius: "1rem",
                                        }}
                                      >
                                        <Grid
                                          container
                                          direction="column"
                                          spacing={1}
                                          textAlign="center"
                                        >
                                          <Grid item>
                                            <span className={mybooking.bookingfont}>
                                              Your Booking is Cancelled
                                            </span>{" "}

                                          </Grid>
                                          <Grid item>
                                            <CancelIcon fontSize='large' sx={{ color: '#fff', fontSize: '70px' }} />
                                            {/* <img src={done} alt="done" /> */}
                                          </Grid>

                                          <Grid item>
                                            <span className={mybooking.ticketfont}>
                                              TICKET NO: {bookDetailsData?.TicketNo}
                                            </span>
                                          </Grid>
                                          <Grid item mb={2}>
                                            <span className={mybooking.ticketfont}>
                                              Invoice Number: {bookDetailsData?.InvoiceNumber}
                                            </span>
                                          </Grid>
                                        </Grid>
                                      </Grid>}

                                <Grid item>
                                  <Container>
                                    {/* <Paper> */}
                                    <Grid container p={1}>
                                      {tabValue == 4 && <><Box sx={{ width: '100%', margin: '10px 0' }}>
                                        <StatusStepper/>
                                      </Box>
                                        <RefreshIcon className="c-p" /> <span style={{ textDecoration: 'underline' }} className="c-p f-w-700" onClick={() => handleRefundBreakUpState(true)}>View Refund Breakup</span>
                                      </>}
                                      <Grid mt={1} item md={12} className={mybooking.busTravelName}>{bookDetailsData?.TravelName}</Grid>
                                      <Grid item>{bookDetailsData?.BusType}</Grid>
                                      <Grid item md={12} mt={2}>
                                        <Grid container justifyContent={"space-between"}>
                                          <Grid item>
                                            <img src={busimage} alt="boardBus" />
                                          </Grid>
                                          <Grid item className={mybooking.busTravelTimeDifference}> {bookDetailsData?.DepartureTime ? getTimeDifferenceBtTwoDates(bookDetailsData?.DepartureTime, bookDetailsData?.ArrivalTime) : ""}</Grid>
                                          <Grid item>
                                            <Grid item>
                                              <img src={busimage} alt="boardBus" />
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Divider sx={{ display: "flex", margin: "5px 0" }} />
                                      </Grid>
                                      <Grid container justifyContent={"space-between"} p={1}>
                                        <Grid item>
                                          Origin:<span className="c-p f-w-500"> {bookDetailsData?.Origin}</span>
                                          {/* <p>{bookDetailsData?.BoardingPointdetails ? helperFunctions.get_time(bookDetailsData?.BoardingPointdetails?.CityPointTime) : ""}</p> */}
                                          <p>{bookDetailsData?.BoardingPointdetails ? (bookDetailsData?.BoardingPointdetails?.CityPointTime).slice(11,16) : ""}</p>
                                          <p>{bookDetailsData?.BoardingPointdetails?.CityPointTime ? helperFunctions.getshortdate(bookDetailsData?.BoardingPointdetails?.CityPointTime) : ""}</p>
                                          {/* <p>point Name:<span className="c-p f-w-500"> {bookDetailsData?.BoardingPointdetails?.CityPointName}</span></p> */}
                                          <p><span className="c-p f-w-500"> {bookDetailsData?.BoardingPointdetails?.CityPointLocation}</span></p>
                                          <p><span className="c-p f-w-500"> {bookDetailsData?.BoardingPointdetails?.CityPointAddress}</span></p>

                                        </Grid>
                                        <Grid item>
                                          <Divider orientation="vertical" />
                                        </Grid>
                                        <Grid item>
                                          Destination:<span className="c-p f-w-500"> {bookDetailsData?.Destination}</span>
                                          {/* <p>{bookDetailsData?.ArrivalTime ? helperFunctions.get_time(bookDetailsData?.ArrivalTime) : ""}</p> */}
                                          <p>{bookDetailsData?.ArrivalTime ? (bookDetailsData?.ArrivalTime).slice(11,16) : ""}</p>
                                          <p>{bookDetailsData?.ArrivalTime ? helperFunctions.getshortdate(bookDetailsData?.ArrivalTime) : bookDetailsData?.ArrivalTime}</p>
                                          <p>{bookDetailsData?.Destination}</p>
                                        </Grid>
                                      </Grid>
                                      <Divider sx={{ width: "100%" }} />
                                      {tabValue != 4 && bookDetailsData?.Passenger?.length > 0 && bookDetailsData?.Passenger.map((PeopleData, index) => {
                                        return (
                                          <Grid key={index} container justifyContent={"space-between"} p={1} textAlign={'center'}>
                                            <Grid md={4} item>{PeopleData?.FirstName}{" "}{PeopleData?.LastName}/{PeopleData?.Age}</Grid>
                                            <Grid item md={4}>Seat: {PeopleData?.Seat?.SeatName}</Grid>
                                            <Grid md={4} item className={mybooking.busTravelTimeDifference}>Confirmed</Grid>
                                          </Grid>
                                        )
                                      })}
                                      {/* Download Invoice button */}
                                      {/* {tabValue == 1 || tabValue == 2 ? <Grid
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
                                      </Grid> : ""} */}
                                    </Grid>
                                    {/* </Paper> */}
                                  </Container>
                                </Grid>

                                {tabValue == 4 ? <Grid item>
                                  <Container>
                                    <Paper
                                      sx={{ borderRadius: "1rem", padding: ".5rem" }}
                                      elevation={3}
                                    >
                                      <Grid flexDirection={'row'} container direction={"column"} rowSpacing={1.5}>
                                        <Grid item>
                                          <span className="makeFlex">
                                            <SupportAgentIcon /> <span style={{ fontWeight: '500', color: '#000' }}>Got Queries?</span> &nbsp;<span onClick={() => handleUserQueriesDialog(true)} className="c-p f-w-700 cursor-p">Contact Support</span>
                                          </span>
                                        </Grid>
                                      </Grid>
                                    </Paper>
                                  </Container>
                                </Grid> : ""}

                                {/* cancellation details Tablet */}
                                <Grid item>
                                  <Container>
                                    <Paper sx={{ borderRadius: "1rem" }} elevation={3}>
                                      <Container>
                                        <Accordion expanded={cancellation || true} elevation={0}>
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

                                {tabValue == 1 || tabValue == 2 ? <Grid item>
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
                                </Grid> : ""}
                                {tabValue == 1 || tabValue == 2 ? <Grid item>
                                  <Container>
                                    <Paper className={ticketbook.paperadjustment} elevation={3}>
                                      <Grid container direction={"column"} spacing={1}>
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
                                            Wearing masks/face covers is no longer mandatory.
                                            However,, all travellers are advised to wear them, in
                                            view of the threat posed by COVID-19.
                                            
                                          </span>
                                        </Grid>
                                      </Grid>
                                    </Paper>
                                  </Container>
                                </Grid> : ""}
                                <Grid item sx={{ height: "13rem" }}>
                                  <Container>
                                    <Paper sx={{ borderRadius: "1rem", padding: "1rem" }}>
                                      <Stack direction="row" spacing={1}>
                                        <img src={faredetails} alt="faredetails" />
                                        <span className={mybooking.bookingfontprimary}>
                                          Fare Details
                                        </span>
                                      </Stack>
                                      <Stack spacing={1.5} mt={1}>
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
                                              {bookDetailsData?.Passenger?.length} x Adult
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
                                        {/* DISCOUNT */}
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
                                             + &#8377; {busFairDetails[0]?.admin_commission}
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
                                  </Container>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                          {tabValue == "1" ? <Grid item>
                            <Grid container spacing={1} justifyContent={'center'} sx={{padding:'10px 0'}}>
                              {/* <Grid item md={6}><Button fullWidth variant={"outlined"} sx={{ textTransform: 'none', color: '#003556', borderRadius: '0.5rem', borderColor: '#003556' }}>Date Change</Button></Grid> */}
                              <Grid item md={6}><Button onClick={(e) => handleCancelDialogState(true)} fullWidth variant={"contained"} sx={{ textTransform: 'none', color: '#ffff', backgroundColor: '#003556', borderRadius: '0.5rem' }}>Cancel</Button></Grid>
                            </Grid>
                          </Grid> : tabValue == "2" && !bookDetailsData.rating ?
                            <Grid item textAlign={'center'}>
                              <Button onClick={(e) => { handleReviewDialogOpen(true) }} variant="contained" disableRipple sx={{ backgroundColor: '#003556!important', textTransform: 'none', padding: '0.3rem 5rem', marginBottom: '0.5rem' }}>Feedback</Button>
                            </Grid> : <h3></h3>}
                        </Grid>
                      </Grid> : tabValue != 3 ? <Grid item md={5} display={'flex'} justifyContent={'center'}>{bookingDetailsLoading === true && <CircularProgress />} </Grid> : ""}
                    {tabValue == 3 && bookDetailsData.booking_id &&
                      <Grid item md={5}>
                        <Grid
                          container
                          direction={"column"}
                          spacing={2}
                          justifyItems={"center"}
                        >
                          <Grid item mt={4}>
                            <Paper sx={{ borderRadius: "1rem" }}>
                              <Grid container direction={"column"} rowSpacing={2}>
                                {/* upcoming trip */}
                                {tabValue == "3" ?
                                  <Grid
                                    item
                                    sx={{
                                      background: "linear-gradient(99.8deg, #EBA731 -13.2%, #A36200 109.29%);",
                                      borderTopLeftRadius: "1rem",
                                      borderTopRightRadius: "1rem",
                                      padding: '40px'
                                    }}
                                  >
                                    <Grid
                                      container
                                      direction="column"
                                      spacing={1}
                                      textAlign="center"
                                    >
                                      <Grid item>
                                        <span className={mybooking.bookingfont}>
                                          Your Booking is Pending
                                        </span>{" "}

                                      </Grid>
                                      <Grid item>
                                        <img src={bookPending} alt="done" />
                                      </Grid>
                                      <Grid item>
                                        <span className={mybooking.ticketfont}>
                                          TICKET NO: #####
                                        </span>
                                      </Grid>

                                    </Grid>
                                  </Grid> : "NO COVER"}

                                <Grid item>
                                  <Container>
                                    {/* <Paper> */}
                                    <Grid container p={1}>
                                      <PendingStepper/>
                                      <Grid item md={12} className={mybooking.busTravelName}>{bookDetailsData?.travel_name}</Grid>
                                      <Grid item>{bookDetailsData?.BusType}</Grid>
                                      <Grid item md={12} mt={2}>
                                        <Grid container justifyContent={"space-between"}>
                                          <Grid item>
                                            <img src={busimage} alt="boardBus" />
                                          </Grid>
                                          <Grid item className={mybooking.busTravelTimeDifference}> {bookDetailsData?.boardingpoint_time ? getTimeDifferenceBtTwoDates(bookDetailsData?.boardingpoint_time, bookDetailsData?.droppingpoint_time) : ""}</Grid>
                                          <Grid item>
                                            <Grid item>
                                              <img src={busimage} alt="boardBus" />
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Divider sx={{ display: "flex", margin: "5px 0" }} />
                                      </Grid>
                                      <Grid container justifyContent={"space-between"} p={1}>
                                        <Grid item>
                                          {/* <p>{bookDetailsData?.boardingpoint_time ? helperFunctions.get_time(bookDetailsData?.boardingpoint_time) : ""}</p> */}
                                          <p>{bookDetailsData?.boardingpoint_time ? (bookDetailsData?.boardingpoint_time).slice(11,16) : ""}</p>
                                          <p>{bookDetailsData?.boardingpoint_time ? helperFunctions.getshortdate(bookDetailsData?.boardingpoint_time) : ""}</p>
                                          <p>{bookDetailsData?.boardingpoint_name}</p>
                                        </Grid>
                                        <Grid item>
                                          <Divider orientation="vertical" />
                                        </Grid>
                                        <Grid item>
                                          {/* <p>{bookDetailsData?.droppingpoint_name ? helperFunctions.get_time(bookDetailsData?.droppingpoint_time) : ""}</p> */}
                                          <p>{bookDetailsData?.droppingpoint_name ? (bookDetailsData?.droppingpoint_time).slice(11,16) : ""}</p>
                                          <p>{bookDetailsData?.droppingpoint_name ? helperFunctions.getshortdate(bookDetailsData?.droppingpoint_time) : bookDetailsData?.droppingpoint_time}</p>
                                          <p>{bookDetailsData?.droppingpoint_name}</p>
                                        </Grid>
                                      </Grid>
                                      <Divider sx={{ width: "100%" }} />

                                    </Grid>
                                    {/* </Paper> */}
                                  </Container>
                                </Grid>
                                {/* GET CONTACT SUPPORT ONLU FOR PENDING */}

                                {tabValue == 3 ? <Grid item>
                                  <Container>
                                    <Paper
                                      sx={{ borderRadius: "1rem", padding: ".5rem" }}
                                      elevation={3}
                                    >
                                      <Grid flexDirection={'row'} container direction={"column"} rowSpacing={1.5}>
                                        <Grid item>
                                          <span className="makeFlex">
                                            <SupportAgentIcon /> <span style={{ fontWeight: '500', color: '#000' }}>Got Queries?</span> &nbsp;<span onClick={() => handleUserQueriesDialog(true)} className="c-p f-w-700 cursor-p">Contact Support</span>
                                          </span>
                                        </Grid>
                                      </Grid>
                                    </Paper>
                                  </Container>
                                </Grid> : ""}

                                {/* GET CONTACT SUPPORT ONLU FOR PENDING */}

                                {tabValue == 1 || tabValue == 2 ? <Grid item>
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
                                            Wearing masks/face covers is no longer mandatory.
                                            However,, all travellers are advised to wear them, in
                                            view of the threat posed by COVID-19.
                                          </span>
                                        </Grid>
                                      </Grid>
                                    </Paper>
                                  </Container>
                                </Grid> : ""}
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
                                              {/* {bookDetailsData?.Passenger?.length} x Adult */}
                                            </Grid>
                                            <Grid
                                              item
                                              md={4}
                                              textAlign="right"
                                              className={mybooking.faredata}
                                            >
                                              &#8377;{bookDetailsData?.total_price}
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
                                              &#8377; {bookDetailsData?.Price?.AgentCommission}
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
                                              &#8377;{bookDetailsData?.total_price}
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Stack>
                                    </Paper>
                                  </Container>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                          {tabValue == "1" ? <Grid item>
                            <Grid container spacing={2} justifyContent={'center'}>
                              {/* <Grid item md={6}><Button fullWidth variant={"outlined"} sx={{ textTransform: 'none', color: '#003556', borderRadius: '0.5rem', borderColor: '#003556' }}>Date Change</Button></Grid> */}
                              <Grid item md={6}><Button onClick={(e) => handleCancelDialogState(true)} fullWidth variant={"contained"} sx={{ textTransform: 'none', color: '#ffff', backgroundColor: '#003556', borderRadius: '0.5rem' }}>Cancel</Button></Grid>
                            </Grid>
                          </Grid> : tabValue == "2" ?
                            <Grid item textAlign={'center'}>
                              <Button onClick={(e) => { handleReviewDialogOpen(true) }} variant="contained" disableRipple sx={{ backgroundColor: '#003556!important', textTransform: 'none', padding: '0.3rem 5rem', marginBottom: '0.5rem' }}>Feedback</Button>
                            </Grid> : <h3></h3>}
                        </Grid>
                      </Grid>}
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Grid>
      {/* CANCEL DIALOG SUBMIT FORM */}
     

      {/* RAISE REQUEST FOR PENDING SUBMIT FORM */}
      <Dialog
        open={userQuerySubmitForm}
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
        onClose={() => handleUserQueriesDialog(false)}
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
              onClick={() => handleUserQueriesDialog(false)}
            />
          </Grid>
        </Grid>

        {/* <Container> */}
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            {/* <span className="c-p">
              Please confirm to cancel your ticket(s). Once cancelled, your booking can not be reinstated.
            </span> */}
            <TextField
              label='Issue Description'
              placeholder="Please Enter Issue Description"
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
            onClick={() => handleUserQueriesDialog(false)}//handleBookingCancelApi()}
          >
            Raise a Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Refund break up */}
      {/* <Dialog
        open={refundBreakUpState}
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
        onClose={() => handleRefundBreakUpState(false)}
      >
        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <span className="c-000 f-w-500">
              Refund Breakup
            </span>
          </Grid>
        </Grid>
        <Grid container justifyContent={'space-between'} spacing={3} mt={.5}>
          <Grid item>
            <p className="f-w-700">Total Paid</p>
          </Grid>
          <Grid item>
            <p className="f-w-700">₹ 2,600</p>
          </Grid>
        </Grid>
        <Grid container justifyContent={'space-between'} spacing={3} mt={.1}>
          <Grid item>
            <p className="f-w-700">Deductions</p>
          </Grid>
          <Grid item>
            <p className="f-w-700">-  ₹300</p>
          </Grid>
        </Grid>
        <span>Bus Cancellation Charges</span>
        <Divider />
        <Grid container justifyContent={'space-between'} spacing={3}>
          <Grid item>
            <p className="f-w-700 c-p">Total Refund</p>
          </Grid>
          <Grid item>
            <p className="f-w-700">₹ 2,300</p>
          </Grid>
        </Grid>
        <DialogActions sx={{ justifyContent:'flex-end' }}>
          <Button
            sx={{
              backgroundColor: "#003556!important",
              color: "#ffff",
              padding: "5px 10px",
              textTransform: "none",
              fontWeight: "600",
            }}
            onClick={() => handleRefundBreakUpState(false)}//handleBookingCancelApi()}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default Mybookings;
