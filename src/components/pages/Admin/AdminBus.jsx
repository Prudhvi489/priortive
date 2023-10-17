import {
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, InputAdornment, Tooltip
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BusesPageBackDrop from "../Buses/BusesPageBackDrop";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { aftersearchflights } from "../../../assets/styles/Flights";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import helperFunctions from "../../../helpers/helperFunctions.js";
import ReactPaginate from "react-paginate";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { adminAddCoupoun, adminTables } from "./AdminStyles";
import { DownloadFileFromApi } from "../../../ApiServices/DownloadFilesApi";
import revenue from "../../../assets/AdminAssets/revenue.svg";
import vendor from "../../../assets/AdminAssets/vendor.svg";
import yourshare from "../../../assets/AdminAssets/yourshare.svg";
import refund from "../../../assets/AdminAssets/refund.svg";
import BusOrderId from "../../modals/AdminModals/BusOrderId";
import BusRefund from "../../modals/AdminModals/BusRefund";
import gomytripclient from "../../../GomytripClient";
import "../Admin/AdminStyles";
import SearchIcon from '@mui/icons-material/Search';
import { enqueueSnackbar } from "notistack";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
const AdminBus = () => {
  const adminTableStyles = adminTables();
  const adminAddCoupounStyles = adminAddCoupoun();
  const aftersearchflight = aftersearchflights();
  const [pageLoading, setPageLoading] = useState(false);
  const [tabValue, setTabValue] = useState("2");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [data, setData] = useState([]);
  const [totalRecordsCount, setTotalRecordsCount] = useState("");
  const [searchString, setSearchString] = useState("");
  const [busRevenueData, setBusRevenueData] = useState("");

  const handleTabChange = (event, tabValue) => {
    setPageNumber(1);
    setTabValue(tabValue);
  };
  console.log(pageNumber,'pageNumber');

  useEffect(() => {
    if (tabValue == 1 || tabValue == 2 || (tabValue == 3) | (tabValue == 4)) {
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
        downloadType: '',
      };
      setPageLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/busOverallBookingData`,
          payloadData
        )
        .then((res) => {

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
      };
      setPageLoading(true);
      axios
        .post(`${process.env.REACT_APP_BASEURL}/busOverallRevenue`, reVpay)
        .then((res) => {
          if (res.status === 200 && res.data.status === 1) {
            setBusRevenueData(res.data.data[0]);
          } else {
            setBusRevenueData("");
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
    "Users name",
    "Booking Number",
    "Contact Number",
    "Mail ID",
    "Date",
    "Fare",
    "Action",
  ];

  /**
   * downloadType=1->pdf
                =2->excel
   */
  const DownloadFile = async (downType) => {
    let payload = {
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
      downloadType: downType,
    };
    DownloadFileFromApi("/busOverallBookingData", payload);
  };
  const [busBookingDet, setBusBookingDet] = useState();

  const [passengers, setPassengers] = useState([]);

  const getBusBookingDetails = (bookIds) => {
    gomytripclient
      .post("/bookingDetails", { bookingId: bookIds })
      .then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          res.data.data.bookingData[0].bookingId = bookIds;
          setBusBookingDet(res.data.data.bookingData[0]);
          setPassengers(res.data.data.tboSideDetails);
          setOrderOpen(true);

        }
        // console.log(res)
        enqueueSnackbar(res.data.message)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {orderOpen && <BusOrderId
        open={orderOpen}
        close={orderclose}
        openfund={refundopen}
        passengers={passengers}
        bookingDetails={busBookingDet}
      />}
      {refundOpen && <BusRefund
        open={refundOpen}
        close={refundclose}
        bookingDetails={busBookingDet}
      />}
      <BusesPageBackDrop open={pageLoading} />

      <h4 className={adminAddCoupounStyles.headingstyle}>Bus Bookings</h4>

      <Container maxWidth="xl" className="adminBusContainer">
        <TabContext value={tabValue}>
          <TabList
            onChange={handleTabChange}
            sx={{
              background: "#DFF3FF",
              borderRadius: "1rem",
              width: "85%",
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
              label="Future Bookings"
              value="2"
              sx={{
                fontSize: "12px",
                color: "#003556",
                fontWeight: 600,
                textTransform: "none",
              }}
            />
            <Tab
              disableRipple
              label="Cancelled Bookings"
              value="4"
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
              label="Completed Bookings "
              value="3"
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
              label="Pending Booking"
              value="1"
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
              label="Total Revenue"
              value="5"
              sx={{
                fontSize: "12px",
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
                    <Grid item md={'auto'} className="start-end-dates-admin">
                      <Grid style={{ border: '1px solid #003556', paddingLeft: '0.11rem', paddingRight: '0.3rem', borderRadius: '0.3rem' }} container alignItems="center">
                        <DateRangePicker
                          startDate={startDate}
                          startDateId="startdate"
                          endDate={endDate}
                          endDateId="enddate"
                          // startDatePlaceholderText="Start Date"
                          small="true"
                          onDatesChange={handleDatesChange}
                          focusedInput={focusedInput}
                          onFocusChange={handleFocusChange}
                          isOutsideRange={() => false} // Optional: Allows selection of past dates
                          noBorder={true}
                        />
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="#003556" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.7025 8.59546C16.7025 8.66255 16.7025 8.71982 16.7025 8.77751C16.7025 10.5104 16.7038 12.2432 16.7021 13.9761C16.7012 14.9906 16.0851 15.803 15.1385 16.0295C14.9643 16.0709 14.7803 16.085 14.6006 16.085C11.4568 16.0885 8.31347 16.0885 5.16971 16.0868C4.09504 16.0859 3.27142 15.4004 3.08953 14.3594C3.06946 14.2449 3.06733 14.1261 3.06733 14.009C3.06605 12.2548 3.06647 10.5005 3.06647 8.74674C3.06647 8.69973 3.07074 8.65272 3.07373 8.59546C7.61239 8.59546 12.1442 8.59546 16.7025 8.59546Z" />
                          <path d="M13.9778 4.48918C14.2096 4.48918 14.4167 4.4879 14.6238 4.48918C15.8197 4.4973 16.695 5.37506 16.7031 6.57375C16.7044 6.78101 16.7031 6.98827 16.7031 7.20579C12.1564 7.20579 7.62111 7.20579 3.08373 7.20579C3.00432 6.36051 3.08117 5.5695 3.78524 4.97592C4.13023 4.6849 4.52517 4.51482 4.97691 4.49559C5.24162 4.48405 5.5072 4.49345 5.79241 4.49345C5.79241 4.25243 5.79241 4.03064 5.79241 3.80885C5.79241 3.59048 5.79113 3.37168 5.79284 3.15331C5.79583 2.74777 6.07634 2.44948 6.45848 2.44307C6.85257 2.43623 7.14846 2.72383 7.157 3.1375C7.16511 3.52125 7.15913 3.90501 7.15913 4.28876C7.15913 4.34688 7.15913 4.40499 7.15913 4.47593C8.97801 4.47593 10.7849 4.47593 12.6106 4.47593C12.6106 4.34901 12.6106 4.22808 12.6106 4.10671C12.6106 3.78706 12.6064 3.46698 12.6119 3.14733C12.6196 2.73195 12.9091 2.44008 13.3015 2.44264C13.6917 2.44521 13.9752 2.74392 13.9774 3.15929C13.9795 3.59561 13.9778 4.03193 13.9778 4.48918Z" />
                        </svg>
                      </Grid>
                    </Grid>
                    {/* <Grid item>
                      <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={handleDatesChange}
                        focusedInput={focusedInput}
                        onFocusChange={handleFocusChange}
                        isOutsideRange={() => false}
                      />
                    </Grid> */}
                  </Grid>
                  <Grid container>
                    <Grid item md={12}>
                      <Paper elevation={3} style={{ padding: "16px" }}>
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
                                style={{
                                  margin: "auto",
                                  width: "40%",
                                  lineHeight: "2.5rem",
                                }}
                              >
                                <Stack direction="column" spacing={2}>
                                  <img
                                    src={revenue}
                                    alt="Total Revenue"
                                    style={{
                                      display: "block",
                                      margin: "auto",
                                      width: "50%",
                                    }}
                                  />
                                </Stack>
                                <Stack direction="column" spacing={2}>
                                  <span style={{ fontSize: "15px" }}>
                                    Total Revenue
                                  </span>
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                  <span>
                                    {busRevenueData?.total_revenue} INR
                                  </span>
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
                                style={{
                                  margin: "auto",
                                  width: "40%",
                                  lineHeight: "2.5rem",
                                }}
                              >
                                <Stack direction="column" spacing={1}>
                                  <img
                                    src={vendor}
                                    alt="Vendor Share"
                                    style={{
                                      display: "block",
                                      margin: "auto",
                                      width: "50%",
                                    }}
                                  />
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                  <span style={{ fontSize: "15px" }}>
                                    Vendor Share
                                  </span>
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                  <span>
                                    {busRevenueData?.vendor_revenue} INR
                                  </span>
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
                                style={{
                                  margin: "auto",
                                  width: "40%",
                                  lineHeight: "2.5rem",
                                }}
                              >
                                <Stack direction="column" spacing={1}>
                                  <img
                                    src={yourshare}
                                    alt="Your Share"
                                    style={{
                                      display: "block",
                                      margin: "auto",
                                      width: "50%",
                                    }}
                                  />
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                  <span style={{ fontSize: "15px" }}>
                                    Your Share
                                  </span>
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                  <span>
                                    {busRevenueData?.admin_revenue} INR
                                  </span>
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
                                style={{
                                  margin: "auto",
                                  width: "40%",
                                  lineHeight: "2.5rem",
                                }}
                              >
                                <Stack direction="column" spacing={1}>
                                  <img
                                    src={refund}
                                    alt="Refund Amount"
                                    style={{
                                      display: "block",
                                      margin: "auto",
                                      width: "50%",
                                    }}
                                  />
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                  <span style={{ fontSize: "15px" }}>
                                    Refund Amount
                                  </span>
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                  <span>
                                    {busRevenueData?.refund_amount} INR
                                  </span>
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
                    rowSpacing={1.5}
                  >
                    <Grid item>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        label="Search"
                        size="small"
                        onChange={(e) => {setPageNumber(1);setSearchString(e.target.value)}}
                        InputProps={{
                          // readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              {/* <img src={busFromLocIcon} alt='fromLocBusIcon'/> */}
                              <SearchIcon
                                sx={{ color: "#003556" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2} alignItems={"baseline"}>

                      
                      <Grid item>
                        <Tooltip placement="top" title='Download XLSX File'>
                          <Button
                            className="bg-p"
                            size="small"
                            variant="contained"
                            onClick={()=>DownloadFile(2)}
                          >
                            {/* <GridOnIcon /> */}
                            <FileDownloadIcon/> Xlsx
                          </Button>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                        <Tooltip placement="top" title='Download PDF File'>

                          <Button
                            className="bg-p"
                            size="small"
                            variant="contained"
                            onClick={()=>DownloadFile(1)}
                          >
                            {/* <PictureAsPdfIcon /> */}
                            <FileDownloadIcon/> PDF
                          </Button>
                          </Tooltip>

                        </Grid>
                        <Grid item md={'auto'} className="start-end-dates-admin">
                          <Grid style={{ border: '1px solid #003556', paddingLeft: '0.11rem', paddingRight: '0.3rem', borderRadius: '0.3rem' }} container alignItems="center">
                            <DateRangePicker
                              startDate={startDate}
                              startDateId="startdate"
                              endDate={endDate}
                              endDateId="enddate"
                              // startDatePlaceholderText="Start Date"
                              small="true"
                              onDatesChange={handleDatesChange}
                              focusedInput={focusedInput}
                              onFocusChange={handleFocusChange}
                              isOutsideRange={() => false} // Optional: Allows selection of past dates
                              noBorder={true}
                            />
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="#003556" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.7025 8.59546C16.7025 8.66255 16.7025 8.71982 16.7025 8.77751C16.7025 10.5104 16.7038 12.2432 16.7021 13.9761C16.7012 14.9906 16.0851 15.803 15.1385 16.0295C14.9643 16.0709 14.7803 16.085 14.6006 16.085C11.4568 16.0885 8.31347 16.0885 5.16971 16.0868C4.09504 16.0859 3.27142 15.4004 3.08953 14.3594C3.06946 14.2449 3.06733 14.1261 3.06733 14.009C3.06605 12.2548 3.06647 10.5005 3.06647 8.74674C3.06647 8.69973 3.07074 8.65272 3.07373 8.59546C7.61239 8.59546 12.1442 8.59546 16.7025 8.59546Z" />
                              <path d="M13.9778 4.48918C14.2096 4.48918 14.4167 4.4879 14.6238 4.48918C15.8197 4.4973 16.695 5.37506 16.7031 6.57375C16.7044 6.78101 16.7031 6.98827 16.7031 7.20579C12.1564 7.20579 7.62111 7.20579 3.08373 7.20579C3.00432 6.36051 3.08117 5.5695 3.78524 4.97592C4.13023 4.6849 4.52517 4.51482 4.97691 4.49559C5.24162 4.48405 5.5072 4.49345 5.79241 4.49345C5.79241 4.25243 5.79241 4.03064 5.79241 3.80885C5.79241 3.59048 5.79113 3.37168 5.79284 3.15331C5.79583 2.74777 6.07634 2.44948 6.45848 2.44307C6.85257 2.43623 7.14846 2.72383 7.157 3.1375C7.16511 3.52125 7.15913 3.90501 7.15913 4.28876C7.15913 4.34688 7.15913 4.40499 7.15913 4.47593C8.97801 4.47593 10.7849 4.47593 12.6106 4.47593C12.6106 4.34901 12.6106 4.22808 12.6106 4.10671C12.6106 3.78706 12.6064 3.46698 12.6119 3.14733C12.6196 2.73195 12.9091 2.44008 13.3015 2.44264C13.6917 2.44521 13.9752 2.74392 13.9774 3.15929C13.9795 3.59561 13.9778 4.03193 13.9778 4.48918Z" />
                            </svg>
                          </Grid>
                        </Grid>
                        {/* <Grid item>
                          <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onDatesChange={handleDatesChange}
                            focusedInput={focusedInput}
                            onFocusChange={handleFocusChange}
                            isOutsideRange={() => false} // Optional: Allows selection of past dates
                          />
                        </Grid> */}
                        <Grid item>
                          <Button
                            className="bg-p"
                            size="small"
                            variant="contained"
                            onClick={(e) => {
                              setStartDate("");
                              setEndDate("");
                            }}
                          >
                            Clear
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container mt={3} className="adminTableContainer">
                    <Grid item sx={{ width: "100%" }}>
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
                              {/* {columns.map((column) => ( */}
                              <TableCell>{"S.No"}</TableCell>
                              <TableCell>{"Users name"}</TableCell>
                              <TableCell>{"Booking Number"}</TableCell>
                              <TableCell>{"Contact Number"}</TableCell>
                              <TableCell>{"Mail ID"}</TableCell>
                              <TableCell>{"Transaction ID"}</TableCell>
                              <TableCell>{"Date"}</TableCell>
                              <TableCell>{"Fare"}</TableCell>
                              {tabValue == 1 && (
                                <TableCell>{"Refund Status"}</TableCell>
                              )}
                              {tabValue == 4 && (
                                <TableCell>{"Refund Status"}</TableCell>
                              )}
                              <TableCell>{"Action"}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.map((data) => (
                              <TableRow key={data.s_no} hover role="checkbox">
                                <TableCell>{data?.s_no}</TableCell>
                                <TableCell>{data?.username}</TableCell>
                                <TableCell>
                                  {data?.booking_number || "N/A"}
                                </TableCell>
                                <TableCell>{data?.mobile || "N/A"}</TableCell>
                                <TableCell>{data?.email || "N/A"}</TableCell>
                                <TableCell>
                                  {data?.transaction_id || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {data?.journey_date?.split("T")[0]}
                                </TableCell>
                                <TableCell>₹ {data.total_price}</TableCell>
                                {tabValue == 1 && (
                                  <TableCell>
                                    {data.refund_status === 0 ? (
                                      <span
                                        style={{ color: "#C67931" }}
                                        className="f-w-500"
                                      >
                                        INITIATE
                                      </span>
                                    ) : data.refund_status === 1 ? (
                                      <span
                                        style={{ color: "#003556" }}
                                        className="f-w-500"
                                      >
                                        PROCESSED
                                      </span>
                                    ) : (
                                      <span
                                        style={{ color: "#1D9646" }}
                                        className="f-w-500"
                                      >
                                        COMPLETED
                                      </span>
                                    )}
                                  </TableCell>
                                )}

                                {tabValue == 4 && (
                                  <TableCell>
                                    {data.refund_status === 0 ? (
                                      <span
                                        style={{ color: "#C67931" }}
                                        className="f-w-500"
                                      >
                                        INITIATE
                                      </span>
                                    ) : data.refund_status === 1 ? (
                                      <span
                                        style={{ color: "#003556" }}
                                        className="f-w-500"
                                      >
                                        PROCESSED
                                      </span>
                                    ) : (
                                      <span
                                        style={{ color: "#1D9646" }}
                                        className="f-w-500"
                                      >
                                        CANCELLED
                                      </span>
                                    )}
                                  </TableCell>
                                )}

                                <TableCell>
                                  <IconButton
                                    onClick={() =>
                                      getBusBookingDetails(data.id)
                                    }
                                  >
                                    <RemoveRedEyeIcon />
                                  </IconButton>
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
                        forcePage={pageNumber ==0?1:pageNumber-1}
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

export default AdminBus;
