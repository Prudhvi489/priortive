import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

const Adminprivateroutes = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  let authenticated = false;
  if (localStorage.getItem("admin_login")) {
    authenticated = true;
  }
  return authenticated?<>{children}</>:<Navigate to="/adminlogin" />;
};

export default Adminprivateroutes;