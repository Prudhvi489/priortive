import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Paper,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  IconButton,
  Dialog,
  Tabs,
} from "@mui/material";
import {
  gomainpage,
  aftersearchflights,
} from "../../../assets/styles/Flights.jsx";

// carousels
import Carousel from "react-elastic-carousel";
import "../../../assets/styles/commonstyles.css";
import { consts } from "react-elastic-carousel";
import rightarrow from "../../../assets/images/rightarrow.svg";
import leftarrow from "../../../assets/images/leftarrow.svg";
import makeStyles from "@mui/styles/makeStyles";
import indigo from "../../../assets/images/indigo.svg";
import plane from "../../../assets/images/plane.svg";
import onestop from "../../../assets/images/onestop.svg";
import bluerectangle from "../../../assets/images/bluerectangle.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import BookNow from "../../modals/Flightmodals/BookNow.jsx";
import Filters from "./Filters";
import FlightsSearch from "./FlightsSearch.jsx";
import { useSelector } from "react-redux";
import helperFunctions from "../../../helpers/helperFunctions.js";
import { useNavigate } from "react-router-dom";
import Minifilter from "../../../parts/Minifilter.jsx";
import {envdata} from '../../Envexports.jsx'
import {styles} from '../../../assets/styles/Styles_export.jsx'
const useStyles = makeStyles((theme) => ({
  MuiAccordionroot: {
    "&.MuiAccordion-root:before": {
      backgroundColor: "white",
    },
  },
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: `${styles.app_color}!important`,
      },
    },
  },
}));

// styles for tabs
const makestyle = makeStyles({
  tab:{
    textTransform: "none!important",
    minHeight:'fit-content !important',
    // minWidth:'8rem !important',
    maxWidth:'fit-content !important',
    // backgroundColor:'#DFF3FF !important',
    borderRadius: "0.5rem !important",
    color:`${styles.textcolor} !important`,
    boxShadow: '0px 0px 2px 0px #00000040',
  },
  tabs:{
    "& .MuiTab-root.Mui-selected": {
      color: "White !important",
      background: `${styles.app_color} !important`,
      borderRadius: "0.5rem",
      padding: "2px 5px 2px 5px",
    },
    "& .MuiTabs-indicator":{
      display:'none'
    },
    '& .MuiTabs-flexContainer':{
      gap:'1.5rem',
      marginLeft:'3rem',
      padding:'0.7rem 0rem',
    },
    '& .MuiTabs-scroller':{
      display:'flex',
      alignItems:"center",
    }
  }
})

const AfterFlightsSearch = () => {
  // navigate
  const navigate = useNavigate();
  const classes = useStyles();
  // console.log(window.performance.navigation.type)
  const breakPoints = [
    { width: 1, itemsToShow: 3 },
    { width: 400, itemsToShow: 3.5 },
    { width: 550, itemsToShow: 5 },
    { width: 768, itemsToShow: 6 },
    { width: 1200, itemsToShow: 7 },
  ];
  // carousel responsives
  const items = [
    { id: 1, title: "item #1" },
    { id: 2, title: "item #2" },
    { id: 3, title: "item #3" },
    { id: 4, title: "item #4" },
    { id: 5, title: "item #5" },
    { id: 5, title: "item #6" },
    { id: 5, title: "item #7" },
    { id: 5, title: "item #8" },
    { id: 5, title: "item #9" },
    { id: 5, title: "item #0" },
  ];
  // Carousel button
  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? (
        <img src={leftarrow} alt="leftarrow" />
      ) : (
        <img src={rightarrow} alt="rightarrow" />
      );
    return (
      <Button
        onClick={onClick}
        disabled={isEdge}
        disableRipple
        sx={{
          "&:hover": { backgroundColor: "initial", boxShadow: "none" },
          display: { xs: "none", md: "block" },
        }}
      >
        {pointer}
      </Button>
    );
  };
  // styles initialization
  // const flagsbaseurl = process.env.REACT_APP_FLAGSBASEURL;
  const gomainpag = gomainpage();
  const aftersearchflight = aftersearchflights();
  // States of the component
  const [value1, setValue1] = useState("4");
  const [expanded, setExpanded] = useState(false);
  const [packages, setPackages] = useState([]);
  const [expandindex, setExpandindex] = useState(null);
  const [allflights, setAllflights] = useState([]);
  const [highest_price, setHighest_price] = useState(false);
  const flightsdata = useSelector((state) => state.flightsearches.Flightsdata);
  // console.log(flightsdata.flightsdata[0],"data")
  let wholeflights = flightsdata.flightsdata[0];
  // package selection
  const package_Selection = (selected_index) => {
    // alert(selected_index)
    // console.log(selected_index)
    setPackages([selected_index]);
    setOpen(true);
  };
  useEffect(() => {
    setAllflights(flightsdata?.flightsdata[0]);
  }, [flightsdata]);
  // console.log(allflights)
  // Dialog state
  const [open, setOpen] = useState(false);

  const handleaccordionexpand = (index) => {
    // alert(index)
    if (expandindex === index) {
      setExpandindex(null);
    } else {
      setExpandindex(index);
    }
  };
  const handlechange1 = (event, newValue1) => {
    setValue1(newValue1);
  };

  var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [btn, setBtn] = useState("");
  const selectflightdate = (data) => {
    document.getElementById(data).style = `color:#fff;background:${styles.app_color}`;
    items.map((val) => {
      if (val.title != data) {
        document.getElementById(val.title).removeAttribute("style");
      }
    });
  };
  // carousel data
  const carouseldata = items.map((item, index) => {
    return (
      <div key={item.id} /*style={{marginLeft:'.5rem'}}*/>
        <button
          className={
            !btn
              ? aftersearchflight.carouselbutton
              : aftersearchflight.carouselbuttonselect
          }
          onClick={() => selectflightdate(item.title)}
          id={`${item.title}`}
        >
          <Grid contianer rowSpacing={3}>
            <Grid item>
              <Grid item>
                {daysOfWeek[index]},Dec&nbsp;{21 + index}
              </Grid>
            </Grid>
            <Grid item>{/* <Grid item>&#8377;2,700</Grid> */}</Grid>
          </Grid>
        </button>
      </div>
    );
  });
  const origin =
    allflights.length > 0 &&
    allflights[0].minarr.Segments[0].at(0).Origin.Airport.CityName;
  const destination =
    allflights.length > 0 &&
    allflights[0].minarr.Segments[0].at(-1).Destination.Airport.CityName;
  const Apply_filters = async (data) => {
    // alert("filters")
    const except_flights = data.pop();
    if (except_flights.high_price) {
      setHighest_price(true);
    }
    const airline_names = data;
    let stops = [];
    if (except_flights.one_stop) {
      stops.push(2);
    }
    if (except_flights.non_stop) {
      stops.push(1);
    }
    if (except_flights.multi_stop) {
      stops.push(3);
    }
    let departures = [];
    if (except_flights.morning) {
      departures.push(1);
    }
    if (except_flights.afternoon) {
      departures.push(2);
    }
    if (except_flights.evening) {
      departures.push(3);
    }
    if (except_flights.night) {
      departures.push(4);
    }
    // airlines filter
    if (airline_names.length > 0) {
      wholeflights = await wholeflights.filter((flight) => {
        if (
          airline_names.includes(
            flight.minarr.Segments[0][0].Airline.AirlineName
          )
        ) {
          return flight;
        }
      });
    }
    // stops filter
    if (stops.length > 0) {
      wholeflights = await wholeflights.filter((flight) => {
        console.log(flight);
        const flight_stops =
          flight.minarr.Segments[0].length > 2
            ? 3
            : flight.minarr.Segments[0].length;
        if (stops.includes(flight_stops)) {
          return flight;
        }
      });
    }
    // departure filters
    if (departures.length > 0) {
      console.log(departures);
      wholeflights = await wholeflights.filter((flight) => {
        const date = new Date(flight.minarr.Segments[0][0].Origin.DepTime);
        const hour = date.getHours();
        console.log(hour);
        let dep =
          hour < 6
            ? 1
            : hour >= 6 && hour < 12
            ? 2
            : hour >= 12 && hour < 18
            ? 3
            : hour >= 18 && hour <= 23 && 4;
        if (departures.includes(dep)) {
          console.log(flight.minarr.Segments[0][0].Origin.DepTime);
          return flight;
        }
      });
    }
    if (except_flights.low_price) {
      let low_arr = [...wholeflights];
      low_arr.sort(
        (a, b) => a.minarr.Fare.PublishedFare - b.minarr.Fare.PublishedFare
      );
      wholeflights = [...low_arr];
    }
    if (except_flights.high_price) {
      let sort_Arr = [...wholeflights];
      sort_Arr.sort(
        (a, b) => b.minarr.Fare.PublishedFare - a.minarr.Fare.PublishedFare
      );
      wholeflights = [...sort_Arr];
    }
    // console.log(wholeflights);
    setAllflights(wholeflights);
    // alert("done")
  };
  /* filter popup for moblie states*/
  const [filterOpen, setFilterOPen] = useState(false);
  function filterClose() {
    setFilterOPen(false);
  }
  /* filter popup for moblie states*/
  const [flightSearchOpen, setFlightSearchOPen] = useState(false);
  function flightSearchClose() {
    setFlightSearchOPen(false);
  }
  // tabs styles and states
  const [TabsValue,setTabsValue] = useState(1)
  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  const styled = makestyle()

  return (
    <div>
      <BookNow
        open={open}
        onclose={() =>setOpen(false)}
        package_selection={packages}
      />
      {/* filter popup for moblie */}
      {/* <Dialog open={filterOpen} onClose={filterClose}>
        <Filters filter={Apply_filters} />
      </Dialog> */}
      {/* flightSearch popup for moblie */}
      {/* <Dialog open={flightSearchOpen} onClose={flightSearchClose}>
        <FlightsSearch />
      </Dialog> */}

      <div>
        {/* moblie responsive header for Flights search */}
        {/*mini Flights search */}
        <Grid item mt={5} sx={{ display: { xs: "none", md: "block" } }}>
          <FlightsSearch />
        </Grid>
        {/* search grid */}
        <Container maxWidth="xl" sx={{ display: { xs: "block", md: "none" } }}>
          <Minifilter filter={Apply_filters} way="One Way" />
        </Container>
        {/* carousel Grid */}
        <Grid
          sx={{ display: { xs: "block", md: "none" } }}
          style={{ position: "relative" }}
          mt={2}
        >
          {/* <Carousel
            itemPadding={[20, 0]}
            breakPoints={breakPoints}
            renderArrow={myArrow}
            dots={false}
            outerSpacing={10}
          >
            {carouseldata}
          </Carousel>
          <button className={aftersearchflight.monthsbutton_res}>Dec</button> */}
          <Grid position={'relative'}>
            <Divider />
            <Tabs
              value={TabsValue}
              onChange={handleTabsChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              className={styled.tabs}
            >
              {[1,2,3,4,5,6,7,8,9,10].map((data)=>{
                return(
                  <Tab key={data} value={data} label={<span>Mon,Dec {data} <br/> ₹ 3,200</span>} className={styled.tab}/>
                )
              })}
            </Tabs>
            <button className={aftersearchflight.monthsbutton}>
              Dec
            </button>
            <Divider />
          </Grid>
        </Grid>

        {/* searched flights */}
        <Container
          maxWidth="xl"
          sx={{ padding: { xs: "0px", md: "0px 16px" } }}
        >
          <Grid container mt={{ md: 0, xs: 0 }} spacing={{ md: 3, xs: 0 }}>
            <Grid
              item
              md={4}
              lg={4}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Filters filter={Apply_filters} />
            </Grid>
            <Grid item xs={12} md={8} lg={8} mb={2}>
              <Paper
                sx={{
                  padding: { md: "1rem", xs: "0rem" },
                  borderRadius: "1rem",
                  fontWeight: 600,
                  backgroundColor: { md: "white", xs: "transparent" },
                }}
                elevation={{ xs: 0, md: 1 }}
              >
                <Grid
                  component={"p"}
                  sx={{ display: { xs: "none", md: "block" } }}
                  className={aftersearchflight.textcol}
                >{`${origin} - ${destination}`}</Grid>
                <Grid
                  sx={{ display: { xs: "none", md: "block" } }}
                  mt={4}
                  className={aftersearchflight.carouselrelative}
                >
                  {/* <Divider />
                  <Carousel
                    itemPadding={[20, 0]}
                    breakPoints={breakPoints}
                    renderArrow={myArrow}
                    dots={false}
                    outerSpacing={10}
                  >
                    {carouseldata}
                  </Carousel>
                  <button className={aftersearchflight.monthsbutton}>
                    Dec
                  </button>
                  <Divider sx={{ marginTop: "-15px" }} /> */}
                  {/* <Container maxWidth="xl" sx={{margin:'0.5rem 0rem'}}> */}
                  <Grid position={'relative'}>
                    <Divider />
                    <Tabs
                      value={TabsValue}
                      onChange={handleTabsChange}
                      variant="scrollable"
                      scrollButtons
                      allowScrollButtonsMobile
                      className={styled.tabs}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map((data)=>{
                        return(
                          <Tab key={data} value={data} label={<span>Mon,Dec {data} <br/> ₹ 3,200</span>} className={styled.tab}/>
                        )
                      })}
                    </Tabs>
                    <button className={aftersearchflight.monthsbutton}>
                      Dec
                    </button>
                    <Divider />
                  </Grid>
                  {/* </Container> */}
                </Grid>
                <Container>
                  {allflights.length > 0 ? (
                    allflights.map((item, index) => {
                      // console.log(item.minarr.AirlineCode)
                      // destructuring the object for fare and segments
                      const {
                        Fare: innerfare,
                        FareBreakdown: innerfarebreakdown,
                        Segments: [innersegments],
                        MiniFareRules: minifare = [],
                      } = item?.minarr;
                      const airlinecode = item.minarr?.AirlineCode;
                      const airlinename =
                        innersegments.at(0).Airline.AirlineName;
                      let stops = innersegments.length - 1;
                      let duration =
                        innersegments.at(-1)?.AccumulatedDuration ??
                        innersegments[0]?.Duration;
                      const jrney_time = `${Math.floor(duration / 60)
                        .toString()
                        .padStart(2, "0")}h ${(duration % 60)
                        .toString()
                        .padStart(2, "0")}m`;
                      // console.log(innerfare,"fareamount")
                      const fare = innerfare?.PublishedFare;
                      const oc = innerfare?.OtherCharges;
                      let totalbasefare = 0;
                      let toataltax = 0;
                      // const get_time = (time) => {
                      //   const date = new Date(time);
                      //   const hours = date.getHours();
                      //   const minutes = date.getMinutes();
                      //   const mod_time = `${hours
                      //     .toString()
                      //     .padStart(2, "0")}:${minutes
                      //     .toString()
                      //     .padStart(2, "0")}`;
                      //   return mod_time;
                      // };
                      const dep_time =helperFunctions.get_time(
                        innersegments.at(0).Origin.DepTime
                      );
                      const arr_time =helperFunctions.get_time(
                        innersegments.at(-1).Destination.ArrTime
                      );
                      return (
                        <Paper
                          key={index}
                          sx={{ borderRadius: "1rem", marginTop: "2rem" }}
                          elevation={3}
                        >
                          <Container>
                            <Grid
                              container
                              direction="column"
                              rowSpacing={2}
                              mb={{ xs: 1, md: 0 }}
                            >
                              {/* Fliights source and destination */}
                              <Grid item>
                                <Grid container alignItems={"center"}>
                                  <Grid
                                    item
                                    xs={12}
                                    md={3}
                                    borderBottom={{
                                      xs: "1.2px solid #E9E9E9",
                                      md: 0,
                                    }}
                                    paddingY={{ xs: 1, md: 0 }}
                                    marginBottom={{ xs: 1, md: 0 }}
                                  >
                                    <Grid container spacing={1}>
                                      <Grid item mt={0.4} md={2}>
                                        {/* {item.minarr.IsLCC === true ? "true" : "false"}kjachsdvbc  */}
                                        <img
                                          src={`${envdata.flagsbaseurl}/${airlinecode}.png`}
                                          alt="indigo"
                                          width="100%"
                                          height="70%"
                                          className="image_sm"
                                        />
                                      </Grid>
                                      <Grid item>{airlinename}</Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={9} md={7}>
                                    <Grid container>
                                      <Grid
                                        item
                                        xs={2.4}
                                        textAlign={"center"}
                                        sx={{
                                          display: { xs: "none", md: "block" },
                                        }}
                                      >
                                        <Grid
                                          container
                                          direction="column"
                                          rowSpacing={1}
                                        >
                                          <Grid item>
                                            <span
                                              className={
                                                aftersearchflight.flighttiming
                                              }
                                            >
                                              {dep_time}
                                            </span>
                                          </Grid>
                                          <Grid item>
                                            <span
                                              className={
                                                aftersearchflight.flightlayofftext
                                              }
                                            >
                                              {origin}
                                            </span>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        md={6.5}
                                        sx={{ textAlign: "center" }}
                                        alignItems={"center"}
                                        mt={1}
                                      >
                                        <Grid container disableGutters={true}>
                                          <Grid
                                            item
                                            xs={3.1}
                                            sm={3.1}
                                            md={3.1}
                                            xl={3.1}
                                            alignSelf={"center"}
                                          >
                                            <img
                                              src={plane}
                                              alt="plane"
                                              className="flight_size_xs"
                                            />
                                          </Grid>
                                          <Grid item xs={5.5}>
                                            <Stack textAlign={"center"}>
                                              <span
                                                className={
                                                  aftersearchflight.flightlayofftext
                                                }
                                              >
                                                {jrney_time}
                                              </span>
                                              <img
                                                src={onestop}
                                                alt="onestop"
                                                className="flight_size_xs"
                                              />
                                              <span
                                                className={
                                                  aftersearchflight.flightlayofftext
                                                }
                                              >
                                                {stops === 0
                                                  ? "non-Stop"
                                                  : `${stops} Stop`}
                                              </span>
                                            </Stack>
                                          </Grid>
                                          <Grid
                                            item
                                            xs={3}
                                            alignSelf={"center"}
                                          >
                                            <img
                                              src={plane}
                                              alt="plane"
                                              className="flight_size_xs"
                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={2}
                                        textAlign={"center"}
                                        sx={{
                                          display: { xs: "none", md: "block" },
                                        }}
                                      >
                                        <Grid
                                          container
                                          direction="column"
                                          rowSpacing={1}
                                        >
                                          <Grid item>
                                            <span
                                              className={
                                                aftersearchflight.flighttiming
                                              }
                                            >
                                              {arr_time}
                                            </span>
                                          </Grid>
                                          <Grid item>
                                            <span
                                              className={
                                                aftersearchflight.flightlayofftext
                                              }
                                            >
                                              {destination}
                                            </span>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={3} md={2} textAlign={"right"}>
                                    <Grid mr={{ md: 1.2, xs: 0 }}>
                                      &#8377; {fare}
                                    </Grid>
                                    <Grid
                                      sx={{
                                        display: { xs: "none", md: "block" },
                                      }}
                                    >
                                      <p style={{ fontSize: "14px" }}>
                                        <b>+More Fare</b>
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              {/* moblie response time/date */}
                              <Grid
                                item
                                xs={12}
                                sx={{ display: { md: "none" } }}
                              >
                                <Grid
                                  container
                                  justifyContent={"space-between"}
                                >
                                  <Grid item>
                                    <Grid
                                      container
                                      direction="column"
                                      rowSpacing={1}
                                    >
                                      <Grid item>
                                        <span
                                          className={
                                            aftersearchflight.flighttiming
                                          }
                                        >
                                          {dep_time}
                                        </span>
                                      </Grid>
                                      <Grid item>
                                        <span
                                          className={
                                            aftersearchflight.flightlayofftext
                                          }
                                        >
                                          {origin}
                                        </span>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <Grid
                                      container
                                      direction="column"
                                      rowSpacing={1}
                                    >
                                      <Grid item>
                                        <span
                                          className={
                                            aftersearchflight.flighttiming
                                          }
                                        >
                                          {arr_time}
                                        </span>
                                      </Grid>
                                      <Grid item>
                                        <span
                                          className={
                                            aftersearchflight.flightlayofftext
                                          }
                                        >
                                          {destination}
                                        </span>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container>
                                  <Grid item xs={12} md={9}>
                                    {/* <span
                                      className={aftersearchflight.flightoffer}
                                    >
                                      <img
                                        src={bluerectangle}
                                        alt="blue rectangle"
                                      />
                                      <span
                                        className={
                                          aftersearchflight.flightlayoffoffers
                                        }
                                      >
                                        Use MMTOFFER and get FLAT Rs. 500
                                        Instant discount on this flight
                                      </span>
                                    </span> */}
                                  </Grid>
                                  {((index === 0 && !highest_price) ||
                                    (highest_price &&
                                      index === allflights.length - 1)) && (
                                    <Grid
                                      item
                                      xs={3}
                                      sx={{
                                        display: { xs: "none", md: "block" },paddingBottom:'0.5rem'
                                      }}
                                      textAlign={"right"}
                                    >
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Cheapest
                                      </span>
                                    </Grid>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Divider></Divider>
                          </Container>
                          <Grid container>
                            <Grid item md={12} xs={12}>
                              <Accordion
                                elevation={0}
                                disableGutters={true}
                                className={classes.root}
                                expanded={expandindex === index}
                                onChange={() => handleaccordionexpand(index)}
                                sx={{
                                  borderBottomRightRadius: "1rem !important",
                                  borderBottomLeftRadius: "1rem !important",
                                }}
                              >
                                <AccordionSummary
                                  id="OW_accordionSummary"
                                  sx={{
                                    padding: "0px",
                                    paddingLeft: { md: "1.5rem", xs: "0rem" },
                                    height: { xs: "inherit", md: "3rem" },
                                    minHeight: { xs: "inherit", md: "48px" },
                                  }}
                                >
                                  <Grid
                                    container
                                    justifyContent={"space-between"}
                                  >
                                    <Grid
                                      item
                                      md={expandindex === index ? 12 : 3}
                                      alignItems={"center"}
                                      sx={{ display: "flex" }}
                                      textAlign={"left"}
                                      xs={6}
                                    >
                                      <Button
                                        disableRipple
                                        className={
                                          aftersearchflight.Flightdetails
                                        }
                                        sx={
                                          expandindex === index && {
                                            width: "fit-content",
                                            padding: "0rem 0.6rem !important",
                                          }
                                        }
                                        endIcon={<ArrowDropDownIcon />}
                                      >
                                        Flight Details
                                      </Button>
                                    </Grid>
                                    <Grid
                                      item
                                      md={expandindex === index ? 0 : 9}
                                      alignItems={"center"}
                                      textAlign={"right"}
                                      xs={6}
                                    >
                                      {expandindex !== index && (
                                        <button
                                          className={aftersearchflight.booknow}
                                          onClick={() =>
                                            package_Selection({
                                              [item.minarr.ResultIndex]:
                                                item.minarr.Segments[0][0]
                                                  .Airline.AirlineName,
                                              airline_code: airlinecode,
                                            })
                                          }
                                          style={{ paddingBottom: "0.9rem" }}
                                        >
                                          Book Now
                                        </button>
                                      )}
                                    </Grid>
                                  </Grid>
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{ padding: "0px", marginTop: "10px" }}
                                >
                                  <Grid
                                    sx={{
                                      padding: {
                                        sm: "0px 24px",
                                        xs: "0px 16px",
                                      },
                                      marginTop: "-13px",
                                      marginBottom: "20px",
                                    }}
                                  >
                                    <Divider />
                                  </Grid>
                                  <Container>
                                    <TabContext value={value1}>
                                      <TabList
                                        onChange={handlechange1}
                                        sx={{
                                          background:styles.shade_color,
                                          borderRadius: "1rem",
                                          width: "100%",
                                        }}
                                        aria-label="lab API tabs example"
                                        className={aftersearchflight.tabs}
                                        variant="scrollable"
                                        orientation={{
                                          xs: "horizontal",
                                          md: "none",
                                        }}
                                        scrollButtons={"off"}
                                        id={"tablistspace"}
                                      >
                                        <Tab
                                          disableRipple
                                          label="Flights Information"
                                          value="4"
                                          sx={{
                                            fontSize: "12px",
                                            color: styles.app_color,
                                            fontWeight: 600,
                                            textTransform: "none",
                                          }}
                                        />
                                        <Tab
                                          disableRipple
                                          label="Fare Details"
                                          value="5"
                                          sx={{
                                            fontSize: "12px",
                                            padding: "0% 5%",
                                            color: styles.app_color,
                                            fontWeight: 600,
                                            textTransform: "none",
                                          }}
                                        />
                                        <Tab
                                          disableRipple
                                          label="Baggage Information"
                                          value="6"
                                          sx={{
                                            fontSize: "12px",
                                            padding: "0% 5%",
                                            color: styles.app_color,
                                            fontWeight: 600,
                                            textTransform: "none",
                                          }}
                                        />
                                        <Tab
                                          disableRipple
                                          label="Cancellation & Change Rule"
                                          value="7"
                                          sx={{
                                            fontSize: "12px",
                                            padding: "0% 5%",
                                            color: styles.app_color,
                                            fontWeight: 600,
                                            textTransform: "none",
                                          }}
                                        />
                                      </TabList>
                                      {/* Flight information */}
                                      <TabPanel value="4">
                                        <Grid
                                          container
                                          direction={"column"}
                                          rowSpacing={4}
                                        >
                                          {innersegments.map(
                                            (segment, index) => {
                                              const G_time = segment.GroundTime;
                                              const layover_time = `${Math.floor(
                                                G_time / 60
                                              )
                                                .toString()
                                                .padStart(2, "0")}h ${(
                                                G_time % 60
                                              )
                                                .toString()
                                                .padStart(2, "0")}mins`;
                                              const duration = segment.Duration;
                                              const cal_duration = `${Math.floor(
                                                duration / 60
                                              )
                                                .toString()
                                                .padStart(2, "0")}h ${(
                                                duration % 60
                                              )
                                                .toString()
                                                .padStart(2, "0")}m`;
                                              const depseg_time = helperFunctions.get_time(
                                                segment.Origin.DepTime
                                              );
                                              const arrseg_time = helperFunctions.get_time(
                                                segment.Destination.ArrTime
                                              );
                                              const dest_loc =
                                                segment.Destination.Airport
                                                  .CityName;
                                              const origin_loc =
                                                segment.Origin.Airport.CityName;
                                              const airlinecode =
                                                segment.Airline.AirlineCode;
                                              // console.log(airlinecode)
                                              const flight_number = `${segment.Airline.AirlineCode}-${segment.Airline.FlightNumber}`;
                                              return (
                                                <>
                                                  {G_time > 0 && (
                                                    <Grid item>
                                                      <Divider>
                                                        <span>
                                                          Layover:{layover_time}
                                                        </span>
                                                      </Divider>
                                                    </Grid>
                                                  )}
                                                  <Grid item>
                                                    <Grid container>
                                                      <Grid item xs={12} md={2}>
                                                        <Grid
                                                          container
                                                          columnSpacing={{
                                                            xs: 0.3,
                                                            md: 3.5,
                                                          }}
                                                        >
                                                          <Grid
                                                            item
                                                            xs={0}
                                                            md={2}
                                                          >
                                                            <img
                                                              src={`${envdata.flagsbaseurl}/${airlinecode}.png`}
                                                              alt="indigo"
                                                              width="25rem"
                                                            />
                                                          </Grid>
                                                          <Grid
                                                            item
                                                            xs={0}
                                                            md={8}
                                                          >
                                                            <Grid
                                                              container
                                                              //rowSpacing={0.5}
                                                            >
                                                              <Grid
                                                                item
                                                                className={
                                                                  aftersearchflight.airlinename
                                                                }
                                                              >
                                                                <span>
                                                                  {airlinename}
                                                                </span>
                                                              </Grid>
                                                              <Grid
                                                                item
                                                                xs={12}
                                                              >
                                                                <span
                                                                  className={
                                                                    aftersearchflight.flightlayofftext
                                                                  }
                                                                >
                                                                  {
                                                                    flight_number
                                                                  }
                                                                </span>
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                      </Grid>

                                                      {/*  */}
                                                      <Grid
                                                        item
                                                        xs={12}
                                                        md={10}
                                                      >
                                                        <Grid container>
                                                          <Grid
                                                            item
                                                            xs={1.5}
                                                            sx={{
                                                              display: {
                                                                xs: "none",
                                                                md: "block",
                                                              },
                                                            }}
                                                          >
                                                            <Grid
                                                              Contianer
                                                              direction={
                                                                "column"
                                                              }
                                                              rowSpacing={2}
                                                            >
                                                              <Grid item>
                                                                <span
                                                                  style={{
                                                                    fontSize:
                                                                      "14px",
                                                                  }}
                                                                >
                                                                  {depseg_time}
                                                                </span>
                                                              </Grid>
                                                              <Grid item>
                                                                <span
                                                                  className={
                                                                    aftersearchflight.flightlayofftext
                                                                  }
                                                                >
                                                                  {origin_loc}
                                                                </span>
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                          <Grid
                                                            item
                                                            xs={12}
                                                            md={9}
                                                          >
                                                            <Grid container>
                                                              <Grid
                                                                item
                                                                xs={3}
                                                                alignItems={
                                                                  "center"
                                                                }
                                                                // mt={1.5}
                                                              >
                                                                <img
                                                                  src={plane}
                                                                  alt="plane"
                                                                  className="flight_size_xs"
                                                                  width={"100%"}
                                                                />
                                                              </Grid>
                                                              <Grid
                                                                item
                                                                xs={6}
                                                                textAlign={
                                                                  "center"
                                                                }
                                                                alignItems={
                                                                  "flex-end"
                                                                }
                                                              >
                                                                <Stack>
                                                                  <span
                                                                    className={
                                                                      aftersearchflight.flightlayofftext
                                                                    }
                                                                  >
                                                                    {
                                                                      cal_duration
                                                                    }
                                                                  </span>
                                                                  <span
                                                                    style={{
                                                                      borderBottom:
                                                                        `1px dashed ${styles.app_color}`,
                                                                    }}
                                                                  >
                                                                    {/* <img
                                                                      src={nonstop}
                                                                      alt="nonstop"
                                                                    /> */}
                                                                  </span>
                                                                  <span
                                                                    className={
                                                                      aftersearchflight.flightlayofftext
                                                                    }
                                                                  >
                                                                    {stops === 0
                                                                      ? "non-stop"
                                                                      : stops >
                                                                        1
                                                                      ? "2+Stops"
                                                                      : "1 Stop"}
                                                                  </span>
                                                                </Stack>
                                                              </Grid>
                                                              <Grid
                                                                item
                                                                xs={3}
                                                                textAlign={
                                                                  "right"
                                                                }
                                                                // mt={1.5}
                                                              >
                                                                <img
                                                                  src={plane}
                                                                  alt="plane"
                                                                  className="flight_size_xs"
                                                                  width={"100%"}
                                                                />
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                          <Grid
                                                            item
                                                            xs={1.5}
                                                            sx={{
                                                              display: {
                                                                xs: "none",
                                                                md: "block",
                                                              },
                                                            }}
                                                          >
                                                            <Grid
                                                              container
                                                              direction={
                                                                "colummn"
                                                              }
                                                            >
                                                              <Grid item mr={2}>
                                                                <span
                                                                  style={{
                                                                    fontSize:
                                                                      "14px",
                                                                  }}
                                                                >
                                                                  {arrseg_time}
                                                                </span>
                                                              </Grid>
                                                              <Grid item>
                                                                <span
                                                                  className={
                                                                    aftersearchflight.flightlayofftext
                                                                  }
                                                                >
                                                                  {dest_loc}
                                                                </span>
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                          {/* flight time and date */}
                                                          <Grid
                                                            item
                                                            xs={12}
                                                            sx={{
                                                              display: {
                                                                md: "none",
                                                              },
                                                            }}
                                                          >
                                                            <Grid
                                                              container
                                                              justifyContent={
                                                                "space-between"
                                                              }
                                                            >
                                                              <Grid item>
                                                                <Grid
                                                                  Contianer
                                                                  direction={
                                                                    "column"
                                                                  }
                                                                  rowSpacing={2}
                                                                >
                                                                  <Grid item>
                                                                    <span
                                                                      style={{
                                                                        fontSize:
                                                                          "14px",
                                                                      }}
                                                                    >
                                                                      {
                                                                        depseg_time
                                                                      }
                                                                    </span>
                                                                  </Grid>
                                                                  <Grid item>
                                                                    <span
                                                                      className={
                                                                        aftersearchflight.flightlayofftext
                                                                      }
                                                                    >
                                                                      {
                                                                        origin_loc
                                                                      }
                                                                    </span>
                                                                  </Grid>
                                                                </Grid>
                                                              </Grid>
                                                              <Grid item>
                                                                <Grid
                                                                  container
                                                                  direction={
                                                                    "column"
                                                                  }
                                                                >
                                                                  <Grid
                                                                    item
                                                                    mr={2}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize:
                                                                          "14px",
                                                                      }}
                                                                    >
                                                                      {
                                                                        arrseg_time
                                                                      }
                                                                    </span>
                                                                  </Grid>
                                                                  <Grid item>
                                                                    <span
                                                                      className={
                                                                        aftersearchflight.flightlayofftext
                                                                      }
                                                                    >
                                                                      {dest_loc}
                                                                    </span>
                                                                  </Grid>
                                                                </Grid>
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                </>
                                              );
                                            }
                                          )}
                                          {/* <Grid item>
                                      <Grid container>
                                        <Grid item xs={2}>
                                          <Grid container columnSpacing={3.5}>
                                            <Grid item xs={2}>
                                              <img src={indigo} alt="indigo" />
                                            </Grid>
                                            <Grid item xs={8}>
                                              <Grid container rowSpacing={0.5}>
                                                <Grid item>
                                                  <span
                                                    style={{ fontSize: "14px" }}
                                                  >
                                                    IndiGo
                                                  </span>
                                                </Grid>
                                                <Grid item>
                                                  <span
                                                    className={
                                                      aftersearchflight.flightlayofftext
                                                    }
                                                  >
                                                    IN 3678
                                                  </span>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={10}>
                                          <Grid container>
                                            <Grid item xs={1.5}>
                                              <Grid
                                                Contianer
                                                direction={"column"}
                                              >
                                                <Grid item>
                                                  <span
                                                    style={{ fontSize: "14px" }}
                                                  >
                                                    5:30PM
                                                  </span>
                                                </Grid>
                                                <Grid item>
                                                  <span
                                                    className={
                                                      aftersearchflight.flightlayofftext
                                                    }
                                                  >
                                                    New Delhi
                                                  </span>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            <Grid item xs={9}>
                                              <Grid container>
                                                <Grid
                                                  item
                                                  xs={2}
                                                  alignItems={"center"}
                                                  mt={1.5}
                                                >
                                                  <img
                                                    src={plane}
                                                    alt="plane"
                                                  />
                                                </Grid>
                                                <Grid
                                                  item
                                                  xs={6}
                                                  textAlign={"center"}
                                                  alignItems={"center"}
                                                >
                                                  <Stack>
                                                    <span
                                                      className={
                                                        aftersearchflight.flightlayofftext
                                                      }
                                                    >
                                                      00h 45m
                                                    </span>
                                                    <span>
                                                      <img
                                                        src={nonstop}
                                                        alt="nonstop"
                                                      />
                                                    </span>
                                                    <span
                                                      className={
                                                        aftersearchflight.flightlayofftext
                                                      }
                                                    >
                                                      1 Stop
                                                    </span>
                                                  </Stack>
                                                </Grid>
                                                <Grid
                                                  item
                                                  xs={3}
                                                  textAlign={"right"}
                                                  mt={1.5}
                                                >
                                                  <img
                                                    src={plane}
                                                    alt="plane"
                                                  />
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            <Grid item xs={1.5}>
                                              <Grid
                                                contianer
                                                direction={"colummn"}
                                                textAlign={"right"}
                                              >
                                                <Grid item mr={2}>
                                                  <span
                                                    style={{ fontSize: "14px" }}
                                                  >
                                                    6:15PM
                                                  </span>
                                                </Grid>
                                                <Grid item>
                                                  <span
                                                    className={
                                                      aftersearchflight.flightlayofftext
                                                    }
                                                  >
                                                    vishakapatnam
                                                  </span>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid> */}
                                        </Grid>
                                      </TabPanel>
                                      {/* Fare Details */}
                                      <TabPanel value="5">
                                        <Grid
                                          container
                                          direction="column"
                                          spacing={0.8}
                                          className={aftersearchflight.faretxt}
                                        >
                                          {innerfarebreakdown.map(
                                            (farebrkdwn, index) => {
                                              // console.log(farebrkdwn,"breakdown")

                                              const passengercount =
                                                farebrkdwn.PassengerCount;
                                              const passegertype =
                                                farebrkdwn.PassengerType;
                                              const passenger_conversion =
                                                passegertype === 1
                                                  ? "Adult"
                                                  : passegertype === 2
                                                  ? "Child"
                                                  : passegertype === 3 &&
                                                    "Child";
                                              const passenger = `${passengercount} * ${passenger_conversion}`;
                                              const basefare =
                                                farebrkdwn.BaseFare;
                                              totalbasefare += basefare;
                                              toataltax += farebrkdwn.Tax;
                                              return (
                                                <Grid item>
                                                  <Grid
                                                    container
                                                    justifyContent={{
                                                      xs: "space-between",
                                                      md: "inherit",
                                                    }}
                                                  >
                                                    <Grid item xs={0} md={5}>
                                                      {passenger}
                                                    </Grid>
                                                    <Grid
                                                      item
                                                      xs={0}
                                                      md={5}
                                                      sx={{ fontWeight: "500" }}
                                                    >
                                                      &#8377; {basefare}{" "}
                                                    </Grid>
                                                  </Grid>
                                                </Grid>
                                              );
                                            }
                                          )}

                                          <Grid item>
                                            <Grid
                                              container
                                              justifyContent={{
                                                xs: "space-between",
                                                md: "inherit",
                                              }}
                                            >
                                              <Grid item xs={0} md={5}>
                                                Total (BaseFare)
                                              </Grid>
                                              <Grid
                                                item
                                                xs={0}
                                                md={5}
                                                sx={{ fontWeight: "500" }}
                                              >
                                                &#8377; {totalbasefare}{" "}
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Grid
                                              container
                                              justifyContent={{
                                                xs: "space-between",
                                                md: "inherit",
                                              }}
                                            >
                                              <Grid item xs={0} md={5}>
                                                Total Tax
                                              </Grid>
                                              <Grid
                                                item
                                                xs={0}
                                                md={5}
                                                sx={{ fontWeight: "500" }}
                                              >
                                                &#8377; {toataltax}{" "}
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Grid
                                              container
                                              justifyContent={{
                                                xs: "space-between",
                                                md: "inherit",
                                              }}
                                            >
                                              <Grid item xs={0} md={5}>
                                                Other charges
                                              </Grid>
                                              <Grid
                                                item
                                                xs={0}
                                                md={5}
                                                sx={{ fontWeight: "500" }}
                                              >
                                                &#8377; {oc}{" "}
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Grid
                                              container
                                              justifyContent={{
                                                xs: "space-between",
                                                md: "inherit",
                                              }}
                                            >
                                              <Grid item xs={0} md={5}>
                                                Total (Fee & Surcharge)
                                              </Grid>
                                              <Grid
                                                item
                                                xs={0}
                                                md={5}
                                                sx={{ fontWeight: "500" }}
                                              >
                                                &#8377;{" "}
                                                {totalbasefare + toataltax + oc}{" "}
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </TabPanel>
                                      {/* Baggage information*/}
                                      <TabPanel
                                        value="6"
                                        sx={{ padding: "0px" }}
                                      >
                                        <Grid
                                          container
                                          direction={"column"}
                                          rowSpacing={1}
                                          className={aftersearchflight.baggage}
                                        >
                                          <Grid item>
                                            <Grid
                                              container
                                              className="accordian_font_style_flights"
                                            >
                                              <Grid item md={4} xs={6}>
                                                Airline
                                              </Grid>
                                              <Grid item md={4} xs={3}>
                                                Check-in Baggage
                                              </Grid>
                                              <Grid item md={4} xs={3}>
                                                Cabin Baggage
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {innersegments.map(
                                            (segment, index) => {
                                              const cabinbaggage = `${
                                                segment.CabinBaggage ?? 0
                                              }`;
                                              const check_inbaggage = `${segment.Baggage}`;
                                              const {
                                                AirlineName: flightname,
                                                AirlineCode: code,
                                                FlightNumber: number,
                                              } = segment.Airline;
                                              const flightnum = `${flightname} ${code} ${number}`;
                                              return (
                                                <Grid item>
                                                  <Grid
                                                    container
                                                    className={`
                                                      ${aftersearchflight.faretxt}
                                                      accordian_font_style_flights
                                                      `}
                                                  >
                                                    <Grid
                                                      container
                                                      item
                                                      md={4}
                                                      xs={6}
                                                      spacing={1}
                                                    >
                                                      <Grid item>
                                                        <img
                                                          src={`${envdata.flagsbaseurl}/${code}.png`}
                                                          alt="indigo"
                                                          width="25rem"
                                                        />
                                                      </Grid>{" "}
                                                      <Grid item>
                                                        {flightnum}
                                                      </Grid>
                                                    </Grid>
                                                    <Grid item md={4} xs={3}>
                                                      {cabinbaggage}
                                                    </Grid>
                                                    <Grid item md={4} xs={3}>
                                                      {check_inbaggage}
                                                    </Grid>
                                                  </Grid>
                                                </Grid>
                                              );
                                            }
                                          )}
                                          {}
                                          {/* <Grid item>
                                      <Grid
                                        container
                                        className={aftersearchflight.faretxt}
                                      >
                                        <Grid item xs={4}>
                                          <span>
                                            <img src={indigo} alt="indigo" />{" "}
                                            IndiGo. IN 3677
                                          </span>
                                        </Grid>
                                        <Grid item xs={5}>
                                          7 Kgs
                                        </Grid>
                                        <Grid item xs={3}>
                                          15 Kgs
                                        </Grid>
                                      </Grid>
                                    </Grid> */}
                                        </Grid>
                                        <Grid
                                          container
                                          direction={"column"}
                                          spacing={3}
                                          sx={{ paddingLeft: "1.5rem" }}
                                          mt={2}
                                        >
                                          <Grid item>
                                            <Stack
                                              direction="row"
                                              spacing={1.5}
                                            >
                                              <span
                                                className={
                                                  aftersearchflight.baggagebullet
                                                }
                                              >
                                                &#x2022;
                                              </span>
                                              <span
                                                className={
                                                  aftersearchflight.baggageinfo
                                                }
                                              >
                                                Baggage information mentioned
                                                above is obtained from airline's
                                                reservation system, gomytyrip
                                                does not guarantee the accuracy
                                                of this information.
                                              </span>
                                            </Stack>
                                          </Grid>
                                          <Grid item>
                                            <Stack
                                              direction={"row"}
                                              spacing={1.5}
                                            >
                                              <span
                                                style={{ fontSize: "1.5rem" }}
                                              >
                                                &#x2022;
                                              </span>
                                              <span>
                                                The baggage allowance may vary
                                                according to stop-overs,
                                                connecting flights. changes in
                                                airline rules. etc.
                                              </span>
                                            </Stack>
                                          </Grid>
                                        </Grid>
                                      </TabPanel>
                                      {/* cancellation  */}
                                      <TabPanel
                                        value="7"
                                        sx={{ padding: "0px" }}
                                      >
                                        <Grid
                                          container
                                          direction={"column"}
                                          rowSpacing={1}
                                          className={aftersearchflight.baggage}
                                        >
                                          <Grid item>
                                            <Grid
                                              container
                                              className="accordian_font_style_flights"
                                            >
                                              <Grid item md={4} xs={4}>
                                                Cancellation Time
                                              </Grid>
                                              <Grid item md={5} xs={5}>
                                                Penalty%
                                              </Grid>
                                              <Grid item md={3} xs={3}>
                                                Penalty&#8377;
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {minifare.length > 0 &&
                                            minifare[0].map((rules, index) => {
                                              let from;
                                              let to;
                                              let cancellation_price;
                                              let units;
                                              let cancel_percent;
                                              if (
                                                rules.Type === "Cancellation"
                                              ) {
                                                from = rules.From ?? "";
                                                to =
                                                  rules.To === ""
                                                    ? "Above"
                                                    : rules.To ?? "";
                                                cancellation_price =
                                                  rules.Details ?? "";
                                                units = rules.Unit ?? "";
                                                cancel_percent =
                                                  helperFunctions.cancelltion_percentage(
                                                    fare,
                                                    cancellation_price
                                                  );
                                              }
                                              let cancellation_time = `${from}-${to}${
                                                to !== "Above" ? units : ""
                                              }`;
                                              return (
                                                rules.Type ==
                                                  "Cancellation" && (
                                                  <Grid item>
                                                    <Grid
                                                      container
                                                      className={
                                                        aftersearchflight.faretxt
                                                      }
                                                    >
                                                      <Grid item xs={4}>
                                                        <span>
                                                          {cancellation_time}
                                                        </span>
                                                      </Grid>
                                                      <Grid item xs={5}>
                                                        {`${cancel_percent}%`}
                                                      </Grid>
                                                      <Grid item xs={3}>
                                                        {cancellation_price}
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                )
                                              );
                                            })}

                                          {/* <Grid item>
                                      <Grid
                                        container
                                        className={aftersearchflight.faretxt}
                                      >
                                        <Grid item xs={4}>
                                          <span>2hrs - 3days</span>
                                        </Grid>
                                        <Grid item xs={5}>
                                          30%
                                        </Grid>
                                        <Grid item xs={3}>
                                          &#8377; 690.00
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <Grid
                                        container
                                        className={aftersearchflight.faretxt}
                                      >
                                        <Grid item xs={4}>
                                          <span>3days - 365 days</span>
                                        </Grid>
                                        <Grid item xs={5}>
                                          10%
                                        </Grid>
                                        <Grid item xs={3}>
                                          &#8377; 230.00
                                        </Grid>
                                      </Grid>
                                    </Grid> */}
                                        </Grid>
                                        <div
                                          style={{
                                            paddingLeft: "1rem",
                                            paddingTop: "1.5rem",
                                          }}
                                        >
                                          <h4 style={{ color: styles.app_color }}>
                                            Reschedule Penalty Fees
                                          </h4>
                                          <Divider></Divider>

                                          <Grid
                                            container
                                            direction={"column"}
                                            mt={2}
                                            rowSpacing={1}
                                          >
                                            <Grid item>
                                              <Grid container>
                                                <Grid item xs={5}>
                                                  Time Frame to Reissue
                                                </Grid>
                                                <Grid item xs={4}>
                                                  Airline Fees
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            {minifare.length > 0 &&
                                              minifare[0].map(
                                                (reissue, index) => {
                                                  let from;
                                                  let to;
                                                  let units;
                                                  let details;
                                                  if (
                                                    reissue.Type === "Reissue"
                                                  ) {
                                                    from = reissue.From ?? "";
                                                    to =
                                                      reissue.To === ""
                                                        ? "Above"
                                                        : reissue.To ?? "";
                                                    // to = reissue.To ?? "";
                                                    units = reissue.Unit ?? "";
                                                    details =
                                                      reissue.Details ?? "";
                                                  }
                                                  const reissue_time = `Before ${from} to ${to} ${
                                                    to !== "Above" ? units : ""
                                                  }`;
                                                  return (
                                                    reissue.Type ===
                                                      "Reissue" && (
                                                      <Grid item>
                                                        <Grid container>
                                                          <Grid item xs={5}>
                                                            {reissue_time}
                                                          </Grid>
                                                          <Grid item xs={4}>
                                                            {/* &#8377;*/}
                                                            {details}
                                                          </Grid>
                                                        </Grid>
                                                      </Grid>
                                                    )
                                                  );
                                                }
                                              )}
                                            {/* <Grid item>
                                        <Grid container>
                                          <Grid item xs={3}>
                                            EMT fees
                                          </Grid>
                                          <Grid item xs={9}>
                                            &#8377; 230
                                          </Grid>
                                        </Grid>
                                      </Grid> */}
                                          </Grid>
                                        </div>
                                        <div style={{ paddingLeft: "1rem" }}>
                                          <h4 style={{ color: styles.app_color }}>
                                            Terms & conditions
                                          </h4>
                                          <Divider></Divider>
                                          <Grid
                                            container
                                            direction={"column"}
                                            rowSpacing={2}
                                            mt={1}
                                          >
                                            <Grid item>
                                              &#x2022;{" "}
                                              <span>
                                                Total Reschedule Charges =
                                                Airline Reschedule Fee + Fare
                                                Diffrence
                                              </span>
                                            </Grid>
                                            <Grid item>
                                              &#x2022;{" "}
                                              <span>
                                                The airline cancel/ reschedule
                                                fees is inducative and can be
                                                changed without anyprior notice
                                                by the airlines.
                                              </span>
                                            </Grid>
                                            <Grid item>
                                              &#x2022;{" "}
                                              <span>
                                                gomytrip does not guarantee the
                                                accuracy of cancel/ reschedule
                                                fees.{" "}
                                              </span>
                                            </Grid>
                                            <Grid item>
                                              &#x2022;{" "}
                                              <span>
                                                Partial cancellation is not
                                                allowed on the flight tickets
                                                which are book under special
                                                round-trips discouted fares.
                                              </span>
                                            </Grid>
                                            <Grid item>
                                              &#x2022;{" "}
                                              <span>
                                                In certain situations of
                                                restricted cases, no amendments
                                                and cancellation is allowed.
                                              </span>
                                            </Grid>
                                          </Grid>
                                        </div>
                                      </TabPanel>
                                    </TabContext>
                                  </Container>
                                  <Grid item textAlign={"right"}>
                                    <button
                                      className={aftersearchflight.bookbtn}
                                      onClick={() =>
                                        package_Selection({
                                          [item.minarr.ResultIndex]:
                                            item.minarr.Segments[0][0].Airline
                                              .AirlineName,
                                        })
                                      }
                                    >
                                      Book Now
                                    </button>
                                  </Grid>
                                </AccordionDetails>
                              </Accordion>
                            </Grid>
                          </Grid>
                        </Paper>
                      );
                    })
                  ) : (
                    <div>Flights not found</div>
                  )}
                </Container>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default AfterFlightsSearch;
