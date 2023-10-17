import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Flightsearch from '../components/pages/Flights/Flightsearch'
import AfterFlightsSearch from '../components/pages/Flights/AfterFlightsSearch'
import Roundtrip from '../components/pages/Flights/Roundtrip'
import Multicity from '../components/pages/Flights/Multicity'
import FlightBooking from '../components/pages/Flights/FlightBooking'
import Layout from '../parts/Layout'
const FlightRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Navigate to="/Flights"/>}/>
            {/* <Route path="*" element={<PageNotFound />}/> */}
            <Route path="/Flights" element={<Layout/>}>
                <Route index element={<Flightsearch/>}/>
                <Route path="Flights" element={<Flightsearch/>}/>
                <Route path="OW_flights" element={<AfterFlightsSearch/>}/>
                <Route path="RT_flights" element={<Roundtrip/>}/>
                <Route path="MC_flights" element={<Multicity/>                                                                                                                                                                                                                                                                                                                                }/>
                <Route path="Flightdetails" element={<FlightBooking/>}/>

                          {/* <Route path="*" element={<PageNotFound />}/> */}
            </Route>
        </Routes>
    </div>
  )
}

export default FlightRoutes