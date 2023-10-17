import {
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Stack,
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
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { adminAddCoupoun, adminTables } from "./AdminStyles";
import CloseIcon from "@mui/icons-material/Close";
import { DownloadFileFromApi } from "../../../ApiServices/DownloadFilesApi";
import revenue from "../../../assets/AdminAssets/revenue.svg";
import vendor from "../../../assets/AdminAssets/vendor.svg";
import yourshare from "../../../assets/AdminAssets/yourshare.svg";
import refund from "../../../assets/AdminAssets/refund.svg";

const AdminTransaction = () => {
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
  const [downloadPdf, setDownloadPdf] = useState(false);

  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };
  useEffect(() => {
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
  const [orderOpen, setOrderOpen] = useState(false);
  function orderclose() {
    setOrderOpen(false);
  }
  let columns = [
    "S.No.",
    "From",
    "To",
    "Transaction ID.",
    "Fare",
    "Status",
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
      {/* <Dialog open={orderOpen} onClose={orderclose}>
        <DialogTitle sx={{ backgroundColor: "#003556" }}>
          <Grid
            container
            justifyContent={"space-between"}
            sx={{ borderRadius: "10%" }}
          >
            <Grid item md={10}>
              <Typography sx={{ color: "#ffff" }}>ORDER ID:</Typography>
            </Grid>
            <Grid item md={1}>
              <CloseIcon
                sx={{
                  borderRadius: "50%",
                  color: "#003556",
                  background: "white",
                }}
                onClick={orderclose}
              />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            sx={{ background: "#DEF2FF", width: "100%" }}
            pt={2}
            pb={2}
            pl={-2}
          >
            <Grid item md={4}>
              <Typography>Rahul</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography>Seat: s11</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography>Confirmed</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography variant="h6">Orange Travels</Typography>
              <Grid container justifyContent={"space-between"}>
                <Grid item md={8}>
                  <Typography>Non AC Semi-Sleeper 2+2 Super</Typography>
                </Grid>
                <Grid item md={1.6}>
                  <Button sx={{ background: "#003556", color: "#fff" }}>
                    Refund
                  </Button>
                </Grid>
              </Grid>

              <Typography>04 hours 10 mins</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={5.6}>
              <Grid item>12:15</Grid>
              <Grid item>28,Dec 2022</Grid>
              <Grid item>Kakinada</Grid>
              <Grid item>Sarpavaram Junction-Kkd</Grid>
            </Grid>
            <Grid item sx={{ border: "1px solid red" }} mr={2}></Grid>
            <Grid item md={5.6}>
              <Grid item>04:15</Grid>
              <Grid item>29,Dec 2022</Grid>
              <Grid item>Maddilapalem</Grid>
              <Grid item>City Bus Station</Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Typography>Refund Breakup</Typography>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography>Total Paid</Typography>
            </Grid>
            <Grid item>
              <Typography>₹ 2,600</Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Typography>Deductions</Typography>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography>Bus Cancellation Charges</Typography>
            </Grid>
            <Grid item>
              <Typography>- ₹300</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Divider></Divider>
            <Grid container>
              <Grid item>
                <Typography>Bus Cancellation Charges</Typography>
              </Grid>
              <Grid item>
                <Typography>- ₹300</Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog> */}
      <BusesPageBackDrop open={pageLoading} />
      <h4 className={adminAddCoupounStyles.headingstyle}>Transaction</h4>

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
                fontSize: "12px",
                color: "#003556",
                fontWeight: 600,
                textTransform: "none",
              }}
            />
            <Tab
              disableRipple
              label="Completed"
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
              label="Pending"
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
          {/* Seat Selection */}

          <TabPanel value={tabValue} sx={{ padding: "10px 0" }}>
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
                <Grid item md={12}>
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
                            <TableCell>{data.from}</TableCell>
                            <TableCell>{data.to}</TableCell>
                            <TableCell>{data.transaction_id}</TableCell>
                            <TableCell>{data.total_price}</TableCell>
                            <TableCell>{data.status}</TableCell>
                            <TableCell>
                              <RemoveRedEyeIcon
                                // onClick={() => setOrderOpen(true)}
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
          </TabPanel>          
        </TabContext>
      </Container>
    </>
  );
};

export default AdminTransaction;