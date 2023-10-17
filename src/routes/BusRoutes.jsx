import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../parts/Layout'
import BusesIndex from '../components/pages/Buses/BusesIndex'
import BusesSearchList from '../components/pages/Buses/BusesSearchList'
import BusBooking from '../components/pages/Buses/BusBooking'
import BusBookingSuccess from '../components/pages/Buses/BusBookingSuccess'
import BusBookingFailure from '../components/pages/Buses/BusBookingFailure'


const BusRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path="/buses" element={<Layout/>}>
            <Route index element={<BusesIndex/>}/>
            <Route path="/buses" element={<BusesIndex/>}/>
            <Route path="BusesSearchList" element={<BusesSearchList/>}/>
            <Route path="BusBooking" element={<BusBooking/>}/>
            <Route path="BusBookingSuccess" element={<BusBookingSuccess/>}/>
            <Route path="BusBookingFailure" element={<BusBookingFailure/>}/>


        </Route>
        </Routes>
    </div>
  )
}

export default BusRoutes