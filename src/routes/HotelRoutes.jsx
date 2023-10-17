import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../parts/Layout'
import Hotelmain from '../components/pages/Hotels/Hotelssearch'
import Hotelslist from '../components/pages/Hotels/Hotelslist'
import Selected_hotel from '../components/pages/Hotels/Selected_hotel'
import Room_booking from '../components/pages/Hotels/Room_booking'
import PageNotFound from '../parts/PageNotFound'
import Hotel_Booking_success from '../components/pages/Hotels/Hotel_Booking_success'
import Hotel_Booking_Failure from '../components/pages/Hotels/Hotel_Booking_Failure'

const HotelRoutes = () => {
  return (
    <Routes>
        <Route path="/hotels" element={<Layout/>}>
            <Route index element={<Hotelmain/>}/>
            <Route path="hotels" element={<Hotelmain/>}/>
            <Route path="all_hotels" element={<Hotelslist/>}/>
            <Route path="sel_hotel" element={<Selected_hotel/>}/>
            <Route path="bookroom" element={<Room_booking/>}/>
            <Route path="hotel_booking_success" element={<Hotel_Booking_success/>}/>
            <Route path="hotel_booking_failure" element={<Hotel_Booking_Failure/>}/>
        </Route>
    </Routes>
  )
}

export default HotelRoutes