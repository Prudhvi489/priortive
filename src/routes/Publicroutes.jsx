import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Alloffers from '../components/OffersCarousel/Alloffers'
import Layout from '../parts/Layout'
import TermsAndConditionGmt from '../components/pages/TermsAndConditionGmt'
import PricacyAndPolicyGmt from '../components/pages/PricacyAndPolicyGmt'
import AdminResetPassword from '../components/modals/AdminModals/AdminResetPassword'

const Publicroutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/alloffers" element={<Layout/>}>
                <Route path="/alloffers" element={<Alloffers/>}/>
                </Route>
                <Route path='/gmtTerms' element={<TermsAndConditionGmt/>}/>
            <Route path='/gmtPrivacy' element={<PricacyAndPolicyGmt/>}/>
            <Route path="/AdminResetPassword" element={<AdminResetPassword/>} />

        </Routes>
    </div>
  )
}

export default Publicroutes