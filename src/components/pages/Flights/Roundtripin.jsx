import {
  Accordion,
  Grid,
  Paper,
  Stack,
  Divider,
  AccordionSummary,
  AccordionDetails,
  Tab,
} from "@mui/material";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import {
  aftersearchflights,
  multicitystyles,
} from "../../../assets/styles/Flights.jsx";
import plane from "../../../assets/images/plane.svg";
import onestop from "../../../assets/images/onestop.svg";
import bluerectangle from "../../../assets/images/bluerectangle.svg";
import makeStyles from "@mui/styles/makeStyles";
import uparrow from "../../../assets/images/uparrow.svg";
import downarrow from "../../../assets/images/downarrow.svg";
import nonstop from "../../../assets/images/nonstop.svg";
import BookNow from "../../modals/Flightmodals/BookNow.jsx";
import helperFunctions from "../../../helpers/helperFunctions.js";
import {envdata} from '../../Envexports.jsx'
import {styles} from '../../../assets/styles/Styles_export.jsx'
const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiAccordion-root:before": {
      display: "none",
    },
  },
}));
const Roundtripin = forwardRef((props, ref) => {
  // const flagsbaseurl = process.env.REACT_APP_FLAGSBASEURL;
  // const baseurl = process.env.REACT_APP_BASEURL;

  const flightsdata = useSelector((state) => state.flightsearches.Flightsdata);
  let total_multicity = flightsdata.flightsdata[0];
  const multicity = multicitystyles();
  const classes = useStyles();
  const aftersearchflight = aftersearchflights();
  const [expand, setExpand] = useState(null);
  const [tabvalue, setTabvalue] = useState(0);
  const [value1, setValue1] = useState("4");
  const [allflights, setAllflights] = useState([]);
  const [booknow, setBooknow] = useState(false);
  const [packages, setPackages] = useState([]);
  // console.log(flightsdata.flightsdata[0],"total_flights data")
  const handleaccordionexpand = (index) => (event, isExpanded) => {
    setExpand(isExpanded ? index : null);
  };
  const flighttabs = (event, tabvalue) => {
    setTabvalue(tabvalue);
  };
  const handlechange1 = (event, newvalue) => {
    setValue1(newvalue);
  };
  useEffect(() => {
    if (flightsdata.flightsdata.length === 1) {
      setAllflights(flightsdata.flightsdata[0]);
    }
  }, [flightsdata]);
  // filtering  data for international case
  const Apply_filters = async (data) => {
    console.log(data, "international filters");
    const except_flights = data.pop();
    const airline_names = data;
    // console.log(data,"filtersapplied")
    let wholeflightss;
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
    //  airlines filter
    if (airline_names.length > 0) {
      total_multicity = await total_multicity.filter((flight) =>
        flight?.minarr.Segments.flat().some((item) =>
          airline_names.includes(item.Airline.AirlineName)
        )
      );
      // total_multicity=await total_multicity.filter((flight)=>flight.Segments.flat().filter(item=>airline_names.includes(item.Airline.AirlineName)))
    }
    // stops filters
    if (stops.length > 0) {
      // console.log(total_multicity)
      total_multicity = await total_multicity.filter((flight) =>
        flight?.minarr.Segments.some((segments) => {
          const seg_len = segments.length > 2 ? 3 : segments.length;
          return stops.includes(seg_len);
        })
      );
    }
    // departure filters
    if (departures.length > 0) {
      total_multicity = total_multicity.filter((flight) => {
        // console.log(flight?.minarr.Segments[0],"segments")
        // const date = new Date(flight?.minarr.Segments[0][0].Origin.DepTime)
        //     const hour = date.getHours();
        //     let dep =hour<6?1:hour>=6&&hour<12?2:hour>=12&&hour<18?3:hour>=18&&hour<=23&&4;
        //     return departures.includes(dep)
        return flight?.minarr.Segments.some((segment) => {
          const departureTime = segment[0]?.Origin?.DepTime;

          if (departureTime) {
            const hour = new Date(departureTime).getHours();
            const dep =
              hour < 6
                ? 1
                : hour < 12
                ? 2
                : hour < 18
                ? 3
                : hour <= 23
                ? 4
                : null;

            if (dep !== null && departures.includes(dep)) {
              return true; // Include the flight if any segment's departure time matches
            }
          }
          return false;
        });
      });
    }
    // lowest price filter
    if (except_flights.low_price) {
      let low_arr = [...total_multicity];
      low_arr.sort(
        (a, b) => a?.minarr.Fare.PublishedFare - b?.minarr.Fare.PublishedFare
      );
      total_multicity = [...low_arr];
    }
    // Highest price filter
    if (except_flights.high_price) {
      let sort_Arr = [...total_multicity];
      sort_Arr.sort(
        (a, b) => b?.minarr.Fare.PublishedFare - a?.minarr.Fare.PublishedFare
      ); //b.Fare.PublishedFare-a.minarr.Fare.PublishedFare
      total_multicity = [...sort_Arr];
    }

    // console.log(stops)
    // console.log(total_multicity.length,"setuubg")
    setAllflights(total_multicity);
  };
  // triggering the funtion from the parent component
  useImperativeHandle(ref, () => ({
    Apply_filters,
  }));
  // select flight
  const select_flight = async (selected_package) => {
    setPackages([selected_package]);
    setBooknow(true);
  };
  return (
    <div>
      <BookNow
        open={booknow}
        onclose={() => setBooknow(false)}
        package_selection={packages}
      />
      <Paper
        className="background_transparent"
        sx={{
          borderRadius: "1rem",
          padding: "1rem",
          backgroundColor: { md: "white", xs: "transparent" },
        }}
        mt={2}
        elevation={{ xs: 0, md: 1 }}
      >
        {allflights.length > 0 ? (
          allflights.map((item, index) => {
            // console.log(item.minarr,"signle")
            const {
              Fare: innerfare,
              FareBreakdown: innerfarebreakdown,
              Segments: innersegments,
              MiniFareRules: minifare = [],
            } = item?.minarr;
            const airlinename = innersegments[0].at(0).Airline.AirlineName;
            const airlinecode = innersegments[0].at(0).Airline.AirlineCode;
            const fare = innerfare?.PublishedFare;
            const oc = innerfare?.OtherCharges;
            let totalbasefare = 0;
            let totaltax = 0;

            // console.log(minifare,"innder")
            // const get_time = (time) => {
            //   const date = new Date(time);
            //   const hours = date.getHours();
            //   const minutes = date.getMinutes();
            //   const mod_time = `${hours.toString().padStart(2, "0")}:${minutes
            //     .toString()
            //     .padStart(2, "0")}`;
            //   return mod_time;
            // };
            const get_date = (date) => {
              const modifieddate = new Date(date);
              const formattedDate = modifieddate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                // year: "numeric",
              });
              // formattedDate.split(" ")
              return formattedDate;
            };
            return (
              <Paper
                sx={{ marginTop: "1.2rem", borderRadius: "1rem" }}
                key={index}
              >
                <Stack spacing={2} sx={{ padding: "1rem 1rem 0rem 1.5rem" }}>
                  <Grid container alignItems={"center"}>
                    {/* <Grid item md={6} ><img src={`${flagsbaseurl}/${airlinecode}.png`} alt="indigo" width="5%"/>{" "}<span className={multicity.flighttxt} style={{paddingBottom:'1rem'}}>{airlinename}</span></Grid> */}
                    <Grid item md={6} xs={6}>
                      <Stack direction={"row"} spacing={1}>
                        <img
                          src={`${envdata.flagsbaseurl}/${airlinecode}.png`}
                          alt="indigo"
                          width="25px"
                          height="25px"
                        />
                        <span
                          className={multicity.flighttxt}
                          style={{ paddingBottom: "1rem", fontSize: "14px" }}
                        >
                          {airlinename}
                        </span>
                      </Stack>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={6}
                      textAlign={"right"}
                      className={multicity.pricetxt}
                    >
                      &#8377; {fare}
                    </Grid>
                  </Grid>
                  {/* <Divider></Divider> */}
                  {innersegments.map((flightsegment, index) => {
                    // console.log(flightsegment)
                    let duration =
                      flightsegment.at(-1)?.AccumulatedDuration ??
                      flightsegment[0]?.Duration;
                    const jrney_time = `${Math.floor(duration / 60)
                      .toString()
                      .padStart(2, "0")}h ${(duration % 60)
                      .toString()
                      .padStart(2, "0")}m`;
                    let stops = flightsegment.length - 1;
                    let dep_date = get_date(
                      flightsegment[0].Origin.DepTime
                    ).split(" ");
                    let arr_date = get_date(
                      flightsegment.at(-1).Destination.ArrTime
                    ).split(" ");
                    let dep_time =helperFunctions.get_time(flightsegment[0].Origin.DepTime);
                    let arr_time = helperFunctions.get_time(
                      flightsegment.at(-1).Destination.ArrTime
                    );
                    let departure = `${dep_date[1]} ${dep_date[0]}, ${dep_time}`;
                    let arrival = `${arr_date[1]} ${arr_date[0]}, ${arr_time}`;
                    let origin = flightsegment[0].Origin.Airport.CityName;
                    let destination =
                      flightsegment.at(-1).Destination.Airport.CityName;
                    return (
                      <>
                        <Grid item>
                          <Divider />
                        </Grid>
                        <Grid container>
                          <Grid item md={2.4} xs={2.4}>
                            <Grid container direction="column" spacing={1.5}>
                              {/* {console.log(departure,"departure roundtripinternaitonl")} */}
                              <Grid item className={multicity.datetime}>
                                {departure}
                              </Grid>
                              <Grid item className={multicity.nrmltxt} mt={1}>
                                {origin}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item md={7.5} xs={7.5}>
                            <Grid container>
                              <Grid
                                item
                                md={2}
                                xs={2}
                                textAlign="right"
                                mt={1.7}
                              >
                                <img src={plane} width="100%" alt="plane" />
                              </Grid>
                              <Grid item md={8} xs={8}>
                                <Grid
                                  container
                                  direction={"column"}
                                  textAlign="center"
                                >
                                  <Grid item className={multicity.nrmltxt}>
                                    {jrney_time}
                                  </Grid>
                                  <Grid
                                    item
                                    position={"relative"}
                                    margin={"0.2rem 0rem"}
                                  >
                                    {/* <img src={onestop} alt="onestop" width="100%" height="10%"/> */}
                                    <div
                                      style={{
                                        width: "100%",
                                        borderTop:
                                          "1px dashed rgba(0, 53, 86, 1)",
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        background: "rgba(0, 53, 86, 1)",
                                        width: "7px",
                                        height: "7px",
                                        borderRadius: "50%",
                                        position: "absolute",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)",
                                      }}
                                    ></div>
                                  </Grid>
                                  <Grid item className={multicity.nrmltxt}>
                                    {stops === 0 ? "non-stop" : `${stops} Stop`}
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item md={2} mt={1.7} xs={2}>
                                <img src={plane} width="100%" alt="plane" />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item md={2.1} textAlign="right" xs={2.1}>
                            <Grid container direction="column" spacing={1.5}>
                              <Grid item className={multicity.datetime}>
                                {arrival}
                              </Grid>
                              <Grid item className={multicity.nrmltxt} mt={1}>
                                {destination}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                  <Grid item>
                    <span
                      style={{
                        backgroundColor: "#DFF3FF",
                        padding: "2px 0.7rem",
                        borderRadius: "0.3rem",
                      }}
                    >
                      <img src={bluerectangle} alt="bluerectangle" />{" "}
                      <span className={multicity.flighttxt}>
                        Use MMTOFFER and get FLAT Rs. 500 Instant discount on
                        this flight
                      </span>
                    </span>
                  </Grid>
                </Stack>
                <Grid item container mt={2} className="display-none1">
                  {/* expand===index?12:3  md*/}
                  <Grid item md={12} sx={{ width: "100%" }}>
                    <Accordion
                      className={classes.root}
                      elevation={0}
                      expanded={expand === index}
                      onChange={handleaccordionexpand(index)}
                    >
                      <AccordionSummary
                        id="multiCity_accordion"
                        sx={{
                          paddingLeft: "1.5rem",
                          paddingRight: "0rem",
                          minHeight: { xs: "0px", md: "inherit" },
                        }}
                      >
                        <Grid
                          container
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Grid item xs={6}>
                            <Stack direction="row" spacing={1}>
                              <span
                                className={multicity.flightdetailsaccordion}
                              >
                                Flight Details
                              </span>
                              <img
                                src={expand === index ? uparrow : downarrow}
                                alt="arrow"
                              />
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            alignItems={"center"}
                            textAlign={"right"}
                          >
                            {expand !== index && (
                              <button
                                className={multicity.booknow}
                                onClick={() =>
                                  select_flight({
                                    [item.minarr.ResultIndex]:
                                      item.minarr.Segments[0][0].Airline
                                        .AirlineName,
                                    airline_code: airlinecode,
                                  })
                                }
                              >
                                Book now
                              </button>
                            )}
                          </Grid>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{ padding: "0rem", paddingLeft: "0.8rem" }}
                      >
                        <Grid
                          item
                          sx={{ marginLeft: { md: "16px", xs: "0px" } }}
                        >
                          <TabContext value={tabvalue}>
                            <TabList
                              onChange={flighttabs}
                              className={multicity.detailstab}
                            >
                              {innersegments.map((tabs, val) => {
                                const flight_name = tabs[0].Airline.AirlineName;
                                const airlinecode = tabs[0].Airline.AirlineCode;
                                return (
                                  <Tab
                                    value={val}
                                    sx={{
                                      marginLeft: val === 0 ? "0rem" : "1rem",
                                      width: "100px",
                                    }}
                                    disableRipple
                                    className={multicity.tabbtns}
                                    label={
                                      <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems={"center"}
                                      >
                                        <img
                                          src={`${envdata.flagsbaseurl}/${airlinecode}.png`}
                                          alt="indigo"
                                          width="20%"
                                        />
                                        <span
                                          className={`${aftersearchflight.tab_airlinename}`}
                                          style={{ textTransform: "none" }}
                                        >
                                          {flight_name}
                                        </span>
                                      </Stack>
                                    }
                                  />
                                );
                              })}
                              {/* <Tab value="2" className={multicity.tabbtns} label={<Stack direction="row" spacing={1}><img src={trujet} alt="trujet"/><span style={{textTransform:'none'}}>Trujet</span></Stack>}/>
                            <Tab value="3" className={multicity.tabbtns} label={<Stack direction="row" spacing={1}><img src={indigo} alt="indigo"/><span style={{textTransform:'none'}}>IndiGo</span></Stack>}/>
                            <Tab value="4" className={multicity.tabbtns} label={<Stack direction="row" spacing={1}><img src={trujet} alt="trujet"/><span style={{textTransform:'none'}}>Trujet</span></Stack>}/> */}
                            </TabList>

                            {innersegments.map((panels, val) => {
                              let stops = panels.length - 1;
                              let origin = panels.at(0).Origin.Airport.CityName;
                              let destination =
                                panels.at(-1).Destination.Airport.CityName;
                              // let dep=helperFunctions.getdate(panels.at(0).Origin.DepTime)

                              const date = new Date(
                                panels.at(0).Origin.DepTime
                              );
                              const options = {
                                weekday: "long",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              };
                              const formatter = new Intl.DateTimeFormat(
                                "en-US",
                                options
                              );
                              const dep = formatter.format(date);

                              return (
                                <TabPanel
                                  value={val}
                                  sx={{ paddingLeft: "7px" }}
                                >
                                  <Stack spacing={2}>
                                    <Grid
                                      item
                                      className={multicity.tabcitytxt}
                                    >{`${origin}-${destination}, ${dep}`}</Grid>
                                    <Divider />
                                    <TabContext value={value1}>
                                      <TabList
                                        variant="scrollable"
                                        orientation={{
                                          xs: "horizontal",
                                          md: "none",
                                        }}
                                        scrollButtons={"off"}
                                        onChange={handlechange1}
                                        sx={{
                                          background: "#DFF3FF",
                                          borderRadius: "1rem",
                                        }}
                                        aria-label="lab API tabs example"
                                        className={aftersearchflight.tabs}
                                      >
                                        <Tab
                                          disableRipple
                                          label="Flights Information"
                                          value="4"
                                          sx={{
                                            fontSize: "12px",
                                            color: `${styles.app_color}`,
                                            fontWeight: "600",
                                            textTransform: "none",
                                          }}
                                        />
                                        <Tab
                                          disableRipple
                                          label="Fare Details"
                                          value="5"
                                          sx={{
                                            fontSize: "12px",
                                            color: `${styles.app_color}`,
                                            fontWeight: "600",
                                            padding: "0% 10%",
                                            textTransform: "none",
                                          }}
                                        />
                                        <Tab
                                          disableRipple
                                          label="Baggage Information"
                                          value="6"
                                          sx={{
                                            fontSize: "12px",
                                            padding: "0% 4%",
                                            fontWeight: "600",
                                            color: `${styles.app_color}`,
                                            textTransform: "none",
                                          }}
                                        />
                                        <Tab
                                          disableRipple
                                          label="Cancellation & Change Rule"
                                          value="7"
                                          sx={{
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: `${styles.app_color}`,
                                            padding: "0% 3%",
                                            textTransform: "none",
                                          }}
                                        />
                                      </TabList>
                                      {/* Flight information */}
                                      <TabPanel
                                        value="4"
                                        className="dialog-center"
                                      >
                                        <Grid
                                          container
                                          direction={"column"}
                                          rowSpacing={4}
                                        >
                                          {panels.map((flight, index) => {
                                            const G_time = flight.GroundTime;
                                            const layover_time = `${Math.floor(
                                              G_time / 60
                                            )
                                              .toString()
                                              .padStart(2, "0")}h ${(
                                              G_time % 60
                                            )
                                              .toString()
                                              .padStart(2, "0")}mins`;
                                            const duration = flight.Duration;
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
                                              flight.Origin.DepTime
                                            );
                                            const arrseg_time = helperFunctions.get_time(
                                              flight.Destination.ArrTime
                                            );
                                            const dest_loc =
                                              flight.Destination.Airport
                                                .CityName;
                                            const origin_loc =
                                              flight.Origin.Airport.CityName;
                                            const plane_name =
                                              flight.Airline.AirlineName;
                                            const airlinecode =
                                              flight.Airline.AirlineCode;
                                            const flight_number = `${flight.Airline.AirlineCode}-${flight.Airline.FlightNumber}`;
                                            // console.log(flight,"each")
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
                                                        sx={{
                                                          columnSpacing: {
                                                            md: "3.5",
                                                            xs: "0.3",
                                                          },
                                                        }}
                                                      >
                                                        <Grid item xs={2}>
                                                          <img
                                                            src={`${envdata.flagsbaseurl}/${airlinecode}.png`}
                                                            alt="indigo"
                                                            width="20rem"
                                                          />
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          xs={0}
                                                          md={8}
                                                        >
                                                          <Grid
                                                            container
                                                            rowSpacing={0.5}
                                                          >
                                                            <Grid
                                                              item
                                                              className={
                                                                aftersearchflight.airlinename
                                                              }
                                                            >
                                                              <span>
                                                                {plane_name}
                                                              </span>
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                              <span
                                                                className={
                                                                  aftersearchflight.flightlayofftext
                                                                }
                                                              >
                                                                {flight_number}
                                                              </span>
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                      </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={10}>
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
                                                            direction={"column"}
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
                                                            <Grid item mt={1.2}>
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
                                                              mt={2}
                                                            >
                                                              <img
                                                                src={plane}
                                                                alt="plane"
                                                                className="muiti_flight_size_xs"
                                                              />
                                                            </Grid>
                                                            <Grid
                                                              item
                                                              xs={6}
                                                              textAlign={
                                                                "center"
                                                              }
                                                              alignItems={
                                                                "center"
                                                              }
                                                            >
                                                              <Stack>
                                                                <span
                                                                  className={
                                                                    aftersearchflight.flightlayofftext
                                                                  }
                                                                >
                                                                  {cal_duration}
                                                                </span>
                                                                <span>
                                                                  <img
                                                                    src={
                                                                      nonstop
                                                                    }
                                                                    alt="nonstop"
                                                                    className="muiti_city_line_image"
                                                                  />
                                                                </span>
                                                                <span
                                                                  className={
                                                                    aftersearchflight.flightlayofftext
                                                                  }
                                                                >
                                                                  {stops === 0
                                                                    ? "non-stop"
                                                                    : `${stops} Stop`}
                                                                </span>
                                                              </Stack>
                                                            </Grid>
                                                            <Grid
                                                              item
                                                              xs={3}
                                                              textAlign={
                                                                "right"
                                                              }
                                                              mt={2}
                                                            >
                                                              <img
                                                                src={plane}
                                                                alt="plane"
                                                                className="muiti_flight_size_xs"
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
                                                            contianer
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
                                                            <Grid item mt={1.4}>
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
                                                        {/* by naveen */}
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
                                                                    {origin_loc}
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
                                                        {/* ended here */}
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                </Grid>
                                              </>
                                            );
                                          })}

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
                                                    rowSpacing={2}
                                                  >
                                                    <Grid item>
                                                      <span
                                                        style={{ fontSize: "14px" }}
                                                      >
                                                        8:45 PM
                                                      </span>
                                                    </Grid>
                                                    <Grid item>
                                                      <span
                                                        className={
                                                          aftersearchflight.flightlayofftext
                                                        }
                                                      >
                                                        Visakapatnam
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
                                                  >
                                                    <Grid item mr={2}>
                                                      <span
                                                        style={{ fontSize: "14px" }}
                                                      >
                                                        9:30 PM
                                                      </span>
                                                    </Grid>
                                                    <Grid item>
                                                      <span
                                                        className={
                                                          aftersearchflight.flightlayofftext
                                                        }
                                                      >
                                                        Chennai
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
                                      <TabPanel
                                        value="5"
                                        className="dialog-center"
                                        sx={{
                                          padding: { md: "24px", xs: "0px" },
                                        }}
                                      >
                                        <Grid
                                          container
                                          direction="column"
                                          spacing={0.8}
                                          className={aftersearchflight.faretxt}
                                        >
                                          {innerfarebreakdown.map(
                                            (farebrkdwn, index) => {
                                              // console.log(farebrkdwn,"brkdwn")
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
                                              //  console.log(totalbasefare,"tpta;")
                                              totalbasefare = basefare;
                                              totaltax = farebrkdwn.Tax;
                                              return (
                                                <Grid item>
                                                  <Grid
                                                    container
                                                    className="space-between"
                                                  >
                                                    <Grid item xs={6}>
                                                      {passenger}
                                                    </Grid>
                                                    <Grid item xs={4}>
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
                                              className="space-between"
                                            >
                                              <Grid item xs={6}>
                                                Total (BaseFare)
                                              </Grid>
                                              <Grid item xs={4}>
                                                &#8377; {totalbasefare}{" "}
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Grid
                                              container
                                              className="space-between"
                                            >
                                              <Grid item xs={6}>
                                                Total Tax
                                              </Grid>
                                              <Grid item xs={4}>
                                                &#8377; {totaltax}{" "}
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Grid
                                              container
                                              className="space-between"
                                            >
                                              <Grid item xs={6}>
                                                Other Charges
                                              </Grid>
                                              <Grid item xs={4}>
                                                &#8377; {oc}{" "}
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Grid
                                              container
                                              className="space-between"
                                            >
                                              <Grid item xs={6}>
                                                Total (Fee & Surcharge)
                                              </Grid>
                                              <Grid item xs={4}>
                                                &#8377;
                                                {totalbasefare + totaltax + oc}{" "}
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
                                          {panels.map((baggage, index) => {
                                            const cabinbaggage = `${
                                              baggage.CabinBaggage ?? 0
                                            }`;
                                            const check_inbaggage = `${baggage.Baggage}`;
                                            const {
                                              AirlineName: flightname,
                                              AirlineCode: code,
                                              FlightNumber: number,
                                            } = baggage.Airline;
                                            const flightnum = `${flightname} ${code} ${number}`;
                                            return (
                                              <Grid item>
                                                <Grid
                                                  container
                                                  className={`${aftersearchflight.faretxt} accordian_font_style_flights`}
                                                >
                                                  <Grid
                                                    item
                                                    md={4}
                                                    xs={6}
                                                    sx={{
                                                      marginTop: {
                                                        md: "0%",
                                                        xs: "-3%",
                                                      },
                                                    }}
                                                  >
                                                    <span>
                                                      <img
                                                        width="20rem"
                                                        src={`${envdata.flagsbaseurl}/${code}.png`}
                                                        alt="indigo"
                                                      />{" "}
                                                      {flightnum}
                                                    </span>
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
                                          })}

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
                                              sx={{ fontSize: "14px" }}
                                              className="accordian_font_style_flights"
                                            >
                                              <Grid item md={4} xs={4}>
                                                Cancellation Time
                                              </Grid>
                                              <Grid item md={4} xs={5}>
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
                                              let details;
                                              let units;
                                              let cancel_percent;
                                              if (
                                                rules.Type === "Cancellation"
                                              ) {
                                                // console.log("cancellation")
                                                from = rules?.From ?? "";
                                                to = rules?.To ?? "";
                                                details = rules?.Details ?? "";
                                                units = rules?.Unit ?? "";
                                                cancel_percent =
                                                  helperFunctions.cancelltion_percentage(
                                                    fare,
                                                    details
                                                  );
                                                // console.log(details)
                                              }
                                              let cancellation_time = `${from}-${to}${units}`;
                                              return (
                                                rules.Type ==
                                                  "Cancellation" && (
                                                  <Grid item>
                                                    <Grid
                                                      // rowGap={1}
                                                      container
                                                      className={
                                                        aftersearchflight.faretxt
                                                      }
                                                      sx={{ fontSize: "14px" }}
                                                    >
                                                      <Grid item xs={4}>
                                                        <span>
                                                          {cancellation_time}
                                                        </span>
                                                      </Grid>
                                                      <Grid item xs={4}>
                                                        {`${cancel_percent}%`}
                                                      </Grid>
                                                      <Grid item xs={4}>
                                                        {details}
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
                                          <h4 style={{ color: `${styles.app_color}` }}>
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
                                                    to = reissue.To ?? "";
                                                    units = reissue.Unit ?? "";
                                                    details =
                                                      reissue.Details ?? "";
                                                  }
                                                  const reissue_time = `Before${from} to ${to} ${units}`;
                                                  return (
                                                    reissue.Type ===
                                                      "Reissue" && (
                                                      <Grid item>
                                                        <Grid container>
                                                          <Grid item xs={5}>
                                                            {reissue_time}
                                                          </Grid>
                                                          <Grid item xs={4}>
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
                                          <h4 style={{ color: `${styles.app_color}` }}>
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
                                  </Stack>
                                </TabPanel>
                              );
                            })}
                          </TabContext>
                        </Grid>
                        <Grid item textAlign={"right"}>
                          <button
                            style={{
                              border: "none",
                              color: "#fff",
                              fontSize: "14px",
                              padding: "1rem 2.6rem 1rem 2rem",
                              backgroundColor: `${styles.app_color}`,
                              borderBottomRightRadius: "0.8rem",
                              fontWeight: "bold",
                              fontSize: "0.8rem",
                            }}
                            onClick={() =>
                              select_flight({
                                [item.minarr.ResultIndex]:
                                  item.minarr.Segments[0][0].Airline
                                    .AirlineName,
                                airline_code: airlinecode,
                              })
                            }
                          >
                            Book Now
                          </button>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  {/* <Grid item md={expand===index?0:9} textAlign={'right'}>
                          {expand!==index && <button className={multicity.booknow} onClick={()=>select_flight({
                                      [item.minarr.ResultIndex]:
                                        item.minarr.Segments[0][0].Airline
                                          .AirlineName,
                                          airline_code:airlinecode
                                    })}>Book now</button>}
                    </Grid> */}
                </Grid>
              </Paper>
            );
          })
        ) : (
          <div>Flights not found.</div>
        )}
      </Paper>
    </div>
  );
});

export default Roundtripin;
