import {
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem, InputAdornment
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BusesPageBackDrop from "../Buses/BusesPageBackDrop";
import { aftersearchflights } from "../../../assets/styles/Flights";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import ReactPaginate from "react-paginate";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { adminTables } from "./AdminStyles";
import { useNavigate } from "react-router-dom";
import gomytripclient from "../../../GomytripClient";
import CouponView from "../../modals/AdminModals/CouponView";
import { convertDateFormat } from "../Buses/BusModuleHelperFunctions";
import { enqueueSnackbar } from "notistack";
import { AntSwitch, AntSwitchReverse } from "./AdminStyles";
import SearchIcon from '@mui/icons-material/Search';

const AdminCouponsList = () => {
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
  const [couponmodal, setCouponmodal] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [allCoupounsList, setAllCoupounsList] = useState([]);
  const [coupounDetails, setCoupounDetails] = useState("");

  const [userTypeFilter, setUserTypeFilter] = useState('')
  const [moduleTypeFilter, setModuleTypeFilter] = useState('0')

  console.log(moduleTypeFilter, 'moduleTypeFilter');
  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  useEffect(() => {
    getAllCoupounsForAdmin();
  }, [pageNumber, searchString, moduleTypeFilter, userTypeFilter]);

  const getAllCoupounsForAdmin = () => {
    let payload = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      search: searchString.trim(),
      user_type: userTypeFilter==4?'':userTypeFilter,
      module: moduleTypeFilter==4?'':moduleTypeFilter,
    };

    gomytripclient
      .post("/getCouponList", payload)
      .then((res) => {
        if (
          res.data.status === 1 &&
          res.data.data.couponsList.rows.length > 0
        ) {
          setAllCoupounsList(res.data.data.couponsList.rows);
          setTotalRecordsCount(res.data.data.couponsList.count);
          setTotalPages(Math.ceil(res.data.data.couponsList.count / pageSize));
        } else {
          setAllCoupounsList([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  let columns = [
    "S.No.",
    "coupoun name",
    "Users Type",
    "Starts",
    "Ends",
    "Module Type",
    "Code",
    "Discount Type",
    "Discount Value",
    "Minimum",
    "Action",
  ];
  const navigate = useNavigate();

  const viewCoupounDetails = (c_id, user_type, c_status, actionType) => {
    //0-- view , 1- edit

    let payload = {
      coupon_id: c_id,
      user_type: user_type,
      status: actionType == 0 ? "" : c_status == 0 ? 1 : 0,
    };

    gomytripclient
      .post("/getCouponDetails", payload)
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200 && res.data.status === 1) {
          if (actionType == 0) {
            setCouponmodal(true);
            setCoupounDetails(res.data.data);
          }
          if (actionType == 1) {
            enqueueSnackbar(res.data.message, { variant: "success" });
            setAllCoupounsList((pre) =>
              pre.map((item) =>
                item.id == c_id
                  ? { ...item, status: c_status == 0 ? 1 : 0 }
                  : item
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
  const handleCoupoun = (e, c_id, user_type, c_status) => {
    if (c_status === "") {
      viewCoupounDetails(c_id, user_type, c_status, 0); //0-- view , 1- edit
    } else {
      let isSwitch = e.target.checked;
      let isConfirmed = window.confirm(
        `Are you sure want to ${isSwitch ? "Enable" : "Disable"} this coupoun`
      );
      if (isConfirmed) {
        viewCoupounDetails(c_id, user_type, c_status, 1); //0-- view , 1- edit
      } else {
      }
    }
  };
  return (
    <>
      <CouponView
        open={couponmodal}
        close={() => setCouponmodal(false)}
        details={coupounDetails}
      />
      <BusesPageBackDrop open={pageLoading} />
      <p className="adminBreadCrum">Coupons</p>

      <Container maxWidth="xl" sx={{ paddingLeft: '0px !important', paddingRight: '0px !important' }}>
        <Grid
          container
          direction="row"
          // flexDirection={'row'}
          // spacing={0}
          className={""}
        >
          <Grid
            container
            // spacing={4}
            justifyContent="space-between"
            alignItems={"center"}
            columnGap={1}
            rowGap={1}
          >
            <Grid item md sm={5}>
              <TextField
                placeholder="Search by Coupoun Name, Code"
                variant="outlined"
                // label="Search by Coupoun Name, Code"
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
            <Grid item md sm={5}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Filter By Module
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="IdType"
                  value={moduleTypeFilter}
                  onChange={(e) => setModuleTypeFilter(e.target.value)}
                  label="Filter By Module"
                >
                  <MenuItem value={"4"}>All</MenuItem>
                  <MenuItem value="0">Mutual Coupoun</MenuItem>
                  <MenuItem value="1">Flight Coupouns</MenuItem>
                  <MenuItem value="2">Hotel Coupouns</MenuItem>
                  <MenuItem value="3">Bus Coupouns</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md sm={5}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label-2">
                  Filter By User Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label-2"
                  id="demo-simple-select-2"
                  // value={passData.IdType}
                  label="Filter By User Type"
                  name="IdType"
                  onChange={(e) => setUserTypeFilter(e.target.value)}
                  // size="small"
                  value={userTypeFilter}
                >
                  <MenuItem value="4">Over All </MenuItem>
                  <MenuItem value="0">All User</MenuItem>
                  <MenuItem value="1">Specific Users</MenuItem>
                  <MenuItem value="2">Top Users</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md sm={5}>
              <Grid container alignItems={"baseline"} justifyContent={{ md: 'flex-end', sm: 'inherit' }}>
                <Grid item>
                  <Button
                    className="bg-newcoupen"
                    size="small"
                    variant="contained"
                    onClick={(e) => navigate("/admin/AdminAddNewCoupons")}
                  >
                    Add New Coupons
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container mt={3}>
            <Grid item md={12} maxWidth={'100% !important'}>
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
                      {columns?.map((column) => (
                        <TableCell key={column}>{column}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allCoupounsList &&
                      allCoupounsList?.length > 0 &&
                      allCoupounsList?.map((data, index) => (
                        <TableRow key={data.id} hover role="checkbox">
                          <TableCell>{data.s_no}</TableCell>
                          <TableCell>{data.coupon_name}</TableCell>
                          <TableCell>{data.user_type === 0 ? "All Users" : data.user_type === 1 ? "Selected Users" : data.user_type === 2 ? "TOp Users" : "N/A"}</TableCell>
                          <TableCell>
                            {convertDateFormat(data.start_date)}
                          </TableCell>
                          <TableCell>
                            {convertDateFormat(data.end_date)}
                          </TableCell>
                          <TableCell>
                            {data.module.includes('0') ? "All Modules," : ""}
                            {data.module.includes('1') ? "Flight Module," : ""}
                            {data.module.includes('2') ? "Hotel Module," : ""}
                            {data.module.includes('3') ? "Bus Module," : ""}
                          </TableCell>
                          <TableCell>{data?.coupon_code}</TableCell>
                          {/* <TableCell>
                            {data.discount_type === 1
                              ? "$" + data.discount_value
                              : data.discount_value + "%"}
                          </TableCell> */}
                          <TableCell>{data.discount_type === 1 ? 'Fixed' : 'Percentage'}</TableCell>
                          <TableCell>{data.discount_value}</TableCell>
                          <TableCell>{data.min_amount}</TableCell>
                          <TableCell>
                            <Grid
                              container
                              width={"100px"}
                              alignItems={"center"}
                              gap={2}
                            >
                              <Grid item>
                                <AntSwitchReverse
                                  checked={data.status == 0}
                                  onChange={(e) =>
                                    handleCoupoun(
                                      e,
                                      data.id,
                                      data.user_type,
                                      data.status
                                    )
                                  }
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              </Grid>
                              <Grid>
                                <RemoveRedEyeIcon
                                  onClick={(e) =>
                                    handleCoupoun(
                                      e,
                                      data.id,
                                      data.user_type,
                                      ""
                                    )
                                  }
                                />
                              </Grid>
                            </Grid>
                            {/* setCouponmodal(true) */}
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
                forcePage={pageNumber ==0?1:pageNumber-1}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminCouponsList;
