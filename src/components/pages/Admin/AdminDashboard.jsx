import React from "react";
import { adminAddCoupoun } from "./AdminStyles";
import { Grid } from "@mui/material";
import totalincome from "../../../assets/AdminAssets/totalincome.svg";
import bookings from "../../../assets/AdminAssets/bookings.svg";
import completed from "../../../assets/AdminAssets/completed.svg";
import cancelled from "../../../assets/AdminAssets/cancelled.svg";
import pending from "../../../assets/AdminAssets/pending.svg";

const Dashboard = () => {
  const gridBackgrounds = [
    totalincome,
    bookings,
    completed,
    cancelled,
    pending,
  ];
  const adminAddCoupounStyles = adminAddCoupoun();

  return (
    <>
      <h4 className={adminAddCoupounStyles.headingstyle}>Dashbord</h4>
      <Grid container spacing={2}>
        <Grid
          item
          xs
          style={{
            backgroundImage: `url(${gridBackgrounds[0]})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            paddingTop: "5rem",
            color: "rgb(255, 255, 255)",
          }}
        ></Grid>
        <Grid
          item
          xs
          style={{
            backgroundImage: `url(${gridBackgrounds[1]})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            paddingTop: "5rem",
            color: "rgb(255, 255, 255)",
          }}
        ></Grid>
        <Grid
          item
          xs
          style={{
            backgroundImage: `url(${gridBackgrounds[2]})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            paddingTop: "5rem",
            color: "rgb(255, 255, 255)",
          }}
        ></Grid>
        <Grid
          item
          xs
          style={{
            backgroundImage: `url(${gridBackgrounds[3]})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            paddingTop: "5rem",
            color: "rgb(255, 255, 255)",
          }}
        ></Grid>
        <Grid
          item
          xs
          style={{
            backgroundImage: `url(${gridBackgrounds[4]})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            paddingTop: "5rem",
            color: "rgb(255, 255, 255)",
          }}
        ></Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
