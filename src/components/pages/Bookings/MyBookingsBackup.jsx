import {
    Container,
    Grid,
    Paper,
    Breadcrumbs,
    Stack,
    Divider,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
  } from "@mui/material";
  import React, { useState } from "react";
  import { mybookingstyles, ticketbooking } from "../../../assets/styles/Flights";
  import Tab from "@mui/material/Tab";
  import TabContext from "@mui/lab/TabContext";
  import TabList from "@mui/lab/TabList";
  import TabPanel from "@mui/lab/TabPanel";
  import indigo from "../../../assets/images/indigo.svg";
  import sideseat from "../../../assets/images/sideseat.svg";
  import plane from "../../../assets/images/plane.svg";
  import onestop from "../../../assets/images/onestop.svg";
  import filter from "../../../assets/images/filter.svg";
  import Flight from "../../../assets/images/Flight.svg";
  import information from "../../../assets/images/information.svg";
  import direct from "../../../assets/images/direct.svg";
  import burger from "../../../assets/images/burger.svg";
  import nonveg from "../../../assets/images/nonveg.svg";
  import baggage from "../../../assets/images/baggage.svg";
  import Refundpolicy from "../../../assets/images/Refundpolicy.svg";
  import downarrow from "../../../assets/images/downarrow.svg";
  import uparrow from "../../../assets/images/uparrow.svg";
  import personblue from '../../../assets/images/personblue.svg'
  import correctprimary from '../../../assets/images/correctprimary.svg'
  import travelinsurance from '../../../assets/images/travelinsurance.svg'
  import correct from '../../../assets/images/correct.svg'
  import faredetails from '../../../assets/images/faredetails.svg'
  import vistara from '../../../assets/images/vistara.svg'
  import trujet from '../../../assets/images/trujet.svg'
  import confirmed from '../../../assets/images/confirmed.svg'
  import done from '../../../assets/images/done.svg'
  
  const MyBookingsBackup = () => {
    const mybooking = mybookingstyles();
    const ticketbook = ticketbooking();
    const [value, setValue] = React.useState("1");
    const [flighttab,setFlighttab]=useState("1")
    const [cancellation,setCancellation]=useState(false);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleflighttab=(event,newvalue)=>{
      setFlighttab(newvalue)
    }
    return (
      <div>
        <Grid>
          <Grid>
            <Grid sx={{ height: "5vh" }}></Grid>
          </Grid>
          <Grid>
            <Grid>
              <Container maxWidth="xl">
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <span className={mybooking.bookingfontprimary}>My Bookings</span>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item md={7}>
                        <TabContext value={value}>
                          <TabList
                            onChange={handleChange}
                            aria-label="my booking tabs4"
                            className={mybooking.tabsstyles}
                          >
                            <Tab
                              disableRipple
                              className={mybooking.tabs}
                              sx={{ color: "#003556" }}
                              label="Upcoming"
                              value="1"
                            />
                            <Tab
                              disableRipple
                              className={mybooking.tabs}
                              sx={{ color: "#003556" }}
                              label="Past"
                              value="2"
                            />
                            <Tab
                              disableRipple
                              className={mybooking.tabs}
                              sx={{ color: "#003556" }}
                              label="Pending"
                              value="3"
                            />
                            <Tab
                              disableRipple
                              className={mybooking.tabs}
                              sx={{ color: "#003556" }}
                              label="Cancelled"
                              value="4"
                            />
                          </TabList>
                          <TabPanel sx={{ padding: "0.8rem 0rem" }} value="1">
                            {[1, 2, 3, 4,5,6,7].map((item) => {
                              return (
                                <Paper sx={{ borderRadius: "0.5rem" }}>
                                  <Grid container direction={"column"} mt={1.5}>
                                    <Container>
                                      <Grid item mt={2}>
                                        <Grid container>
                                          <Grid item md={9}>
                                            <img src={indigo} alt="indigo" />{" "}
                                            <span>IndiGo , IN 6432</span>
                                          </Grid>
                                          <Grid item md={3} textAlign="right">
                                            &#8377; 2,300
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid container>
                                          <Grid item md={9}>
                                            <Grid container>
                                              <Grid item md={6}>
                                                <span
                                                  className={mybooking.timefont}
                                                >
                                                  05:30Pm
                                                </span>
                                              </Grid>
                                              <Grid item md={6} textAlign="right">
                                                <span
                                                  className={mybooking.timefont}
                                                >
                                                  09:30Pm
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
                                            <Grid container alignItems={"center"}>
                                              <Grid item md={3}>
                                                <span>New Delhi</span>
                                              </Grid>
                                              <Grid item md={6}>
                                                <Grid
                                                  container
                                                  alignItems={"flex-end"}
                                                >
                                                  <Grid item md={3}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
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
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: "12px",
                                                          }}
                                                        >
                                                          4h 00m
                                                        </span>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <img
                                                          src={onestop}
                                                          alt="onestop"
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
                                                          1 Stop
                                                        </span>
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item md={3}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              <Grid item md={3} textAlign="right">
                                                <span>Chennai</span>
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
                                                28,Dec 2023
                                              </span>
                                            </Grid>
                                            <Grid item md={6} textAlign="right">
                                              <span
                                                className={mybooking.timefont}
                                              >
                                                28,Dec 2023
                                              </span>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item md={3} textAlign="right">
                                          <button
                                            style={{
                                              color: "#ffff",
                                              backgroundColor: "#003556",
                                              padding: "0.9rem 1.5rem",
                                              border: "none",
                                              borderBottomRightRadius: "0.5rem",
                                              fontSize: "14px",
                                            }}
                                          >
                                            {/* <Grid container spacing={1.3}>
                                              <Grid item md={1}>
                                                {" "}
                                                <img
                                                  src={sideseat}
                                                  alt="side seat"
                                                />
                                              </Grid>
                                              <Grid item md={11}>
                                                C-11 , Economy
                                              </Grid>
                                            </Grid> */}
                                            Economy
                                          </button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Paper>
                              );
                            })}
                          </TabPanel>
                          <TabPanel sx={{ padding: "0.8rem 0rem" }} value="2">
                            {[1, 2, 3, 4].map((item) => {
                              return (
                                <Paper sx={{ borderRadius: "0.5rem" }}>
                                  <Grid container direction={"column"} mt={1.5}>
                                    <Container>
                                      <Grid item mt={2}>
                                        <Grid container>
                                          <Grid item md={9}>
                                            <img src={indigo} alt="indigo" />{" "}
                                            <span>IndiGo , IN 6432</span>
                                          </Grid>
                                          <Grid item md={3} textAlign="right">
                                            &#8377; 2,300
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid container>
                                          <Grid item md={9}>
                                            <Grid container>
                                              <Grid item md={6}>
                                                <span
                                                  className={mybooking.timefont}
                                                >
                                                  05:30Pm
                                                </span>
                                              </Grid>
                                              <Grid item md={6} textAlign="right">
                                                <span
                                                  className={mybooking.timefont}
                                                >
                                                  09:30Pm
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
                                            <Grid container alignItems={"center"}>
                                              <Grid item md={3}>
                                                <span>New Delhi</span>
                                              </Grid>
                                              <Grid item md={6}>
                                                <Grid
                                                  container
                                                  alignItems={"flex-end"}
                                                >
                                                  <Grid item md={3}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
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
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: "12px",
                                                          }}
                                                        >
                                                          4h 00m
                                                        </span>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <img
                                                          src={onestop}
                                                          alt="onestop"
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
                                                          1 Stop
                                                        </span>
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item md={3}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              <Grid item md={3} textAlign="right">
                                                <span>Chennai</span>
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
                                                28,Dec 2023
                                              </span>
                                            </Grid>
                                            <Grid item md={6} textAlign="right">
                                              <span
                                                className={mybooking.timefont}
                                              >
                                                28,Dec 2023
                                              </span>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item md={3} textAlign="right">
                                          <button
                                            style={{
                                              color: "#ffff",
                                              backgroundColor: "#003556",
                                              padding: "0.8rem 1.5rem",
                                              border: "none",
                                              borderBottomRightRadius: "0.5rem",
                                              fontSize: "14px",
                                            }}
                                          >
                                            <Grid container spacing={1.3}>
                                              <Grid item md={1}>
                                                {" "}
                                                <img
                                                  src={sideseat}
                                                  alt="side seat"
                                                />
                                              </Grid>
                                              <Grid item md={11}>
                                                C-11 , Economy
                                              </Grid>
                                            </Grid>
                                          </button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Paper>
                              );
                            })}
                          </TabPanel>
                          <TabPanel sx={{ padding: "0.8rem 0rem" }} value="3">
                            {[1, 2, 3, 4].map((item) => {
                              return (
                                <Paper sx={{ borderRadius: "0.5rem" }}>
                                  <Grid container direction={"column"} mt={1.5}>
                                    <Container>
                                      <Grid item mt={2}>
                                        <Grid container>
                                          <Grid item md={9}>
                                            <img src={indigo} alt="indigo" />{" "}
                                            <span>IndiGo , IN 6432</span>
                                          </Grid>
                                          <Grid item md={3} textAlign="right">
                                            &#8377; 2,300
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid container>
                                          <Grid item md={9}>
                                            <Grid container>
                                              <Grid item md={6}>
                                                <span
                                                  className={mybooking.timefont}
                                                >
                                                  05:30Pm
                                                </span>
                                              </Grid>
                                              <Grid item md={6} textAlign="right">
                                                <span
                                                  className={mybooking.timefont}
                                                >
                                                  09:30Pm
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
                                            <Grid container alignItems={"center"}>
                                              <Grid item md={3}>
                                                <span>New Delhi</span>
                                              </Grid>
                                              <Grid item md={6}>
                                                <Grid
                                                  container
                                                  alignItems={"flex-end"}
                                                >
                                                  <Grid item md={3}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
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
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: "12px",
                                                          }}
                                                        >
                                                          4h 00m
                                                        </span>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <img
                                                          src={onestop}
                                                          alt="onestop"
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
                                                          1 Stop
                                                        </span>
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item md={3}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              <Grid item md={3} textAlign="right">
                                                <span>Chennai</span>
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
                                                28,Dec 2023
                                              </span>
                                            </Grid>
                                            <Grid item md={6} textAlign="right">
                                              <span
                                                className={mybooking.timefont}
                                              >
                                                28,Dec 2023
                                              </span>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item md={3} textAlign="right">
                                          <button
                                            style={{
                                              color: "#ffff",
                                              backgroundColor: "#003556",
                                              padding: "0.8rem 1.5rem",
                                              border: "none",
                                              borderBottomRightRadius: "0.5rem",
                                              fontSize: "14px",
                                            }}
                                          >
                                            <Grid container spacing={1.3}>
                                              <Grid item md={1}>
                                                {" "}
                                                <img
                                                  src={sideseat}
                                                  alt="side seat"
                                                />
                                              </Grid>
                                              <Grid item md={11}>
                                                C-11 , Economy
                                              </Grid>
                                            </Grid>
                                          </button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Paper>
                              );
                            })}
                          </TabPanel>
                          <TabPanel sx={{ padding: "0.8rem 0rem" }} value="4">
                            {[1, 2, 3, 4].map((item) => {
                              return (
                                <Paper sx={{ borderRadius: "0.5rem" }}>
                                  <Grid container direction={"column"} mt={1.5}>
                                    <Container>
                                      <Grid item mt={2}>
                                        <Grid container>
                                          <Grid item md={9}>
                                            <img src={indigo} alt="indigo" />{" "}
                                            <span>IndiGo , IN 6432</span>
                                          </Grid>
                                          <Grid item md={3} textAlign="right">
                                            &#8377; 2,300
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid container>
                                          <Grid item md={9}>
                                            <Grid container>
                                              <Grid item md={6}>
                                                <span
                                                  className={mybooking.timefont}
                                                >
                                                  05:30Pm
                                                </span>
                                              </Grid>
                                              <Grid item md={6} textAlign="right">
                                                <span
                                                  className={mybooking.timefont}
                                                >
                                                  09:30Pm
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
                                            <Grid container alignItems={"center"}>
                                              <Grid item md={3}>
                                                <span>New Delhi</span>
                                              </Grid>
                                              <Grid item md={6}>
                                                <Grid
                                                  container
                                                  alignItems={"flex-end"}
                                                >
                                                  <Grid item md={3}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
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
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: "12px",
                                                          }}
                                                        >
                                                          4h 00m
                                                        </span>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <img
                                                          src={onestop}
                                                          alt="onestop"
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
                                                          1 Stop
                                                        </span>
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item md={3}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              <Grid item md={3} textAlign="right">
                                                <span>Chennai</span>
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
                                                28,Dec 2023
                                              </span>
                                            </Grid>
                                            <Grid item md={6} textAlign="right">
                                              <span
                                                className={mybooking.timefont}
                                              >
                                                28,Dec 2023
                                              </span>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item md={3} textAlign="right">
                                          <button
                                            style={{
                                              color: "#ffff",
                                              backgroundColor: "#003556",
                                              padding: "0.8rem 1.5rem",
                                              border: "none",
                                              borderBottomRightRadius: "0.5rem",
                                              fontSize: "14px",
                                            }}
                                          >
                                            <Grid container spacing={1.3}>
                                              <Grid item md={1}>
                                                {" "}
                                                <img
                                                  src={sideseat}
                                                  alt="side seat"
                                                />
                                              </Grid>
                                              <Grid item md={11}>
                                                C-11 , Economy
                                              </Grid>
                                            </Grid>
                                          </button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Paper>
                              );
                            })}
                          </TabPanel>
                        </TabContext>
                      </Grid>
                      <Grid item md={5}>
                        <Grid
                          container
                          direction={"column"}
                          spacing={2}
                          justifyItems={"center"}
                        >
                          <Grid item textAlign={"right"}>
                            <img src={filter} alt="filter" />
                          </Grid>
                          <Grid item mt={4}>
                            <Paper sx={{ borderRadius: "1rem" }}>
                              <Grid container direction={"column"} rowSpacing={2}>
                                {/* upcoming trip */}
                               {value=="1" ? 
                               <Grid
                                  item
                                  sx={{
                                    background:'linear-gradient(109.58deg, #003556 -43.74%, #0077C1 114.69%);',
                                    borderTopLeftRadius: "1rem",
                                    borderTopRightRadius: "1rem",
                                  }}
                                >
                                  <Grid
                                    container
                                    direction="column"
                                    spacing={1}
                                    textAlign="center"
                                  >
                                    <Grid item>
                                      <span className={mybooking.bookingfont}>
                                        Booking Confirmed
                                      </span>{" "}
                                      <img src={confirmed} alt="confirmed"/>
                                    </Grid>
                                    <Grid item>
                                      <img src={Flight} alt="flight" />
                                    </Grid>
                                    
                                    <Grid item>
                                      <span className={mybooking.ticketfont}>
                                        TICKET NO: NU7123399400008
                                      </span>
                                    </Grid>
                                    <Grid item mb={2}>
                                      <span className={mybooking.ticketfont}>
                                        ORDER ID: 208833992
                                      </span>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                :value=="2"?
                                <Grid
                                  item
                                  sx={{
                                    background: "linear-gradient(99.75deg, #485F66 1.33%, #122226 104.22%);",
                                    borderTopLeftRadius: "1rem",
                                    borderTopRightRadius: "1rem",
                                  }}
                                >
                                  <Grid
                                    container
                                    direction="column"
                                    spacing={1}
                                    textAlign="center"
                                  >
                                    <Grid item>
                                      <span className={mybooking.bookingfont}>
                                       Hope You had a nice journey
                                      </span>{" "}
                                      
                                    </Grid>
                                    <Grid item>
                                      <img src={done} alt="done" />
                                    </Grid>
                                    
                                    <Grid item>
                                      <span className={mybooking.ticketfont}>
                                        TICKET NO: NU7123399400008
                                      </span>
                                    </Grid>
                                    <Grid item mb={2}>
                                      <span className={mybooking.ticketfont}>
                                        ORDER ID: 208833992
                                      </span>
                                    </Grid>
                                  </Grid>
                                </Grid>:<h3>hello</h3>}
                                {/* flight details */}
                                <Grid item>
                                  <TabContext value={flighttab}>
                                    <TabList onChange={handleflighttab} className={mybooking.flighttabs} >
                                      <Tab disableRipple className={mybooking.tabssecondary} label={<Stack direction="row" spacing={1}><img src={indigo} alt="indigo"/><span style={{textTransform:'none'}}>Indigo</span></Stack>} value="1"></Tab>
                                      <Tab disableRipple className={mybooking.tabssecondary} label={<Stack direction="row" spacing={1}><img src={trujet} alt="trujet"/><span style={{textTransform:'none'}}>Trujet</span></Stack>} value="2">vistara</Tab>
                                      <Tab disableRipple className={mybooking.tabssecondary} label={<Stack direction="row" spacing={1}><img src={vistara} alt="vistara"/><span style={{textTransform:'none'}}>Vistara</span></Stack>} value="3">truejet</Tab>
                                    </TabList>
                                    <TabPanel value="1">
                                    <Grid
                                      container
                                      direction="column"
                                      rowSpacing={2.5}
                                    >
                                      
                                      <Grid item>
                                        <Grid
                                          container
                                          direction={"column"}
                                          rowSpacing={1}
                                        >
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={12}>
                                                <span
                                                  style={{
                                                    fontSize: "18px",
                                                    fontWeight: 400,
                                                  }}
                                                >
                                                  NewDelhi-Chennai
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Breadcrumbs
                                              sx={{ color: "#303030!important" }}
                                            >
                                              <span>28-12-2022</span>
                                              <span>1Stops</span>
                                              <span>4hrs</span>
                                            </Breadcrumbs>
                                          </Grid>
                                          <Grid item>
                                            <Grid container rowSpacing={1}>
                                              <Grid item md={6}>
                                                <img src={indigo} alt="indigo" />{" "}
                                                IndiGo , IN 6432
                                              </Grid>
                                              <Grid
                                                item
                                                sm={6}
                                                textAlign={"right"}
                                              >
                                                <Grid container>
                                                  <Grid item md={11}>
                                                    Economy
                                                  </Grid>
                                                  <Grid item md={1} mt={0.5}>
                                                    <img
                                                      src={information}
                                                      alt="info"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            {/* Departure time */}
                                            <Grid container>
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    05:30 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    New Delhi
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                              {/* Flight design */}
                                              <Grid item md={8}>
                                                <Grid container>
                                                  <Grid item md={2} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                  <Grid item md={6.5}>
                                                    <Grid
                                                      container
                                                      direction="column"
                                                      textAlign={"center"}
                                                    >
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: "12px",
                                                          }}
                                                        >
                                                          00h 45m
                                                        </span>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <img
                                                          src={direct}
                                                          alt="onestop"
                                                        />
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item md={3} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              {/* Arrival time */}
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    6:15 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Vishakapatnam
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* Baggage */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Baggage Type:Adult
                                              </Grid>
                                              <Grid
                                                item
                                                md={3.5}
                                                className={mybooking.baggagefont}
                                              >
                                                Check-in: 15kgs
                                              </Grid>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Cabin:7kgs
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* coupen */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={12}>
                                                <span
                                                  className={
                                                    mybooking.baggagefont
                                                  }
                                                  style={{
                                                    background: "#DFF3FF",
                                                    padding: "5px",
                                                    borderRadius: "0.5rem",
                                                  }}
                                                >
                                                  Change of Plane : Layover in
                                                  Visakhapatnam 2 hrs 30 mins
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Divider>Layover:2 hr 30 m</Divider>
                                      </Grid>
                                      <Grid item>
                                        <Grid
                                          container
                                          direction="column"
                                          rowSpacing={1}
                                        >
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={6}>
                                                <img src={indigo} alt="indigo" />{" "}
                                                IndiGo , IN 6432
                                              </Grid>
                                              <Grid
                                                item
                                                sm={6}
                                                textAlign={"right"}
                                              >
                                                <Grid container>
                                                  <Grid item md={11}>
                                                    Economy
                                                  </Grid>
                                                  <Grid item md={1} mt={0.5}>
                                                    <img
                                                      src={information}
                                                      alt="info"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            {/* Departure time */}
                                            <Grid container>
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    05:30 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    New Delhi
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                              {/* Flight design */}
                                              <Grid item md={8}>
                                                <Grid container>
                                                  <Grid item md={2} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                  <Grid item md={6.5}>
                                                    <Grid
                                                      container
                                                      direction="column"
                                                      textAlign={"center"}
                                                    >
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: "12px",
                                                          }}
                                                        >
                                                          00h 45m
                                                        </span>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <img
                                                          src={direct}
                                                          alt="onestop"
                                                        />
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item md={3} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              {/* Arrival time */}
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    6:15 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Vishakapatnam
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* Baggage */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Baggage Type:Adult
                                              </Grid>
                                              <Grid
                                                item
                                                md={3.5}
                                                className={mybooking.baggagefont}
                                              >
                                                Check-in: 15kgs
                                              </Grid>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Cabin:7kgs
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* coupen */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={12}>
                                                <span
                                                  className={
                                                    mybooking.baggagefont
                                                  }
                                                  style={{
                                                    background: "#DFF3FF",
                                                    padding: "5px",
                                                    borderRadius: "0.5rem",
                                                  }}
                                                >
                                                  Change of Plane : Layover in
                                                  Visakhapatnam 2 hrs 30 mins
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Divider>Add ons</Divider>
                                      </Grid>
                                      <Grid item>
                                        <Grid container direction="column">
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={1}>
                                                <img src={burger} alt="burger" />
                                              </Grid>
                                              <Grid item md={8}>
                                                <img src={nonveg} alt="nonveg" />{" "}
                                                <span
                                                  style={{
                                                    fontSize: "12px",
                                                    color: "#003556",
                                                  }}
                                                >
                                                  Chicken burger,Crunch with fresh
                                                  meat
                                                </span>
                                              </Grid>
                                              <Grid item md={3} textAlign="right">
                                                &#8377; 450.00
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={1}>
                                                <img
                                                  src={baggage}
                                                  alt="baggage"
                                                />
                                              </Grid>
                                              <Grid item md={8}>
                                                <span
                                                  style={{
                                                    fontSize: "12px",
                                                    color: "#003556",
                                                  }}
                                                >
                                                  Additional 25 kg
                                                </span>
                                              </Grid>
                                              <Grid item md={3} textAlign="right">
                                                &#8377; 450.00
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    </TabPanel>
                                    <TabPanel value="2">
                                    <Grid
                                      container
                                      direction="column"
                                      rowSpacing={2.5}
                                    >
                                      
                                      <Grid item>
                                        <Grid
                                          container
                                          direction={"column"}
                                          rowSpacing={1}
                                        >
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={12}>
                                                <span
                                                  style={{
                                                    fontSize: "18px",
                                                    fontWeight: 400,
                                                  }}
                                                >
                                                  NewDelhi-Chennai
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Breadcrumbs
                                              sx={{ color: "#303030!important" }}
                                            >
                                              <span>28-12-2022</span>
                                              <span>1Stops</span>
                                              <span>4hrs</span>
                                            </Breadcrumbs>
                                          </Grid>
                                          <Grid item>
                                            <Grid container rowSpacing={1}>
                                              <Grid item md={6}>
                                                <img src={indigo} alt="indigo" />{" "}
                                                IndiGo , IN 6432
                                              </Grid>
                                              <Grid
                                                item
                                                sm={6}
                                                textAlign={"right"}
                                              >
                                                <Grid container>
                                                  <Grid item md={11}>
                                                    Economy
                                                  </Grid>
                                                  <Grid item md={1} mt={0.5}>
                                                    <img
                                                      src={information}
                                                      alt="info"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            {/* Departure time */}
                                            <Grid container>
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    05:30 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    New Delhi
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                              {/* Flight design */}
                                              <Grid item md={8}>
                                                <Grid container>
                                                  <Grid item md={2} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                  <Grid item md={6.5}>
                                                    <Grid
                                                      container
                                                      direction="column"
                                                      textAlign={"center"}
                                                    >
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: "12px",
                                                          }}
                                                        >
                                                          00h 45m
                                                        </span>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <img
                                                          src={direct}
                                                          alt="onestop"
                                                        />
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item md={3} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              {/* Arrival time */}
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    6:15 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Vishakapatnam
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* Baggage */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Baggage Type:Adult
                                              </Grid>
                                              <Grid
                                                item
                                                md={3.5}
                                                className={mybooking.baggagefont}
                                              >
                                                Check-in: 15kgs
                                              </Grid>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Cabin:7kgs
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* coupen */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={12}>
                                                <span
                                                  className={
                                                    mybooking.baggagefont
                                                  }
                                                  style={{
                                                    background: "#DFF3FF",
                                                    padding: "5px",
                                                    borderRadius: "0.5rem",
                                                  }}
                                                >
                                                  Change of Plane : Layover in
                                                  Visakhapatnam 2 hrs 30 mins
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Divider>Layover:2 hr 30 m</Divider>
                                      </Grid>
                                      <Grid item>
                                        <Grid
                                          container
                                          direction="column"
                                          rowSpacing={1}
                                        >
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={6}>
                                                <img src={indigo} alt="indigo" />{" "}
                                                IndiGo , IN 6432
                                              </Grid>
                                              <Grid
                                                item
                                                sm={6}
                                                textAlign={"right"}
                                              >
                                                <Grid container>
                                                  <Grid item md={11}>
                                                    Economy
                                                  </Grid>
                                                  <Grid item md={1} mt={0.5}>
                                                    <img
                                                      src={information}
                                                      alt="info"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            {/* Departure time */}
                                            <Grid container>
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    05:30 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    New Delhi
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                              {/* Flight design */}
                                              <Grid item md={8}>
                                                <Grid container>
                                                  <Grid item md={2} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                  <Grid item md={6.5}>
                                                    <Grid
                                                      container
                                                      direction="column"
                                                      textAlign={"center"}
                                                    >
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: "12px",
                                                          }}
                                                        >
                                                          00h 45m
                                                        </span>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <img
                                                          src={direct}
                                                          alt="onestop"
                                                        />
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item md={3} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              {/* Arrival time */}
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    6:15 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Vishakapatnam
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* Baggage */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Baggage Type:Adult
                                              </Grid>
                                              <Grid
                                                item
                                                md={3.5}
                                                className={mybooking.baggagefont}
                                              >
                                                Check-in: 15kgs
                                              </Grid>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Cabin:7kgs
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* coupen */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={12}>
                                                <span
                                                  className={
                                                    mybooking.baggagefont
                                                  }
                                                  style={{
                                                    background: "#DFF3FF",
                                                    padding: "5px",
                                                    borderRadius: "0.5rem",
                                                  }}
                                                >
                                                  Change of Plane : Layover in
                                                  Visakhapatnam 2 hrs 30 mins
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Divider>Add ons</Divider>
                                      </Grid>
                                      <Grid item>
                                        <Grid container direction="column">
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={1}>
                                                <img src={burger} alt="burger" />
                                              </Grid>
                                              <Grid item md={8}>
                                                <img src={nonveg} alt="nonveg" />{" "}
                                                <span
                                                  style={{
                                                    fontSize: "12px",
                                                    color: "#003556",
                                                  }}
                                                >
                                                  Chicken burger,Crunch with fresh
                                                  meat
                                                </span>
                                              </Grid>
                                              <Grid item md={3} textAlign="right">
                                                &#8377; 450.00
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={1}>
                                                <img
                                                  src={baggage}
                                                  alt="baggage"
                                                />
                                              </Grid>
                                              <Grid item md={8}>
                                                <span
                                                  style={{
                                                    fontSize: "12px",
                                                    color: "#003556",
                                                  }}
                                                >
                                                  Additional 25 kg
                                                </span>
                                              </Grid>
                                              <Grid item md={3} textAlign="right">
                                                &#8377; 450.00
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    </TabPanel>
                                    <TabPanel value="3">
                                    <Grid
                                      container
                                      direction="column"
                                      rowSpacing={2.5}
                                    >
                                      
                                      <Grid item>
                                        <Grid
                                          container
                                          direction={"column"}
                                          rowSpacing={1}
                                        >
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={12}>
                                                <span
                                                  style={{
                                                    fontSize: "18px",
                                                    fontWeight: 400,
                                                  }}
                                                >
                                                  NewDelhi-Chennai
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Breadcrumbs
                                              sx={{ color: "#303030!important" }}
                                            >
                                              <span>28-12-2022</span>
                                              <span>1Stops</span>
                                              <span>4hrs</span>
                                            </Breadcrumbs>
                                          </Grid>
                                          <Grid item>
                                            <Grid container rowSpacing={1}>
                                              <Grid item md={6}>
                                                <img src={indigo} alt="indigo" />{" "}
                                                IndiGo , IN 6432
                                              </Grid>
                                              <Grid
                                                item
                                                sm={6}
                                                textAlign={"right"}
                                              >
                                                <Grid container>
                                                  <Grid item md={11}>
                                                    Economy
                                                  </Grid>
                                                  <Grid item md={1} mt={0.5}>
                                                    <img
                                                      src={information}
                                                      alt="info"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            {/* Departure time */}
                                            <Grid container>
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    05:30 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    New Delhi
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                              {/* Flight design */}
                                              <Grid item md={8}>
                                                <Grid container>
                                                  <Grid item md={2} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                  <Grid item md={6.5}>
                                                    <Grid
                                                      container
                                                      direction="column"
                                                      textAlign={"center"}
                                                    >
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: "12px",
                                                          }}
                                                        >
                                                          00h 45m
                                                        </span>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <img
                                                          src={direct}
                                                          alt="onestop"
                                                        />
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item md={3} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              {/* Arrival time */}
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    6:15 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Vishakapatnam
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* Baggage */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Baggage Type:Adult
                                              </Grid>
                                              <Grid
                                                item
                                                md={3.5}
                                                className={mybooking.baggagefont}
                                              >
                                                Check-in: 15kgs
                                              </Grid>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Cabin:7kgs
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* coupen */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={12}>
                                                <span
                                                  className={
                                                    mybooking.baggagefont
                                                  }
                                                  style={{
                                                    background: "#DFF3FF",
                                                    padding: "5px",
                                                    borderRadius: "0.5rem",
                                                  }}
                                                >
                                                  Change of Plane : Layover in
                                                  Visakhapatnam 2 hrs 30 mins
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Divider>Layover:2 hr 30 m</Divider>
                                      </Grid>
                                      <Grid item>
                                        <Grid
                                          container
                                          direction="column"
                                          rowSpacing={1}
                                        >
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={6}>
                                                <img src={indigo} alt="indigo" />{" "}
                                                IndiGo , IN 6432
                                              </Grid>
                                              <Grid
                                                item
                                                sm={6}
                                                textAlign={"right"}
                                              >
                                                <Grid container>
                                                  <Grid item md={11}>
                                                    Economy
                                                  </Grid>
                                                  <Grid item md={1} mt={0.5}>
                                                    <img
                                                      src={information}
                                                      alt="info"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            {/* Departure time */}
                                            <Grid container>
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    05:30 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    New Delhi
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                              {/* Flight design */}
                                              <Grid item md={8}>
                                                <Grid container>
                                                  <Grid item md={2} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                  <Grid item md={6.5}>
                                                    <Grid
                                                      container
                                                      direction="column"
                                                      textAlign={"center"}
                                                    >
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: "12px",
                                                          }}
                                                        >
                                                          00h 45m
                                                        </span>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        sx={{ height: "1rem" }}
                                                      >
                                                        <img
                                                          src={direct}
                                                          alt="onestop"
                                                        />
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item md={3} mt={2}>
                                                    <img
                                                      src={plane}
                                                      alt="plane"
                                                    />
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              {/* Arrival time */}
                                              <Grid item md={2}>
                                                <Stack spacing={1}>
                                                  <span
                                                    className={mybooking.timefont}
                                                  >
                                                    6:15 PM
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Vishakapatnam
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#003556",
                                                    }}
                                                  >
                                                    Sat, 28Dec 22
                                                  </span>
                                                </Stack>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* Baggage */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Baggage Type:Adult
                                              </Grid>
                                              <Grid
                                                item
                                                md={3.5}
                                                className={mybooking.baggagefont}
                                              >
                                                Check-in: 15kgs
                                              </Grid>
                                              <Grid
                                                item
                                                md={4}
                                                className={mybooking.baggagefont}
                                              >
                                                Cabin:7kgs
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* coupen */}
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={12}>
                                                <span
                                                  className={
                                                    mybooking.baggagefont
                                                  }
                                                  style={{
                                                    background: "#DFF3FF",
                                                    padding: "5px",
                                                    borderRadius: "0.5rem",
                                                  }}
                                                >
                                                  Change of Plane : Layover in
                                                  Visakhapatnam 2 hrs 30 mins
                                                </span>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Divider>Add ons</Divider>
                                      </Grid>
                                      <Grid item>
                                        <Grid container direction="column">
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={1}>
                                                <img src={burger} alt="burger" />
                                              </Grid>
                                              <Grid item md={8}>
                                                <img src={nonveg} alt="nonveg" />{" "}
                                                <span
                                                  style={{
                                                    fontSize: "12px",
                                                    color: "#003556",
                                                  }}
                                                >
                                                  Chicken burger,Crunch with fresh
                                                  meat
                                                </span>
                                              </Grid>
                                              <Grid item md={3} textAlign="right">
                                                &#8377; 450.00
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <Grid container>
                                              <Grid item md={1}>
                                                <img
                                                  src={baggage}
                                                  alt="baggage"
                                                />
                                              </Grid>
                                              <Grid item md={8}>
                                                <span
                                                  style={{
                                                    fontSize: "12px",
                                                    color: "#003556",
                                                  }}
                                                >
                                                  Additional 25 kg
                                                </span>
                                              </Grid>
                                              <Grid item md={3} textAlign="right">
                                                &#8377; 450.00
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    </TabPanel>
                                  </TabContext>
                                 
                                </Grid>
                                <Grid
                                  item
                                  sx={{
                                    backgroundColor: "#003556",
                                    borderBottomLeftRadius: "1rem",
                                    borderBottomRightRadius: "1rem",
                                    paddingBottom: "0.8rem",
                                    color: "#fff",
                                  }}
                                  textAlign="center"
                                >
                                  <Typography>Download invoice</Typography>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                          {value=="1"&&
                          <Grid item>
                            <Paper sx={{ borderRadius: "1rem" }} elevation={3}>
                              <Container>
                                <Accordion expanded={cancellation} elevation={0}>
                                  <AccordionSummary>
                                    <Grid container>
                                      <Grid item md={0.7}>
                                        <img
                                          src={Refundpolicy}
                                          alt="cancellation"
                                        />
                                      </Grid>
                                      <Grid item md={6}>
                                        Cancellation Refund Policy
                                      </Grid>
                                      <Grid item md={1} onClick={()=>{setCancellation(prev=>!prev)}}>
                                        <img src={cancellation?downarrow:uparrow} alt="downarrow" />
                                      </Grid>
                                    </Grid>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                        <Grid container sx={{background:'#EDF5FA',padding:'1rem',borderRadius:'1rem'}}>
                                          <Grid item md={5} >
                                            <Grid container direction="column" rowSpacing={1}>
                                              <Grid item className={mybooking.cancellationhead}>Cancellation Time</Grid>
                                              <Grid item className={mybooking.cancellationdata}>More than 2hrs</Grid>
                                              <Grid item className={mybooking.cancellationdata}>2hrs - 3days</Grid>
                                              <Grid item className={mybooking.cancellationdata}>3 - 365days</Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item md={3} >
                                          <Grid container direction={'column'} rowSpacing={1}>
                                              <Grid item className={mybooking.cancellationhead}>Penalty%</Grid>
                                              <Grid item className={mybooking.cancellationdata}>100%</Grid>
                                              <Grid item className={mybooking.cancellationdata}>30%</Grid>
                                              <Grid item className={mybooking.cancellationdata}>10%</Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item md={4} >
                                            <Grid container direction={'column'} rowSpacing={1} >
                                              <Grid item>Penalty&#8377;</Grid>
                                              <Grid item className={mybooking.cancellationdata}>Non Refundable</Grid>
                                              <Grid item className={mybooking.cancellationdata}>&#8377; 690</Grid>
                                              <Grid item className={mybooking.cancellationdata}>&#8377; 690</Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                  </AccordionDetails>
                                </Accordion>
                              </Container>
                            </Paper>
                          </Grid>}
                          <Grid item>
                            <Paper sx={{borderRadius:'1rem'}} elevation={3}>
                              <Grid container direction="column" rowSpacing={1}sx={{padding:'1rem'}}>
                                <Grid item><img src={personblue} alt="personblue"/> <span className={mybooking.bookingfontprimary}>Traveller Details</span></Grid>
                                <Grid item>
                                  <Grid container spacing={2}>
                                    <Grid item md={4.5}>
                                      <Grid container direction={'column'} rowSpacing={1}>
                                        <Grid item className={mybooking.cancellationhead}>Name</Grid>
                                        <Grid item className={mybooking.cancellationdata}>Koppaka harshavardhan</Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item md={1.5}>
                                    <Grid container direction={'column'} rowSpacing={1}>
                                        <Grid item className={mybooking.cancellationhead}>Age</Grid>
                                        <Grid item className={mybooking.cancellationdata}>24</Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item md={2}><Grid container direction={'column'} rowSpacing={1}>
                                        <Grid item className={mybooking.cancellationhead}>Gender</Grid>
                                        <Grid item className={mybooking.cancellationdata}>Male</Grid>
                                      </Grid></Grid>
                                    <Grid item md={2}>
                                    <Grid container direction={'column'} rowSpacing={1}>
                                        <Grid item className={mybooking.cancellationhead}>Traveller</Grid>
                                        <Grid item className={mybooking.cancellationdata}>Adult</Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item md={2}>
                                    <Grid container direction={'column'} rowSpacing={1}>
                                        <Grid item className={mybooking.cancellationhead}>Seat No.</Grid>
                                        <Grid item className={mybooking.cancellationdata}>
                                          <Grid container>
                                            <Grid item md={6} textAlign="center">11D</Grid>
                                            <Grid item md={6} textAlign="right"><img src={correctprimary} alt="correct"/></Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                
                              </Grid>
                            </Paper>
                          </Grid>
                          <Grid item>
                            <Paper sx={{borderRadius:'1rem',padding:'1rem'}} elevation={3}>
                              <Grid container direction={'column'} rowSpacing={1.5}>
                                <Grid item><img src={travelinsurance} alt="travel insurance"/>{" "}<span className={mybooking.bookingfontprimary}>Travel Insurance Details</span></Grid>
                                <Grid item className={mybooking.cancellationdata}>Protection your trip from COVID - 19, medical costs & more with Travel Protection from our award-winning partner Xcover. </Grid>
                                <Grid item>
                                  <Grid container spacing={1.5}>
                                    <Grid item  md={6}>
                                    <Stack direction={"row"} spacing={1}>
                                      <img src={correct} alt="correct" />
                                      <span className={mybooking.travelinsurancedata}>
                                        Refundable flight and trip costs
                                      </span>
                                    </Stack>
                                    </Grid>
                                    <Grid item md={6}>
                                    <Stack direction={"row"} spacing={1}>
                                      <img src={correct} alt="correct" />
                                      <span className={mybooking.travelinsurancedata}>
                                      24/7 Emergency assistance
                                      </span>
                                    </Stack>
                                    </Grid>
                                    <Grid item md={6.5}>
                                    <Stack direction={"row"} spacing={1}>
                                      <img src={correct} alt="correct" />
                                      <span className={mybooking.travelinsurancedata}>
                                      Express baggage tracking and cover
                                      </span>
                                    </Stack>
                                    </Grid>
                                    <Grid item md={5.5}>
                                    <Stack direction={"row"} spacing={1}>
                                      <img src={correct} alt="correct" />
                                      <span className={mybooking.travelinsurancedata}>
                                      Emergency medical and dental
                                      </span>
                                    </Stack>
                                    </Grid>
                                    <Grid item md={6}>
                                    <Stack direction={"row"} spacing={1}>
                                      <img src={correct} alt="correct" />
                                      <span className={mybooking.travelinsurancedata}>
                                      Delayed or missed flights
                                      </span>
                                    </Stack>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                          <Grid item>
                          <Paper className={ticketbook.paperadjustment} elevation={3}>
                      <Grid container direction={"column"} spacing={1.5}>
                        <Grid item>
                          <Stack direction={"row"} spacing={1}>
                            <img src={information} alt="information" />
                            <span className={ticketbook.textsize}>
                              Important Information
                            </span>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <span className={mybooking.cancellationdata}>
                            Wearing masks/face covers is no longer mandatory.
                            However,, all travellers are advised to wear them, in
                            view of the threat posed by COVID-19.
                          </span>
                        </Grid>
                      </Grid>
                    </Paper>
                          </Grid>
                          <Grid item sx={{height:'12rem'}}>
                            <Paper sx={{borderRadius:'1rem',padding:'1rem'}}>
                              <Stack direction="row" spacing={1}>
                                <img src={faredetails} alt="faredetails"/>
                                <span className={mybooking.bookingfontprimary}>Fare Details</span>
                              </Stack>
                              <Stack spacing={1.5} mt={2}>
                                <Grid item>
                                  <Grid container>
                                    <Grid item md={4} className={mybooking.cancellationhead}>Base Fare</Grid>
                                    <Grid item md={4} textAlign="center" className={mybooking.faredata}>1 x Adult</Grid>
                                    <Grid item md={4} textAlign="right" className={mybooking.faredata}>&#8377;2,300</Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid container>
                                    <Grid item md={6} className={mybooking.cancellationhead}>Fee & Surcharges</Grid>
                                    <Grid item md={6} textAlign="right" className={mybooking.faredata}>&#8377; 300</Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Divider/>
                                </Grid>
                                <Grid item>
                                  <Grid container>
                                    <Grid item className={mybooking.bookingfontprimary} md={6}>Grand Total</Grid>
                                    <Grid item md={6} textAlign={'right'} className={mybooking.travelinsurancedata}>&#8377;2,600</Grid>
                                  </Grid>
                                </Grid>
                              </Stack>
                            </Paper>
                          </Grid>
                        {value=="1"?<Grid item>
                          <Grid container spacing={2}>
                            <Grid item md={6}><Button fullWidth variant={"outlined"} sx={{textTransform:'none',color:'#003556',borderRadius:'0.5rem',borderColor:'#003556'}}>Date Change</Button></Grid>
                            <Grid item md={6}><Button fullWidth variant={"contained"} sx={{textTransform:'none',color:'#ffff',backgroundColor:'#003556',borderRadius:'0.5rem'}}>Cancel</Button></Grid>
                          </Grid>
                        </Grid>:value=="2"?
                        <Grid item textAlign={'center'}>
                            <Button variant="contained" disableRipple sx={{backgroundColor:'#003556!important',textTransform:'none',padding:'0.3rem 5rem',marginBottom:'0.5rem'}}>Feedback</Button>
                          </Grid>:<h3>dumb</h3>}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };
  
  export default MyBookingsBackup;
  