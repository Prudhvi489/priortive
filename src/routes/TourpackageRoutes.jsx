import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../parts/Layout";
import Tourssearch from "../components/pages/Tourpackages/Tourssearch";
import PackageDetails from "../components/pages/Tourpackages/PackageDetails";
import PackagesList from "../components/pages/Tourpackages/PackagesList";
import Plannedtours from "../components/pages/Tourpackages/Plannedtours";

const TourpackageRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/tours/plannedtours" element={<Plannedtours />} />
        <Route path="/" element={<Navigate to="/Flights" />} />
        <Route path="/tours" element={<Layout />}>
          <Route index element={<Tourssearch />} />
          <Route path="Tourpackages" element={<Tourssearch />} />
          <Route path="/tours/PackageDetails" element={<PackageDetails />} />
          <Route path="PackagesList" element={<PackagesList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default TourpackageRoutes;
