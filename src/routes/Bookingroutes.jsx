import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../parts/Layout'
import Mybookings from '../components/pages/Bookings/Mybookings'
import FAQ from '../components/pages/Bookings/FAQ'
import Myrefund from '../components/pages/Bookings/Myrefund'
import MyBookingsBackup from '../components/pages/Bookings/MyBookingsBackup'
import CouponDetails from '../components/OffersCarousel/CouponDetails'
import UserRaisedIssues from '../components/pages/Bookings/UserRaisedIssues'
import TermsAndConditionGmt from '../components/pages/TermsAndConditionGmt'
import PricacyAndPolicyGmt from '../components/pages/PricacyAndPolicyGmt'
const Bookingroutes = () => {
  return (
    <div>
        <Routes>
           <Route path="/mybookings/:tab" element={<Layout/>}>
            <Route index element={<Mybookings/>}/>
            <Route path="mybookins" element={<Mybookings/>}/>
            <Route path="mybookinsbackup" element={<MyBookingsBackup/>}/>

           </Route>
           <Route path="/Faq" element={<Layout/>}>
            <Route index element={<FAQ/>}/>
            <Route path="Faq" element={<FAQ/>}/>
           </Route>
           <Route path="/refund" element={<Layout/>}>
            <Route index element={<Myrefund/>}/>
            <Route path="refund" element={<Myrefund/>}/>
           </Route>
           <Route path='/CouponDetails' element={<Layout />} >
            <Route index element={<CouponDetails/>} />
            <Route path='CouponDetails' element={<CouponDetails/>} />

            </Route>
            {/*  */}
            <Route path='/UserRaisedIssues' element={<Layout />} >
            <Route index element={<UserRaisedIssues/>} />
            <Route path='UserRaisedIssues' element={<UserRaisedIssues/>} />
            </Route>
           
        </Routes>
    </div>
  )
}

export default Bookingroutes