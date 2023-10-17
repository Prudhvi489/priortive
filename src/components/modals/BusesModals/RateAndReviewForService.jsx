import React, { useRef, useState } from "react";
import { useSnackbar } from "notistack";
import {
    Grid,
    Button,
    IconButton,
    Dialog,
    DialogContent,
    Typography,
    Avatar,
    Paper,
    Stack,
    Container,
    TextField, Rating
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Apipost } from "../../../ApiServices/Apicalls";
import gomytripclient from "../../../GomytripClient";
const useStyles = makeStyles((theme) => ({
    MuiAccordionroot: {
        "&.MuiAccordion-root:before": {
            backgroundColor: "white",
        },
    },
    accordion: {
        '& > *': {
            margin: '0',
            padding: '0'
        },
    },
}));
const RateAndReviewForService = (props) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    let open = props.open;
    let closeForm = props.onClose;
    let bookingId = props.bookId;
    let module_type=props.module_type
    const handleReviewsDialog = (value) => (event) => {
        closeForm();
    };

    const [startRating, setStarRating] = useState(0)

    const textRef = useRef(null)


    const submitRatingForBooking = () => {
        const reviewText = textRef.current.value;

        if (!startRating) {
            enqueueSnackbar('Review is Required', { variant: 'error' })
            return
        } else if (!reviewText) {
            enqueueSnackbar('Description is Required', { variant: 'error' })
            textRef.current.focus()
            return
        }
        let reviewPay = {
            "booking_id":bookingId,
            "rating": startRating,
            "review": reviewText,
            "module":module_type
        }
         gomytripclient.post('userBookingsRateAndReview',reviewPay
         ).then(res=>{
            if(res.status){
                enqueueSnackbar(res.data.message,{variant:'success'})
                props.callBackReview()
                closeForm()
                setStarRating(0)
            }else{
                enqueueSnackbar(res.data.message,{variant:'error'})
            }
            console.log(res)
         }).catch(err=>{
            console.log(err)
         })
    }

    return (
        <React.Fragment>
            <Dialog
                sx={{
                    "& .MuiDialog-paper": {
                        width: "100%",
                        mixHeight: 580,
                        maxWidth: "420px",
                        borderRadius: "15px",
                    },
                }}
                maxWidth="xs"
                fullWidth={true}
                className="IssuesFormDialog"
                open={open}
                onClose={(e) => handleReviewsDialog(false)}
            //TransitionComponent={TransitionSlide}
            >
                {/* in form loading */}
                <Paper className="" elevation={0}>
                    <Grid className="travellercenter" container alignItems="center" justifyContent="center" position={'relative'}>
                        <Typography
                            textAlign="center"
                            color="#003556"
                            fontWeight="600"
                            padding={1.5}
                            variant=""
                            component=""
                            sx={{ fontSize: "20px" }}

                        >
                            Please Rate us
                        </Typography>
                        <Grid item sx={{ position: 'absolute', right: '1%' }}>
                            <IconButton onClick={handleReviewsDialog(false)}>
                                <CancelRoundedIcon sx={{ color: "#003556" }} />
                            </IconButton>
                        </Grid>

                    </Grid>

                </Paper>
                <DialogContent
                    className="dialogContent"
                    sx={{ padding: "0 20px 25px 20px" }}
                >
                    <Grid
                        container
                        mt={2}
                        // sx={{ display: "flex", justifyContent: "center" }}
                        flexDirection={'column'}
                        spacing={2.5}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Grid item md={12}>
                            <Rating value={startRating} onChange={(e, value) => setStarRating(value)} name="half-rating" precision={1} size="large" />
                        </Grid>
                        <Grid item md={12}>
                            <TextField multiline
                                rows={5}
                                placeholder="Write a Review"
                                label='Write a Review'
                                id='reviewText'
                                inputRef={textRef}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                disableRipple
                                sx={{ background: "#003556!important" }}
                                variant="contained"
                                onClick={(e) => { submitRatingForBooking() }}
                            >
                                Done
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};
export default RateAndReviewForService;
