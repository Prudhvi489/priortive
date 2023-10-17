import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DateRangePicker } from 'react-dates';
import revenue from "../../../assets/AdminAssets/revenue.svg";
import vendor from "../../../assets/AdminAssets/vendor.svg";
import yourshare from "../../../assets/AdminAssets/yourshare.svg";
import refund from "../../../assets/AdminAssets/refund.svg";
import { adminAddCoupoun, adminTables } from "./AdminStyles";

const AdminTotal = () => {
    const adminAddCoupo = adminAddCoupoun();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const handleFocusChange = (focusedInput) => {
        setFocusedInput(focusedInput);
    };
    return (
        <div>
            <Grid container>
                <Grid container spacing={2} justifyContent={"end"} mt={1} mb={2}>
                <Grid item md={'auto'} className="start-end-dates-admin">
                  <Grid style={{border:'1px solid #003556',paddingLeft: '0.11rem',paddingRight:'0.3rem',borderRadius:'0.3rem'}} container alignItems="center">
                    <DateRangePicker
                      startDate={startDate}
                      startDateId="startdate"
                      endDate={endDate}
                      endDateId="enddate"
                      // startDatePlaceholderText="Start Date"
                      small="true"
                      onDatesChange={handleDatesChange}
                      focusedInput={focusedInput}
                      onFocusChange={handleFocusChange}
                      isOutsideRange={() => false} // Optional: Allows selection of past dates
                      noBorder={true}
                    />
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="#003556" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.7025 8.59546C16.7025 8.66255 16.7025 8.71982 16.7025 8.77751C16.7025 10.5104 16.7038 12.2432 16.7021 13.9761C16.7012 14.9906 16.0851 15.803 15.1385 16.0295C14.9643 16.0709 14.7803 16.085 14.6006 16.085C11.4568 16.0885 8.31347 16.0885 5.16971 16.0868C4.09504 16.0859 3.27142 15.4004 3.08953 14.3594C3.06946 14.2449 3.06733 14.1261 3.06733 14.009C3.06605 12.2548 3.06647 10.5005 3.06647 8.74674C3.06647 8.69973 3.07074 8.65272 3.07373 8.59546C7.61239 8.59546 12.1442 8.59546 16.7025 8.59546Z" />
                    <path d="M13.9778 4.48918C14.2096 4.48918 14.4167 4.4879 14.6238 4.48918C15.8197 4.4973 16.695 5.37506 16.7031 6.57375C16.7044 6.78101 16.7031 6.98827 16.7031 7.20579C12.1564 7.20579 7.62111 7.20579 3.08373 7.20579C3.00432 6.36051 3.08117 5.5695 3.78524 4.97592C4.13023 4.6849 4.52517 4.51482 4.97691 4.49559C5.24162 4.48405 5.5072 4.49345 5.79241 4.49345C5.79241 4.25243 5.79241 4.03064 5.79241 3.80885C5.79241 3.59048 5.79113 3.37168 5.79284 3.15331C5.79583 2.74777 6.07634 2.44948 6.45848 2.44307C6.85257 2.43623 7.14846 2.72383 7.157 3.1375C7.16511 3.52125 7.15913 3.90501 7.15913 4.28876C7.15913 4.34688 7.15913 4.40499 7.15913 4.47593C8.97801 4.47593 10.7849 4.47593 12.6106 4.47593C12.6106 4.34901 12.6106 4.22808 12.6106 4.10671C12.6106 3.78706 12.6064 3.46698 12.6119 3.14733C12.6196 2.73195 12.9091 2.44008 13.3015 2.44264C13.6917 2.44521 13.9752 2.74392 13.9774 3.15929C13.9795 3.59561 13.9778 4.03193 13.9778 4.48918Z" />
                    </svg>
                  </Grid>
                  </Grid>
                    {/* <Grid item>
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onDatesChange={handleDatesChange}
                            focusedInput={focusedInput}
                            onFocusChange={handleFocusChange}
                            isOutsideRange={() => false}
                        />
                    </Grid> */}
                    <Grid item>
                    <Button
                      className="bg-p"
                      size="small"
                      variant="contained"
                      onClick={(e) => {
                        setStartDate("");
                        setEndDate("");
                      }}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={12}>
                        <Paper elevation={3} className={adminAddCoupo.totalmaincard} >
                            <Grid container columnGap={2} justifyContent={'space-evenly'}>
                                
                                <Grid item xs={3} sm={5} md my={2}>
                                    <Paper className={adminAddCoupo.totalcard} sx={{borderRadius: "30px",}}>
                                        <Grid container justifyContent={"center"} my={1} flexDirection={'column'} alignItems={'center'}>
                                            <Grid item md={7}>
                                                <img
                                                    src={revenue}
                                                    alt="Total Revenue"
                                                    className={adminAddCoupo.totalcardimage}
                                                />
                                            </Grid>
                                            <Grid item md={7} mt={2}><Typography>Total Revenue</Typography></Grid>
                                            <Grid item md={7}><Typography className={adminAddCoupo.totaltextfont}>20,00,000 INR</Typography></Grid>
                                        </Grid>
                                    </Paper>

                                </Grid>
                                <Grid item xs={3} sm={5} md my={2}>
                                    <Paper className={adminAddCoupo.totalcard} sx={{borderRadius: "30px",}}>
                                        <Grid container justifyContent={"center"} my={1} flexDirection={'column'} alignItems={'center'}>
                                            <Grid item md={7}>
                                                <img
                                                    src={vendor}
                                                    alt="Total Revenue"
                                                    className={adminAddCoupo.totalcardimage}
                                                />
                                            </Grid>
                                            <Grid item md={7} mt={2}><Typography>Vendor Share</Typography></Grid>
                                            <Grid item md={7}><Typography className={adminAddCoupo.totaltextfont}>15,00,000 INR</Typography></Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3} sm={5} md my={2}>
                                    <Paper className={adminAddCoupo.totalcard} sx={{borderRadius: "30px",}}>
                                        <Grid container justifyContent={"center"} my={1} flexDirection={'column'} alignItems={'center'}>
                                            <Grid item md={7}>
                                                <img
                                                    src={yourshare}
                                                    alt="Your Share"
                                                    className={adminAddCoupo.totalcardimage}
                                                />
                                            </Grid>
                                            <Grid item md={7} mt={2}><Typography>Your Share</Typography></Grid>
                                            <Grid item md={7}><Typography className={adminAddCoupo.totaltextfont}>5,00,000 INR</Typography></Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3} sm={5} md my={2}>
                                    <Paper className={adminAddCoupo.totalcard} sx={{borderRadius: "30px",}}>
                                        <Grid container justifyContent={"center"} my={1} flexDirection={'column'} alignItems={'center'}>
                                            <Grid item md={7}>
                                                <img
                                                    src={refund}
                                                    alt="Refund Amount"
                                                    className={adminAddCoupo.totalcardimage}
                                                />
                                            </Grid>
                                            <Grid item md={7} mt={2}><Typography>Refund Amount</Typography></Grid>
                                            <Grid item md={7}><Typography className={adminAddCoupo.totaltextfont}>87,000 INR</Typography></Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminTotal