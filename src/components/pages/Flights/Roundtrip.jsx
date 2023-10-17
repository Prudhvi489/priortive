import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Stack,
  Divider,
  IconButton,
  Tab,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Filters from "./Filters";
import FlightsSearch from "./FlightsSearch";
import {
  Roundtripstyles,
  aftersearchflights,
  gomainpage,
} from "../../../assets/styles/Flights";
import indigo from "../../../assets/images/indigo.svg";
import plane from "../../../assets/images/plane.svg";
import onestop from "../../../assets/images/onestop.svg";
import bluerectangle from "../../../assets/images/bluerectangle.svg";
import multideparture from "../../../assets/images/multideparture.svg";
import multireturn from "../../../assets/images/multireturn.svg";
import downarrow from "../../../assets/images/downarrow.svg";
import uparrow from "../../../assets/images/uparrow.svg";
import whitearrow from "../../../assets/images/whitearrow.svg";
import { Slide } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import nonstop from "../../../assets/images/nonstop.svg";
import BookNow from "../../modals/Flightmodals/BookNow";
import { useSelector } from "react-redux";
import Roundtripin from "./Roundtripin";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import backIcon from "../../../assets/images/backIcon.png";
import editIcon from "../../../assets/images/editIcon.svg";
import filterIcon from "../../../assets/images/filterIcon.svg";
import Minifilter from "../../../parts/Minifilter.jsx";
import helperFunctions from "../../../helpers/helperFunctions";
import { envdata } from "../../Envexports";
import {styles} from '../../../assets/styles/Styles_export'
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const Roundtrip = () => {
  // navigate
  const navigate = useNavigate();
  // css styles initialization
  const roundtrip = Roundtripstyles();
  const aftersearchflight = aftersearchflights();
  const classes = gomainpage();
  const flightsdata = useSelector((state) => state.flightsearches.Flightsdata);
  const flight_data_len = flightsdata.flightsdata.length;
  let outbound_flights = flightsdata?.flightsdata[0];
  let inbound_flights = flightsdata?.flightsdata[1];
  const [outboundflights, setOutboundflights] = useState([]);
  const [inboundflights, setInboundflights] = useState([]);
  const [roundtrip_flight, setRoundtrip_flight] = useState({
    outbound: "",
    inbound: "",
  });
  // const get_time = (time) => {
  //   const date = new Date(time);
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   const mod_time = `${hours.toString().padStart(2, "0")}:${minutes
  //     .toString()
  //     .padStart(2, "0")}`;
  //   return mod_time;
  // };
  const get_date = (dep_date) => {
    const date = new Date(dep_date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    // console.log(flightsdata.flightsdata,"from redux in roundtrip")
    if (flightsdata.flightsdata.length === 2) {
      setOutboundflights(flightsdata?.flightsdata[0]);
      setInboundflights(flightsdata?.flightsdata[1]);
      const {
        ResultIndex: res_index,
        Fare: innerfare,
        Segments: [innersegments],
      } = flightsdata?.flightsdata[0][0].minarr;
      const {
        ResultIndex: innerres_index,
        Fare: inboundfare,
        Segments: [inboundsegment],
      } = flightsdata?.flightsdata[1][0].minarr;
      setRoundtrip_flight((prev) => ({
        ...prev,
        inbound: {
          airline_code: inboundsegment.at(0).Airline.AirlineCode,
          airline: inboundsegment.at(0).Airline.AirlineName,
          fare: inboundfare?.PublishedFare,
          departure:helperFunctions.get_time(inboundsegment.at(0).Origin.DepTime),
          arrival: helperFunctions.get_time(inboundsegment.at(-1).Destination.ArrTime),
          date: get_date(inboundsegment.at(0).Origin.DepTime),
        },
        outbound: {
          airline_code: innersegments.at(0).Airline.AirlineCode,
          airline: innersegments.at(0).Airline.AirlineName,
          fare: innerfare?.PublishedFare,
          departure:helperFunctions.get_time(innersegments.at(0).Origin.DepTime),
          arrival: helperFunctions.get_time(innersegments.at(0).Destination.ArrTime),
          date: get_date(innersegments.at(0).Origin.DepTime),
        },
      }));
      setPackages([
        {
          [res_index]: innersegments[0].Airline.AirlineName,
          airline_code: innersegments.at(0).Airline.AirlineCode,
        },
        {
          [innerres_index]: inboundsegment[0].Airline.AirlineName,
          airline_code: inboundsegment.at(0).Airline.AirlineCode,
        },
      ]);
    } else {
    }
  }, [flightsdata]);
  const [roundtripinfo, setRoundtripinfo] = useState(false);
  const [value1, setValue1] = useState("4");
  const [detailstab, setDetailstab] = useState("1");
  const [inbound_details_tab, setInbound_details_tab] = useState("1");
  const [roundtrippackage, setRoundtrippackage] = useState(false);
  const [expand, setExpand] = useState(false);
  const [inboundexpand, setInboundexpand] = useState(false);
  const [outbound_highest_price, setOutbound_highest_price] = useState(false);
  const [inbound_highest_price, setInbound_highest_price] = useState(false);
  const roundtrip_instance = useRef(null);
  const outboundaccordion = (index) => (event, isExpanded) => {
    // alert("acccordion")
    setExpand(isExpanded ? index : false);
  };

  const inboundaccordion = (index) => (event, isExpanded) => {
    setInboundexpand(isExpanded ? index : false);
  };
  // Bottom paper states updation
  // 1=>inbound
  // 2=>outbound
  const paper_state = (flight, type, resultindex, selective_index) => {
    console.log(resultindex);
    const id = Object.keys(resultindex)[0];
    document.getElementById(id).style.border = `2px solid ${styles.app_color}`;
    const newpackage = [...packages];
    // alert(resultindex)
    if (type === 1) {
      // alert("inbound")
      newpackage[1] = resultindex;
      setPackages(newpackage);
      setRoundtrip_flight((prev) => ({
        ...prev,
        inbound: {
          airline_code: flight?.airline_code,
          airline: flight?.airline,
          departure: flight?.departure,
          arrival: flight?.arrival,
          date: get_date(flight?.date),
          fare: flight?.pub_fare,
        },
      }));
      inboundflights.map((flight, index) => {
        if (index !== selective_index) {
          let result = flight.minarr.ResultIndex;
          document.getElementById(result).removeAttribute("style");
        }
      });
    } else if (type === 2) {
      // alert("outbound")
      newpackage[0] = resultindex;
      setPackages(newpackage);
      setRoundtrip_flight((prev) => ({
        ...prev,
        outbound: {
          airline_code: flight?.airline_code,
          airline: flight?.airline,
          departure: flight?.departure,
          arrival: flight?.arrival,
          date: get_date(flight?.date),
          fare: flight?.pub_fare,
        },
      }));
      outboundflights.map((flight, index) => {
        if (index !== selective_index) {
          let result = flight.minarr.ResultIndex;
          document.getElementById(result).removeAttribute("style");
        }
      });
    }
  };
  const handlechange1 = (event, newValue1) => {
    setValue1(newValue1);
  };
  const handledetailstab = (event, tabvalue) => {
    setDetailstab(tabvalue);
  };
  const handle_inboundtab = (event, tabvalue) => {
    setInbound_details_tab(tabvalue);
  };
  const bookroundtrip = () => {
    setRoundtrippackage(true);
  };
  // filtering the inbound data using callback domestic flights
  const Apply_filters = async (data, type) => {
    if (flightsdata.flightsdata.length === 2) {
      const except_flights = data.pop();
      const airline_names = data;
      // console.log(data,"filtersapplied")
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
      let flights;

      if (type === 2) {
        setOutbound_highest_price(true);
        flights = [...outbound_flights];
      } else if (type === 1) {
        setInbound_highest_price(true);
        flights = [...inbound_flights];
      }
      // airlines filter
      if (airline_names.length > 0) {
        flights = await flights.filter((flight) =>
          airline_names.includes(
            flight.minarr.Segments[0][0].Airline.AirlineName
          )
        );
      }
      // stops filter
      if (stops.length > 0) {
        flights = await flights.filter((flight) => {
          const flight_stops =
            flight.minarr.Segments[0].length > 2
              ? 3
              : flight.minarr.Segments[0].length;
          return stops.includes(flight_stops);
        });
      }
      // departure filters
      if (departures.length > 0) {
        flights = await flights.filter((flight) => {
          const date = new Date(flight.minarr.Segments[0][0].Origin.DepTime);
          const hour = date.getHours();
          let dep =
            hour < 6
              ? 1
              : hour >= 6 && hour < 12
              ? 2
              : hour >= 12 && hour < 18
              ? 3
              : hour >= 18 && hour <= 23 && 4;
          return departures.includes(dep);
        });
      }
      if (except_flights.low_price) {
        let low_arr = [...flights];
        low_arr.sort(
          (a, b) => a.minarr.Fare.PublishedFare - b.minarr.Fare.PublishedFare
        );
        flights = [...low_arr];
      }
      if (except_flights.high_price) {
        let sort_Arr = [...flights];
        sort_Arr.sort(
          (a, b) => b.minarr.Fare.PublishedFare - a.minarr.Fare.PublishedFare
        );
        flights = [...sort_Arr];
      }
      //  console.log(wholeflights)
      if (type === 2) {
        // alert("outbound")
        setOutboundflights(flights);
      } else if (type === 1) {
        // alert("inbound")
        setInboundflights(flights);
      }
    } else {
      console.log(roundtrip_instance, "instance");
      roundtrip_instance.current.Apply_filters(data);
    }
  };
  // filtering  data for international case
  // const Apply_filters=async(data)=>{
  //   //  console.log(data)
  //    const except_flights=data.pop()
  //    const airline_names=data
  //    // console.log(data,"filtersapplied")
  //    let wholeflightss
  //    let stops=[]
  //    if(except_flights.one_stop){
  //      stops.push(2)
  //    }
  //    if(except_flights.non_stop){
  //      stops.push(1)
  //    }
  //    if(except_flights.multi_stop){
  //      stops.push(3)
  //    }
  //    let departures=[]
  //    if(except_flights.morning){
  //      departures.push(1)
  //    }
  //    if(except_flights.afternoon){
  //      departures.push(2)
  //    }
  //    if(except_flights.evening){
  //      departures.push(3)
  //    }
  //    if(except_flights.night){
  //      departures.push(4)
  //    }
  //   //  airlines filter
  //   if(airline_names.length>0){
  //     console.log(airline_names,"selected airlines")
  //     console.log(total_multicity,"totalflights")
  //     total_multicity=await total_multicity.filter((flight)=>flight.Segments.flat().some(item=>airline_names.includes(item.Airline.AirlineName)))
  //     // total_multicity=await total_multicity.filter((flight)=>flight.Segments.flat().filter(item=>airline_names.includes(item.Airline.AirlineName)))

  //   }
  //   // stops filters
  //   if(stops.length>0){
  //     console.log(total_multicity)
  //     total_multicity=await total_multicity.filter((flight)=>
  //       flight.Segments.some((segments)=>{
  //         const seg_len=segments.length>2?3:segments.length;
  //         return stops.includes(seg_len)
  //       })
  //     )
  //   }
  //   // departure filters
  //   if(departures.length>0){
  //     total_multicity=total_multicity.filter(flight=>{
  //       const date = new Date(flight.Segments[0][0].Origin.DepTime)
  //           const hour = date.getHours();
  //           let dep =hour<6?1:hour>=6&&hour<12?2:hour>=12&&hour<18?3:hour>=18&&hour<=23&&4;
  //           // if(departures.includes(dep)){
  //           //   return flight;
  //           // }
  //           return departures.includes(dep)
  //     })
  //   }
  //   // lowest price filter
  //   if(except_flights.low_price){
  //     let low_arr=[...total_multicity]
  //     low_arr.sort((a,b)=>a.Fare.PublishedFare-b.Fare.PublishedFare)
  //     total_multicity=[...low_arr]
  //   }
  //   // Highest price filter
  //   if(except_flights.high_price){
  //     let sort_Arr=[...total_multicity]
  //     sort_Arr.sort((a,b)=>b.Fare.PublishedFare-a.Fare.PublishedFare)//b.Fare.PublishedFare-a.minarr.Fare.PublishedFare
  //    total_multicity=[...sort_Arr]
  //   }

  //   // console.log(stops)
  //   console.log(total_multicity.length,"setuubg")
  //   setAllflights(total_multicity)
  //   }
  // naveen started here
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
  // ended here
  // const origin =
  //   allflights.length > 0 &&
  //   allflights[0].minarr.Segments[0].at(0).Origin.Airport.CityName;
  // const destination =
  //   allflights.length > 0 &&
  //   allflights[0].minarr.Segments[0].at(-1).Destination.Airport.CityName;
  const origin =
    inboundflights.length > 0 &&
    inboundflights[0].minarr.Segments[0].at(0).Origin.Airport.CityName;
  const destination =
    inboundflights.length > 0 &&
    inboundflights[0].minarr.Segments[0].at(-1).Destination.Airport.CityName;
  return (
    <div>
      <BookNow
        open={roundtrippackage}
        onclose={() => setRoundtrippackage(false)}
        package_selection={packages}
      />
      {/* by naveen */}
      {/* moblie responsive header for Flights search */}
      <Container maxWidth="xl" sx={{ display: { xs: "block", md: "none" } }}>
        {/* search grid */}
        <Minifilter
          filter={Apply_filters}
          origin={origin}
          destination={destination}
          way="Round Trip"
        />
      </Container>
      {/* ended here */}
      <Grid container direction="column" spacing={3}>
        <Grid item md={12} sx={{ display: { md: "block", xs: "none" } }}>
          <FlightsSearch />
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item md={4} sx={{ display: { md: "block", xs: "none" } }}>
                <Filters filter={Apply_filters} />
              </Grid>
              {flight_data_len === 2 ? (
                <Grid item md={8} xs={12} sx={{ width: "100%" }}>
                  <Grid
                    container
                    spacing={2}
                    sx={{ marginTop: { md: "-16px", xs: "0px" } }}
                  >
                    {/* outbound */}
                    {/* className="background_transparent" */}
                    <Grid item lg={6} md={6} xs={6}>
                      <Paper
                        sx={{
                          borderRadius: "1rem",
                          padding: { md: "1.5rem", xs: "0px" },
                          backgroundColor: { md: "white", xs: "transparent" },
                        }}
                        elevation={{ xs: 0, md: 1 }}
                      >
                        <Grid container direction="column" spacing={1}>
                          <Grid item>
                            <span className={roundtrip.departure}>
                              {`${destination} - ${origin}`}
                            </span>
                          </Grid>
                          <Grid item>
                            <span className={roundtrip.font}>Depart</span>
                          </Grid>
                          <Grid item>
                            <Divider
                              md={6}
                              sx={{ display: { md: "block", xs: "none" } }}
                            />
                          </Grid>
                          <Grid item sx={{ maxWidth: "100% !important" }}>
                            {outboundflights.map((flight, index) => {
                              // console.log(flight.minarr.hasOwnProperty("MiniFareRules"))
                              // destructuring the object for fare and segments
                              const result_index = flight.minarr.ResultIndex;
                              const minifare =
                                flight.minarr.MiniFareRules ?? [];
                              const {
                                Fare: innerfare,
                                FareBreakdown: innerfarebreakdown,
                                Segments: [innersegments],
                              } = flight?.minarr;
                              //  console.log(minifare)
                              const airlinecode = flight.minarr?.AirlineCode;
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
                              const fare = innerfare?.PublishedFare;
                              const oc = innerfare?.OtherCharges;
                              let totalbasefare = 0;
                              let toataltax = 0;
                              const dep_time = helperFunctions.get_time(
                                innersegments.at(0).Origin.DepTime
                              );
                              const arr_time = helperFunctions.get_time(
                                innersegments.at(-1).Destination.ArrTime
                              );
                              return (
                                <Paper
                                  elevation={3}
                                  mt={1}
                                  className={roundtrip.paper}
                                  style={{
                                    border: index === 0 && `2px solid ${styles.app_color}`,
                                    marginTop: "1rem",
                                    marginBottom: "1rem",
                                  }}
                                  id={result_index}
                                  onClick={() =>
                                    paper_state(
                                      {
                                        airline_code: airlinecode,
                                        airline: airlinename,
                                        departure: dep_time,
                                        arrival: arr_time,
                                        pub_fare: fare,
                                        date: innersegments.at(0).Origin
                                          .DepTime,
                                      },
                                      2,
                                      {
                                        [flight.minarr.ResultIndex]:
                                          flight.minarr.Segments[0][0].Airline
                                            .AirlineName,
                                        airline_code: airlinecode,
                                      },
                                      index
                                    )
                                  }
                                >
                                  <Container>
                                    <Grid
                                      container
                                      direction={"column"}
                                      sx={{
                                        marginTop: { md: "2rem", xs: "10px" },
                                      }}
                                    >
                                      <Grid
                                        item
                                        sx={{
                                          height: { md: "68px", xs: "38px" },
                                        }}
                                      >
                                        <Grid
                                          container
                                          className="space-between"
                                          mt={1.5}
                                        >
                                          <Grid item md={6} xs={6}>
                                            <Grid
                                              container
                                              spacing={{ xs: 0, md: 1 }}
                                              columnGap={{ xs: 2, md: 0 }}
                                            >
                                              <Grid
                                                item
                                                md={2}
                                                xs={2}
                                                sx={{
                                                  width: {
                                                    md: "40px",
                                                    xs: "10px",
                                                  },
                                                }}
                                              >
                                                <img
                                                  className="image_sm"
                                                  src={`${envdata.flagsbaseurl}/${airlinecode}.png`}
                                                  alt="indigo"
                                                  width="100%"
                                                />
                                              </Grid>
                                              <Grid
                                                className="after-search-text-size"
                                                item
                                                md={6}
                                                xs={6}
                                                alignContent="center"
                                              >
                                                <span>{airlinename}</span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item md={6} xs={6}>
                                            <Grid
                                              container
                                              direction={"column"}
                                              textAlign="right"
                                            >
                                              <Grid
                                                className="after-search-text-size"
                                                item
                                              >
                                                &#8377; {fare}
                                              </Grid>
                                              <Grid
                                                item
                                                sx={{
                                                  display: {
                                                    md: "block",
                                                    xs: "none",
                                                  },
                                                }}
                                              >
                                                <span
                                                  className={
                                                    roundtrip.departure
                                                  }
                                                >
                                                  +More Fare
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid container alignItems={"center"}>
                                          <Grid
                                            item
                                            md={2}
                                            xs={3}
                                            alignItems="center"
                                          >
                                            <img
                                              className="image-responsive"
                                              src={plane}
                                              alt="plane"
                                            />
                                          </Grid>
                                          <Grid item md={8} xs={6}>
                                            <Grid
                                              container
                                              direction={"column"}
                                              textAlign="center"
                                            >
                                              <Grid
                                                item
                                                className="after-search-text-size"
                                              >
                                                <span> {jrney_time}</span>
                                              </Grid>
                                              <Grid item>
                                                <img
                                                  className="image-responsive"
                                                  src={onestop}
                                                  alt="onestop"
                                                  width="100%"
                                                />
                                              </Grid>
                                              <Grid
                                                item
                                                className="after-search-text-size"
                                              >
                                                <span>
                                                  {" "}
                                                  {stops === 0
                                                    ? "non-Stop"
                                                    : `${stops} Stop`}
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item md={2} xs={3}>
                                            <img
                                              className="image-responsive"
                                              src={plane}
                                              alt="plane"
                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid
                                          container
                                          className="space-between"
                                        >
                                          <Grid item md={6}>
                                            <Grid
                                              container
                                              direction={"column"}
                                            >
                                              <Grid item>
                                                <span
                                                  className={clsx(
                                                    roundtrip.font1,
                                                    "after-search-text-size"
                                                  )}
                                                >
                                                  {dep_time}
                                                </span>
                                              </Grid>
                                              <Grid
                                                item
                                                sx={{
                                                  display: {
                                                    md: "block",
                                                    xs: "none",
                                                  },
                                                }}
                                              >
                                                <span>{destination}</span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item md={6} textAlign="right">
                                            <Grid
                                              container
                                              direction={"column"}
                                            >
                                              <Grid item>
                                                <span
                                                  className={clsx(
                                                    roundtrip.font1,
                                                    "after-search-text-size"
                                                  )}
                                                >
                                                  {arr_time}
                                                </span>
                                              </Grid>
                                              <Grid
                                                item
                                                sx={{
                                                  display: {
                                                    md: "block",
                                                    xs: "none",
                                                  },
                                                }}
                                              >
                                                <span>{origin}</span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        sx={{
                                          display: { md: "block", xs: "none" },
                                        }}
                                      >
                                        <div
                                          className={roundtrip.offerbackground}
                                        >
                                          {" "}
                                          {/* <span>
                                            <img
                                              src={bluerectangle}
                                              alt="bluerectangle"
                                              width="3.5%"
                                              height="3.5%"
                                            />
                                          </span>{" "}
                                          <span className={roundtrip.font2}>
                                            Use MMTOFFER and get FLAT Rs. 500
                                            Instant discount on this flight
                                          </span> */}
                                        </div>
                                      </Grid>
                                      <Grid item>
                                        <Divider />
                                      </Grid>
                                    </Grid>
                                  </Container>
                                  {/* textAlign={"right"} */}
                                  <Grid item>
                                    {/* <button
                                style={{
                                  border: "none",
                                  backgroundColor: "#FF4949",
                                  padding: "1rem 2rem",
                                  borderBottomRightRadius: "1rem",
                                  color: "#ffff",
                                  fontSize: "14px",
                                }}
                              >
                                Cheapest
                              </button> */}
                                    <Accordion
                                      expanded={expand === index}
                                      md={6}
                                      xs={6}
                                      onChange={outboundaccordion(index)}
                                      sx={{
                                        display: { md: "block", xs: "none" },
                                      }}
                                    >
                                      <AccordionSummary>
                                        <Grid container>
                                          <Grid item md={6}>
                                            <Stack
                                              direction={"row"}
                                              spacing={1}
                                            >
                                              <span
                                                className={
                                                  roundtrip.flightdetails
                                                }
                                              >
                                                Flight Details
                                              </span>
                                              <img
                                                src={
                                                  expand === index
                                                    ? uparrow
                                                    : downarrow
                                                }
                                                alt="arrow"
                                              />
                                            </Stack>
                                          </Grid>
                                          {((!outbound_highest_price &&
                                            index === 0) ||
                                            (outbound_highest_price &&
                                              index ===
                                                outboundflights.length -
                                                  1)) && (
                                            <Grid
                                              item
                                              md={6}
                                              textAlign="right"
                                              className={roundtrip.cheapest}
                                            >
                                              Cheapest
                                            </Grid>
                                          )}
                                        </Grid>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <TabContext value={detailstab}>
                                          <TabList
                                            onChange={handledetailstab}
                                            className={roundtrip.tabs}
                                            sx={{
                                              backgroundColor:
                                                "#DFF3FF!important",
                                              minHeight: "2rem",
                                              height: "3rem",
                                              borderRadius: "0.5rem",
                                            }}
                                            variant="scrollable"
                                            orientation={{
                                              xs: "horizontal",
                                              md: "none",
                                            }}
                                            scrollButtons={"off"}
                                            id={"tablistspace"}
                                          >
                                            <Tab
                                              value="1"
                                              className={roundtrip.tab}
                                              disableRipple
                                              sx={{ color: styles.app_color }}
                                              label="Flights Information"
                                            />
                                            <Tab
                                              value="2"
                                              className={roundtrip.tab}
                                              disableRipple
                                              sx={{ color: styles.app_color }}
                                              label="Fare Details"
                                            />
                                            <Tab
                                              value="3"
                                              className={roundtrip.tab}
                                              disableRipple
                                              sx={{ color: styles.app_color }}
                                              label="Baggage Information"
                                            />
                                            <Tab
                                              value="4"
                                              className={roundtrip.tab}
                                              disableRipple
                                              sx={{ color: styles.app_color }}
                                              label="Cancellation & change Rule"
                                            />
                                          </TabList>
                                          <TabPanel
                                            value="1"
                                            className="cardpadding"
                                          >
                                            <Grid
                                              container
                                              direction="column"
                                              rowSpacing={2}
                                            >
                                              {innersegments.map(
                                                (segment, index) => {
                                                  const G_time =
                                                    segment.GroundTime;
                                                  const layover_time = `${Math.floor(
                                                    G_time / 60
                                                  )
                                                    .toString()
                                                    .padStart(2, "0")}h ${(
                                                    G_time % 60
                                                  )
                                                    .toString()
                                                    .padStart(2, "0")}mins`;
                                                  const duration =
                                                    segment.Duration;
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
                                                    segment.Origin.Airport
                                                      .CityName;
                                                  const flight_number = `${segment.Airline.AirlineCode}-${segment.Airline.FlightNumber}`;
                                                  return (
                                                    <>
                                                      {G_time > 0 && (
                                                        <Grid item>
                                                          <Divider
                                                            className={
                                                              roundtrip.flighttxt
                                                            }
                                                          >
                                                            Layover:
                                                            {layover_time}
                                                          </Divider>
                                                        </Grid>
                                                      )}
                                                      <Grid
                                                        container
                                                        item
                                                        spacing={1}
                                                      >
                                                        <Grid item md={1}>
                                                          <img
                                                            src={`${envdata.flagsbaseurl}/${airlinecode}.png`}
                                                            width="100%"
                                                            alt="indigo"
                                                          />
                                                        </Grid>
                                                        <Grid item md={3}>
                                                          <Stack>
                                                            <span
                                                              className={
                                                                roundtrip.flighttxt
                                                              }
                                                            >
                                                              {airlinename}
                                                            </span>
                                                            <span
                                                              className={
                                                                roundtrip.flightnumber
                                                              }
                                                            >
                                                              {flight_number}
                                                            </span>
                                                          </Stack>
                                                        </Grid>
                                                      </Grid>
                                                      <Grid container item>
                                                        <Grid
                                                          item
                                                          md={2.4}
                                                          mt={0.3}
                                                        >
                                                          <img
                                                            src={plane}
                                                            alt="plane"
                                                          />
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          md={7.6}
                                                          textAlign="center"
                                                        >
                                                          <Stack>
                                                            <span
                                                              className={
                                                                roundtrip.flightnumber
                                                              }
                                                            >
                                                              {cal_duration}
                                                            </span>
                                                            <span
                                                              style={{
                                                                border:
                                                                 `1px  dashed  ${styles.app_color}`,
                                                              }}
                                                            ></span>
                                                          </Stack>
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          md={2}
                                                          mt={0.5}
                                                        >
                                                          <img
                                                            sx={{
                                                              width: "20px",
                                                            }}
                                                            src={plane}
                                                            alt="plane"
                                                          />
                                                        </Grid>
                                                      </Grid>
                                                      <Grid container item>
                                                        <Grid item md={6}>
                                                          <Stack>
                                                            <span
                                                              className={
                                                                roundtrip.flighttxt
                                                              }
                                                            >
                                                              {depseg_time}
                                                            </span>
                                                            <span
                                                              className={
                                                                roundtrip.flightnumber
                                                              }
                                                            >
                                                              {origin_loc}
                                                            </span>
                                                          </Stack>
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          md={6}
                                                          textAlign={"right"}
                                                        >
                                                          <Stack>
                                                            <span
                                                              className={
                                                                roundtrip.flighttxt
                                                              }
                                                            >
                                                              {arrseg_time}
                                                            </span>
                                                            <span
                                                              className={
                                                                roundtrip.flightnumber
                                                              }
                                                            >
                                                              {dest_loc}
                                                            </span>
                                                          </Stack>
                                                        </Grid>
                                                      </Grid>
                                                    </>
                                                  );
                                                }
                                              )}

                                              {/* <Grid container item spacing={1}>
                                            <Grid item md={1}><img src={indigo} alt="indigo"/></Grid>
                                            <Grid item md={3}>
                                              <Stack>
                                                <span className={roundtrip.flighttxt}>IndiGo</span>
                                                <span className={roundtrip.flightnumber}>IN 3678</span>
                                              </Stack>
                                            </Grid>
                                        </Grid>
                                        <Grid container item >
                                          <Grid item md={2.4} mt={0.3}><img src={plane} alt="plane"/></Grid>
                                          <Grid item md={7.6} textAlign="center">
                                            <Stack>
                                              <span className={roundtrip.flightnumber}>00h 45m</span>
                                              <span style={{border:'1px dashed #003556'}}></span>
                                            </Stack>
                                          </Grid>
                                          <Grid item md={2} mt={0.5}><img src={plane} alt="plane"/></Grid>
                                        </Grid>
                                        <Grid container item>
                                          <Grid item md={6}>
                                            <Stack>
                                              <span className={roundtrip.flighttxt}>05:30 PM</span>
                                              <span className={roundtrip.flightnumber}>New Delhi</span>
                                            </Stack>
                                          </Grid>
                                          <Grid item md={6} textAlign={'right'}>
                                            <Stack>
                                              <span className={roundtrip.flighttxt}>09:30 PM</span>
                                              <span className={roundtrip.flightnumber}>Visakapatnam</span>
                                            </Stack>
                                          </Grid>
                                        </Grid> */}
                                            </Grid>
                                          </TabPanel>
                                          <TabPanel
                                            value="2"
                                            className="cardpadding"
                                            sx={{ padding: "0.7rem 0rem" }}
                                          >
                                            <Stack
                                              spacing={1}
                                              className={roundtrip.faredetails}
                                            >
                                              {innerfarebreakdown.map(
                                                (farebrkdwn, index) => {
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
                                                    <Grid item container>
                                                      <Grid item md={10}>
                                                        {passenger}
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        md={2}
                                                        className="textend"
                                                      >
                                                        &#8377;{basefare}
                                                      </Grid>
                                                    </Grid>
                                                  );
                                                }
                                              )}

                                              <Grid item container>
                                                <Grid item md={10}>
                                                  Total(Base Fare)
                                                </Grid>
                                                <Grid
                                                  item
                                                  md={2}
                                                  className="textend"
                                                >
                                                  &#8377;{totalbasefare}
                                                </Grid>
                                              </Grid>
                                              <Grid item container>
                                                <Grid item md={10}>
                                                  Total Tax
                                                </Grid>
                                                <Grid
                                                  item
                                                  md={2}
                                                  className="textend"
                                                >
                                                  &#8377;{toataltax}
                                                </Grid>
                                              </Grid>
                                              <Grid item container>
                                                <Grid item md={10}>
                                                  Other Charges
                                                </Grid>
                                                <Grid
                                                  item
                                                  md={2}
                                                  className="textend"
                                                >
                                                  &#8377;{oc}
                                                </Grid>
                                              </Grid>
                                              <Grid item container>
                                                <Grid item md={10}>
                                                  Total (Fee & Surcharge)
                                                </Grid>
                                                <Grid
                                                  item
                                                  md={2}
                                                  className="textend"
                                                >
                                                  &#8377;
                                                  {totalbasefare +
                                                    toataltax +
                                                    oc}
                                                </Grid>
                                              </Grid>
                                            </Stack>
                                          </TabPanel>
                                          <TabPanel
                                            value="3"
                                            className="cardpadding"
                                            sx={{ padding: "0.7rem 0rem" }}
                                          >
                                            <Stack
                                              spacing={1.5}
                                              sx={{
                                                backgroundColor: "#EDF5FA",
                                                padding: "1rem",
                                                borderRadius: "0.5rem",
                                              }}
                                            >
                                              <span
                                                className={roundtrip.flighttxt}
                                              >
                                                Airline
                                              </span>
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
                                                    <>
                                                      <span
                                                        className={
                                                          roundtrip.faredetails
                                                        }
                                                      >
                                                        <img
                                                          src={`${envdata.flagsbaseurl}/${code}.png`}
                                                          width={"20rem"}
                                                          alt="indigo"
                                                        />{" "}
                                                        {flightnum}
                                                      </span>
                                                      <Grid
                                                        item
                                                        container
                                                        className={
                                                          roundtrip.faredetails
                                                        }
                                                      >
                                                        <Grid item md={6}>
                                                          Check-in-Baggage
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          md={6}
                                                          textAlign="right"
                                                        >
                                                          {check_inbaggage}
                                                        </Grid>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        container
                                                        className={
                                                          roundtrip.faredetails
                                                        }
                                                      >
                                                        <Grid item md={6}>
                                                          Cabbin-Baggage
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          md={6}
                                                          textAlign="right"
                                                        >
                                                          {cabinbaggage}
                                                        </Grid>
                                                      </Grid>
                                                    </>
                                                  );
                                                }
                                              )}

                                              {/* <span className={roundtrip.faredetails}><img src={indigo} alt="indigo"/> IndiGo, IN 3678</span>
                                        <Grid item container className={roundtrip.faredetails}>
                                          <Grid item md={6}>Check-in-Baggage</Grid>
                                          <Grid item md={6} textAlign="right">7kgs</Grid>
                                        </Grid>
                                        <Grid item container className={roundtrip.faredetails}>
                                          <Grid item md={6}>Cabbin-Baggage</Grid>
                                          <Grid item md={6} textAlign="right">15kgs</Grid>
                                        </Grid> */}
                                            </Stack>
                                            <Stack spacing={1.5} mt={2}>
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
                                                    Baggage information
                                                    mentioned above is obtained
                                                    from airline's reservation
                                                    system, gomytyrip does not
                                                    guarantee the accuracy of
                                                    this information.
                                                  </span>
                                                </Stack>
                                              </Grid>
                                              <Grid item>
                                                <Stack
                                                  direction={"row"}
                                                  spacing={1.5}
                                                >
                                                  <span
                                                    style={{
                                                      fontSize: "1.5rem",
                                                    }}
                                                  >
                                                    &#x2022;
                                                  </span>
                                                  <span>
                                                    The baggage allowance may
                                                    vary according to
                                                    stop-overs, connecting
                                                    flights. changes in airline
                                                    rules. etc.
                                                  </span>
                                                </Stack>
                                              </Grid>
                                            </Stack>
                                          </TabPanel>
                                          <TabPanel
                                            value="4"
                                            className="cardpadding"
                                            sx={{ padding: 0 }}
                                          >
                                            <Grid
                                              container
                                              direction={"column"}
                                              rowSpacing={1}
                                              className={
                                                aftersearchflight.baggage
                                              }
                                            >
                                              <Grid
                                                item
                                                className={
                                                  roundtrip.cancellationhead
                                                }
                                              >
                                                <Grid container>
                                                  <Grid item md={5}>
                                                    Cancellation Time
                                                  </Grid>
                                                  <Grid item md={4}>
                                                    Penalty%
                                                  </Grid>
                                                  <Grid item md={3}>
                                                    Penalty&#8377;
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              {/* {console.log(minifare)} */}
                                              {minifare.length > 0 &&
                                                minifare[0].map(
                                                  (rules, index) => {
                                                    // console.log(rules)
                                                    let from;
                                                    let to;
                                                    let details;
                                                    let units;
                                                    let cancel_percent;
                                                    if (
                                                      rules.Type ===
                                                      "Cancellation"
                                                    ) {
                                                      from = rules.From ?? "";
                                                      to = rules.To ?? "";
                                                      details =
                                                        rules.Details ?? "";
                                                      units = rules.Unit ?? "";
                                                      cancel_percent =
                                                        helperFunctions.cancelltion_percentage(
                                                          fare,
                                                          details
                                                        );
                                                    }
                                                    let cancellation_time = `${from}-${to}${units}`;

                                                    return (
                                                      rules.Type ===
                                                        "Cancellation" && (
                                                        <Grid item>
                                                          <Grid
                                                            container
                                                            className={
                                                              roundtrip.cancellationdata
                                                            }
                                                          >
                                                            <Grid item xs={5}>
                                                              <span>
                                                                {
                                                                  cancellation_time
                                                                }
                                                              </span>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                              {`${cancel_percent}%`}
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                              {details}
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                      )
                                                    );
                                                  }
                                                )}

                                              {/* <Grid item>
                                        <Grid
                                          container
                                          className={roundtrip.cancellationdata}
                                        >
                                          <Grid item xs={5}>
                                            <span>2hrs - 3days</span>
                                          </Grid>
                                          <Grid item xs={4}>
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
                                          className={roundtrip.cancellationdata}
                                        >
                                          <Grid item xs={5}>
                                            <span>3days - 365 days</span>
                                          </Grid>
                                          <Grid item xs={4}>
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
                                              <h5 style={{ color: styles.app_color }}>
                                                Reschedule Penalty Fees
                                              </h5>
                                              <Divider></Divider>

                                              <Grid
                                                container
                                                direction={"column"}
                                                mt={2}
                                                rowSpacing={1}
                                              >
                                                <Grid item>
                                                  <Grid
                                                    container
                                                    className={
                                                      roundtrip.cancellationdata
                                                    }
                                                  >
                                                    <Grid item xs={7}>
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
                                                        reissue.Type ===
                                                        "Reissue"
                                                      ) {
                                                        from =
                                                          reissue.From ?? "";
                                                        to = reissue.To ?? "";
                                                        units =
                                                          reissue.Unit ?? "";
                                                        details =
                                                          reissue.Details ?? "";
                                                      }
                                                      const reissue_time = `Before ${from} to ${to} ${units}`;
                                                      return (
                                                        reissue.Type ===
                                                          "Reissue" && (
                                                          <Grid item>
                                                            <Grid
                                                              container
                                                              className={
                                                                roundtrip.cancellationdata
                                                              }
                                                            >
                                                              <Grid item xs={7}>
                                                                {reissue_time}
                                                              </Grid>
                                                              <Grid item xs={4}>
                                                                &#8377;{" "}
                                                                {details}
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                        )
                                                      );
                                                    }
                                                  )}

                                                {/* <Grid item>
                                          <Grid container className={roundtrip.cancellationdata}>
                                            <Grid item xs={4}>
                                              EMT fees
                                            </Grid>
                                            <Grid item xs={8}>
                                              &#8377; 230
                                            </Grid>
                                          </Grid>
                                        </Grid> */}
                                              </Grid>
                                            </div>
                                            <div
                                              style={{ paddingLeft: "1rem" }}
                                            >
                                              <h5 style={{ color: styles.app_color }}>
                                                Terms & conditions
                                              </h5>
                                              <Divider></Divider>
                                              <Grid
                                                container
                                                direction={"column"}
                                                rowSpacing={2}
                                                mt={1}
                                                className={
                                                  roundtrip.cancellationdata
                                                }
                                              >
                                                <Grid item>
                                                  &#x2022;{" "}
                                                  <span>
                                                    Total Reschedule Charges =
                                                    Airline Reschedule Fee +
                                                    Fare Diffrence
                                                  </span>
                                                </Grid>
                                                <Grid item>
                                                  &#x2022;{" "}
                                                  <span>
                                                    The airline cancel/
                                                    reschedule fees is
                                                    inducative and can be
                                                    changed without anyprior
                                                    notice by the airlines.
                                                  </span>
                                                </Grid>
                                                <Grid item>
                                                  &#x2022;{" "}
                                                  <span>
                                                    gomytrip does not guarantee
                                                    the accuracy of cancel/
                                                    reschedule fees.{" "}
                                                  </span>
                                                </Grid>
                                                <Grid item>
                                                  &#x2022;{" "}
                                                  <span>
                                                    Partial cancellation is not
                                                    allowed on the flight
                                                    tickets which are book under
                                                    special round-trips
                                                    discouted fares.
                                                  </span>
                                                </Grid>
                                                <Grid item>
                                                  &#x2022;{" "}
                                                  <span>
                                                    In certain situations of
                                                    restricted cases, no
                                                    amendments and cancellation
                                                    is allowed.
                                                  </span>
                                                </Grid>
                                              </Grid>
                                            </div>
                                          </TabPanel>
                                        </TabContext>
                                      </AccordionDetails>
                                    </Accordion>
                                  </Grid>
                                </Paper>
                              );
                            })}
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    {/* inbound */}
                    {/* className="background_transparent" */}
                    <Grid item lg={6} md={6} xs={6}>
                      <Paper
                        sx={{
                          borderRadius: "1rem",
                          padding: { md: "1.5rem", xs: "0px" },
                          backgroundColor: { md: "white", xs: "transparent" },
                        }}
                        elevation={{ xs: 0, md: 1 }}
                      >
                        <Grid container direction="column" spacing={1}>
                          <Grid item>
                            <span className={roundtrip.departure}>
                              {`${origin} - ${destination}`}
                            </span>
                          </Grid>
                          <Grid item>
                            <span className={roundtrip.font}>Return</span>
                          </Grid>
                          <Grid item>
                            <Divider
                              sx={{ display: { md: "block", xs: "none" } }}
                            />
                          </Grid>
                          <Grid item sx={{ maxWidth: "100% !important" }}>
                            {inboundflights.map((flight, index) => {
                              // console.log(flight)
                              // destructuring the object for fare and segments
                              const result_index = flight?.minarr?.ResultIndex;
                              const minifare =
                                flight.minarr.MiniFareRules ?? [];
                              const {
                                Fare: innerfare,
                                FareBreakdown: innerfarebreakdown,
                                Segments: [innersegments],
                              } = flight?.minarr;
                              const airlinecode = flight.minarr?.AirlineCode;
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
                              const fare = innerfare?.PublishedFare;
                              const oc = innerfare?.OtherCharges;
                              let totalbasefare = 0;
                              let toataltax = 0;
                              const dep_time =helperFunctions.get_time(
                                innersegments.at(0).Origin.DepTime
                              );
                              const arr_time = helperFunctions.get_time(
                                innersegments.at(-1).Destination.ArrTime
                              );
                              return (
                                <Paper
                                  elevation={3}
                                  className={roundtrip.paper}
                                  style={{
                                    border: index === 0 && `2px solid ${styles.app_color}`,
                                    marginTop: "1rem",
                                    marginBottom: "1rem",
                                  }}
                                  id={result_index}
                                  onClick={() =>
                                    paper_state(
                                      {
                                        airline_code: airlinecode,
                                        airline: airlinename,
                                        departure: dep_time,
                                        arrival: arr_time,
                                        pub_fare: fare,
                                        date: innersegments.at(0).Origin
                                          .DepTime,
                                      },
                                      1,
                                      {
                                        [flight.minarr.ResultIndex]:
                                          flight.minarr.Segments[0][0].Airline
                                            .AirlineName,
                                        airline_code: airlinecode,
                                      },
                                      index
                                    )
                                  }
                                >
                                  <Container>
                                    <Grid
                                      container
                                      direction={"column"}
                                      sx={{
                                        marginTop: { md: "2rem", xs: "10px" },
                                      }}
                                    >
                                      <Grid
                                        item
                                        sx={{
                                          height: { md: "68px", xs: "38px" },
                                        }}
                                      >
                                        <Grid
                                          container
                                          mt={1.5}
                                          className="space-between"
                                        >
                                          <Grid item md={6}>
                                            <Grid container spacing={1}>
                                              <Grid
                                                item
                                                md={2}
                                                sx={{
                                                  width: {
                                                    md: "40px",
                                                    xs: "20px",
                                                  },
                                                }}
                                              >
                                                <img
                                                  className="image_sm"
                                                  src={`${envdata.flagsbaseurl}/${airlinecode}.png`}
                                                  alt="indigo"
                                                  width="100%"
                                                />
                                              </Grid>
                                              <Grid
                                                className="after-search-text-size"
                                                item
                                                md={6}
                                                alignContent="center"
                                              >
                                                <span className="imagespace">
                                                  {airlinename}
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item md={6}>
                                            <Grid
                                              container
                                              direction={"column"}
                                              textAlign="right"
                                            >
                                              <Grid
                                                item
                                                className="after-search-text-size"
                                              >
                                                &#8377; {fare}
                                              </Grid>
                                              <Grid
                                                item
                                                sx={{
                                                  display: {
                                                    md: "block",
                                                    xs: "none",
                                                  },
                                                }}
                                              >
                                                <span
                                                  className={
                                                    roundtrip.departure
                                                  }
                                                >
                                                  +More Fare
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid container alignItems={"center"}>
                                          <Grid
                                            item
                                            md={2}
                                            xs={3}
                                            alignItems="center"
                                          >
                                            <img
                                              className="image-responsive"
                                              src={plane}
                                              alt="plane"
                                            />
                                          </Grid>
                                          <Grid item md={8} xs={6}>
                                            <Grid
                                              container
                                              direction={"column"}
                                              textAlign="center"
                                            >
                                              <Grid
                                                item
                                                className="after-search-text-size"
                                              >
                                                <span>{jrney_time}</span>
                                              </Grid>
                                              <Grid item>
                                                <img
                                                  className="image-responsive"
                                                  src={onestop}
                                                  alt="onestop"
                                                  width="100%"
                                                />
                                              </Grid>
                                              <Grid
                                                item
                                                className="after-search-text-size"
                                              >
                                                <span>
                                                  {stops === 0
                                                    ? "non-Stop"
                                                    : `${stops} Stop`}
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item md={2} xs={3}>
                                            <img
                                              className="image-responsive"
                                              src={plane}
                                              alt="plane"
                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid
                                          container
                                          className="space-between"
                                        >
                                          <Grid item md={6}>
                                            <Grid
                                              container
                                              direction={"column"}
                                            >
                                              <Grid item>
                                                <span
                                                  className={clsx(
                                                    roundtrip.font1,
                                                    "after-search-text-size"
                                                  )}
                                                >
                                                  {dep_time}
                                                </span>
                                              </Grid>
                                              <Grid
                                                item
                                                sx={{
                                                  display: {
                                                    md: "block",
                                                    xs: "none",
                                                  },
                                                }}
                                              >
                                                <span>{origin}</span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item md={6} textAlign="right">
                                            <Grid
                                              container
                                              direction={"column"}
                                            >
                                              <Grid item>
                                                <span
                                                  className={clsx(
                                                    roundtrip.font1,
                                                    "after-search-text-size"
                                                  )}
                                                >
                                                  {arr_time}
                                                </span>
                                              </Grid>
                                              <Grid
                                                item
                                                sx={{
                                                  display: {
                                                    md: "block",
                                                    xs: "none",
                                                  },
                                                }}
                                              >
                                                <span>{destination}</span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        sx={{
                                          display: { md: "block", xs: "none" },
                                        }}
                                      >
                                        <div
                                          className={roundtrip.offerbackground}
                                        >
                                          {" "}
                                          {/* <span>
                                            <img
                                              src={bluerectangle}
                                              alt="bluerectangle"
                                              width="3.5%"
                                              height="3.5%"
                                            />
                                          </span>{" "}
                                          <span className={roundtrip.font2}>
                                            Use MMTOFFER and get FLAT Rs. 500
                                            Instant discount on this flight
                                          </span> */}
                                        </div>
                                      </Grid>
                                      <Grid item>
                                        <Divider />
                                      </Grid>
                                    </Grid>
                                  </Container>
                                  <Grid item textAlign={"right"}>
                                    {/* <button
                                style={{
                                  border: "none",
                                  backgroundColor: "#FF4949",
                                  padding: "1rem 2rem",
                                  borderBottomRightRadius: "1rem",
                                  color: "#ffff",
                                  fontSize: "14px",
                                }}
                              >
                                Cheapest
                              </button> */}
                                    <Accordion
                                      expanded={inboundexpand === index}
                                      lg={6}
                                      md={6}
                                      xs={6}
                                      onChange={inboundaccordion(index)}
                                      sx={{
                                        display: { md: "block", xs: "none" },
                                      }}
                                    >
                                      <AccordionSummary>
                                        <Grid container>
                                          <Grid item md={6}>
                                            <Stack
                                              direction={"row"}
                                              spacing={1}
                                            >
                                              <span
                                                className={
                                                  roundtrip.flightdetails
                                                }
                                              >
                                                Flight Details
                                              </span>
                                              <img
                                                src={
                                                  expand === index
                                                    ? uparrow
                                                    : downarrow
                                                }
                                                alt="arrow"
                                              />
                                            </Stack>
                                          </Grid>
                                          {((!inbound_highest_price &&
                                            index === 0) ||
                                            (inbound_highest_price &&
                                              index ===
                                                inboundflights.length - 1)) && (
                                            <Grid
                                              item
                                              md={6}
                                              textAlign="right"
                                              className={roundtrip.cheapest}
                                            >
                                              Cheapest
                                            </Grid>
                                          )}
                                        </Grid>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <TabContext value={inbound_details_tab}>
                                          <TabList
                                            onChange={handle_inboundtab}
                                            className={roundtrip.tabs}
                                            sx={{
                                              backgroundColor:
                                                "#DFF3FF!important",
                                              minHeight: "2rem",
                                              height: "3rem",
                                              borderRadius: "0.5rem",
                                            }}
                                            variant="scrollable"
                                            orientation={{
                                              xs: "horizontal",
                                              md: "none",
                                            }}
                                            scrollButtons={"off"}
                                            id={"tablistspace"}
                                          >
                                            <Tab
                                              value="1"
                                              className={roundtrip.tab}
                                              disableRipple
                                              sx={{ color: styles.app_color }}
                                              label="Flights Information"
                                            />
                                            <Tab
                                              value="2"
                                              className={roundtrip.tab}
                                              disableRipple
                                              sx={{ color: styles.app_color }}
                                              label="Fare Details"
                                            />
                                            <Tab
                                              value="3"
                                              className={roundtrip.tab}
                                              disableRipple
                                              sx={{ color: styles.app_color }}
                                              label="Baggage Information"
                                            />
                                            <Tab
                                              value="4"
                                              className={roundtrip.tab}
                                              disableRipple
                                              sx={{ color: styles.app_color }}
                                              label="Cancellation & change Rule"
                                            />
                                          </TabList>
                                          <TabPanel
                                            value="1"
                                            className="cardpadding"
                                          >
                                            <Grid
                                              container
                                              direction="column"
                                              rowSpacing={2}
                                            >
                                              {innersegments.map(
                                                (segment, index) => {
                                                  const G_time =
                                                    segment.GroundTime;
                                                  const layover_time = `${Math.floor(
                                                    G_time / 60
                                                  )
                                                    .toString()
                                                    .padStart(2, "0")}h ${(
                                                    G_time % 60
                                                  )
                                                    .toString()
                                                    .padStart(2, "0")}mins`;
                                                  const duration =
                                                    segment.Duration;
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
                                                    segment.Origin.Airport
                                                      .CityName;
                                                  const flight_number = `${segment.Airline.AirlineCode}-${segment.Airline.FlightNumber}`;
                                                  return (
                                                    <>
                                                      {G_time > 0 && (
                                                        <Grid item>
                                                          <Divider
                                                            className={
                                                              roundtrip.flighttxt
                                                            }
                                                          >
                                                            Layover:
                                                            {layover_time}
                                                          </Divider>
                                                        </Grid>
                                                      )}
                                                      <Grid
                                                        container
                                                        item
                                                        spacing={1}
                                                        textAlign={"left"}
                                                      >
                                                        <Grid item md={1}>
                                                          <img
                                                            src={`${envdata.flagsbaseurl}/${airlinecode}.png`}
                                                            width="100%"
                                                            alt="indigo"
                                                          />
                                                        </Grid>
                                                        <Grid item md={3}>
                                                          <Stack>
                                                            <span
                                                              className={
                                                                roundtrip.flighttxt
                                                              }
                                                            >
                                                              {airlinename}
                                                            </span>
                                                            <span
                                                              className={
                                                                roundtrip.flightnumber
                                                              }
                                                            >
                                                              {flight_number}
                                                            </span>
                                                          </Stack>
                                                        </Grid>
                                                      </Grid>
                                                      <Grid container item>
                                                        <Grid
                                                          item
                                                          md={2.4}
                                                          mt={0.3}
                                                        >
                                                          <img
                                                            src={plane}
                                                            alt="plane"
                                                          />
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          md={7.6}
                                                          textAlign="center"
                                                        >
                                                          <Stack>
                                                            <span
                                                              className={
                                                                roundtrip.flightnumber
                                                              }
                                                            >
                                                              {cal_duration}
                                                            </span>
                                                            <span
                                                              style={{
                                                                border:
                                                                 `1px  dashed  ${styles.app_color}`,
                                                              }}
                                                            ></span>
                                                          </Stack>
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          md={2}
                                                          mt={0.5}
                                                        >
                                                          <img
                                                            src={plane}
                                                            alt="plane"
                                                          />
                                                        </Grid>
                                                      </Grid>
                                                      <Grid container item>
                                                        <Grid
                                                          item
                                                          md={6}
                                                          textAlign={"left"}
                                                        >
                                                          <Stack>
                                                            <span
                                                              className={
                                                                roundtrip.flighttxt
                                                              }
                                                            >
                                                              {depseg_time}
                                                            </span>
                                                            <span
                                                              className={
                                                                roundtrip.flightnumber
                                                              }
                                                            >
                                                              {origin_loc}
                                                            </span>
                                                          </Stack>
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          md={6}
                                                          textAlign={"right"}
                                                        >
                                                          <Stack>
                                                            <span
                                                              className={
                                                                roundtrip.flighttxt
                                                              }
                                                            >
                                                              {arrseg_time}
                                                            </span>
                                                            <span
                                                              className={
                                                                roundtrip.flightnumber
                                                              }
                                                            >
                                                              {dest_loc}
                                                            </span>
                                                          </Stack>
                                                        </Grid>
                                                      </Grid>
                                                    </>
                                                    //     <>
                                                    // <Grid item>
                                                    //   <Divider className={roundtrip.flighttxt}>Layover:2hr 30mins</Divider>
                                                    // </Grid>
                                                    // <Grid container item spacing={1}>
                                                    //     <Grid item md={1}><img src={indigo} alt="indigo"/></Grid>
                                                    //     <Grid item md={3}>
                                                    //       <Stack>
                                                    //         <span className={roundtrip.flighttxt}>IndiGo</span>
                                                    //         <span className={roundtrip.flightnumber}>IN 3678</span>
                                                    //       </Stack>
                                                    //     </Grid>
                                                    // </Grid>
                                                    // <Grid container item >
                                                    //   <Grid item md={2.4} mt={0.3}><img src={plane} alt="plane"/></Grid>
                                                    //   <Grid item md={7.6} textAlign="center">
                                                    //     <Stack>
                                                    //       <span className={roundtrip.flightnumber}>00h 45m</span>
                                                    //       <span style={{border:'1px dashed #003556'}}></span>
                                                    //     </Stack>
                                                    //   </Grid>
                                                    //   <Grid item md={2} mt={0.5}><img src={plane} alt="plane"/></Grid>
                                                    // </Grid>
                                                    // <Grid container item>
                                                    //   <Grid item md={6}>
                                                    //     <Stack>
                                                    //       <span className={roundtrip.flighttxt}>05:30 PM</span>
                                                    //       <span className={roundtrip.flightnumber}>New Delhi</span>
                                                    //     </Stack>
                                                    //   </Grid>
                                                    //   <Grid item md={6} textAlign={'right'}>
                                                    //     <Stack>
                                                    //       <span className={roundtrip.flighttxt}>09:30 PM</span>
                                                    //       <span className={roundtrip.flightnumber}>Visakapatnam</span>
                                                    //     </Stack>
                                                    //   </Grid>
                                                    // </Grid>
                                                    //     </>
                                                  );
                                                }
                                              )}

                                              {/* <Grid container item spacing={1}>
                                            <Grid item md={1}><img src={indigo} alt="indigo"/></Grid>
                                            <Grid item md={3}>
                                              <Stack>
                                                <span className={roundtrip.flighttxt}>IndiGo</span>
                                                <span className={roundtrip.flightnumber}>IN 3678</span>
                                              </Stack>
                                            </Grid>
                                        </Grid>
                                        <Grid container item >
                                          <Grid item md={2.4} mt={0.3}><img src={plane} alt="plane"/></Grid>
                                          <Grid item md={7.6} textAlign="center">
                                            <Stack>
                                              <span className={roundtrip.flightnumber}>00h 45m</span>
                                              <span style={{border:'1px dashed #003556'}}></span>
                                            </Stack>
                                          </Grid>
                                          <Grid item md={2} mt={0.5}><img src={plane} alt="plane"/></Grid>
                                        </Grid>
                                        <Grid container item>
                                          <Grid item md={6}>
                                            <Stack>
                                              <span className={roundtrip.flighttxt}>05:30 PM</span>
                                              <span className={roundtrip.flightnumber}>New Delhi</span>
                                            </Stack>
                                          </Grid>
                                          <Grid item md={6} textAlign={'right'}>
                                            <Stack>
                                              <span className={roundtrip.flighttxt}>09:30 PM</span>
                                              <span className={roundtrip.flightnumber}>Visakapatnam</span>
                                            </Stack>
                                          </Grid>
                                        </Grid> */}
                                            </Grid>
                                          </TabPanel>
                                          <TabPanel
                                            value="2"
                                            className="cardpadding"
                                            sx={{ padding: "0.7rem 0rem" }}
                                          >
                                            {/* <Stack spacing={1} className={roundtrip.faredetails}>
                                        <Grid item container>
                                          <Grid item md={10}>1 x Adult</Grid>
                                          <Grid item md={2} >&#8377;1,500</Grid>
                                        </Grid>
                                        <Grid item container>
                                          <Grid item md={10}>Total(Base Fare)</Grid>
                                          <Grid item md={2}>&#8377;300</Grid>
                                        </Grid>
                                        <Grid item container>
                                          <Grid item md={10}>Total Tax</Grid>
                                          <Grid item md={2}>&#8377;500</Grid>
                                        </Grid>
                                        <Grid item container>
                                          <Grid item md={10}>Total (Fee & Surcharge)</Grid>
                                          <Grid item md={2}>&#8377;2,300</Grid>
                                        </Grid>
                                      </Stack> */}
                                            <Stack
                                              spacing={1}
                                              className={roundtrip.faredetails}
                                            >
                                              {innerfarebreakdown.map(
                                                (farebrkdwn, index) => {
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
                                                    <Grid
                                                      item
                                                      container
                                                      textAlign={"left"}
                                                    >
                                                      <Grid item md={10}>
                                                        {passenger}
                                                      </Grid>
                                                      <Grid item md={2}>
                                                        &#8377;{basefare}
                                                      </Grid>
                                                    </Grid>
                                                  );
                                                }
                                              )}

                                              <Grid
                                                item
                                                container
                                                textAlign={"left"}
                                              >
                                                <Grid item md={10}>
                                                  Total(Base Fare)
                                                </Grid>
                                                <Grid item md={2}>
                                                  &#8377;{totalbasefare}
                                                </Grid>
                                              </Grid>
                                              <Grid
                                                item
                                                container
                                                textAlign={"left"}
                                              >
                                                <Grid item md={10}>
                                                  Total Tax
                                                </Grid>
                                                <Grid item md={2}>
                                                  &#8377;{toataltax}
                                                </Grid>
                                              </Grid>
                                              <Grid
                                                item
                                                container
                                                textAlign={"left"}
                                              >
                                                <Grid item md={10}>
                                                  Other Charges
                                                </Grid>
                                                <Grid item md={2}>
                                                  &#8377;{oc}
                                                </Grid>
                                              </Grid>
                                              <Grid
                                                item
                                                container
                                                textAlign={"left"}
                                              >
                                                <Grid item md={10}>
                                                  Total (Fee & Surcharge)
                                                </Grid>
                                                <Grid item md={2}>
                                                  &#8377;
                                                  {totalbasefare +
                                                    toataltax +
                                                    oc}
                                                </Grid>
                                              </Grid>
                                            </Stack>
                                          </TabPanel>
                                          <TabPanel
                                            value="3"
                                            className="cardpadding"
                                            sx={{ padding: "0.7rem 0rem" }}
                                          >
                                            <Stack
                                              spacing={1.5}
                                              sx={{
                                                backgroundColor: "#EDF5FA",
                                                padding: "1rem",
                                                borderRadius: "0.5rem",
                                              }}
                                              textAlign={"left"}
                                            >
                                              <span
                                                className={roundtrip.flighttxt}
                                              >
                                                Airline
                                              </span>
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
                                                    <>
                                                      <span
                                                        className={
                                                          roundtrip.faredetails
                                                        }
                                                      >
                                                        <img
                                                          src={`${envdata.flagsbaseurl}/${code}.png`}
                                                          alt="indigo"
                                                          width="20rem"
                                                        />{" "}
                                                        {flightnum}
                                                      </span>
                                                      <Grid
                                                        item
                                                        container
                                                        className={
                                                          roundtrip.faredetails
                                                        }
                                                      >
                                                        <Grid item md={6}>
                                                          Check-in-Baggage
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          md={6}
                                                          textAlign="right"
                                                        >
                                                          {check_inbaggage}
                                                        </Grid>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        container
                                                        className={
                                                          roundtrip.faredetails
                                                        }
                                                      >
                                                        <Grid item md={6}>
                                                          Cabbin-Baggage
                                                        </Grid>
                                                        <Grid
                                                          item
                                                          md={6}
                                                          textAlign="right"
                                                        >
                                                          {cabinbaggage}
                                                        </Grid>
                                                      </Grid>
                                                    </>
                                                  );
                                                }
                                              )}

                                              {/* <span className={roundtrip.faredetails}><img src={indigo} alt="indigo"/> IndiGo, IN 3678</span>
                                        <Grid item container className={roundtrip.faredetails}>
                                          <Grid item md={6}>Check-in-Baggage</Grid>
                                          <Grid item md={6} textAlign="right">7kgs</Grid>
                                        </Grid>
                                        <Grid item container className={roundtrip.faredetails}>
                                          <Grid item md={6}>Cabbin-Baggage</Grid>
                                          <Grid item md={6} textAlign="right">15kgs</Grid>
                                        </Grid> */}
                                            </Stack>
                                            <Stack
                                              spacing={1.5}
                                              mt={2}
                                              textAlign={"left"}
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
                                                    Baggage information
                                                    mentioned above is obtained
                                                    from airline's reservation
                                                    system, gomytyrip does not
                                                    guarantee the accuracy of
                                                    this information.
                                                  </span>
                                                </Stack>
                                              </Grid>
                                              <Grid item>
                                                <Stack
                                                  direction={"row"}
                                                  spacing={1.5}
                                                >
                                                  <span
                                                    style={{
                                                      fontSize: "1.5rem",
                                                    }}
                                                  >
                                                    &#x2022;
                                                  </span>
                                                  <span>
                                                    The baggage allowance may
                                                    vary according to
                                                    stop-overs, connecting
                                                    flights. changes in airline
                                                    rules. etc.
                                                  </span>
                                                </Stack>
                                              </Grid>
                                            </Stack>
                                          </TabPanel>
                                          <TabPanel
                                            value="4"
                                            className="cardpadding"
                                            sx={{ padding: "0" }}
                                          >
                                            <Grid
                                              container
                                              direction={"column"}
                                              rowSpacing={1}
                                              className={
                                                aftersearchflight.baggage
                                              }
                                              textAlign={"left"}
                                            >
                                              <Grid
                                                item
                                                className={
                                                  roundtrip.cancellationhead
                                                }
                                              >
                                                <Grid container>
                                                  <Grid item md={5}>
                                                    Cancellation Time
                                                  </Grid>
                                                  <Grid item md={4}>
                                                    Penalty%
                                                  </Grid>
                                                  <Grid item md={3}>
                                                    Penalty&#8377;
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              {minifare.length > 0 &&
                                                minifare[0].map(
                                                  (rules, index) => {
                                                    // console.log(rules)
                                                    let from;
                                                    let to;
                                                    let details;
                                                    let units;
                                                    let cancel_percent;
                                                    if (
                                                      rules.Type ===
                                                      "Cancellation"
                                                    ) {
                                                      // console.log("cancellation")
                                                      from = rules.From ?? "";
                                                      to = rules.To ?? "";
                                                      details =
                                                        rules.Details ?? "";
                                                      units = rules.Unit ?? "";
                                                      cancel_percent =
                                                        helperFunctions.cancelltion_percentage(
                                                          fare,
                                                          details
                                                        );
                                                      // console.log(details)
                                                    }
                                                    let cancellation_time = `${from}-${to}${units}`;

                                                    return (
                                                      rules.Type ===
                                                        "Cancellation" && (
                                                        <Grid item>
                                                          <Grid
                                                            container
                                                            className={
                                                              roundtrip.cancellationdata
                                                            }
                                                          >
                                                            <Grid item xs={5}>
                                                              <span>
                                                                {
                                                                  cancellation_time
                                                                }
                                                              </span>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                              {`${cancel_percent}%`}
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                              {details}
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                      )
                                                    );
                                                  }
                                                )}
                                              {/* <Grid item>
                                        <Grid
                                          container
                                          className={roundtrip.cancellationdata}
                                        >
                                          <Grid item xs={5}>
                                            <span>More than 2 hrs</span>
                                          </Grid>
                                          <Grid item xs={4}>
                                            100%
                                          </Grid>
                                          <Grid item xs={3}>
                                            Non Refundable
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid
                                          container
                                          className={roundtrip.cancellationdata}
                                        >
                                          <Grid item xs={5}>
                                            <span>2hrs - 3days</span>
                                          </Grid>
                                          <Grid item xs={4}>
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
                                          className={roundtrip.cancellationdata}
                                        >
                                          <Grid item xs={5}>
                                            <span>3days - 365 days</span>
                                          </Grid>
                                          <Grid item xs={4}>
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
                                                textAlign: "left",
                                                paddingTop: "1.5rem",
                                              }}
                                            >
                                              <h5 style={{ color: styles.app_color }}>
                                                Reschedule Penalty Fees
                                              </h5>
                                              <Divider></Divider>

                                              <Grid
                                                container
                                                direction={"column"}
                                                mt={2}
                                                rowSpacing={1}
                                              >
                                                <Grid item>
                                                  <Grid
                                                    container
                                                    className={
                                                      roundtrip.cancellationdata
                                                    }
                                                  >
                                                    <Grid item xs={7}>
                                                      Time Frame to Reissue
                                                    </Grid>
                                                    <Grid item xs={5}>
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
                                                        reissue.Type ===
                                                        "Reissue"
                                                      ) {
                                                        from =
                                                          reissue.From ?? "";
                                                        to = reissue.To ?? "";
                                                        units =
                                                          reissue.Unit ?? "";
                                                        details =
                                                          reissue.Details ?? "";
                                                      }
                                                      const reissue_time = `Before ${from} to ${to} ${units}`;
                                                      return (
                                                        reissue.Type ===
                                                          "Reissue" && (
                                                          <Grid item>
                                                            <Grid
                                                              container
                                                              className={
                                                                roundtrip.cancellationdata
                                                              }
                                                            >
                                                              <Grid item xs={7}>
                                                                {reissue_time}
                                                              </Grid>
                                                              <Grid item xs={4}>
                                                                &#8377;{" "}
                                                                {details}
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                        )
                                                      );
                                                    }
                                                  )}
                                                {/* <Grid item>
                                          <Grid container className={roundtrip.cancellationdata}>
                                            <Grid item xs={4}>
                                              Airline Fees
                                            </Grid>
                                            <Grid item xs={8}>
                                              &#8377; 2,000
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <Grid container className={roundtrip.cancellationdata}>
                                            <Grid item xs={4}>
                                              EMT fees
                                            </Grid>
                                            <Grid item xs={8}>
                                              &#8377; 230
                                            </Grid>
                                          </Grid>
                                        </Grid> */}
                                              </Grid>
                                            </div>
                                            <div
                                              style={{
                                                paddingLeft: "1rem",
                                                textAlign: "left",
                                              }}
                                            >
                                              <h5 style={{ color: styles.app_color }}>
                                                Terms & conditions
                                              </h5>
                                              <Divider></Divider>
                                              <Grid
                                                container
                                                direction={"column"}
                                                rowSpacing={2}
                                                mt={1}
                                                className={
                                                  roundtrip.cancellationdata
                                                }
                                              >
                                                <Grid item>
                                                  &#x2022;{" "}
                                                  <span>
                                                    Total Reschedule Charges =
                                                    Airline Reschedule Fee +
                                                    Fare Diffrence
                                                  </span>
                                                </Grid>
                                                <Grid item>
                                                  &#x2022;{" "}
                                                  <span>
                                                    The airline cancel/
                                                    reschedule fees is
                                                    inducative and can be
                                                    changed without anyprior
                                                    notice by the airlines.
                                                  </span>
                                                </Grid>
                                                <Grid item>
                                                  &#x2022;{" "}
                                                  <span>
                                                    gomytrip does not guarantee
                                                    the accuracy of cancel/
                                                    reschedule fees.{" "}
                                                  </span>
                                                </Grid>
                                                <Grid item>
                                                  &#x2022;{" "}
                                                  <span>
                                                    Partial cancellation is not
                                                    allowed on the flight
                                                    tickets which are book under
                                                    special round-trips
                                                    discouted fares.
                                                  </span>
                                                </Grid>
                                                <Grid item>
                                                  &#x2022;{" "}
                                                  <span>
                                                    In certain situations of
                                                    restricted cases, no
                                                    amendments and cancellation
                                                    is allowed.
                                                  </span>
                                                </Grid>
                                              </Grid>
                                            </div>
                                          </TabPanel>
                                        </TabContext>
                                      </AccordionDetails>
                                    </Accordion>
                                  </Grid>
                                </Paper>
                              );
                            })}
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    {/* bottom paper */}
                    <Paper
                      className="accordionPosition"
                      sx={{
                        borderRadius: "0.5rem",
                        paddingTop: "1rem",
                        paddingBottom: "0.5rem",
                        marginLeft: "1%",
                        // display:{md:"block",xs:"none"}
                      }}
                    >
                      <Container sx={{ paddingBottom: "1rem" }}>
                        <Grid container columnSpacing={2}>
                          <Grid
                            item
                            md={4.1}
                            sx={{
                              borderRight: "1px dashed white",
                              display: { md: "block", xs: "none" },
                              paddingRight: "28px",
                              paddingLeft: "0px !important",
                            }}
                          >
                            <Grid
                              container
                              spacing={2.5}
                              sx={{ display: { md: "flex", xs: "none" } }}
                            >
                              <Grid item md={1}>
                                <img
                                  style={{ marginLeft: "0.8rem" }}
                                  src={multideparture}
                                  alt="multideparture"
                                />
                              </Grid>
                              <Grid item md={10}>
                                <Grid
                                  container
                                  sx={{ marginLeft: "1rem" }}
                                  direction={"column"}
                                >
                                  <Grid item sx={{ height: "28px" }}>
                                    <Grid container spacing={3}>
                                      <Grid item md={0.3}>
                                        <img
                                          src={`${envdata.flagsbaseurl}/${roundtrip_flight.outbound?.airline_code}.png`}
                                          alt="indigo"
                                          width="20rem"
                                        />
                                      </Grid>
                                      {/* {console.log(roundtrip_flight)} */}
                                      <Grid item md={10}>
                                        <span className={roundtrip.timefont}>
                                          {roundtrip_flight.outbound?.airline}
                                        </span>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item sx={{ height: "30px" }}>
                                    <Grid
                                      container
                                      spacing={0.8}
                                      sx={{ paddingBottom: "1rem" }}
                                    >
                                      <Grid item md={3}>
                                        <span className={roundtrip.timefont}>
                                          {roundtrip_flight.outbound?.departure}
                                        </span>
                                      </Grid>
                                      <Grid item md={2}>
                                        <img
                                          style={{ paddingLeft: "0.3rem" }}
                                          src={whitearrow}
                                          alt="arrow"
                                        />
                                      </Grid>
                                      <Grid item md={3.8}>
                                        <span className={roundtrip.timefont}>
                                          {roundtrip_flight.outbound?.arrival}
                                        </span>
                                      </Grid>
                                      <Grid
                                        item
                                        md={3}
                                        className={roundtrip.timefont}
                                        alignItems="center"
                                        mt={0.5}
                                      >
                                        &#8377;{roundtrip_flight.outbound?.fare}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <span className={roundtrip.timefont}>
                                      Depart {roundtrip_flight.outbound?.date}
                                    </span>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            md={4.1}
                            sx={{
                              borderRight: "1px dashed white",
                              display: { md: "block", xs: "none" },
                              paddingRight: "28px",
                              paddingLeft: "0px !important",
                            }}
                          >
                            <Grid container spacing={2.5}>
                              <Grid item md={1}>
                                <img
                                  style={{ marginLeft: "0.8rem" }}
                                  src={multireturn}
                                  alt="multireturn"
                                />
                              </Grid>

                              <Grid item md={10}>
                                <Grid
                                  container
                                  sx={{ marginLeft: "1rem" }}
                                  direction={"column"}
                                >
                                  <Grid item sx={{ height: "28px" }}>
                                    <Grid container spacing={3}>
                                      <Grid item md={0.3}>
                                        <img
                                          src={`${envdata.flagsbaseurl}/${roundtrip_flight.inbound?.airline_code}.png`}
                                          alt="indigo"
                                          width="20rem"
                                        />
                                      </Grid>
                                      <Grid item md={10}>
                                        <span className={roundtrip.timefont}>
                                          {roundtrip_flight.inbound?.airline}
                                        </span>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item sx={{ height: "30px" }}>
                                    <Grid container spacing={0.8}>
                                      <Grid item md={3}>
                                        <span className={roundtrip.timefont}>
                                          {roundtrip_flight.inbound?.departure}
                                        </span>
                                      </Grid>
                                      <Grid item md={2}>
                                        <img src={whitearrow} alt="arrow" />
                                      </Grid>
                                      <Grid item md={3.8}>
                                        <span className={roundtrip.timefont}>
                                          {roundtrip_flight.inbound?.arrival}
                                        </span>
                                      </Grid>
                                      <Grid
                                        item
                                        md={3}
                                        className={roundtrip.timefont}
                                        alignItems="center"
                                        mt={0.5}
                                      >
                                        &#8377;{roundtrip_flight.inbound?.fare}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <span className={roundtrip.timefont}>
                                      Return {roundtrip_flight.inbound?.date}
                                    </span>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item md={3.8} xs={12}>
                            <Grid
                              container
                              sx={{
                                marginTop: { md: "24px", xs: "0px" },
                                justifyContent: {
                                  md: "space-between",
                                  xs: "space-around",
                                },
                              }}
                            >
                              <Grid item md={5} xs={5}>
                                <Grid container direction="column">
                                  <Grid
                                    item
                                    className={clsx(
                                      roundtrip.timefont,
                                      "textcolor"
                                    )}
                                  >
                                    &#8377;{" "}
                                    {roundtrip_flight.inbound?.fare +
                                      roundtrip_flight.inbound?.fare}
                                  </Grid>
                                  <Grid item>
                                    <span
                                      className={clsx(
                                        roundtrip.timefont,
                                        "textcolor"
                                      )}
                                    >
                                      Fare Details
                                    </span>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item md={6} xs={6} textAlign={"right"}>
                                <button
                                  className="btnstyle"
                                  onClick={bookroundtrip}
                                >
                                  Book Now
                                </button>
                              </Grid>

                              {/* <Grid item md={1}>
                              <span onClick={() => setRoundtripinfo(true)}>
                                <svg
                                  width="10"
                                  height="6"
                                  viewBox="0 0 10 6"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0 0.935242L5 5.93524L10 0.935242L0 0.935242Z"
                                    fill="#ffff"
                                  />
                                </svg>
                              </span>
                            </Grid> */}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Container>
                    </Paper>
                  </Grid>
                  {/* Roundtrip flight info dialog*/}
                  <Dialog
                    open={roundtripinfo}
                    PaperProps={{
                      sx: {
                        left: "15%",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      },
                    }}
                    sx={{
                      "& .MuiDialog-paper": {
                        width: "100%",
                        height: "100%",
                        mixHeight: "100%",
                        maxWidth: "63vw",
                        borderRadius: "15px",
                      },
                    }}
                    TransitionComponent={Transition}
                    onClose={() => setRoundtripinfo(false)}
                  >
                    <DialogTitle>
                      <Paper
                        sx={{
                          borderRadius: "0.5rem",
                          paddingTop: "1rem",
                          paddingBottom: "0.5rem",
                          backgroundColor: styles.app_color,
                        }}
                      >
                        <Container>
                          <Grid container columnSpacing={2}>
                            <Grid
                              item
                              md={4.3}
                              sx={{
                                borderRight: "1px dashed white",
                              }}
                            >
                              <Grid container>
                                <Grid item md={1}>
                                  <img
                                    src={multideparture}
                                    alt="multideparture"
                                  />
                                </Grid>
                                <Grid item md={10}>
                                  <Grid container direction={"column"}>
                                    <Grid item>
                                      <Grid container spacing={3}>
                                        <Grid item md={0.3}>
                                          <img src={indigo} alt="indigo" />
                                        </Grid>
                                        <Grid item md={2}>
                                          <span className={roundtrip.timefont}>
                                            IndiGo
                                          </span>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item sx={{ height: "30px" }}>
                                      <Grid container spacing={0.6}>
                                        <Grid item md={3.8}>
                                          <span className={roundtrip.timefont}>
                                            05:30 PM
                                          </span>
                                        </Grid>
                                        <Grid item md={1.4}>
                                          <img src={whitearrow} alt="arrow" />
                                        </Grid>
                                        <Grid item md={3.8}>
                                          <span className={roundtrip.timefont}>
                                            09:30 PM
                                          </span>
                                        </Grid>
                                        <Grid
                                          item
                                          md={3}
                                          className={roundtrip.timefont}
                                          alignItems="center"
                                          mt={1}
                                        >
                                          &#8377; 2,300
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <span className={roundtrip.timefont}>
                                        Depart 28/12/2022
                                      </span>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              md={4.3}
                              sx={{
                                borderRight: "1px dashed white",
                              }}
                            >
                              <Grid container>
                                <Grid item md={1}>
                                  <img src={multireturn} alt="multireturn" />
                                </Grid>
                                <Grid item md={10}>
                                  <Grid container direction={"column"}>
                                    <Grid item>
                                      <Grid container spacing={3}>
                                        <Grid item md={0.3}>
                                          <img src={indigo} alt="indigo" />
                                        </Grid>
                                        <Grid item md={2}>
                                          <span className={roundtrip.timefont}>
                                            IndiGo
                                          </span>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item sx={{ height: "30px" }}>
                                      <Grid container spacing={0.6}>
                                        <Grid item md={3.8}>
                                          <span className={roundtrip.timefont}>
                                            05:30 PM
                                          </span>
                                        </Grid>
                                        <Grid item md={1.4}>
                                          <img src={whitearrow} alt="arrow" />
                                        </Grid>
                                        <Grid item md={3.8}>
                                          <span className={roundtrip.timefont}>
                                            09:30 PM
                                          </span>
                                        </Grid>
                                        <Grid
                                          item
                                          md={3}
                                          className={roundtrip.timefont}
                                          alignItems="center"
                                          mt={1}
                                        >
                                          &#8377; 2,300
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <span className={roundtrip.timefont}>
                                        Depart 28/12/2022
                                      </span>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item md={3.4}>
                              <Grid container mt={3}>
                                <Grid item md={5}>
                                  <Grid container direction="column">
                                    <Grid item className={roundtrip.timefont}>
                                      &#8377; 5,100
                                    </Grid>
                                    <Grid item>
                                      <span className={roundtrip.timefont}>
                                        Fare Details
                                      </span>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item md={6}>
                                  <button
                                    style={{
                                      padding: "5px 20px",
                                      borderRadius: "5px",
                                      background: "white",
                                      border: "none",
                                      color: styles.app_color,
                                    }}
                                    onClick={bookroundtrip}
                                  >
                                    Book Now
                                  </button>
                                </Grid>
                                <Grid item md={1}>
                                  <span onClick={() => setRoundtripinfo(false)}>
                                    <svg
                                      width="10"
                                      height="6"
                                      viewBox="0 0 10 6"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0 5.93524L5 0.935242L10 5.93524L0 5.93524Z"
                                        fill="#ffff"
                                      />
                                    </svg>
                                  </span>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Container>
                      </Paper>
                    </DialogTitle>
                    <DialogContent className="profileDialog">
                      <Grid container spacing={2}>
                        {[1, 2, 3].map((nums) => {
                          return (
                            <Grid item key={nums}>
                              <Paper
                                sx={{ borderRadius: "1rem", padding: "1rem" }}
                              >
                                <Container>
                                  <Grid
                                    sx={{
                                      color: styles.app_color,
                                      padding: "15px 5px",
                                      fontSize: "20px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    New Delhi - Chennai . Wednesday 28 Dec, 2022
                                  </Grid>
                                  <Divider />
                                  <Grid
                                    sx={{
                                      color: styles.app_color,
                                      padding: "15px 5px",
                                      fontSize: "14px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Flight Details
                                  </Grid>
                                  <TabContext value={value1}>
                                    <Box>
                                      <TabList
                                        onChange={handlechange1}
                                        sx={{
                                          background: "#DFF3FF",
                                          borderRadius: "1rem",
                                        }}
                                        aria-label="lab API tabs example"
                                        className={aftersearchflight.tabs}
                                      >
                                        <Tab
                                          className={classes.MuiSelected}
                                          disableRipple
                                          label="Flights Information"
                                          value="4"
                                          sx={{ fontSize: "12px" }}
                                        />
                                        <Tab
                                          className={classes.MuiSelected}
                                          disableRipple
                                          label="Fare Details"
                                          value="5"
                                          sx={{
                                            fontSize: "12px",
                                            padding: "0% 3%",
                                          }}
                                        />
                                        <Tab
                                          className={classes.MuiSelected}
                                          disableRipple
                                          label="Baggage Information"
                                          value="6"
                                          sx={{
                                            fontSize: "12px",
                                            padding: "0% 3.1%",
                                          }}
                                        />
                                        <Tab
                                          className={classes.MuiSelected}
                                          disableRipple
                                          label="Cancellation & Change Rule"
                                          value="7"
                                          sx={{
                                            fontSize: "12px",
                                            padding: "0% 2.6%",
                                          }}
                                        />
                                      </TabList>
                                    </Box>
                                    {/* Flight information */}
                                    <TabPanel value="4" className="cardpadding">
                                      <Grid
                                        container
                                        direction={"column"}
                                        rowSpacing={4}
                                      >
                                        <Grid item>
                                          <Grid container>
                                            <Grid item xs={2}>
                                              <Grid
                                                container
                                                columnSpacing={3.5}
                                              >
                                                <Grid item xs={2}>
                                                  <img
                                                    src={indigo}
                                                    alt="indigo"
                                                  />
                                                </Grid>
                                                <Grid item xs={8}>
                                                  <Grid
                                                    container
                                                    rowSpacing={0.5}
                                                  >
                                                    <Grid item>
                                                      <span
                                                        style={{
                                                          fontSize: "14px",
                                                        }}
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
                                                        style={{
                                                          fontSize: "14px",
                                                        }}
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
                                                        style={{
                                                          fontSize: "14px",
                                                        }}
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
                                        </Grid>
                                        <Grid item>
                                          <Divider>
                                            <span>Layover:2 hr 30 mins</span>
                                          </Divider>
                                        </Grid>
                                        <Grid item>
                                          <Grid container>
                                            <Grid item xs={2}>
                                              <Grid
                                                container
                                                columnSpacing={3.5}
                                              >
                                                <Grid item xs={2}>
                                                  <img
                                                    src={indigo}
                                                    alt="indigo"
                                                  />
                                                </Grid>
                                                <Grid item xs={8}>
                                                  <Grid
                                                    container
                                                    rowSpacing={0.5}
                                                  >
                                                    <Grid item>
                                                      <span
                                                        style={{
                                                          fontSize: "14px",
                                                        }}
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
                                                        style={{
                                                          fontSize: "14px",
                                                        }}
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
                                                        style={{
                                                          fontSize: "14px",
                                                        }}
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
                                        </Grid>
                                      </Grid>
                                    </TabPanel>
                                    {/* Fare Details */}
                                    <TabPanel value="5" className="cardpadding">
                                      <Grid
                                        container
                                        direction="column"
                                        spacing={0.8}
                                        className={aftersearchflight.faretxt}
                                      >
                                        <Grid item>
                                          <Grid container>
                                            <Grid item xs={4}>
                                              1 * Adult
                                            </Grid>
                                            <Grid item xs={4}>
                                              &#8377; 1500{" "}
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <Grid container>
                                            <Grid item xs={4}>
                                              Total (BaseFare)
                                            </Grid>
                                            <Grid item xs={4}>
                                              &#8377; 300{" "}
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <Grid container>
                                            <Grid item xs={4}>
                                              Total Tax
                                            </Grid>
                                            <Grid item xs={4}>
                                              &#8377; 500{" "}
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <Grid container>
                                            <Grid item xs={4}>
                                              Total (Fee & Surcharge)
                                            </Grid>
                                            <Grid item xs={4}>
                                              &#8377; 2,300{" "}
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </TabPanel>
                                    {/* Baggage information*/}
                                    <TabPanel
                                      value="6"
                                      className="cardpadding"
                                      sx={{ padding: "0px" }}
                                    >
                                      <Grid
                                        container
                                        direction={"column"}
                                        rowSpacing={1}
                                        className={aftersearchflight.baggage}
                                      >
                                        <Grid item>
                                          <Grid container>
                                            <Grid item md={4}>
                                              Airline
                                            </Grid>
                                            <Grid item md={5}>
                                              Check-in Baggage
                                            </Grid>
                                            <Grid item md={3}>
                                              Cabin Baggage
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <Grid
                                            container
                                            className={
                                              aftersearchflight.faretxt
                                            }
                                          >
                                            <Grid item xs={4}>
                                              <span>
                                                <img
                                                  src={indigo}
                                                  alt="indigo"
                                                />{" "}
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
                                        </Grid>
                                        <Grid item>
                                          <Grid
                                            container
                                            className={
                                              aftersearchflight.faretxt
                                            }
                                          >
                                            <Grid item xs={4}>
                                              <span>
                                                <img
                                                  src={indigo}
                                                  alt="indigo"
                                                />{" "}
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
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        container
                                        direction={"column"}
                                        spacing={3}
                                        sx={{ paddingLeft: "1.5rem" }}
                                      >
                                        <Grid item>
                                          <Stack direction="row" spacing={1.5}>
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
                                              reservation system, gomytyrip does
                                              not guarantee the accuracy of this
                                              information.
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
                                      className="cardpadding"
                                      sx={{ padding: "0px" }}
                                    >
                                      <Grid
                                        container
                                        direction={"column"}
                                        rowSpacing={1}
                                        className={aftersearchflight.baggage}
                                      >
                                        <Grid item>
                                          <Grid container>
                                            <Grid item md={4}>
                                              Cancellation Time
                                            </Grid>
                                            <Grid item md={5}>
                                              Penalty%
                                            </Grid>
                                            <Grid item md={3}>
                                              Penalty&#8377;
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <Grid
                                            container
                                            className={
                                              aftersearchflight.faretxt
                                            }
                                          >
                                            <Grid item xs={4}>
                                              <span>More than 2 hrs</span>
                                            </Grid>
                                            <Grid item xs={5}>
                                              100%
                                            </Grid>
                                            <Grid item xs={3}>
                                              Non Refundable
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <Grid
                                            container
                                            className={
                                              aftersearchflight.faretxt
                                            }
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
                                            className={
                                              aftersearchflight.faretxt
                                            }
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
                                        </Grid>
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
                                              <Grid item xs={3}>
                                                Reschedule
                                              </Grid>
                                              <Grid item xs={9}>
                                                Before 28 hours of Departure
                                                Time
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Grid container>
                                              <Grid item xs={3}>
                                                Airline Fees
                                              </Grid>
                                              <Grid item xs={9}>
                                                &#8377; 2,000
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Grid container>
                                              <Grid item xs={3}>
                                                EMT fees
                                              </Grid>
                                              <Grid item xs={9}>
                                                &#8377; 230
                                              </Grid>
                                            </Grid>
                                          </Grid>
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
                                              Total Reschedule Charges = Airline
                                              Reschedule Fee + Fare Diffrence
                                            </span>
                                          </Grid>
                                          <Grid item>
                                            &#x2022;{" "}
                                            <span>
                                              The airline cancel/ reschedule
                                              fees is inducative and can be
                                              changed without anyprior notice by
                                              the airlines.
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
                              </Paper>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </DialogContent>
                  </Dialog>
                </Grid>
              ) : (
                <Grid item md={8} xs={12}>
                  <Roundtripin ref={roundtrip_instance} />
                </Grid>
              )}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Roundtrip;
