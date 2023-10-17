import React from 'react'
import { Route, Routes } from 'react-router'
import SubadminLayout from '../parts/SubadminLayout'
import Dashboard from '../components/pages/Subadmin/Dashboard'
import Completebookings from '../components/pages/Subadmin/Completebookings'
import Newbookings from '../components/pages/Subadmin/Newbookings';
import Cancelledbookings from '../components/pages/Subadmin/Cancelledbookings'
import Addhotel from '../components/pages/Subadmin/Addhotel'
import Rooms from '../components/pages/Subadmin/Rooms'
import Bookings from '../components/pages/Subadmin/Bookings'
const Subadminlayoutroutes = () => {
  
  return (
        <Routes>
            <Route path="" element={<SubadminLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="subadmin" element={<Dashboard/>}/>
                <Route path="addhotel" element={<Addhotel />} />
                <Route path="rooms" element={<Rooms/>}/>
                <Route path="bookings" element={<Bookings/>}/>
                {/* <Route path="completebookings" element={<Completebookings/>}/>
                <Route path="newbookings" element={<Newbookings/>}/>
                <Route path="cancelledbookings" element={<Cancelledbookings/>}/> */}
            </Route>
        </Routes>
  )
}

export default Subadminlayoutroutes