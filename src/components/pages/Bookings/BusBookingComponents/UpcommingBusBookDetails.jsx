import { convertDateFormat } from "../../Buses/BusModuleHelperFunctions";
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
    Button, Rating, CircularProgress, Dialog, TextField, DialogActions, Box, Stepper, Step, StepLabel, StepIcon, Alert
} from "@mui/material";
import { getTimeDifferenceBtTwoDates } from "../../Buses/BusModuleHelperFunctions";
import React, { useEffect, useState } from "react";
import { mybookingstyles, ticketbooking } from "../../../../assets/styles/Flights";

import information from "../../../../assets/images/information.svg";
import Refundpolicy from "../../../../assets/images/Refundpolicy.svg";
import travelinsurance from '../../../../assets/images/travelinsurance.svg'
import correct from '../../../../assets/images/correct.svg'
import faredetails from '../../../../assets/images/faredetails.svg'
import confirmed from '../../../../assets/images/confirmed.svg'
import done from '../../../../assets/images/done.svg'
import axios from 'axios'
import busimage from "../../../../assets/images/busimage.png";
import busBookingBusImg from "../../../../assets/BusesAssets/busBookingBusImg.jpg";

import helperFunctions from '../../../../helpers/helperFunctions'
import gomytripclient from "../../../../GomytripClient";
import { enqueueSnackbar } from "notistack";
import CancelIcon from "@mui/icons-material/Cancel";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RefreshIcon from '@mui/icons-material/Refresh';
import { StatusStepper, PendingStepper } from "../../Buses/StatusStepper";

import RateAndReviewForService from "../../../modals/BusesModals/RateAndReviewForService";
import Cancellationdialog from "../Cancellationdialog";
import ShowFareDeductionCharges from "../../../modals/BusesModals/ShowFareDeductionCharges";
import Importantinfo from "../../../OffersCarousel/Importantinfo";
import QueriesComponent from "../QueriesComponent";
const UpcommingBusBookDetails = (props) => {

    const { data, dataobj, tabVal, overallbooking } = props

    const fairData = props.data.bookingData && props.data.bookingData.length > 0 && props.data.bookingData[0]
    console.log(fairData,'fairData');
    const mybooking = mybookingstyles();
    const ticketbook = ticketbooking();
    const [cancellation, setCancellation] = useState(false);

    // ---INDIVIDUAL BOOK DETAILS DATA

    const [refundBreakUpState, setRefundBreakUpState] = useState(false)
    const handleRefundBreakUpState = (boolState) => {
        setRefundBreakUpState(boolState)
    }

    const [cancellationdilog, setCancellationdilog] = useState(false);
    const cancellationcallback = () => {
        overallbooking('gotoCancelTab');
    };

    //-------------------_STEPPER DATA STATES
    const [steps, setStepsData] = useState([])

    const [activeStep, setActiveStep] = useState(0)

    // "booking_status": 4, (0 -> success, 1 - failed, 3 - pending, 4 - cancelled)
    // "payment_status": 1, (1 - success, 2 - pending, 3 - failure)
    // "refund_status": 0(initially it will be 0 for all and 1 - processed, 2 - completed)

    useEffect(() => {
        let steps = [{ label: 'Booking Cancelled', date: fairData?.cancelled_date, done: true }]
        let activeStep = 0
        if (fairData.refund_status === 0) {
            steps.push({ label: 'Refund Need to be processed by admin', date: '', done: false }, { label: '', date: '', done: false })
            activeStep = 1
        }
        if (fairData.refund_status === 1) {
            steps.push({ label: 'Refund Processed', date: '', done: true }, { label: 'Refund will be credited', date: '', done: false })
            activeStep = 2
        }
        if (fairData.refund_status === 2) {
            steps.push({ label: 'Refund Processed', date: '', done: true }, { label: 'Refund credited', date: '', done: true })
            activeStep = 3
        }
        setStepsData(steps)
        setActiveStep(activeStep)
    }, [props])
    //-------------------_STEPPER DATA STATES


    return (

        <>
            {cancellationdilog && <Cancellationdialog
                open={cancellationdilog}
                close={() => setCancellationdilog(false)}
                endpoint="busCancel"
                cancel_req={{
                    BookingId: dataobj?.booking_id,
                    busId: data?.bookingResults?.BusId,
                    module_type: 3,
                }}
                callBackcancellation={cancellationcallback}
                cancelData={data?.bookingData}
            />}
            <ShowFareDeductionCharges
                open={refundBreakUpState}
                onClose={(e) => handleRefundBreakUpState(false)}
                cancelData={data?.bookingData}
            />


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
                            {tabVal == "1" ?
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
                                                TICKET NO: {data?.bookingResults?.TicketNo}
                                            </span>
                                        </Grid>
                                        <Grid item mb={2}>
                                            <span className={mybooking.ticketfont}>
                                                Invoice Number: {data?.bookingResults?.InvoiceNumber}
                                            </span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                : tabVal == "2" ?
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
                                                    TICKET NO: {data?.bookingResults?.TicketNo}
                                                </span>
                                            </Grid>
                                            <Grid item mb={2}>
                                                <span className={mybooking.ticketfont}>
                                                    Invoice Number: {data?.bookingResults?.InvoiceNumber}
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </Grid> : tabVal == "3" ?
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
                                                        TICKET NO: {data?.bookingResults?.TicketNo}
                                                    </span>
                                                </Grid>
                                                <Grid item mb={2}>
                                                    <span className={mybooking.ticketfont}>
                                                        Invoice Number: {data?.bookingResults?.InvoiceNumber}
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
                                                        TICKET NO: {data?.bookingResults?.TicketNo}
                                                    </span>
                                                </Grid>
                                                <Grid item mb={2}>
                                                    <span className={mybooking.ticketfont}>
                                                        Invoice Number: {data?.bookingResults?.InvoiceNumber}
                                                    </span>
                                                </Grid>
                                            </Grid>
                                        </Grid>}
                            {tabVal == 1 && <Grid
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
                                    <Grid item>{data?.bookingResults?.Passenger?.length > 0 ? data?.bookingResults?.Passenger[0]?.Email : ""}</Grid>
                                    <Grid item>and SMS sent to {data?.bookingResults?.Passenger?.length > 0 ? data?.bookingResults?.Passenger[0]?.Phoneno : ""}</Grid>
                                </Grid>
                                {/* {JSON.stringify(bookingdetails,null,2)} */}
                            </Grid>}

                            <Grid item>
                                <Container>
                                    {/* <Paper> */}
                                    <Grid container p={1}>
                                        {tabVal == 4 && <><Box sx={{ width: '100%', margin: '10px 0' }}>
                                            

                                            {fairData?.total_price -(fairData?.user_cancelcharge +fairData?.admin_commission) <=0?<Alert variant="outlined" severity="error">You won't receive any refund for this cancellation.</Alert>:<StatusStepper stepStatus={steps} activeStep={activeStep} />}
                                            
                                        </Box>
                                            <RefreshIcon className="c-p" /> <span style={{ textDecoration: 'underline' }} className="c-p f-w-700" onClick={() => handleRefundBreakUpState(true)}>View Refund Breakup</span>
                                        </>}
                                        <Grid mt={1} item md={12} className={mybooking.busTravelName}>{data?.bookingResults?.TravelName}</Grid>
                                        <Grid item>{data?.bookingResults?.BusType}</Grid>
                                        <Grid item md={12} mt={2}>
                                            <Grid container justifyContent={"space-between"}>
                                                <Grid item>
                                                    <img src={busimage} alt="boardBus" />
                                                </Grid>
                                                <Grid item className={mybooking.busTravelTimeDifference}> {data?.bookingResults?.DepartureTime ? getTimeDifferenceBtTwoDates(data?.bookingResults?.DepartureTime, data?.bookingResults?.ArrivalTime) : ""}</Grid>
                                                <Grid item>
                                                    <Grid item>
                                                        <img src={busimage} alt="boardBus" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ display: "flex", margin: "5px 0" }} />
                                        </Grid>
                                        <Grid container justifyContent={"space-between"} p={1}>
                                            <Grid item md={5.5}>
                                                Origin:<span className="c-p f-w-500"> {data?.bookingResults?.Origin}</span>
                                                {/* <p>{data?.bookingResults?.BoardingPointdetails ? helperFunctions.get_time(data?.bookingResults?.BoardingPointdetails?.CityPointTime) : ""}</p> */}
                                                <p>{data?.bookingResults?.BoardingPointdetails ? (data?.bookingResults?.BoardingPointdetails?.CityPointTime).slice(11, 16) : ""}</p>
                                                <p>{data?.bookingResults?.BoardingPointdetails?.CityPointTime ? helperFunctions.getshortdate(data?.bookingResults?.BoardingPointdetails?.CityPointTime) : ""}</p>
                                                {/* <p>point Name:<span className="c-p f-w-500"> {data?.bookingResults?.BoardingPointdetails?.CityPointName}</span></p> */}
                                                <p><span className="c-p f-w-500"> {data?.bookingResults?.BoardingPointdetails?.CityPointLocation}</span></p>
                                                <p><span className="c-p f-w-500"> {data?.bookingResults?.BoardingPointdetails?.CityPointAddress}</span></p>

                                            </Grid>
                                            <Grid item maxWidth={.5}>
                                                <Divider orientation="vertical" />
                                            </Grid>
                                            <Grid item md={5.5}>
                                                Destination:<span className="c-p f-w-500"> {data?.bookingResults?.Destination}</span>
                                                {/* <p>{data?.bookingResults?.ArrivalTime ? helperFunctions.get_time(data?.bookingResults?.ArrivalTime) : ""}</p> */}
                                                <p>{data?.bookingResults?.ArrivalTime ? (data?.bookingResults?.ArrivalTime).slice(11, 16) : ""}</p>
                                                <p>{data?.bookingResults?.ArrivalTime ? helperFunctions.getshortdate(data?.bookingResults?.ArrivalTime) : data?.bookingResults?.ArrivalTime}</p>
                                                <p>{data?.bookingResults?.Destination}</p>
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ width: "100%" }} />
                                        {tabVal != 4 && data?.bookingResults?.Passenger?.length > 0 && data?.bookingResults?.Passenger.map((PeopleData, index) => {
                                            return (
                                                <Grid key={index} container justifyContent={"space-between"} p={1} textAlign={'center'}>
                                                    <Grid md={4} item>{PeopleData?.FirstName}{" "}{PeopleData?.LastName}/{PeopleData?.Age}</Grid>
                                                    <Grid item md={4}>Seat: {PeopleData?.Seat?.SeatName}</Grid>
                                                    <Grid md={4} item className={mybooking.busTravelTimeDifference}>Confirmed</Grid>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </Container>
                            </Grid>
                            {tabVal == 4 ? <Grid item>
                                <QueriesComponent
                                    booking_id={dataobj.booking_id}
                                    module_type={3}
                                    adminDetails={data.adminData}
                                />

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
                                                            {data?.bookingResults?.CancelPolicy?.length > 0 && data?.bookingResults?.CancelPolicy.map((cancelData, index) => {
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

                            {tabVal == 1 || tabVal == 2 ? <Grid item>
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
                            {tabVal == 1 || tabVal == 2 ? <Grid item>
                                <Container>
                                    <Importantinfo module_type={3} />
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
                                                        {data?.bookingResults?.Passenger?.length} x Adult
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={4}
                                                        textAlign="right"
                                                        className={mybooking.faredata}
                                                    >
                                                        &#8377;{fairData?.published_price}
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
                                                        + &#8377; {fairData?.admin_commission}
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
                                                        {/* {data?.bookingResults?.Passenger?.length} x Adult */}
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={4}
                                                        textAlign="right"
                                                        className={mybooking.faredata}
                                                    >
                                                        - &#8377; {fairData?.discount}
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
                                                        &#8377;{fairData?.total_price}
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
                {tabVal == "1" ? <Grid item>
                    <Grid container spacing={1} justifyContent={'center'} sx={{ padding: '10px 0' }}>
                        {/* <Grid item md={6}><Button fullWidth variant={"outlined"} sx={{ textTransform: 'none', color: '#003556', borderRadius: '0.5rem', borderColor: '#003556' }}>Date Change</Button></Grid> */}
                        <Grid item md={6}><Button onClick={(e) => setCancellationdilog(true)} fullWidth variant={"contained"} sx={{ textTransform: 'none', color: '#ffff', backgroundColor: '#003556', borderRadius: '0.5rem' }}>Cancel</Button></Grid>
                    </Grid>
                </Grid> : <h3></h3>}
            </Grid>
        </>
    )
}

export default UpcommingBusBookDetails