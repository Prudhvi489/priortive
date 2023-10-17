import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { adminAddCoupoun } from '../../pages/Admin/AdminStyles';
import cabin from "../../../assets/AdminAssets/cabin.svg"
import checkin from "../../../assets/AdminAssets/check-in.svg"
import flighticon from "../../../assets/AdminAssets/flighticon.png"

const AdminFlightView = ({ open, close, openfund }) => {
    const adminAddCoupou = adminAddCoupoun()
    return (
        <>
            <Dialog open={open} onClose={close} sx={{
                "& .MuiDialog-paper ": {
                    maxWidth: "360px",
                }
            }} className={adminAddCoupou.dialogradius}>
                <DialogTitle sx={{ backgroundColor: "#003556" }}>
                    <Grid
                        container
                        justifyContent={"space-between"}
                        sx={{ borderRadius: "10%" }}
                    >
                        <Grid container >
                            <Grid item md={5.4}>
                                <Typography sx={{ color: "#ffff", fontSize: "12px" }}>TICKET NO: NU7123399400008</Typography>
                            </Grid>
                            <Grid item md={0.1} sx={{ borderLeft: " 1px solid #ffff" }}></Grid>
                            <Grid item md={5.4}>
                                <Typography pl={1} sx={{ color: "#ffff", fontSize: "12px" }}>ORDER ID:  208833992</Typography>
                            </Grid>
                            <Grid item md={1}>
                                <CloseIcon className={adminAddCoupou.closeicon} onClick={close} />
                            </Grid>
                        </Grid>
                    </Grid>

                </DialogTitle>
                <Grid container sx={{ background: "#DEF2FF", width: "100%" }} pt={2} pb={2}>
                    <Grid item pl={2.9}>
                        <Typography variant='h6'>Koppaka harshavardhan</Typography>
                    </Grid>
                    <Grid container>
                        <Grid item pl={2.9}>
                            <Typography className={adminAddCoupou.colorconfirmed}>24, Male  .</Typography>
                        </Grid>
                        <Grid item >
                            <Typography className={adminAddCoupou.colorconfirmed}> Adult .</Typography>
                        </Grid>
                        <Grid item >
                            <Typography className={adminAddCoupou.colorconfirmed}>Seat No. 11D</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <DialogContent className='scroll_none1'>
                    <Grid container spacing={2} mb={3}>
                        <Grid item md={12}>
                            <Grid container  >
                                <Grid item md={1}>
                                    <img src={flighticon} /> 
                                </Grid>
                                <Grid item md={11}>
                                <Typography variant="h6" sx={{ fontWeight: "500", fontSize: "14px" }}>IndiGo</Typography>
                                </Grid>
                            </Grid>


                            <Grid container justifyContent={"space-between"} md={12} mb={1}>
                                <Grid item md={9} >
                                    <Typography mt={1} className={adminAddCoupou.black1}>IN 4465</Typography>
                                </Grid>
                                <Grid item >
                                    <Button className={adminAddCoupou.refundstyle} onClick={openfund}>
                                        Refund
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container mt={1} mb={1} justifyContent={"space-between"}>
                                <Grid item ><Typography className={adminAddCoupou.boldstyle}>Chennai - New Delhi</Typography></Grid>
                                <Grid item ><Typography className={adminAddCoupou.boldstyle}>Economy</Typography></Grid>
                            </Grid>
                            <Divider className={adminAddCoupou.dividermargin}  sx={{ background: "#003556" }}></Divider>
                            {/* sx={{ background: "#DEF2FF"}} */}
                            <Grid container className={adminAddCoupoun.bgcolor} justifyContent={"center"}>
                                <Typography className={adminAddCoupou.boldstyle} mt={1}>1h 03m. Non-Stop</Typography>
                            </Grid>
                            <Divider className={adminAddCoupou.dividermargin} sx={{ background: "#003556" }}></Divider>
                        </Grid>
                    </Grid>
                    {/* sx={{background: "#DEF2FF"}} */}
                    <Grid container mb={2}  >
                        <Grid item md={5.6}>
                            <Grid item className={adminAddCoupou.black}>06:30 PM, Chennai</Grid>
                            <Grid item className={adminAddCoupou.black}>Sat, 28Dec 22</Grid>
                            <Grid item className={adminAddCoupou.colorconfirmed}>Indira Gandhi International</Grid>
                            {/* <Grid item className={adminAddCoupou.black1}>Sarpavaram Junction-Kkd</Grid> */}
                        </Grid>
                        <Grid item className={adminAddCoupou.bordercolor} mr={2}></Grid>
                        <Grid item md={5.6}>
                            <Grid item className={adminAddCoupou.black}>07:30 PM, New Delhi</Grid>
                            <Grid item className={adminAddCoupou.black}>Sat, 28Dec 22</Grid>
                            <Grid item className={adminAddCoupou.colorconfirmed}>Chennai International Airport</Grid>
                            <Grid item className={adminAddCoupou.colorconfirmed}>Terminal 2</Grid>
                        </Grid>
                    </Grid>
                    <Divider className={adminAddCoupou.dividermargin} sx={{ background: "#003556" }}></Divider>
                    {/* <Grid container>
            <Divider className={adminAddCoupou.dividermargin} sx={{background: "#003556"}}></Divider>
                <Grid container   sx={{ background: "#DEF2FF"}} justifyContent={"center"}>
                    <Typography className={adminAddCoupou.colorconfirmed} mt={1}>1h 03m. Non-Stop</Typography>
                </Grid>
                 <Divider className={adminAddCoupou.dividermargin} sx={{background: "#003556"}}></Divider>

            </Grid> */}
                    <Grid container mt={1}>
                        <Typography className={adminAddCoupou.boldstyle} >Check In & Cabin - Bagggage</Typography>
                        <Grid container mt={1} justifyContent={"space-between"}>
                            <Grid item><img src={cabin} style={{ marginRight: "5px" }} /><span>Cabin bag </span></Grid>
                            <Grid item>7kg</Grid>
                        </Grid>
                        <Grid container mt={1} justifyContent={"space-between"} >
                            <Grid item ><img src={checkin} style={{ marginRight: "5px" }} /><span>Check-in bag</span></Grid>
                            <Grid item>15kgs</Grid>
                        </Grid>
                    </Grid>
                    {/* sx={{background: "#DEF2FF"}} py={1} pl={2.8} ml={-2.8} mt={1}*/}
                    <Grid container sx={{ background: "#DEF2FF" }} py={1} pr={2.8} pl={2.8} ml={-2.8} width={"355px"} justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminAddCoupou.boldstyle}>Total fare</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminAddCoupou.boldstyle}>₹ 2,600</Typography>
                        </Grid>
                    </Grid>
                    <Grid container mt={1} justifyContent={"space-between"}>
                        <Grid item>
                            <Typography >Transaction ID </Typography>
                        </Grid>
                        <Grid item>
                            <Typography >T22099881877387654</Typography>
                        </Grid>
                    </Grid>
                    <Grid container mt={1} justifyContent={"space-between"}>
                        <Grid item>
                            <Typography >Payment  </Typography>
                        </Grid>
                        <Grid item>
                            <Typography >harshavardhan@Ybl</Typography>
                        </Grid>
                    </Grid>
                    <Grid container mt={1} justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminAddCoupou.boldstyle}>Successful</Typography>
                        </Grid>
                        <Grid item>
                            <Typography >21 Dec 2022 | 08:30 PM</Typography>
                        </Grid>
                    </Grid>
                    {/* <Grid item>
                <Typography className={adminAddCoupou.totalcolor}>Deductions</Typography>
            </Grid>
            <Grid container justifyContent={"space-between"}>
                <Grid item>
                    <Typography className={adminAddCoupou.black1}>Bus Cancellation Charges</Typography>
                </Grid>
                <Grid item>
                    <Typography className={adminAddCoupou.totalcolor}>- ₹300</Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Divider sx={{background: "#000000"}}></Divider>
                <Grid container justifyContent={"space-between"}>
                <Grid item>
                    <Typography className={adminAddCoupou.refundbus}>Total Refund</Typography>
                </Grid>
                <Grid item>
                    <Typography className={adminAddCoupou.totalcolor}>₹2300</Typography>
                </Grid>
                </Grid>
            </Grid> */}
                </DialogContent>
            </Dialog >
        </>
    )
}
export default AdminFlightView