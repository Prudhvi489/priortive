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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
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
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { withStyles } from '@material-ui/core/styles';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { adminAddCoupoun, adminTables } from "./AdminStyles";
import CloseIcon from "@mui/icons-material/Close";
import { DownloadFileFromApi } from "../../../ApiServices/DownloadFilesApi";
import revenue from "../../../assets/AdminAssets/revenue.svg";
import vendor from "../../../assets/AdminAssets/vendor.svg";
import yourshare from "../../../assets/AdminAssets/yourshare.svg";
import refund from "../../../assets/AdminAssets/refund.svg";
import AdminFlightView from "../../modals/AdminModals/AdminFlightView";
import AdminFlightRefund from "../../modals/AdminModals/AdminFlightRefund";
import AdminTotal from "./AdminTotal";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'rgba(0, 53, 86, 1)',
    color: "#ffff !important",
    borderRight: '1px solid white',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const AdminFlights = () => {
  const adminTableStyles = adminTables();
  const adminAddCoupounStyles = adminAddCoupoun();
  const aftersearchflight = aftersearchflights();
  const [pageLoading, setPageLoading] = useState(false);
  const [tabValue, setTabValue] = useState(1);
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
    "Users name",
    "Booking Number",
    "Contact Number",
    "Mail ID",
    "Transaction ID",
    "Date",
    "Fare",
    "Action",
  ];
  let statuscolumns = [
    "S.No.",
    "Users name",
    "Booking Number",
    "Contact Number",
    "Mail ID",
    "Transaction ID",
    "Date",
    "Fare",
    "Refund Status",
    "Action",
  ];

  const DownloadFile = async () => {
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
      download: true,
    };
    DownloadFileFromApi("/busOverallBookingData", payload);
  };
  return (
    <>
      <h4 className={adminAddCoupounStyles.headingstyle}>Flights Bookings</h4>
      <AdminFlightView open={orderOpen} close={orderclose} openfund={refundopen} />
      <AdminFlightRefund open={refundOpen} close={refundclose} />

      <BusesPageBackDrop open={pageLoading} />


      {/* <Container maxWidth="xl"> */}
      {/* <TabContext value={tabValue}>
          <TabList
            onChange={handleTabChange}
            sx={{
              background: "#DFF3FF",
              borderRadius: "1rem",
              width: "68.8%",
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
              label="Cancelled Booking"
              value="2"
              sx={{
                fontSize: "12px",
                padding: "0% 2%",
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
                padding: "0% 2%",
                color: "#003556",
                fontWeight: 600,
                textTransform: "none",
              }}
            />
            <Tab
              disableRipple
              label="Pending Bookings"
              value="4"
              sx={{
                fontSize: "12px",
                padding: "0% 2%",
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
                padding: "0% 2%",
                color: "#003556",
                fontWeight: 600,
                textTransform: "none",
              }}
            />
          </TabList>

          <TabPanel value={tabValue} sx={{ padding: "10px 0" }}>
            {tabValue === "5" ? (
              <>
                <AdminTotal />
              </>
            ) : tabValue === '2' ? (
              <>
                <Grid
                  container
                  direction="row"
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
                            onClick={DownloadFile}
                          >
                            <PictureAsPdfIcon />
                            Download PDF
                          </Button>
                        </Grid>
                        <Grid item>
                          <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onDatesChange={handleDatesChange}
                            focusedInput={focusedInput}
                            onFocusChange={handleFocusChange}
                            isOutsideRange={() => false} // Optional: Allows selection of past dates
                          />
                        </Grid>
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

                  <Grid container mt={3}>
                    <Grid item>
                     
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
                              {statuscolumns.map((column) => (
                                <StyledTableCell key={column}>{column}</StyledTableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.map((data) => (
                              <TableRow key={data.s_no} hover role="checkbox">
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{data.s_no}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{data.username}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{data.booking_number}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{data.mobile}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{data.email}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{data.place}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{data?.journey_date?.split("T")[0]}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{data.total_price}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{data.place}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}><RemoveRedEyeIcon onClick={() => setOrderOpen(true)} /></TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                    
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
                            onClick={DownloadFile}
                          >
                            <PictureAsPdfIcon />
                            Download PDF
                          </Button>
                        </Grid>
                        <Grid item>
                          <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onDatesChange={handleDatesChange}
                            focusedInput={focusedInput}
                            onFocusChange={handleFocusChange}
                            isOutsideRange={() => false} // Optional: Allows selection of past dates
                          />
                        </Grid>
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

                  <Grid container mt={3}>
                    <Grid item>
                     
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
                                <StyledTableCell key={column}>{column}</StyledTableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.map((data) => (
                              <TableRow key={data.s_no} hover role="checkbox">
                                <TableCell style={{ borderRight: '1px solid #DCDCDC !important' }}>{data.s_no}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC !important' }}>{data.username}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC !important' }}>{data.booking_number}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC !important' }}>{data.mobile}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC !important' }}>{data.email}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC !important' }}>{data.place}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC !important' }}>
                                  {data?.journey_date?.split("T")[0]}
                                </TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{data.total_price}</TableCell>
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>
                                  <RemoveRedEyeIcon
                                    onClick={() => setOrderOpen(true)}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                  
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
        </TabContext> */}
      {/* </Container> */}
      <TabContext value={tabValue} sx={{marginTop:"20px"}}>
        <TabList
          onChange={handleTabChange}
          sx={{
            background: "#DFF3FF",
            borderRadius: "1rem",
            width: "fit-content",
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
            label="Future Bookings"
            value={1}
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
            value={2}
            sx={{
              fontSize: "12px",
              padding: "0% 2%",
              color: "#003556",
              fontWeight: 600,
              textTransform: "none",
            }}
          />
          <Tab
            disableRipple
            label="Completed Bookings "
            value={3}
            sx={{
              fontSize: "12px",
              padding: "0% 3%",
              color: "#003556",
              fontWeight: 600,
              textTransform: "none",
            }}
          />
          <Tab
            disableRipple
            label="Pending Booking"
            value={4}
            sx={{
              fontSize: "12px",
              padding: "0% 3.8%",
              color: "#003556",
              fontWeight: 600,
              textTransform: "none",
            }}
          />
          <Tab
            disableRipple
            label="Total Revenue"
            value={5}
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


        <>
          <Grid
            container
            direction="column"
            spacing={0}
            // className={""}
          >
            {tabValue !== 5 && <Grid
              container
              justifyContent="space-between"
              alignItems={"center"}
              rowGap={2}
            >
              <Grid item>
                <TextField
                  placeholder="Search"
                  variant="outlined"
                  label="Search"
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
                      onClick={DownloadFile}
                    >
                      <PictureAsPdfIcon />
                      Download PDF
                    </Button>
                  </Grid>
                  <Grid item md={'auto'} className="start-end-dates-admin">
                  <Grid style={{border:'1px solid #003556',paddingLeft: '0.11rem',paddingRight:'0.3rem',borderRadius:'0.3rem'}} container alignItems="center">
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
                  {/* <Grid item >
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
            </Grid>}
            <Grid item mt={3} maxWidth={'100% !important'}>
              {tabValue === 5 ?
                <>
                  {/* <Grid container direction="column">
                <Grid item>
              <Stack direction={'row'} spacing={1} justifyContent={'flex-end'} alignItems={'center'}>
                  <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onDatesChange={handleDatesChange}
                            focusedInput={focusedInput}
                            onFocusChange={handleFocusChange}
                            isOutsideRange={() => false} // Optional: Allows selection of past dates
                          />
                  <Button
                            className="bg-p"
                            size="small"
                            variant="contained"
                            sx={{width:'3rem',height:'2rem',alignItems:'center',textTransform:'none'}}
                            onClick={(e) => {
                              setStartDate("");
                              setEndDate("");
                            }}
                          >
                            Clear
                  </Button>             
              </Stack>
              </Grid>
              <Grid item>
                Hotel revenue 
              </Grid>
              </Grid> */}
                  <AdminTotal />
                </>
                :
                <TableContainer style={{ maxHeight: '500px' }}>
                  <Table >
                    <TableHead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                      <TableRow>
                        <StyledTableCell style={{ width: '20px', borderTopLeftRadius: '1rem' }}>S.No</StyledTableCell>
                        <StyledTableCell >Users name</StyledTableCell>
                        <StyledTableCell>Booking Number</StyledTableCell>
                        <StyledTableCell>Contact Number</StyledTableCell>
                        <StyledTableCell style={{ width: '200px' }}>Mail ID</StyledTableCell>
                        <StyledTableCell>Transaction ID</StyledTableCell>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell >Fare</StyledTableCell>
                        {(tabValue === 2 || tabValue === 4) && <StyledTableCell>Refund Status</StyledTableCell>
                        }<StyledTableCell style={{ borderTopRightRadius: '1rem' }}>Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ maxHeight: '100%', overflow: "auto" }}>
                      {
                        [1, 2, 3, 4, 5, 6, 7, 8, 90, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
                          return (
                            <TableRow>
                              <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{(index + 1).toString().padStart(2, "0")}</TableCell>
                              <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>Harsha Vardhan</TableCell>
                              <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>Novotel</TableCell>
                              <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>988765</TableCell>
                              <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>24-05-2023</TableCell>
                              <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>Single</TableCell>
                              {<TableCell style={{ borderRight: '1px solid #DCDCDC' }}>
                                T22099881877387654
                              </TableCell>}
                              <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>
                                ₹2,200
                              </TableCell>
                              {(tabValue === 2 || tabValue === 4) &&
                                <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>Initiated</TableCell>
                              }                  <TableCell style={{ borderRight: '1px solid #DCDCDC', textAlign: "center" }}>
                                <Grid item textAlign={'center'}>
                                  {/* <BlockIcon/> */}
                                  {/* <EditIcon/> */}
                                  <RemoveRedEyeIcon sx={{ color: '#003556' }} />
                                </Grid>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              }
            </Grid>
            {tabValue !== 5 && <Grid
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
            </Grid>}
          </Grid>
        </>

      </TabContext>
    </>
  );
};

export default AdminFlights;
