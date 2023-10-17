
import { Button, Grid, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { adminAddCoupoun } from '../Admin/AdminStyles';
import gomytripclient from '../../../GomytripClient';
import { enqueueSnackbar } from 'notistack';
import { aftersearchflights } from "../../../assets/styles/Flights";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { getTermsAdminApi, getPrivacyPolicyAdminApi } from '../../../ApiServices/ServiceApiCalls';
function AdminTermsConditions() {

  const adminAddCoupounStyles = adminAddCoupoun();
  const adminconditions = adminAddCoupoun()

  const [tabValue, setTabValue] = useState("0");
  const aftersearchflight = aftersearchflights();
  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  const [value, setValue] = useState('');

  const [privacyValue,setPrivacyValue] = useState('')
  const adminApis = async () => {
    const getTcApi = await getTermsAdminApi()
    const getPrivacyPolicyApi = await getPrivacyPolicyAdminApi()

    setValue(getTcApi)
    setPrivacyValue(getPrivacyPolicyApi)
  }

  useEffect(() => {
    adminApis()
  }, [])

  function editTc() {
    let payLoad ={
      terms: value 
    }
    let privacyPay ={
      "policy":privacyValue
    }
    gomytripclient.post(tabValue==0?'/editTc':'/editPrivacyPolicy', tabValue==0?payLoad:privacyPay
    ).then(res => {
      if (res.status === 200 && res.data.status === 1) {
        enqueueSnackbar(res.data.message, { variant: 'success' })
      } else {
        enqueueSnackbar(res.data.message, { variant: 'success' })
      }
    }).catch(Err => {
      console.log(Err)
    })
  }

  return (
    <>
     <h4 className={adminAddCoupounStyles.headingstyle}>{tabValue == 0 ? "Terms & Condition" : "Legal Privacy policy"}</h4>
      <Container maxWidth="">
        <TabContext value={tabValue}>
          <TabList
            onChange={handleTabChange}
            sx={{
              background: "#DFF3FF",
              borderRadius: "1rem",
              // width: "29%",
              width: "290px",
              maxWidth:'100%',
              marginBottom: "0.5rem",
              height: "1rem",
            }}
            aria-label="Go bus Tabs"
            className={aftersearchflight.tabs}
            variant="scrollable"
            orientation={"horizontal"}
            scrollButtons={"off"}
          >
            <Tab
              disableRipple
              label="Terms & Condition"
              value="0"
              sx={{
                fontSize: "12px",
                color: "#003556",
                fontWeight: 600,
                textTransform: "none",
                // minWidth: "100px",
              }}
            />
            <Tab
              disableRipple
              label="Privacy and policy"
              value="1"
              sx={{
                fontSize: "12px",
                padding: "0% 4%",
                color: "#003556",
                fontWeight: 600,
                textTransform: "none",
                // minWidth: "100px",
              }}
            />
          </TabList>
          {/* Seat Selection */}
          <TabPanel value={'0'} sx={{ padding: "10px 0" }}>
            <Grid item md={12} style={{ height: '65vh'}}>
              <ReactQuill theme="snow" value={value} onChange={setValue} style={{ height: "90%" }} placeholder='write something...' />
            </Grid>
            <Grid mt={2} textAlign={'right'}>
              <Button onClick={editTc} className={adminconditions.refundstyle}>save</Button>
            </Grid>
          </TabPanel>
          <TabPanel value={'1'} sx={{ padding: "10px 0" }}>
            <h4 className={adminAddCoupounStyles.headingstyle}>{tabValue == 0 ? "Terms & Condition" : "Privacy and policy"}</h4>
            <Grid item md={12} style={{ height: '65vh' }}>
              <ReactQuill theme="snow" value={privacyValue} onChange={setPrivacyValue} style={{ height: "90%" }} placeholder='write something...' />
            </Grid>
            <Grid mt={2} textAlign={'right'}>
              <Button onClick={editTc} className={adminconditions.refundstyle}>save</Button>
            </Grid>
          </TabPanel>
        </TabContext>
      </Container>
      {/* ------------------------------------------------------------------------------------------------ */}
    </>
  )
}
export default AdminTermsConditions