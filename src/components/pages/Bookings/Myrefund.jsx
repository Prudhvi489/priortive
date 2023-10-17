import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Grid,
  Stack,
  Tab,
} from "@mui/material";
import React, { useState } from "react";
import { myrefund } from "../../../assets/styles/Flights";
import downarrow from "../../../assets/images/downarrow.svg";
import uparrow from "../../../assets/images/uparrow.svg";

const Myrefund = () => {
  const myrefund1 = myrefund();
  const [value, setValue] = useState("1");
  const [expand, setExpand] = useState(false);
  const handletabchange = (event, newvalue) => {
    setValue(newvalue);
  };
  const accordexpand = () => {
    setExpand((prev) => !prev);
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Grid container direction={"column"} rowSpacing={2}>
          <Grid item height="5vh"></Grid>
          <Grid item className={myrefund1.refundtxt}>
            My Refund
          </Grid>
          <Grid item>
            <TabContext value={value}>
              <TabList onChange={handletabchange} className={myrefund1.tabs}>
                <Tab
                  label="successfull"
                  disableRipple
                  sx={{
                    textTransform: "none",
                    height: "2rem",
                    minHeight: "2rem",
                  }}
                  value="1"
                />
                <Tab
                  label="Pending"
                  disableRipple
                  sx={{
                    textTransform: "none",
                    height: "2rem",
                    minHeight: "2rem",
                  }}
                  value="2"
                />
              </TabList>
              <TabPanel value="1" className={myrefund1.tabpanel}>
                {[1, 2, 3].map((item) => {
                  return (
                    <div style={{marginTop:'1rem'}}>
                    <Accordion expanded={expand}>
                      <AccordionSummary
                        sx={{ height: "2rem", minHeight: "3rem!important" }}
                        id="accord"
                      >
                        <Grid container>
                          <Grid item md={1.5} className={myrefund1.flighttext}>
                            IndiGo.GA212{" "}
                            <img
                              src={expand ? uparrow : downarrow}
                              alt="downarrow"
                              onClick={accordexpand}
                            />
                          </Grid>
                          <Grid
                            item
                            md={3}
                            textAlign={"center"}
                            className={myrefund1.text}
                          >
                            Transaction ID:T22099881877387654
                          </Grid>
                          <Grid
                            item
                            md={2.7}
                            textAlign={"center"}
                            className={myrefund1.text}
                          >
                            Payment:gomytrip@ybl
                          </Grid>
                          <Grid
                            item
                            md={1.2}
                            textAlign={"center"}
                            className={myrefund1.timedate}
                          >
                            21 Dec 2022
                          </Grid>
                          <Grid
                            item
                            md={1.2}
                            textAlign={"center"}
                            className={myrefund1.timedate}
                          >
                            08:30 PM
                          </Grid>
                          <Grid
                            item
                            md={1.2}
                            textAlign={"center"}
                            className={myrefund1.successtext}
                          >
                            Successful
                          </Grid>
                          <Grid
                            item
                            md={1.2}
                            textAlign={"center"}
                            className={myrefund1.text}
                          >
                            &#8377; 5,000
                          </Grid>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={1.5}>
                          <Divider />
                          <Grid container>
                            <Grid item md={1.5}>
                              <Grid
                                container
                                direction={"column"}
                                spacing={1}
                                className={myrefund1.text}
                              >
                                <Grid item>23,Dec 2022</Grid>
                                <Grid item>New Delhi</Grid>
                                <Grid item>05:30 PM</Grid>
                              </Grid>
                            </Grid>
                            <Grid item md={2} textAlign={"right"}>
                              <Grid
                                container
                                direction={"column"}
                                spacing={1}
                                className={myrefund1.text}
                              >
                                <Grid item>23,Dec 2022</Grid>
                                <Grid item>Chennai</Grid>
                                <Grid item>07:40 PM</Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                    </div>
                  );
                })}
              </TabPanel>
              <TabPanel value="2">
              {[1, 2, 3].map((item) => {
                  return (
                    <div style={{marginTop:'1rem'}}>
                    <Accordion expanded={expand}>
                      <AccordionSummary
                        sx={{ height: "2rem", minHeight: "3rem!important" }}
                        id="accord"
                      >
                        <Grid container>
                          <Grid item md={1.5} className={myrefund1.flighttext}>
                            IndiGo.GA212{" "}
                            <img
                              src={expand ? uparrow : downarrow}
                              alt="downarrow"
                              onClick={accordexpand}
                            />
                          </Grid>
                          <Grid
                            item
                            md={3}
                            textAlign={"center"}
                            className={myrefund1.text}
                          >
                            Transaction ID:T22099881877387654
                          </Grid>
                          <Grid
                            item
                            md={2.7}
                            textAlign={"center"}
                            className={myrefund1.text}
                          >
                            Payment:gomytrip@ybl
                          </Grid>
                          <Grid
                            item
                            md={1.2}
                            textAlign={"center"}
                            className={myrefund1.timedate}
                          >
                            21 Dec 2022
                          </Grid>
                          <Grid
                            item
                            md={1.2}
                            textAlign={"center"}
                            className={myrefund1.timedate}
                          >
                            08:30 PM
                          </Grid>
                          <Grid
                            item
                            md={1.2}
                            textAlign={"center"}
                            className={myrefund1.pendingtext}
                          >
                           Pending
                          </Grid>
                          <Grid
                            item
                            md={1.2}
                            textAlign={"center"}
                            className={myrefund1.text}
                          >
                            &#8377; 5,000
                          </Grid>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={1.5}>
                          <Divider />
                          <Grid container>
                            <Grid item md={1.5}>
                              <Grid
                                container
                                direction={"column"}
                                spacing={1}
                                className={myrefund1.text}
                              >
                                <Grid item>23,Dec 2022</Grid>
                                <Grid item>New Delhi</Grid>
                                <Grid item>05:30 PM</Grid>
                              </Grid>
                            </Grid>
                            <Grid item md={2} textAlign={"right"}>
                              <Grid
                                container
                                direction={"column"}
                                spacing={1}
                                className={myrefund1.text}
                              >
                                <Grid item>23,Dec 2022</Grid>
                                <Grid item>Chennai</Grid>
                                <Grid item>07:40 PM</Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                    </div>
                  );
                })}
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Myrefund;
