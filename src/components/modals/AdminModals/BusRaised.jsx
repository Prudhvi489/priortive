import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { adminAddCoupoun } from '../../pages/Admin/AdminStyles';

const BusRaised = ({ open, close, issueDetails }) => {
    const adminraised = adminAddCoupoun()
    const [details, setDetails] = useState('')

    useEffect(() => {
        setDetails(issueDetails)
    }, [issueDetails])

    return (
        <>
            <Dialog open={open} onClose={close} className={adminraised.dialogradius}>
                <DialogTitle>
                    <Grid container justifyContent={"space-between"} sx={{ borderRadius: "10%" }}>
                        <Grid item md={10}>
                            <Typography className={adminraised.refundbus}>Details</Typography>
                        </Grid>
                        <Grid item md={1}>
                            <CloseIcon sx={{ borderRadius: "50%", color: "white", background: "#003556", }}
                                onClick={close}
                            />
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent={"space-between"} gap={2}>
                        <Grid item>
                            <Typography className={adminraised.totalcolor}>Name</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminraised.black1}>{details?.name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"} gap={2}>
                        <Grid item>
                            <Typography className={adminraised.totalcolor}>Email</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminraised.black1}>{details?.email ?? "--"}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"} gap={2}>
                        <Grid item>
                            <Typography className={adminraised.totalcolor}>Phone Number</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminraised.black1}>{details?.mobile || "--"}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"} gap={2}>
                        <Grid item>
                            <Typography className={adminraised.totalcolor}>Date</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminraised.black1}>{details?.created_date ? details?.created_date.split('T')[0] : details?.created_date}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"} gap={2}>
                        <Grid item>
                            <Typography className={adminraised.totalcolor}>Booking ID</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminraised.black1}>{details?.booking_id || "--"}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"} gap={2}>
                        <Grid item>
                            <Typography className={adminraised.totalcolor}>Module</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminraised.black1}>{details?.module ===1?"flight":details?.module ===2?"Hotel":"Bus" || "--"}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography mb={1} mt={1} className={adminraised.refundbus}>issue</Typography>
                        <p style={{ width: "280px" }} className={adminraised.black1}>{details?.issue} </p>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BusRaised