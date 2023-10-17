import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router";
import Pagenotfound from "../components/pages/Pagenotfound";
import AdminLogin from "../components/pages/Admin/AdminLogin";
import Adminprivateroutes from './Adminprivateroutes';
import AdminRoutes from './AdminRoutes';

const AdminRoutings = () => {
  let authenticated = false;
  if (localStorage.getItem("admin_login")) {
    authenticated = true;
  }
  return (
    <Routes>
      <Route
        path="/adminlogin"
        element={authenticated ? <Navigate to="/admin" /> : <AdminLogin />}
      />
      <Route
        path="/admin/*"
        element={
          <Adminprivateroutes>
            <AdminRoutes />
          </Adminprivateroutes>}
      />
     
    </Routes>
  );
};

export default AdminRoutings;
