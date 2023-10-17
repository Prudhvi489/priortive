import {
  Container,
  Grid,
  Button,
  FormControlLabel,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TextField, InputAdornment, IconButton, Tooltip
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BusesPageBackDrop from "../Buses/BusesPageBackDrop";
import { aftersearchflights } from "../../../assets/styles/Flights";
import axios from "axios";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import helperFunctions from "../../../helpers/helperFunctions.js";
import ReactPaginate from "react-paginate";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { adminTables } from "./AdminStyles";
import { useNavigate } from "react-router-dom";
import BusRaised from "../../modals/AdminModals/BusRaised";
import { AntSwitch } from "./AdminStyles";
import { enqueueSnackbar } from "notistack";
import gomytripclient from "../../../GomytripClient";
import SearchIcon from '@mui/icons-material/Search';
import AdminContactDetails from "../../modals/AdminModals/AdminContactDetails";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';
import BorderColorIcon from '@mui/icons-material/BorderColor';
const BookingRaisedQueries = () => {
  const adminTableStyles = adminTables();
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

  const [contactDetails, setContactDetails] = useState(
    { showing_mobile: "", showing_email: "" }
  )
  const [openDetails, setOpenDetails] = useState(false)

  useEffect(() => {
    let payloadData = {
      pageNumber: pageNumber,
      pageSize: 10,
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
      search: searchString
    };
    setPageLoading(true);
    axios
      .post(`${process.env.REACT_APP_BASEURL}/getRequestList`, payloadData)
      .then((res) => {
        console.log(res);

        if (res.status === 200 && res.data.status === 1) {
          setData(res?.data?.data?.requestList);
          setContactDetails(res?.data?.data?.adminDetails)
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
  }, [tabValue, pageNumber, endDate, searchString]); //searchString

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
  let columns = ["S.No.", "User Name", "Issue", "Status", "Action"];
  const navigate = useNavigate();

  // raised queries dialog state's
  const [raisedOpen, setRaisedOpen] = useState(false);
  function raisedClose() {
    setRaisedOpen(false);
  }
  const [issueDetails, setIssueDetails] = useState("");
  const viewIssueDetails = (id, status, actionType) => {
    //0-- view , 1- edit

    let payload = {
      id: id,
      status: actionType == 0 ? "" : status == 0 ? 1 : 0,
    };
    gomytripclient
      .post("/getRequestDetails", payload)
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200 && res.data.status === 1) {
          if (actionType == 0) {
            setRaisedOpen(true);
            setIssueDetails(res.data.data);
          }
          if (actionType == 1) {
            enqueueSnackbar(res.data.message, { variant: "success" });
            setData((pre) =>
              pre.map((item) =>
                item.id == id ? { ...item, status: status == 0 ? 1 : 0 } : item
              )
            );
          }
        } else {
          enqueueSnackbar("else");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIssue = (e, id, status, actionType) => {
    if (actionType == 0) {
      viewIssueDetails(id, "", actionType);
    } else {
      let isSwitch = e.target.checked;
      let isConfirmed = window.confirm(
        `Are you sure want to ${isSwitch ? "Close" : "Open"} this Issue`
      );
      if (isConfirmed) {
        viewIssueDetails(id, status, actionType);
      } else {
      }
    }
  };

  function handledetailsClose() {
    setOpenDetails(false)
  }

  function handleChildEmmit(childData) {
    console.log(childData, 'childData');
    setContactDetails((pre) => ({ ...pre, showing_email: childData.showing_email, showing_mobile: childData.showing_mobile }))
  }

  return (
    <>
      {raisedOpen && <BusRaised
        open={raisedOpen}
        close={raisedClose}
        issueDetails={issueDetails}
      />}
      <BusesPageBackDrop open={pageLoading} />
      <AdminContactDetails open={openDetails} details={contactDetails} close={handledetailsClose} childEmmit={handleChildEmmit} />
      <p className="adminBreadCrum">Raised Request/Booking Queries</p>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          // flexDirection={'row'}
          spacing={0}
          className={""}
          justifyContent={'space-between'}
          rowSpacing={1.5}
        >
          <Grid item>
            <Grid item>
              <TextField
                placeholder="Search"
                variant="outlined"
                label="Search"
                size="small"
                onChange={(e) => { setPageNumber(1); setSearchString(e.target.value) }}
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
          </Grid>
          <Grid item>
            <Grid container justifyContent="flex-end" alignItems={"center"}>
              <Grid item>
                <Grid container spacing={2} alignItems={"baseline"}>
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
                      // disabled={!endDate}
                      className="bg-p c-w"
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
          </Grid>
          <Grid padding={2} mt={2} sx={{ border: '1px solid #c8c9c9', borderRadius: '5px' }} container justifyContent={'start'} alignItems={'center'}>
            <Grid item className="makeFlex">
              <EmailTwoToneIcon /><span className="">E-mail: </span>  <span className="c-p f-w-700">{contactDetails.showing_email} </span>
            </Grid>
            <Grid item className="makeFlex">
              <PhoneAndroidTwoToneIcon /> <span className="">Phone Number: </span> <span className="c-p f-w-700"> {contactDetails.showing_mobile}</span>
            </Grid>
            <Grid item >
              <Tooltip title='Edit Details' placement="top">
                <IconButton onClick={() => setOpenDetails(true)}><BorderColorIcon sx={{ color: "" }} /></IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container mt={1} minWidth={"md"} display={"block"}>
            <Grid item>
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
                    {data.map((dataItem, index) => (
                      <TableRow key={dataItem.id} hover role="checkbox">
                        <TableCell>{dataItem.s_no}</TableCell>
                        <TableCell>{dataItem.name}</TableCell>
                        <TableCell>{dataItem.issue}</TableCell>
                        <TableCell>
                          <FormControlLabel
                            value="end"
                            control={
                              <AntSwitch
                                onChange={(e) =>
                                  handleIssue(
                                    e,
                                    dataItem.id,
                                    dataItem.status,
                                    1
                                  )
                                }
                                size="small"
                                color={`${!dataItem.status ? "error" : "success"
                                  }`}
                              />
                            }
                            labelPlacement="end"
                            checked={dataItem.status == 1}
                          />
                          {dataItem.status ? "CLOSED" : "OPEN"}
                        </TableCell>
                        <TableCell>
                          <RemoveRedEyeIcon
                            onClick={(e) =>
                              handleIssue(e, dataItem.id, dataItem.status, 0)
                            }
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
              showing {pageNumber * 10 - 10 + 1} - {pageNumber * 10 - 10 + 10}of{" "}
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
      </Container>
    </>
  );
};

export default BookingRaisedQueries;
const sampleData = [
  {
    no: "1",
    title:
      "I’m not received refund for my cancelled tickets. I have Been waited for five days for the refund. But I don’t how much time it will take to refund my amount. Please make sure give a quick response.",
    status: false,
  },
  {
    no: "2",
    title:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the ",
    status: true,
  },
  { no: "3", title: "qweqwewqeqwewqe", status: false },
];
