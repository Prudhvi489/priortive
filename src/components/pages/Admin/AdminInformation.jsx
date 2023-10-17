import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import gomytripclient from "../../../GomytripClient";
import { enqueueSnackbar } from "notistack";
import { adminAddCoupoun, adminTabs } from "../Admin/AdminStyles";
import { aftersearchflights } from "../../../assets/styles/Flights";

const AdminInformation = () => {
  const aftersearchflight = aftersearchflights();
  const adminconditions = adminAddCoupoun();
  const tablistStyle = adminTabs();
  const [tabValue, setTabValue] = useState("1");
  const [impInfo, setImpInfo] = useState([]);
  const [value, setValue] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setValue(
      impInfo.find((data, index) => data.module == newValue)?.info || ""
    );
  };

  function handleQuillChange(e) {
    setValue(e);
  }

  useEffect(() => {
    gomytripclient
      .post("/getimportantInfo", { module: "" })
      .then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          setValue(
            res.data.data.find((data, index) => data.module == tabValue)
              ?.info || ""
          );
          setImpInfo(res.data.data);
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function editimportantInfo() {
    let Pay = { id: Number(tabValue), content: value };

    gomytripclient
      .post("/editimportantInfo", Pay)
      .then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          setImpInfo((prev) =>
            prev.map((item) =>
              item.module == tabValue ? { ...item, info: value } : item
            )
          );
          enqueueSnackbar(res.data.message, { variant: "success" });
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const adminAddCoupounStyles = adminAddCoupoun;
  return (
    <div>
      <h4 className={adminAddCoupounStyles.headingstyle}>
        Important Information
      </h4>
      <TabContext value={tabValue}>
        <TabList
          style={{
            background: "#DFF3FF",
            borderRadius: "1rem",
            // width: "25%",
            width: "fit-content",
            maxWidth:'100%',
            marginBottom: "0.5rem",
            height: "1rem",
          }}
          onChange={handleTabChange}
          aria-label="Go bus Tabs"
          className={aftersearchflight.tabs}
          variant="scrollable"
          orientation={"horizontal"}
          scrollButtons={"off"}
        >
          <Tab
            disableRipple
            label="Flights"
            value="1"
            sx={{
              fontSize: "12px",
              color: "#003556",
              fontWeight: 600,
              textTransform: "none",
            }}
          />
          <Tab
            disableRipple
            label="Hotels"
            value="2"
            sx={{
              fontSize: "12px",
              padding: "0% 4%",
              color: "#003556",
              fontWeight: 600,
              textTransform: "none",
            }}
          />
          <Tab
            disableRipple
            label="Buses"
            value="3"
            sx={{
              fontSize: "12px",
              padding: "0% 4%",
              color: "#003556",
              fontWeight: 600,
              textTransform: "none",
            }}
          />
        </TabList>
        <TabPanel value={tabValue} className={tablistStyle.tabs}>
          <Grid spacing={5} container flexDirection="column">
            <Grid item style={{ height: "65vh" }}>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                style={{ height: "90%" }}
                placeholder="write something..."
              />
            </Grid>
            <Grid item>
              <Button
                className={adminconditions.refundstyle}
                onClick={editimportantInfo}
                fullWidth
                variant="contained"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default AdminInformation;
