import {
  Grid,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import React, {useState } from "react";
import Tab from "@mui/material/Tab";
import { TabContext, TabList} from "@mui/lab";
import { aftersearchflights } from "../../../assets/styles/Flights";
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
import TableRow from "@mui/material/TableRow";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { adminAddCoupoun, adminTables } from "./AdminStyles";
import { DownloadFileFromApi } from "../../../ApiServices/DownloadFilesApi";
import { withStyles } from '@material-ui/core/styles';
import AdminTotal from "./AdminTotal";
import { makeStyles } from "@mui/styles";
const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: '#003556!important', 
    color: "#fff!important",
    borderRight: '1px solid white', 
    height:'100%!important'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const tableecell = makeStyles({
  cell:{
    background:'#003556 !important',
    borderRadius:'0px !important',
    color:"#fff !important",
    borderColor:'#fff !important',
    padding:"16px !important"
  }
})
const AdminHotelBookings = () => {
  const tcell = tableecell()
  const adminTableStyles = adminTables();
  const adminAddCoupounStyles = adminAddCoupoun();
  const aftersearchflight = aftersearchflights();
  const [tabValue, setTabValue] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [totalRecordsCount, setTotalRecordsCount] = useState("");
  const [searchString, setSearchString] = useState("");

  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
    setPageNumber(1);
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

      <h4 className={adminAddCoupounStyles.headingstyle}>Hotel Booking</h4>

      {/* <Container maxWidth="xl"> */}
        <TabContext value={tabValue}>
          <TabList
            onChange={handleTabChange}
            sx={{
              background: "#DFF3FF",
              borderRadius: "1rem",
              // width: "74%",
              
              width:'790px',
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
                  className={""}
                  mt={3}
                >
                 {tabValue!==5&&<Grid
                    container
                    justifyContent="space-between"
                    alignItems={"center"}
                    rowGap={1.5}
                    columnGap={1.5}
                  >
                    <Grid item sm={'auto'} md>
                      <TextField
                        placeholder="Search"
                        variant="outlined"
                        label="Search"
                        size="small"
                        onChange={(e) => setSearchString(e.target.value)}
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
                  </Grid> }
            <Grid item mt={3} maxWidth={'100% !important'}>
              {tabValue===5?
              <>
              
              <AdminTotal />
              </>
              :
          <TableContainer className="scroll_none" style={{maxHeight:'500px',borderTopLeftRadius:'1rem',borderTopRightRadius:'1rem'}}>
            <Table >
             <TableHead style={{position:'sticky',top:0,zIndex:1}}>
              <TableRow>
                <StyledTableCell className={tcell.cell} style={{width:'20px'}}>S.No</StyledTableCell>
                <StyledTableCell className={tcell.cell} >Users name</StyledTableCell>
                <StyledTableCell className={tcell.cell}>Hotel</StyledTableCell>
                <StyledTableCell className={tcell.cell}>Booking Number</StyledTableCell>
                <StyledTableCell className={tcell.cell} style={{width:'200px'}}>Booked Date</StyledTableCell>
                <StyledTableCell className={tcell.cell}>Room Type</StyledTableCell>
                <StyledTableCell className={tcell.cell}>Transaction ID</StyledTableCell>
                <StyledTableCell className={tcell.cell} >Price</StyledTableCell>
{(tabValue===2||tabValue===4)&&<StyledTableCell className={tcell.cell}>Refund Status</StyledTableCell>
}                <StyledTableCell className={tcell.cell} >Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{maxHeight:'100%',overflow:"auto"}}>
                {
                  [1,2,3,4,5,6,7,8,90,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item,index)=>{
                    return(
                      <TableRow>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>{(index+1).toString().padStart(2,"0")}</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>Harsha Vardhan</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>Novotel</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>988765</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>24-05-2023</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>Single</TableCell>
                 { <TableCell style={{borderRight:'1px solid #DCDCDC'}}>
                 T22099881877387654
                   </TableCell>}
                   <TableCell style={{borderRight:'1px solid #DCDCDC'}}>
                   ₹2,200
                   </TableCell>
{(tabValue===2||tabValue===4)&&                   <TableCell style={{borderRight:'1px solid #DCDCDC'}}>Initiated</TableCell>
}                  <TableCell style={{borderRight:'1px solid #DCDCDC',textAlign:"center"}}>
                        <Grid item textAlign={'center'}>
                        {/* <BlockIcon/> */}
                        {/* <EditIcon/> */}
                        <RemoveRedEyeIcon sx={{color:'#003556'}}/>
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
                  {tabValue!==5&&<Grid
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
      {/* </Container> */}
    </>
  );
};

export default AdminHotelBookings;
