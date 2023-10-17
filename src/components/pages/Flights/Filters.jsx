import React, { useEffect, useState } from "react";
import { aftersearch } from "../../../assets/styles/Flights.jsx";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  ToggleButtonGroup,
} from "@mui/material";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { filters } from "../../../assets/styles/Flights.jsx";
import {styles} from '../../../assets/styles/Styles_export.jsx'
const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  border: "none",
  borderRadius: "0.5rem",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white!important",
    background: `${styles.app_color}!important`,
  },
}));
const Filters = (props) => {
  // css file intialization
  const aftersearc = aftersearch();
  const filterstyles = filters();
  // getting flights data from redux
  const flightsdata = useSelector((state) => state.flightsearches.Flightsdata);
  // console.log(flightsdata.flightsdata[0])
  const waytype = useSelector((state) => state.flightsearches.waytype);
  const [airline_name, setAirline_name] = useState([]);
  const [outbound_airlines, setOutbound_airlines] = useState([]);
  useEffect(() => {
    if (waytype === 1) {
      if (
        flightsdata?.flightsdata[0].length > 0 &&
        Object.keys(flightsdata).length
      ) {
        const uniquearray = Array.from(
          new Set(
            flightsdata?.flightsdata[0].map(
              (item) => item.minarr.Segments[0][0].Airline.AirlineName
            )
          )
        );
        setAirline_name(uniquearray);
      }
    } else if (waytype === 2) {
      // console.log(flightsdata.flightsdata.length,"filterdat")
      if (
        flightsdata?.flightsdata.length === 2 &&
        Object.keys(flightsdata).length
      ) {
        const uniquearray = Array.from(
          new Set(
            flightsdata?.flightsdata[0].map(
              (item) => item.minarr.Segments[0][0].Airline.AirlineName
            )
          )
        );
        const outbound_uniquearray = Array.from(
          new Set(
            flightsdata?.flightsdata[1].map(
              (item) => item.minarr.Segments[0][0].Airline.AirlineName
            )
          )
        );
        setOutbound_airlines(outbound_uniquearray);
        setAirline_name(uniquearray);
      } else if (flightsdata?.flightsdata.length === 1) {
        const uniquearray = Array.from(
          new Set(
            flightsdata?.flightsdata[0].map(
              (item) => item.minarr.Segments[0][0].Airline.AirlineName
            )
          )
        );
        setAirline_name(uniquearray);
      }
    } else if (waytype === 3) {
      const uniquearray = Array.from(
        new Set(
          flightsdata?.flightsdata[0].flatMap((obj) =>
            obj.Segments.flat().map((segment) => segment.Airline.AirlineName)
          )
        )
      ); //.flat().map(segment=>segment.Airline.AirlineName)
      setAirline_name(uniquearray);
    }
  }, []);
  const [checkedValues, setCheckedValues] = useState([]);
  const [oubound_checked, setOutbound_checked] = useState([]);
  const handleCheckbox = (event) => {
    const { value } = event.target;
    // alert(value)
    const currentIndex = checkedValues.indexOf(value);
    const newCheckedValues = [...checkedValues];

    if (currentIndex === -1) {
      newCheckedValues.push(value);
    } else {
      newCheckedValues.splice(currentIndex, 1);
    }

    setCheckedValues(newCheckedValues);
  };
  // outbound checkbox check
  const handleOutbound_Checkbox = (event) => {
    const { value } = event.target;
    // alert(value)
    const currentIndex = oubound_checked.indexOf(value);
    const newCheckedValues = [...oubound_checked];

    if (currentIndex === -1) {
      newCheckedValues.push(value);
    } else {
      newCheckedValues.splice(currentIndex, 1);
    }

    setOutbound_checked(newCheckedValues);
  };
  // State for flight filters
  const [flights, setFlights] = useState({
    indigo: false,
    airindia: false,
    spicejet: false,
    allianceair: false,
    trujet: false,
    vistara: false,
    airasia: false,
    gofirst: false,
  });
  const [price, setPrice] = useState(2);
  const [stops, setStops] = useState({
    nostop: false,
    onestop: false,
    multistop: false,
  });
  const [departure, setDeparture] = useState({
    morning: false,
    afternoon: false,
    evening: false,
    night: false,
  });
  const [oprice, setOprice] = useState(2);
  const [outbound_stops, setOutbound_stops] = useState({
    nostop: false,
    onestop: false,
    multistop: false,
  });
  const [odeparture, setOdeparture] = useState({
    morning: false,
    afternoon: false,
    evening: false,
    night: false,
  });
  const [bounds, setBounds] = useState("1");
  const [filter, setFilter] = useState({
    low_price: false,
    high_price: false,
    non_stop: false,
    one_stop: false,
    multi_stop: false,
    morning: false,
    afternoon: false,
    evening: false,
    night: false,
  });
  const [outbound_filter, setOutbound_filter] = useState({
    low_price: false,
    high_price: false,
    non_stop: false,
    one_stop: false,
    multi_stop: false,
    morning: false,
    afternoon: false,
    evening: false,
    night: false,
  });

  //  price filter
  // 0=>lowestprice
  // 1=>highest price
  // 2=>all
  const handlepricefilter = (event, price) => {
    // console.log(price)
    if (price == null) {
      setPrice(2);
      setFilter((prev) => ({ ...prev, high_price: false, low_price: false }));
    } else {
      setPrice(price);
    }
    if (price === 1) {
      setFilter((prev) => ({ ...prev, high_price: true }));
      setFilter((prev) => ({ ...prev, low_price: false }));
    } else if (price === 0) {
      setFilter((prev) => ({ ...prev, low_price: true }));
      setFilter((prev) => ({ ...prev, high_price: false }));
    }
    // console.log(filter)
  };
  //  obound price filter
  // 0 =>lowest price
  // 1=>highest price
  const handleoutboundpricefilter = (event, price) => {
    if (price == null) {
      setOprice(2);
      setOutbound_filter((prev) => ({
        ...prev,
        high_price: false,
        low_price: false,
      }));
    } else {
      setOprice(price);
    }
    if (price === 1) {
      setOutbound_filter((prev) => ({ ...prev, high_price: true }));
      setOutbound_filter((prev) => ({ ...prev, low_price: false }));
    } else if (price === 0) {
      setOutbound_filter((prev) => ({ ...prev, high_price: false }));
      setOutbound_filter((prev) => ({ ...prev, low_price: true }));
    }
  };

  // stops filter
  // 0=>non stop
  // 1=>one stop
  // 2=>multistops
  const handlestopsfilter = (type) => {
    if (type === 0 && !stops.nostop) {
      setStops((prev) => ({ ...prev, nostop: !stops.nostop }));
      document.getElementById("nostop").style =
        `color:#ffff;background:${styles.app_color}`;
      setFilter((prev) => ({ ...prev, non_stop: true }));
    } else if (type === 0 && stops.nostop) {
      setStops((prev) => ({ ...prev, nostop: !stops.nostop }));
      document.getElementById("nostop").removeAttribute("style");
      setFilter((prev) => ({ ...prev, non_stop: false }));
    } else if (type === 1 && !stops.onestop) {
      setStops((prev) => ({ ...prev, onestop: !stops.onestop }));
      document.getElementById("onestop").style =
        `color:#ffff;background:${styles.app_color}`;
      setFilter((prev) => ({ ...prev, one_stop: true }));
    } else if (type === 1 && stops.onestop) {
      setStops((prev) => ({ ...prev, onestop: !stops.onestop }));
      document.getElementById("onestop").removeAttribute("style");
      setFilter((prev) => ({ ...prev, one_stop: false }));
    } else if (type === 2 && !stops.multistop) {
      setStops((prev) => ({ ...prev, multistop: !stops.multistop }));
      document.getElementById("multistop").style =
        `color:#ffff;background:${styles.app_color}`;
      setFilter((prev) => ({ ...prev, multi_stop: true }));
    } else if (type === 2 && stops.multistop) {
      setStops((prev) => ({ ...prev, multistop: !stops.multistop }));
      document.getElementById("multistop").removeAttribute("style");
      setFilter((prev) => ({ ...prev, multi_stop: false }));
    }
  };

  // outbound stop filter
  const handleoutboundstopsfilter = (type) => {
    // alert(type,"stop")
    if (type === 0 && !outbound_stops.nostop) {
      setOutbound_stops((prev) => ({ ...prev, nostop: !stops.nostop }));
      document.getElementById("non_stop").style =
        `color:#ffff;background:${styles.app_color}`;
      setOutbound_filter((prev) => ({ ...prev, non_stop: true }));
    } else if (type === 0 && outbound_stops.nostop) {
      setOutbound_stops((prev) => ({ ...prev, nostop: !stops.nostop }));
      document.getElementById("non_stop").removeAttribute("style");
      setOutbound_filter((prev) => ({ ...prev, non_stop: false }));
    } else if (type === 1 && !outbound_stops.onestop) {
      setOutbound_stops((prev) => ({ ...prev, onestop: !stops.onestop }));
      document.getElementById("one_stop").style =
        `color:#ffff;background:${styles.app_color}`;
      setOutbound_filter((prev) => ({ ...prev, one_stop: true }));
    } else if (type === 1 && outbound_stops.onestop) {
      setOutbound_stops((prev) => ({ ...prev, onestop: !stops.onestop }));
      document.getElementById("one_stop").removeAttribute("style");
      setOutbound_filter((prev) => ({ ...prev, one_stop: false }));
    } else if (type === 2 && !outbound_stops.multistop) {
      setOutbound_stops((prev) => ({ ...prev, multistop: !stops.multistop }));
      document.getElementById("multi_stop").style =
        `color:#ffff;background:${styles.app_color}`;
      setOutbound_filter((prev) => ({ ...prev, multi_stop: true }));
    } else if (type === 2 && outbound_stops.multistop) {
      setOutbound_stops((prev) => ({ ...prev, multistop: !stops.multistop }));
      document.getElementById("multi_stop").removeAttribute("style");
      setOutbound_filter((prev) => ({ ...prev, multi_stop: false }));
    }
  };
  // handle toggles using js for departures filter
  // 1=>morning
  // 2=>afternoon
  // 3=>evening
  // 4=>night
  const handledeparturefilter = (type, id) => {
    if (type === 1 && !departure.morning) {
      setDeparture((prev) => ({ ...prev, morning: !prev.morning }));
      // setDeparture(prev=>({...prev,afternoon:false}))
      // setDeparture(prev=>({...prev,evening:false}))
      // setDeparture(prev=>({...prev,night:false}))
      setFilter((prev) => ({ ...prev, morning: true }));
      document.getElementById("morning").style =
        `color:#ffff;background:${styles.app_color}`;
      // document.getElementById("afnun").removeAttribute("style")
      // document.getElementById("evening").removeAttribute("style")
      // document.getElementById("night").removeAttribute("style")
    } else if (type === 1 && departure.morning) {
      setDeparture((prev) => ({ ...prev, morning: !prev.morning }));
      setFilter((prev) => ({ ...prev, morning: false }));
      document.getElementById("morning").removeAttribute("style");
    } else if (type === 2 && !departure.afternoon) {
      setDeparture((prev) => ({ ...prev, afternoon: !prev.afternoon }));
      setFilter((prev) => ({ ...prev, afternoon: true }));
      // setDeparture(prev=>({...prev,morning:false}))
      // setDeparture(prev=>({...prev,night:false}))
      // setDeparture(prev=>({...prev,evening:false}))

      document.getElementById("afnun").style = `color:#ffff;background:${styles.app_color}`;
      // document.getElementById("morning").removeAttribute("style")
      // document.getElementById("evening").removeAttribute("style")
      // document.getElementById("night").removeAttribute("style")
    } else if (type === 2 && departure.afternoon) {
      setDeparture((prev) => ({ ...prev, afternoon: !prev.afternoon }));
      setFilter((prev) => ({ ...prev, afternoon: false }));
      document.getElementById("afnun").removeAttribute("style");
    } else if (type === 3 && !departure.evening) {
      setDeparture((prev) => ({ ...prev, evening: !prev.evening }));
      // setDeparture(prev=>({...prev,morning:false}))
      // setDeparture(prev=>({...prev,afternoon:false}))
      // setDeparture(prev=>({...prev,night:false}))
      setFilter((prev) => ({ ...prev, evening: true }));
      document.getElementById("evening").style =
        `color:#ffff;background:${styles.app_color}`;
      // document.getElementById("morning").removeAttribute("style")
      // document.getElementById("afnun").removeAttribute("style")
      // document.getElementById("night").removeAttribute("style")
    } else if (type === 3 && departure.evening) {
      setDeparture((prev) => ({ ...prev, evening: !prev.evening }));
      setFilter((prev) => ({ ...prev, evening: false }));
      document.getElementById("evening").removeAttribute("style");
    } else if (type === 4 && !departure.night) {
      setDeparture((prev) => ({ ...prev, night: !prev.night }));
      // setDeparture(prev=>({...prev,morning:false}))
      // setDeparture(prev=>({...prev,afternoon:false}))
      // setDeparture(prev=>({...prev,evening:false}))
      setFilter((prev) => ({ ...prev, night: true }));
      document.getElementById("night").style = `color:#ffff;background:${styles.app_color}`;
      // document.getElementById("morning").removeAttribute("style")
      // document.getElementById("afnun").removeAttribute("style")
      // document.getElementById("evening").removeAttribute("style")
    } else if (type === 4 && departure.night) {
      setDeparture((prev) => ({ ...prev, night: !prev.night }));
      setFilter((prev) => ({ ...prev, night: false }));
      document.getElementById("night").removeAttribute("style");
    }
  };
  // handle toggles using js for outbound departures filter
  // 1=>morning
  // 2=>afternoon
  // 3=>evening
  // 4=>night
  const handleoutbounddeparturefilter = (type, id) => {
    if (type === 1 && !odeparture.morning) {
      // alert(departure.morning)
      setOdeparture((prev) => ({ ...prev, morning: !prev.morning }));
      setOutbound_filter((prev) => ({ ...prev, morning: true }));
      // setOdeparture(prev=>({...prev,afternoon:false}))
      // setOdeparture(prev=>({...prev,evening:false}))
      // setOdeparture(prev=>({...prev,night:false}))

      document.getElementById("morning").style =
        `color:#ffff;background:${styles.app_color}`;
      // document.getElementById("afnun").removeAttribute("style")
      // document.getElementById("evening").removeAttribute("style")
      // document.getElementById("night").removeAttribute("style")
    } else if (type === 1 && odeparture.morning) {
      // alert(departure.morning)
      setOdeparture((prev) => ({ ...prev, morning: !prev.morning }));
      setOutbound_filter((prev) => ({ ...prev, morning: false }));
      document.getElementById("morning").removeAttribute("style");
    } else if (type === 2 && !odeparture.afternoon) {
      setOdeparture((prev) => ({ ...prev, afternoon: !prev.afternoon }));
      setOutbound_filter((prev) => ({ ...prev, afternoon: true }));

      // setOdeparture(prev=>({...prev,morning:false}))
      // setOdeparture(prev=>({...prev,night:false}))
      // setOdeparture(prev=>({...prev,evening:false}))

      document.getElementById("afnun").style = `color:#ffff;background:${styles.app_color}`;
      // document.getElementById("morning").removeAttribute("style")
      // document.getElementById("evening").removeAttribute("style")
      // document.getElementById("night").removeAttribute("style")
    } else if (type === 2 && odeparture.afternoon) {
      setOdeparture((prev) => ({ ...prev, afternoon: !prev.afternoon }));
      setOutbound_filter((prev) => ({ ...prev, afternoon: false }));

      document.getElementById("afnun").removeAttribute("style");
    } else if (type === 3 && !odeparture.evening) {
      setOdeparture((prev) => ({ ...prev, evening: !prev.evening }));
      setOutbound_filter((prev) => ({ ...prev, evening: true }));

      // setOdeparture(prev=>({...prev,morning:false}))
      // setOdeparture(prev=>({...prev,afternoon:false}))
      // setOdeparture(prev=>({...prev,night:false}))

      document.getElementById("evening").style =
        `color:#ffff;background:${styles.app_color}`;
      // document.getElementById("morning").removeAttribute("style")
      // document.getElementById("afnun").removeAttribute("style")
      // document.getElementById("night").removeAttribute("style")
    } else if (type === 3 && odeparture.evening) {
      setOdeparture((prev) => ({ ...prev, evening: !prev.evening }));
      setOutbound_filter((prev) => ({ ...prev, evening: false }));

      document.getElementById("evening").removeAttribute("style");
    } else if (type === 4 && !odeparture.night) {
      setOdeparture((prev) => ({ ...prev, night: !prev.night }));
      setOutbound_filter((prev) => ({ ...prev, night: true }));

      // setOdeparture(prev=>({...prev,morning:false}))
      // setOdeparture(prev=>({...prev,afternoon:false}))
      // setOdeparture(prev=>({...prev,evening:false}))

      document.getElementById("night").style = `color:#ffff;background:${styles.app_color}`;
      // document.getElementById("morning").removeAttribute("style")
      // document.getElementById("afnun").removeAttribute("style")
      // document.getElementById("evening").removeAttribute("style")
    } else if (type === 4 && odeparture.night) {
      setOdeparture((prev) => ({ ...prev, night: !prev.night }));
      setOutbound_filter((prev) => ({ ...prev, night: false }));

      document.getElementById("night").removeAttribute("style");
    }
  };
  // Applying the search filters
  const handlemodifysearch = (type) => {
    if (type === 2) {
      // alert("outbound")
      props.filter([...oubound_checked, outbound_filter], 2);
    } else {
      props.filter([...checkedValues, filter], 1);
    }
  };
  // boundchanges
  const handleboundchanges = (event, bounds) => {
    setBounds(bounds);
  };
  return (
    <div>
      <Paper
        elevation={3}
        sx={{ paddingTop: "1rem", paddingLeft: "1rem", borderRadius: "1rem" }}
      >
        {/* (localStorage.getItem("searchtype")==1 ||localStorage.getItem("searchtype")==3) */}
        {flightsdata.flightsdata.length === 1 ? (
          <Grid container direction="column" rowSpacing={2}>
            <Grid item>
              <Typography
                variant="subtitle2"
                mb={1}
                className={filterstyles.filters}
              >
                Sort By
              </Typography>
              <ToggleButtonGroup
                exclusive
                disableRipple
                value={price}
                mt={0.5}
                onChange={handlepricefilter}
                size="small"
              >
                <ToggleButton value={0} className={aftersearc.pricetoggle}>
                  Lowest Price
                </ToggleButton>
                <ToggleButton
                  value={1}
                  className={aftersearc.pricetoggle}
                  sx={{ marginLeft: "1rem!important" }}
                >
                  Highest Price
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" className={filterstyles.filters}>
                Stops
              </Typography>
              <Grid container mt={1} columnGap={1} rowGap={1}>
                <Grid item md={3.6}>
                  {" "}
                  <button
                    className={aftersearc.stopsbtn}
                    onClick={() => handlestopsfilter(0)}
                    id="nostop"
                  >
                    Non-Stop
                  </button>
                </Grid>
                <Grid item md={3}>
                  {" "}
                  <button
                    className={aftersearc.stopsbtn}
                    onClick={() => handlestopsfilter(1)}
                    id="onestop"
                  >
                    1 Stop
                  </button>
                </Grid>
                <Grid item md={3}>
                  {" "}
                  <button
                    className={aftersearc.stopsbtn}
                    onClick={() => handlestopsfilter(2)}
                    id="multistop"
                  >
                    2 Stop
                  </button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle2"
                mb={1}
                className={filterstyles.filters}
              >
                Departure
              </Typography>
              <Grid container direction={"column"} spacing={1.5}>
                <Grid item>
                  <Grid container columnGap={1} rowGap={1}>
                    <Grid item md={5} lg={3.5}>
                      <button
                        className={aftersearc.departurebtns}
                        onClick={() => handledeparturefilter(1, "morning")}
                        id="morning"
                      >
                        Before 6AM
                      </button>
                    </Grid>
                    <Grid item md={5} lg={3.5}>
                      <button
                        className={aftersearc.departurebtns}
                        onClick={() => handledeparturefilter(2, "afnun")}
                        id="afnun"
                      >
                        6AM - 12PM
                      </button>
                    </Grid>
                    <Grid item md={5} lg={3.5}>
                      <button
                        className={aftersearc.departurebtns}
                        onClick={() => handledeparturefilter(3, "evening")}
                        id="evening"
                      >
                        12PM - 6PM{" "}
                      </button>
                    </Grid>
                    <Grid item md={5} lg={3.5}>
                      <button
                        className={aftersearc.departurenitbtn}
                        onClick={() => handledeparturefilter(4, "night")}
                        id="night"
                      >
                        After 6 PM
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Typography
                variant="subtitle2"
                sx={{
                  color: styles.app_color,
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                }}
              >
                Airlines
              </Typography>
              <Stack>
                {airline_name.map((item, index) => {
                  return (
                    <FormControlLabel
                      size="large"
                      label={
                        <span style={{ fontFamily: "poppins" }}>
                          {item === "Indigo" ? "IndiGo" : item}
                        </span>
                      }
                      control={
                        <Checkbox
                          sx={{
                            color: styles.app_color,
                            "&.Mui-checked": {
                              color: styles.app_color,
                            },
                          }}
                          checked={checkedValues.includes(item)}
                          onChange={handleCheckbox}
                          value={item}
                        />
                      }
                    />
                  );
                })}
              </Stack>
            </Grid>
            <Grid item textAlign={"center"}>
              <Button
                disableRipple
                variant="contained"
                sx={{
                  backgroundColor: `${styles.app_color}!important`,
                  color: "#ffff",
                  textTransform: "none",
                  marginBottom: "2rem",
                  padding: "0.5rem 3.5rem",
                }}
                onClick={() => {
                  handlemodifysearch();
                }}
              >
                {/*Modify Search*/}Apply
              </Button>
              {/* props?.close() */}
            </Grid>
          </Grid>
        ) : (
          <TabContext value={bounds}>
            <TabList
              onChange={handleboundchanges}
              id="dmain"
              className={aftersearc.boundtabs}
            >
              <Tab
                label="Outbound"
                value="1"
                className={`${aftersearc.boundtabbtns} textcolo`}
                sx={{ color: styles.app_color }}
              />
              <Tab
                label="Inbound"
                value="2"
                className={`${aftersearc.boundtabbtns} textcolo`}
                sx={{ color: styles.app_color }}
              />
            </TabList>
            <TabPanel value="1">
              <Grid container direction="column" rowSpacing={2}>
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    className="textcolo"
                    sx={aftersearch.text}
                  >
                    Sort By
                  </Typography>

                  <ToggleButtonGroup
                    exclusive
                    disableRipple
                    value={oprice}
                    onChange={handleoutboundpricefilter}
                    size="small"
                  >
                    <ToggleButton value={0} className={aftersearc.pricetoggle}>
                      Lowest Price
                    </ToggleButton>
                    <ToggleButton
                      value={1}
                      className={aftersearc.pricetoggle}
                      sx={{ marginLeft: "1rem!important" }}
                    >
                      Highest Price
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid item>
                  <Typography
                    className="textcolo"
                    variant="subtitle2"
                    sx={aftersearch.text}
                  >
                    Stops
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item md={3.6}>
                      {" "}
                      <button
                        className={aftersearc.stopsbtn}
                        onClick={() => handleoutboundstopsfilter(0)}
                        id="non_stop"
                      >
                        Non-Stop
                      </button>
                    </Grid>
                    <Grid item md={3}>
                      {" "}
                      <button
                        className={aftersearc.stopsbtn}
                        onClick={() => handleoutboundstopsfilter(1)}
                        id="one_stop"
                      >
                        1 Stop
                      </button>
                    </Grid>
                    <Grid item md={3}>
                      {" "}
                      <button
                        className={aftersearc.stopsbtn}
                        onClick={() => handleoutboundstopsfilter(2)}
                        id="multi_stop"
                      >
                        2 Stop
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography className="textcolo" variant="subtitle2">
                    Departure
                  </Typography>
                  <Grid container direction={"column"} spacing={1.5}>
                    <Grid item>
                      <Grid container columnGap={1} rowGap={1}>
                        <Grid item md={5.4} lg={3.5}>
                          <button
                            className={aftersearc.departurebtns}
                            onClick={() =>
                              handleoutbounddeparturefilter(1, "morning")
                            }
                            id="morning"
                          >
                            Before 6AM
                          </button>
                        </Grid>
                        <Grid item md={5.4} lg={3.5}>
                          <button
                            className={aftersearc.departurebtns}
                            onClick={() =>
                              handleoutbounddeparturefilter(2, "afnun")
                            }
                            id="afnun"
                          >
                            6AM - 12PM
                          </button>
                        </Grid>
                        <Grid item md={5.4} lg={3.5}>
                          <button
                            className={aftersearc.departurebtns}
                            onClick={() =>
                              handleoutbounddeparturefilter(3, "evening")
                            }
                            id="evening"
                          >
                            12PM - 6PM{" "}
                          </button>
                        </Grid>
                        <Grid item md={5.4} lg={3.5}>
                          <button
                            className={aftersearc.departurenitbtn}
                            onClick={() =>
                              handleoutbounddeparturefilter(4, "night")
                            }
                            id="night"
                          >
                            After 6PM
                          </button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography
                    className="textcolo"
                    variant="subtitle2"
                    sx={aftersearch.text}
                  >
                    Airlines
                  </Typography>
                  <Stack>
                    {outbound_airlines.map((item, index) => {
                      return (
                        <FormControlLabel
                          size="large"
                          label={
                            <span style={{ fontFamily: "poppins" }}>
                              {item === "Indigo" ? "IndiGo" : item}
                            </span>
                          }
                          control={
                            <Checkbox
                              sx={{
                                color: styles.app_color,
                                "&.Mui-checked": {
                                  color: styles.app_color,
                                },
                              }}
                              checked={oubound_checked.includes(item)}
                              onChange={handleOutbound_Checkbox}
                              value={item}
                            />
                          }
                        />
                      );
                    })}
                  </Stack>
                </Grid>
                <Grid item textAlign={"center"}>
                  <Button
                    disableRipple
                    variant="contained"
                    sx={{
                      backgroundColor: `${styles.app_color}!important`,
                      color: "#ffff",
                      textTransform: "none",
                      padding: "0.5rem 3.5rem",
                    }}
                    onClick={() => {
                      handlemodifysearch(2);
                    }}
                  >
                    {/*Modify Search*/}Apply
                  </Button>
                  {/* props?.close() */}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container direction="column" rowSpacing={2}>
                <Grid item>
                  <Typography
                    className="textcolo"
                    variant="subtitle2"
                    sx={aftersearch.text}
                  >
                    Sort By
                  </Typography>

                  <ToggleButtonGroup
                    exclusive
                    disableRipple
                    value={price}
                    onChange={handlepricefilter}
                    size="small"
                  >
                    <ToggleButton value={0} className={aftersearc.pricetoggle}>
                      Lowest Price
                    </ToggleButton>
                    <ToggleButton
                      value={1}
                      className={aftersearc.pricetoggle}
                      sx={{ marginLeft: "1rem!important" }}
                    >
                      Highest Price
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid item>
                  <Typography
                    className="textcolo"
                    variant="subtitle2"
                    sx={aftersearch.text}
                  >
                    Stops
                  </Typography>

                  <Grid container>
                    <Grid item md={3.6}>
                      {" "}
                      <button
                        className={aftersearc.stopsbtn}
                        onClick={() => handlestopsfilter(0)}
                        id="nostop"
                      >
                        Non-Stop
                      </button>
                    </Grid>
                    <Grid item md={3}>
                      {" "}
                      <button
                        className={aftersearc.stopsbtn}
                        onClick={() => handlestopsfilter(1)}
                        id="onestop"
                      >
                        1 Stop
                      </button>
                    </Grid>
                    <Grid item md={3}>
                      {" "}
                      <button
                        className={aftersearc.stopsbtn}
                        onClick={() => handlestopsfilter(2)}
                        id="multistop"
                      >
                        2 Stop
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography className="textcolo" variant="subtitle2">
                    Departure
                  </Typography>
                  <Grid container direction={"column"} spacing={1.5}>
                    <Grid item spacing={1}>
                      <Grid container columnGap={1} rowGap={1}>
                        <Grid item md={5.4} lg={3.5}>
                          <button
                            className={aftersearc.departurebtns}
                            onClick={() => handledeparturefilter(1, "morning")}
                            id="morning"
                          >
                            Before 6AM
                          </button>
                        </Grid>
                        <Grid item md={5.4} lg={3.5}>
                          <button
                            className={aftersearc.departurebtns}
                            onClick={() => handledeparturefilter(2, "afnun")}
                            id="afnun"
                          >
                            6AM - 12PM
                          </button>
                        </Grid>
                        <Grid item md={5.4} lg={3.5}>
                          <button
                            className={aftersearc.departurebtns}
                            onClick={() => handledeparturefilter(3, "evening")}
                            id="evening"
                          >
                            12PM - 6PM{" "}
                          </button>
                        </Grid>
                        <Grid item md={5.4} lg={3.5}>
                          <button
                            className={aftersearc.departurenitbtn}
                            onClick={() => handledeparturefilter(4, "night")}
                            id="night"
                          >
                            After 6 PM
                          </button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography
                    className="textcolo"
                    variant="subtitle2"
                    sx={aftersearch.text}
                  >
                    Airlines
                  </Typography>
                  <Stack>
                    {airline_name.map((item, index) => {
                      return (
                        <FormControlLabel
                          size="large"
                          label={
                            <span style={{ fontFamily: "poppins" }}>
                              {item === "Indigo" ? "IndiGo" : item}
                            </span>
                          }
                          control={
                            <Checkbox
                              sx={{
                                color: styles.app_color,
                                "&.Mui-checked": {
                                  color: styles.app_color,
                                },
                              }}
                              checked={checkedValues.includes(item)}
                              onChange={handleCheckbox}
                              value={item}
                            />
                          }
                        />
                      );
                    })}
                  </Stack>
                </Grid>
                <Grid item textAlign={"center"}>
                  <Button
                    disableRipple
                    variant="contained"
                    sx={{
                      backgroundColor: `${styles.app_color}!important`,
                      color: "#ffff",
                      textTransform: "none",
                      padding: "0.5rem 3.5rem",
                    }}
                    onClick={() => {
                      handlemodifysearch(1);
                    }}
                  >
                    {/*Modify Search*/}Apply
                  </Button>
                  {/* props?.close() */}
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        )}
      </Paper>
    </div>
  );
};

export default Filters;
