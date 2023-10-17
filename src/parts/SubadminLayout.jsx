import { Grid } from "@mui/material";
import React from "react";
import Header from "./Subadminparts/Header";
import Sidebar from "./Subadminparts/Sidebar";
import { Outlet } from "react-router";
import { Subadminprovider } from "./Subadminparts/Subadminprovider";

const SubadminLayout = () => {
  return (
    // Notifiationbar
    <Subadminprovider>
      <Grid container sx={{backgroundColor:'#ffff',overflowX:'hidden',}}>
        <Grid item sm={'auto'}>
            <Sidebar/>
        </Grid>
        <Grid container item sm direction="column">
            <Grid item height="15vh" sx={{ position: 'sticky', top: 0, zIndex:1001 }}><Header/></Grid>
            <Grid item height="85vh"><Outlet/></Grid>
        </Grid>
      </Grid>
    </Subadminprovider>
  );
};

export default SubadminLayout;
