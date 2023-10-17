import { Container, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import deluxe_room from '../../assets/Hotelimages/deluxe_room.png'
import { CoupounsStyles } from './CoupounStyles'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack';
import copyIcon from '../../assets/images/copy_icon.svg'

const CouponDetails = () => {

    const styles = CoupounsStyles()

    const location = useLocation()
    const navigate = useNavigate()

    const [coupounDetails, setCoupounDetails] = useState('')

    useEffect(() => {
        setCoupounDetails(location.state.coupounData)
    }, [location.state])

    const copyToClipboard = (copyText) => {
        navigator.clipboard.writeText(copyText)
          .then(() => {
            enqueueSnackbar('Coupon code copied.')
          })
          .catch((error) => {
            enqueueSnackbar('Unable to copy text:',{variant:'error'});
          });
      };
    return (
        <>
            <Container>
                <div style={{ margin: "10px 0" }}>
                    <Tooltip title='Go back'>
                        <IconButton onClick={()=>navigate(`/${location.state.from}`)}><ArrowBackIcon /></IconButton>
                    </Tooltip>
                    <span> Go Back</span>
                </div>
                <Grid container spacing={2} mt={0}>
                    <Grid item md={5} xs={12}><img width={'100%'} height={'300px'} src={coupounDetails?.image} style={{objectFit:'cover'}} alt='CoupounImg' /></Grid>
                    <Grid item md={7} xs={12}>

                        <Grid container flexDirection={'column'}>
                            <Grid item>
                                <p className={styles.coupounHeading}>{coupounDetails?.heading}</p>
                            </Grid>
                            <Grid item>
                                <Stack flexDirection={'row'} alignItems={'center'}>
                                    {coupounDetails?.coupon_code&&<><span style={{ fontSize: '14px', fontWeight: '500' }}>Use Code: &nbsp;</span> <span>{coupounDetails?.coupon_code}</span> <span><Tooltip placement='top' title='Copy code'><IconButton onClick={()=>copyToClipboard(coupounDetails?.coupon_code)}><img src={copyIcon} alt='copyicon' /></IconButton></Tooltip></span></>}
                                </Stack>
                            </Grid>
                            <Grid container md={5} mt={2}>
                                <Grid container sx={{ border: "1px solid #D9D9D9" }}>
                                    <Grid item md={4} p={1} className='bgcoupon'><Typography>Min Txn(INR)</Typography></Grid>
                                    <Grid item md={8} p={1} sx={{ color: "#303030" }}><Typography>₹ {coupounDetails?.min_amount}</Typography></Grid>
                                </Grid>
                                <Grid container sx={{ border: "1px solid #D9D9D9" }}>
                                    <Grid item md={4} p={1} className='bgcoupon'><Typography>Offer Details</Typography></Grid>
                                    <Grid item md={8} p={1}><Typography>{coupounDetails?.description}</Typography></Grid>
                                </Grid>
                                <Grid item mt={1.5}>
                                    <Typography><b className='texthead'>Terms & Conditions</b></Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <ol>
                                    <li className='textcoupon' dangerouslySetInnerHTML={{ __html: coupounDetails?.tc }}></li>
                                    {/* <li className='textcoupon1'>Greyhound will vinyl wrap the nameboard and rear of the Buses as well as repaint the visible roof area with a design to be provided by Great Lakes. The vinyl wrap will also include Greyhound’s Flightlink® logo on the nameboard and rear of the Bus. Greyhound shall also, from time to time, place in the Buses any customer promotional materials furnished by Great Lakes. At the request of Great Lakes, and at their sole cost and expense, Great Lakes may at any time request that any or all Buses be re-wrapped or refreshed. Greyhound will be responsible for repairs to wraps that have been accidentally damaged.</li> */}
                                    {/* <li className='textcoupon1'>Buses will be equipped with tray tables, cup holders, window shades, wheelchair lifts, power outlets and any security equipment as required by the parties or the Transportation Security Administration (“TSA”).</li> */}
                                    {/* <li className='textcoupon1'>As required by any Airport, transponders will be installed by Greyhound on all Buses providing the Services. Transponders for the E-470 Tollway will also be installed by Greyhound on all Buses providing the Services. Great Lakes will be responsible for paying and/or reimbursing Greyhound for all toll charges and usage fees in connection with the transponders.</li> */}
                                    {/* <li className='textcoupon1'>Greyhound shall at all times maintain the Buses in a good, safe and clean operating order, repair and condition.</li> */}
                                    {/* <li className='textcoupon1'>Any additional Buses that are requested or required to be added to perform either (i) the Services for the Airports listed on Exhibit A or (ii) bus services for any other</li> */}
                                </ol>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        </>
    )
}

export default CouponDetails