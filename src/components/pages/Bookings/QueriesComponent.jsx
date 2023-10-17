import {
    Container
    , Paper, Grid, TextField
} from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CallIcon from '@mui/icons-material/Call';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, Controller } from "react-hook-form";
import EmailIcon from '@mui/icons-material/Email';
const QueriesComponent = (props) => {
    const { module_type, booking_id,adminDetails } = props;
    const baseurl = process.env.REACT_APP_BASEURL;
    const {
        register,
        handleSubmit,
        formState: { errors }, reset, setValue, control
    } = useForm();
    const [isLoading, setIsLoading] = useState(false)

    const raiserequest_api = async (formData) => {
        setIsLoading(true)
        try {
            //   if(issue_data===""){
            //     enqueueSnackbar("Please enter description",{variant:'error'})
            //     return;
            //   }
            const raise_reqobj = {
                "user_id": localStorage.getItem("userid"),
                "issue": formData.comment,
                "module": module_type.toString(),
                "booking_id": booking_id
            }
            const res = await axios.post(`${baseurl}/raiseRequest`, raise_reqobj)
            if (res.data.status) {
                enqueueSnackbar(res.data.message, { variant: 'success' })
                setIsLoading(false)
                reset()
            }
            else {
                enqueueSnackbar(res.data.message, { variant: 'error' })
                setIsLoading(false)
            }
        }
        catch (error) {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Container>
                <Paper
                    sx={{ borderRadius: "1rem", padding: ".5rem" }}
                    elevation={3}
                >
                    <Grid flexDirection={'column'} container direction={"column"} rowSpacing={1.5}>
                        <Grid item>
                            <span className="makeFlex">
                                <SupportAgentIcon /> <span style={{ fontWeight: '500', color: '#000' }}>Got Queries?</span> &nbsp;<span
                                    // onClick={() => handleUserQueriesDialog(true)}
                                    className="c-p f-w-700">Contact Support</span>
                            </span>
                        </Grid>
                        <Grid item>
                            <span className="makeFlex">
                                <CallIcon /> &nbsp; <span style={{ fontWeight: '500', color: '#000' }}><a href={`tel:${adminDetails?.showing_mobile}`}>{adminDetails?.showing_mobile}</a></span>
                            </span>
                            <span className="makeFlex">
                                <EmailIcon /> &nbsp; <span style={{ fontWeight: '500', color: '#000' }}><a href={`mailto:${adminDetails?.showing_email}`}>{adminDetails?.showing_email}</a></span>
                            </span>
                        </Grid>
                        <Grid item>
                            <Grid container flexDirection={'row'}>
                                <Grid item md={1}>
                                    <Grid container>
                                        <Grid item><ChatBubbleIcon /></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={10}>
                                    <form>
                                        <Grid container spacing={1}>
                                            <Grid item>Describe the issue in details </Grid>
                                            <Grid item><TextField
                                                placeholder='Describe the issue in details'
                                                rows={3}
                                                multiline
                                                error={errors?.comment}
                                                helperText={errors?.comment?.message}
                                                {...register('comment', { required: { value: true, message: 'Enter some text to continue' } })}
                                            /></Grid>
                                            <Grid item><LoadingButton

                                                type='submit'
                                                sx={{
                                                    backgroundColor: "#003556!important",
                                                    color: "#ffff",
                                                    padding: "5px 10px",
                                                    textTransform: "none",
                                                    fontWeight: "600",
                                                    "& .MuiLoadingButton-loadingIndicator": {
                                                        color: "#97a8ff",
                                                    },
                                                }}
                                                loading={isLoading}
                                                className='bg-p' variant='contained' onClick={handleSubmit(raiserequest_api)}
                                            >Raise a Request</LoadingButton></Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}

export default QueriesComponent