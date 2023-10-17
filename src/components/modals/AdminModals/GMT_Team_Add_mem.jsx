import { Button, Dialog, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { dialogInputs } from '../../pages/Admin/AdminStyles'
import { regex_data } from '../../Regex';
import { Subadminapicalls } from '../../../ApiServices/Subadminapicalls';
import MySnackbar from '../Signupmodals/Snackbar';
const GMT_Team_Add_mem = ({ open, close, memdata, datarefresh }) => {

    const styles = dialogInputs()
    const [assigne_details, setAssigne_details] = useState({
        name: '',
        number: '',
        mail: '',
        address: '',
        status: 2
    })
    // for snackbar
    const [snackopen, setSnackopen] = useState(false);
    const [snackmessage, setSnackmessage] = useState("");
    function snackclose() {
        setSnackopen(false);
    };
    //
    // Change of asignee details
    const change_assigne_details = (e) => {
        const { name, value } = e.target;
        setAssigne_details((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        if (memdata.type === 1) {
            setAssigne_details(memdata.data)
        }
    }, [open])
    // Adding assignee
    const Add_assigne = async () => {
        if (assigne_details.name === "") {
            setSnackopen(true);
            setSnackmessage("Enter Your Name");
            // alert("Enter you name")
            return
        }
        else if (!regex_data.string_regex.test(assigne_details.name)) {
            setSnackopen(true);
            setSnackmessage("Name should be a string");
            // alert("Name should be a string")
            return
        }
        if (assigne_details.mail === "") {
            setSnackopen(true);
            setSnackmessage("Enter Your Email address");
            // alert("Enter your mail address")
            return;
        }
        else if (!regex_data.email_Regex.test(assigne_details.mail)) {
            setSnackopen(true);
            setSnackmessage("Enter valid email address");
            // alert("Enter valid email address")
            return;
        }
        if (assigne_details.number === "") {
            setSnackopen(true);
            setSnackmessage("Contact number should not be empty");
            // alert("Contact number should not be empty")
            return;
        }
        else if (!regex_data.mobile_regex.test(assigne_details.number)) {
            setSnackopen(true);
            setSnackmessage("Enter valid mobile number");
            // alert("Enter valid mobile number")
            return;
        }
        if (assigne_details.status === 2) {
            setSnackopen(true);
            setSnackmessage("select any of the status");
            // alert("select any of the status")
            return;
        }
        if (assigne_details.address === "") {
            setSnackopen(true);
            setSnackmessage("Enter assign address");
            // alert("Enter assignee address")
            return;
        }
        try {
            let method;
            console.log(memdata.type, "type of method ")
            if (memdata.type === 1) {
                method = "PUT"
            }
            else {
                method = "POST"
            }
            const res = await Subadminapicalls("team", assigne_details, method, "application/json");
            if (res.status) {
                setSnackopen(true);
                setSnackmessage(res.message);
                // alert(res.message)
                datarefresh()
                setAssigne_details({
                    name: '',
                    number: '',
                    mail: '',
                    address: '',
                    status: 2
                })
                close();
            }
            else {
                setSnackopen(true);
                setSnackmessage(res.message);
                // alert(res.message)
            }
        }
        catch (error) {
            setSnackopen(true);
            setSnackmessage(error);
            // alert(error)
        }
    }
    const handleclose = () => {
        setAssigne_details({
            name: '',
            number: '',
            mail: '',
            address: '',
            status: 2
        })
        close()
    }
    return (
        <>
            <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
            <Dialog open={open} onClose={handleclose} sx={{ "& .MuiDialog-paper": { maxWidth: '450px', borderRadius: '1rem' } }}>
                <DialogTitle textAlign={'center'} color={'rgba(0, 53, 86, 1)'} position={'relative'}>
                   Edit Member
                    <CloseIcon sx={{ borderRadius: "50%", color: "white", background: "#003556", position: 'absolute', right: '0.7rem' }} onClick={close} />
                </DialogTitle>
                <DialogContent className='scroll_none'>
                    <Grid sx={{ padding: "1rem 0rem" }}>
                        <Grid container rowGap={2}>
                            <Grid item xs={12}>
                                <TextField className={styles.textInput} value={assigne_details.name} name="name" onChange={(e) => change_assigne_details(e)} fullWidth size='small' variant='outlined' InputLabelProps={{ style: { color: "#003556", } }} label='Name' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={styles.textInput} value={assigne_details.mail} fullWidth size='small' name="mail" onChange={(e) => change_assigne_details(e)} variant='outlined' InputLabelProps={{ style: { color: "#003556", } }} label='Mail ID' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={styles.textInput} fullWidth size='small' value={assigne_details.number} name="number" onChange={(e) => change_assigne_details(e)} variant='outlined' InputLabelProps={{ style: { color: "#003556", } }} label='Contact Number' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField select className={styles.textInput} value={assigne_details.status} fullWidth size='small' name="status" onChange={(e) => change_assigne_details(e)} variant='outlined' InputLabelProps={{ style: { color: "#003556", } }} label='Status'>
                                    <MenuItem value={1}>Active</MenuItem>
                                    <MenuItem value={0}>Inactive</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={styles.textInput} fullWidth size='small' value={assigne_details.address} variant='outlined' name="address" onChange={(e) => change_assigne_details(e)} InputLabelProps={{ style: { color: "#003556", } }} label='Address' multiline rows={6} />
                            </Grid>
                            <Grid item xs={12} textAlign={'center'}>
                                <Button onClick={() => Add_assigne()} sx={{ background: '#003556', textTransform: 'none', color: 'white', borderRadius: '0.5rem', "&:hover": { background: '#003556', color: 'white', } }}>{memdata.type === 0 ? "Add" : "Confirm"}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default GMT_Team_Add_mem;