import {
    Container,
    Grid,
    TextField,
    Button,
    Paper,
    Stack,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import BusesPageBackDrop from "../Buses/BusesPageBackDrop";
  import Tab from "@mui/material/Tab";
  import { TabContext, TabList, TabPanel } from "@mui/lab";
  import {
    aftersearchflights,
  } from "../../../assets/styles/Flights";
  import axios from "axios";
  import "react-dates/initialize";
  import "react-dates/lib/css/_datepicker.css";
  import { DateRangePicker } from "react-dates";
  import helperFunctions from "../../../helpers/helperFunctions.js";
  import ReactPaginate from "react-paginate";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
  import { adminAddCoupoun, adminTables } from "./AdminStyles";
  import { DownloadFileFromApi } from "../../../ApiServices/DownloadFilesApi";
  import revenue from "../../../assets/AdminAssets/revenue.svg";
  import vendor from "../../../assets/AdminAssets/vendor.svg";
  import yourshare from "../../../assets/AdminAssets/yourshare.svg";
  import refund from "../../../assets/AdminAssets/refund.svg";
  import BusOrderId from "../../modals/AdminModals/BusOrderId";
  import BusRefund from "../../modals/AdminModals/BusRefund";
  import addhotel from '../../../assets/AdminAssets/addhotel.svg';
  
  const AdminManagement = () => {
    const adminTableStyles = adminTables();
    const adminAddCoupounStyles = adminAddCoupoun();
    const aftersearchflight = aftersearchflights();
    const [pageLoading, setPageLoading] = useState(false);
    const [tabValue, setTabValue] = useState("1");
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    // console.log(helperFunctions.convertDateStr(startDate?.toString()).split("/").reverse().join("-"))
    const [data, setData] = useState([]);
    const [totalRecordsCount, setTotalRecordsCount] = useState("");
    const [searchString, setSearchString] = useState("");
    const [busRevenueData, setBusRevenueData] = useState('');
  
    console.log(busRevenueData, 'busRevenueData')
    const handleTabChange = (event, tabValue) => {
      setTabValue(tabValue);
      setPageNumber(1)
    };
    useEffect(() => {
  
      if (tabValue == 1 || tabValue == 2 || tabValue == 3 | tabValue == 4) {
        let payloadData = {
          pageNumber: pageNumber,
          pageSize: 10,
          type: tabValue,
          from: startDate
            ? helperFunctions
              ?.convertDateStr(startDate?.toString())
              .split("/")
              .reverse()
              .join("-")
            : "",
          to: endDate
            ? helperFunctions
              ?.convertDateStr(endDate?.toString())
              .split("/")
              .reverse()
              .join("-")
            : "",
          search: searchString,
          download: false,
        };
        setPageLoading(true);
        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/busOverallBookingData`,
            payloadData
          )
          .then((res) => {
            console.log(res);
  
            if (res.status === 200 && res.data.status === 1) {
              setData(res.data.data.rows);
              setTotalRecordsCount(res.data.data.count);
              setTotalPages(Math.ceil(res.data.data.count / pageSize));
              setPageLoading(false);
            } else {
              setData([]);
              setTotalRecordsCount(0);
              setPageLoading(false);
            }
          })
          .catch((err) => {
            setPageLoading(false);
  
            console.log(err);
          });
      } else {
        let reVpay = {
          from: startDate
            ? helperFunctions
              ?.convertDateStr(startDate?.toString())
              .split("/")
              .reverse()
              .join("-")
            : "",
          to: endDate
            ? helperFunctions
              ?.convertDateStr(endDate?.toString())
              .split("/")
              .reverse()
              .join("-")
            : "",
        }
        setPageLoading(true);
        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/busOverallRevenue`,
            reVpay
          )
          .then((res) => {
            if (res.status === 200 && res.data.status === 1) {
              setBusRevenueData(res.data.data[0])
            } else {
              setBusRevenueData('')
            }
            setPageLoading(false);
  
          })
          .catch((err) => {
            setPageLoading(false);
  
            console.log(err);
          });
      }
    }, [tabValue, pageNumber, searchString, endDate]);
  
    const handleDatesChange = ({ startDate, endDate }) => {
      setStartDate(startDate);
      setEndDate(endDate);
    };
  
    const handleFocusChange = (focusedInput) => {
      setFocusedInput(focusedInput);
    };
    const handlePageClick = (event) => {
      setPageNumber(event.selected + 1);
    };
    // order id dialog states
    const [orderOpen, setOrderOpen] = useState(false);
    function orderclose() {
      setOrderOpen(false);
    }
    // refund dialog states
    const [refundOpen, setRefundOpen] = useState(false);
    function refundclose() {
      setRefundOpen(false);
    }
    function refundopen() {
      setRefundOpen(true);
      orderclose();
    }
    let columns = [
      "S.No.",
      "Hotel Name",
      "ID",
      "Contact Number",
      "Mail ID",
      "Address",
      "Action",
    ];
    return (
      <>
        <BusOrderId open={orderOpen} close={orderclose} openfund={refundopen} />
        <BusRefund open={refundOpen} close={refundclose} />
        <BusesPageBackDrop open={pageLoading} />
  
        <h4 className={adminAddCoupounStyles.headingstyle}>Management Hotels</h4>
  
        <Container maxWidth="xl">
          <TabContext value={tabValue}>
            <TabList
              onChange={handleTabChange}
              sx={{
                background: "#DFF3FF",
                borderRadius: "1rem",
                width: "26%",
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
                label="All"
                value="1"
                sx={{
                  fontSize: "13px",
                  color: "#003556",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              />
              <Tab
                disableRipple
                label="GMT Team"
                value="2"
                sx={{
                  fontSize: "13px",
                  padding: "0% 4%",
                  color: "#003556",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              />
              <Tab
                disableRipple
                label="Bookings "
                value="3"
                sx={{
                  fontSize: "13px",
                  padding: "0% 4%",
                  color: "#003556",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              />  
            </TabList>
            {/* Seat Selection */}
  
            <TabPanel value={tabValue} sx={{ padding: "10px 0" }}>
              {tabValue === "5" ? (
                <>
                  <Grid container spacing={2}>
                    <Grid container justifyContent={"end"} mt={1} mb={2}>
                      <Grid item>
                        <DateRangePicker
                          startDate={startDate}
                          endDate={endDate}
                          onDatesChange={handleDatesChange}
                          focusedInput={focusedInput}
                          onFocusChange={handleFocusChange}
                          isOutsideRange={() => false}
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item md={12}>
                        <Paper elevation={3} style={{ padding: "16px" }} >
                          <Grid container spacing={2}>
                            <Grid item xs={3}>
                              <Paper
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "30vh",
                                }}
                              >
                                <Grid
                                  item
                                  md={6}
                                  style={{ margin: "auto", width: "40%", lineHeight: "2.5rem" }}
                                >
                                  <Stack direction="column" spacing={2}>
                                    <img
                                      src={revenue}
                                      alt="Total Revenue"
                                      style={{ display: "block", margin: "auto", width: "50%" }}
                                    />
                                  </Stack>
                                  <Stack direction="column" spacing={2}>
                                    <span style={{ fontSize: "15px" }}>Total Revenue</span>
                                  </Stack>
                                  <Stack direction="column" spacing={1}>
                                    <span>{busRevenueData?.total_revenue} INR</span>
                                  </Stack>
                                </Grid>
                              </Paper>
                            </Grid>
                            <Grid item xs={3}>
                              <Paper
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "30vh",
                                }}
                              >
                                <Grid
                                  item
                                  md={6}
                                  style={{ margin: "auto", width: "40%", lineHeight: "2.5rem" }}
                                >
                                  <Stack direction="column" spacing={1}>
                                    <img
                                      src={vendor}
                                      alt="Vendor Share"
                                      style={{ display: "block", margin: "auto", width: "50%" }}
                                    />
                                  </Stack>
                                  <Stack direction="column" spacing={1}>
                                    <span style={{ fontSize: "15px" }}>Vendor Share</span>
                                  </Stack>
                                  <Stack direction="column" spacing={1}>
                                    <span>{busRevenueData?.vendor_revenue} INR</span>
                                  </Stack>
                                </Grid>
                              </Paper>
                            </Grid>
                            <Grid item xs={3}>
                              <Paper
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "30vh",
                                }}
                              >
                                <Grid
                                  item
                                  md={6}
                                  style={{ margin: "auto", width: "40%", lineHeight: "2.5rem" }}
                                >
                                  <Stack direction="column" spacing={1}>
                                    <img
                                      src={yourshare}
                                      alt="Your Share"
                                      style={{ display: "block", margin: "auto", width: "50%" }}
                                    />
                                  </Stack>
                                  <Stack direction="column" spacing={1}>
                                    <span style={{ fontSize: "15px" }}>Your Share</span>
                                  </Stack>
                                  <Stack direction="column" spacing={1}>
                                    <span>{busRevenueData?.admin_revenue} INR</span>
                                  </Stack>
                                </Grid>
                              </Paper>
                            </Grid>
                            <Grid item xs={3}>
                              <Paper
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "30vh",
                                }}
                              >
                                <Grid
                                  item
                                  md={6}
                                  style={{ margin: "auto", width: "40%", lineHeight: "2.5rem" }}
                                >
                                  <Stack direction="column" spacing={1}>
                                    <img
                                      src={refund}
                                      alt="Refund Amount"
                                      style={{ display: "block", margin: "auto", width: "50%" }}
                                    />
                                  </Stack>
                                  <Stack direction="column" spacing={1}>
                                    <span style={{ fontSize: "15px" }}>Refund Amount</span>
                                  </Stack>
                                  <Stack direction="column" spacing={1}>
                                    <span>{busRevenueData?.refund_amount} INR</span>
                                  </Stack>
                                </Grid>
                              </Paper>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid
                    container
                    direction="row"
                    // flexDirection={'row'}
                    spacing={0}
                    className={""}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems={"center"}
                    >
                      <Grid item>
                        <TextField
                          placeholder="Search"
                          variant="outlined"
                          label="text"
                          size="small"
                          onChange={(e) => setSearchString(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2} alignItems={"baseline"}>
                          <Grid item>
                            <Button
                              className="bg-p"
                              size="small"
                              variant="contained"
                            >
                              <img src={addhotel} alt="add hotel" width="20%" />
                             Add Hotel
                            </Button>
                          </Grid>        
                        </Grid>
                      </Grid>
                    </Grid>
  
                    <Grid container mt={3}>
                      <Grid item sx={{width: "100%"}}>
                        {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                        <TableContainer
                          // sx={{ maxHeight: 440 }}
                          className="adminTableContainer"
                        >
                          <Table
                            stickyHeader
                            aria-label="sticky table"
                            className={`${adminTableStyles.table} adminTable`}
                          >
                            <TableHead>
                              <TableRow>
                                {columns.map((column) => (
                                  <TableCell key={column}>{column}</TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data.map((data) => (
                                <TableRow key={data.s_no} hover role="checkbox">
                                  <TableCell>{data.s_no}</TableCell>
                                  <TableCell>{data.hotelname}</TableCell>
                                  <TableCell>{data.id}</TableCell>
                                  <TableCell>{data.mobile}</TableCell>
                                  <TableCell>{data.email}</TableCell>
                                  <TableCell>{data.address}</TableCell>
                                  <TableCell>
                                    <RemoveRedEyeIcon
                                      onClick={() => setOrderOpen(true)}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
  
                        {/* </Paper> */}
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justifyContent={"space-between"}
                      mt={2}
                      alignItems={"baseline"}
                    >
                      <Grid item>
                        {pageNumber * 10 - 10 + 1} - {pageNumber * 10 - 10 + 10}of{" "}
                        {totalRecordsCount}
                      </Grid>
                      <Grid item>
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
                    </Grid>
                  </Grid>
                </>
              )}
            </TabPanel>
          </TabContext>
        </Container>
      </>
    );
  };
  
  export default AdminManagement;
  