import { Container, Grid, Paper } from '@mui/material'
import React from 'react'
import indigo from "../../../../assets/images/indigo.svg";
import { mybookingstyles } from '../../../../assets/styles/Flights';
import plane from '../../../../assets/images/plane.svg';
import onestop from '../../../../assets/images/onestop.svg';
import {styles} from '../../../../assets/styles/Styles_export'
const Flightcard = () => {
    const mybooking = mybookingstyles();

  return (
    <div>
        
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
                                              backgroundColor: "styles.app_color",
                                              padding: "0.8rem 1.5rem",
                                              border: "none",
                                              borderBottomRightRadius: "0.5rem",
                                              fontSize: "14px",
                                            }}
                                          >
                                           Rateus
                                          </button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Paper>
    </div>
  )
}

export default Flightcard