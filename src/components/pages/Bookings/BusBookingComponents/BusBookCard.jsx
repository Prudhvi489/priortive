import {
    Container,
    Grid,
    Paper,

    Rating,
} from "@mui/material";
import { getTimeDifferenceBtTwoDates } from "../../Buses/BusModuleHelperFunctions";
import React, { useEffect, useState } from "react";
import { mybookingstyles } from "../../../../assets/styles/Flights";
import nonstop from "../../../../assets/images/nonstop.svg";


import busimage from "../../../../assets/images/busimage.png";
// import MySnackbar from "../../../modals/Signupmodals/Snackbar";
import helperFunctions from "../../../../helpers/helperFunctions";
import gomytripclient from "../../../../GomytripClient";
import RateAndReviewForService from "../../../modals/BusesModals/RateAndReviewForService";
import Loadingmodal from "../../../modals/Signupmodals/Loadingmodal";

const BusBookCard = (props) => {
    const mybooking = mybookingstyles();
    const { busObj, tab, pastbookingsreviw } = props;
    const [loadingbtn, setLoadingbtn] = useState(false)
    // for snackbar
    // const [snackopen, setSnackopen] = useState(false);
    // const [snackmessage, setSnackmessage] = useState("");
    // function snackclose() {
    //     setSnackopen(false);
    // };
    //
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const handleReviewDialogOpen = (dState) => {
        setIsReviewOpen(dState);
    };

    const handle__callback = async () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        // if (tab === "3") {
        //     props.selectedobj({
        //         bookingobj: busObj,
        //         booking_api_data: {},
        //     });
        // } else {
        try {
            const res = await gomytripclient.post('/getBusBookingDetail', { "BusId": busObj.book_id || '', "booking_id": busObj.booking_id || '' });
            // console.log(res.data);
            if (res.data.status) {
                setLoadingbtn(false)
                props.selectedobj({
                    bookingobj: busObj,
                    booking_api_data: res.data.data,
                });
            } else {
                setLoadingbtn(false);
                // setSnackopen(true);
                // setSnackmessage(res.data.message);
                alert(res.data.message);
            }
        } catch (error) {
            setLoadingbtn(false)
            // setSnackopen(true);
            // setSnackmessage(error);
            alert(error)
        }
        // }
    };
    // review callback
    const callBackFromDialog = () => {
        pastbookingsreviw();
    };

    return (
        <>
            {/* <MySnackbar open={snackopen} close={snackclose} message={snackmessage} /> */}
            <RateAndReviewForService
                open={isReviewOpen}
                onClose={(e) => handleReviewDialogOpen(false)}
                bookId={busObj.booking_id}
                module_type={3}
                callBackReview={callBackFromDialog}
            />
            <Loadingmodal open={loadingbtn} close={() => setLoadingbtn(false)} />
            <Paper
                className={`${mybooking.seeBookDetails} ${busObj?.book_id == busObj?.BusId
                    ? "activeBookItemm"
                    : "NonBookItemm"
                    }`}
                onClick={() => handle__callback()}
                key={busObj.booking_id}
                sx={{
                    borderRadius: "0.5rem",
                    margin: "8px 0",
                }}
            >
                <Grid container direction={"column"} mt={1.5}>
                    <Container>
                        <Grid item mt={2}>
                            <Grid container>
                                <Grid item md={9}>
                                    {/* <img src={indigo} alt="indigo" />{" "} */}
                                    {/* <span>IndiGo , IN 6432</span> */}
                                    <span
                                        className={
                                            mybooking.busTravelName
                                        }
                                    >
                                        {busObj.service_name}
                                    </span>
                                </Grid>
                                <Grid item md={3} textAlign="right">
                                    &#8377; {busObj.total_price}
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
                                                {/* {helperFunctions.get_time(busObj.boardingpoint_time)} */}
                                                {busObj.boardingpoint_time.slice(
                                                    11,
                                                    16
                                                )}
                                            </span>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            textAlign="right"
                                        >
                                            <span
                                                className={mybooking.timefont}
                                            >
                                                {/* {helperFunctions.get_time(busObj.droppingpoint_time)} */}
                                                {busObj.droppingpoint_time.slice(
                                                    11,
                                                    16
                                                )}
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
                                    <Grid
                                        container
                                        alignItems={"center"}
                                    >
                                        <Grid item md={3}>
                                            <span className="c-p f-w-700">
                                                {busObj.origin}
                                            </span>
                                            <br />
                                            <span>
                                                {busObj.boardingpoint_name}
                                            </span>
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
                                                                className={
                                                                    mybooking.busTravelTimeDifference
                                                                }
                                                            >
                                                                {getTimeDifferenceBtTwoDates(
                                                                    busObj.boardingpoint_time,
                                                                    busObj.droppingpoint_time
                                                                )}
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

                                        <Grid
                                            item
                                            md={3}
                                            textAlign="right"
                                        >
                                            <span className="c-p f-w-700">
                                                {busObj.destination}
                                            </span>
                                            <br />
                                            <span>
                                                {busObj.droppingpoint_name}
                                            </span>
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
                                            {helperFunctions.getshortdate(
                                                busObj.boardingpoint_time
                                            )}
                                        </span>
                                    </Grid>
                                    <Grid item md={6} textAlign="right">
                                        <span
                                            className={mybooking.timefont}
                                        >
                                            {helperFunctions.getshortdate(
                                                busObj.droppingpoint_time
                                            )}
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={3} textAlign="right">
                                {busObj.rating && tab == 2 ? (
                                    <Rating
                                        name="size-medium"
                                        defaultValue={busObj.rating}
                                        readOnly
                                        precision={0.5}
                                    />
                                ) : tab == 2 &&
                                    !busObj.rating ? (
                                    <button
                                        style={{
                                            color: "#ffff",
                                            backgroundColor: "#003556",
                                            padding: "0.8rem 1rem",
                                            border: "none",
                                            borderBottomRightRadius:
                                                "0.6rem",
                                            fontSize: "14px",
                                        }}
                                        onClick={(e) => {
                                            handleReviewDialogOpen(true);
                                            // setBookingId(
                                            //     busObj.booking_id
                                            // );
                                        }}
                                    >
                                        Rate Us
                                    </button>
                                ) : (
                                    ""
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default BusBookCard