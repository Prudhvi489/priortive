import {
  Container,
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Tab,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BusesPageBackDrop from "../Buses/BusesPageBackDrop";
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
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import unBlockIcon from "../../../assets/AdminAssets/unBlock.svg";
import BackspaceIcon from "@mui/icons-material/Backspace";
import SearchIcon from '@mui/icons-material/Search';
import { enqueueSnackbar } from "notistack";
import gomytripclient from "../../../GomytripClient";

const AdminUsers = () => {
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
  const [data, setData] = useState([]);
  const [totalRecordsCount, setTotalRecordsCount] = useState("");
  const [searchString, setSearchString] = useState("");
  const [downloadPdf, setDownloadPdf] = useState(false);

  const handleTabChange = (event, tabValue) => {
    setPageNumber(1);
    setTabValue(tabValue);
  };
  useEffect(() => {
    let payloadData = {
      pageNumber: pageNumber,
      pageSize: 10,
      type: Number(tabValue),
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
      .post(`${process.env.REACT_APP_BASEURL}/getAllUsers`, payloadData)
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
  let columns = ["S.No.", "Name", "Gender", "Email", "Phone Number", "Action"];

  const DownloadFile = async () => {
    let payload = {
      pageNumber: pageNumber,
      pageSize: 10,
      type: Number(tabValue),
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
    DownloadFileFromApi("/getAllUsers", payload);
  };
  const handleUserStatusChange = (user_id, status, userName) => {
    if (window.confirm(`Are you sure want to ${status == 0 ? 'Disable' : 'Enable'}  ${userName}`)) {
      gomytripclient.post('/changeUserStatus', { user_id, status: status == 0 ? 1 : 0 }
      ).then(res => {
        if (res.data.status === 1) {
          setData(pre => pre.map((dataa) => user_id == dataa.user_id ? { ...dataa, delete_status: status == 0 ? 1 : 0 } : dataa))
          enqueueSnackbar(res.data.message, { variant: 'success' })

        } else {
          enqueueSnackbar(res.data.message, { variant: 'error' })
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    } else {
      enqueueSnackbar('Last action was cancelled')
    }

  }
  return (
    <>
      <BusesPageBackDrop open={pageLoading} />
      <h4 className={adminAddCoupounStyles.headingstyle}>User</h4>
      <Container maxWidth="" sx={{ paddingLeft: '0px !important', paddingRight: "0px !important" }}>
        <TabContext value={tabValue}>
          <TabList
            onChange={handleTabChange}
            sx={{
              background: "#DFF3FF",
              borderRadius: "1rem",
              // width: "36%",
              width: "fit-content",
              maxWidth: '100%',
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
              value="0"
              sx={{
                fontSize: "12px",
                color: "#003556",
                fontWeight: 600,
                textTransform: "none",
              }}
            />
            <Tab
              disableRipple
              label="Male"
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
              label="Female"
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
              label="Other"
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
                rowGap={1.5}
                columnGap={1}
              >
                <Grid item md sm={'auto'}>
                  <TextField
                    placeholder="Search"
                    variant="outlined"
                    label="Search"//"text"
                    size="small"
                    value={searchString}
                    onChange={(e) => { setPageNumber(1); setSearchString(e.target.value) }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {/* <img src={busFromLocIcon} alt='fromLocBusIcon'/> */}
                          <SearchIcon
                            sx={{ color: "#003556" }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="start">
                          {searchString ? (
                            <IconButton onClick={() => setSearchString("")}>
                              <BackspaceIcon />
                            </IconButton>
                          ) : (
                            ""
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item sm={'auto'} maxWidth={'100% !important'}>
                  <Grid container columnGap={1} rowGap={1} alignItems={"baseline"}>
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

              <Grid container mt={3} minWidth={"md"} display={"block"}>
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
                            <TableCell>{data.first_name ?? "--"}</TableCell>
                            <TableCell>
                              {data.gender == "1"
                                ? "Male"
                                : data.gender == "2"
                                  ? "Female"
                                  : "Other"}
                            </TableCell>
                            <TableCell>{data.email ?? "--"}</TableCell>
                            <TableCell>{data.mobile}</TableCell>
                            <TableCell>
                              <Grid container gap={2} flexWrap={'nowrap'}>
                                <Grid item>
                                  <IconButton onClick={() => handleUserStatusChange(data.user_id, data?.delete_status, data.first_name)}>
                                    <BlockIcon
                                      color={`${data?.delete_status === 0
                                        ? "success"
                                        : "error"
                                        }`}
                                    />
                                  </IconButton>
                                </Grid>

                              </Grid>
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
                  {pageNumber * 10 - 10 + 1} - {pageNumber * 10 - 10 + 10} of{" "}
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
                    forcePage={pageNumber == 0 ? 1 : pageNumber - 1}
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

export default AdminUsers;
