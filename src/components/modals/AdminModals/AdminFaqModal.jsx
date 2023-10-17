import React, { useEffect, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { adminAddCoupoun } from '../../pages/Admin/AdminStyles';
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { envdata } from '../../Envexports'
// import MySnackbar from '../Signupmodals/Snackbar';
import axios from 'axios';
const AdminFaqModal = ({ open, close, module, data, faq_Callback }) => {
    const adminconditions = adminAddCoupoun();
    // for snackbar
    // const [snackopen, setSnackopen] = useState(false);
    // const [snackmessage, setSnackmessage] = useState("");
    // function snackclose() {
    //     setSnackopen(false);
    // };
    //
    const [faq_question, setFaq_question] = useState("")
    const [faq_answer, setFaq_answer] = useState("")
    const saveorupdate = async () => {
        if (faq_question === "") {
            // setSnackopen(true);
            // setSnackmessage("Enter Your Question");
            alert("Enter your question")
            return;
        }
        if (faq_answer === "") {
            // setSnackopen(true);
            // setSnackmessage("Enter Your Answer");
            alert("Enter your answer")
            return;
        }
        if (data?.type === 1) {
            save_faq()
        }
        else {
            update_faq()
        }


    }
    // save faq details
    const save_faq = async () => {
        try {
            const res = await axios.post(`${envdata.baseurl}/addFaq`, { "question": faq_question, "answer": faq_answer, "module": module })
            console.log(res, "dat")
            if (res.data.status) {
                setFaq_question("")
                setFaq_answer("")
                // setSnackopen(true);
                // setSnackmessage(res.data.message);
                alert(res.data.message)
                close()
            }
            else {
                // setSnackopen(true);
                // setSnackmessage(res.data.message);
                alert(res.data.message)
            }
        }
        catch (error) {
            // setSnackopen(true);
            // setSnackmessage(error);
            alert(error)
        }
    }
    // update faq details
    const update_faq = async () => {
        try {
            const res = await axios.post(`${envdata.baseurl}/editFaq`, {
                "id": data?.data?.id,
                "question": faq_question,
                "answer": faq_answer
            })
            if (res.data.status) {
                // setSnackopen(true);
                // setSnackmessage(res.data.message);
                alert(res.data.message);
                faq_Callback()
                close()
            }
            else {
                // setSnackopen(true);
                // setSnackmessage(res.data.message);
                alert(res.data.message)
            }
        }
        catch (error) {

        }
    }
    useEffect(() => {
        if (data?.type === 2) {
            setFaq_question(data?.data?.question);
            setFaq_answer(data?.data?.answer)
        }
    }, [open])
    return (
        <div>
            {/* <MySnackbar open={snackopen} close={snackclose} message={snackmessage} /> */}
            <Dialog maxWidth={"xs"} open={open} onClose={close}>
                <DialogTitle >
                    <Grid
                        container
                        justifyContent={"space-between"}
                        sx={{ borderRadius: "10%" }}
                    >
                        <Grid container justifyContent={"space-between"}>
                            <Grid item md={11} textAlign={"center"}>
                                <Typography pl={1} sx={{ color: "#003556", fontSize: "18px", fontWeight: "500" }}> Add FAQ</Typography>
                            </Grid>
                            <Grid item md={1} >
                                <CloseIcon className={adminconditions.refundstyle12} onClick={close} />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item md={12} mt={1}><TextField label="Question" fullWidth multiline value={faq_question} onChange={(e) => setFaq_question(e.target.value)} /></Grid>
                        <Grid item md={12}><TextField label="Answer" fullWidth multiline rows={8} value={faq_answer} onChange={(e) => setFaq_answer(e.target.value)} /></Grid>
                        <Grid container justifyContent={"center"} mt={2}>
                            <Grid item>
                                <Button className={adminconditions.refundstyle} onClick={() => saveorupdate()}>{open && data.type === 1 ? "Save" : "Update"}</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog></div>
    )
}

export default AdminFaqModal