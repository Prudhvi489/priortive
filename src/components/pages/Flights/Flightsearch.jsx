import React, { useEffect, useRef, useState } from "react";
import flight from "../../../assets/images/flightsimage.png";
import miniflight from "../../../assets/images/mini_cover_image.svg";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import add from "../../../assets/images/add.svg";
import Remove from "../../../assets/images/Remove.svg";
import clsx from "clsx";
import priortiveapp from '../../../assets/images/priortiveapp.png'
import {
  Container,
  Grid,
  InputAdornment,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/joy/Button";
// Mui icons imports
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// Js styles imports
import { gomainpage } from "../../../assets/styles/Flights.jsx";
// images imports
import Agra from "../../../assets/images/Agra.png";
import Delhi from "../../../assets/images/Delhi.png";
import Goa from "../../../assets/images/Goa.png";
import Banglore from "../../../assets/images/Banglore.png";
import Vizag from "../../../assets/images/Vizag.png";
import footerimage from "../../../assets/images/gomytripfooter.png";
import scaner from "../../../assets/images/barcode.png";
import swap from "../../../assets/images/swapicon.svg";
import Flightcalender from "./Flightcalender";
import Footer from "../../../parts/Footer";
// carousel responsive
import {
  destinationresponsive,
} from "../responsives/Carouselresponsive";
import { useLocation, useNavigate } from "react-router-dom";
import { muitextfieldborder } from "../../../assets/styles/Flights";
import Travellerclass from "../../modals/Flightmodals/Travellerclass";
import SearchFlights from "../../modals/Flightmodals/SearchFlights";
import { useDispatch, useSelector } from "react-redux";
import { FlightsearchActions } from "../../../store/FlightsearchSlice";
import axios from "axios";
import MySnackbar from "../../modals/Signupmodals/Snackbar"
import { farequoteActions } from "../../../store/FarequoteSlice";
import Loadingmodal from "../../modals/Signupmodals/Loadingmodal";
import Mininav from "../../../parts/Mininav";
import OffersCarousel from "../../OffersCarousel/OffersCarousel";
import { envdata } from '../../Envexports';
import {styles} from '../../../assets/styles/Styles_export'
const Flightsearch = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [value, setValue] = React.useState("1");
  const [from, setFrom] = React.useState({
    airport_code: "BPM",
    airport_name: "Begumpet Airport",
    city_code: "BPM",
    city_name: "Hyderabad",
    country_code: "IN ",
  });
  const [to, setTo] = React.useState({
    airport_code: "DEL",
    airport_name: "Indira Gandhi Airport",
    city_code: "DEL",
    city_name: "Delhi",
    country_code: "IN ",
  });
  const [travellerclass, setTravellerclass] = useState(false);
  const [search, setSearch] = useState(false);
  const [sources, setSources] = useState("");
  const [dateopener, setDateopener] = useState({
    isopendepartdate: false,
    isopenreturndate: false,
  });
  const [dates, setDates] = useState({
    departdate: new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    returndate: "",
  });
  // multicity cities count
  const [citiescount, setCitiescount] = useState(2);
  const [paperheight, setPaperheight] = useState(0);
  const [trip1, setTrip1] = useState({
    source: {
      airport_code: "DEL",
      airport_name: "Indira Gandhi Airport",
      city_code: "DEL",
      city_name: "Delhi",
      country_code: "IN ",
    },
    destination: {
      airport_code: "BOM",
      airport_name: "Mumbai",
      city_code: "BOM",
      city_name: "Mumbai",
      country_code: "IN ",
    },
    date: new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    calopen: false,
  });
  const [trip2, setTrip2] = useState({
    source: {
      airport_code: "BOM",
      airport_name: "Mumbai",
      city_code: "BOM",
      city_name: "Mumbai",
      country_code: "IN ",
    },
    destination: {
      airport_code: "BLR",
      airport_name: "Bengaluru Intl",
      city_code: "BLR",
      city_name: "Bangalore",
      country_code: "IN ",
    },
    date: new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    calopen: false,
  });
  const [trip3, setTrip3] = useState({
    source: {
      airport_code: "BLR",
      airport_name: "Bengaluru Intl",
      city_code: "BLR",
      city_name: "Bangalore",
      country_code: "IN ",
    },
    destination: "",
    date: "",
    calopen: false,
  });
  const [trip4, setTrip4] = useState({
    source: "",
    destination: "",
    date: "",
    calopen: false,
  });
  const [trip5, setTrip5] = useState({
    source: "",
    destination: "",
    date: "",
    calopen: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const paperref = useRef();
  const travellersclass = useSelector(
    (state) => state.travellerclass.travellers
  );
  const traveller_class =
    travellersclass?.classes === "2"
      ? "Economy"
      : travellersclass?.classes === "4"
        ? "Business"
        : travellersclass?.classes === "6"
          ? "First"
          : travellersclass?.classes === "3" && "Premium Economy";
  const travellerscount =
    travellersclass.adult + travellersclass.child + travellersclass.infant;
  const adult = travellersclass.adult;
  const child = travellersclass.child;
  const infant = travellersclass.infant;
  const travell_class = travellersclass.classes;
  const classes = muitextfieldborder();
  // Popular Destinations
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
  const handleChange = (event, newValue) => {
    if (newValue === "1") {
      setDates((prev) => ({ ...prev, returndate: "" }));
    }
    setValue(newValue);
  };
  const gomainpag = gomainpage();
  // swap funtionality
  function handleSwap() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }
  // return click
  const returnclick = () => {
    // setDateopener((prev) => ({
    //   ...prev,
    //   isopendepartdate: true,
    // }))
    setDateopener((prev) => ({
      ...prev,
      isopenreturndate: true,
    }))
    setValue("2");
   
    // setDateopener((prev) => ({ ...prev, isopenreturndate: true }));
  };
  // getting departed date form calender
  const selected_date = (date) => {
    const modifieddate = new Date(date);
    // console.log(modifieddate)
    const formattedDate = modifieddate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setDates((prev) => ({ ...prev, departdate: formattedDate }));
    setDateopener((prev) => ({ ...prev, isopendepartdate: false }));
  };
  // getting return date from calender
  const return_date = (date) => {
    const modifieddate = new Date(date);
    const formattedDate = modifieddate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setDates((prev) => ({ ...prev, returndate: formattedDate }));
    setDateopener((prev) => ({ ...prev, isopenreturndate: false }));
  };
  // getting dates of multicity dates
  const multicitydeparture = (date, trip) => {
    // alert(trip)
    const modifieddate = new Date(date);
    const formattedDate = modifieddate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    if (trip == 1) {
      setTrip1((prev) => ({ ...prev, date: formattedDate }));
      setTrip1((prev) => ({ ...prev, calopen: false }));
    } else if (trip == 2) {
      setTrip2((prev) => ({ ...prev, date: formattedDate }));
      setTrip2((prev) => ({ ...prev, calopen: false }));
    } else if (trip == 3) {
      setTrip3((prev) => ({ ...prev, date: formattedDate }));
      setTrip3((prev) => ({ ...prev, calopen: false }));
    } else if (trip == 4) {
      setTrip4((prev) => ({ ...prev, date: formattedDate }));
      setTrip4((prev) => ({ ...prev, calopen: false }));
    } else if (trip == 5) {
      setTrip5((prev) => ({ ...prev, date: formattedDate }));
      setTrip5((prev) => ({ ...prev, calopen: false }));
    }
  };
  // converting long date to isostring
  const datetoIso = (date) => {
    const inputDate = new Date(date);
    inputDate.setMinutes(
      inputDate.getMinutes() - inputDate.getTimezoneOffset()
    );
    const isodate = inputDate.toISOString().slice(0, 10);
    return isodate;
  };
  // fething the data from flights
  const fetchsearchedflights = async (type) => {
    let searchobj;
    let searchData_From = [];
    let searchData_To = [];
    let userid = localStorage.getItem("userid") || "";
    let segments = [];
    if (type === 1) {
      searchobj = {
        adultCount: travellersclass.adult,
        childCount: travellersclass.child,
        infantCount: travellersclass.infant,
        journeyType: 1,
        segments: [
          {
            Origin: from?.city_code,
            Destination: to?.city_code ?? "",
            FlightCabinClass: travellersclass.classes,
            PreferredDepartureTime: datetoIso(dates.departdate),
          },
        ],
      };
    } else if (type === 2) {
      if (dates.returndate === "") {
        setSnackopen(true);
        setSnackmessage("return date is mandatory");
        // alert("return date is mandatory");
        setLoading(false);
        return;
      } else {
        searchobj = {
          adultCount: travellersclass.adult,
          childCount: travellersclass.child,
          infantCount: travellersclass.infant,
          journeyType: 2,
          segments: [
            {
              Origin: from?.city_code,
              Destination: to?.city_code ?? "",
              FlightCabinClass: travellersclass.classes,
              PreferredDepartureTime: datetoIso(dates.departdate),
              PreferredArrivalTime: datetoIso(dates.departdate),
            },
            {
              Origin: to?.city_code ?? "",
              Destination: from?.city_code,
              FlightCabinClass: travellersclass.classes,
              PreferredDepartureTime: datetoIso(dates.returndate),
              PreferredArrivalTime: datetoIso(dates.returndate),
            },
          ],
        };
      }
    } else if (type === 3) {
      let segments_obj = [];
      let error = false;
      for (let i = 1; i <= citiescount; i++) {
        let trip = eval("trip" + i);
        if (trip.source === "") {
          setSnackopen(true);
          setSnackmessage("source is necessary");
          // alert("source is necessary");
          error = true;
          break;
        } else if (trip.destination === "") {
          setSnackopen(true);
          setSnackmessage("destination is necessary");
          // alert("destination is necessary");
          error = true;
          break;
        } else if (trip.date === "") {
          setSnackopen(true);
          setSnackmessage("depart date should be empty");
          // alert("depart date should be empty");
          error = true;
          break;
        }
        searchData_From.push(trip.source);
        searchData_To.push(trip.destination);
        segments.push(trip);
        let each_seg_obj = {
          Origin: trip.source.city_code ?? "",
          Destination: trip.destination.city_code ?? "",
          FlightCabinClass: travellersclass.classes,
          PreferredDepartureTime: datetoIso(trip.date),
          PreferredArrivalTime: datetoIso(trip.date),
        };
        segments_obj.push(each_seg_obj);
      }
      if (error) {
        return;
      }
      searchobj = {
        adultCount: travellersclass.adult,
        childCount: travellersclass.child,
        infantCount: travellersclass.infant,
        journeyType: 3,
        segments: segments_obj,
      };
    }
    // if (userid !== null) {
    if (type === 1 || type === 2) {
      searchobj.user_id = userid;
      searchobj.searchDataFrom = [from];
      searchobj.searchDataTo = [to];
    } else if (type === 3) {
      searchobj.user_id = userid;
      searchobj.searchDataFrom = searchData_From;
      searchobj.searchDataTo = searchData_To;
    }
    // }
    setLoading(true);
    const res = await axios.post(`${envdata.baseurl}/search`, searchobj);
    let status = res.data.status;
    if (status) {
      let jrney_type = res.data.data.JourneyType;
      setLoading(false);
      if (jrney_type === 1 && status) {
        dispatch(
          FlightsearchActions.Flights_search_dataupdate([
            { source: from, destination: to, departdate: dates.departdate },
            { flightsdata: res.data.data.FlightDetails },
            res.data.data.TraceId,
            1,
          ])
        );
        navigate(`${location.pathname}/OW_flights`);
      }
      else if (jrney_type === 2 && status) {
        if (res.data.data.FlightDetails.length) {
          //===2
          dispatch(
            FlightsearchActions.Flights_search_dataupdate([
              {
                source: from,
                destination: to,
                departdate: dates.departdate,
                returndate: dates.returndate,
              },
              { flightsdata: res.data.data.FlightDetails },
              res.data.data.TraceId,
              2,
            ])
          );
          navigate(`${location.pathname}/RT_flights`);
        } else {
          setSnackopen(true);
          setSnackmessage("data not found");
          // alert("data not found");
        }
      }
      else if (jrney_type === 3 && status) {
        dispatch(FlightsearchActions.multicitycountupdate(citiescount));
        dispatch(
          FlightsearchActions.Flights_search_dataupdate([
            segments,
            { flightsdata: res.data.data.FlightDetails },
            res.data.data.TraceId,
            3,
          ])
        );
        navigate(`${location.pathname}/MC_flights`);
      }
      else {
        setSnackopen(true);
        setSnackmessage("none of the data didn't match");
        // alert("none of the data didn't match")
      }
    }
    else {
      setLoading(false)
      setSnackopen(true);
      setSnackmessage(res.data.message);
      // alert(res.data.message);
    }

  };
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const departref = useRef(null);
  const returnref = useRef(null);
  const handleoutside = (e) => {
    if (departref.current && !departref.current.contains(e.target)) {
      // if clicked outside the calendar component, close the calendar
      setDateopener((prev) => ({
        ...prev,
        isopendepartdate: false,
        isopenreturndate: false,
      }));
      setTrip1((prev) => ({
        ...prev,
        calopen: false,
      }));
      setTrip2((prev) => ({
        ...prev,
        calopen: false,
      }));
      setTrip3((prev) => ({
        ...prev,
        calopen: false,
      }));
      setTrip4((prev) => ({
        ...prev,
        calopen: false,
      }));
      setTrip5((prev) => ({
        ...prev,
        calopen: false,
      }));
    }
    // else if(returnref.current && !returnref.current.contians(e.target)){
    //   setDateopener((prev) => ({
    //     ...prev,
    //     isopendepartdate: false,
    //     isopenreturndate: false
    //   }))
    // }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener("click", handleoutside);
  }, []);
  // search flights navigating to related pages
  const searchflights = async (type) => {
    dispatch(farequoteActions.reset_farequote());
    if (type === 1 || type === 2) {
      if (from.city_name === to.city_name) {
        setSnackopen(true);
        setSnackmessage("Origin and destination must not be the same");
        // alert("Origin and destination must not be the same");
        return;
      }
    } else {
      if (trip1.source.city_name === trip1.destination.city_name) {
        setSnackopen(true);
        setSnackmessage("trip1 origin and destination shouldn't be same");
        // alert("trip1 origin and destination shouldn't be same");
        return;
      } else if (trip2.source.city_name === trip2.destination.city_name) {
        setSnackopen(true);
        setSnackmessage("trip2 origin and destination shouldn't be same");
        // alert("trip2 origin and destination shouldn't be same");
        return;
      } else if (
        citiescount > 2 &&
        trip3.source.city_name === trip3.destination.city_name
      ) {
        setSnackopen(true);
        setSnackmessage("trip3 origin and destination shouldn't be same");
        // alert("trip3 origin and destination shouldn't be same");
        return;
      } else if (
        citiescount > 3 &&
        trip4.source.city_name === trip4.destination.city_name
      ) {
        setSnackopen(true);
        setSnackmessage("trip4 origin and destination shouldn't be same");
        // alert("trip4 origin and destination shouldn't be same");
        return;
      } else if (
        citiescount > 4 &&
        trip5.source.city_name === trip5.destination.city_name
      ) {
        setSnackopen(true);
        setSnackmessage("trip5 origin and destination shouldn't be same");
        // alert("trip5 origin and destination shouldn't be same");
        return;
      }
    }
    if (type == 1) {
      await fetchsearchedflights(type);

      localStorage.setItem("searchtype", 1);
    } else if (type == 2) {
      await fetchsearchedflights(type);
      localStorage.setItem("searchtype", 2);
    }
    // multicity departures
    else if (type == 3) {
      await fetchsearchedflights(type);
      localStorage.setItem("searchtype", 3);
    }
  };

  // getting paper height dynamically
  useEffect(() => {
    if (paperref.current) {
      setPaperheight(paperref.current.offsetHeight);
    }
  }, [value, citiescount]);
  //Adding cities to the multicity
  const addcity = () => {
    setCitiescount((prev) => prev + 1);
  };
  // removing cities from multicity
  const removecities = () => {
    setCitiescount((prev) => prev - 1);
  };
  // search based on types
  const searchsources = (type) => {
    setSearch(true);
    setSources(type);
  };
  // getting selected city on click using callback
  const selected_airport = (airport, val) => {
    // console.log(airport);
    if (val == 1) {
      setFrom(airport);
    } else if (val == 2) {
      setTo(airport);
    } else if (val == "t1s") {
      setTrip1((prev) => ({ ...prev, source: airport }));
    } else if (val == "t1d") {
      setTrip1((prev) => ({ ...prev, destination: airport }));
      setTrip2((prev) => ({ ...prev, source: airport }));
    } else if (val == "t2s") {
      setTrip2((prev) => ({ ...prev, source: airport }));
    } else if (val == "t2d") {
      setTrip2((prev) => ({ ...prev, destination: airport }));
      setTrip3((prev) => ({ ...prev, source: airport }));
    } else if (val == "t3s") {
      setTrip3((prev) => ({ ...prev, source: airport }));
    } else if (val == "t3d") {
      setTrip3((prev) => ({ ...prev, destination: airport }));
      setTrip4((prev) => ({ ...prev, source: airport }));
    } else if (val == "t4s") {
      setTrip4((prev) => ({ ...prev, source: airport }));
    } else if (val == "t4d") {
      setTrip4((prev) => ({ ...prev, destination: airport }));
      setTrip5((prev) => ({ ...prev, source: airport }));
    } else if (val == "t5s") {
      setTrip5((prev) => ({ ...prev, source: airport }));
    } else if (val == "t5d") {
      setTrip5((prev) => ({ ...prev, destination: airport }));
    }
  };
  return (
    <>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <SearchFlights
        open={search}
        close={() => setSearch(false)}
        sources={sources}
        airport={selected_airport}
      />
      <Loadingmodal open={loading} loadingclose={() => setLoading(false)} />
      <Travellerclass
        open={travellerclass}
        close={() => setTravellerclass(false)}
        adultCount={adult}
        infanyCount={infant}
        childCount={child}
        classes={travell_class}
      />
      <div className={gomainpag.over}>
        {/* Flights search */}

        <Grid container direction="column" className={gomainpag.tripspositions}>
          <Grid item sx={{ display: { xs: "none", md: "block" } }}>
            <img src={flight} width="100%" height="100%" alt="flight" />
          </Grid>
          <Grid item sx={{ display: { xs: "contents", md: "none" } }}>
            <img src={miniflight} width="100%" height="100%" alt="flight" />
          </Grid>
          <Grid item className={gomainpag.tripscard}>
            <Container maxWidth="xl">
              <Grid item>
                <Paper
                  ref={paperref}
                  sx={{
                    borderRadius: "1rem",
                    paddingBottom: "1rem!important",
                    zIndex: 9999,
                    background: "transparent",
                  }}
                  elevation={0}
                >
                  {/* mini nav bar */}
                  <Paper
                    sx={{
                      borderRadius: "1rem",
                      display: {
                        xs: "block",
                        md: "none",
                        margin: "1.3rem 0rem",
                      },
                    }}
                  >
                    <Mininav />
                  </Paper>
                  {/* flight search */}
                  <Paper
                    sx={{
                      borderRadius: "1rem",
                      paddingBottom: { md: 3, xs: 0 },
                    }}
                  >
                    <Grid container textAlign={"center"}>
                      <Grid item>
                        <TabContext value={value}>
                          <TabList
                            onChange={handleChange}
                            className={gomainpag.gotripslist}
                            aria-label="lab API tabs example"
                            // id="flight_tabFlex"
                            sx={{
                              marginLeft: {
                                md: "1.5rem !important",
                                xs: "0rem",
                              },
                            }}
                          >
                            <Tab
                              label="One Way"
                              disableRipple
                              value="1"
                              className={gomainpag.tabbtns}
                            />
                            <Tab
                              label="Round Trip"
                              disableRipple
                              value="2"
                              className={gomainpag.tabbtns}
                            />
                            <Tab
                              label="Multicity"
                              disableRipple
                              value="3"
                              className={gomainpag.tabbtns}
                            />
                          </TabList>
                          {/* one way */}
                          <TabPanel
                            value="1"
                            sx={{
                              "@media (max-width:899px)": { paddingTop: "0px" },
                            }}
                          >
                            <Grid container direction={"column"}>
                              <Grid item>
                                <Grid container spacing={1}>
                                  <Grid
                                    item
                                    md={2.5}
                                    sm={12}
                                    xs={12}
                                    className={gomainpag.gridspace}
                                  >
                                    <TextField
                                      fullWidth
                                      autoComplete="off"
                                      size="small"
                                      label="From"
                                      value={`${from?.city_name || ""} ${from?.city_code || ""
                                        }`}
                                      className={classes.search_root}
                                      // onChange={(e) => setFrom(e.target.value)}
                                      onClick={() => {
                                        searchsources(1);
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <FlightTakeoffIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={2.5}
                                    sm={12}
                                    xs={12}
                                    className={gomainpag.gridspace}
                                  >
                                    <TextField
                                      fullWidth
                                      size="small"
                                      autoComplete="off"
                                      label="To"
                                      value={`${to?.city_name || ""} ${to?.city_code || ""
                                        }`}
                                      className={classes.search_root}
                                      onChange={(e) => setTo(e.target.value)}
                                      onClick={() => {
                                        searchsources(2);
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <FlightLandIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={2}
                                    sm={6}
                                    xs={6}
                                    className={gomainpag.gridspace}
                                    ref={
                                      dateopener.isopendepartdate
                                        ? departref
                                        : returnref
                                    }
                                  >
                                    <TextField
                                      fullWidth
                                      size="small"
                                      autoComplete="off"
                                      label="Departure Date"
                                      value={dates.departdate}
                                      onClick={() =>
                                        setDateopener((prev) => ({
                                          ...prev,
                                          isopendepartdate: true,
                                        }))
                                      }
                                      className={classes.search_root}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <CalendarMonthIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                    {dateopener.isopendepartdate && (
                                      <Flightcalender
                                        selectdate={selected_date}
                                      />
                                    )}
                                  </Grid>
                                  <Grid
                                    item
                                    md={2}
                                    sm={6}
                                    xs={6}
                                    className={gomainpag.gridspace}
                                  >
                                    <TextField
                                      fullWidth
                                      autoComplete="off"
                                      size="small"
                                      label="Return Date"
                                      value={dates.returndate}
                                      onClick={returnclick}
                                    //   onClick={()=> { setDateopener((prev) => ({
                                    //     ...prev,
                                    //     isopenreturndate: true,
                                    //   }))
                                    //   setValue("2");
                                    // }}
                                      className={classes.search_root}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <CalendarMonthIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                    {/* {dateopener.isopenreturndate && (
                                      <Flightcalender selectdate={return_date} />
                                    )} */}
                                  </Grid>
                                  <Grid
                                    item
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    className={gomainpag.gridspace}
                                  >
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Traveller's & Class"
                                      value={`${traveller_class}${adult > 0 ? `, ${adult} adult` : ""
                                        }${child > 0 ? `, ${child} child` : ""}${infant > 0 ? `, ${infant} infant` : ""
                                        }`}
                                      // value={`${traveller_class},${adult}adult ,${child}Child,${infant}infant`}
                                      className={classes.search_root}
                                      onClick={() => setTravellerclass(true)}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <PersonIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                        className: gomainpag.travellersinput,
                                      }}
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant="contained"
                                  className={gomainpag.searchbtn}
                                  onClick={() => {
                                    searchflights(1);
                                  }}
                                >
                                  Search Flights
                                </Button>
                              </Grid>
                              <Grid item>
                                <img
                                  src={swap}
                                  alt="swapbutton"
                                  className={gomainpag.swapbtn}
                                  onClick={handleSwap}
                                />
                              </Grid>
                            </Grid>
                          </TabPanel>
                          {/* Round trip */}
                          <TabPanel
                            value="2"
                            sx={{
                              "@media (max-width:899px)": { paddingTop: "0px" },
                            }}
                          >
                            <Grid container direction={"column"}>
                              <Grid item>
                                <Grid container spacing={1}>
                                  <Grid
                                    item
                                    md={2.5}
                                    sm={12}
                                    xs={12}
                                    className={gomainpag.gridspace}
                                  >
                                    <TextField
                                      fullWidth
                                      size="small"
                                      autoComplete="off"
                                      className={classes.search_root}
                                      label="From"
                                      value={`${from?.city_name || ""} ${from?.city_code || ""
                                        }`}
                                      onChange={(e) => setFrom(e.target.value)}
                                      onClick={() => {
                                        searchsources(1);
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <FlightTakeoffIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={2.5}
                                    sm={12}
                                    xs={12}
                                    className={gomainpag.gridspace}
                                  >
                                    <TextField
                                      fullWidth
                                      size="small"
                                      autoComplete="off"
                                      className={classes.search_root}
                                      label="To"
                                      value={`${to?.city_name || ""} ${to?.city_code || ""
                                        }`}
                                      onChange={(e) => setTo(e.target.value)}
                                      onClick={() => {
                                        searchsources(2);
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <FlightLandIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={2}
                                    sm={6}
                                    xs={6}
                                    className={gomainpag.gridspace}
                                    ref={
                                      dateopener.isopendepartdate
                                        ? departref
                                        : returnref
                                    }
                                  >
                                    <TextField
                                      fullWidth
                                      size="small"
                                      autoComplete="off"
                                      className={classes.search_root}
                                      label="Departure Date"
                                      value={dates.departdate}
                                      onClick={() =>
                                        setDateopener((prev) => ({
                                          ...prev,
                                          isopendepartdate: true,
                                        }))
                                      }
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <CalendarMonthIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                    {dateopener.isopendepartdate && (
                                      <Flightcalender
                                        selectdate={selected_date}
                                      />
                                    )}
                                  </Grid>
                                  <Grid
                                    item
                                    md={2}
                                    sm={6}
                                    xs={6}
                                    className={gomainpag.gridspace}
                                    ref={
                                      dateopener.isopenreturndate
                                        ? departref
                                        : returnref
                                    }
                                  >
                                    <Grid
                                      item
                                      sx={{ marginRight: "10%!important" }}
                                      id="margin"
                                    >
                                      {" "}
                                      {dateopener.isopenreturndate && (
                                        <Flightcalender
                                          selectdate={return_date}
                                        />
                                      )}
                                    </Grid>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      autoComplete="off"
                                      className={classes.search_root}
                                      value={dates.returndate}
                                      onClick={() =>
                                        setDateopener((prev) => ({
                                          ...prev,
                                          isopenreturndate: true,
                                        }))
                                      }
                                      label="Return Date"
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <CalendarMonthIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    className={gomainpag.gridspace}
                                  >
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Traveller's & Class"
                                      className={classes.search_root}
                                      value={`${traveller_class}${adult > 0 ? `, ${adult} adult` : ""
                                        }${child > 0 ? `, ${child} child` : ""}${infant > 0 ? `, ${infant} infant` : ""
                                        }`}
                                      onClick={() => setTravellerclass(true)}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <PersonIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                        className: gomainpag.travellersinput,
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Button
                                  disableRipple
                                  variant="contained"
                                  className={gomainpag.searchbtn}
                                  onClick={() => {
                                    searchflights(2);
                                  }}
                                >
                                  Search Flights
                                </Button>
                              </Grid>
                              <Grid item>
                                <img
                                  src={swap}
                                  alt="swap button"
                                  className={gomainpag.swapbtn}
                                  onClick={handleSwap}
                                />
                              </Grid>
                            </Grid>
                          </TabPanel>
                          {/* Multicity */}
                          <TabPanel
                            value="3"
                            sx={{
                              "@media (max-width:899px)": { paddingTop: "0px" },
                            }}
                          >
                            <Grid container direction={"column"} spacing={2}>
                              {/* first trip  */}
                              <Grid item container spacing={2}>
                                {/* <Grid container spacing={2}> */}
                                <Grid container spacing={2} item md={6}>
                                  <Grid
                                    item
                                    md={6}
                                    sm={12}
                                    xs={12}
                                    className={gomainpag.gridspace}
                                  >
                                    <TextField
                                      size="small"
                                      label="From"
                                      autoComplete="off"
                                      className={clsx(
                                        classes.search_root,
                                        "clsx"
                                      )}
                                      value={`${trip1.source?.city_name || ""
                                        } ${trip1?.source?.city_code || ""}`}
                                      onClick={() => {
                                        searchsources("t1s");
                                      }}
                                      // onChange={(e) => setTrip1(prev=>({...prev,souce:e.target.value}))}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <FlightTakeoffIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      fullWidth
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={6}
                                    sm={12}
                                    xs={12}
                                    className={gomainpag.gridspace}
                                  >
                                    <TextField
                                      size="small"
                                      autoComplete="off"
                                      className={clsx(
                                        classes.search_root,
                                        "clsx"
                                      )}
                                      label="To"
                                      value={`${trip1.destination?.city_name || ""
                                        } ${trip1?.destination?.city_code || ""}`}
                                      // onChange={(e) => setTrip1(e.target.value)}
                                      onClick={() => {
                                        searchsources("t1d");
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <FlightLandIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      fullWidth
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color: styles.app_color,
                                        },
                                      }}
                                    />
                                  </Grid>

                                </Grid>
                                <Grid
                                  item
                                  md={2}
                                  sm={12}
                                  xs={12}
                                  className={gomainpag.gridspace}
                                  ref={trip1.calopen ? departref : returnref}
                                >
                                  <TextField
                                    size="small"
                                    autoComplete="off"
                                    label="Departure Date"
                                    className={classes.search_root}
                                    value={trip1.date}
                                    onClick={() =>
                                      setTrip1((prev) => ({
                                        ...prev,
                                        calopen: true,
                                      }))
                                    }
                                    InputLabelProps={{
                                      style: {
                                        color: styles.app_color,
                                      },
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <CalendarMonthIcon
                                            className={gomainpag.iconscolor}
                                          />
                                        </InputAdornment>
                                      ),
                                    }}
                                    fullWidth
                                    inputProps={{
                                      style: {
                                        fontWeight: "600",
                                        color: styles.app_color,
                                      },
                                    }}
                                  />
                                  {trip1.calopen && (
                                    <Flightcalender
                                      selectdate={multicitydeparture}
                                      trip="1"
                                    />
                                  )}
                                </Grid>

                                <Grid
                                  item
                                  md={4}
                                  sm={12}
                                  xs={12}
                                  className={gomainpag.gridspace}
                                >
                                  <TextField
                                    size="small"
                                    label="Traveller's & Class"
                                    className={classes.search_root}
                                    value={`${traveller_class}${adult > 0 ? `, ${adult} adult` : ""
                                      }${child > 0 ? `, ${child} child` : ""}${infant > 0 ? `, ${infant} infant` : ""
                                      }`}
                                    onClick={() => setTravellerclass(true)}
                                    InputLabelProps={{
                                      style: {
                                        color: styles.app_color,
                                      },
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <PersonIcon
                                            className={gomainpag.iconscolor}
                                          />
                                        </InputAdornment>
                                      ),
                                      className: gomainpag.travellersinput,
                                    }}
                                    fullWidth
                                    inputProps={{
                                      style: {
                                        fontWeight: "600",
                                        color: styles.app_color,
                                      },
                                    }}
                                  />
                                </Grid>
                                {/* </Grid> */}
                              </Grid>
                              {/* second trip */}
                              <Grid item>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    md={6}
                                    sm={12}
                                    xs={12}
                                    className={gomainpag.gridspace}
                                  >
                                    <Grid
                                      container
                                      spacing={2}
                                    // sx={{ position: "relative" }}
                                    >
                                      <Grid
                                        item
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        className={gomainpag.gridspace}
                                      >
                                        <TextField
                                          size="small"
                                          autoComplete="off"
                                          className={classes.search_root}
                                          label="From"
                                          value={`${trip2.source?.city_name || ""
                                            } ${trip2?.source?.city_code || ""}`}
                                          onClick={() => {
                                            searchsources("t2s");
                                          }}
                                          InputLabelProps={{
                                            style: {
                                              color: styles.app_color,
                                            },
                                          }}
                                          InputProps={{
                                            readOnly: true,
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <FlightTakeoffIcon
                                                  className={
                                                    gomainpag.iconscolor
                                                  }
                                                />
                                              </InputAdornment>
                                            ),
                                          }}
                                          fullWidth
                                          inputProps={{
                                            style: {
                                              fontWeight: "600",
                                              color: styles.app_color,
                                            },
                                          }}
                                        />
                                      </Grid>
                                      <Grid
                                        item
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        className={gomainpag.gridspace}
                                      >
                                        <TextField
                                          size="small"
                                          autoComplete="off"
                                          className={classes.search_root}
                                          label="To"
                                          value={`${trip2.destination?.city_name || ""
                                            } ${trip2?.destination?.city_code || ""
                                            }`}
                                          onClick={() => {
                                            searchsources("t2d");
                                          }}
                                          InputLabelProps={{
                                            style: {
                                              color: styles.app_color,
                                            },
                                          }}
                                          InputProps={{
                                            readOnly: true,
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <FlightLandIcon
                                                  className={
                                                    gomainpag.iconscolor
                                                  }
                                                />
                                              </InputAdornment>
                                            ),
                                          }}
                                          fullWidth
                                          inputProps={{
                                            style: {
                                              fontWeight: "600",
                                              color: styles.app_color,
                                            },
                                          }}
                                        />
                                      </Grid>

                                    </Grid>
                                  </Grid>
                                  <Grid
                                    item
                                    md={2}
                                    sm={12}
                                    xs={12}
                                    className={gomainpag.gridspace}
                                    ref={trip2.calopen ? departref : returnref}
                                  >
                                    <TextField
                                      size="small"
                                      autoComplete="off"
                                      label="Departure Date"
                                      onClick={() =>
                                        setTrip2((prev) => ({
                                          ...prev,
                                          calopen: true,
                                        }))
                                      }
                                      className={classes.search_root}
                                      value={trip2.date}
                                      InputLabelProps={{
                                        style: {
                                          color:  styles.app_color,
                                        },
                                      }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <CalendarMonthIcon
                                              className={gomainpag.iconscolor}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      fullWidth
                                      inputProps={{
                                        style: {
                                          fontWeight: "600",
                                          color:  styles.app_color,
                                        },
                                      }}
                                    />
                                    {trip2.calopen && (
                                      <Flightcalender
                                        selectdate={multicitydeparture}
                                        trip="2"
                                      />
                                    )}
                                  </Grid>
                                  {citiescount === 2 && (
                                    <Grid
                                      item
                                      md={2.5}
                                      sm={12}
                                      xs={12}
                                      className={gomainpag.gridspace}
                                    >
                                      <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                          border: `1px solid ${ styles.textcolor}`,
                                          padding: "0.5rem 0.8rem",
                                          borderRadius: "0.5rem",
                                        }}
                                        onClick={addcity}
                                      >
                                        <img src={add} alt="add" />
                                        <span
                                          style={{
                                            color:styles.textcolor,
                                            fontSize: "14px",
                                            fontWeight: "600",
                                          }}
                                        >
                                          Add Another City
                                        </span>
                                      </Stack>
                                    </Grid>
                                  )}
                                </Grid>
                              </Grid>
                              {/* third trip */}
                              {citiescount > 2 && (
                                <Grid item>
                                  <Grid container spacing={2}>
                                    <Grid
                                      item
                                      md={6}
                                      sm={12}
                                      xs={12}
                                      className={gomainpag.gridspace}
                                    >
                                      <Grid
                                        container
                                        spacing={2}
                                        sx={{ position: "relative" }}
                                      >
                                        <Grid
                                          item
                                          md={6}
                                          sm={12}
                                          xs={12}
                                          className={gomainpag.gridspace}
                                        >
                                          <TextField
                                            size="small"
                                            autoComplete="off"
                                            className={classes.search_root}
                                            label="From"
                                            value={`${trip3.source?.city_name || ""
                                              } ${trip3?.source?.city_code || ""
                                              }`}
                                            onClick={() => {
                                              searchsources("t3s");
                                            }}
                                            InputLabelProps={{
                                              style: {
                                                color: styles.app_color,
                                              },
                                            }}
                                            InputProps={{
                                              readOnly: true,
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <FlightTakeoffIcon
                                                    className={
                                                      gomainpag.iconscolor
                                                    }
                                                  />
                                                </InputAdornment>
                                              ),
                                            }}
                                            fullWidth
                                            inputProps={{
                                              style: {
                                                fontWeight: "600",
                                                color: styles.app_color,
                                              },
                                            }}
                                          />
                                        </Grid>
                                        <Grid
                                          item
                                          md={6}
                                          sm={12}
                                          xs={12}
                                          className={gomainpag.gridspace}
                                        >
                                          <TextField
                                            size="small"
                                            autoComplete="off"
                                            className={classes.search_root}
                                            label="To"
                                            value={`${trip3.destination?.city_name || ""
                                              } ${trip3?.destination?.city_code ||
                                              ""
                                              }`}
                                            onClick={() => {
                                              searchsources("t3d");
                                            }}
                                            InputLabelProps={{
                                              style: {
                                                color: styles.app_color,
                                              },
                                            }}
                                            InputProps={{
                                              readOnly: true,
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <FlightLandIcon
                                                    className={
                                                      gomainpag.iconscolor
                                                    }
                                                  />
                                                </InputAdornment>
                                              ),
                                            }}
                                            fullWidth
                                            inputProps={{
                                              style: {
                                                fontWeight: "600",
                                                color: styles.app_color,
                                              },
                                            }}
                                          />
                                        </Grid>

                                      </Grid>
                                    </Grid>
                                    <Grid
                                      item
                                      md={2}
                                      sm={12}
                                      xs={12}
                                      className={gomainpag.gridspace}
                                      ref={
                                        trip3.calopen ? departref : returnref
                                      }
                                    >
                                      <TextField
                                        size="small"
                                        autoComplete="off"
                                        label="Departure Date"
                                        className={classes.search_root}
                                        onClick={() =>
                                          setTrip3((prev) => ({
                                            ...prev,
                                            calopen: true,
                                          }))
                                        }
                                        value={trip3.date}
                                        InputLabelProps={{
                                          style: {
                                            color: styles.app_color,
                                          },
                                        }}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <CalendarMonthIcon
                                                className={gomainpag.iconscolor}
                                              />
                                            </InputAdornment>
                                          ),
                                        }}
                                        fullWidth
                                        inputProps={{
                                          style: {
                                            fontWeight: "600",
                                            color: styles.app_color,
                                          },
                                        }}
                                      />
                                      {trip3.calopen && (
                                        <Flightcalender
                                          selectdate={multicitydeparture}
                                          trip="3"
                                        />
                                      )}
                                    </Grid>
                                    {citiescount === 3 && (
                                      <Grid
                                        item
                                        md={2.5}
                                        sm={12}
                                        xs={12}
                                        className={gomainpag.gridspace}
                                      >
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          sx={{
                                            border: `1px solid ${ styles.textcolor}`,
                                            padding: "0.5rem 0.8rem",
                                            borderRadius: "0.5rem",
                                          }}
                                          onClick={addcity}
                                        >
                                          <img src={add} alt="add" />
                                          <span
                                            style={{
                                              color:  styles.textcolor,
                                              fontSize: "14px",
                                              fontWeight: "600",
                                            }}
                                          >
                                            Add Another City
                                          </span>
                                        </Stack>
                                      </Grid>
                                    )}
                                    {citiescount === 3 && (
                                      <Grid
                                        item
                                        md={1.5}
                                        sm={12}
                                        xs={12}
                                        className={gomainpag.gridspace}
                                        textAlign="right"
                                      >
                                        <Stack
                                          direction="row"
                                          onClick={removecities}
                                          justifyContent="center"
                                          alignItems="center"
                                          spacing={1}
                                          sx={{
                                            border: `1px solid ${ styles.textcolor}`,
                                            padding: "0.5rem 0.8rem",
                                            borderRadius: "0.5rem",
                                            borderColor: "#D02626",
                                          }}
                                        >
                                          <img src={Remove} alt="add" />
                                          <span
                                            style={{
                                              color: "#D02626",
                                              fontSize: "14px",
                                              fontWeight: "600",
                                            }}
                                          >
                                            Remove
                                          </span>
                                        </Stack>
                                      </Grid>
                                    )}
                                  </Grid>
                                </Grid>
                              )}
                              {/* fourth trip */}
                              {citiescount > 3 && (
                                <Grid item>
                                  <Grid container spacing={2}>
                                    <Grid
                                      item
                                      md={6}
                                      sm={12}
                                      xs={12}
                                      className={gomainpag.gridspace}
                                    >
                                      <Grid
                                        container
                                        spacing={2}
                                      // sx={{ position: "relative" }}
                                      >
                                        <Grid
                                          item
                                          md={6}
                                          sm={12}
                                          xs={12}
                                          className={gomainpag.gridspace}
                                        >
                                          <TextField
                                            size="small"
                                            autoComplete="off"
                                            className={classes.search_root}
                                            label="From"
                                            value={`${trip4.source?.city_name || ""
                                              } ${trip4?.source?.city_code || ""
                                              }`}
                                            onClick={() => {
                                              searchsources("t4s");
                                            }}
                                            InputLabelProps={{
                                              style: {
                                                color:  styles.app_color,
                                              },
                                            }}
                                            InputProps={{
                                              readOnly: true,
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <FlightTakeoffIcon
                                                    className={
                                                      gomainpag.iconscolor
                                                    }
                                                  />
                                                </InputAdornment>
                                              ),
                                            }}
                                            fullWidth
                                            inputProps={{
                                              style: {
                                                fontWeight: "600",
                                                color: styles.app_color,
                                              },
                                            }}
                                          />
                                        </Grid>
                                        <Grid
                                          item
                                          md={6}
                                          sm={12}
                                          xs={12}
                                          className={gomainpag.gridspace}
                                        >
                                          <TextField
                                            size="small"
                                            autoComplete="off"
                                            className={classes.search_root}
                                            label="To"
                                            value={`${trip4.destination?.city_name || ""
                                              } ${trip4?.destination?.city_code ||
                                              ""
                                              }`}
                                            onClick={() => {
                                              searchsources("t4d");
                                            }}
                                            InputLabelProps={{
                                              style: {
                                                color: styles.app_color,
                                              },
                                            }}
                                            InputProps={{
                                              readOnly: true,
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <FlightLandIcon
                                                    className={
                                                      gomainpag.iconscolor
                                                    }
                                                  />
                                                </InputAdornment>
                                              ),
                                            }}
                                            fullWidth
                                            inputProps={{
                                              style: {
                                                fontWeight: "600",
                                                color: styles.app_color,
                                              },
                                            }}
                                          />
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid
                                      item
                                      md={2}
                                      sm={12}
                                      xs={12}
                                      className={gomainpag.gridspace}
                                      ref={
                                        trip4.calopen ? departref : returnref
                                      }
                                    >
                                      <TextField
                                        size="small"
                                        autoComplete="off"
                                        label="Departure Date"
                                        className={classes.search_root}
                                        onClick={() =>
                                          setTrip4((prev) => ({
                                            ...prev,
                                            calopen: true,
                                          }))
                                        }
                                        value={trip4.date}
                                        InputLabelProps={{
                                          style: {
                                            color: styles.app_color,
                                          },
                                        }}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <CalendarMonthIcon
                                                className={gomainpag.iconscolor}
                                              />
                                            </InputAdornment>
                                          ),
                                        }}
                                        fullWidth
                                        inputProps={{
                                          style: {
                                            fontWeight: "600",
                                            color: styles.app_color,
                                          },
                                        }}
                                      />
                                      {trip4.calopen && (
                                        <Flightcalender
                                          selectdate={multicitydeparture}
                                          trip="4"
                                        />
                                      )}
                                    </Grid>

                                    {citiescount == 4 && (
                                      <Grid
                                        item
                                        md={2.5}
                                        sm={12}
                                        xs={12}
                                        className={gomainpag.gridspace}
                                      >
                                        <Stack
                                          direction="row"
                                          onClick={addcity}
                                          spacing={1}
                                          sx={{
                                            border: `1px solid ${ styles.textcolor}`,
                                            padding: "0.5rem 0.8rem",
                                            borderRadius: "0.5rem",
                                          }}
                                        >
                                          <img src={add} alt="add" />
                                          <span
                                            style={{
                                              color: styles.textcolor,
                                              fontSize: "14px",
                                              fontWeight: "600",
                                            }}
                                          >
                                            Add Another City
                                          </span>
                                        </Stack>
                                      </Grid>
                                    )}
                                    {citiescount == 4 && (
                                      <Grid item md={1.5} textAlign="right">
                                        <Stack
                                          direction="row"
                                          onClick={removecities}
                                          justifyContent="center"
                                          alignItems="center"
                                          spacing={1}
                                          sx={{
                                            border: `1px solid ${ styles.textcolor}`,
                                            padding: "0.5rem 0.8rem",
                                            borderRadius: "0.5rem",
                                            borderColor: "#D02626",
                                          }}
                                        >
                                          <img src={Remove} alt="add" />
                                          <span
                                            style={{
                                              color: "#D02626",
                                              fontSize: "14px",
                                              fontWeight: "600",
                                            }}
                                          >
                                            Remove
                                          </span>
                                        </Stack>
                                      </Grid>
                                    )}
                                  </Grid>
                                </Grid>
                              )}
                              {/* fifth trip */}
                              {citiescount > 4 && (
                                <Grid item>
                                  <Grid container spacing={2}>
                                    <Grid item md={6}>
                                      <Grid
                                        container
                                        spacing={2}
                                      // sx={{ position: "relative" }}
                                      >
                                        <Grid
                                          item
                                          md={6}
                                          sm={12}
                                          xs={12}
                                          className={gomainpag.gridspace}
                                        >
                                          <TextField
                                            size="small"
                                            autoComplete="off"
                                            className={classes.search_root}
                                            label="From"
                                            value={`${trip5.source?.city_name || ""
                                              } ${trip5?.source?.city_code || ""
                                              }`}
                                            onClick={() => {
                                              searchsources("t5s");
                                            }}
                                            InputLabelProps={{
                                              style: {
                                                color:  styles.app_color,
                                              },
                                            }}
                                            InputProps={{
                                              readOnly: true,
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <FlightTakeoffIcon
                                                    className={
                                                      gomainpag.iconscolor
                                                    }
                                                  />
                                                </InputAdornment>
                                              ),
                                            }}
                                            fullWidth
                                            inputProps={{
                                              style: {
                                                fontWeight: "600",
                                                color: styles.app_color,
                                              },
                                            }}
                                          />
                                        </Grid>
                                        <Grid
                                          item
                                          md={6}
                                          sm={12}
                                          xs={12}
                                          className={gomainpag.gridspace}
                                        >
                                          <TextField
                                            size="small"
                                            autoComplete="off"
                                            className={classes.search_root}
                                            label="To"
                                            value={`${trip5.destination?.city_name || ""
                                              } ${trip5?.destination?.city_code ||
                                              ""
                                              }`}
                                            onClick={() => {
                                              searchsources("t5d");
                                            }}
                                            InputLabelProps={{
                                              style: {
                                                color:  styles.app_color,
                                              },
                                            }}
                                            InputProps={{
                                              readOnly: true,
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <FlightLandIcon
                                                    className={
                                                      gomainpag.iconscolor
                                                    }
                                                  />
                                                </InputAdornment>
                                              ),
                                            }}
                                            fullWidth
                                            inputProps={{
                                              style: {
                                                fontWeight: "600",
                                                color:  styles.app_color,
                                              },
                                            }}
                                          />
                                        </Grid>

                                      </Grid>
                                    </Grid>
                                    <Grid
                                      item
                                      md={2}
                                      sm={12}
                                      xs={12}
                                      className={gomainpag.gridspace}
                                      ref={
                                        trip5.calopen ? departref : returnref
                                      }
                                    >
                                      <TextField
                                        size="small"
                                        autoComplete="off"
                                        label="Departure Date"
                                        className={classes.search_root}
                                        onClick={() =>
                                          setTrip5((prev) => ({
                                            ...prev,
                                            calopen: true,
                                          }))
                                        }
                                        value={trip5.date}
                                        InputLabelProps={{
                                          style: {
                                            color:  styles.app_color,
                                          },
                                        }}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <CalendarMonthIcon
                                                className={gomainpag.iconscolor}
                                              />
                                            </InputAdornment>
                                          ),
                                        }}
                                        fullWidth
                                        inputProps={{
                                          style: {
                                            fontWeight: "600",
                                            color: styles.app_color,
                                          },
                                        }}
                                      />
                                      {trip5.calopen && (
                                        <Flightcalender
                                          selectdate={multicitydeparture}
                                          trip="5"
                                        />
                                      )}
                                    </Grid>

                                    <Grid
                                      item
                                      md={2}
                                      sm={12}
                                      xs={12}
                                      className={gomainpag.gridspace}
                                      textAlign="right"
                                    >
                                      <Stack
                                        direction="row"
                                        onClick={removecities}
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={1}
                                        sx={{
                                          border: `1px solid ${ styles.textcolor}`,
                                          padding: "0.5rem 0.8rem",
                                          borderRadius: "0.5rem",
                                          borderColor: "#D02626",
                                        }}
                                      >
                                        <img src={Remove} alt="add" />
                                        <span
                                          style={{
                                            color: "#D02626",
                                            fontSize: "14px",
                                            fontWeight: "600",
                                          }}
                                        >
                                          Remove
                                        </span>
                                      </Stack>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              )}
                              <Grid item textAlign={"center"}>
                                <Button
                                  disableRipple
                                  variant="contained"
                                  // className={gomainpag.searchbtn}
                                  className={gomainpag.searchbtn}
                                  // sx= {{
                                  //   position: "absolute!important",
                                  //   top: `${citiescount==2?91:citiescount===3?92:citiescount===4?95:citiescount===5&&95}%`,
                                  //   right: "47%!important",
                                  //   backgroundColor: `${ styles.app_color}!important`,
                                  //   color: "#fff",
                                  //   fontSize: "1rem",
                                  //   padding: "0.5rem 3rem!important",
                                  // }}
                                  onClick={() => searchflights(3)}
                                  sx={{
                                    "@media (max-width:599px)": {
                                      marginTop: "0.5rem !important",
                                    },
                                    top: "93%",
                                  }}
                                >
                                  Search Flights
                                </Button>
                              </Grid>
                              {/* <Grid item><img src={swap} alt="swap button" className={gomainpag.swapbtn} onClick={handleSwap}/></Grid> */}
                            </Grid>
                          </TabPanel>

                        </TabContext>
                      </Grid>
                    </Grid>
                  </Paper>
                </Paper>
              </Grid>
            </Container>
          </Grid>
        </Grid>

        {/* all offers for buses and flights */}
        {/* <Grid container>
          <Container
            sx={{
              marginTop: {
                xs: `${paperheight - 20}px`,
                md: `${paperheight - 100}px`,
              },
              padding: { xs: "0px", md: "1rem" },
            }}
            maxWidth="xl"
          >
            <Box
              className={gomainpag.flightscarousel}
              boxShadow={3}
              sx={{ boxShadow: { md: "3", sm: "3", xs: "0" } }}
            >
              <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body1"
                  sx={{
                    paddingLeft: {
                      md: "14px",
                      sm: "15px",
                      xs: "8px",
                      fontWeight: "bold",
                    },
                  }}
                >
                  All offers
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    paddingRight: {
                      md: "14px",
                      sm: "15px",
                      xs: "14px",
                      fontWeight: "bold",
                    },
                  }}
                >
                  view all
                </Typography>
              </Grid>
              <Grid item id="carsel">
                <OffersCarousel />
              </Grid>
            </Box>
          </Container>
        </Grid> */}
        <Grid item mt={{ md: 5, xs: 1 }}>
          <Container maxWidth="xl">
            <OffersCarousel paperheight={paperheight} />
          </Container>
        </Grid>

        {/* Popular destinations */}
        <Grid contianer sx={{ mt: 3 }}>
          <Container maxWidth="xl">
            <Grid item>
              <Typography sx={{color: styles.app_color}}variant="p">
                Popular Destinations
              </Typography>
            </Grid>
            <Grid item>
              <Carousel responsive={destinationresponsive}>
                {destinations.map((item, index) => {
                  return (
                    <div key={index}>
                      <img
                        className="imgsize"
                        src={item.image}
                        alt={item.text}
                      />
                      <Typography
                        className={gomainpag.destinationtext}
                        variant="body1"
                      >
                        {item.text}
                      </Typography>
                    </div>
                  );
                })}
              </Carousel>
            </Grid>
          </Container>
        </Grid>
        {/* Download the app  */}
       
        {/* <Container
          sx={{ marginTop: "2%", display: { sm: "block", xs: "none" } }}
          maxWidth="xl"
        >
          <Typography sx={{color: styles.app_color}} variant="body1">
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
                      height="50%"
                    />
                  </a>
                  <a href="https://www.apple.com/in/app-store/">
                    <img
                      src="https://www.tacuonline.com/wp-content/uploads/sites/2/2015/09/app-store-logo-1.png"
                      alt=""
                      width="100%"
                      height="50%"
                    />
                  </a>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Container> */}
        {/* <Container > */}
        {/* </Container> */}
        <Footer />
      </div>
    </>
  );
};

export default Flightsearch;
