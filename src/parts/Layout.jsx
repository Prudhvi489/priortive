import { Grid } from '@mui/material'
import React from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Header from './Header'
import '../assets/styles/responsive_Flights.css'
import '../assets/styles/responsive_Hotel.css'

const Layout = () => {

  const location = useLocation()

  return (
    <Grid sx={{background:(location.pathname =='/Hotels' || location.pathname =='/Flights' || location.pathname =='/buses' ) && 'white'}}>
        <Grid sx={{position:'fixed',zIndex:'1001',width:'100%',top:'0px',left:'0px'}}>
            <Grid /*sx={{height:'14vh!important'}}*/><Header/></Grid>
        </Grid>
        <Grid className={(location.pathname =='/Hotels' || location.pathname =='/Flights' || location.pathname =='/buses' || location.pathname =='/Flights/FlightDetails' )?'body_margin_top':'body_margin_top_response'}>
          {/* sx={{background:'#EFF9FF'}} */}
            <Grid  ><Outlet/></Grid>
            
        </Grid>
    </Grid>
  )
}

export default Layout