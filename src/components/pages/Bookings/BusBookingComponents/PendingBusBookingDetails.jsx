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
    Button, Rating, CircularProgress, Dialog, TextField, DialogActions, Box, Stepper, Step, StepLabel, StepIcon
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
import bookPending from '../../../../assets/images/bookPending.svg'
import Queriesdialog from '../Queriesdialog'
import CallIcon from '@mui/icons-material/Call';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, Controller } from "react-hook-form";
import QueriesComponent from "../QueriesComponent";

const PendingBusBookingDetails = (props) => {
    const { data, dataobj, tabVal } = props

    const bookingData = props.data.bookingData && props.data.bookingData.length > 0 && props.data.bookingData[0]

    const mybooking = mybookingstyles();
    const ticketbook = ticketbooking();
    // -------------------------Bookings data variable

    // ---INDIVIDUAL BOOK DETAILS DATA

    const [cancelDialogState, setCancelDialogState] = useState(false)

    const handleCancelDialogState = (bool) => {
        setCancelDialogState(bool)
    }

    // RATE AND REVIEW CODE

    const [isReviewOpen, setIsReviewOpen] = useState(false)
    const handleReviewDialogOpen = (dState) => {
        setIsReviewOpen(dState)
    }

    //-------------------_STEPPER DATA STATES
    const [steps, setStepsData] = useState([])
    const [activeStep, setActiveStep] = useState(0)

    // "booking_status": 4, (0 -> success, 1 - failed, 3 - pending, 4 - cancelled)
    // "payment_status": 1, (1 - success, 2 - pending, 3 - failure)
    // "refund_status": 0(initially it will be 0 for all and 1 - processed, 2 - completed)

    useEffect(() => {
        let steps = []
        // { label: 'Booking Is Pending', date: '12 Dec 2022, 08:12', done: true }
        let activeStep = 0
console.log(bookingData,'bookingData');
        //---------------IF payment is success
        if (bookingData.payment_status === 1) {
            steps.push({ label: 'Payment was successful', date: '', done: true })

            if (bookingData.booking_status === 3 && bookingData.refund_status === 0) {
                steps.push({ label: 'Booking Pending', date: '', done: true }, { label: 'Refund credited', date: '', done: false })
                activeStep = 1
            }

            if (bookingData.booking_status === 1 && bookingData.refund_status === 0) {
                steps.push({ label: 'Booking failed', date: '', done: true }, { label: 'Refund credited', date: '', done: false })
                activeStep = 2
            }
            if (bookingData.booking_status === 1 && bookingData.refund_status === 1) {
                steps.push({ label: 'Booking failed', date: '', done: true }, { label: 'Refund credited', date: '', done: false })
                activeStep = 2
            }
            if (bookingData.booking_status === 1 && bookingData.refund_status === 2) {
                steps.push({ label: 'Booking failed', date: '', done: true }, { label: 'Refund credited', date: '', done: true })
                activeStep = 3
            }
        }

        if (bookingData.payment_status === 2 || bookingData.payment_status === 3) {
            steps.push({ label: 'Payment was Failed', date: '', done: true }, { label: 'Booking Failed', date: '', done: true })
            activeStep = 2

            // if(bookingData.refund_status===0){
            //     steps.push({ label: 'Refund Need to be processed by admin', date: '', done: false })
            //     activeStep = 1
            // }
            // if(bookingData.refund_status===1){
            //     steps.push({ label: 'Refund processed by admin', date: '', done: false })
            //     activeStep = 1
            // }
            // if(bookingData.refund_status===2){
            //     steps.push({ label: 'Refund credited', date: '', done: false })
            //     activeStep = 2
            // }
        }
        if (bookingData.payment_status === 4) {
            steps.push({ label: 'Payment Process Has Not Begun', date: '', done: true }, { label: 'Booking Failed', date: '', done: true })
            activeStep = 2

            // if(bookingData.refund_status===0){
            //     steps.push({ label: 'Refund Need to be processed by admin', date: '', done: false })
            //     activeStep = 1
            // }
            // if(bookingData.refund_status===1){
            //     steps.push({ label: 'Refund processed by admin', date: '', done: false })
            //     activeStep = 1
            // }
            // if(bookingData.refund_status===2){
            //     steps.push({ label: 'Refund credited', date: '', done: false })
            //     activeStep = 2
            // }
        }
console.log(steps,'stepssteps');
        setStepsData(steps)
        setActiveStep(activeStep)
    }, [props])
    //-------------------_STEPPER DATA STATES

    return (
        <>

            {/* <Queriesdialog
                open={userQuerySubmitForm}
                close={() => handleUserQueriesDialog(false)}
                booking_id={dataobj.booking_id}
                module_type={3}
            /> */}
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
                            {tabVal == "3" ?
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
                                    </Grid>
                                </Grid> : "NO COVER"}

                            <Grid item>
                                <Container>
                                    {/* <Paper> */}
                                    <Grid container p={1}>
                                        <Grid md={12} item>
                                            <PendingStepper stepStatus={steps} activeStep={activeStep} />
                                        </Grid>
                                        <Grid item md={12} className={mybooking.busTravelName}>{dataobj?.service_name}</Grid>
                                        <Grid item>{dataobj?.BusType}</Grid>
                                        <Grid item md={12} mt={2}>
                                            <Grid container justifyContent={"space-between"}>
                                                <Grid item>
                                                    <img src={busimage} alt="boardBus" />
                                                </Grid>
                                                <Grid item className={mybooking.busTravelTimeDifference}> {dataobj?.boardingpoint_time ? getTimeDifferenceBtTwoDates(dataobj?.boardingpoint_time, dataobj?.droppingpoint_time) : ""}</Grid>
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
                                                {/* <p>{dataobj?.boardingpoint_time ? helperFunctions.get_time(dataobj?.boardingpoint_time) : ""}</p> */}
                                                <p>{dataobj?.boardingpoint_time ? (dataobj?.boardingpoint_time).slice(11, 16) : ""}</p>
                                                <p>{dataobj?.boardingpoint_time ? helperFunctions.getshortdate(dataobj?.boardingpoint_time) : ""}</p>
                                                <p>{dataobj?.boardingpoint_name}</p>
                                            </Grid>
                                            <Grid item>
                                                <Divider orientation="vertical" />
                                            </Grid>
                                            <Grid item>
                                                {/* <p>{dataobj?.droppingpoint_name ? helperFunctions.get_time(dataobj?.droppingpoint_time) : ""}</p> */}
                                                <p>{dataobj?.droppingpoint_name ? (dataobj?.droppingpoint_time).slice(11, 16) : ""}</p>
                                                <p>{dataobj?.droppingpoint_name ? helperFunctions.getshortdate(dataobj?.droppingpoint_time) : dataobj?.droppingpoint_time}</p>
                                                <p>{dataobj?.droppingpoint_name}</p>
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ width: "100%" }} />

                                    </Grid>
                                    {/* </Paper> */}
                                </Container>
                            </Grid>
                            {/* GET CONTACT SUPPORT ONLU FOR PENDING */}

                            {tabVal == 3 ? <Grid item>
                                <QueriesComponent
                                    booking_id={dataobj.booking_id}
                                    module_type={3}
                                    adminDetails={data.adminData}
                                />

                            </Grid> : ""}

                            {/* GET CONTACT SUPPORT ONLU FOR PENDING */}

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
                                                        {/* {dataobj?.Passenger?.length} x Adult */}
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={4}
                                                        textAlign="right"
                                                        className={mybooking.faredata}
                                                    >
                                                        &#8377;{dataobj?.total_price}
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
                                                        &#8377; {dataobj?.Price?.AgentCommission}
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
                                                        &#8377;{dataobj?.total_price}
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
                    <Grid container spacing={2} justifyContent={'center'}>
                        {/* <Grid item md={6}><Button fullWidth variant={"outlined"} sx={{ textTransform: 'none', color: '#003556', borderRadius: '0.5rem', borderColor: '#003556' }}>Date Change</Button></Grid> */}
                        <Grid item md={6}><Button onClick={(e) => handleCancelDialogState(true)} fullWidth variant={"contained"} sx={{ textTransform: 'none', color: '#ffff', backgroundColor: '#003556', borderRadius: '0.5rem' }}>Cancel</Button></Grid>
                    </Grid>
                </Grid> : tabVal == "2" ?
                    <Grid item textAlign={'center'}>
                        <Button onClick={(e) => { handleReviewDialogOpen(true) }} variant="contained" disableRipple sx={{ backgroundColor: '#003556!important', textTransform: 'none', padding: '0.3rem 5rem', marginBottom: '0.5rem' }}>Feedback</Button>
                    </Grid> : <h3></h3>}
            </Grid>
        </>
    )
}

export default PendingBusBookingDetails