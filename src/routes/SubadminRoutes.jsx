import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router";
import SubadminLogin from "../components/pages/Subadmin/SubadminLogin";
import Subadminprivateroutes from "./Subadminprivateroutes";
import Subadminlayoutroutes from "./Subadminlayoutroutes";
import Pagenotfound from "../components/pages/Pagenotfound";

const SubadminRoutes = () => {
  let authenticated = false;
  if (localStorage.getItem("subadmin_login") === "subadmin") {
    authenticated = true;
  }
  return (
    <Routes>
      <Route
        path="/subadminlogin"
        element={
          authenticated ? <Navigate to="/subadmin" /> : <SubadminLogin />
        }
      />
      <Route
        path="/subadmin/*"
        element={
          <Subadminprivateroutes>
            <Subadminlayoutroutes />
          </Subadminprivateroutes>
        }
      />
      {/* <Route path="*" element={<Pagenotfound/>}/>    */}
    </Routes>
  );
};

export default SubadminRoutes;
