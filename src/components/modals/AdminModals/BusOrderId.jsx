import { Alert, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { adminAddCoupoun } from '../../pages/Admin/AdminStyles';
import { getTimeDifferenceBtTwoDates } from '../../pages/Buses/BusModuleHelperFunctions';
import helperFunctions from '../../../helpers/helperFunctions';

const BusOrderId = ({ open, close, openfund, passengers, bookingDetails }) => {
    const adminAddCoupou = adminAddCoupoun()
    return (
        <>
            <Dialog sx={{ minWidth: '390px' }} open={open} onClose={close} className={adminAddCoupou.dialogradius}>
                <DialogTitle sx={{ backgroundColor: "#003556" }}>
                    <Grid
                        container
                        justifyContent={"space-between"}
                        sx={{ borderRadius: "10%" }}
                    >
                        <Grid item md={10}>
                            <Typography sx={{ color: "#ffff" }}>ORDER ID:{bookingDetails?.bookingId}</Typography>
                        </Grid>
                        <Grid item md={1}>
                            <CloseIcon className={adminAddCoupou.closeicon} onClick={close} />
                        </Grid>
                    </Grid>
                </DialogTitle>
             

                <DialogContent>
                    <Grid padding={0}>
                {passengers?.map((mapData => {
                    return (
                        <Grid container sx={{ background: "#DEF2FF", width: "100%" }} pt={2} pb={2}>
                            <Grid item md={4} pl={2.9}>
                                <Typography>{mapData?.FirstName} {mapData?.LastName}/{mapData?.Title==1?"M":"F"}</Typography>
                            </Grid>
                            <Grid item md={4}>
                                <Typography>Seat: {mapData?.Seat?.SeatName}</Typography>
                            </Grid>
                            <Grid item md={4}>
                                <Typography className={adminAddCoupou.colorconfirmed}>Confirmed</Typography>
                            </Grid>
                        </Grid>
                    )
                }))}
                </Grid>
                    <Grid container spacing={2} mb={3}>
                        {bookingDetails?.cancel_remarks&&<Grid item md={12} mt={1}>
                            <Alert severity='error' variant='outlined' icon={false}>
                               Cancel Info :  {bookingDetails?.cancel_remarks}
                            </Alert>
                        </Grid>}
                        <Grid item md={12}>
                            <Typography variant="h6" sx={{ fontWeight: "500", fontSize: "18px" }}>{bookingDetails?.travel_name}</Typography>
                            <Grid container justifyContent={"space-between"} md={12} mb={1}>
                                <Grid item md={9} >
                                    <Typography mt={1} className={adminAddCoupou.black1}>{bookingDetails?.BusType}</Typography>
                                </Grid>
                                {bookingDetails?.booking_status!=0&& bookingDetails?.refund_status===0&&<Grid item >
                                    <Button className={adminAddCoupou.refundstyle} onClick={openfund}>
                                        Refund
                                    </Button>
                                </Grid>}
                            </Grid>

                            <Typography className={adminAddCoupou.colorconfirmed} mt={1}>{bookingDetails?.boardingpoint_time?getTimeDifferenceBtTwoDates(bookingDetails?.boardingpoint_time,bookingDetails?.droppingpoint_time):"N/A"}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container mb={2}>
                        <Grid item md={5.6}>
                            <Grid item className={adminAddCoupou.black}>{bookingDetails?.boardingpoint_time?bookingDetails?.boardingpoint_time.slice(11,16):"N/A"}</Grid>
                            <Grid item className={adminAddCoupou.black}>{bookingDetails?.boardingpoint_time?helperFunctions.getshortdate(bookingDetails?.boardingpoint_time):"N/A"}</Grid>
                            <Grid item className={adminAddCoupou.black1}>{bookingDetails?.origin}</Grid>
                            <Grid item className={adminAddCoupou.black1}>{bookingDetails?.boardingpoint_name}</Grid>
                        </Grid>
                        <Grid item className={adminAddCoupou.bordercolor} mr={2}></Grid>
                        <Grid item md={5.6}>
                        <Grid item className={adminAddCoupou.black}>{bookingDetails?.droppingpoint_time?bookingDetails?.droppingpoint_time.slice(11,16):"N/A"}</Grid>
                            <Grid item className={adminAddCoupou.black}>{bookingDetails?.droppingpoint_time?helperFunctions.getshortdate(bookingDetails?.droppingpoint_time):"N/A"}</Grid>
                            <Grid item className={adminAddCoupou.black1}>{bookingDetails?.destination}</Grid>
                            <Grid item className={adminAddCoupou.black1}>{bookingDetails?.droppingpoint_name}</Grid>
                        </Grid>
                    </Grid>
                    {bookingDetails?.booking_status!=0&&<Grid container>
                        <Typography className={adminAddCoupou.refundbus} mb={1}>Refund Breakup</Typography>
                    </Grid>}
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminAddCoupou.totalcolor}>Published Price</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminAddCoupou.totalcolor}>₹ {bookingDetails?.published_price}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminAddCoupou.totalcolor}>Discount Copoun</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminAddCoupou.totalcolor}>- ₹ {bookingDetails?.discount}</Typography>
                        </Grid>
                    </Grid>
                    {/* <Grid item>
                        <Typography className={adminAddCoupou.totalcolor}>Deductions</Typography>
                    </Grid> */}
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminAddCoupou.black1}>Fee & Surcharges</Typography>
                        </Grid>
                        <Grid item >
                            <Typography className={adminAddCoupou.totalcolor}>+ ₹ {bookingDetails?.admin_commission}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Divider sx={{ background: "#000000" }}></Divider>
                        <Grid container justifyContent={"space-between"}>
                            <Grid item>
                                <Typography className={adminAddCoupou.refundbus}>Total</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={adminAddCoupou.totalcolor}>₹ {bookingDetails?.total_price}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BusOrderId