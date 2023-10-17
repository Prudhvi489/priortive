import { Breadcrumbs, Container, Divider, Grid, Paper, Stack, Tab, Typography } from '@mui/material'
import React,{useState} from 'react'
import { mybookingstyles, ticketbooking } from "../../../../assets/styles/Flights";
import plane from '../../../../assets/images/plane.svg';
import confirmed from '../../../../assets/images/confirmed.svg';
import Flight from '../../../../assets/images/Flight.svg';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import indigo from '../../../../assets/images/indigo.svg'
import vistara from '../../../../assets/images/vistara.svg';
import trujet from '../../../../assets/images/trujet.svg';
import nonveg from '../../../../assets/images/nonveg.svg';
import baggage from '../../../../assets/images/baggage.svg';
import burger from '../../../../assets/images/burger.svg';
import direct from '../../../../assets/images/direct.svg';
import  information from '../../../../assets/images/information.svg';
import Refundpolicy from '../../../../assets/images/Refundpolicy.svg';
import personblue from '../../../../assets/images/personblue.svg';
import correctprimary from '../../../../assets/images/correctprimary.svg';
import travelinsurance from '../../../../assets/images/travelinsurance.svg'
import correct from '../../../../assets/images/correct.svg'
import Importantinfo from '../../../OffersCarousel/Importantinfo';
import faredetails from '../../../../assets/images/faredetails.svg';
import {styles} from '../../../../assets/styles/Styles_export'
const Flightupcoming = () => {
  const mybooking = mybookingstyles();
  const [flighttab,setFlighttab]=useState(1)
  const handleflighttab=()=>{

  }
  return (
    
   <>
   <Grid container direction={'column'} spacing={2}>
    <Grid item>
     <Paper sx={{ borderRadius: "1rem" }}>
     <Grid container direction={"column"} rowSpacing={2}>
                                {/* upcoming trip */}
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
                                {/* flight details */}
                                <Grid item>
                                  <TabContext value={flighttab}>
                                    <TabList onChange={handleflighttab} className={mybooking.flighttabs} >
                                      <Tab disableRipple className={mybooking.tabssecondary} label={<Stack direction="row" spacing={1}><img src={indigo} alt="indigo"/><span style={{textTransform:'none'}}>Indigo</span></Stack>} value="1"></Tab>
                                      <Tab disableRipple className={mybooking.tabssecondary} label={<Stack direction="row" spacing={1}><img src={trujet} alt="trujet"/><span style={{textTransform:'none'}}>Trujet</span></Stack>} value="2">vistara</Tab>
                                      <Tab disableRipple className={mybooking.tabssecondary} label={<Stack direction="row" spacing={1}><img src={vistara} alt="vistara"/><span style={{textTransform:'none'}}>Vistara</span></Stack>} value="3">truejet</Tab>
                                    </TabList>
                                    <TabPanel value={1}>
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
                                                      color: styles.app_color,
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
                                                      color: styles.app_color,
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
                                                      color: styles.app_color,
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
                                                      color: styles.app_color,
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
                                                    color: styles.app_color,
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
                                                    color: styles.app_color,
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
                                    <TabPanel value={2}>
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
                                                      color: styles.app_color,
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
                                                      color: styles.app_color,
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
                                                      color: styles.app_color,
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
                                                      color: styles.app_color,
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
                                                    color: styles.app_color,
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
                                                    color: styles.app_color,
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
                                    <TabPanel value={3}>
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
                                                      color: styles.app_color,
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
                                                      color: styles.app_color,
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
                                                      color: styles.app_color,
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
                                                      color: styles.app_color,
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
                                                    color: styles.app_color,
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
                                                    color: styles.app_color,
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
                                    backgroundColor: styles.app_color,
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
     <Grid item >
         <Paper sx={{ borderRadius: "1rem",padding:'1rem 1rem 1rem 0rem' }} elevation={3}>
                              <Container>
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
                                     
                                    </Grid>
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
                              </Container>
         </Paper>
     </Grid>
     <Grid item >
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
        <Importantinfo module_type={1}/>
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
     <Grid item textAlign={'center'}>
      <button style={{width:'284px',border:'none',height:'50px',backgroundColor:'#003556',color:'#fff',borderRadius:'0.5rem',marginBottom:'1rem'}}>Cancel</button>
     </Grid>
    </Grid>
   </>
  )
}

export default Flightupcoming