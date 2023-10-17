import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    Tab,
    TextField, Button
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { myrefund } from "../../../assets/styles/Flights";
import downarrow from "../../../assets/images/downarrow.svg";
import uparrow from "../../../assets/images/uparrow.svg";
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import GomytripClient from '../../../GomytripClient'
import { convertDateFormat } from "../Buses/BusModuleHelperFunctions";
import gomytripclient from "../../../GomytripClient";
import { enqueueSnackbar } from 'notistack';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const UserRaisedIssues = () => {
    const myrefund1 = myrefund();
    const [value, setValue] = useState("1");
    const [expand, setExpand] = useState(false);
    const handletabchange = (event, newvalue) => {
        setValue(newvalue);
    };
    const accordexpand = () => {
        setExpand((prev) => !prev);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    const [page, setPage] = useState(1)


    const [queries, setQueries] = useState([])
    const scrollRef = useRef(null);
    useEffect(() => {
        getUserQueries()
    }, [])

    useEffect(()=>{
        const totalHeight = document.documentElement.scrollHeight;
        window.scrollTo(0, totalHeight);
    },[queries])

    const getUserQueries = () => {
        let payload = {
            "user_id": localStorage.getItem('userid'),
            "pageNumber": page,
            "pageSize": 1000
        }

        GomytripClient.post('/getUserRequestList', payload
        ).then(res => {
            setQueries(res.data.data.rows)
            
        }).catch(Err => {
            console.log(Err)
        })
    }
    const throwIssue = (data) => {
        let payload = {
            "user_id": localStorage.getItem('userid'),
            "issue": data.text,
        }

        gomytripclient.post('raiseRequest', payload)
            .then(res => {
                if (res.status === 200 && res.data.status === 1) {
                    
                    enqueueSnackbar(res.data.message, { variant: 'success' })
                    reset()
                    getUserQueries()
                } else {
                    enqueueSnackbar(res.data.message, { variant: 'error' })
                }
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }



    return (
        <>
            {/* <Container maxWidth="md" onScroll={handleScroll} 
            // sx={{maxHeight:'700px'}}
            >
                <Grid container direction={"column"} rowSpacing={2} >
                    <Grid item height="5vh"></Grid>
                    <Grid item className={myrefund1.refundtxt}>
                        Need Support
                    </Grid>
                    <Grid item >
                        {queries && queries.length > 0 && queries.map((item, index) => {
                            return (
                                <Grid container maxWidth={'md'} justifyContent={'flex-end'} mt={1}>
                                    <Paper>
                                        <span class={`styled-span  ${item.status === 0 ? "notResolved" : "resolved"}`}><p className="issue-content">{item.issue}</p></span>
                                    </Paper>
                                    <p className="issue-date">{convertDateFormat(item.created_date)}</p>
                                </Grid>
                            )
                        })}

                    </Grid>
                </Grid>
            </Container> */}

            {/* <div className="raise-issue-textbox" style={{paddingTop:'25px'}}>
                <form>
                    <Grid container justifyContent={'space-between'} alignItems={'center'}>
                        <Grid item md={11}>
                            <TextField
                                {...register('text', { required: { value: true, message: 'Enter Description to send' } })}
                                fullWidth
                                variant='outlined'
                                placeholder="Enter Details"
                                label='Enter Details to'
                                error={errors?.text}
                                helperText={errors?.text?.message ?? ""}

                            />
                            </Grid>
                            <Grid item>
                            <Button variant="" type="submit" onClick={handleSubmit(throwIssue)}>
                                <SendIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div> */}
            <Container>
            <Paper elevation={0} style={{ flex: '1', overflowY: 'scroll', padding: '16px',backgroundColor:'transparent' }}>
                {queries && queries.length > 0 && queries.map((item, index) => {
                    return (
                        <Grid container maxWidth={'md'} justifyContent={'flex-end'} mt={1}>
                            <Paper>
                                <span className={`styled-span  ${item.status === 0 ?  "notResolved":"resolved"}`}><p className="issue-content">{item.issue}</p></span>
                            </Paper>
                            <p className="issue-date">{convertDateFormat(item.created_date)}</p>
                        </Grid>
                    )
                })}
            </Paper>
            </Container>

            <div style={{ display: 'flex', alignItems: 'center', padding: '8px', position: 'sticky', bottom: '-10px' }}>
                <div className="raise-issue-textbox" style={{ paddingTop: '25px' }}>
                    <form>
                        <Grid container justifyContent={'space-between'} alignItems={'center'}>
                            <Grid item md={11}>
                                <TextField
                                    {...register('text', { required: { value: true, message: 'Raise your concern to send' } })}
                                    fullWidth
                                    variant='outlined'
                                    placeholder="Raise your concern"
                                    label='Raise your concern'
                                    error={errors?.text}
                                    helperText={errors?.text?.message ?? ""}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="" type="submit" onClick={handleSubmit(throwIssue)}>
                                    <SendIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>

        </>
    );
};

export default UserRaisedIssues;
