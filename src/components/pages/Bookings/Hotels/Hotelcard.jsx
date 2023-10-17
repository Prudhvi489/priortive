import { Container, Grid, Paper, Rating, Stack } from "@mui/material";
import React, { useState } from "react";
import helperFunctions from "../../../../helpers/helperFunctions";
import { room_booking } from "../../../../assets/styles/Hotelstyles";
import axios from "axios";
import RateAndReviewForService from "../../../modals/BusesModals/RateAndReviewForService";
import MySnackbar from "../../../modals/Signupmodals/Snackbar";
import Loadingmodal from "../../../modals/Signupmodals/Loadingmodal";
import {styles} from  '../../../../assets/styles/Styles_export'
const Hotelcard = (props) => {
  const baseurl = process.env.REACT_APP_BASEURL;
  const { hotelobj, tab } = props;
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const room_style = room_booking();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [loadingbtn, setLoadingbtn] = useState(false)
  // let hotelobj=

  //                 {
  //                     "booking_id": "3eaaf710-2b94-11ee-b8c5-134214838c50",
  //                     "book_id": "1829152",
  //                     "service_name": "OYO 7601 Hotel Park Heights",
  //                     "total_price": 1356,
  //                     "origin": " ",
  //                     "destination": " ",
  //                     "boardingpoint_name": " ",
  //                     "boardingpoint_time": "2023-07-26T00:00:00.000Z",
  //                     "droppingpoint_name": " ",
  //                     "droppingpoint_time": "2023-07-27T00:00:00.000Z",
  //                     "rating": 2,
  //                     "review": "this is for testing purpose",
  //                     "module": 2
  //                 }

  //handle hoteldata callback
  const handle_hotels_callback = async () => {
    if (tab === "3") {
      props.selectedobj({
        bookingobj: hotelobj,
        booking_api_data: {},
      });
    } else {
      try {
        setLoadingbtn(true)
        const res = await axios.post(`${baseurl}/getHotelBookingDetail`, {
          BookingId: Number(hotelobj.book_id),
          userId: localStorage.getItem("userid"),
          checkType: tab === 4 ? 1 : 0,
          type:hotelobj?.booking_type,
        });
        console.log(res.data);
        if (res.data.status) {
          setLoadingbtn(false)
          props.selectedobj({
            bookingobj: hotelobj,
            booking_api_data: res.data.data,
          });
        } else {
          setLoadingbtn(false)
          setSnackopen(true);
          setSnackmessage(res.data.message);
          // alert(res.data.message);
        }
      } catch (error) {
        setLoadingbtn(false)
        setSnackopen(true);
        setSnackmessage(error);
        // alert(error)
      }
    }
  };
  // review callback
  const callBackFromDialog = () => {
    props.overallbooking()
  };
  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Loadingmodal open={loadingbtn} close={() => setLoadingbtn(false)} />
      <RateAndReviewForService
        open={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        bookId={hotelobj.booking_id}
        module_type={2}
        callBackReview={callBackFromDialog}
      />
      <Paper
        className={room_style.hotel_paper}
        onClick={() => handle_hotels_callback()}
        sx={{ padding: '0px!important' }}
      >
        <Grid
          container
          direction={"column"}
          rowSpacing={2}
          sx={{ marginTop: "1rem" }}
        >
          <Container>
            {console.log(hotelobj,"hotelobject")}
            <Grid item container justifyContent={"space-between"} pt={2}>
              <Grid item className={room_style.hotelname}>
                {hotelobj.service_name}
              </Grid>
              <Grid item>{hotelobj.total_price}</Grid>
            </Grid>
          </Container>

          <Grid item container pl={3}>
            <Grid item container md={10}>
              <Grid item md={4}>
                <Stack spacing={1}>
                  <span className={room_style.hotel_loc}>Check-in</span>
                  <span className={room_style.hotel_checked_dates}>
                    {/* {console.log(hotelobj.boardingpoint_time,"datatime")} */}
                    {helperFunctions.get_numeric_date(
                      hotelobj.boardingpoint_time
                    )}
                  </span>
                  <span className={room_style.hotel_loc}>Saturday 3PM</span>
                </Stack>
              </Grid>
              <Grid item md={4} alignSelf={"center"}>
                <button
                  className={room_style.days_stay}
                >{`${helperFunctions.nights_calc(
                  hotelobj.boardingpoint_time,
                  hotelobj.droppingpoint_time
                )} ${helperFunctions.nights_calc(
                  hotelobj.boardingpoint_time,
                  hotelobj.droppingpoint_time
                ) > 1
                  ? "Nights"
                  : "Night"
                  }`}</button>
              </Grid>
              <Grid item md={4}>
                <Stack spacing={1}>
                  <span className={room_style.hotel_loc}>Check-out</span>
                  <span className={room_style.hotel_checked_dates}>
                    {helperFunctions.get_numeric_date(
                      hotelobj.droppingpoint_time
                    )}
                  </span>
                  <span className={room_style.hotel_loc}>Tuesday 12PM</span>
                </Stack>
              </Grid>
            </Grid>
            <Grid item md={2} textAlign={'right'} alignSelf={'flex-end'} >
              {hotelobj.rating === 0 && tab === "2" ? <button style={{ width: '6rem', height: '2rem', border: "none", backgroundColor: styles.app_color, color: '#fff', borderBottomRightRadius: '0.5rem' }} onClick={() => setIsReviewOpen(true)}>Rate us</button> : (hotelobj.rating > 0 && tab === "2") && <Rating value={hotelobj.rating} readOnly />
              }              </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Hotelcard;
