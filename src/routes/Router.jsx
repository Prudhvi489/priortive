import React from "react";
import { Route, Routes } from "react-router-dom";
// import Busessearch from '../components/pages/Buses/Busessearch'
import Cabssearch from "../components/pages/Cabs/Cabssearch";
import AfterFlightsSearch from "../components/pages/Flights/AfterFlightsSearch";
import FlightBooking from "../components/pages/Flights/FlightBooking";
import Flightsearch from "../components/pages/Flights/Flightsearch";
import Hotelmain from "../components/pages/Hotels/Hotelssearch";
import Multicity from "../components/pages/Flights/Multicity";
import Roundtrip from "../components/pages/Flights/Roundtrip";
import Tourssearch from "../components/pages/Tourpackages/Tourssearch";
import Layout from "../parts/Layout";
import FlightRoutes from "./FlightRoutes";
import HotelRoutes from "./HotelRoutes";
import BusRoutes from "./BusRoutes";
import BookingRoutes from "./Bookingroutes";
import AdminRoutes from "./AdminRoutes";
import SubadminRoutes from "./SubadminRoutes";
import Subadminlayoutroutes from "./Subadminlayoutroutes";
import Pagenotfound from "../components/pages/Pagenotfound";
import TourpackageRoutes from "./TourpackageRoutes";
import Publicroutes from "./Publicroutes";
import { useSelector } from "react-redux";
import AdminRoutings from "./AdminRoutings";

const Router = () => {
  const loggedin = useSelector((state) => state.authentication.loggedin);
  return (
    <>
      <FlightRoutes />
      <HotelRoutes />
      <BusRoutes />
      <TourpackageRoutes />
      {loggedin === 1 && <BookingRoutes />} {/* ADMIN ROUTES */}
      <AdminRoutings />
      {/* SUBADMIN ROUTES */}
      <SubadminRoutes />
      {/* public routes */}
      <Publicroutes />
    </>
  );
};

export default Router;
