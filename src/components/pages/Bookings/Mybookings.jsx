import {
  Container,
  Grid,
  Dialog,
  TextField,
  DialogActions,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { mybookingstyles, ticketbooking } from "../../../assets/styles/Flights";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import filter from "../../../assets/images/filter.svg";
import axios from "axios";
import gomytripclient from "../../../GomytripClient";
import RateAndReviewForService from "../../modals/BusesModals/RateAndReviewForService";
import ShowFareDeductionCharges from "../../modals/BusesModals/ShowFareDeductionCharges";
import { enqueueSnackbar } from "notistack";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingButton from "@mui/lab/LoadingButton";
import Hotelcard from "./Hotels/Hotelcard";
import Upcominghotel from "./Hotels/Upcominghotel";
import Pasthotelbooking from "./Hotels/Pasthotelbooking";
import Pendinghoteldetails from "./Hotels/Pendinghoteldetails";
import Cancelledhoteldetails from "./Hotels/Cancelledhoteldetails";
import BusBookCard from "./BusBookingComponents/BusBookCard";
import UpcommingBusBookDetails from "./BusBookingComponents/UpcommingBusBookDetails";
import PendingBusBookingDetails from "./BusBookingComponents/PendingBusBookingDetails";
import Flightcard from "./Flights/Flightcard";
import Flightupcoming from "./Flights/Flightupcoming";
import Flightpast from "./Flights/Flightpast";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import {styles} from '../../../assets/styles/Styles_export'
const Mybookings = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const mybooking = mybookingstyles();
  const ticketbook = ticketbooking();
  const [tabValue, setTabValue] = React.useState("1");
  const [moduleType, setModuleType] = useState(0)
  const [cancellation, setCancellation] = useState(false);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    navigate(`/mybookings/${newValue}`)
    setBookDetailsData("");
    setSelected_booking({
      bookingobj: {},
      booking_api_data: {},
    });
  };

  const [anchorElFilter, setAnchorElFilter] = React.useState(null);
  const openFilter = Boolean(anchorElFilter);
  const handleClickFilter = (event) => {
    setAnchorElFilter(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorElFilter(null);
  };

  // -------------------------Bookings data variable
  const [bookingsData, setBookingsData] = useState([]);
  const [selected_booking, setSelected_booking] = useState({
    bookingobj: {},
    booking_api_data: {},
  });
  // ---INDIVIDUAL BOOK DETAILS DATA
  const [bookDetailsData, setBookDetailsData] = useState("");
  // console.log(bookDetailsData,'bookDetailsData')
  const [busFairDetails, setBusFairDetails] = useState([]);
  const [bookingDetailsLoading, setBookingDetailsLoading] = useState(null);

  const [cancelDialogState, setCancelDialogState] = useState(false);

  const handleCancelDialogState = (bool) => {
    setCancelDialogState(bool);
  };
  const [userQuerySubmitForm, setUserQuerySubmitForm] = useState(false);
  const handleUserQueriesDialog = (param) => {
    setUserQuerySubmitForm(param);
  };
  let { tab } = useParams();

  useEffect(() => {
    getAllUserBookings();
    setTabValue(tab)
  }, [tabValue, moduleType, location]);

  const getAllUserBookings = () => {
    let payloadToSend = {
      userId: localStorage.getItem("userid"),
      type: Number(tabValue),
      module: moduleType,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/userOverallBookings`,
        payloadToSend
      )
      .then((res) => {
        if (res.data.status === 1 && res.data.data.busData.length > 0) {
          setBookingsData(res.data.data.busData);
        } else {
          setBookingsData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // RATE AND REVIEW CODE

  const [bookingId, setBookingId] = useState("");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const handleReviewDialogOpen = (dState) => {
    setIsReviewOpen(dState);
  };

  function callBackFromDialog() {
    getAllUserBookings();
    handleReviewDialogOpen(false);
  }
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  // --------------------------------handleBookingCancelApi
  const handleBookingCancelApi = () => {
    const remarkText = document.getElementById("remarkForCancel").value;
    const errorSpan = document.getElementById("textError");
    if (remarkText && remarkText.length > 5) {
      setIsCancelLoading(true);
      errorSpan.innerText = "";
      let payLoadToSend = {
        busId: bookDetailsData.BusId,
        remarks: remarkText,
        booking_id: bookingId,
      };
      gomytripclient
        .post("busCancel", payLoadToSend)
        .then((res) => {
          if (res.data.status === 1) {
            enqueueSnackbar(res.data.message, { variant: "success" });
            getAllUserBookings();
            handleCancelDialogState(false);
            setIsCancelLoading(false);
            setBookDetailsData("");
          } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
            handleCancelDialogState(false);
            setIsCancelLoading(false);
          }
          console.log(res);
        })
        .catch((err) => {
          handleCancelDialogState(false);
          setIsCancelLoading(false);
          console.log(err);
        });
    } else if (!remarkText) {
      errorSpan.innerText = "Remark Is required";
    } else {
      errorSpan.innerText = "Please enter more Remark Text";
    }
  };
  const [refundBreakUpState, setRefundBreakUpState] = useState(false);
  const handleRefundBreakUpState = (boolState) => {
    setRefundBreakUpState(boolState);
  };
  // handle slected obj data
  const handle_Selectedobj = async (data) => {
    setSelected_booking(data);
  };
  // review callback

  /**
 * A bookingsrefresh function.
 * @bookingsrefresh
 * @param {param} param - with this param callback navigates to cancelled tab with details open
 */

  const bookingsrefresh = (param = '') => {
    getAllUserBookings();

    if (param == 'gotoCancelTab') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      navigate(`/mybookings/${4}`)
    }

    // setSelected_booking({
    //   bookingobj: {},
    //   booking_api_data: {},
    // });

  };
  return (
    <>
      <RateAndReviewForService
        open={isReviewOpen}
        onClose={(e) => handleReviewDialogOpen(false)}
        bookId={bookingId}
        callBackReview={callBackFromDialog}
      />

      {refundBreakUpState && (
        <ShowFareDeductionCharges
          open={refundBreakUpState}
          onClose={(e) => handleRefundBreakUpState(false)}
          cancelData={busFairDetails}
        />
      )}
      <Grid>
        <Grid>
          <Grid sx={{ height: "5vh" }}></Grid>
        </Grid>
        <Grid>
          <Grid>
            <Container maxWidth="xl">
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <span className={mybooking.bookingfontprimary}>
                    My Bookings
                  </span>
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
                            sx={{ color: styles.app_color }}
                            label="Upcoming"
                            value="1"
                          />
                          <Tab
                            disableRipple
                            className={mybooking.tabs}
                            sx={{ color: styles.app_color }}
                            label="Completed"
                            value="2"
                          />
                          <Tab
                            disableRipple
                            className={mybooking.tabs}
                            sx={{ color: styles.app_color }}
                            label="Pending"
                            value="3"
                          />
                          <Tab
                            disableRipple
                            className={mybooking.tabs}
                            sx={{ color: styles.app_color }}
                            label="Cancelled"
                            value="4"
                          />
                        </TabList>
                      </TabContext>
                    </Grid>
                    <Grid item textAlign={"right"} md={5}>
                      <IconButton onClick={handleClickFilter}>
                        <img src={filter} alt="filter" />
                      </IconButton>
                      <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorElFilter}
                        open={openFilter}
                        onClose={handleCloseFilter}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <MenuItem className={`${moduleType == 0 ? "ActiveMenuBook" : "qwert"}`} onClick={() => setModuleType(0)}>All</MenuItem>
                        <MenuItem className={`${moduleType == 1 ? "ActiveMenuBook" : "qwert"}`} onClick={() => setModuleType(1)}>flight</MenuItem>
                        <MenuItem className={`${moduleType == 2 ? "ActiveMenuBook" : "qwert"}`} onClick={() => setModuleType(2)}>hotel</MenuItem>
                        <MenuItem className={`${moduleType == 3 ? "ActiveMenuBook" : "qwert"}`} onClick={() => setModuleType(3)}>buses</MenuItem>
                      </Menu>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item md={7}>
                      {bookingsData.length > 0 &&
                        bookingsData.map((BookItem) => {
                          // console.log(BookItem, "book item");
                          const module_type = BookItem.module;
                          return (
                            <>
                              {module_type === 1 ? (
                                <Flightcard />
                              ) : module_type === 2 ? (
                                <Hotelcard
                                  hotelobj={BookItem}
                                  tab={tabValue}
                                  selectedobj={handle_Selectedobj}
                                  overallbooking={bookingsrefresh}
                                />
                              ) : (
                                <BusBookCard
                                  busObj={BookItem}
                                  tab={tabValue}
                                  selectedobj={handle_Selectedobj}
                                  pastbookingsreviw={bookingsrefresh}
                                />
                              )}
                            </>
                          );
                        })}

                    </Grid>
                    <Grid item md={5} mt={2}>
                      {/* Flight booking cards */}
                      {
                        Object.keys(selected_booking.bookingobj).length > 0 &&
                          selected_booking?.bookingobj?.module === 1 &&
                          tabValue === "1"
                          ?
                          <Flightupcoming /> :
                          Object.keys(selected_booking.bookingobj).length > 0 &&
                          selected_booking?.bookingobj?.module === 1 &&
                          tabValue === "2"
                          &&
                          <Flightpast />
                      }
                      {/* Hotel booking cards */}
                      {Object.keys(selected_booking.bookingobj).length > 0 &&
                        selected_booking?.bookingobj?.module === 2 &&
                        tabValue === "1" ? (
                        <Upcominghotel
                          data={selected_booking.booking_api_data}
                          dataobj={selected_booking.bookingobj}
                          overallbooking={bookingsrefresh}
                        />
                      ) : Object.keys(selected_booking.bookingobj).length > 0 &&
                        selected_booking?.bookingobj?.module === 2 &&
                        tabValue === "2" ? (
                        <Pasthotelbooking
                          data={selected_booking.booking_api_data}
                          dataobj={selected_booking.bookingobj}
                          pastbookingsreviw={bookingsrefresh}
                        />
                      ) : selected_booking?.bookingobj?.module === 2 && tabValue === "3" ? (
                        <Pendinghoteldetails
                          data={selected_booking.bookingobj}
                          dataobj={selected_booking.bookingobj}
                        />
                      ) : (
                        selected_booking?.bookingobj?.module === 2 && tabValue === "4" && (
                          <Cancelledhoteldetails
                            data={selected_booking.booking_api_data}
                            dataobj={selected_booking.bookingobj}
                          />
                        )
                      )}
                      {/* BUSES CARD INFO */}
                      {Object.keys(selected_booking.bookingobj).length > 0 && selected_booking?.bookingobj?.module === 3 ?
                        tabValue === "3" ? (
                          <PendingBusBookingDetails
                            data={selected_booking.booking_api_data}
                            dataobj={selected_booking.bookingobj}
                            overallbooking={bookingsrefresh}
                            tabVal={tabValue}
                          />
                        ) : (
                          <UpcommingBusBookDetails
                            data={selected_booking.booking_api_data}
                            dataobj={selected_booking.bookingobj}
                            overallbooking={bookingsrefresh}
                            tabVal={tabValue}
                          />
                        ) : ""}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Grid>
      {/* CANCEL DIALOG SUBMIT FORM */}
      <Dialog
        open={cancelDialogState}
        maxWidth="xs"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            // mixHeight: 580,
            // maxWidth: "250px",
            borderRadius: "15px",
            padding: "0.7rem",
          },
        }}
        onClose={() => handleCancelDialogState(false)}
      >
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <span className="bookingCancelHead">
              This is the final step of cancellation
            </span>
          </Grid>
          <Grid item textAlign={"right"} sx={{ color: styles.app_color }}>
            {" "}
            <CancelIcon onClick={() => handleCancelDialogState(false)} />
          </Grid>
        </Grid>

        {/* <Container> */}
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <span className="c-p">
              Please confirm to cancel your ticket(s). Once cancelled, your
              booking can not be reinstated.
            </span>
            <TextField
              label="Remark"
              placeholder="Please Enter Remark"
              multiline
              rows={3}
              sx={{ margin: "12px 0" }}
              fullWidth
              id="remarkForCancel"
            />
            <br />
            <span id="textError" className="goAdminErrorMessages"></span>
          </Grid>
        </Grid>
        {/* </Container> */}
        <DialogActions sx={{ justifyContent: "center" }}>
          <LoadingButton
            sx={{
              backgroundColor: `${styles.app_color}!important`,
              color: "#ffff",
              padding: "5px 10px",
              textTransform: "none",
              fontWeight: "600",
              "& .MuiLoadingButton-loadingIndicator": {
                color: "#97a8ff",
              },
            }}
            onClick={() => handleBookingCancelApi()}
            loading={isCancelLoading}
          >
            Confirm cancellation
          </LoadingButton>
          {/* <Button
            sx={{
              backgroundColor: `${styles.app_color}!important`,
              color: "#ffff",
              padding: "5px 10px",
              textTransform: "none",
              fontWeight: "600",
            }}
            onClick={() => handleBookingCancelApi()}
          >
            Confirm cancellation
          </Button> */}
        </DialogActions>
      </Dialog>

      {/* RAISE REQUEST FOR PENDING SUBMIT FORM */}
      <Dialog
        open={userQuerySubmitForm}
        maxWidth="xs"
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
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <span className="c-000 f-w-500">Describe the issue in details</span>
          </Grid>
          <Grid item textAlign={"right"} sx={{ color: styles.app_color }}>
            {" "}
            <CancelIcon onClick={() => handleUserQueriesDialog(false)} />
          </Grid>
        </Grid>

        {/* <Container> */}
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            {/* <span className="c-p">
              Please confirm to cancel your ticket(s). Once cancelled, your booking can not be reinstated.
            </span> */}
            <TextField
              label="Issue Description"
              placeholder="Please Enter Issue Description"
              multiline
              rows={3}
              sx={{ margin: "12px 0" }}
              fullWidth
              id="remarkForCancel"
            />
            <br />
            <span id="textError" className="goAdminErrorMessages"></span>
          </Grid>
        </Grid>
        {/* </Container> */}
        <DialogActions sx={{ justifyContent: "center" }}>
          <LoadingButton
            sx={{
              backgroundColor: `${styles.app_color}!important`,
              color: "#ffff",
              padding: "5px 10px",
              textTransform: "none",
              fontWeight: "600",
              '& .MuiLoadingButton-loadingIndicator': {
                color: '#97a8ff'
              }
            }}
            onClick={() => handleUserQueriesDialog(false)} //handleBookingCancelApi()}
          >
            Raise a Request
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default Mybookings;
