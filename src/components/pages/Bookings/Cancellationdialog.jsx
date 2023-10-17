import { Dialog, DialogActions, Grid, TextField, Divider, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import gomytripclient from "../../../GomytripClient";
import {styles} from '../../../assets/styles/Styles_export'
const Cancellationdialog = (props) => {
  const { open, close, endpoint, cancel_req, callBackcancellation } = props;
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  // for snackbar
  // const [snackopen, setSnackopen] = useState(false);
  // const [snackmessage, setSnackmessage] = useState("");
  // function snackclose() {
  //   setSnackopen(false);
  // };
  //
  const baseurl = process.env.REACT_APP_BASEURL;
  let cancelData = props?.cancelData?.length > 0 && props?.cancelData[0];
  console.log(cancelData, 'cancelData')
  const totalRefundAmount = cancelData?.cancel_info?.reduce((sum, obj) => sum + obj.RefundedAmount, 0)

  const [remarks, setRemarks] = useState("");
  const handleclose = () => {
    close();
  };
  const handleBookingCancelApi = async () => {
    try {
      if (remarks === "") {
        // setSnackopen(true);
        // setSnackmessage("Enter the cancellation remark");
        alert("Enter the cancellation remark");
        return;
      }
      let cancelobj;
      if (cancel_req.module_type === 2) {
        cancelobj = {
          BookingId: cancel_req.BookingId,
          RequestType: cancel_req.RequestType,
          Remarks: remarks,
        };
      }

      if (cancel_req.module_type === 3) {
        cancelobj = {
          "busId": cancel_req.busId, "remarks": remarks, "booking_id": cancel_req.BookingId
        }
      }
      setIsCancelLoading(true)
      const res = await axios.post(`${baseurl}/${endpoint}`, cancelobj);
      console.log(res?.data.message.ErrorMessage);
      if (res?.data?.status === 1) {
        callBackcancellation();
        close();
        enqueueSnackbar(res.data.message, { variant: 'success' })
      } else {
        enqueueSnackbar(res?.data.message.ErrorMessage, { variant: 'error' });
        setIsCancelLoading(false)
      }
    } catch (error) {
      // console.log(error)
    }
    setIsCancelLoading(false)

  };

  const [cancelCharges, setCancelCharges] = useState(0)
  console.log(cancelCharges, 'cancelCharges')
  useEffect(() => {
    if (cancel_req.module_type === 3) {
      gomytripclient.post('/getCancellationCharges', { "BusId": cancel_req.busId }
      ).then(res => {
        if (res.data.status === 1) {
          setCancelCharges(res.data.data.cancelCharges)
        } else {
          enqueueSnackbar(res.data.message, { variant: 'success' })
        }
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [open])

  return (
    <>
      {/* <MySnackbar open={snackopen} close={snackclose} message={snackmessage} /> */}
      <Dialog
        open={open}
        maxWidth="xs"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            // mixHeight: 580,
            // maxWidth: "250px",
            borderRadius: "15px",
            padding: "0.7rem",
          },
        }}
        onClose={handleclose}
      >
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <span className="bookingCancelHead">
              This is the final step of cancellation
            </span>
          </Grid>
          <Grid item textAlign={"right"} sx={{ color: styles.app_color }}>
            {" "}
            <CancelIcon onClick={() => handleclose()} />
          </Grid>
        </Grid>

        {/* -----------------  BUs refund info in cancel */}
        {cancelCharges &&
          <>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <span className="c-000 f-w-500">
                  Refund Breakup
                </span>
              </Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} spacing={3} mt={.5}>
              <Grid item>
                <p className="f-w-700">Total Paid</p>
              </Grid>
              <Grid item>
                <p className="f-w-700">₹ {cancelData?.total_price}</p>
              </Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} spacing={3} mt={.1}>
              <Grid item>
                <p className="f-w-700">Fee & Surcharges</p>
              </Grid>
              <Grid item>
                <p className="f-w-700">-  ₹{cancelData?.admin_commission}</p>
              </Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} spacing={3} mt={.1}>
              <Grid item>
                <p className="f-w-700">Deductions</p>
              </Grid>
              <Grid item>
                <p className="f-w-700">-  ₹{cancelData?.total_price >= cancelCharges ? cancelCharges : cancelData?.total_price}</p>
              </Grid>
            </Grid>
            <span>Bus Cancellation Charges</span>
            <Divider sx={{ margin: '15px 0' }} />
            <Grid container justifyContent={'space-between'} spacing={3}>
              <Grid item>
                <p className="f-w-700 c-p">Total Refund</p>
              </Grid>
              <Grid item>
                <p className="f-w-700">₹ {cancelData?.total_price - cancelCharges - cancelData?.admin_commission < 0 ? 0 : cancelData?.total_price - cancelCharges - cancelData?.admin_commission}</p>
              </Grid>
              {cancelData?.total_price - cancelCharges - cancelData?.admin_commission < 0 && <Grid item md={12}>
                <Alert variant="outlined" severity="error">
                  Unable to refund due to insufficient payment compared to cancellation charges.                </Alert>
              </Grid>}
            </Grid>
            <Divider sx={{ margin: '15px 0' }} />
          </>}
        {/* -----------------  BUs refund info in cancel */}

        {/* <Container> */}
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <span style={{ color: '#303030', fontWeight: 500 }}>
              Please confirm to cancel your ticket(s). Once cancelled, your
              booking can not be reinstated.
            </span>
            <TextField
              label="Remark"
              placeholder="Please Enter Remark"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              multiline
              rows={3}
              sx={{ margin: "12px 0" }}
              fullWidth
              id="remarkForCancel"
            />
            <br />
            <span id="textError" className="goAdminErrorMessages"></span>
          </Grid>
        </Grid>
        {/* </Container> */}

        <DialogActions sx={{ justifyContent: "center" }}>
          <LoadingButton
            sx={{
              backgroundColor: `${styles.app_color}!important`,
              color: "#ffff",
              padding: "5px 10px",
              textTransform: "none",
              fontWeight: "600",
              "& .MuiLoadingButton-loadingIndicator": {
                color: "#97a8ff",
              },
            }}
            onClick={() => handleBookingCancelApi()}
            loading={isCancelLoading}
          >
            Confirm cancellation
          </LoadingButton>
          {/* <Button
            sx={{
              backgroundColor: "#003556!important",
              color: "#ffff",
              padding: "5px 10px",
              textTransform: "none",
              fontWeight: "600",
            }}
            onClick={() => handleBookingCancelApi()}
          >
            Confirm cancellation
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cancellationdialog;
