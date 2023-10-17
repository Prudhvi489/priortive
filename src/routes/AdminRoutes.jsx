import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminDashBoard from '../components/pages/Admin/Dashboard'
import AdminHotels from '../components/pages/Admin/AdminHotels'
import AdminLayout from '../parts/AdminLayout'
import PageNotFound from '../parts/PageNotFound'
import AdminFlights from '../components/pages/Admin/AdminFlights'
import AdminBus from '../components/pages/Admin/AdminBus'
import AdminTours from '../components/pages/Admin/AdminTours'
import AdminTourManagement from '../components/pages/Admin/AdminTourManagement'
import AdminInquiries from '../components/pages/Admin/AdminInquiries'
import AdminCouponsList from '../components/pages/Admin/AdminCouponsList'
import AdminAddNewCoupons from '../components/pages/Admin/AdminAddNewCoupons'
import AdminTransaction from '../components/pages/Admin/AdminTransaction'
import AdminUsers from '../components/pages/Admin/AdminUsers'
import AdminReview from '../components/pages/Admin/AdminReview'
import AdminTermsConditions from '../components/pages/Admin/AdminTermsConditions'
import BookingRaisedQueries from '../components/pages/Admin/BookingRaisedQueries'
import AdminConvenienceFee from '../components/pages/Admin/AdminConvenienceFee'
import AdminInformation from '../components/pages/Admin/AdminInformation'
import AdminAddToursForm from '../components/pages/Admin/AdminAddToursForm'
import AdminViewPackages from '../components/pages/Admin/AdminViewPackages'
import AdminHotelManagement from '../components/pages/Admin/AdminHotelManagement'
import AdminGMTTeam from '../components/pages/Admin/AdminGMTTeam'
import AdminHotelBookings from '../components/pages/Admin/AdminHotelBookings'
import AdminInfo from '../components/pages/Admin/AdminInfo'
import AdminFaq from '../components/pages/Admin/AdminFaq'
import AdminGMTHotelView from '../components/pages/Admin/AdminGMTHotelView'
import AdminViewPackDetails from '../components/pages/Admin/AdminViewPackDetails'
import AdminEditTourForm from '../components/pages/Admin/AdminEditTourForm'
import AdminResetPassword from '../components/modals/AdminModals/AdminResetPassword'

const AdminRoutes = () => {
  return (
    <div>
        <Routes>
         
            <Route path="" element={<AdminLayout/>}>
                <Route index element={<AdminDashBoard/>}/>
                <Route path="admin" element={<AdminDashBoard/>}/>
                <Route path="adminFlights" element={<AdminFlights/>}/>
                {/* <Route path="adminHotels" element={<AdminHotels/>}/> */}
                <Route path="adminhotelmanagement" element={<AdminHotelManagement />} />
                <Route path="admingmtteam" element={<AdminGMTTeam />} />
                <Route path="admingmtteamview" element={<AdminGMTHotelView />} />
                <Route path="adminhotelbookings" element={<AdminHotelBookings />} />
                <Route path="adminBus" element={<AdminBus/>}/>
                <Route path="adminTours" element={<AdminTours/>}/>
                <Route path="admintourmanagement" element={<AdminTourManagement />} />
                <Route path="AdminInquiries" element={<AdminInquiries />} />
                <Route path="adminInfo" element={<AdminInformation/>}/>
                <Route path="importantinformation" element={<AdminInformation />} />
                <Route path="adminFaq" element={<AdminFaq/>}/>
                <Route path="AdminCouponsList" element={<AdminCouponsList/>}/>
                <Route path="AdminAddNewCoupons" element={<AdminAddNewCoupons/>}/>
                <Route path="adminTransaction" element={<AdminTransaction />} />
                <Route path="adminUsers" element={<AdminUsers />} />
                <Route path="adminReview" element={<AdminReview />} />
                <Route path="adminTermsConditions" element={<AdminTermsConditions />} />
                <Route path="BookingRaisedQueires" element={<BookingRaisedQueries/>}/>
                <Route path="adminConvenienceFee" element={<AdminConvenienceFee/>} />
                <Route path="adminAddPackage" element={<AdminAddToursForm/>} />
                <Route path="AdminViewPackages" element={<AdminViewPackages/>} />
                <Route path="AdminViewPackDetails" element={<AdminViewPackDetails/>} />
                <Route path="AdminEditTourForm" element={<AdminEditTourForm/>} />
            </Route>

            <Route path="*" element={<PageNotFound />}/>
        </Routes>
    </div>
  );
};

export default AdminRoutes;