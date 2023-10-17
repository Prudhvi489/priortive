import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Stack, Tab, Typography } from '@mui/material'
import { adminAddCoupoun, adminTabs } from '../Admin/AdminStyles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useState, useEffect } from 'react'
import AdminFaqModal from '../../modals/AdminModals/AdminFaqModal';
import ReactPaginate from 'react-paginate';
import { envdata } from '../../Envexports';
import addhotel from '../../../assets/AdminAssets/addhotel.svg';
import edit from '../../../assets/AdminAssets/edit.svg';
import Remove from '../../../assets/AdminAssets/delete.svg';
// import MySnackbar from '../../modals/Signupmodals/Snackbar';
import axios from 'axios';
import Condition from 'yup/lib/Condition';
const FAQ = () => {
  const adminconditions = adminAddCoupoun();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const tablistStyle = adminTabs()
  const [orderOpen, setOrderOpen] = useState(false);
  const [modaldata, setModaldata] = useState({
    type: 1,
    data: ''
  })
  function orderclose() {
    setOrderOpen(false);
  }
  const [tabValue, setTabValue] = useState(1);
  // for snackbar
  // const [snackopen, setSnackopen] = useState(false);
  // const [snackmessage, setSnackmessage] = useState("");
  // function snackclose() {
  //   setSnackopen(false);
  // };
  //
  const [value, setValue] = useState('');
  const [impInfo, setImpInfo] = useState([])
  const [pagenumber, setPagenumber] = useState(1);
  const [data, setData] = useState({})
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setValue(impInfo.find((data, index) => data.module == newValue)?.info || '')
  };
  // fetch faq list 
  const fetch_faq = async () => {
    const list_faq = {
      "pageNumber": pagenumber,
      "pageSize": 10,
      "module": tabValue,
      "id": "",
      "status": ""
    }

    const res = await axios.post(`${envdata.baseurl}/faqList`, list_faq)
    if (res.data.status) {
      setData(res.data.data.rows)
      setTotalPages(Math.ceil(res.data.data.count / pageSize));
    }
    else {
      // setSnackopen(true);
      // setSnackmessage(res.data.message);
      alert(res.data.message)
    }
  }
  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
    fetch_faq()
  }
  useEffect(() => {
    fetch_faq()
  }, [])
  useEffect(() => {
    fetch_faq()
  }, [tabValue])
  // callback from adminmodal to refresh
  const faq_refresh = () => {
    fetch_faq()
  }
  return (
    <div className={adminconditions.divstyle}>
      {/* <MySnackbar open={snackopen} close={snackclose} message={snackmessage} /> */}
      FAQ?
      <AdminFaqModal open={orderOpen} close={orderclose} module={tabValue} data={modaldata} faq_Callback={faq_refresh} />
      <Stack>
        <Grid item>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Grid container justifyContent={"space-between"}>
                <Grid item>
                  <TabList onChange={handleTabChange} aria-label="lab API tabs example" className={tablistStyle.tablist}>
                    <Tab label="Flights" value={1} />
                    <Tab label="Hotels" value={2} />
                    <Tab label="Buses" value={3} />
                  </TabList>
                </Grid>
              </Grid>
            </Box>
            <TabPanel value={tabValue} className={tablistStyle.tabs1}>
              <Grid spacing={5} container flexDirection='column' mt={1} ml={0.1} width={'100%'}>
                {data.length > 0 && data.map((item, index) => {
                  console.log(item, "data")
                  return (
                    <Accordion className={adminconditions.cardstyle}>
                      <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={adminconditions.textstyle}>{item?.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {item?.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  )
                })}
              </Grid>
            </TabPanel>
          </TabContext>
        </Grid>
        <Grid mt={3}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next "
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            containerClassName="mainPageCont"
            activeClassName="activeClassName"
            activeLinkClassName="activeLinkClassName"
            pageClassName="pageClassName"
          />
        </Grid>
      </Stack>
    </div>
  )
}

export default FAQ;
