import React, { useEffect, useRef } from "react";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import {
  Paper,
  Tab,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Container,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import add from "../../../assets/images/add.svg";
import Remove from "../../../assets/images/Remove.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  gomainpage,
  aftersearchflights,
  muitextfieldborder,
} from "../../../assets/styles/Flights.jsx";
import personblue from "../../../assets/images/personblue.svg";
import swapicon from "../../../assets/images/swapicon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Travellerclass from "../../modals/Flightmodals/Travellerclass";
import Flightcalender from "./Flightcalender";
import SearchFlights from "../../modals/Flightmodals/SearchFlights";
import axios from "axios";
import { FlightsearchActions } from "../../../store/FlightsearchSlice";
import Loadingmodal from "../../modals/Signupmodals/Loadingmodal";
import { envdata } from '../../Envexports'
import MySnackbar from "../../modals/Signupmodals/Snackbar";
import {styles} from '../../../assets/styles/Styles_export'
// const useStyles = makeStyles({
//   root: {
//     background: 'transparent', // set the background color to transparent
//     boxShadow: 'none', // remove the box shadow
//     '&:not(:last-child)': {
//       borderBottom: 0 // remove the border at the bottom of the last accordion
//     },
//     '&:before': {
//       display: 'none' // remove the arrow icon
//     }
//   }
// });
const FlightsSearch = (props) => {
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  // const clip=useStyles()
  const classes = gomainpage();
  const classes1 = muitextfieldborder();
  const aftersearchflight = aftersearchflights();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Getting the data from the redux store
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
  const travel_class = travellersclass.classes;
  const tripcount = useSelector(
    (state) => state.flightsearches.multicitytripcount
  );
  const waytype = useSelector((state) => state.flightsearches.waytype);
  const searcheddata = useSelector(
    (state) => state.flightsearches.Fsearcheddata
  );
  const flights_api_data = useSelector(
    (state) => state.flightsearches.Flightsdata
  );
  // states for the whole component
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [value, setValue] = React.useState(1);
  const [tripscount, setTripscount] = useState(2);
  const [travellermodel, setTravellermodel] = useState(false);
  const [dateopener, setDateopener] = useState({
    isOdepartdata: false,
    isOreturndata: false,
  });
  const [dates, setDates] = useState({
    departdate: new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    returndate: "",
  });
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
    source: "",
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
  const [multicities, setMulticities] = useState([]);
  const [airportsmodel, setAirportsmodel] = useState(false);
  const [sources, setSources] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleoutside);
  }, []);
  const departref = useRef(null);
  const returnref = useRef(null);
  const handleoutside = (e) => {
    if (departref.current && !departref.current.contains(e.target)) {
      // if clicked outside the calendar component, close the calendar
      setDateopener((prev) => ({
        ...prev,
        isOdepartdata: false,
        isOreturndata: false,
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

  // converting long date to isostring
  // console.log(dep_c)
  const datetoIso = (date) => {
    console.log(date);
    const inputDate = new Date(date);
    inputDate.setMinutes(
      inputDate.getMinutes() - inputDate.getTimezoneOffset()
    );
    const isodate = inputDate.toISOString().slice(0, 10);
    return isodate;
  };
  // console.log(window.performance.navigation.type)

  // useEffect(()=>{
  //   let searchobj = {
  //     "adultCount":adult_c,
  //     "childCount": child_c,
  //     "infantCount": infant_c,
  //     "journeyType": jrny_c,
  //     "segments": [
  //       {
  //         "Origin": ori_c[0],
  //         "Destination": des_c[0]?? "",
  //         "FlightCabinClass": cabin_c,
  //         "PreferredDepartureTime": datetoIso(dep_c[0]),
  //       },
  //     ],
  //   };
  //   const oneway_search=async()=>{
  //     alert("refresh of data")
  //     const res = await axios.post("http://13.232.239.148/search", searchobj);
  //       return res.data.data
  //   }
  //   const search_refresh=async()=>{
  //     console.log(window.performance.navigation.type)
  //     if(window.performance.navigation.type===1){
  //       alert("page refresh")
  //       const result =await oneway_search();
  //       // console.log(val)
  //         dispatch(FlightsearchActions.Flights_search_dataupdate([{source:{city_code:ori_c[0],city_name:ori_c[1]},destination:{city_code:des_c[0],city_name:des_c[1]},departdate:dep_c[1]},{flightsdata:result.FlightDetails},result.TraceId,jrny_c]))
  //       }
  //   }
  //   search_refresh()

  // },[])
  useEffect(() => {
    setTripscount(tripcount);
    if (waytype === 1) {
      setValue(1);
      setDates((prev) => ({ ...prev, departdate: searcheddata.departdate }));
      setFrom(searcheddata.source);
      setTo(searcheddata.destination);
    } else if (waytype === 2) {
      setValue(2);
      setDates((prev) => ({
        ...prev,
        departdate: searcheddata.departdate,
        returndate: searcheddata.returndate,
      }));
      setFrom(searcheddata.source);
      setTo(searcheddata.destination);
    } else if (waytype === 3) {
      setValue(3);
      setTrip1(searcheddata[0]);
      setTrip2(searcheddata[1]);
      setTrip3(searcheddata[2]);
      setTrip4(searcheddata[3]);
      setTrip5(searcheddata[4]);
      //  let cities=[trip1?.source?.city_name,trip1?.Destination?.city_name,trip2?.source?.city_name,trip2?.Destination?.city_name,trip3?.source?.city_name,trip3?.Destination?.city_name,trip4?.source?.city_name,trip4?.Destination?.city_name,trip5?.source?.city_name,trip5?.Destination?.city_name]
      // console.log(cities,"before filtet")
      // cities = cities.filter((value,index) => {
      //   if(value !== undefined){
      //     return true
      //   }

      //  });
      //  console.log(cities,"cities")
      // setMulticities([...new Set(cities)])
    }
  }, [searcheddata]);
  useEffect(() => {
    const cities_selected = async () => {
      let cities = [
        trip1?.source?.city_name,
        trip1?.destination?.city_name,
        trip2?.source?.city_name,
        trip2?.destination?.city_name,
        trip3?.source?.city_name,
        trip3?.destination?.city_name,
        trip4?.source?.city_name,
        trip4?.destination?.city_name,
        trip5?.source?.city_name,
        trip5?.destination?.city_name,
      ];

      let city;
      let same = false;
      cities = await cities.filter((value, index) => value !== undefined);
      if (cities[0] === cities[cities.length - 1]) {
        same = true;
        city = cities[0];
      }
      const unique = new Set(cities);
      let Final_Cities = Array.from(unique);
      if (same) {
        Final_Cities.push(city);
      }
      setMulticities([...Final_Cities]);
    };
    cities_selected();
  }, [trip1, trip2, trip3, trip4, trip5]);
  // add cities to multicity tripscount
  const addcities = () => {
    setTripscount((prev) => prev + 1);
  };
  // Remove cities from multicity tripscount
  const removecities = () => {
    setTripscount((prev) => prev - 1);
  };
  // Tabs change
  const handleChange = (event, newValue) => {
    if (newValue === 1) {
      setDates((prev) => ({ ...prev, returndate: "" }));
    }
    setValue(newValue);
  };
  // Swapping functionality
  function handleSwap() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }
  const searchflights = () => {
    navigate("/searchedflights");
  };
  // getting the departure date from calender using callback
  const departure_date = (date) => {
    const modifieddate = new Date(date);
    const formattedDate = modifieddate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setDates((prev) => ({ ...prev, departdate: formattedDate }));
    setDateopener((prev) => ({ ...prev, isOdepartdata: false }));
  };
  // getting the return date from calender using the callback
  const return_date = (date) => {
    const modifieddate = new Date(date);
    const formattedDate = modifieddate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setDates((prev) => ({ ...prev, returndate: formattedDate }));
    setDateopener((prev) => ({ ...prev, isOreturndata: false }));
  };
  // return date opener
  const returndateopener = () => {
    // setDateopener(prev=>({...prev,isOreturndata:true}))
    setValue(2);
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
  // setting sources for airport list
  const searchsources = (type) => {
    setAirportsmodel(true);
    setSources(type);
  };
  // getting data form airportmodel using callback
  const selected_airport = (airport, val) => {
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

  const handlesearch = async () => {
    let searchobj;
    let segments = [];
    let searchData_From = [];
    let searchData_To = [];
    let userid = localStorage.getItem("userid");
    if (value === 1 || value === 2) {
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
        tripscount > 2 &&
        trip3.source.city_name === trip3.destination.city_name
      ) {
        setSnackopen(true);
        setSnackmessage("trip3 origin and destination shouldn't be same");
        // alert("trip3 origin and destination shouldn't be same");
        return;
      } else if (
        tripscount > 3 &&
        trip4.source.city_name === trip4.destination.city_name
      ) {
        setSnackopen(true);
        setSnackmessage("trip4 origin and destination shouldn't be same");
        // alert("trip4 origin and destination shouldn't be same");
        return;
      } else if (
        tripscount > 4 &&
        trip5.source.city_name === trip5.destination.city_name
      ) {
        setSnackopen(true);
        setSnackmessage("trip5 origin and destination shouldn't be same");
        // alert("trip5 origin and destination shouldn't be same");
        return;
      }
    }
    setLoading(true);

    if (value === 1) {
      searchobj = {
        adultCount: travellersclass.adult,
        childCount: travellersclass.child,
        infantCount: travellersclass.infant,
        journeyType: 1,
        segments: [
          {
            Origin: from?.city_code ?? "",
            Destination: to?.city_code ?? "",
            FlightCabinClass: 1,
            PreferredDepartureTime: datetoIso(dates.departdate),
          },
        ],
      };
    } else if (value === 2) {
      searchobj = {
        adultCount: travellersclass.adult,
        childCount: travellersclass.child,
        infantCount: travellersclass.infant,
        journeyType: 2,
        segments: [
          {
            Origin: from?.city_code,
            Destination: to?.city_code ?? "",
            FlightCabinClass: 1,
            PreferredDepartureTime: datetoIso(dates.departdate),
            PreferredArrivalTime: datetoIso(dates.departdate),
          },
          {
            Origin: to?.city_code ?? "",
            Destination: from?.city_code,
            FlightCabinClass: 1,
            PreferredDepartureTime: datetoIso(dates.returndate),
            PreferredArrivalTime: datetoIso(dates.returndate),
          },
        ],
      };
    } else if (value === 3) {
      // alert("multicity")
      // console.log("multicity")
      let segments_obj = [];
      let error = false;
      for (let i = 1; i <= tripscount; i++) {
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
          FlightCabinClass: "1",
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

    if (userid !== null) {
      if (value === 1 || value === 2) {
        searchobj.user_id = userid;
        searchobj.searchDataFrom = [from];
        searchobj.searchDataTo = [to];
      } else if (value === 3) {
        searchobj.user_id = userid;
        searchobj.searchDataFrom = searchData_From;
        searchobj.searchDataTo = searchData_To;
      }
    }
    console.log(searchobj);
    const res = await axios.post(`${envdata.baseurl}/search`, searchobj);
    // console.log(res.data)
    let status = res.data.status;
    let jrney_type = res.data.data.JourneyType;
    if (jrney_type === 1 && status) {
      dispatch(
        FlightsearchActions.Flights_search_dataupdate([
          { source: from, destination: to, departdate: dates.departdate },
          { flightsdata: res.data.data.FlightDetails },
          res.data.data.TraceId,
          1,
        ])
      );
      navigate("/Flights/OW_flights");
      setLoading(false);
    }
     else if (jrney_type === 2 && status) {
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
      navigate("/Flights/RT_flights");
      setLoading(false);
    } 
    else if (jrney_type === 3 && status) {
      dispatch(
        FlightsearchActions.Flights_search_dataupdate([
          segments,
          { flightsdata: res.data.data.FlightDetails },
          res.data.data.TraceId,
          3,
        ])
      );
      navigate("/Flights/MC_flights");
      setLoading(false);
    }
    // props?.close();
  };
  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Travellerclass
        open={travellermodel}
        close={() => setTravellermodel(false)}
        adultCount={adult}
        infanyCount={infant}
        childCount={child}
        classes={travel_class}
      />
      <Loadingmodal open={loading} loadingclose={() => setLoading(false)} />
      <SearchFlights
        open={airportsmodel}
        close={() => setAirportsmodel(false)}
        sources={sources}
        airport={selected_airport}
      />
      <Container
        maxWidth="xl"
        sx={{
          paddingTop: { xs: "0rem", md: "3rem" },
          paddingX: { xs: "0px", md: "16px" },
        }}
      >
        <Paper
          sx={{
            borderRadius: "1rem",
            paddingBottom: "1rem!important",
            paddingTop: "1rem",
          }}
        >
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              className={classes.gotripslist}
              aria-label="lab API tabs example"
              variant="scrollable"
              orientation="horizontal"
              scrollButtons={"off"}
            >
              <Tab
                label="One Way"
                disableRipple
                value={1}
                // sx={{ textTransform: "none",height:'0rem!important' }}
                className={classes.tabbtns}
              />
              <Tab
                label="Round Trip"
                disableRipple
                value={2}
                className={classes.tabbtns}
              />
              <Tab
                label="Multicity"
                disableRipple
                value={3}
                className={classes.tabbtns}
              />
            </TabList>
            {/* one way */}
            <TabPanel value={1} sx={{ padding: "0.5rem 1rem" }}>
              <Grid container direction={"column"}>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item md={5}>
                      <Grid container spacing={2} sx={{ position: "relative" }}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            label="From"
                            //value={from?.city_name||""}
                            value={`${from?.city_name || ""} ${from?.city_code || ""
                              }`}
                            className={classes1.search_root}
                            // onChange={(e) => setFrom(e.target.value)}
                            onClick={() => searchsources(1)}
                            InputLabelProps={{
                              style: {
                                color:  styles.app_color,
                              },
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FlightTakeoffIcon
                                    className={classes.iconscolor}
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
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            label="To"
                            value={`${to?.city_name || ""} ${to?.city_code || ""
                              }`}
                            className={classes1.search_root}
                            // onChange={(e) => setTo(e.target.value)}
                            onClick={() => searchsources(2)}
                            InputLabelProps={{
                              style: {
                                color:  styles.app_color,
                              },
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FlightLandIcon
                                    className={classes.iconscolor}
                                  />
                                </InputAdornment>
                              ),
                            }}
                            inputProps={{
                              style: {
                                fontWeight: "600",
                                color: styles.app_color,
                              },
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <span
                            className="flight_search_swapIcon"
                            onClick={handleSwap}
                          >
                            <img src={swapicon} alt="swap" />
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      md={2}
                      xs={6}
                      ref={dateopener.isOdepartdata ? departref : returnref}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        autoComplete="off"
                        label="Departure Date"
                        className={classes1.search_root}
                        value={dates.departdate}
                        onClick={() =>
                          setDateopener((prev) => ({
                            ...prev,
                            isOdepartdata: true,
                          }))
                        }
                        InputLabelProps={{
                          style: {
                            color:  styles.app_color,
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonthIcon
                                className={classes.iconscolor}
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
                      {dateopener.isOdepartdata && (
                        <Flightcalender selectdate={departure_date} />
                      )}
                    </Grid>
                    <Grid
                      item
                      md={2}
                      xs={6}
                      ref={dateopener.isOreturndata ? departref : returnref}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        autoComplete="off"
                        label="Return Date"
                        className={classes1.search_root}
                        value={dates.returndate}
                        onClick={returndateopener}
                        InputLabelProps={{
                          style: {
                            color:  styles.app_color,
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonthIcon
                                className={classes.iconscolor}
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
                      {dateopener.isOreturndata && (
                        <Flightcalender selectdate={return_date} />
                      )}
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Traveller's Class"
                        value={`${traveller_class}${adult > 0 ? `, ${adult} adult` : ""
                          }${child > 0 ? `, ${child} child` : ""}${infant > 0 ? `, ${infant} infant` : ""
                          }`}
                        className={classes1.search_root}
                        onClick={() => setTravellermodel(true)}
                        InputLabelProps={{
                          style: {
                            color:  styles.app_color,
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon className={classes.iconscolor} />
                            </InputAdornment>
                          ),
                          className: classes.travellersinput,
                        }}
                        inputProps={{
                          style: {
                            fontWeight: "600",
                            color:  styles.app_color,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item md={1} sm={2} xs={12}>
                      <Button
                        disableRipple
                        variant="contained"
                        className={aftersearchflight.searchbtn}
                        onClick={handlesearch}
                        sx={{ borderRadius: "9px" }}
                        fullWidth
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid item><img src={swap} alt="swap button" className={aftersearchflight.swap}  onClick={handleSwap}/></Grid> */}
              </Grid>
            </TabPanel>
            {/* Round trip */}
            <TabPanel value={2} sx={{ padding: "0.5rem 1rem" }}>
              <Grid container /*sx={{width:"100%",}}*/ spacing={2}>
                <Grid item md={5}>
                  <Grid container spacing={2} sx={{ position: "relative" }}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        label="From"
                        value={`${from?.city_name || ""} ${from?.city_code || ""
                          }`}
                        className={classes1.search_root}
                        // onChange={(e) => setFrom(e.target.value)}
                        onClick={() => searchsources(1)}
                        InputLabelProps={{
                          style: {
                            color:  styles.app_color,
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FlightTakeoffIcon
                                className={classes.iconscolor}
                              />
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{
                          style: {
                            fontWeight: "600",
                            color: styles.app_color,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        label="To"
                        value={`${to?.city_name || ""} ${to?.city_code || ""}`}
                        className={classes1.search_root}
                        // onChange={(e) => setTo(e.target.value)}
                        onClick={() => searchsources(2)}
                        InputLabelProps={{
                          style: {
                            color:  styles.app_color,
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FlightLandIcon className={classes.iconscolor} />
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
                    <Grid item>
                      <span
                        className="flight_search_swapIcon"
                        onClick={handleSwap}
                      >
                        <img src={swapicon} alt="swap" />
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  md={2}
                  xs={6}
                  ref={dateopener.isOdepartdata ? departref : returnref}
                >
                  <TextField
                    fullWidth
                    size="small"
                    autoComplete="off"
                    label="Departure Date"
                    className={classes1.search_root}
                    onClick={() =>
                      setDateopener((prev) => ({
                        ...prev,
                        isOdepartdata: true,
                      }))
                    }
                    value={dates.departdate}
                    InputLabelProps={{
                      style: {
                        color:  styles.app_color,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonthIcon className={classes.iconscolor} />
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
                  {dateopener.isOdepartdata && (
                    <Flightcalender selectdate={departure_date} />
                  )}
                </Grid>
                <Grid
                  item
                  md={2}
                  xs={6}
                  ref={dateopener.isOreturndata ? departref : returnref}
                >
                  {dateopener.isOreturndata && (
                    <Flightcalender selectdate={return_date} />
                  )}
                  <TextField
                    fullWidth
                    size="small"
                    autoComplete="off"
                    label="Return Date"
                    className={classes1.search_root}
                    value={dates.returndate}
                    onClick={() =>
                      setDateopener((prev) => ({
                        ...prev,
                        isOreturndata: true,
                      }))
                    }
                    InputLabelProps={{
                      style: {
                        color:  styles.app_color,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonthIcon className={classes.iconscolor} />
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
                <Grid item md={2} xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Traveller's Class"
                    value={`${traveller_class}${adult > 0 ? `, ${adult} adult` : ""
                      }${child > 0 ? `, ${child} child` : ""}${infant > 0 ? `, ${infant} infant` : ""
                      }`}
                    className={classes1.search_root}
                    onClick={() => setTravellermodel(true)}
                    InputLabelProps={{
                      style: {
                        color:  styles.app_color,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon className={classes.iconscolor} />
                        </InputAdornment>
                      ),
                      className: classes.travellersinput,
                    }}
                    inputProps={{
                      style: {
                        fontWeight: "600",
                        color:  styles.app_color,
                      },
                    }}
                  />
                </Grid>
                <Grid item md={1} xs>
                  <Button
                    disableRipple
                    variant="contained"
                    className={aftersearchflight.searchbtn}
                    onClick={handlesearch}
                    sx={{ borderRadius: "9px" }}
                    fullWidth
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
            {/* Multicity */}
            <TabPanel value={3} sx={{ padding: "0rem" }}>
              <Stack spacing={2}>
                <Accordion elevation={0}>
                  <AccordionSummary
                    disableTouchRipple
                    sx={{ background: "#ffff!important" }}
                  >
                    <Grid container spacing={2}>
                      <Grid item md={7}>
                        {" "}
                        <TextField
                          size="small"
                          fullWidth
                          value={multicities}
                          label="From"
                          className={classes1.search_root}
                          InputLabelProps={{
                            style: {
                              color:  styles.app_color,
                            },
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FlightTakeoffIcon
                                  className={classes.iconscolor}
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
                      <Grid item md={3.6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Traveller's & Class"
                          className={classes1.search_root}
                          value={`${traveller_class}${adult > 0 ? `, ${adult} adult` : ""
                            }${child > 0 ? `, ${child} child` : ""}${infant > 0 ? `, ${infant} infant` : ""
                            }`}
                          onClick={() => setTravellermodel(true)}
                          InputLabelProps={{
                            style: {
                              color:  styles.app_color,
                            },
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={personblue} alt="person" />
                              </InputAdornment>
                            ),
                            className: classes.travellersinput,
                          }}
                          inputProps={{
                            style: {
                              fontWeight: "600",
                              color:  styles.app_color,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={1.4} textAlign="right">
                        <Button
                          fullWidth
                          disableRipple
                          sx={{
                            textTransform: "none",
                            background:  `${styles.app_color}!important`,
                            padding: "0.3rem 2.3rem",
                            borderRadius: "9px",
                          }}
                          onClick={handlesearch}
                          variant="contained"
                        >
                          Search
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      {/* trip1 */}
                      <Grid item>
                        <Grid container columnSpacing={2} rowGap={2}>
                          <Grid item md={2.5}>
                            <TextField
                              size="small"
                              label="From"
                              value={`${trip1.source?.city_name || ""} ${trip1?.source?.city_code || ""
                                }`}
                              className={classes1.search_root}
                              onClick={() => searchsources("t1s")}
                              InputLabelProps={{
                                style: {
                                  color:  styles.app_color,
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <FlightTakeoffIcon
                                      className={classes.iconscolor}
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
                          <Grid item md={2.5}>
                            <TextField
                              size="small"
                              label="To"
                              value={`${trip1.destination?.city_name || ""} ${trip1?.destination?.city_code || ""
                                }`}
                              onClick={() => searchsources("t1d")}
                              className={classes1.search_root}
                              InputLabelProps={{
                                style: {
                                  color:  styles.app_color,
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <FlightLandIcon
                                      className={classes.iconscolor}
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
                            ref={trip1.calopen ? departref : returnref}
                          >
                            <TextField
                              size="small"
                              autoComplete="off"
                              label="Departure Date"
                              className={classes1.search_root}
                              onClick={() =>
                                setTrip1((prev) => ({ ...prev, calopen: true }))
                              }
                              value={trip1.date}
                              InputLabelProps={{
                                style: {
                                  color:  styles.app_color,
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <CalendarMonthIcon
                                      className={classes.iconscolor}
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
                            {trip1.calopen && (
                              <Flightcalender
                                selectdate={multicitydeparture}
                                trip="1"
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* trip2 */}
                      <Grid item>
                        <Grid container columnSpacing={2} rowGap={2}>
                          <Grid item md={2.5}>
                            <TextField
                              size="small"
                              label="From"
                              value={`${trip2.source?.city_name || ""} ${trip2?.source?.city_code || ""
                                }`}
                              className={classes1.search_root}
                              onClick={() => searchsources("t2s")}
                              InputLabelProps={{
                                style: {
                                  color:  styles.app_color,
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <FlightTakeoffIcon
                                      className={classes.iconscolor}
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
                          <Grid item md={2.5}>
                            <TextField
                              size="small"
                              label="To"
                              value={`${trip2.destination?.city_name || ""} ${trip2?.destination?.city_code || ""
                                }`}
                              className={classes1.search_root}
                              onClick={() => searchsources("t2d")}
                              InputLabelProps={{
                                style: {
                                  color:  styles.app_color,
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <FlightLandIcon
                                      className={classes.iconscolor}
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
                            ref={trip2.calopen ? departref : returnref}
                          >
                            <TextField
                              autoComplete="off"
                              size="small"
                              label="Departure Date"
                              className={classes1.search_root}
                              value={trip2.date}
                              onClick={() =>
                                setTrip2((prev) => ({ ...prev, calopen: true }))
                              }
                              InputLabelProps={{
                                style: {
                                  color:  styles.app_color,
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <CalendarMonthIcon
                                      className={classes.iconscolor}
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
                            {trip2.calopen && (
                              <Flightcalender
                                selectdate={multicitydeparture}
                                trip="2"
                              />
                            )}
                          </Grid>
                          {tripscount == 2 && (
                            <Grid item>
                              <Stack
                                onClick={addcities}
                                direction="row"
                                spacing={1}
                                sx={{
                                  border: `1px solid ${styles.app_color}`,
                                  padding: "0.5rem 0.8rem",
                                  borderRadius: "0.5rem",
                                }}
                              >
                                <img src={add} alt="add" />
                                <span
                                  style={{
                                    color:  styles.app_color,
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
                      {/* trip3 */}
                      {tripscount > 2 && (
                        <Grid item>
                          <Grid container columnSpacing={2} rowGap={2}>
                            <Grid item md={2.5}>
                              <TextField
                                size="small"
                                label="From"
                                value={`${trip3?.source?.city_name || ""} ${trip3?.source?.city_code || ""
                                  }`}
                                onClick={() => searchsources("t3s")}
                                className={classes1.search_root}
                                InputLabelProps={{
                                  style: {
                                    color:  styles.app_color,
                                  },
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <FlightTakeoffIcon
                                        className={classes.iconscolor}
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
                            <Grid item md={2.5}>
                              <TextField
                                size="small"
                                label="To"
                                value={`${trip3?.destination?.city_name || ""
                                  } ${trip3?.destination?.city_code || ""}`}
                                onClick={() => searchsources("t3d")}
                                className={classes1.search_root}
                                InputLabelProps={{
                                  style: {
                                    color:  styles.app_color,
                                  },
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <FlightLandIcon
                                        className={classes.iconscolor}
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
                              ref={trip3?.calopen ? departref : returnref}
                            >
                              <TextField
                                autoComplete="off"
                                size="small"
                                label="Departed Date"
                                value={trip3?.date ?? ""}
                                onClick={() =>
                                  setTrip3((prev) => ({
                                    ...prev,
                                    calopen: true,
                                  }))
                                }
                                className={classes1.search_root}
                                InputLabelProps={{
                                  style: {
                                    color:  styles.app_color,
                                  },
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <CalendarMonthIcon
                                        className={classes.iconscolor}
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
                              {trip3?.calopen && (
                                <Flightcalender
                                  selectdate={multicitydeparture}
                                  trip="3"
                                />
                              )}
                            </Grid>
                            {tripscount === 3 && (
                              <Grid item>
                                <Stack
                                  direction="row"
                                  onClick={addcities}
                                  spacing={1}
                                  sx={{
                                    border: `1px solid ${styles.app_color}`,
                                    padding: "0.5rem 0.8rem",
                                    borderRadius: "0.5rem",
                                  }}
                                >
                                  <img src={add} alt="add" />
                                  <span
                                    style={{
                                      color:  styles.app_color,
                                      fontSize: "14px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Add Another City
                                  </span>
                                </Stack>
                              </Grid>
                            )}
                            {tripscount === 3 && (
                              <Grid item md={2} textAlign="right">
                                <Stack
                                  direction="row"
                                  onClick={removecities}
                                  justifyContent="center"
                                  alignItems="center"
                                  spacing={1}
                                  sx={{
                                    border: `1px solid ${styles.app_color}`,
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
                      {/* trip4 */}
                      {tripscount > 3 && (
                        <Grid item>
                          <Grid container columnSpacing={2} rowGap={2}>
                            <Grid item md={2.5}>
                              <TextField
                                size="small"
                                label="From"
                                value={`${trip4?.source?.city_name || ""} ${trip4?.source?.city_code || ""
                                  }`}
                                onClick={() => searchsources("t4s")}
                                className={classes1.search_root}
                                InputLabelProps={{
                                  style: {
                                    color:  styles.app_color,
                                  },
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <FlightTakeoffIcon
                                        className={classes.iconscolor}
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
                            <Grid item md={2.5}>
                              <TextField
                                size="small"
                                label="To"
                                value={`${trip4?.destination?.city_name || ""
                                  } ${trip4?.destination?.city_code || ""}`}
                                onClick={() => searchsources("t4d")}
                                className={classes1.search_root}
                                InputLabelProps={{
                                  style: {
                                    color:  styles.app_color,
                                  },
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <FlightLandIcon
                                        className={classes.iconscolor}
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
                              ref={trip4?.calopen ? departref : returnref}
                            >
                              <TextField
                                size="small"
                                autoComplete="off"
                                label="Departure Date"
                                className={classes1.search_root}
                                value={trip4?.date ?? ""}
                                onClick={() =>
                                  setTrip4((prev) => ({
                                    ...prev,
                                    calopen: true,
                                  }))
                                }
                                InputLabelProps={{
                                  style: {
                                    color:  styles.app_color,
                                  },
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <CalendarMonthIcon
                                        className={classes.iconscolor}
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
                              {trip4?.calopen && (
                                <Flightcalender
                                  selectdate={multicitydeparture}
                                  trip="4"
                                />
                              )}
                            </Grid>
                            {tripscount === 4 && (
                              <Grid item>
                                <Stack
                                  direction="row"
                                  onClick={addcities}
                                  spacing={1}
                                  sx={{
                                    border: `1px solid ${styles.app_color}`,
                                    padding: "0.5rem 0.8rem",
                                    borderRadius: "0.5rem",
                                  }}
                                >
                                  <img src={add} alt="add" />
                                  <span
                                    style={{
                                      color:  styles.app_color,
                                      fontSize: "14px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Add Another City
                                  </span>
                                </Stack>
                              </Grid>
                            )}
                            {tripscount === 4 && (
                              <Grid item md={2} textAlign="right">
                                <Stack
                                  direction="row"
                                  onClick={removecities}
                                  justifyContent="center"
                                  alignItems="center"
                                  spacing={1}
                                  sx={{
                                    border: `1px solid ${styles.app_color}`,
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
                      {/* trip5 */}
                      {tripscount > 4 && (
                        <Grid item>
                          <Grid container columnSpacing={2} rowGap={2}>
                            <Grid item md={2.5}>
                              <TextField
                                size="small"
                                label="From"
                                value={`${trip5?.source?.city_name || ""} ${trip5?.source?.city_code || ""
                                  }`}
                                onClick={() => searchsources("t5s")}
                                className={classes1.search_root}
                                InputLabelProps={{
                                  style: {
                                    color:  styles.app_color,
                                  },
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <FlightTakeoffIcon
                                        className={classes.iconscolor}
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
                            <Grid item md={2.5}>
                              <TextField
                                size="small"
                                label="To"
                                value={`${trip5?.destination?.city_name || ""
                                  } ${trip5?.destination?.city_code || ""}`}
                                onClick={() => searchsources("t5d")}
                                className={classes1.search_root}
                                InputLabelProps={{
                                  style: {
                                    color:  styles.app_color,
                                  },
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <FlightLandIcon
                                        className={classes.iconscolor}
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
                              ref={trip5?.calopen ? departref : returnref}
                            >
                              <TextField
                                size="small"
                                label="Departure Date"
                                autoComplete="off"
                                className={classes1.search_root}
                                value={trip5?.date ?? ""}
                                onClick={() =>
                                  setTrip5((prev) => ({
                                    ...prev,
                                    calopen: true,
                                  }))
                                }
                                InputLabelProps={{
                                  style: {
                                    color:  styles.app_color,
                                  },
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <CalendarMonthIcon
                                        className={classes.iconscolor}
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
                              {trip5?.calopen && (
                                <Flightcalender
                                  selectdate={multicitydeparture}
                                  trip="5"
                                />
                              )}
                            </Grid>

                            <Grid item md={2} textAlign="right">
                              <Stack
                                direction="row"
                                onClick={removecities}
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                                sx={{
                                  border: `1px solid ${styles.app_color}`,
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
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </TabPanel>
          </TabContext>
        </Paper>
      </Container>
    </div>
  );
};

export default FlightsSearch;
