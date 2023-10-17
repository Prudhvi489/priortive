import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

const Subadminprivateroutes = ({ children }) => {

  const location = useLocation();
  const navigate = useNavigate();
  let authenticated = false;
  if (localStorage.getItem("subadmin_login") === "subadmin") {
    authenticated = true;
  }
  return authenticated?<>{children}</>:<Navigate to="/subadminlogin" />;
};                  

export default Subadminprivateroutes;