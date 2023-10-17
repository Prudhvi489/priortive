import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import Hricon from '../../assets/images/24hr_icon.svg'
import protecticon from '../../assets/images/protect_icon.svg'
import {styles} from '../../assets/styles/Styles_export'
const Why_gmt = () => {
  return (
    <>
        <Paper elevation={2} sx={{padding:'1rem',borderRadius:'0.8rem'}}>
            <Grid container rowGap={3}>
                <Grid item component={'h4'} color={'rgba(48, 48, 48, 1)'}>Why book with gomytrip</Grid>
                <Grid item container rowGap={1}>
                    <Grid item container alignItems={'center'} columnGap={1}>
                        <Grid item xs={'auto'} alignSelf={'baseline'}>
                            <img src={Hricon} alt="" height={'25px'} width={'25px'} />
                        </Grid>
                        <Grid item container xs rowGap={1}>
                            <Grid item xs={12} color={styles.app_color} fontWeight={'500'}>24/7 Customer Support</Grid>
                            <Grid item xs={12} color={'rgba(48, 48, 48, 1)'}>We are here to help whenever you need us</Grid>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems={'center'} columnGap={1}>
                        <Grid item xs={'auto'} alignSelf={'baseline'}>
                            <img src={protecticon} alt="" height={'25px'} width={'25px'} />
                        </Grid>
                        <Grid item container xs rowGap={1}>
                            <Grid item xs={12} color={styles.app_color} fontWeight={'500'}>Secure Booking Process</Grid>
                            <Grid item xs={12} color={'rgba(48, 48, 48, 1)'}>Your Personal information is secured using the industry Standard</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </>
  )
}

export default Why_gmt