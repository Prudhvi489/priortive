import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { aftersearchflights } from "../../../assets/styles/Flights";
import { adminAddCoupoun, adminTabs } from "../Admin/AdminStyles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useState, useEffect } from "react";
import AdminFaqModal from "../../modals/AdminModals/AdminFaqModal";
import ReactPaginate from "react-paginate";
import { envdata } from "../../Envexports";
import addhotel from "../../../assets/AdminAssets/addhotel.svg";
import edit from "../../../assets/AdminAssets/edit.svg";
import Remove from "../../../assets/AdminAssets/delete.svg";
import MySnackbar from "../../modals/Signupmodals/Snackbar";
// import delete11 from '../../../assets/AdminAssets/delete11.svg';
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const AdminFaq = () => {
  const aftersearchflight = aftersearchflights();
  const adminconditions = adminAddCoupoun();
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const tablistStyle = adminTabs();
  const [orderOpen, setOrderOpen] = useState(false);
  const [modaldata, setModaldata] = useState({
    type: 1,
    data: "",
  });
  function orderclose() {
    setOrderOpen(false);
  }
  const [tabValue, setTabValue] = useState("1");
  const [value, setValue] = useState("");
  const [impInfo, setImpInfo] = useState([]);
  const [pagenumber, setPagenumber] = useState(1);
  const [data, setData] = useState({});
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setValue(
      impInfo.find((data, index) => data.module == newValue)?.info || ""
    );
  };
  // fetch faq list
  const fetch_faq = async () => {
    const list_faq = {
      pageNumber: pagenumber,
      pageSize: 10,
      module: tabValue,
      id: "",
      status: "",
    };

    const res = await axios.post(`${envdata.baseurl}/faqList`, list_faq);
    if (res.data.status) {
      setData(res.data.data.rows);
      setTotalPages(Math.ceil(res.data.data.count / pageSize));
    } else {
      setSnackopen(true);
      setSnackmessage(res.data.message);
      // alert(res.data.message);
    }
  };

  /**
   * 
   * @param {*} id 
   * @param {*} status 
   */

  const delete_faq = async (id = '') => {
    if (window.confirm('Are you sure want to delete this FAQ')) {
      const editPay = {
        id: id,
        status: 1,
        module: tabValue,
        pageNumber: 0,
        pageSize: 0
      }
      const res = await axios.post(`${envdata.baseurl}/faqList`, editPay);
      if (res.data.status) {
        enqueueSnackbar(res.data.message, { variant: 'success' })
        document.getElementById(`faq_${id}`).remove()
      } else {
        setSnackopen(true);
        setSnackmessage(res.data.message);
        // alert(res.data.message);
      }
    } else {
      enqueueSnackbar('Action cancelled')
    }
  };

  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
    fetch_faq();
  };
  useEffect(() => {
    fetch_faq();
  }, []);
  useEffect(() => {
    fetch_faq();
  }, [tabValue]);
  // callback from adminmodal to refresh
  const faq_refresh = () => {
    fetch_faq();
  };
  const adminAddCoupounStyles = adminAddCoupoun();
  return (
    <Box className={adminconditions.divstyle}  sx={{
      // 
        "&:hover":{
          background:'none',
          "&::before":{
            content:'none'
          }
        }
      
    }}>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <h4 className={adminAddCoupounStyles.headingstyle}>FAQ?</h4>
      <AdminFaqModal
        open={orderOpen}
        close={orderclose}
        module={tabValue}
        data={modaldata}
        faq_Callback={faq_refresh}
      />
      <Stack>
        <Grid item>
          <TabContext value={tabValue}>
            <Box mb={3}>
              <Grid container justifyContent={"space-between"} rowSpacing={1.5}>
                <Grid item>
                  <TabList
                    onChange={handleTabChange}
                    sx={{
                      background: "#DFF3FF",
                      borderRadius: "1rem",
                      width: "17%",
                      marginBottom: "0.5rem",
                      height: "1rem",
                    }}
                    style={{
                      background: "aliceblue",
                      borderRadius: "10px",
                    }}
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
                      label="Bus"
                      value="3"
                      sx={{
                        fontSize: "12px",
                        color: "#003556",
                        fontWeight: 600,
                        textTransform: "none",
                      }}
                    />
                  </TabList>
                </Grid>
                <Grid item>
                  <Button
                    className={adminconditions.refundstyle}
                    onClick={() => {
                      setModaldata((prev) => ({ ...prev, type: 1, data: "" }));
                      setOrderOpen(true);
                    }}
                  >
                    <img
                      src={addhotel}
                      alt="add hotel"
                      width="20%"
                      style={{ marginRight: "5px" }}
                    />
                    Add FAQ
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <TabPanel value={tabValue} className={tablistStyle.tabs1}>
              <Grid
                spacing={5}
                container
                flexDirection="column"
                ml={0.1}
                width={"100%"}
              >
                {data.length > 0 &&
                  data.map((item, index) => {
                    return (
                      <Accordion id={`faq_${item.id}`} className={adminconditions.cardstyle}>
                        <AccordionSummary
                          expandIcon={<ArrowDropDownIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className={adminconditions.textstyle} sx={{height:'fit-content',position:'inherit'}}>
                            {item?.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{item?.answer}</Typography>
                          <Grid
                            container
                            justifyContent={"flex-end"}
                            spacing={2}
                          >
                            <Grid item>
                              <Button
                                className={adminconditions.refundstyle}
                                onClick={() => {
                                  setModaldata((prev) => ({
                                    ...prev,
                                    type: 2,
                                    data: item,
                                  }));
                                  setOrderOpen(true);
                                }}
                              >
                                <img
                                  src={edit}
                                  alt="add hotel"
                                  width="30%"
                                  style={{ marginRight: "5px" }}
                                />
                                Edit
                              </Button>
                              <Button onClick={() => delete_faq(item.id)} className={adminconditions.refundstyle1}>
                                <img
                                  src={Remove}
                                  alt="add hotel"
                                  width="30%"
                                  style={{ marginRight: "5px" }}
                                />
                                Delete
                              </Button>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    );
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
    </Box>
  );
};

export default AdminFaq;
