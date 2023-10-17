import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, TextField, Typography } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import React from 'react'
import { adminAddCoupoun } from '../../pages/Admin/AdminStyles';


const AdminFlightRefund = ({open,close}) => {
    const adminRefund = adminAddCoupoun()
    const inputProps = {
        step: 600,
      };

  return (
    <>
    <Dialog open={open} onClose={close} className={adminRefund.dialogradius}>
        <DialogTitle>
            <Grid container justifyContent={"space-between"} sx={{ borderRadius: "10%" }}>
                <Grid item md={10}>
                <Typography className={adminRefund.refundbus}>Refund Breakup</Typography>
                </Grid>
                <Grid item md={1}>
                <CloseIcon sx={{ borderRadius: "50%", color: "white", background: "#003556",}}
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
                <Typography className={adminRefund.totalcolor}>₹ 2,600</Typography>
                </Grid>
            </Grid>

            <Grid item>
                <Typography className={adminRefund.totalcolor}>Deductions</Typography>
            </Grid>
            <Grid container justifyContent={"space-between"}>
                <Grid item md={6}>
                <Typography className={adminRefund.black1}>Bus Cancellation Charges</Typography>
                </Grid>
                <Grid item >
                <Typography className={adminRefund.totalcolor}>- ₹300</Typography>
                </Grid>
                
            </Grid>
            <Grid container mt={1} mb={1}>
                    <TextField  size='small' label="change charges" inputProps={inputProps} />
                </Grid>
            <Grid item>
                <Divider sx={{background: "#000000"}}></Divider>
                <Grid container justifyContent={"space-between"}>
                <Grid item>
                    <Typography className={adminRefund.refundbus}>Total Refund</Typography>
                </Grid>
                <Grid item>
                    <Typography className={adminRefund.totalcolor}>₹2300</Typography>
                </Grid>
                </Grid>
                <Grid container justifyContent={"center"} mt={1}>
                <Grid item md={4} ml={4}>
                    <Button className={adminRefund.refundstyle}>
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

export default AdminFlightRefund