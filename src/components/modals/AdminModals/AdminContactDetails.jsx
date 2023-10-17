import {
    Button,
    InputAdornment,
    Container,
    Dialog,
    Grid,
    TextField, Typography
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { forgotpwdmodel } from "../../../assets/styles/Flights";
import viewpassword from "../../../assets/images/viewpassword.svg";
import hidepassword from "../../../assets/images/hidepassword.svg";
import Lock from "../../../assets/images/Lock.svg";
import React, { useRef, useState, useEffect } from "react";
import { Apipost } from "../../../ApiServices/Apicalls";
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from "notistack";
import gomytripclient from "../../../GomytripClient";
import { regex_data } from "../../Regex";
import { handleNumInput } from "../../pages/Buses/BusModuleHelperFunctions";

const AdminContactDetails = (props) => {
    const forgotcss = forgotpwdmodel();
    const { open, close, details } = props;
    const [showpwd, setShowpwd] = useState(false);
    const [showpwd2, setShowpwd2] = useState(false);
    const [showpwd3, setShowpwd3] = useState(false);
    const [loading, setLoading] = useState(false)

    const [contactDetails, setContactDetails] = useState(
        { showing_mobile: "", showing_email: "" }
    )
    const location = useLocation()

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
    } = useForm();


    useEffect(() => {
        if (open) {
            setContactDetails((pre)=>({...pre,showing_email:details.showing_email,showing_mobile:details.showing_mobile}))
        }
    }, [open])

    function adminChangeDetails(dataa) {
        console.log(dataa);
        props.childEmmit(dataa,'dataa')
        let payload = { "id": localStorage.getItem('admin_login'), "email": dataa.showing_email, "mobile": dataa.showing_mobile }
        setLoading(true)
        gomytripclient.post('/editAdminShowingData', payload
        ).then(res => {
            if (res.data.status === 1) {
                enqueueSnackbar(res.data.message, { variant: 'success' })
                setLoading(false)
                reset()
                close()
            } else {
                enqueueSnackbar(res.data.message, { variant: 'error' })
                setLoading(false)
            }
        }).catch(err => {
            setLoading(false)
            enqueueSnackbar(err.message, { variant: 'error' })
        })
    }
    function handleclose() {
        close();
    }

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
                        padding: "0.3rem",
                    },
                }}
            >
                <Grid item textAlign="right">
                    <CancelIcon sx={{ color: "#003556" }} onClick={handleclose} />
                </Grid>
                <Container>
                    <form onSubmit={handleSubmit(adminChangeDetails)} >
                        <Grid
                            container
                            // spacing={3}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            columnGap={2}
                            rowGap={2}
                        >
                            <Grid item md={12} mt={3}>
                                <Typography fontWeight={'700'} fontSize={'18px'} color={'#003556'} style={{ fontFamily: 'poppins' }}>Contact Details</Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    autoFocus
                                    onKeyDown={(e) => handleNumInput(e)}
                                    {...register("showing_mobile", { required: { value: true, message: "Enter Phone NUmber" } })}
                                    label={"Phone Number"}
                                    className={forgotcss.root}
                                    InputLabelProps={{ shrink: true, sx: { color: "#003556!important" } }}
                                    fullWidth
                                    size="small"
                                    helperText={errors?.showing_mobile?.message}
                                    value={contactDetails.showing_mobile}
                                    onChange={(e)=>setContactDetails((pre)=>({...pre,showing_mobile:e.target.value}))}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    {...register("showing_email", { required: { value: true, message: "Enter Email" }, pattern: { value: regex_data.email_Regex, message: "Enter valid Mail Addresss" } })}
                                    label={"Email Address"}
                                    className={forgotcss.root}
                                    InputLabelProps={{ shrink: true, sx: { color: "#003556!important" } }}
                                    fullWidth
                                    size="small"
                                    helperText={errors?.showing_email?.message}
                                    value={contactDetails.showing_email}
                                    onChange={(e)=>setContactDetails((pre)=>({...pre,showing_email:e.target.value}))}

                                />
                            </Grid>
                            <Grid item p={'0rem 2rem'} md={12} minWidth={'100%'}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#003556!important",
                                        borderRadius: "0.5rem",
                                        textTransform: 'none',
                                        fontFamily: "'Poppins', sans-serif;",
                                        fontWeight: '600',
                                        '&:disabled': {
                                            backgroundColor: "#eee !important",
                                            cursor: 'not-allowed',
                                        },
                                        // width:"370px"
                                    }}
                                    type='submit'
                                    disabled={loading}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Dialog>
        </div>
    );
};

export default AdminContactDetails;
