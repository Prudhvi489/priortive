import {
    Grid,
    Divider,
    Button, Dialog, DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const ShowFareDeductionCharges = (props) => {
    let open = props.open;
    let closeForm = props.onClose;
    let cancelData = props.cancelData[0];

    const totalRefundAmount = cancelData?.cancel_info?.reduce((sum, obj) => sum + obj.RefundedAmount, 0)

    const handleDialog = (value) => (event) => {
        closeForm();
    };
    return (
        <>
            <Dialog
                open={open}
                maxWidth='xs'
                sx={{
                    "& .MuiDialog-paper": {
                        width: "100%",
                        // mixHeight: 580,
                        // maxWidth: "250px",
                        borderRadius: "15px",
                        padding: "0.7rem",
                    },
                }}
                onClose={(e) => handleDialog(false)}
            >
                <Grid container justifyContent={'space-between'}>
                    <Grid item>
                        <span className="c-000 f-w-500">
                            Refund Breakup
                        </span>
                    </Grid>
                </Grid>
                {/* <Container> */}
                <Grid container justifyContent={'space-between'} spacing={3} mt={.5}>
                    <Grid item>
                        <p className="f-w-500">Total Paid</p>
                    </Grid>
                    <Grid item>
                        <p className="f-w-700">₹ {cancelData?.total_price}</p>
                    </Grid>
                </Grid>
                <p style={{marginTop:'10px'}} className="c-p f-w-700">Deductions</p>
                <Grid container justifyContent={'space-between'} spacing={0} mt={.1}>
                    <Grid item>
                        <p className="f-w-500">Bus Cancellation charges</p>
                        <p className="f-w-500">Fee & Surcharges </p>
                    </Grid>
                    <Grid item>
                        <p className="f-w-700">-  ₹{cancelData?.user_cancelcharge}</p>
                        <p className="f-w-700">-  ₹{cancelData?.admin_commission}</p>

                    </Grid>
                </Grid>
                <span>Bus Cancellation Charges</span>
                <Divider />
                <Grid container justifyContent={'space-between'} spacing={3}>
                    <Grid item>
                        <p className="f-w-700 c-p">Total Refund</p>
                    </Grid>
                    <Grid item>
                        <p className="f-w-700">₹ {cancelData?.total_price -(cancelData?.user_cancelcharge +cancelData?.admin_commission)}</p>
                    </Grid>
                </Grid>
                {/* </Container> */}
                <DialogActions sx={{ justifyContent: 'flex-end' }}>
                    <Button
                        sx={{
                            backgroundColor: "#003556!important",
                            color: "#ffff",
                            padding: "5px 10px",
                            textTransform: "none",
                            fontWeight: "600",
                        }}
                        onClick={handleDialog(false)}//handleBookingCancelApi()}
                    >
                        OK
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default ShowFareDeductionCharges