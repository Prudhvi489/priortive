import {
  Container,
  Grid,
  Box,
  Paper,
  TextField,
  InputAdornment,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import helperFunctions from "../../../helpers/helperFunctions";
import BusesPageBackDrop from "./BusesPageBackDrop";

import SearchBuses from "../../modals/SearchBuses";
import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  destinationresponsive,
} from "../responsives/Carouselresponsive";
import Footer from "../../../parts/Footer";
import calendermonth from "../../../assets/Hotelimages/calendericon.svg";
// JSX styles imports
import {
  hotelsearch,
  muitextfieldborder,
} from "../../../assets/styles/BusesStyles";
import { gomainpage } from "../../../assets/styles/Flights.jsx";
// mui icon imports
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import Agra from "../../../assets/images/Agra.png";
import Delhi from "../../../assets/images/Delhi.png";
import Goa from "../../../assets/images/Goa.png";
import Banglore from "../../../assets/images/Banglore.png";
import Vizag from "../../../assets/images/Vizag.png";
import footerimage from "../../../assets/images/gomytripfooter.png";
import scaner from "../../../assets/images/barcode.png";
import { useLocation, useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import OffersCarousel from "../../OffersCarousel/OffersCarousel";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { BusSearchResultSliceActions } from "../../../store/BusModuleSlices/BusSearchResultSlice";
import { useSnackbar } from "notistack";
import swap from "../../../assets/images/swapicon.svg";
import "../../../assets/styles/responsive_Bus.css"
import {styles} from '../../../assets/styles/Styles_export'
import Mininav from "../../../parts/Mininav";
import AdjustIcon from '@mui/icons-material/Adjust';
const BusesSearch = () => {
  const lastSearchedLocations = useSelector((state)=>state.busessearch.userSearchedFor)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const userSessionDetails = localStorage.getItem("userid");
  const HotMainpg = hotelsearch();
  const gomainpag = gomainpage();
  const inputborder = muitextfieldborder();
  const location = useLocation();
  const navigate = useNavigate();
  const busDateSelectRef = React.useRef(null);
  const [searchDate, setSearchDate] = useState(new Date());
  const [disableCalendar, setDisableCalendar] = useState(false);
  const [search, setSearch] = useState(false);
  const [sources, setSources] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const [from, setFrom] = React.useState({
    city_id: 4054,
    city_name: "Chennai",
  });
  const [to, setTo] = React.useState({
    city_id: 8463,
    city_name: "Bangalore",
  });

  const searchsources = (type) => {
    setSearch(true);
    setSources(type);
  };


  //-----------------------------------MOVE TO TOP OF THE COMPONENT WHEN SCREEN LOADS
  useEffect(() => {
      //-----------------------------------MOVE TO TOP OF THE COMPONENT WHEN SCREEN LOADS
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      if(lastSearchedLocations){
        setFrom(lastSearchedLocations?.fromDest);
        setTo(lastSearchedLocations?.toDest);
        setSearchDate(new Date(lastSearchedLocations?.selectedDate));
      }
  }, [])

  // destinations carousel
  const destinations = [
    { image: Agra, text: "Agra" },
    { image: Delhi, text: "Delhi" },
    { image: Goa, text: "Goa" },
    { image: Vizag, text: "Vizag" },
    { image: Banglore, text: "Banglore" },
    { image: Banglore, text: "Banglore" },
    { image: Banglore, text: "Banglore" },
    { image: Banglore, text: "Banglore" },
  ];

  const showSnackbarFunction = (message, severity) => {
    enqueueSnackbar(message, {
      variant: severity,
      action: (key) => (
        <Button color="inherit" size="small" onClick={() => closeSnackbar(key)}>
          Dismiss
        </Button>
      ),
    });
  };

  const handleCalenderInputClick = () => {
    setDisableCalendar(false);
  };

  const handleTodayMouseDown = (event) => {
    event.preventDefault();
    const today = new Date();
    setSearchDate(today);
    setDisableCalendar(true);
  };

  const handleTomorrowMouseDown = (event) => {
    event.preventDefault();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setSearchDate(tomorrow);
    setDisableCalendar(true);
  };

  const selected_buses = (bus, val) => {
    if (val == 1) {
      setFrom(bus);
    } else if (val == 2) {
      setTo(bus);
    }
  };

  // swap funtionality
  function handleSwap() {
    const temp = from;
    setFrom(to);
    setTo(temp);

    // Add the animation class to the button
    setIsAnimated(true);

    // Remove the animation class after the animation duration (1000ms)
    setTimeout(() => {
      setIsAnimated(false);
    }, 1000);
  }
  //---------------------------- Buses search
  const searchForBus = (formValues) => {
    if (to.city_id == from.city_id) {
      showSnackbarFunction('Origin and Destination must not be same', 'error')
      return
    }
    setIsLoading(true);
    let dateToReqFor = helperFunctions
      .convertDateStr(searchDate)
      .split("/")
      .reverse()
      .join("-");
    axios
      .post(`${process.env.REACT_APP_BASEURL}/busSearch`, {
        dest_details: to,
        origin_details: from,
        date: dateToReqFor,
        user_id: userSessionDetails || "",
      })
      .then((res) => {
        if (
          res?.status === 200 &&
          res?.data?.status === 1 &&
          res?.data?.data?.busResults?.length > 0
        ) {
          showSnackbarFunction(res.data.message, "success");
          //** Data update to redux */

          dispatch(
            BusSearchResultSliceActions.bussearchdata([{ fromDest: from, toDest: to, selectedDate: searchDate }, { searchResultData: res.data.data.busResults }, res.data.data.traceId])
          );
          navigate("/buses/BusesSearchList")
        } else {
          dispatch(BusSearchResultSliceActions.bussearchdata([{ fromDest: from, toDest: to, selectedDate: searchDate }, { searchResultData: [] }, '']))
          showSnackbarFunction(res.data.data.Error.ErrorMessage, "error");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        dispatch(BusSearchResultSliceActions.bussearchdata([{ fromDest: from, toDest: to, selectedDate: searchDate }, { searchResultData: [] }, '']))
        console.log(err);
      });
    // navigate(`${location.pathname}/BusesSearchList`);
  };
  return (
    <>
      <SearchBuses
        open={search}
        close={() => setSearch(false)}
        sources={sources}
        bus={selected_buses}
      />
      {/* <BusBookingConfirmationModel open={false} /> */}
      <BusesPageBackDrop open={isLoading} />
      <div>
        <Grid container sx={{ position: 'relative' }}>
          <Grid item xs={12} sx={{height:{xs:"180px",md:"300px"}}} >
            <Grid item className={HotMainpg.hotelsearchbg}>
              {/* <Container maxWidth="xl">
                  <Grid item textAlign={"right"}>
                    <Chip
                      avatar={<Avatar>M</Avatar>}
                      label={"IND"}
                      variant="outlined"
                      classes={{ label: HotMainpg.chipLabel }}
                      className={HotMainpg.chip}
                    />
                  </Grid>
                </Container> */}
            </Grid>
          </Grid>
          <Container maxWidth="xl" sx={{ paddingLeft: { md: "1.5%", sm: "5%", minWidth: 'fit-content' } }}>
            {/* <form > */}
            {/* onSubmit={handleSubmit()} */}
            <Grid item sx={{ marginTop: { md: "-6%", sm: "-10%", xs: "-20%" } }}>
              <Paper sx={{ borderRadius: '1rem', display: { xs: 'block', md: 'none', margin: "1.3rem 0rem" } }}>
                <Mininav />
              </Paper>
              <Paper className={HotMainpg.searchpaper}>
                <Grid container direction={"column"} sx={{ position: 'relative' }}>
                  {/* Hotel search inputs */}
                  <Grid
                    item
                    className="containersize"
                    container
                    pt={6}
                    pb={6}
                    pl={3}
                    pr={3}
                    // sx={{ paddingRight: {xs:"0",md: "24px"}}}
                    spacing={2}
                  >
                    <Grid item md={4} xs={12}>
                      <TextField
                        // error={true}
                        // {...register("fromLocatiom")}
                        fullWidth
                        autoComplete="off"
                        size="small"
                        label={
                          <span style={{ paddingRight: "0.3rem" }}>
                            From
                          </span>
                        }
                        value={`${from?.city_name || ""} ${from?.city_code || ""
                          }`}
                        onClick={() => {
                          searchsources(1);
                        }}
                        // value=""
                        className={inputborder.root}
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                            fontFamily: "Poppins",
                          },
                        }}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              {/* <img src={busFromLocIcon} alt='fromLocBusIcon'/> */}
                              <AdjustIcon
                                sx={{ color: styles.app_color }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        fullWidth
                        autoComplete="off"
                        size="small"
                        label={
                          <span style={{ paddingRight: "0.9rem" }}>To</span>
                        }
                        value={`${to?.city_name || ""} ${to?.city_code || ""
                          }`}
                        onClick={() => {
                          searchsources(2);
                        }}
                        // value=""
                        className={inputborder.root}
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                            fontFamily: "Poppins",
                          },
                        }}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <FmdGoodSharpIcon sx={{ color: styles.app_color }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          inputFormat="dd/MM/yyyy"
                          // disabled={disableCalendar}
                          sx={{
                            "& .MuiPickersToolbar-penIconButton": {
                              display: "none",
                              
                            },
                            "& .MuiDatePickerToolbar-title": {
                              width: "172px",
                            }
                          }}
                          closeOnSelect
                          disablePast
                          inputRef={busDateSelectRef}
                          label="Date"
                          value={searchDate}
                          onChange={(newValue) => {
                            setSearchDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              id="dateInputTag"
                              // sx={{ minWidth: "90px",width:'fit-content' }}
                              // size="small"
                              {...params}
                              fullWidth
                              autoComplete="off"
                              size="small"
                              label={
                                <span style={{ paddingRight: "0.5rem" }}>
                                  Date
                                </span>
                              }
                              // value=""
                              className={`${inputborder.root}`}
                              InputLabelProps={{
                                style: {
                                  color: styles.app_color,
                                  fontFamily: "Poppins",
                                },
                              }}
                              InputProps={{
                                readOnly: true,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <img
                                      src={calendermonth}
                                      alt="caleder"
                                      width="27"
                                      height="100"
                                    />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="start">
                                    <span
                                      className={`busesDatePickBtns ${helperFunctions.convertDateStr(
                                        searchDate
                                      ) ==
                                        helperFunctions.convertDateStr(
                                          new Date()
                                        )
                                        ? "active"
                                        : ""
                                        }`}
                                      onMouseDown={handleTodayMouseDown}
                                    >
                                      Today
                                    </span>
                                    &nbsp;
                                    <span
                                      style={{ marginLeft: "5%" }}
                                      className={`busesDatePickBtns ${helperFunctions.convertDateStr(
                                        searchDate
                                      ) ==
                                        helperFunctions.convertDateStr(
                                          new Date(
                                            new Date().setDate(
                                              new Date().getDate() + 1
                                            )
                                          )
                                        )
                                        ? "active"
                                        : ""
                                        }`}
                                      onMouseDown={handleTomorrowMouseDown}
                                    >
                                      Tomorrow
                                    </span>
                                  </InputAdornment>
                                ),
                                onClick: handleCalenderInputClick,
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item>
                      <img
                        src={swap}
                        alt="swapbutton"
                        className={`${gomainpag.swapbtnBusSearch} ${isAnimated ? 'swap-button animated' : 'swap-button'} cursor-p`}
                        onClick={handleSwap}
                      />
                    </Grid>
                    {/* button in resposive mobile */}
                    <Grid item textAlign={"center"}
                      // mt={-3.5}
                      xs={12} sx={{ display: { md: "none", xs: "block" } }}>
                      <button
                        className={`${HotMainpg.hotelsearchbtn}`}
                        onClick={searchForBus}
                      >
                        Search Buses{" "}
                      </button>
                    </Grid>
                  </Grid>

                </Grid>

              </Paper>
              {/* Hotel search button */}
              <Grid item textAlign={"center"}
                // mt={-3.5}
                sx={{ display: { md: "block", xs: "none", position: 'relative', top: '-28px' } }}>
                <button
                  className={HotMainpg.hotelsearchbtn}
                  onClick={searchForBus}
                >
                  Search Buses{" "}
                </button>
              </Grid>

            </Grid>
            {/* </form> */}
          </Container>
        </Grid>
        {/* all Offers */}
        <Grid item mt={2}>
          <Container maxWidth="xl">
            {/* <Paper className={HotMainpg.searchpaper}>
              <Box pt={3} pl={2} pb={4} sx={{ height: "200px" }}>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "Poppins",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: styles.app_color,
                    }}
                  >
                    All Offers
                  </span>
                  <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: styles.app_color,
                        paddingRight: "1rem",
                      }}
                    >
                      ViewAll
                    </span>
                </Grid>
                <Grid item id="carsel">
                  <OffersCarousel />
                </Grid>
              </Box>
            </Paper> */}
            <OffersCarousel/>
            <Grid className="d-none" contianer sx={{ mt: 3 }}>
              <Grid item>
                <Typography  variant="p" sx={{ fontWeight: "600",color:styles.app_color }}>
                  Popular Destinations
                </Typography>
              </Grid>
              <Grid item>
                <Carousel responsive={destinationresponsive}>
                  {destinations.map((item, index) => {
                    return (
                      <div className={gomainpag.destiationmain} key={index}>
                        <img className="imgsize" src={item.image} alt={item.text} />
                        <Typography
                          className={gomainpag.destinationtext}
                          variant="body1"
                          sx={{ fontFamily: "poppins!important", fontWeight: '700' }}
                        >
                          {item.text}
                        </Typography>
                      </div>
                    );
                  })}
                </Carousel>
              </Grid>
            </Grid>
            {/* <Grid item sx={{ display: { md: "block", xs: "none" } }}>
                <Typography sx={{color:styles.app_color}} variant="body1">
                  Download the App Now
                </Typography>
                <Grid container spacing={0}>
                  <Grid item xs={7}>
                    <Grid item>
                      <img src={footerimage} alt=" " width="90%" />
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid item className={gomainpag.scanner}>
                      <img src={scaner} width="50%" alt=" " height="50%" />
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid item className={gomainpag.scanner1}>
                      <Stack spacing={3}>
                        <a href="https://play.google.com/store/games?utm_source=apac_med&utm_medium=hasem&utm_content=Jul0121&utm_campaign=Evergreen&pcampaignid=MKT-EDR-apac-in-1003227-med-hasem-py-Evergreen-Jul0121-Text_Search_BKWS-BKWS%7CONSEM_kwid_43700058906718334_creativeid_480977734745_device_c&gclid=CjwKCAjw9J2iBhBPEiwAErwpebR7pcHTH-mTYVi8Su9bpeH7mpJIsNF-LdKwQbG-uUkVFFLbv-R_8hoCqdgQAvD_BwE&gclsrc=aw.ds">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgyv7aPiNJIgzcnGoxKHsqiCC3Fql_xQ0fn0L9KF_rBL_c5SeyEqKpM0FCV-0HVLGJew&usqp=CAU"
                            alt="google icon"
                            width="100%"
                            height="50"
                          />
                        </a>
                        <a href="https://www.apple.com/in/app-store/">
                          <img
                            src="https://www.tacuonline.com/wp-content/uploads/sites/2/2015/09/app-store-logo-1.png"
                            alt=""
                            width="100%"
                            height="50"
                          />
                        </a>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */}
          </Container>
          <Grid item>
            <Footer />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default BusesSearch;
