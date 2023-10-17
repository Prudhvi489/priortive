import React, { useEffect, useState } from 'react';
import { Button, Grid, Stack, TextField, InputAdornment, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../../../assets/Subadminassets/logo.svg';
import loginBackground from '../../../assets/AdminAssets/resetChangePasswordImage.png';
// import MySnackbar from '../../modals/Signupmodals/Snackbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { regex_data } from '../../Regex'
import { useForm } from 'react-hook-form';
import { makeAdminLogin } from '../../../ApiServices/ServiceApiCalls';
import { enqueueSnackbar } from 'notistack';
import AdminForgotPassword from '../../modals/AdminModals/AdminForgotPassword';
import { useParams } from 'react-router-dom';
import LoadingButton from "@mui/lab/LoadingButton";
import { forgotpwdmodel } from "../../../assets/styles/Flights";
import Lock from "../../../assets/images/Lock.svg";
import viewpassword from "../../../assets/images/viewpassword.svg";
import hidepassword from "../../../assets/images/hidepassword.svg";
import gomytripclient from '../../../GomytripClient';

const AdminResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const forgotcss = forgotpwdmodel();

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const token = searchParams.get('token');

    const [showpwd3, setShowpwd3] = useState(false);

    const [showpwd2, setShowpwd2] = useState(false);
    const navigate = useNavigate();

    const [showForgotPassword, setShowForgotPassword] = useState(false)
    function handleClose() {
        setShowForgotPassword(false)
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
    } = useForm();


    useEffect(() => {
        if (!id || !token) {
            navigate('/admin')
        }
    }, [])

    function adminChangePassword(dataa) {
        console.log(dataa);
        if (dataa.password !== dataa.ConfirmPassword) {
            enqueueSnackbar('Password and confirm password mismatch', { variant: 'error' })
            return false
        }
        let payload = { "id": id, "token": token, "password": dataa.ConfirmPassword }
        setLoading(true)
        gomytripclient.post('/adminResetPassword', payload
        ).then(res => {
            if (res.data.status === 1) {
                enqueueSnackbar(res.data.message, { variant: 'success' })
                setLoading(false)
                reset()
                navigate('/admin')
            } else {
                enqueueSnackbar(res.data.message, { variant: 'error' })
                setLoading(false)
            }
        }).catch(err => {
            setLoading(false)
            enqueueSnackbar(err.message, { variant: 'error' })
        })
    }


    return (
        <>
            <AdminForgotPassword open={showForgotPassword} close={handleClose} />
            <div
                style={{
                    minHeight: '100vh',
                    backgroundImage: `url(${loginBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Grid item style={{ width: "420px", backgroundColor: 'white',/* width: '35vw', height: '80vh',*/ borderRadius: '20px', padding: '0px 20px 40px 20px' }} textAlign={'center'} alignContent={'center'}>
                    <Grid item md={1} mt={4}>
                        <img src={logo} alt="Gomytriplogo" style={{ width: '6rem' }} />
                    </Grid>
                    <form onSubmit={handleSubmit(adminChangePassword)} >
                        <Grid
                            container
                            // spacing={3}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            columnGap={3}
                            rowGap={3}
                        >
                            <Grid item md={12} mt={3}>
                                <Typography fontWeight={'700'} fontSize={'18px'} color={'#003556'} style={{ fontFamily: 'poppins' }}>Reset Password</Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                autoFocus
                                    {...register("password", { required: { value: true, message: "Enter New password" }, pattern: { value: regex_data.passwordStrength, message: "Your password must be 8 characters long. It can be the combination of character , symbols , numbers" } })}
                                    label={"New Password"}
                                    className={forgotcss.root}
                                    InputLabelProps={{ shrink: true, sx: { color: "#003556!important" } }}
                                    fullWidth
                                    size="small"
                                    helperText={errors?.password?.message}
                                    type={showpwd2 ? "text" : "password"}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <img src={Lock} alt="person" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                                                <img
                                                    src={showpwd2 ? viewpassword : hidepassword}
                                                    onClick={() => setShowpwd2(!showpwd2)}
                                                    alt="viewpwd"
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    {...register("ConfirmPassword", { required: { value: true, message: "Enter Confirm password" }, pattern: { value: regex_data.passwordStrength, message: "Your password must be 8 characters long. It can be the combination of character , symbols , numbers" } })}

                                    label={"Confirm Password"}
                                    className={forgotcss.root}
                                    InputLabelProps={{ shrink: true, sx: { color: "#003556!important" } }}
                                    fullWidth
                                    size="small"
                                    type={showpwd3 ? "text" : "password"}
                                    helperText={errors?.ConfirmPassword?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <img src={Lock} alt="person" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                                                <img
                                                    src={showpwd3 ? viewpassword : hidepassword}
                                                    onClick={() => setShowpwd3(!showpwd3)}
                                                    alt="viewpwd"
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
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
                                    Confirm change
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </div>
        </>
    );
};

export default AdminResetPassword;