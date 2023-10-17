import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, TextField, Typography } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from 'react'
import { adminAddCoupoun } from '../../pages/Admin/AdminStyles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import GomytripClient from '../../../GomytripClient'
import { enqueueSnackbar } from "notistack";

const BusRefund = ({ open, close, bookingDetails }) => {
    console.log(bookingDetails, 'bookingDetails');
    const adminRefund = adminAddCoupoun()

    const inputProps = {
        step: 600,
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        setTotalRefundAmount((Number(bookingDetails?.total_price) + Number(bookingDetails?.discount)) - (Number(event.target.value) + Number(bookingDetails?.admin_commission)))
        setValue(event.target.value);
    };

    useEffect(() => {
        setValue(bookingDetails?.user_cancelcharge)
        setTotalRefundAmount((Number(bookingDetails?.total_price) + Number(bookingDetails?.discount)) - (Number(bookingDetails?.user_cancelcharge) + Number(bookingDetails?.admin_commission)))

    }, [bookingDetails])

    const [loading, setLoading] = useState(false)

    const [totalRefundAmount, setTotalRefundAmount] = useState(0)

    const handleTextBoxChange = (e) => {
        setValue(e.target.value)
        setTotalRefundAmount((Number(bookingDetails?.total_price) + Number(bookingDetails?.discount)) - (Number(e.target.value) + Number(bookingDetails?.admin_commission)))
    }

    const adminProceedRefundToUser = () => {
        setLoading(true)
        GomytripClient.post('/adminBusRefund', { "bookingId": bookingDetails.bookingId, "admin_cancelcharges": value, "refund_amount": totalRefundAmount }
        ).then(res => {
            if (res.data.status === 1) {
                enqueueSnackbar(res.data.message, { variant: 'success' })
                close()
            } else {
                enqueueSnackbar(res.data.message, { variant: 'error' })
                setLoading(false)
            }
            console.log(res);
        }).catch(e => {
            setLoading(false)
            console.log(e);
        })
    }

    return (
        <>
            <Dialog open={open} onClose={close} className={adminRefund.dialogradius}>
                <DialogTitle>
                    <Grid container justifyContent={"space-between"} sx={{ borderRadius: "10%" }}>
                        <Grid item md={10}>
                            <Typography className={adminRefund.refundbus}>Refund Breakup</Typography>
                        </Grid>
                        <Grid item md={1}>
                            <CloseIcon sx={{ borderRadius: "50%", color: "white", background: "#003556", }}
                                onClick={close}
                            />
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminRefund.totalcolor}>Total Paid</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminRefund.totalcolor}>₹ {bookingDetails?.total_price + bookingDetails?.discount}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography className={adminRefund.totalcolor}>Deductions</Typography>
                    </Grid>

                    <Grid container justifyContent={"space-between"}>
                        <Grid item md={6}>
                            <Typography className={adminRefund.black1}>Fee & Surcharges</Typography>
                        </Grid>
                        <Grid item >
                            <Typography className={adminRefund.totalcolor}>- ₹ {bookingDetails?.admin_commission}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent={"space-between"}>
                        <Grid item md={6}>
                            <Typography className={adminRefund.black1}>Bus Cancellation Charges</Typography>
                        </Grid>
                        <Grid item >
                            <Typography className={adminRefund.totalcolor}>- ₹ {value}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container mt={1} mb={1}>
                        <FormControl disabled={loading}>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value={bookingDetails?.user_cancelcharge} control={<Radio />} label={`user cancel charge (${bookingDetails?.user_cancelcharge})`} />
                                <FormControlLabel value={bookingDetails?.tbo_cancelcharges} control={<Radio />} label={`tbo cancel charges (${bookingDetails?.tbo_cancelcharges})`} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid container mt={1} mb={1}>
                        <TextField error={value > bookingDetails?.published_price} helperText={value > bookingDetails?.published_price ? "Cancellation charges greater than published price" : ""} value={value} onChange={(e) => handleTextBoxChange(e)} size='small' label="change charges" inputProps={inputProps} variant='filled' />
                    </Grid>

                    <Grid item>
                        <Divider sx={{ background: "#000000" }}></Divider>
                        <Grid container justifyContent={"space-between"}>
                            <Grid item>
                                <Typography className={adminRefund.refundbus}>Total Refund</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={adminRefund.totalcolor}>₹ {(Number(bookingDetails?.total_price) + Number(bookingDetails?.discount)) - (Number(value) + Number(bookingDetails?.admin_commission))}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={"center"} mt={1}>
                            <Grid item md={4} ml={4}>
                                <Button disabled={value > bookingDetails?.published_price || loading} onClick={() => adminProceedRefundToUser()} className={adminRefund.refundstyle}>
                                    Refund
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BusRefund