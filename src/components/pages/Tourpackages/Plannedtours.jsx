import React, { useEffect, useState } from "react";
import { adminAddCoupoun } from "../Admin/AdminStyles";
import { Container, Tab, Grid, Paper, Typography } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { aftersearchflights } from "../../../assets/styles/Flights";
import travel from "../../../assets/Tourpackages/travel.svg";
import { useLocation } from "react-router-dom";
import Header from "../../../parts/Header";
import Footer from "../../../parts/Footer";
import gomytripclient from "../../../GomytripClient";
import { convertDateFormat } from "../Buses/BusModuleHelperFunctions";
import {styles} from '../../../assets/styles/Styles_export'
const Plannedtours = () => {
  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };
  const location = useLocation()
  const [tabValue, setTabValue] = useState(0);
  const adminAddCoupounStyles = adminAddCoupoun();
  const aftersearchflight = aftersearchflights();
  const [pageNum, setPageNum] = useState(1)
  const [plannedInqury, setPlannedInqury] = useState([]);

  console.log(plannedInqury, 'tour')

  //   status = 0 -> active
  // status = 1 -> inactive 

  useEffect(() => {
    getPlannedInquey()
  }, [tabValue])

  const getPlannedInquey = () => {

    let payload = {
      user_id: localStorage.getItem("userid"),
      pageNumber: pageNum,
      pageSize: 50,
      status: tabValue
    };

    gomytripclient.post("/getInquiryDetails", payload)
      .then((res) => {
        if (res.data.status) {
          setPlannedInqury(res.data.data.rows);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((Err) => {
        console.log(Err);
      });
  }

  return (
    <>
    <Header />
    <Grid >
      
      <Container maxWidth="xl">
        <Grid item>
          <h4 className={adminAddCoupounStyles.plantours}>Planned Tours</h4>
        </Grid>
        <TabContext value={tabValue}>
          <TabList
            onChange={handleTabChange}
            sx={{
              background: "#DFF3FF",
              borderRadius: "1rem",
              // width: {xs:'50%',sm:'40%',md:'30%',lg:'20%',xl:'20%'},
              width:'fit-content',
              marginBottom: "0.5rem",
              height: "1rem",
            }}
            aria-label="Go bus Tabs"
            className={aftersearchflight.tabs}
            orientation={"horizontal"}
            scrollButtons={"off"}
          >
            <Tab
              disableRipple
              label="Open Enquiry"
              value={0}
              sx={{
                background: "#DFF3FF",
                borderRadius: "1rem",
                width: "230px",
                marginBottom: "0.5rem",
                height: "1rem",
              }}
              aria-label="Go bus Tabs"
              className={aftersearchflight.tabs}
              orientation={"horizontal"}
              scrollButtons={"off"}
            />
              {/* <Tab
                disableRipple
                label="Open Enquiry"
                value={0}
                sx={{
                  fontSize: "12px",
                  color: styles.app_color,
                  fontWeight: 600,
                  textTransform: "none",
                }}
              /> */}
              <Tab
                disableRipple
                label="Closed Enquiry"
                value={1}
                sx={{
                  background: "#DFF3FF",
                  borderRadius: "1rem",
                  width: "210px",
                  marginBottom: "0.5rem",
                  height: "1rem",
                }}
                aria-label="Go bus Tabs"
                className={aftersearchflight.tabs}
                orientation={"horizontal"}
                scrollButtons={"off"}
              />
            </TabList>
            <TabPanel value={tabValue} sx={{ padding: "10px 0", marginTop: "2rem" }}>
              {plannedInqury && plannedInqury?.length > 0 ?
                <>
                  {
                    plannedInqury?.map((item, index) => {
                      return (
                        <>
                          <Paper elevation={3} style={{ padding: "1rem",marginBottom:'15px' }}>
                            <Grid container spacing={2}>
                              <Grid item>
                                <img
                                  src={travel}
                                  alt="Travel"
                                  style={{
                                    border: "1px solid skyblue",
                                    borderRadius: "50%",
                                    padding: "5px",
                                    marginLeft: "-2.3rem",
                                    marginTop: "8px",
                                    backgroundColor: "white",
                                  }}
                                />
                              </Grid>
                              <Grid item>
                                <Grid container spacing={2} display={"block"}>
                                  <Grid item>
                                    <Typography
                                      style={{
                                        fontWeight: "700",
                                        color: "rgba(0, 0, 0, 1)",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      {item.destination}
                                    </Typography>
                                  </Grid>
                                  {/* <Grid item>
                                    <Typography>{convertDateFormat(item?.created_at)}</Typography>
                                  </Grid> */}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Paper>
                        </>
                      )
                    })
                  }
                </>
                : <p>No Enquiry's found</p>}
            </TabPanel>
          </TabContext>
        </Container>
      </Grid>
      <Grid style={{ marginTop: "3.1rem" }}>
        <Footer />
      </Grid>
    </>
  );
};

export default Plannedtours;
