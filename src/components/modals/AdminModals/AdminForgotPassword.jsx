import {
    Button,
    InputAdornment,
    Container,
    Dialog,
    Grid,
    TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { forgotpwdmodel } from "../../../assets/styles/Flights";
import viewpassword from "../../../assets/images/viewpassword.svg";
import hidepassword from "../../../assets/images/hidepassword.svg";
import Lock from "../../../assets/images/Lock.svg";
import React, { useRef, useState } from "react";
import { Apipost } from "../../../ApiServices/Apicalls";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from 'react-hook-form';
import { regex_data } from '../../Regex'
import { enqueueSnackbar } from "notistack";
import gomytripclient from "../../../GomytripClient";
import LoadingButton from "@mui/lab/LoadingButton";

const AdminForgotPassword = (props) => {
    const ReCAPTCHAId = process.env.REACT_APP_RECAPTCHA;

    const forgotcss = forgotpwdmodel();
    const { open, close } = props;
    const [recaptchaval, setRecaptchaval] = useState(null)
    const [loading, setLoading] = useState(false)
    function handleclose() {
        close();
    }
    const handleRecaptchaChange = (value) => {
        setRecaptchaval(value)
        // console.log('reCAPTCHA value:', value);
    };
    async function resetPassword(data) {
        if (!recaptchaval) {
            enqueueSnackbar('Check the Captcha To continue', { variant: 'error' })
            return false
        }
        setLoading(true)

        gomytripclient.post('/adminForgotPassword', data
        ).then(res => {
            if (res.data.status === 1) {
                enqueueSnackbar(res.data.message, { variant: 'success' })
                reset()
                close()
                setLoading(false)
            } else {
                enqueueSnackbar(res.data.message, { variant: 'error' })
                setLoading(false)

            }
        }).catch(err => {
            enqueueSnackbar(err.message)
            setLoading(false)

        })
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
    } = useForm();

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleclose}
                sx={{
                    "& .MuiDialog-paper": {
                        width: "100%",
                        mixHeight: 580,
                        maxWidth: "350px",
                        borderRadius: "15px",
                        padding: "0.7rem",
                    },
                }}
            >
                <Grid item textAlign="right">
                    <CancelIcon sx={{ color: "#003556" }} onClick={handleclose} />
                </Grid>
                <Container>
                    <form onSubmit={handleSubmit(resetPassword)}>
                        <Grid container textAlign={"center"} direction={"column"} spacing={2}>
                            <Grid
                                item
                                style={{ fontSize: "18px", color: "#003556", fontWeight: "500" }}
                            >
                                Reset Password
                            </Grid>
                            <Grid item>
                                <TextField
                                    {...register('email', { required: { value: true, message: "E-Mail is required" }, pattern: { value: regex_data.email_Regex, message: 'Enter Valid Emial address' } })}
                                    label={"Email"}
                                    className={forgotcss.root}
                                    fullWidth
                                    size="small"
                                    helperText={errors?.email?.message}
                                />
                            </Grid>

                            <Grid item>
                                <ReCAPTCHA sitekey={ReCAPTCHAId}
                                    onChange={handleRecaptchaChange}
                                    size="normal"
                                />
                            </Grid>
                            <Grid item>
                                <LoadingButton
                                    loading={loading}
                                    type="submit"
                                    className={forgotcss.button}
                                    sx={{ textTransform: "none" }}
                                >
                                    Confirm
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Dialog>
        </div>
    );
};

export default AdminForgotPassword;
